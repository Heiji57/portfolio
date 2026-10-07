export const profile = {
  name: 'Gim minsu',
  nameKo: '김민수',
  title: 'Developer',
  availability: 'Open to CONTACT',
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
    { category: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'Tailwind'] },
    { category: 'Backend', items: ['Spring boot', 'Java', 'Kotlin', 'FastAPI', 'Python', 'Go'] },
    { category: 'Database', items: ['PostgreSQL', 'MySQL', 'Redis', 'SQLlite'] },
    { category: 'DevOps', items: ['Docker', 'AWS', 'Grafana', 'Cloudflare', 'GitHub Actions'] },
    { category: 'Tools', items: ['GitHub', 'Git', 'JetBrains', 'VS Code', 'Super Set'] },
  ],
} as const;

export const about =
  '안녕하세요, Product Engineer 김민수입니다. 처음에는 제가 만든 서버에 사람들의 트래픽이 쌓이고, 그 정보들을 관리하는 것이 재미있어서 백엔드 개발자가 되었습니다. 서버 아키텍처와 파이프라인, 기술 스택을 우리 서비스에 어떤 것이 적합할지 고민하고, 최적의 성능을 만들면서 비용을 줄이는 방법을 찾아가는 과정이 정말 즐거웠습니다. 하지만 저는 하나의 분야에 얽매이지 않고, 하나의 서비스를 zero to one으로 만들 수 있는 개발자가 되고 싶어졌습니다. 그래서 그 이후로는 분야의 경계 없이 FE, AX, Infra 전체를 설계하며 Product 자체에 집중하는 개발자로 성장할 수 있었습니다.';

export const faqs = [
  {
    question: '어떤 개발자인가요?',
    answer: '하나의 전공 분야에 얽매이지 않고, 다양한 분야에서 경험을 쌓는 것을 좋아하는 개발자입니다.',
  },
  {
    question: '일할 때 가장 중요하게 생각하는 건?',
    answer: '조직이 원하는 것을 찾고, 그에 맞는 해결책을 제시하는 것 입니다.',
  },
  {
    question: '요즘 관심 있는 것은?',
    answer: '기존 작업을 자동화하여 생산성을 높이는 것에 관심이 있습니다.',
  },
] as const;

export const contactLinks = [
  { label: 'Email', value: 'heiji040804@gmail.com →', href: 'mailto:heiji040804@gmail.com' },
  { label: 'GitHub', value: 'Heiji ↗', href: 'https://github.com/Heiji57' },
  { label: 'LinkedIn', value: 'minsu ↗', href: 'https://www.linkedin.com/in/minsu-gim-501883392/' },
  { label: 'Resume', value: 'minsu.pdf ↓', href: 'minsu.pdf' },
] as const;
