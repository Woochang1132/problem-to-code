import encrypted from "./architecture.encrypted.json";

type Note = { title: string; text: string; slug: string };
export type Diagram = {
  nodes: { key: string; name: string; sub: string; x: number; y: number; question: string; browser?: boolean }[];
  edges: { d: string; label: string; x: number; y: number; type: string; side?: boolean }[];
  notes: Record<string, Note>;
};

export const publicDiagram: Diagram = {
  nodes: [
    { key: "browser", name: "송출 브라우저", sub: "방송 화면과 미디어 입력", x: 40, y: 70, question: "sync", browser: true },
    { key: "media", name: "미디어 처리", sub: "실시간 영상 처리", x: 340, y: 70, question: "sync" },
    { key: "delivery", name: "영상 전달", sub: "시청자에게 미디어 전달", x: 640, y: 70, question: "quality" },
    { key: "viewer", name: "시청 브라우저", sub: "영상과 음성 재생", x: 940, y: 70, question: "quality", browser: true },
    { key: "player", name: "Player · Canvas", sub: "플레이어 연동 · 화면 구성", x: 340, y: 250, question: "sync" },
    { key: "quality", name: "재생 품질 제어", sub: "동기화 · 화질 상한", x: 640, y: 250, question: "quality" },
    { key: "storage", name: "녹화 저장", sub: "다시 보기를 위한 파일", x: 340, y: 450, question: "vod" },
    { key: "vod", name: "다시 보기", sub: "필요한 재생 구간 요청", x: 640, y: 450, question: "vod" },
  ],
  edges: [
    { d: "M 220 120 H 340", label: "미디어 송출", x: 280, y: 108, type: "live" },
    { d: "M 520 120 H 640", label: "실시간 영상", x: 580, y: 108, type: "live" },
    { d: "M 820 120 H 940", label: "시청", x: 880, y: 108, type: "live" },
    { d: "M 940 150 H 900 V 300 H 820", label: "재생 제어", x: 910, y: 240, type: "control", side: true },
    { d: "M 640 300 H 520", label: "연동", x: 580, y: 287, type: "control" },
    { d: "M 430 170 V 250", label: "플레이어 연동", x: 444, y: 215, type: "control", side: true },
    { d: "M 340 150 H 280 V 500 H 340", label: "녹화", x: 240, y: 425, type: "record" },
    { d: "M 520 500 H 640", label: "구간 요청", x: 580, y: 488, type: "record" },
  ],
  notes: {
    sync: { title: "영상·음성의 재생 시점을 맞추는 방법", text: "분리한 영상과 음성의 재생 시점, 버퍼링 이후의 화면 제어를 다룬 경험입니다.", slug: "av-sync" },
    quality: { title: "고화질보다 안정적인 재생을 선택한 이유", text: "ABR을 유지하면서 최대 화질을 제한한 배경과 선택을 정리했습니다.", slug: "abr-quality-cap" },
    vod: { title: "다시 보기의 재생 대기와 파일 관리", text: "필요한 구간만 요청하면서 파일 관리를 단순하게 만든 경험입니다.", slug: "vod-byte-range" },
  },
};

function decode(value: string): Uint8Array<ArrayBuffer> {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

// Only encrypted diagram data ships with the static site. The password/key is
// neither embedded in the bundle nor persisted in browser storage.
export async function unlockDiagram(password: string): Promise<Diagram> {
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: decode(encrypted.salt), iterations: encrypted.iterations, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: decode(encrypted.iv) }, key, decode(encrypted.ciphertext));
  return JSON.parse(new TextDecoder().decode(plaintext)) as Diagram;
}
