export interface Project {
  title: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  period: string;
  team: string;
  stack: string;
  sections: { title: string; body: string }[];
}

/** Captions for the five gallery slides shown on every project detail page. */
export const galleryCaptions = ['메인 화면', '핵심 기능', '관리 · 설정 화면', '아키텍처', '결과 · 지표'];

export const projects: Project[] = [
  {
    title: '책마루',
    category: 'App Service',
    year: '2026',
    summary: '도서관 책 대여를 할 수 있고, 책 검색 및 추천을 받을 수 있는 교내 도서 관리 서비스.',
    role: 'PM · BE',
    period: '2026.1 — 2026.5',
    team: 'FE 2 · BE 1 · AI 1 · DE 2',
    stack: 'Spring Boot · Kotlin PostgreSQL · Redis OAuth2 · QueryDSL',
    sections: [
      {
        title: 'Problem',
        body: '외출 신청은 종이, 벌점은 엑셀, 세탁기는 줄서기. 사감 선생님과 학생 모두 같은 정보를 세 군데에서 확인해야 했습니다.',
      },
      {
        title: 'Approach',
        body: '역할(학생·사감)별 대시보드를 분리하고, 실시간 예약 상태는 WebSocket으로 동기화했습니다. 공통 UI는 디자인 시스템으로 묶어 Storybook에 문서화했습니다.',
      },
      { title: 'Result', body: '기숙생 400명이 매일 사용하는 서비스가 되었고, 종이 외출증은 학기 중 완전히 사라졌습니다.' },
    ],
  },
  {
    title: 'Moim',
    category: 'Web Platform',
    year: '2025',
    summary: '관심사 기반으로 동아리와 학생을 이어주는 매칭 플랫폼.',
    role: 'Fullstack',
    period: '2025.05 — 2025.08',
    team: 'Dev 3 · Design 1',
    stack: 'React · Firebase',
    sections: [
      { title: 'Problem', body: '동아리 홍보는 게시판 포스터에 의존했고, 신입생은 어떤 동아리가 있는지조차 알기 어려웠습니다.' },
      { title: 'Approach', body: '관심 태그를 고르면 맞는 동아리를 추천하고, 지원서 작성부터 면접 일정까지 한 흐름으로 묶었습니다.' },
      { title: 'Result', body: '신입생 모집 기간 동안 전체 동아리 지원의 대부분이 Moim을 통해 이뤄졌습니다.' },
    ],
  },
  {
    title: 'Pickle',
    category: 'Mobile App',
    year: '2025',
    summary: '오늘의 급식과 알레르기 정보를 매일 아침 알려주는 앱.',
    role: 'Mobile Dev',
    period: '2025.01 — 2025.03',
    team: 'Dev 2',
    stack: 'React Native · Expo',
    sections: [
      { title: 'Problem', body: '급식표는 학교 홈페이지 PDF로만 올라와 휴대폰에서 확인하기 번거로웠습니다.' },
      { title: 'Approach', body: 'NEIS 급식 API를 캐싱하고, 사용자가 등록한 알레르기 성분을 메뉴에서 강조했습니다.' },
      { title: 'Result', body: '앱스토어에 출시해 교내외 학생들이 아침 알림으로 급식을 확인하고 있습니다.' },
    ],
  },
  {
    title: 'Log.it',
    category: 'Blog Engine',
    year: '2024',
    summary: 'MDX로 글을 쓰고 바로 배포하는 개인 개발 블로그 엔진.',
    role: 'Solo',
    period: '2024.07 — 2024.10',
    team: '1',
    stack: 'Next.js · MDX',
    sections: [
      { title: 'Problem', body: '기존 블로그 플랫폼은 코드 블록과 커스텀 컴포넌트 표현에 제약이 많았습니다.' },
      { title: 'Approach', body: 'MDX 파이프라인 위에 코드 하이라이팅, 목차 자동 생성, OG 이미지 생성을 직접 구현했습니다.' },
      { title: 'Result', body: '지금 이 포트폴리오의 글과 기록도 Log.it으로 작성하고 있습니다.' },
    ],
  },
];
