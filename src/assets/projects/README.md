# Project images

프로젝트 이미지를 `<slug>/` 폴더에 넣으면 자동으로 반영됩니다. (slug는 `src/data/projects.ts`의 `slug` 값)

```
src/assets/projects/
  chaekmaru/
    cover.webp   ← 본문 "Selected Work" 목록의 프로젝트 카드 이미지 + 상세 하단 "다음 프로젝트" 미리보기
    01.webp      ← 상세 갤러리 1번 슬라이드 (메인 화면)
    02.webp      ← 2번 슬라이드 (핵심 기능)
    ...
```

- 지원 확장자: png, jpg, jpeg, webp, avif, gif, svg
- 갤러리는 파일 이름 순(숫자 인식)으로 정렬되어 캡션과 순서대로 짝지어집니다.
- 캡션은 기본값(`galleryCaptions`)을 쓰고, 프로젝트별로 `galleryCaptions`를 지정해 바꿀 수 있습니다.
- 갤러리 슬라이드 수는 넣은 이미지 개수와 같습니다. 이미지가 하나도 없으면 갤러리 영역 자체가 숨겨집니다.
- 캡션보다 이미지가 많으면 남는 슬라이드는 `Image 06` 식으로 표시됩니다.
- `cover`가 없으면 목록 카드에는 스트라이프 placeholder가 표시됩니다.
- 이미지는 잘리지 않고 전체가 보입니다(`object-contain`). 칸과 비율이 다르면 여백이 생깁니다. 권장 비율: cover 16:11, 갤러리 16:10.
