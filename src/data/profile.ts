export const profile = {
  name: 'Syed Ahmad Geelani',
  wordmark: 'Syed Ahmad Geelani',
  headline: 'Full-Stack Developer',
  secondary: 'Computer Science (AI) undergraduate',
  location: 'Kuala Lumpur, Malaysia',
  email: 'ahmadgeelani97@gmail.com',
  links: {
    github: 'https://github.com/syedahmad79',
    linkedin: 'https://www.linkedin.com/in/syedahmadgeelani',
    veltr: 'https://veltr.agency',
  },
  intro:
    'I build thoughtful software, interactive experiences, and digital products that turn complex ideas into intuitive ones.',
  about: [
    "I'm Syed Ahmad Geelani, a full-stack developer studying Computer Science with a focus on Artificial Intelligence at Asia Pacific University in Kuala Lumpur.",
    'I like building software where design and engineering have to agree: an audio visualizer that has to stay in step with the sound, a screenshot comparison tool that has to be exact, a story engine that has to replay every decision the same way twice. Most of what I make runs in the browser, and I care about how it behaves in use as much as how it looks.',
    'My interests run from application development and creative engineering to interactive systems and AI-driven workflows. Alongside my personal projects I run Veltr Studio, an independent studio where I build websites and web and mobile applications.',
  ],
  facts: [
    { label: 'Based in', value: 'Kuala Lumpur, Malaysia' },
    { label: 'Studying', value: 'BCS (Hons) Artificial Intelligence, APU' },
    { label: 'Building', value: 'Veltr Studio, as founder and owner' },
    { label: 'Open to', value: 'Internships, software engineering roles and collaborations' },
  ],
  nav: [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ],
  education: {
    degree: 'Bachelor of Computer Science (Hons) in Artificial Intelligence',
    school: 'Asia Pacific University of Technology & Innovation (APU)',
    years: '2025–2028 (Expected)',
    location: 'Kuala Lumpur, Malaysia',
  },
} as const

export type NavId = (typeof profile.nav)[number]['id']
