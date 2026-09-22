# Broadcast · Engineering Notes

증권방송 설계를 기반으로 문제 해결 과정과 기술적 판단을 기록하는 포트폴리오 초안입니다.

## 실행

Node.js 22.13 이상 권장.

```sh
npm ci
npm run dev
```

http://localhost:3000 에서 확인합니다.

```sh
npm run build
npm run lint
```

정적 빌드 결과는 `out/`입니다. `next start` 대신 정적 호스팅으로 제공합니다.

## 구성

- Next.js App Router / React / TypeScript
- Recharts: Canvas DPR과 픽셀 버퍼 메모리을 비교하는 설명용 차트
- 클릭 가능한 SVG 설계 지도와 사례 3개
- 각 사례: 설계 근거 → 문제 가정 → 원인 파악 → 대안 비교 → 구현 의사코드 → 검증 계획 → 기여와 근거
- 모바일 반응형, 키보드 탐색, 사례별 제목·설명

## 내용 수정

- `src/data/cases.ts`: 사례 내용과 의사코드
- `src/app/page.tsx`: 소개, 역할, 프로젝트 정보
- `src/components/architecture.tsx`: 설계 지도와 연결된 사례
- `src/components/tradeoff-chart.tsx`: 설명용 계산 모델
- `src/app/globals.css`: 공통 디자인
- `docs/WRITING_GUIDE.md`: 실제 경험과 증거로 완성하는 방법

현재 사례는 실제 장애 경험이나 구현 실적이 아닙니다. 원본에서 확인한 사실과 추가 제안을 구분했습니다. 실제 측정치나 커밋은 제공받지 않아 만들지 않았습니다.

## 배포

`output: 'export'`로 정적 페이지를 생성합니다. GitHub Pages의 프로젝트 하위 경로에 배포한다면 `next.config.ts`에 저장소 이름에 해당하는 `basePath`를 설정한 후 다시 빌드하세요. `out/`를 게시하고 `.nojekyll` 파일을 유지합니다.

참고: https://nextjs.org/docs/app/guides/static-exports

