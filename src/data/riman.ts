export const rimanAreas = [
  { id: "members", number: "01", category: "MEMBERS", title: "회원 검색과 등급 변경", summary: "조건에 맞는 회원을 찾고, 상세 정보를 확인한 뒤 등급을 변경하는 관리자 화면입니다.", contributions: ["회원 검색·조건별 필터 화면 구현", "회원 상세 정보 조회 화면 구현", "회원 등급 변경 API 연동"] },
  { id: "audit", number: "02", category: "AUDIT LOG", title: "관리자 작업 이력 조회", summary: "회원 승급·삭제 등 주요 관리자 작업의 변경 내역을 추적할 수 있도록 감사 로그 조회 화면을 구현했습니다.", contributions: ["관리자 주요 작업에 대한 감사 로그 조회 화면 구현", "작업 이력을 통한 변경 내역 추적 지원"] },
  { id: "products", number: "03", category: "PRODUCTS", title: "상품 이미지와 정보 등록", summary: "화장품 이미지와 가격·수량 등 상품 정보를 입력하고 등록하는 관리 UI를 개발했습니다.", contributions: ["화장품 이미지 업로드 UI 구현", "가격·수량 등 상품 정보 입력·등록 기능 개발"] },
  { id: "orders", number: "04", category: "ORDERS", title: "주문 조회와 상태 변경", summary: "주문 목록과 상세 정보를 확인하고, 고객 1:1 문의에 따라 관리자가 주문 상태를 변경하는 기능을 개발했습니다.", contributions: ["주문 목록·상세 정보 조회 UI 구현", "고객 1:1 문의에 따른 관리자 주문 상태 변경 기능 개발"] },
  { id: "shipping", number: "05", category: "SHIPPING", title: "배송 조회와 운송장 등록", summary: "배송 상태를 조회하고, 배송 대상별 운송장 번호를 입력·등록하는 흐름을 구현했습니다.", contributions: ["배송 상태 조회 화면 구현", "배송 대상별 운송장 번호 입력·등록 API 연동"] },
  { id: "contents", number: "06", category: "BANNERS / POPUPS", title: "배너·팝업 노출 관리", summary: "이미지와 연결 URL을 등록하고, 노출 여부와 기간을 설정하는 관리 UI를 개발했습니다.", contributions: ["배너·팝업 이미지 업로드 UI 구현", "연결 URL 입력 기능 개발", "노출 여부·기간 설정 기능 개발"] },
  { id: "consultation", number: "07", category: "CONSULTATION", title: "1:1 문의와 전화 상담", summary: "회원·주문 정보를 확인하며 상담하고, 해결 내용을 기록한 뒤 문의를 완료하는 상세 화면입니다.", contributions: ["회원 상세 탭에서 주문 내역 확인 및 전화 상담 가능", "처리 중인 문의의 다른 상담원 처리 제한", "해결 내용 입력 후 완료 버튼 사용 가능"] },
];

export type RimanRecord = {
  id: string;
  category: string;
  title: string;
  summary: string;
  requirement: string;
  flow: { title: string; text: string }[];
  rules: string[];
  benefit: string;
  cost: string;
  ownership: string;
};

export const rimanRecords: RimanRecord[] = [
  {
    id: "consultation-record",
    category: "CONSULTATION / UI STATE",
    title: "해결 내용 입력 여부로 상담 완료 버튼 제어",
    summary: "회원·주문 조회와 전화 상담을 같은 탭에서 처리. 해결 내용 입력 후 완료 버튼 활성화.",
    requirement: "통화가 끝나도 해결 내용이 기록되지 않았다면 문의를 완료할 수 없도록 구성. 처리 중인 문의는 다른 상담원의 처리 제한.",
    flow: [
      { title: "회원·주문 확인", text: "회원 정보를 클릭해 상세 탭을 열고 주문 내역 확인" },
      { title: "전화 상담", text: "같은 탭에서 전화 상담 진행. 처리 중인 문의는 다른 상담원의 처리 제한" },
      { title: "해결 내용 기록", text: "통화 후 해결 내용을 직접 입력" },
      { title: "문의 완료", text: "해결 내용을 기록한 뒤 완료 버튼 사용 가능" },
    ],
    rules: [
      "처리 중 상태와 해결 내용 입력 여부를 각각 UI 조건으로 사용.",
      "문의 상세 화면에서 해결 내용을 기록하고 완료 처리.",
    ],
    benefit: "화면 이동을 줄이기 위해 회원·주문 조회와 전화 상담을 같은 탭에 배치. 통화 종료와 문의 완료를 구분해 해결 기록 누락 방지를 우선.",
    cost: "통화 후 기록 입력·완료 단계가 추가됨. 즉시 종료하는 편의성보다 해결 내용을 남기는 절차를 선택.",
    ownership: "회원·주문 조회 탭, 상담 상세 화면, 처리 상태와 입력 내용에 따른 UI 제어.",
  },
  {
    id: "shipping-record",
    category: "SHIPPING / STATE UPDATE",
    title: "상품별 출고 상태와 주문 완료 조건 분리",
    summary: "일부 상품 출고 시 ‘출고 중’ 유지. 전량 출고 후 완료 버튼 활성화, 변경 대상 행만 갱신.",
    requirement: "주문 하나에 여러 상품이 포함되고 부분 출고도 가능. 일부 상품의 출고를 주문 전체의 완료로 처리하지 않도록 상태 구분 필요.",
    flow: [
      { title: "작업자 로그인", text: "실제 출고한 직원이 로그인해 상태 업데이트" },
      { title: "부분 출고 반영", text: "주문 내 일부 상품의 출고 업데이트 가능" },
      { title: "출고 중 유지", text: "미출고 상품이 남으면 완료 버튼 사용 불가" },
      { title: "전량 출고 후 완료", text: "모든 상품이 출고된 뒤 완료 버튼 사용 가능" },
    ],
    rules: [
      "상태 변경 시 전체 목록 대신 변경 대상 행만 갱신.",
      "업데이트 실패 목록·항목 확인 안내와 문의사항 추가 흐름 구성.",
    ],
    benefit: "부분 출고를 반영하되, 완료 버튼은 모든 상품의 출고 여부로 제어. 전체 목록 재조회 대신 변경 대상 행을 갱신하는 방식 선택.",
    cost: "상품별 상태와 주문 완료 조건을 함께 관리. 행 단위 갱신만으로는 다른 행에서 발생한 변경까지 반영할 수 없음.",
    ownership: "출고 상태 업데이트 UI, 완료 버튼 조건, 대상 행 갱신과 실패 항목 안내 흐름.",
  },
];
