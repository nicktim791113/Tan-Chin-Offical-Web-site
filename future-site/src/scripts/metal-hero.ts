type MetalPhase = 0 | 1 | 2;

interface Particle {
  seed: number;
  drift: number;
  radius: number;
  powderX: number;
  powderY: number;
  formX: number;
  formY: number;
  solidX: number;
  solidY: number;
}

interface StageSource {
  src: string;
  srcset: string;
  sizes: string;
  width: number;
  height: number;
}

function isStageSource(value: unknown): value is StageSource {
  if (typeof value !== "object" || value === null) return false;
  const source = value as Partial<StageSource>;
  return typeof source.src === "string" && typeof source.srcset === "string" && typeof source.sizes === "string" &&
    typeof source.width === "number" && typeof source.height === "number";
}

const activeHeroes = new Map<HTMLElement, () => void>();

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    const y = seededRandom(seed * 3.7);
    const formBand = seededRandom(seed * 5.91);

    return {
      seed,
      drift: 0.3 + seededRandom(seed * 8.71) * 0.62,
      radius: 0.35 + seededRandom(seed * 1.93) * 0.82,
      powderX: 0.07 + seededRandom(seed * 2.13) * 0.48,
      powderY: 0.16 + y * 0.68,
      formX: 0.37 + formBand * 0.27,
      formY: 0.27 + y * 0.46 + Math.sin(formBand * Math.PI * 4) * 0.024,
      solidX: 0.6 + seededRandom(seed * 4.47) * 0.24,
      solidY: 0.27 + y * 0.46
    };
  });
}

function setupHero(host: HTMLElement) {
  const canvas = host.querySelector<HTMLCanvasElement>("[data-metal-canvas]");
  const stage = host.querySelector<HTMLElement>("[data-metal-stage]");
  const playback = host.querySelector<HTMLButtonElement>("[data-metal-playback]");
  const playbackLabel = host.querySelector<HTMLElement>("[data-metal-playback-label]");
  const phaseButtons = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-metal-phase]"));
  const imageSlots = Array.from(host.querySelectorAll<HTMLElement>("[data-metal-image-slot]"));
  const liveStatus = host.querySelector<HTMLElement>("[data-metal-status]");
  const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = connection.connection?.saveData === true;
  const context = canvas?.getContext("2d", { alpha: true }) ?? null;
  let stageSources: StageSource[] = [];

  try {
    const parsed: unknown = JSON.parse(host.dataset.metalSources ?? "[]");
    if (Array.isArray(parsed) && parsed.length === 3 && parsed.every(isStageSource)) {
      stageSources = parsed as StageSource[];
    }
  } catch {
    stageSources = [];
  }

  if (!stage || !playback || !playbackLabel || phaseButtons.length !== 3 || imageSlots.length !== 2 || stageSources.length !== 3) {
    host.classList.add("is-static");
    host.classList.remove("is-ready", "is-manual", "is-paused");
    host.dataset.phase = "2";
    return () => undefined;
  }

  const targetStage = stage;
  const targetPlayback = playback;
  const targetPlaybackLabel = playbackLabel;
  const targetImageSlots = imageSlots;
  const targetStageSources = stageSources;
  const targetCanvas = canvas;
  const targetContext = context;
  const manualOnly = reduceMotion || saveData || !targetCanvas || !targetContext;
  const pauseLabel = host.dataset.pauseLabel ?? "Pause";
  const replayLabel = host.dataset.replayLabel ?? "Replay";
  const phaseNames = phaseButtons.map((button) => button.textContent?.replace(/^\s*0\d\s*/, "").trim() ?? "");
  const particles = createParticles(window.matchMedia("(max-width: 760px)").matches ? 36 : 64);
  const abortController = new AbortController();
  const { signal } = abortController;
  let width = 1;
  let height = 1;
  let dpr = 1;
  let activeImageSlot = targetImageSlots.find((slot) => slot.classList.contains("is-active")) ?? targetImageSlots[0];
  const initialPhaseValue = Number(activeImageSlot.querySelector<HTMLImageElement>("img")?.dataset.metalStageImage);
  let currentPhase: MetalPhase = initialPhaseValue === 0 || initialPhaseValue === 1 ? initialPhaseValue : 2;
  let previousPhase: MetalPhase = currentPhase;
  let transitionElapsed = 820;
  let phaseElapsed = 0;
  let paused = false;
  let inViewport = false;
  let destroyed = false;
  let frameId: number | undefined;
  let lastTimestamp = performance.now();
  let elapsed = 0;
  let pointerX = 0;
  let pointerY = 0;
  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let requestSerial = 0;
  let phaseRequestPending = false;
  let fadeTimer: number | undefined;
  const decodedImages = new Map<MetalPhase, HTMLImageElement>();
  const pendingImages = new Map<MetalPhase, Promise<HTMLImageElement | null>>();
  const phaseDuration = 3900;
  const transitionDuration = 820;

  host.classList.remove("is-static", "is-paused");
  host.classList.add("is-ready");
  host.classList.toggle("is-manual", manualOnly);
  targetImageSlots.forEach((slot) => {
    if (slot !== activeImageSlot) {
      slot.classList.remove("is-active");
      slot.replaceChildren();
    }
  });
  const initialImage = activeImageSlot.querySelector<HTMLImageElement>("img");
  if (initialImage) decodedImages.set(currentPhase, initialImage);
  host.dataset.phase = String(currentPhase);
  host.dataset.sceneReady = "true";

  function ease(value: number) {
    const bounded = Math.max(0, Math.min(1, value));
    return 1 - Math.pow(1 - bounded, 3);
  }

  function mix(from: number, to: number, amount: number) {
    return from + (to - from) * amount;
  }

  function phasePosition(particle: Particle, phase: MetalPhase) {
    if (phase === 0) return [particle.powderX, particle.powderY] as const;
    if (phase === 1) return [particle.formX, particle.formY] as const;
    return [particle.solidX, particle.solidY] as const;
  }

  function updateControls() {
    phaseButtons.forEach((button, index) => {
      button.setAttribute("aria-pressed", String(index === currentPhase));
    });
    targetPlaybackLabel.textContent = paused ? replayLabel : pauseLabel;
    targetPlayback.setAttribute("aria-label", paused ? replayLabel : pauseLabel);
    host.classList.toggle("is-paused", paused);
    host.dataset.phase = String(currentPhase);
  }

  function resize() {
    if (!targetCanvas || !targetContext) return;
    const rect = targetStage.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    targetCanvas.width = Math.round(width * dpr);
    targetCanvas.height = Math.round(height * dpr);
    targetContext.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    if (!targetContext) return;
    targetContext.clearRect(0, 0, width, height);
    const transition = ease(transitionElapsed / transitionDuration);
    const activeAlpha = currentPhase === 0 ? 0.12 : currentPhase === 1 ? 0.075 : 0.025;
    const priorAlpha = previousPhase === 0 ? 0.12 : previousPhase === 1 ? 0.075 : 0.025;

    pointerX += (pointerTargetX - pointerX) * 0.04;
    pointerY += (pointerTargetY - pointerY) * 0.04;

    for (const particle of particles) {
      const previous = phasePosition(particle, previousPhase);
      const active = phasePosition(particle, currentPhase);
      const wave = Math.sin(elapsed * particle.drift + particle.seed * 0.73);
      const x = mix(previous[0], active[0], transition) * width + wave * (currentPhase === 2 ? 1 : 3) + pointerX * 4;
      const y = mix(previous[1], active[1], transition) * height + Math.cos(elapsed * 0.65 + particle.seed) * (currentPhase === 2 ? 0.5 : 2) + pointerY * 3;
      const alpha = mix(priorAlpha, activeAlpha, transition) * (0.3 + seededRandom(particle.seed * 6.1) * 0.62);

      targetContext.beginPath();
      targetContext.arc(x, y, particle.radius, 0, Math.PI * 2);
      targetContext.fillStyle = `rgba(226, 230, 228, ${alpha})`;
      targetContext.fill();
    }
  }

  function canAnimate() {
    return !manualOnly && !destroyed && !paused && !phaseRequestPending && inViewport && document.visibilityState === "visible";
  }

  function stopFrame() {
    if (frameId !== undefined) {
      cancelAnimationFrame(frameId);
      frameId = undefined;
    }
  }

  function startFrame() {
    if (!canAnimate() || frameId !== undefined) return;
    lastTimestamp = performance.now();
    frameId = requestAnimationFrame(animate);
  }

  function resetParallax() {
    pointerTargetX = 0;
    pointerTargetY = 0;
    targetStage.style.setProperty("--mim-parallax-x", "0px");
    targetStage.style.setProperty("--mim-parallax-y", "0px");
  }

  function createStageImage(phase: MetalPhase) {
    const source = targetStageSources[phase];
    const image = new Image();
    image.alt = "";
    image.decoding = "async";
    image.loading = "eager";
    image.fetchPriority = phase === 0 && currentPhase === 2 ? "high" : "auto";
    image.width = source.width;
    image.height = source.height;
    image.sizes = source.sizes;
    image.srcset = source.srcset;
    image.src = source.src;
    image.dataset.metalStageImage = String(phase);
    return image;
  }

  async function imageIsReady(image: HTMLImageElement) {
    if (image.complete && image.naturalWidth > 0) return true;
    try {
      await image.decode();
      return image.naturalWidth > 0;
    } catch {
      return image.complete && image.naturalWidth > 0;
    }
  }

  function loadStageImage(phase: MetalPhase) {
    const decoded = decodedImages.get(phase);
    if (decoded) return Promise.resolve(decoded);

    const pending = pendingImages.get(phase);
    if (pending) return pending;

    const image = createStageImage(phase);
    const request = imageIsReady(image).then((ready) => {
      pendingImages.delete(phase);
      if (!ready) return null;
      decodedImages.set(phase, image);
      return image;
    });
    pendingImages.set(phase, request);
    return request;
  }

  function crossfadeTo(image: HTMLImageElement) {
    if (fadeTimer !== undefined) {
      window.clearTimeout(fadeTimer);
      fadeTimer = undefined;
    }

    const nextSlot = targetImageSlots.find((slot) => slot !== activeImageSlot) ?? targetImageSlots[0];
    nextSlot.classList.remove("is-active");
    nextSlot.replaceChildren(image);
    nextSlot.getBoundingClientRect();
    const leavingSlot = activeImageSlot;
    nextSlot.classList.add("is-active");
    leavingSlot.classList.remove("is-active");
    activeImageSlot = nextSlot;
    fadeTimer = window.setTimeout(() => {
      if (leavingSlot !== activeImageSlot) leavingSlot.replaceChildren();
      fadeTimer = undefined;
    }, transitionDuration);
  }

  async function requestPhase(phase: MetalPhase, announcement?: string) {
    if (phase === currentPhase) {
      if (announcement && liveStatus) liveStatus.textContent = announcement;
      updateControls();
      startFrame();
      return;
    }

    const requestId = ++requestSerial;
    phaseRequestPending = true;
    stopFrame();
    targetStage.setAttribute("aria-busy", "true");
    const nextImage = await loadStageImage(phase);

    if (destroyed || requestId !== requestSerial) return;

    phaseRequestPending = false;
    targetStage.removeAttribute("aria-busy");
    if (!nextImage) {
      startFrame();
      return;
    }

    crossfadeTo(nextImage);
    previousPhase = currentPhase;
    currentPhase = phase;
    transitionElapsed = paused || manualOnly ? transitionDuration : 0;
    phaseElapsed = 0;
    updateControls();
    draw();
    if (announcement && liveStatus) liveStatus.textContent = announcement;
    startFrame();
  }

  function cancelPendingPhase() {
    requestSerial += 1;
    phaseRequestPending = false;
    targetStage.removeAttribute("aria-busy");
  }

  function animate(timestamp: number) {
    frameId = undefined;
    if (!canAnimate()) return;

    const delta = Math.min(Math.max(timestamp - lastTimestamp, 0), 80);
    lastTimestamp = timestamp;
    elapsed += delta / 1000;
    phaseElapsed += delta;
    transitionElapsed = Math.min(transitionElapsed + delta, transitionDuration);

    if (phaseElapsed >= phaseDuration) {
      phaseElapsed = 0;
      void requestPhase(((currentPhase + 1) % 3) as MetalPhase);
      return;
    }

    draw();
    frameId = requestAnimationFrame(animate);
  }

  targetPlayback.addEventListener("click", () => {
    if (manualOnly) return;
    if (paused) {
      paused = false;
      cancelPendingPhase();
      previousPhase = currentPhase;
      phaseElapsed = 0;
      transitionElapsed = currentPhase === 0 ? transitionDuration : 0;
      elapsed = 0;
      resetParallax();
      updateControls();
      void requestPhase(0, host.dataset.replayedMessage ?? "");
    } else {
      paused = true;
      cancelPendingPhase();
      stopFrame();
      resetParallax();
      if (liveStatus) liveStatus.textContent = host.dataset.pausedMessage ?? "";
      updateControls();
    }
  }, { signal });

  phaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.metalPhase);
      if (selected !== 0 && selected !== 1 && selected !== 2) return;
      paused = !manualOnly;
      cancelPendingPhase();
      stopFrame();
      resetParallax();
      updateControls();
      void requestPhase(selected, phaseNames[selected] ?? "");
    }, { signal });

    button.addEventListener("keydown", (event) => {
      const currentIndex = phaseButtons.indexOf(button);
      let nextIndex = currentIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % phaseButtons.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + phaseButtons.length) % phaseButtons.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = phaseButtons.length - 1;
      else return;

      event.preventDefault();
      phaseButtons[nextIndex]?.focus();
      phaseButtons[nextIndex]?.click();
    }, { signal });
  });

  targetStage.addEventListener("pointermove", (event) => {
    if (manualOnly || event.pointerType === "touch" || paused) return;
    const rect = targetStage.getBoundingClientRect();
    pointerTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    targetStage.style.setProperty("--mim-parallax-x", `${pointerTargetX * 4}px`);
    targetStage.style.setProperty("--mim-parallax-y", `${pointerTargetY * 2.5}px`);
  }, { signal, passive: true });

  targetStage.addEventListener("pointerleave", resetParallax, { signal });

  const resizeObserver = new ResizeObserver(() => {
    resize();
    draw();
  });
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    inViewport = entry?.isIntersecting === true;
    if (inViewport) startFrame();
    else stopFrame();
  }, { threshold: 0.02 });
  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") startFrame();
    else stopFrame();
  };

  resizeObserver.observe(targetStage);
  intersectionObserver.observe(host);
  document.addEventListener("visibilitychange", onVisibilityChange, { signal });
  resize();
  draw();
  updateControls();

    if (!manualOnly) void requestPhase(0);

  return () => {
    destroyed = true;
    cancelPendingPhase();
    stopFrame();
    abortController.abort();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
    targetContext?.clearRect(0, 0, width, height);
    targetStage.style.removeProperty("--mim-parallax-x");
    targetStage.style.removeProperty("--mim-parallax-y");
    delete host.dataset.sceneReady;
  };
}

function initializeMetalHeroes() {
  document.querySelectorAll<HTMLElement>("[data-metal-hero]").forEach((host) => {
    if (activeHeroes.has(host)) return;
    activeHeroes.set(host, setupHero(host));
  });
}

function teardownMetalHeroes() {
  activeHeroes.forEach((dispose) => dispose());
  activeHeroes.clear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMetalHeroes, { once: true });
} else {
  initializeMetalHeroes();
}

document.addEventListener("astro:page-load", initializeMetalHeroes);
document.addEventListener("astro:before-swap", teardownMetalHeroes);
window.addEventListener("pagehide", teardownMetalHeroes);
window.addEventListener("pageshow", initializeMetalHeroes);
