# Broadcast · Engineering Notes

방송 서비스 개발에서 마주한 상황과 제약, 고민과 선택의 이유를 기록하는 포트폴리오입니다.

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
- 각 사례: 상황과 제약 → 고민 → 대안과 선택 → 해결 방법 → 결과와 한계 → 기여와 근거
- 모바일 반응형, 키보드 탐색, 사례별 제목·설명

## 내용 수정

- `src/data/cases.ts`: 사례 내용과 의사코드
- `src/app/page.tsx`: 소개, 역할, 프로젝트 정보
- `src/components/architecture.tsx`: 설계 지도와 연결된 사례
- `src/components/tradeoff-chart.tsx`: 설명용 계산 모델
- `src/app/globals.css`: 공통 디자인
- `docs/WRITING_GUIDE.md`: 실제 경험과 증거로 완성하는 방법

VOD 사례는 본인이 설명한 단일 TS + HLS BYTERANGE 전환 경험입니다. FFmpeg 설정 변경과 플레이어 연동을 담당했으며 재생 대기 시간은 당시 8초에서 3초로 개선됐습니다. 측정 환경·반복 횟수·실제 커밋은 미제공이며, 공개된 명령과 HTTP 예시는 기술 설명용입니다. 다른 두 사례는 실제 구현을 단정하지 않는 작성 예시입니다.

## 배포

`output: 'export'`로 정적 페이지를 생성합니다. GitHub Pages의 프로젝트 하위 경로에 배포한다면 `next.config.ts`에 저장소 이름에 해당하는 `basePath`를 설정한 후 다시 빌드하세요. `out/`를 게시하고 `.nojekyll` 파일을 유지합니다.

참고: https://nextjs.org/docs/app/guides/static-exports

