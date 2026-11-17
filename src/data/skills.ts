export interface SkillGroup {
  title: string
  note: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    note: 'What I write day to day.',
    items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'C#', 'SQL'],
  },
  {
    title: 'Frontend and UI',
    note: 'Interfaces that stay responsive and readable.',
    items: [
      'React',
      'Tailwind CSS',
      'Responsive design',
      'Motion',
      'Vite',
      'Component architecture',
    ],
  },
  {
    title: 'Interactive and creative engineering',
    note: 'Real-time graphics and audio in the browser.',
    items: [
      'Three.js',
      'React Three Fiber',
      'WebGL',
      'GLSL',
      'Canvas',
      'Web Audio API',
      'AudioWorklet',
    ],
  },
  {
    title: 'Application and data engineering',
    note: 'State and storage for local-first apps.',
    items: [
      'Zustand',
      'IndexedDB',
      'Browser storage',
      'Web Workers',
      'State management',
      'Local-first application design',
    ],
  },
  {
    title: 'Testing and developer tools',
    note: 'How I check my own work.',
    items: ['Git', 'GitHub', 'Vitest', 'Playwright', 'ESLint', 'Prettier'],
  },
  {
    title: 'Backend and data foundations',
    note: 'Studied and practised. My public projects are client-side.',
    items: ['C#', 'SQL Server', 'Object-oriented programming', 'Relational database fundamentals'],
  },
  {
    title: 'AI and automation',
    note: 'From my time running an automation agency.',
    items: ['AI workflow design', 'Chatbots', 'Business process automation'],
  },
]
