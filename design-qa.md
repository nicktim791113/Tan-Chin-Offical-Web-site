# v0.7.1 Approved Hero Revision QA

Date: 2026-09-09

## Source truth and scope

The user approved the displayed three-stage set and explicitly authorized implementation and production deployment. This is a scoped asset replacement in the existing Astro site, not a new layout or physical manufacturing simulation.

Source visual truth (all 1374×1145):

- Stage 0: `C:/Users/nickt/.codex/generated_images/01a07ad4-9388-7740-9687-1e5751fa79b8/exec-bd99f963-307e-4b3f-80cc-aa360a289a9b.png`, copied to `future-site/src/assets/images/mim-powder-aggregation.png`.
- Stage 1: unchanged `D:/Developer/Tan-Chin-Offical-Web-site/future-site/src/assets/images/mim-powder-stage.png`.
- Stage 2: `C:/Users/nickt/.codex/generated_images/01a07ad3-f0ee-7193-bd39-b249482d1a2c/exec-52f3f0ab-08cb-4bfd-a245-9487070ae062.png`, copied to `future-site/src/assets/images/mim-vacuum-transition.png`.

Both new PNGs match their approved source SHA-256 byte-for-byte. All previous source images remain. Only the imports and stage-source mapping in `MetalHero.astro` changed; JavaScript, CSS, labels, page layout, equipment imagery and dependencies are unchanged. The shared component applies to all three languages. SSR and manual-only fallback now use the approved stage-2 particle-to-dense-metal image.

## Browser evidence and comparison

Flow under test: homepage loads → choose each stage → corresponding decoded image and pressed state appear; manual selection pauses; replay restarts at powder; keyboard navigation changes the selected stage.

Implementation: `http://127.0.0.1:4322/zh/`, `/en/`, `/ja/`, served from the root-path production build. Browser: Codex IAB through CUA and its supported locator/DOM APIs; no external Playwright fallback or new dependencies.

Evidence directory: `C:/Users/nickt/.codex/tmp/tanchin-v0.7.1-qa/`.

| CSS viewport / state | Implementation screenshots | Actual capture size |
| --- | --- | --- |
| 1440×900, Chinese, scroll 0, paused stages 0/1/2 | `desktop-stage-0.jpg`, `desktop-stage-1.jpg`, `desktop-stage-2.jpg` | 1425×891 |
| 1440×900, old production stage 2, scroll 0 | `desktop-before.jpg` | 1425×891 |
| 825×787, English, paused stage 2 | `tablet-en-stage-2.jpg` | 810×773 |
| 390×844, Chinese first viewport and paused stages 0/1/2 | `mobile-first.jpg`, `mobile-stage-0.jpg`, `mobile-stage-1.jpg`, `mobile-stage-2.jpg` | 375×812 |
| 320×568, Japanese first viewport and paused stage 2 | `narrow-ja-first.jpg`, `narrow-ja-stage-2.jpg` | 305×541 |

Captured devicePixelRatio is 1. The host exports a smaller client screenshot than the requested CSS viewport; the source reference is an individual bitmap, not a page mock. Comparison therefore uses matched desktop before/after captures and the source asset's aspect ratio within the image region, not a pixel-error metric between unlike canvas sizes. Responsive WebP variants are 640×533, 960×800 and 1374×1145. No source retouching or creative cropping was performed.

The main reviewer opened each approved source together with its corresponding desktop implementation in the same comparison input. The old production screenshot was also paired with the new stage-2 screen to review surrounding layout. An independent reviewer repeated the three source/render comparisons and inspected all mobile screenshots. The hero region is clearly visible in the desktop captures and the mobile stage captures; no additional focused crop was needed. Initial automation captures taken during crossfade or scrolled away from the top were replaced with settled, matching-state captures; those capture corrections did not require a website change.

| Required fidelity surface | Result |
| --- | --- |
| Fonts / typography | Logo, heading, body, CTA and phase-label hierarchy and wrapping retain the existing design; no unintended font change. English and Japanese remain readable. |
| Spacing / layout rhythm | Existing copy/image grid, CTA spacing and proof strip retained. No page-width overflow at any tested viewport. Mobile first-screen content continues naturally below the fold; separate stage captures show the full component and reachable controls. |
| Colors / tokens | Graphite background, brand red, active-state colors and existing margin mask retained; no new color overlay or material tint. |
| Image quality / fidelity | Correct source in each stage; same six-post component, central hole, base and camera. Stage 0 has dispersed-to-aggregated particles; stage 1 uses the exact previous powder source; stage 2 has particle geometry on the left and dense metal on the right. Component is not clipped. Responsive scaling makes fine particles softer, an accepted display difference. |
| Copy / content | Homepage copy, three-language stage labels, routes and equipment descriptions are unchanged. No new manufacturing claims. |

## Verification results

- Page identity, meaningful nonblank content, absence of framework error overlays, and captured relevant console warnings/errors passed on all three language homepages.
- All three phase buttons produced the expected distinct WebP URL and matching `aria-pressed` state in Chinese, English and Japanese; manual selection paused playback.
- Home selected stage 0; ArrowRight selected stage 1; Replay returned to stage 0 with playback active and the Pause label; Pause stopped playback and restored the Replay label.
- Astro check: 59 files, 0 errors/warnings/hints. Root-path and GitHub Pages builds: 57 pages each. Both scans found 0 missing paths, hashes or stage metadata resources (1,380 hrefs, 250 src attributes, 399 srcset attributes, 54 hash references per build).
- Source-level asynchronous lifecycle regression: 9/9 pass against the current component and TypeScript, including decode delays/errors, deduplication, retry, stale requests, manual-only modes and page lifecycle.
- Nine Hero WebP variants validated. 960w powder/form/vacuum: 139,992 / 120,854 / 80,540 bytes. Hero JS remains 7,105 bytes, gzip 3,079 bytes, with the same emitted script hash as v0.7.0. Granular imagery is larger than the previous solid image; no claim of lower image transfer or improved real-user Core Web Vitals is made.
- Backup: `_backups/tan-chin-core-20260909-065408-203.zip`; 316 tracked files / 316 ZIP entries, SHA-256 mismatches 0, 437.51 MiB. New images were included in the tracked backup manifest.

External machine-readable evidence: `root-dist-scan.json`, `pages-dist-scan.json`, `root-hero-build-artifacts.json`, `pages-hero-build-artifacts.json`, `pages-hero-stage-order.json`, `source-regression-results.md` in the evidence directory above.

## Findings, history and limits

No actionable P0/P1/P2 findings in this scoped revision. The first settled visual comparison passed and required no visual-code correction. The independent review also found no P0/P1/P2 blocker. Intentional differences are the three approved material states, normal responsive scaling and the existing edge fade.

Reduced-motion, Save-Data, missing Canvas and load-failure behavior are covered by source-level mocks, not new browser preference emulation. Safari/Firefox, physical mobile devices, slow-network measurements and production Core Web Vitals were not tested. Untouched pages and form submission are outside this image-replacement smoke test. Deployment is checked separately after pushing this verified release.

final result: passed

---

# v0.7.0 Image Integration QA

Date: 2026-09-08

## Approved scope and assets

The user approved the four image previews and authorized implementation. The original `mim-powder-hero.png` remains the middle forming concept. Approved PNGs were copied byte-for-byte into `future-site/src/assets/images/`:

- `mim-powder-stage.png`: particle-formation concept, 1374×1145.
- `mim-sintered-stage.png`: complete six-post component, 1374×1145.
- `injection-machine-illustration.png`: generic equipment illustration, 1536×1024.
- `vacuum-sintering-illustration.png`: sealed vacuum-furnace illustration, 1536×1024; not a continuous furnace.

The originals and optimized browser images were inspected with `view_image`. No raster content was regenerated, retouched, or cropped. The two equipment illustrations are labeled as illustrations in Chinese, English, and Japanese; authentic old JPGs and their public URLs remain available. These assets are process/design concepts, not photographs of the company's equipment or a physical simulation.

## Fidelity and interaction review

Target flow: homepage loads → choose powder / forming / vacuum sintering → a decoded, distinct image is displayed with matching phase state; manual choice pauses playback; replay restarts at powder.

Browser: Codex IAB via CUA, using built output at `http://127.0.0.1:4322/`. No external Playwright fallback or added dependencies. Viewports checked: 1440×900 desktop, 910×787 matching the user's browser annotations, 390×844 mobile, and 320×568 narrow layout. Windows scrollbar/client capture dimensions differ slightly from layout viewport dimensions. Assets retain their native aspect ratios inside the existing responsive composition; the reference is an asset, not a full-page mockup.

| Comparison point | Result |
| --- | --- |
| Component geometry | Same six-post base, central hole, camera direction and silver/graphite palette; original middle image retained. |
| Image placement | Existing media frame and layout retained; full component and entire equipment visible with contain sizing. |
| Background and edges | Corrected stacking-layer dark rectangle. Final neutral linear masks fade only the bitmap's outer 5% margins; no color overlay or new tint. |
| Copy and typography | Hero/nav/CTA/proof copy and typography unchanged. Intentional text changes are equipment illustration labels only. |
| Responsive layout | No horizontal overflow at the four checked widths; phase controls remain reachable. |
| Interaction | Distinct URLs and active images verified for all three phases; manual selection, Home/ArrowRight keyboard navigation, pause and replay states verified. |

Page identity, meaningful content, absence of framework overlays, clean relevant browser error/warning logs, loaded equipment AVIFs and real image state changes passed. No material mismatch remains within this image-integration scope.

Local evidence and test scripts are outside the repository at `C:/Users/nickt/.codex/tmp/tanchin-v0.7.0-qa/`: `desktop-sintered-final.png`, `mobile-sintered-final.png`, `mobile-ja-final.png`, `tablet-en-form.png`, `desktop-process-final.png`, `scan-root.json`, `scan-pages.json`, and `metal-hero-async-lifecycle.test.cjs`.

## Build and resilience checks

- Astro check: 59 files, 0 errors, 0 warnings, 0 hints.
- Root and GitHub Pages base builds: 57 pages each. Static scans: 0 missing local paths or hashes, including all three stages' metadata URLs and srcsets.
- Async Node VM regression: 9/9 pass, including decode delay/rejection, 20 repeated clicks sharing one in-flight load, failed-load retry, stale promise suppression, pause, manual-only modes, and pagehide/pageshow cleanup.
- SSR downloads the complete solid image. Normal JS also requests powder at startup; the forming image is demand-loaded. Thus normal startup intentionally downloads solid plus powder rather than promising a single image request; static manual-only modes do not proactively load the other stages.
- Optimized hero JS: 7,105 bytes, gzip 3,079 bytes. 960w WebP powder/form/solid: 120,854 / 86,778 / 29,032 bytes. 500w equipment AVIF injection/vacuum: 7,348 / 13,351 bytes.
- Remaining scope limits: reduced-motion, Save-Data, missing Canvas and loading-failure cases are source-level mocks, not browser emulation; no Safari/Firefox or real mobile-network/Core Web Vitals claim.

---

# v0.6.0 / v0.6.1 Design QA

Date: 2026-09-07

## Reference and scope

Selected source: option 1, explicitly selected by the user with the correction that MIM uses TANCHIN's vacuum sintering furnace, not a continuous furnace.

Reference image: `C:/Users/nickt/.codex/generated_images/01a06b26-66a4-7933-bdb2-c8bdb6036763/exec-090fd24e-c7fd-48a5-88e6-983ce962c024.png`.

Implementation: existing Astro website in `future-site`, all three languages, existing routes and content retained. Product facts take priority over generated reference copy and illustrative machinery. This is an implementation of the chosen art direction, not a pixel-exact copy of the concept image's erroneous claims or imagery.

## Visual evidence

Browser: Codex in-app browser, built production output at `http://localhost:4321/`.

Desktop layout viewport: 1440 × 1024. The screenshot surface exports a 1425 × 1013 client image. Mobile layout viewport: 390 × 844; exported client image 375 × 812. A 320 × 568 narrow-layout check was also performed. Native Windows scrollbars account for the narrower client area.

Evidence files are local and git-ignored under `_verification/v0.6.0/`:

- `desktop-zh-final.png`: final Chinese hero and proof strip, manual animation state, top of page.
- `desktop-en-hero.png`: English hero, manual vacuum-sintering state.
- `desktop-process.png`: four-step process with actual injection machine and vacuum furnace; beginning of material rail.
- `desktop-applications.png`: material captions and left-intro / three-case desktop composition.
- `desktop-gallery-final.png`: sample rail, actual parts and previous/next controls.
- `desktop-contact-final.png`: balanced contact heading and empty form in final styling.
- `desktop-inquiry.png`: prepared draft, visible status and literal HTML-looking input displayed safely as text.
- `mobile-zh-final.png`, `mobile-ja-hero.png`, `mobile-ja-process.png`: mobile typography, CTA stacking, product crop and actual vacuum furnace.
- `desktop-ja-hss.png`: Japanese HSS material detail route.
- `contrast-patch-final.png`: v0.6.1 accent-color follow-up at the default in-app viewport; browser computed colors confirm the light/dark text accents and unchanged brand-red primary button.

The full-height viewport capture experiment is not used as full-page evidence: the screenshot surface cropped it. Review uses the saved viewport captures above, rather than asserting a full-page screenshot was obtained.

## Reference comparison

The reference and final implementation screenshots were opened together for visual review. Focus regions: hero crop/background boundary, section heading scale, the complete furnace image, case-grid alignment, contact heading wrapping and form controls.

| Surface | Comparison and result |
| --- | --- |
| Typography | Maintains strong sans-serif hero hierarchy and restrained section headings. Reduced oversized section titles after first pass; balanced the contact headline to remove a one-character orphan. Three-language line wrapping remains readable. |
| Spacing and layout | Left-copy/right-image hero, continuous four-column proof strip, light four-step process, dark six-material rail, light left-intro/three-case band, sample rail, light contact and dark footer preserved. Section padding reduced from the first pass. Actual descriptions/captions make the page longer than the concept image; intentional for factual content and accessibility. |
| Color and surface | Graphite / paper / brand-red composition matches the selected direction. Removed the obvious black rectangle around the hero with blending, while keeping the metal part legible. Focus indicators remain visible. |
| Imagery and product facts | Generated hero uses the existing part as a form reference. Process uses the actual sealed vacuum furnace photo, not the concept's flame furnace. Material/application/sample imagery uses project assets. No invented customer examples, performance numbers or continuous-furnace visual. |
| Copy and controls | Existing factual copy retained, including 100g capability and HSS terminology. Concept's fake submission replaced by an explicit local draft workflow with no automatic sending. Pause/replay and phase selection are actual controls, not decorative labels. |

## Findings and correction history

- P1 resolved: mobile language dropdown was absolutely positioned outside the scrollable navigation; now in normal flow and reachable.
- P2 resolved: nested language Esc now returns to its summary without closing the nav; second Esc closes nav and focuses hamburger.
- P2 resolved: source-level TypeScript nullability errors in Canvas callbacks; guard-stabilized references now pass strict checking.
- P2 resolved: hero initially had a dark rectangular image boundary and overly dim first phase; corrected blending and luminance.
- P2 resolved: 320px layout had 15px overflow from body's minimum width plus Windows scrollbar; final client width, body width and scroll width all measured 305px.
- P2 resolved: excessive first-pass heading/section sizes and contact single-character orphan; corrected and recaptured.
- P2 resolved: image fallback was generating large PNGs; hero now uses responsive WebP including fallback.
- P2 resolved in v0.6.1: small brand-red text measured 3.92:1 on graphite and 4.39:1 on paper. Text accents now measure 6.51:1 and 5.97:1 respectively, while the brand logo and default primary buttons keep the original red. Primary hover is darker to retain readable white text.
- P3 observation: some historical dark-metal product photos are naturally low-lit. Kept genuine source imagery rather than inventing replacement products; future source photography can improve consistency.

No open P0/P1/P2 issues identified within the tested scope.

## Functional and build verification

- `npm run check`: 59 files, 0 errors, 0 warnings, 0 hints.
- Root-path build: 57 pages; GitHub Pages base-path build: 57 pages. No Three.js runtime chunk emitted.
- Static root-build audit: 1,380 hrefs, 250 src attributes, 1,854 srcset entries and 54 hash references; 0 missing local paths or anchors. External/mailto/tel/data references excluded.
- Four package/lockfile versions and lockfile root/workspace versions agreed on 0.6.0 for the initial static audit; the contrast-only patch synchronously advances them to 0.6.1.
- Browser: Chinese/English/Japanese homepages; Japanese process and HSS material pages; desktop 1440px and mobile 390px/320px. Visible images loaded, no page-width overflow after correction, no captured console errors/warnings on the final preview.
- Browser interaction: phase selection updates pressed state and pauses; sample next control moves the rail and enables previous; mobile navigation opens with focus, nested Esc works, desktop breakpoint clears mobile open state, language link reaches Japanese.
- Inquiry: required name/email/requirement fields, local draft preview with explicit not-sent status, encoded mailto and Blob download link; editing invalidates old draft and links. Test input containing `<script>` remains literal textarea text. No real email was sent.
- Source-level Canvas tests: `node _verification/v0.6.0/metal-hero-lifecycle.test.cjs`, 6/6 groups passed: reduced-motion, Save-Data, missing context, viewport/tab lifecycle, pause/manual phase, pagehide/pageshow teardown/rebuild.
- Animation module: approximately 5.13 KB raw / 2.36 KB gzip. Hero WebP outputs: 41,588 / 86,778 / 154,344 bytes. These are build/resource measurements, not PageSpeed or real-user Core Web Vitals scores.

## Limits

Canvas fallback tests use Node VM mocks, not real-device media emulation. Safari/iOS hardware, real Save-Data connections and production Core Web Vitals were not measured. No backend email, file-upload service or automatic inquiry sending is implemented or claimed. Extremely long mailto drafts may need the provided text-download fallback.

The npm backup wrapper could not load `Get-FileHash` in this host's Windows PowerShell environment. The same tracked-file backup script was successfully run directly in PowerShell 7.6.5, with 310 ZIP entries and zero SHA-256 mismatches. This is an environment-specific invocation fallback, not a website build failure.

final result: passed

This pass applies to the documented visual/functional scope and corrected product facts; it is not a claim of pixel identity with the concept or a legal clearance opinion.
