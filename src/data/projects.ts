import type imageManifest from '../assets/imageManifest.json'

export type ImageName = keyof typeof imageManifest
export type ProjectSlug = 'framecheck' | 'synesthesia' | 'parallel'

export interface CaseStudy {
  overview: string[]
  objective: string
  approach: { title: string; body: string }[]
  features: string[]
  limits: string[]
  gallery: { image: ImageName; alt: string }[]
}

export interface Project {
  slug: ProjectSlug
  number: string
  name: string
  category: string
  summary: string
  engineering: string
  stack: string[]
  capabilities: string[]
  live: string
  repo: string
  caseStudy: CaseStudy
}

export const projects: Project[] = [
  {
    slug: 'framecheck',
    number: '01',
    name: 'Framecheck',
    category: 'Developer Tools / Visual QA',
    summary:
      'A browser-based visual QA tool for comparing screenshots pixel by pixel, identifying interface differences, and inspecting implementation accuracy.',
    engineering:
      'Comparison runs in a Web Worker with Pixelmatch, so the interface stays responsive on large screenshots. State lives in Zustand, comparisons persist to IndexedDB through Dexie, and nothing leaves the browser. The domain logic is pure TypeScript covered by Vitest, with Playwright end-to-end and axe-core accessibility checks on top.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Zustand',
      'Pixelmatch',
      'Dexie / IndexedDB',
      'Web Workers',
      'Canvas',
      'Vitest',
      'Playwright',
    ],
    capabilities: [
      'Pixel-level screenshot comparison',
      'Side-by-side, slider, overlay and difference views',
      'Configurable comparison threshold',
      'Pixel inspection and zoom up to 3200%',
      'Comparisons saved locally',
    ],
    live: 'https://syedahmad79.github.io/framecheck/',
    repo: 'https://github.com/syedahmad79/framecheck',
    caseStudy: {
      overview: [
        'Framecheck compares a reference screenshot with an implementation screenshot pixel by pixel and shows where, and by how much, they differ.',
        'It runs entirely in the browser. Images are never uploaded, there are no accounts or analytics, and comparisons are saved locally in IndexedDB.',
      ],
      objective:
        'Give frontend developers a way to see exactly which pixels differ between a design and its implementation, and by how much, without sending screenshots to a server.',
      approach: [
        {
          title: 'Layered architecture',
          body: 'Dependencies point one way: domain, services, state, features. The domain layer is pure TypeScript with no DOM: layout of mismatched images, the diff computation and statistics, draw geometry, viewport maths and file validation. Services wrap the browser boundaries: image decoding, the diff worker, the IndexedDB repository and pixel sampling.',
        },
        {
          title: 'Comparison off the main thread',
          body: 'Decoding and comparison run in a Web Worker, so panning and zooming stay smooth while a diff is computed. The viewport redraws only the visible pixels.',
        },
        {
          title: 'Statistics that say what they measure',
          body: 'The result reports the difference percentage, pixel counts, pixels actually compared, pixels ignored as anti-aliasing, the bounding box of changes and the settings that produced the numbers. While a new result is computing, the interface marks the old numbers as updating instead of presenting them as current.',
        },
        {
          title: 'Mismatched sizes handled explicitly',
          body: 'Images are never rescaled. Mismatched dimensions are padded or cropped with a chosen alignment anchor, and pixels that exist in only one image are excluded from the percentage.',
        },
        {
          title: 'Motion that follows the input',
          body: 'Zoom, fit and zoom-to-changes glide on a critically damped spring that starts from the current on-screen value and can be interrupted. Dragging the divider, panning and wheel zoom follow the pointer directly. Under reduced motion, viewport changes apply instantly.',
        },
      ],
      features: [
        'Four comparison modes on one shared pan and zoom: side by side, slider, overlay and differences',
        'Configurable Pixelmatch threshold and anti-aliasing handling, recomputed live',
        'Zoom from 2% to 3200% with a pixel outline and grid at high magnification, and pointer coordinates and colour readout',
        'Saved comparisons, settings and view state, restored from the URL',
        'Light and dark themes designed separately',
        'Keyboard operable, with a shortcut list, and responsive from phone to desktop',
      ],
      limits: [
        'Pixels are compared by position, so a one-pixel layout shift flags everything after it. There is no shift detection.',
        'Screenshots at different device pixel ratios or JPEG qualities differ almost everywhere, and Framecheck does not normalise them.',
        'Firefox is configured as a test project but could not be run where the project was built, so it is unverified. Real Safari on iOS is untested.',
      ],
      gallery: [
        {
          image: 'framecheck-ui',
          alt: 'Framecheck in slider mode, comparing a reference and an implementation of a billing settings page, with the result panel showing 1.33% different.',
        },
        {
          image: 'framecheck-diff',
          alt: 'Framecheck difference view: a dimmed billing page with changed pixels highlighted in pink.',
        },
      ],
    },
  },
  {
    slug: 'synesthesia',
    number: '02',
    name: 'SYNESTHESIA',
    category: 'Creative Engineering / Audio Visualization',
    summary:
      'An immersive real-time audio visualization experience that transforms sound into responsive, GPU-rendered 3D environments.',
    engineering:
      'One seeded particle buffer drives all five worlds through custom GLSL shaders, with a half-resolution bloom pass. Audio is analysed on the audio thread in an AudioWorklet using spectral-flux onset detection, and rendering quality adapts when frames run slow. Nothing plays or listens until the visitor chooses a source.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Three.js',
      'React Three Fiber',
      'Web Audio API',
      'AudioWorklet',
      'GLSL shaders',
      'Tailwind CSS',
    ],
    capabilities: [
      'Browser tab audio, microphone and local audio files',
      'Five audio-reactive worlds with smooth morphing',
      'Orbit and zoom camera controls',
      'Configurable audio response and visual presets',
      'Adaptive rendering performance',
    ],
    live: 'https://synesthesia-audio.netlify.app/',
    repo: 'https://github.com/syedahmad79/synesthesia',
    caseStudy: {
      overview: [
        'SYNESTHESIA is an immersive, browser-only audio visualizer. It turns sound from a browser tab, a microphone, a local file or a built-in demo loop into GPU-rendered particle worlds that respond to the music.',
        'It needs no API keys, account, backend or database. Only visual presets and audio tuning settings are saved, in localStorage; audio is never stored or uploaded.',
      ],
      objective:
        'Make sound visible as a responsive 3D environment that runs in an ordinary browser tab, with the audio and rendering lifecycles handled carefully enough to be started, switched and stopped at any time.',
      approach: [
        {
          title: 'Audio analysis on the audio thread',
          body: 'Input is routed through a Web Audio graph into an AudioWorklet that runs a shared spectral-flux onset detector. The same analysis path serves tabs, microphone, files and the demo. Tuning options such as onset sensitivity, smoothness and bass and treble emphasis are validated and saved locally.',
        },
        {
          title: 'One particle buffer, five worlds',
          body: 'A single seeded particle buffer is shaped by custom GLSL shaders with additive blending and a half-resolution mipmapped bloom pass. Five shape weights interpolate, so switching worlds morphs the particles continuously, including when switching rapidly.',
        },
        {
          title: 'Adaptive quality',
          body: 'Device pixel ratio is capped at 1.5, and mobile starts with fewer particles. If frames stay slow, rendering drops to a device pixel ratio of 1 and caps particles at 18k for the session.',
        },
        {
          title: 'Lifecycle and permissions',
          body: 'Capture starts only on a user action. Stopping listening releases the whole session, including tracks, audio nodes, contexts and object URLs. Audio is never played back from the microphone.',
        },
        {
          title: 'Verified with fixtures',
          body: 'Tests cover kick patterns at 60 to 180 BPM, quiet passages, dense percussion, silence, noise, source switching with mocked media APIs and repeated fullscreen restoration.',
        },
      ],
      features: [
        'Browser tab audio, microphone, local audio files and an original synthesized demo',
        'Galaxy, Ocean, Aurora, Nebula and Pulse worlds with GPU particle morphing',
        'Orbit, zoom and reset camera controls, plus a cinematic fullscreen mode',
        'Particle density, bloom, motion speed and five colour palettes',
        'Audio Tuning with bounded presets and an optional Audio Debugger showing spectral flux and onset events',
        'Up to 20 named visual presets saved locally, and shareable settings links',
      ],
      limits: [
        'No browser-only analyzer can guarantee perfect beat classification for every genre or recording. The debugger shows onsets and does not claim a BPM.',
        'Tab audio works best in desktop Chrome or Edge. Mobile browsers, Firefox and Safari may not offer it.',
        'WebGL 2 and hardware acceleration are required. The tests use fixtures and mocks, so they do not measure end-to-end device latency.',
      ],
      gallery: [
        {
          image: 'synesthesia-ui',
          alt: 'SYNESTHESIA interface showing the Galaxy world with the visual controls panel and world selector.',
        },
        {
          image: 'synesthesia-ocean',
          alt: 'The Ocean world: a wave of glowing particles against a dark background.',
        },
        {
          image: 'synesthesia-nebula',
          alt: 'The Nebula world: a soft cloud of violet particles.',
        },
      ],
    },
  },
  {
    slug: 'parallel',
    number: '03',
    name: 'PARALLEL',
    category: 'Interactive Applications / Branching Narrative',
    summary:
      'An interactive storytelling application where decisions shape branching narratives, consequences, and alternative life outcomes.',
    engineering:
      'The engine stores only a seed and the list of choice IDs, then replays them to rebuild every resource and flag. A saved life can be rewound, restarted from any reached moment or imported without trusting stored state, and invalid or unavailable choices are rejected on play and on import.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Motion',
      'Tailwind CSS',
      'Vitest',
      'Browser storage',
      'Canvas / SVG',
    ],
    capabilities: [
      'Three authored interactive stories',
      'Conditional choices and deterministic replay',
      'Saved timelines with rewind and restart',
      'Local persistence and JSON export',
      'Accessible interaction flows',
    ],
    live: 'https://parallel-live.netlify.app/',
    repo: 'https://github.com/syedahmad79/parallel-lives',
    caseStudy: {
      overview: [
        'PARALLEL, "Explore the Lives You Never Lived", is a client-side interactive fiction application. Visitors pick a crossroads, make five decisions, and reach one of three authored endings for that story.',
        'The stories are authored branching fiction. There is no AI generation or free-text interpretation, and no backend, account or external runtime request.',
      ],
      objective:
        'Build a branching narrative where choices have visible consequences, saved lives can be revisited, and the logic stays predictable enough to test exhaustively.',
      approach: [
        {
          title: 'Inputs, not computed state',
          body: 'The engine persists the schema version, identity, setup, an unsigned 32-bit seed, a timestamp and the chosen choice IDs. A derive() function replays those decisions to obtain the story resources, so state is reconstructed rather than trusted.',
        },
        {
          title: 'Typed content model',
          body: 'Scenarios, scenes, choices, conditions and story snapshots are typed models. Conditional passages and eligibility are declared in the content and enforced by the engine.',
        },
        {
          title: 'Rewind and restart',
          body: 'Restarting from a reached moment reconstructs all resources and flags from the retained history and creates a new story identity, so the saved original stays intact.',
        },
        {
          title: 'Defensive persistence',
          body: 'Local storage access is fault-tolerant. Exports are versioned JSON. Imports reject unsupported versions, malformed input, files over 1 MB, duplicate IDs, unknown templates, impossible histories and unfinished lives.',
        },
        {
          title: 'Canvas, SVG and accessibility',
          body: 'An interactive star field and branching artwork set the atmosphere, and results can be downloaded as 1200 by 1500 PNG cards drawn on a canvas. Dialogs use native modal focus containment, forms are semantic, and both system and manual reduced-motion settings are supported. Sound is off on every load.',
        },
      ],
      features: [
        'Three authored stories: Move Abroad, Follow Your Passion and Take the Risk',
        'Five decisions per playthrough with recurring characters, callbacks and consequence resources',
        'Three distinct endings per story, each with reflection and a journey view',
        'An inspectable timeline of reached moments',
        'A device-only gallery of up to 100 saved lives with reopen, replay and delete',
        'JSON export and strict import validation',
      ],
      limits: [
        'The story is a sequence of five authored turning points with conditional passages, not a different chapter for every combination.',
        'Saved lives live in one browser. There is no cross-device sync and no offline service worker.',
        'Tests do not cover unsupported browsers or real mobile hardware, and linting is not configured.',
      ],
      gallery: [
        {
          image: 'parallel-choices',
          alt: 'PARALLEL mid-story: three choices for the third decision, with the timeline of earlier decisions on the right.',
        },
        {
          image: 'parallel-ending',
          alt: 'PARALLEL ending screen for the Move Abroad story, with the path of decisions listed in the timeline.',
        },
        {
          image: 'parallel-landing',
          alt: 'PARALLEL landing page with the title, tagline and entry button.',
        },
      ],
    },
  },
]

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)
