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
    category: "CONSULTATION / COMPLETION RULE",
    title: "상담 결과를 기록해야 문의를 완료하도록 구성",
    summary: "회원·주문 정보를 확인하며 상담하고, 해결 내용을 입력한 뒤에만 문의를 완료하도록 화면을 구성했습니다.",
    requirement: "1:1 문의는 상세 화면에서 처리했습니다. 전화 상담이 끝난 시점과 문의 해결 내용을 기록한 시점을 구분하고, 처리 중인 문의는 다른 상담원이 처리하지 못하도록 해야 했습니다.",
    flow: [
      { title: "회원·주문 확인", text: "회원 정보를 클릭해 상세 탭을 열고 주문 내역 확인" },
      { title: "전화 상담", text: "같은 탭에서 전화 상담 진행. 처리 중인 문의는 다른 상담원의 처리 제한" },
      { title: "해결 내용 기록", text: "통화 후 해결 내용을 직접 입력" },
      { title: "문의 완료", text: "해결 내용을 기록한 뒤 완료 버튼 사용 가능" },
    ],
    rules: [
      "회원 상세 탭에서 주문 확인과 전화 상담을 함께 진행하도록 구성.",
      "처리 중 상태에 따라 다른 상담원의 문의 처리 제한.",
      "통화 종료만으로 완료 처리하지 않고, 해결 내용 입력을 완료 버튼의 사용 조건에 반영.",
    ],
    benefit: "완료된 문의에 해결 내용이 남도록 구성했습니다. 회원·주문 확인과 전화 상담도 같은 탭에서 진행할 수 있게 했습니다.",
    cost: "상담원은 통화 후에도 해결 내용을 입력해야 합니다. 입력과 완료 단계를 추가하는 대신, 상담 결과 기록을 완료 조건으로 유지했습니다.",
    ownership: "회원·주문 조회 탭, 상담 상세 화면, 처리 상태와 입력 내용에 따른 UI 제어.",
  },
  {
    id: "shipping-record",
    category: "SHIPPING / PARTIAL FULFILLMENT",
    title: "부분 출고를 허용하고 전량 출고 후 주문 완료",
    summary: "주문 단위로 출고를 관리하되 상품 일부를 먼저 보낼 수 있도록 했습니다. 모든 상품을 출고하기 전까지는 출고 중 상태를 유지했습니다.",
    requirement: "한 주문의 상품을 나누어 출고할 수 있어야 했습니다. 일부 상품의 출고만으로 주문 전체가 완료되지 않도록 상품별 진행 상황과 주문의 완료 조건을 함께 다뤘습니다.",
    flow: [
      { title: "작업자 로그인", text: "실제 출고한 직원이 로그인해 상태 업데이트" },
      { title: "부분 출고 반영", text: "주문 내 일부 상품의 출고 업데이트 가능" },
      { title: "출고 중 유지", text: "미출고 상품이 남으면 완료 버튼 사용 불가" },
      { title: "전량 출고 후 완료", text: "모든 상품이 출고된 뒤 완료 버튼 사용 가능" },
    ],
    rules: [
      "주문 단위로 관리하면서 상품 일부의 출고 허용.",
      "모든 상품의 출고 여부에 따라 주문 완료 버튼 사용 조건 제어.",
      "상태 변경 시 전체 목록 대신 변경 대상 행만 갱신.",
      "업데이트 실패 목록·항목을 확인하도록 안내하고, 문의사항으로 추가할 수 있도록 구성.",
    ],
    benefit: "일부 상품을 먼저 보내면서도 주문 전체의 완료 기준을 유지했습니다. 목록은 변경 대상 행만 갱신하도록 구성했습니다.",
    cost: "상품별 출고 상태와 주문 전체 상태를 함께 관리해야 합니다. 해당 행만 갱신하는 방식에서는 다른 직원이 바꾼 행의 최신 상태를 별도로 확인할 필요가 있습니다.",
    ownership: "출고 상태 업데이트 UI, 완료 버튼 조건, 대상 행 갱신과 실패 항목 안내 흐름.",
  },
];
