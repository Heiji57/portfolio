export const profile = {
  name: 'Park Jiho',
  nameKo: '박지호',
  title: 'Developer',
  availability: 'Open to CONTACK',
  /** Rotating hero roles; `initialRole` is highlighted first. */
  roles: ['AX', 'Full-stack', 'Developer'],
  initialRole: 1,
  roleIntervalMs: 2400,
} as const;

export const navItems = [
  { href: '#about', label: 'Index' },
  { href: '#stack', label: 'Stack' },
  { href: '#me', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const;

export const stack = {
  description: '문제에 맞는 도구를 고릅니다. 지금 가장 자주 쓰는 것들입니다.',
  groups: [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Zustand'] },
    { category: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma'] },
    { category: 'DevOps', items: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'] },
    { category: 'Tools', items: ['Figma', 'Git', 'Storybook', 'Jest'] },
  ],
} as const;

export const about =
  '저를 소개하는 가장 정확한 방법은 API 한 번 호출하는 것. 명확한 스펙, 예측 가능한 응답, 문서화된 에러를 좋아합니다.';

export const faqs = [
  {
    question: '어떤 개발자인가요?',
    answer: '눈에 보이지 않는 곳을 단단하게 만드는 백엔드 개발자입니다. 빠른 것보다 오래 버티는 구조를 고민합니다.',
  },
  {
    question: '일할 때 가장 중요하게 생각하는 건?',
    answer: '공유입니다. 막히면 먼저 묻고, 해결하면 문서로 남겨서 팀이 같은 문제를 두 번 겪지 않게 합니다.',
  },
  {
    question: '요즘 관심 있는 것은?',
    answer: '대규모 트래픽 처리와 관측 가능성(Observability). 로그와 지표로 서비스를 이해하는 법을 공부하고 있습니다.',
  },
] as const;

export const contactLinks = [
  { label: 'Email', value: 'hi@jiho.dev →', href: 'mailto:hi@jiho.dev' },
  { label: 'GitHub', value: '@jiho-park ↗', href: '#' },
  { label: 'LinkedIn', value: 'in/jiho-park ↗', href: '#' },
  { label: 'Resume', value: 'park-jiho.pdf ↓', href: '#' },
] as const;
