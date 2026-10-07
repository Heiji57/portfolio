# Project images

프로젝트 이미지를 `<slug>/` 폴더에 넣으면 자동으로 반영됩니다. (slug는 `src/data/projects.ts`의 `slug` 값)

```
src/assets/projects/
  chaekmaru/
    cover.webp   ← 프로젝트 목록 카드 + 상세 하단 "다음 프로젝트" 미리보기
    01.webp      ← 상세 갤러리 1번 슬라이드 (메인 화면)
    02.webp      ← 2번 슬라이드 (핵심 기능)
    ...
```

- 지원 확장자: png, jpg, jpeg, webp, avif, gif, svg
- 갤러리는 파일 이름 순(숫자 인식)으로 정렬되어 캡션과 순서대로 짝지어집니다.
- 캡션은 기본값(`galleryCaptions`)을 쓰고, 프로젝트별로 `galleryCaptions`를 지정해 바꿀 수 있습니다.
- 이미지가 캡션보다 많으면 슬라이드가 늘어나고(`Image 06` …), 없는 자리는 스트라이프 placeholder로 표시됩니다.
- 권장 비율: cover 16:11, 갤러리 16:10 (다른 비율은 `object-cover`로 잘려 맞춰집니다).
