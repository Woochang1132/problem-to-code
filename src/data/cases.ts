export type DecisionCase = {slug:string;category:string;location:string;title:string;summary:string;tradeoff:string;fact:string;source:string;problem:string;investigate:string[];options:{name:string;good:string;cost:string;selected?:boolean}[];decision:string;steps:string[];code:string;checks:string[];limits:string;evidence:string[]};
export const cases:DecisionCase[]=[{
slug:"player-state",category:"PLAYER INTEGRATION",location:"브라우저 Player ↔ IAM / WAS ↔ Gateway / CDN",title:"화면은 새 방송인데, 이전 이벤트가 도착한다면?",summary:"라이브·녹화 전환과 비동기 이벤트 사이에서 플레이어의 상태를 일관되게 유지하는 고민.",tradeoff:"빠른 화면 전환 ↔ 자원과 상태의 일관성",
fact:"설계에는 라이브/녹화 주소와 사용자 토큰을 받아 스트림을 요청하는 흐름이 있습니다. WebRTC 송출과 HLS 재생, 토큰 갱신, 방송 대기·재할당 상태가 함께 등장합니다.",source:"인증 시퀀스 · 브라우저 방송 연결 · WebRTC / HLS 경로",
problem:"[가정] 방송 A의 연결 응답이 늦는 동안 사용자가 방송 B로 이동합니다. A의 응답이나 SDK 이벤트가 나중에 도착해 B 화면의 재생 상태를 덮어쓰거나 해제되지 않은 오디오가 남을 수 있습니다. 실제 겪은 재현 상황으로 교체할 초안입니다.",
investigate:["소스 변경, 토큰 응답, SDK ready/error 이벤트, unmount 시점을 같은 전환 ID로 기록합니다.","느린 응답·빠른 연속 전환·컴포넌트 재마운트를 분리해서 재현합니다.","이전 인스턴스의 이벤트 리스너와 MediaStream 트랙이 남는지 확인합니다."],
options:[{name:"여러 boolean으로 상태 관리",good:"초기 구현이 빠름",cost:"loading·playing·error가 동시에 켜질 수 있음"},{name:"전환마다 화면 전체 재마운트",good:"컴포넌트 상태 초기화가 단순",cost:"UI 상태 손실, SDK 자원 정리는 여전히 필요"},{name:"명시적 상태 + 전환 세대 관리",good:"허용한 상태 전이만 적용하고 오래된 이벤트 무시",cost:"어댑터와 정리 계약을 별도로 설계",selected:true}],
decision:"작성 예시: idle → connecting → playing / waiting / error 상태를 명시합니다. 소스가 바뀔 때 전환 세대를 증가시키고, 이전 요청을 취소하면서 SDK 인스턴스와 이벤트를 정리합니다. WebRTC와 HLS는 같은 화면 상태 계약을 따르는 어댑터로 분리합니다.",
steps:["페이지가 선택한 방송과 플레이어가 실제 연결한 방송을 전환 ID로 연결합니다.","SDK의 연결·재생·종료 이벤트를 공통 상태 이벤트로 변환합니다.","AbortController로 취소 가능한 요청을 중단하고, 취소 불가 이벤트는 전환 ID로 차단합니다.","cleanup에서 리스너·타이머·어댑터 자원을 해제합니다. 미디어 트랙은 해당 어댑터가 소유한 경우에만 종료합니다."],
code:"// React effect 내부의 구현 방향을 보여주는 의사코드\nconst current = ++generation.current;\nconst abort = new AbortController();\nconst adapter = createPlayerAdapter(source.kind);\nlet disposed = false;\n\nadapter.connect(source, abort.signal).then(() => {\n  if (!disposed && current === generation.current) {\n    dispatch({ type: 'CONNECTED', sourceId: source.id });\n  }\n}).catch(error => {\n  if (!disposed && current === generation.current) {\n    dispatch({ type: 'FAILED', error });\n  }\n});\n\nreturn () => {\n  disposed = true;\n  abort.abort();\n  adapter.destroy(); // 늦은 완료도 정리하는 멱등 계약\n};",
checks:["A→B 전환 후 늦게 도착한 A 응답이 B 화면을 바꾸지 않는지 확인", "Strict Mode의 setup→cleanup→setup에서도 연결이 중복되지 않는지 확인", "라이브에서 녹화로 전환한 뒤 이전 오디오·타이머·리스너가 해제되는지 확인", "모바일 자동재생 거절 시 사용자가 누를 수 있는 재생 버튼 표시 확인"],
limits:"전환 ID는 서버 작업 자체를 취소하지 않습니다. SDK의 destroy 이후 늦은 연결 완료 처리까지 어댑터 계약에 포함해야 합니다. 모바일 자동재생과 전체화면 정책은 실제 지원 기기에서 검증해야 합니다.",
evidence:["직접 담당한 플레이어 연동 코드·어댑터와 커밋", "빠른 방송 전환 시 재현 영상과 이벤트 순서 로그", "지원 브라우저·기기, SDK 버전, 전환 후 자원 정리 결과"]
},{
slug:"mobile-canvas",category:"MOBILE & CANVAS",location:"브라우저 화면 → Player 영역 → Canvas 오버레이",title:"화면 크기가 달라지면, 그린 위치도 달라질까?",summary:"모바일 회전과 영상 여백, 고해상도 화면에서 Canvas의 위치와 선명도를 함께 다루는 고민.",tradeoff:"선명한 렌더링 ↔ 메모리와 좌표 처리 비용",
fact:"원본은 브라우저에서 방송을 송출·시청하는 경로를 제시합니다. 사용자께서 담당 영역으로 화면 설계, 모바일 설계, player 연동, canvas 수정을 확인했습니다. Canvas 용도와 좌표 정책은 원본에 명시되어 있지 않습니다.",source:"브라우저 연결 설계 + 본인 담당 영역 설명",
problem:"[가정] 플레이어 위에 표시하는 Canvas가 있다고 가정합니다. 모바일 회전이나 레이아웃 변경 후 포인터 위치와 그려지는 위치가 어긋나거나, CSS 크기만 늘려 선이 흐려질 수 있습니다. 실제 Canvas가 다른 용도였다면 이 사례를 해당 기능으로 바꿉니다.",
investigate:["포인터의 client 좌표, Canvas bounding rect, 실제 영상 표시 영역과 backing store 크기를 비교합니다.","영상 비율을 유지하는 contain 상태에서 좌우·상하 여백이 생기는지 확인합니다.","DPR 1·2·3, 가로/세로 회전, 화면 확대 조건에서 동일한 위치를 입력합니다."],
options:[{name:"CSS 크기만 변경",good:"레이아웃 처리가 간단",cost:"backing store 확대 시 흐림과 좌표 오차 가능"},{name:"기기 픽셀 좌표로 원본 저장",good:"현재 화면에서는 직접 대응",cost:"회전·리사이즈 시 기존 그림 재투영이 어려움"},{name:"정규화 좌표 + DPR 분리",good:"크기에 독립적인 데이터와 선명한 화면 렌더링",cost:"영상 표시 영역 계산과 전체 재그리기 필요",selected:true}],
decision:"작성 예시: 그림의 원본은 실제 영상 영역 기준 0~1 좌표로 저장합니다. CSS 표시 크기와 Canvas 픽셀 버퍼를 분리하고, resize마다 transform을 재설정한 뒤 원본 데이터에서 다시 그립니다. 낮은 사양에서는 DPR 상한을 두는 비용을 검토합니다.",
steps:["ResizeObserver로 표시 영역을 관찰하고 영상의 contain 여백을 계산합니다.","Pointer Events의 client 좌표를 실제 영상 영역 기준으로 정규화합니다. 여백 입력은 무시합니다.","backing store를 CSS 크기 × 적용 DPR로 설정하고 setTransform으로 누적 배율을 방지합니다.","크기 변경 시 원본 도형을 재투영합니다. 입력 이벤트는 모으고 requestAnimationFrame에서 한 번씩 그리는 방향을 검토합니다."],
code:"// 실제 영상 표시 영역을 계산한 이후의 예시\nfunction normalize(clientX: number, clientY: number,\n  videoRect: {left:number; top:number; width:number; height:number}) {\n  if (!videoRect.width || !videoRect.height) return null;\n  const x = (clientX - videoRect.left) / videoRect.width;\n  const y = (clientY - videoRect.top) / videoRect.height;\n  return x < 0 || x > 1 || y < 0 || y > 1 ? null : { x, y };\n}\n\nconst ratio = Math.min(window.devicePixelRatio || 1, 2);\ncanvas.width = Math.round(cssWidth * ratio);\ncanvas.height = Math.round(cssHeight * ratio);\nctx.setTransform(ratio, 0, 0, ratio, 0, 0);\nredrawFromNormalizedShapes(ctx, shapes, videoRect);",
checks:["모서리·중심점 입력이 리사이즈 후 같은 영상 위치에 남는지 확인", "가로/세로 회전과 contain 여백에서 입력 좌표 비교", "DPR별 흐림·메모리·프레임 시간 측정", "터치 그리기와 페이지 스크롤의 충돌 및 pointercancel 정리 확인"],
limits:"DPR 상한은 메모리를 줄이는 대신 고해상도 화면에서 선명도를 희생합니다. Canvas가 자막·영상 처리·도형 등 어떤 기능인지에 따라 모델이 달라집니다. 원본 좌표에 회전이나 영상 크롭이 있다면 별도의 변환이 필요합니다.",
evidence:["실제 Canvas 기능과 본인이 수정한 범위", "모바일 회전 전후의 좌표 비교 화면", "동일 기기에서 DPR 정책 전후 프레임 시간·메모리 측정"]
},{
slug:"recording-playlist",category:"PLAYBACK EXPERIENCE",location:"녹화정보 → Player 재생목록 → S3 / CDN",title:"하나의 방송이 여러 녹화로 나뉜다면?",summary:"녹화 중지·재개로 생긴 여러 파일을 사용자가 이해할 수 있는 재생목록으로 연결하는 고민.",tradeoff:"자연스러운 시청 흐름 ↔ 실패와 경계의 명확성",
fact:"방송 중 녹화를 중지·재개할 수 있고, 재개한 만큼 파일을 생성해 목록을 관리합니다. 재생목록은 플레이어에서만 표시하고 QLive에는 제공하지 않는다고 적혀 있습니다. 녹화정보에는 녹화번호·m3u8 파일이름·재생시간·삭제일시가 있습니다.",source:"녹화 중지/재개 정책 · 녹화정보 · 플레이어 재생목록 주석",
problem:"[가정] 목록을 보고 있는 동안 파일이 삭제되거나 재생 주소가 만료될 수 있습니다. 배열 순서만으로 현재 파일을 식별하면 새 목록을 받은 뒤 다른 녹화를 선택할 위험이 있습니다. 중지된 구간을 연속 시간처럼 표시하면 사용자도 오해할 수 있습니다.",
investigate:["녹화 순서·식별자·재생 가능 상태가 API에서 어떻게 제공되는지 확인합니다.","현재 항목 삭제, URL 만료, 빈 목록, 길이 미확정 항목을 각각 재현합니다.","자동 다음 재생과 사용자의 직접 선택이 동시에 발생하는 이벤트 순서를 확인합니다."],
options:[{name:"하나의 연속 타임라인",good:"단일 영상처럼 보이는 경험",cost:"녹화 공백·시간 오프셋·실패 경계 매핑이 복잡"},{name:"개별 파일 링크 목록",good:"항목과 실패 범위가 명확",cost:"파일 간 이동 때 시청 흐름이 끊김"},{name:"명시적 회차 + 선택적 다음 재생",good:"분할을 드러내면서 플레이어 안에서 이동",cost:"현재 항목·전환·오류 상태 관리 필요",selected:true}],
decision:"작성 예시: 녹화번호를 안정적인 식별자로 사용하고, 분할된 녹화를 명시적인 목록으로 보여줍니다. 자동 다음 재생 여부를 제품 정책으로 정하며, 실패한 항목을 조용히 건너뛰지 않고 재시도·다른 항목 선택을 제공합니다.",
steps:["녹화 ID, 표시 순서, 재생시간, 재생 가능 상태를 API 계약으로 정리합니다.","목록 갱신 시 현재 선택을 배열 index 대신 ID로 유지합니다.","항목 선택 시 재생 승인을 요청하고 player 어댑터에 새 소스를 전달합니다.","삭제·만료·네트워크 오류를 구분해 화면 메시지와 재시도 동작을 제공합니다. 접근 제어는 서버가 검증합니다."],
code:"// 목록 갱신 때 안정적인 ID로 선택을 조정하는 예시\ntype Recording = { id: string; playable: boolean };\nfunction reconcileSelection(\n  items: Recording[], currentId: string | null\n) {\n  const current = items.find(item => item.id === currentId);\n  if (current?.playable) return { id: current.id, removed: false };\n  return {\n    id: null,\n    removed: currentId !== null,\n  }; // 자동으로 다른 파일을 재생하지 않고 사용자에게 안내\n}",
checks:["목록 순서가 바뀌어도 같은 녹화가 선택되는지 확인", "현재 항목 삭제 시 재생을 정리하고 선택 해제·안내하는지 확인", "빈 목록·길이 미확정·만료 URL·재생 실패 상태 확인", "모바일에서 목록 접근과 재생 컨트롤, 키보드 포커스 이동 확인"],
limits:"프론트에서 항목을 숨기는 것은 접근 차단이 아닙니다. 서버의 재생 승인과 URL 정책이 필요합니다. 끊김 없는 연속 재생은 플레이어·미디어 구성에 따라 별도 검토가 필요하고 이 초안은 이를 보장하지 않습니다.",
evidence:["본인이 설계한 모바일·데스크톱 재생목록 화면", "실제 API 계약과 플레이어 연동 코드", "삭제·만료·재시도 흐름을 확인한 영상과 검증 결과"]
}];
