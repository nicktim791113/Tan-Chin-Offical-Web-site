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

const activeHeroes = new Map<HTMLElement, () => void>();

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    const y = seededRandom(seed * 3.7);
    const powderX = 0.04 + seededRandom(seed * 2.13) * 0.52;
    const powderY = 0.12 + y * 0.76;
    const formBand = seededRandom(seed * 5.91);

    return {
      seed,
      drift: 0.35 + seededRandom(seed * 8.71) * 0.9,
      radius: 0.55 + seededRandom(seed * 1.93) * 1.7,
      powderX,
      powderY,
      formX: 0.34 + formBand * 0.31,
      formY: 0.25 + y * 0.5 + Math.sin(formBand * Math.PI * 4) * 0.035,
      solidX: 0.58 + seededRandom(seed * 4.47) * 0.28,
      solidY: 0.25 + y * 0.5
    };
  });
}

function setupHero(host: HTMLElement) {
  const canvas = host.querySelector<HTMLCanvasElement>("[data-metal-canvas]");
  const stage = host.querySelector<HTMLElement>("[data-metal-stage]");
  const playback = host.querySelector<HTMLButtonElement>("[data-metal-playback]");
  const playbackLabel = host.querySelector<HTMLElement>("[data-metal-playback-label]");
  const phaseButtons = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-metal-phase]"));
  const liveStatus = host.querySelector<HTMLElement>("[data-metal-status]");
  const context = canvas?.getContext("2d", { alpha: true });
  const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = connection.connection?.saveData === true;

  if (!canvas || !stage || !playback || !playbackLabel || !context || reduceMotion || saveData) {
    host.classList.add("is-static");
    host.dataset.phase = "2";
    return () => undefined;
  }

  const targetCanvas = canvas;
  const targetStage = stage;
  const targetPlayback = playback;
  const targetPlaybackLabel = playbackLabel;
  const targetContext = context;
  host.classList.remove("is-static");

  const pauseLabel = host.dataset.pauseLabel ?? "Pause";
  const replayLabel = host.dataset.replayLabel ?? "Replay";
  const phaseNames = phaseButtons.map((button) => button.textContent?.replace(/^\s*0\d\s*/, "").trim() ?? "");
  const particles = createParticles(window.matchMedia("(max-width: 760px)").matches ? 96 : 160);
  const abortController = new AbortController();
  const { signal } = abortController;
  let width = 1;
  let height = 1;
  let dpr = 1;
  let currentPhase: MetalPhase = 0;
  let previousPhase: MetalPhase = 0;
  let transitionElapsed = 950;
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
  const phaseDuration = 3900;
  const transitionDuration = 950;

  host.dataset.phase = "0";
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

  function setPhase(phase: MetalPhase, userInitiated = false) {
    if (phase !== currentPhase) {
      previousPhase = currentPhase;
      currentPhase = phase;
      transitionElapsed = userInitiated ? transitionDuration : 0;
      phaseElapsed = 0;
    }
    updateControls();
    if (userInitiated && liveStatus) {
      liveStatus.textContent = phaseNames[phase] ?? "";
    }
  }

  function resize() {
    const rect = targetStage.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    targetCanvas.width = Math.round(width * dpr);
    targetCanvas.height = Math.round(height * dpr);
    targetContext.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    targetContext.clearRect(0, 0, width, height);
    const transition = ease(transitionElapsed / transitionDuration);
    const activeAlpha = currentPhase === 0 ? 0.86 : currentPhase === 1 ? 0.62 : 0.18;
    const priorAlpha = previousPhase === 0 ? 0.86 : previousPhase === 1 ? 0.62 : 0.18;

    pointerX += (pointerTargetX - pointerX) * 0.045;
    pointerY += (pointerTargetY - pointerY) * 0.045;

    for (const particle of particles) {
      const previous = phasePosition(particle, previousPhase);
      const active = phasePosition(particle, currentPhase);
      const wave = Math.sin(elapsed * particle.drift + particle.seed * 0.73);
      const x = mix(previous[0], active[0], transition) * width + wave * (currentPhase === 2 ? 2 : 7) + pointerX * 7;
      const y = mix(previous[1], active[1], transition) * height + Math.cos(elapsed * 0.72 + particle.seed) * (currentPhase === 2 ? 1 : 4) + pointerY * 5;
      const alpha = mix(priorAlpha, activeAlpha, transition) * (0.28 + seededRandom(particle.seed * 6.1) * 0.66);
      const radius = particle.radius * (currentPhase === 2 ? 0.62 : 1);

      targetContext.beginPath();
      targetContext.arc(x, y, radius, 0, Math.PI * 2);
      targetContext.fillStyle = particle.seed % 23 === 0 ? `rgba(228, 0, 18, ${alpha * 0.74})` : `rgba(218, 222, 220, ${alpha})`;
      targetContext.fill();

      if (particle.radius > 1.75 && currentPhase !== 2) {
        targetContext.beginPath();
        targetContext.moveTo(x - 7, y);
        targetContext.lineTo(x + 2, y);
        targetContext.strokeStyle = `rgba(228, 232, 230, ${alpha * 0.28})`;
        targetContext.lineWidth = 0.6;
        targetContext.stroke();
      }
    }
  }

  function canAnimate() {
    return !destroyed && !paused && inViewport && document.visibilityState === "visible";
  }

  function stopFrame() {
    if (frameId !== undefined) {
      cancelAnimationFrame(frameId);
      frameId = undefined;
    }
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
      setPhase(((currentPhase + 1) % 3) as MetalPhase);
    }

    draw();
    frameId = requestAnimationFrame(animate);
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

  targetPlayback.addEventListener("click", () => {
    if (paused) {
      paused = false;
      previousPhase = currentPhase;
      currentPhase = 0;
      transitionElapsed = 0;
      phaseElapsed = 0;
      if (liveStatus) liveStatus.textContent = host.dataset.replayedMessage ?? "";
      updateControls();
      startFrame();
    } else {
      paused = true;
      stopFrame();
      resetParallax();
      if (liveStatus) liveStatus.textContent = host.dataset.pausedMessage ?? "";
      updateControls();
    }
  }, { signal });

  phaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.metalPhase) as MetalPhase;
      paused = true;
      stopFrame();
      resetParallax();
      setPhase(selected, true);
      draw();
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
    if (event.pointerType === "touch" || paused) return;
    const rect = targetStage.getBoundingClientRect();
    pointerTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    targetStage.style.setProperty("--mim-parallax-x", `${pointerTargetX * 5}px`);
    targetStage.style.setProperty("--mim-parallax-y", `${pointerTargetY * 3}px`);
  }, { signal, passive: true });

  targetStage.addEventListener("pointerleave", () => {
    resetParallax();
  }, { signal });

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

  return () => {
    destroyed = true;
    stopFrame();
    abortController.abort();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    targetContext.clearRect(0, 0, width, height);
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
