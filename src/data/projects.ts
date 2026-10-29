import { mediaFor, type GalleryMedia, type Media } from './projectMedia';

/** Text shown under a gallery slide: a short caption on the counter line, plus an optional paragraph. */
export interface SlideText {
  caption?: string;
  description?: string;
}

export interface GallerySlide extends GalleryMedia, SlideText {}

export interface ProjectSection {
  title: string;
  body?: string;
  items?: string[];
}

interface ProjectEntry {
  /**
   * Folder under `src/assets/projects/` holding this project's images and videos:
   * `cover.*` is the card media in the Projects list, `01.*`, `02.*`… are the detail gallery slides.
   */
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  period: string;
  team: string;
  stack: string;
  /** Case-study sections; a section shows `body` as a paragraph, then `items` as a bullet list. */
  sections: ProjectSection[];
  /**
   * Text for the gallery slides, keyed by file name without extension. Slides without an entry show no text.
   * @example gallery: { '01': { caption: '메인 화면', description: '문서 목록과 실시간 편집 화면.' } }
   */
  gallery?: Record<string, SlideText>;
}

export interface Project extends Omit<ProjectEntry, 'gallery'> {
  cover?: Media;
  gallery: GallerySlide[];
}

/** One slide per media file, with the text registered for its file name. */
function withImages({ gallery: texts = {}, ...entry }: ProjectEntry): Project {
  const { cover, gallery } = mediaFor(entry.slug);
  return {
    ...entry,
    cover,
    gallery: gallery.map((media) => ({ ...media, ...texts[media.name] })),
  };
}

const entries: ProjectEntry[] = [
  {
    slug: 'collabops',
    gallery: {
      '01': {
        caption: '서비스 아이콘'
      },
      '02': {
        caption: '문서 서비스 화면'
      }
    },
    title: 'Collabops',
    category: 'Industry Collaboration',
    year: '2026',
    summary: 'Collabops 기업과의 산학협력으로 문서 도메인의 실시간 편집 기능을 zero to one으로 개발하고 런칭한 프로젝트.',
    role: 'PM · BE',
    period: '2026.03 — Present',
    team: '산학협력 팀 5명',
    stack: 'ReBAC / RBAC · CI/CD · FastAPI · PostgreSQL',
    sections: [
      {
        title: '프로젝트 개요',
        body: 'Collabops 기업과 진행한 산학협력 프로젝트입니다. 팀장으로서 구성원 5명을 이끌고 매주 1회 CTO와 미팅을 진행하며, 기획서에 맞춰 문서 도메인의 실시간 편집 기능을 처음부터 개발해 실제 서비스에 런칭했습니다.',
      },
      {
        title: '문제 정의',
        items: [
          '기존 문서 도메인에는 여러 사용자가 같은 문서를 동시에 편집할 수 있는 기능이 없었습니다.',
          '새 기능은 OnPrem과 SaaS 두 형태로 제공되는 기존 k8s 아키텍처, ReBAC/RBAC 기반 권한 체계 위에서 문제없이 동작해야 했습니다.',
          '학생 팀이지만 기업의 CI/CD 파이프라인과 보안·성능 기준을 그대로 통과하는 수준의 결과물이 필요했습니다.',
        ],
      },
      {
        title: '주요 기능',
        items: [
          '문서 실시간 편집 — 여러 사용자가 동시에 문서를 편집하고, 변경 사항이 실시간으로 반영되도록 구현',
          '문서 접근 권한 관리 — ReBAC/RBAC 기반 권한 체계에 맞춰 문서 접근 권한을 관리하고, 사용자별로 편집 권한을 부여'
        ],
      },
      {
        title: '해결한 문제',
        items: [
          '기존 아키텍처와의 정합성을 위해 OnPrem/SaaS 환경의 k8s pod 구조와 ReBAC/RBAC 권한 방식에 맞춰 아키텍처를 설계한 뒤 실시간 편집 기능을 얹어, 보안 테스트와 성능 테스트를 모두 통과했습니다.',
          '기업과 학생 팀 사이의 요구사항 정렬 — 주 1회 CTO 미팅에서 기획서 기준으로 우선순위를 맞추고, 팀장으로서 5명의 작업을 분배해 일정 안에 런칭했습니다.',
          '작은 개선의 반복 — 큰 기능 개발과 별개로 팀 내부에서 작은 기획(PRD)을 직접 만들고 배포까지 이어지는 흐름을 만들어, 매일 실제 사용자 화면을 개선했습니다.',
        ],
      },
      {
        title: '결과 및 회고',
        body: '실시간 편집 기능을 런칭까지 완료했고, 기업의 배포 파이프라인과 보안·성능 테스트 기준을 통과했습니다. 학교 프로젝트와 달리 이미 운영 중인 시스템 위에서 개발하면서, 새 기능을 만드는 것보다 기존 아키텍처·권한·배포 흐름과 맞물리게 하는 일이 더 중요하다는 것을 배웠습니다. 또 팀장으로서 기능을 직접 만드는 것만큼 요구사항을 문서로 정리하고 팀에 전달하는 일이 결과물의 품질을 좌우한다는 것을 체감했습니다.',
      },
    ],
  },
  {
    slug: 'chaekmaru',
    gallery: {
      '01': {
        caption: '서비스 소개 커버'
      }
    },
    title: '책마루',
    category: 'App Service',
    year: '2026',
    summary: '도서관 책 대여를 할 수 있고, 책 검색 및 추천을 받을 수 있는 교내 도서 관리 서비스.',
    role: 'PM · BE',
    period: '2026.1 — 2026.5',
    team: 'FE 2 · BE 1 · AI 1 · DE 2',
    stack: 'Spring Boot · Kotlin · PostgreSQL · Redis · OAuth2 · QueryDSL · SSE',
    sections: [
      {
        title: '프로젝트 개요',
        body: '교내 도서관의 책 대여·예약·반납과 도서 검색, 추천을 제공하는 도서 관리 서비스입니다. PM이자 유일한 백엔드 개발자로 참여해 Spring Boot · Kotlin 서버를 구축하고 REST API 약 50개를 설계했습니다. 2025년에 Java로 만든 첫 번째 버전의 전체적인 서비스 개편 당시 유지보수가 쉬운 구조로 만들기 위해 Kotlin과 Hexagonal · DDD 아키텍처로 재구축했습니다.',
      },
      {
        title: '문제 정의',
        items: [
          'V1에서는 기능이 늘어날수록 도메인 로직과 DB·외부 연동 코드가 얽혀, 작은 변경에도 수정 범위가 커졌습니다.',
          '도서 검색을 위해 ElasticSearch를 별도로 운영하면서 서비스 규모에 비해 큰 AWS 추가 비용이 발생했습니다.',
          '사용자가 가장 자주 보는 메인 페이지와 랭킹 페이지가 요청마다 DB에서 데이터를 조회·정렬해, 사용자가 늘수록 DB 부하가 함께 늘어났습니다.',
        ],
      },
      {
        title: '주요 기능',
        items: [
          '도서 대여 · 예약 · 반납과 연체 자동 처리, 사서용 대여 승인',
          'PostgreSQL Full-Text Search 기반 소속 도서관별 도서 검색',
          '메인 · 랭킹 · 도서 상세 · 마이페이지 등 조회 화면',
          '도서 좋아요, 댓글과 댓글 좋아요 커뮤니티',
          'OAuth2 소셜 로그인과 JWT 인증, SSE를 활용한 실시간 갱신',
        ],
      },
      {
        title: '해결한 문제',
        items: [
          '검색 엔진 비용 — ElasticSearch를 걷어내고 기존 PostgreSQL 컬럼의 tsvector를 활용한 FTS 검색으로 전환해 검색 엔진 추가 비용을 100% 절감했습니다. Hexagonal 구조 덕분에 검색 어댑터만 교체하고 도메인 로직은 그대로 유지했습니다.',
          '메인 · 랭킹 페이지 DB 부하 — 요청마다 정렬하던 데이터를 스케줄러가 주기적으로 계산해 Redis에 캐시하도록 바꿨습니다. 요청 수에 비례해 늘던 DB 조회가 배치 주기당 한 번으로 줄었고, 사용자는 캐시된 데이터를 바로 받아 화면 렌더링이 빨라졌습니다.',
          '유지보수성 — 프레임워크에 의존하지 않는 application 모듈과 Spring 기반 infrastructure 모듈로 분리하고, 도메인별 포트로 경계를 나눠 기능 추가·교체 시 수정 범위를 해당 어댑터로 한정했습니다.',
        ],
      },
      {
        title: '결과 및 회고',
        body: '교내에서 3팀만 선발되는 AI Expo에서 11팀 중 2위로 선발되어 전시를 진행했습니다. 처음 Java로 만들 때는 기능을 빨리 붙이는 데 집중했다면, V2에서는 바뀔 가능성이 높은 부분을 어댑터로 분리해 두는 설계가 실제로 비용 절감 같은 큰 변경을 쉽게 만든다는 것을 경험했습니다. 기술 선택도 *많이 쓰는 도구*보다 우리 서비스 규모에 맞는 도구를 고르는 것이 중요하다는 것을 배웠습니다.',
      },
    ],
  },
  {
    slug: 'archive',
    gallery: {
      '01': {
        caption: '원간 캘린더 화면'
      },
      '02': {
        caption: '회고 화면'
      },
      '03': {
        caption: '주간 요약 화면'
      },
      '04': {
        caption: '회고 본문 화면'
      }
    },
    title: 'ARCHIVE',
    category: 'AI Productivity',
    year: '2026',
    summary: '할 일과 회고를 기록하면 AI가 기간별 회고를 요약하고, 관심 주제별로 기록을 모아 정리해 주는 개인 회고 아카이브.',
    role: 'Full-stack · AI',
    period: '2026.05 — Present',
    team: 'Solo',
    stack: 'FastAPI · PostgreSQL(pgvector) · Redis · Celery · Gemini · React · TypeScript',
    sections: [
      {
        title: '프로젝트 개요',
        body: '할 일과 하루 회고를 기록하면 GitHub 커밋, Google Calendar 일정과 연결해 주간·월간·연간 회고를 AI가 자동으로 요약하고, 사용자가 정한 주제에 맞는 기록을 임베딩 검색으로 모아 정리해 주는 서비스입니다. 기획부터 FE · BE · AI까지 혼자 개발했고, 서버는 FastAPI와 Clean Architecture로 구성했습니다.',
      },
      {
        title: '문제 정의',
        items: [
          '회고에 대한 기록은 매일 쌓이지만, 지난 기록을 다시 읽고 흐름을 정리하는 데는 시간이 많이 든다.',
          '일정 관리 툴들이 제공하는 반복 일정과 알림 기능은 단순히 일정만 알려주고, 회고를 작성하고 정리하는 데는 도움을 주지 못한다.',
          'AI를 활용한 회고 요약과 주제별 정리 기능은 이미 존재하지만, 사용자가 기록한 회고를 기반으로 한 개인화된 요약과 정리 기능은 부족하다.',
        ],
      },
      {
        title: '주요 기능',
        items: [
          '할 일 관리 — 할 일 관리를 통한 일정 관리와 반복 할 일을 관리할 수 있으며 Google Calendar 동기화가 가능하다.',
          '회고록 작성 — 폴더 · 템플릿, GitHub 커밋 조회와 회고 push.',
          'AI 기간별 요약 — 자정 자동 요약과 오래걸리는 작업을 worker를 통해 관리하고, SSE 스트리밍 생성을 하여 작업 완료시 알림을 전송한다.',
          '주제 정리 — pgvector 임베딩으로 관련 회고를 찾아 주제별 회고 생성'
        ],
      },
      {
        title: '해결한 문제',
        items: [
          '자정 요약 트래픽 집중 — Celery beat가 요약 요청을 큐에 적재하고 Redis broker를 통해 워커가 처리하도록 분리했습니다. AI 요약 · 스케줄러 · 캘린더 동기화를 각각 다른 큐와 워커 컨테이너로 나눠 무거운 작업이 서로를 막지 않게 했고, SSE 스트리밍으로 요약이 끝나면 바로 알림을 보내도록 했습니다.',
          '요약 작업 레이스 컨디션 — 요청 트랜잭션이 커밋되기 전에 워커가 먼저 실행돼 요약이 PENDING에 멈추던 문제를 찾아, 큐 적재 시점을 커밋 이후로 옮기고 워커에서 직접 재시도하도록 고쳤습니다. 이 과정에서 비동기 task에서는 기존 자동 재시도가 동작하지 않던 문제도 함께 해결했습니다.',
          '주제 정리의 맥락 유실과 비용 — 500자 청크만 프롬프트에 실려 앞뒤 맥락이 잘리던 문제를 인접 청크를 함께 붙여 보완했습니다. 매번 전체를 다시 생성하던 방식은 새 기록만 병합하는 증분 생성으로 바꿔 회고 20건 이상 주제에서 입력 토큰을 전체 대비 9~69% 수준으로 줄이고, 5회마다 전체 재생성해 품질 저하를 막았습니다.',
          'AI 비용 가드레일 — 모든 LLM 호출의 토큰 사용량을 사용자 · 기능별로 기록하고, 기록이 없는 기간은 AI 호출을 생략하며, 주제 정리는 사용자별 24시간 10회로 제한했습니다.',
          'Google Calendar 동기화 불일치 — 날짜 이동 시 시간이 따라가지 않던 문제, 반복 일정의 한 회차 수정이 반영되지 않던 문제, 커밋 전 동기화 작업이 먼저 실행되던 race를 실제 Postgres 두 세션으로 재현한 테스트로 확인하고 수정했습니다.',
        ],
      },
      {
        title: '결과 및 회고',
        body: '정식 배포 전이지만 직접 매일 사용하면서 발견한 문제를 계속 개선하고 있고, 테스트 약 290개로 주요 흐름을 검증하고 있습니다. 혼자 FE부터 AI까지 만들면서, AI 기능은 "동작하는가"만큼 "얼마의 비용으로 동작하는가"를 설계 단계에서 함께 고민해야 한다는 것을 배웠습니다. 또 AI 코딩 에이전트에 아키텍처 규칙과 검증 절차를 문서로 정해 두고 계획 → 구현 → 별도 세션 검증 순서로 개발하면서, AI를 빠르게 쓰는 것보다 결과를 검증하는 구조를 만드는 것이 더 중요하다는 것을 느꼈습니다.',
      },
    ],
  },
];

export const projects: Project[] = entries.map(withImages);
