export const profile = {
  name: 'Gim Minsu',
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
    { category: 'Database', items: ['PostgreSQL', 'MySQL', 'Redis', 'SQLite'] },
    { category: 'DevOps', items: ['Docker', 'AWS', 'Grafana', 'Cloudflare', 'GitHub Actions'] },
    { category: 'Tools', items: ['GitHub', 'Git', 'JetBrains', 'VS Code', 'Superset'] },
  ],
} as const;

export const about =
  '안녕하세요, Backend Engineer 김민수입니다. 서버 아키텍처와 파이프라인, 기술 스택을 우리 서비스에 어떤 것이 적합할지 고민하고, 최적의 성능을 만들면서 비용을 줄이는 방법을 찾아가는 과정이 정말 즐거웠습니다. 또한 도메인과의 협업을 통해서 서비스의 방향성을 이해하고, 그에 맞는 기술적 해결책을 제시하는 과정에서 많은 성취감을 느꼈습니다. 앞으로도 다양한 분야에서 경험을 쌓고, 문제를 해결하는 개발자가 되고 싶습니다.';

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

/** Search and AI-crawler metadata; keep `index.html`'s meta tags in sync with these. */
export const site = {
  url: 'https://portfolio.heijionline.com/',
  title: '김민수 (Gim Minsu) — Developer Portfolio',
  description:
    '개발자 김민수(Gim Minsu)의 포트폴리오. Spring Boot · Kotlin · FastAPI 기반 서버 아키텍처 설계와 비용 최적화 경험, Collabops · 책마루 · ARCHIVE 프로젝트를 소개합니다.',
  language: 'ko-KR',
} as const;
