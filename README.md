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
- 사례 01: 영상·음성 분리와 커스텀 메타데이터 기반 재동기화
- 사례 02: ABR 유지·720p 상한과 방송 지연·기기 안정성의 절충
- 클릭 가능한 SVG 설계 지도와 사례 3개
- 각 사례: 상황과 제약 → 고민 → 대안과 선택 → 해결 방법 → 결과와 한계 → 기여와 근거
- 모바일 반응형, 키보드 탐색, 사례별 제목·설명

## 내용 수정

- `src/data/cases.ts`: 사례 내용과 의사코드
- `src/app/page.tsx`: 소개, 역할, 프로젝트 정보
- `src/components/architecture.tsx`: 설계 지도와 연결된 사례
- `docs/AV_SYNC_RECALL.md`: 커스텀 메타데이터·재생 제어의 검증·복원 항목
- `docs/ABR_RECALL.md`: 서버 인코딩·플레이어 설정을 복원할 배경과 측정 기록 틀
- `src/app/globals.css`: 공통 디자인
- `docs/WRITING_GUIDE.md`: 실제 경험과 증거로 완성하는 방법

VOD 사례는 본인이 설명한 단일 TS + HLS BYTERANGE 전환 경험입니다. FFmpeg 설정 변경과 플레이어 연동을 담당했으며 재생 대기 시간은 당시 8초에서 3초로 개선됐습니다. 측정 환경·반복 횟수·실제 커밋은 미제공이며, 공개된 명령과 HTTP 예시는 기술 설명용입니다. ABR 사례는 1080p 구성의 부담과 LL-HLS 환경의 방송-시청 지연 증가(약 2.5초 → 3.5~4초), 저사양 발열·화면 튕김을 경험한 뒤 최대 720p로 제한한 기록입니다. 제한 후 방송-시청 지연은 3.5~4초에서 약 2.5초로 안정화됐고 기기 증상도 감소했습니다. 반복 측정 분포와 정확한 비트레이트 상한은 미확인입니다. 영상·음성 동기화 사례는 분리 파일과 별도 video/audio 요소, 커스텀 m3u8 시간 차이 메타데이터, 0.5초 기준의 화면 표시·재동기화 경험입니다. 0.5초는 제어 정책이며 정량 성과나 표준 지각 허용 오차가 아닙니다.

## 배포

`output: 'export'`로 정적 페이지를 생성합니다. GitHub Pages의 프로젝트 하위 경로에 배포한다면 `next.config.ts`에 저장소 이름에 해당하는 `basePath`를 설정한 후 다시 빌드하세요. `out/`를 게시하고 `.nojekyll` 파일을 유지합니다.

참고: https://nextjs.org/docs/app/guides/static-exports

