export const veltr = {
  role: 'Founder & Owner',
  name: 'Veltr Studio',
  period: '2026–Present',
  url: 'https://veltr.agency',
  summary:
    'Veltr Studio is my independent digital development agency. We build websites, web and mobile applications, and thoughtfully designed digital products.',
  ownership:
    'I own the whole workflow, from the first conversation with a client through design and development to launch.',
  services: [
    'Web development',
    'Mobile app development',
    'UI/UX and product design',
    'App Store creative',
  ],
}

export interface Role {
  title: string
  organisation?: string
  period: string
  summary: string
}

export const otherRoles: Role[] = [
  {
    title: 'Founder & Owner',
    organisation: 'AI Automation Agency',
    period: 'June 2024 – July 2025',
    summary:
      'Built AI tools, chatbots and workflows that took repetitive tasks off client teams, and handled client communication and project coordination.',
  },
  {
    title: 'Freelance Video Editor, Content Creator & Graphic Designer',
    period: 'August 2020 – Present',
    summary:
      'Video editing, thumbnails and graphics for creators and clients. Timing and visual storytelling carry over into how I design interfaces.',
  },
]
