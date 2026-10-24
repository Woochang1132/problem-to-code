"use client";

import { useId, useState } from "react";
import Link from "next/link";

const nodes = [
  { key: "browser", name: "화면 · 브라우저", sub: "송출자 클라이언트", x: 40, y: 250, question: "screen", browser: true },
  { key: "iam", name: "IAM", sub: "인증 · 토큰 발급", x: 40, y: 70, question: "connection" },
  { key: "db", name: "DB", sub: "사이트 · 방송 · 세션 정보", x: 340, y: 70, question: "connection" },
  { key: "was", name: "WAS", sub: "방송 승인 · 세션 관리", x: 340, y: 250, question: "connection" },
  { key: "gateway", name: "Gateway", sub: "연결 · 채팅 · 상태 전달", x: 640, y: 250, question: "connection" },
  { key: "viewer", name: "화면 · 브라우저", sub: "시청자 클라이언트", x: 940, y: 250, question: "screen", browser: true },
  { key: "janus", name: "Janus", sub: "영상 송출 · 세션 모니터링", x: 340, y: 450, question: "connection" },
  { key: "s3", name: "S3", sub: "녹화 파일 저장", x: 640, y: 450, question: "recording" },
  { key: "cdn", name: "CDN", sub: "HLS 영상 전달", x: 940, y: 450, question: "recording" },
] as const;

const notes = {
  screen: { title: "고화질보다 안정적인 재생을 선택한 이유", text: "1080p 구성에서 지연과 기기 부담이 커졌을 때, 왜 ABR을 유지하면서 최대 720p로 제한했을까요?", slug: "abr-quality-cap" },
  connection: { title: "영상·음성 분리 뒤 재생 시점을 맞추는 방법", text: "분리한 영상·음성의 시간 차이를 어떻게 맞추고, 어긋났을 때 재생 화면과 버퍼링을 제어했을까요?", slug: "av-sync" },
  recording: { title: "VOD 재생 대기 시간과 파일 관리", text: "작은 TS 파일이 늘어나는 부담을 줄이면서 필요한 재생 구간만 가져올 수 있을까요?", slug: "vod-byte-range" },
};

const edges = [
  { d: "M 130 250 V 170", label: "01 토큰 요청 · 발급", x: 144, y: 210, type: "control", side: true },
  { d: "M 220 120 H 340", label: "사이트 · 인증 정보", x: 280, y: 108, type: "control" },
  { d: "M 430 250 V 170", label: "방송 · 세션 정보", x: 444, y: 210, type: "control", side: true },
  { d: "M 220 280 H 340", label: "02 방송 승인", x: 280, y: 267, type: "control" },
  { d: "M 340 320 H 220", label: "대기 · 재할당", x: 280, y: 343, type: "control" },
  { d: "M 520 280 H 640", label: "방송 (재)할당", x: 580, y: 267, type: "control" },
  { d: "M 640 320 H 520", label: "연결 상태", x: 580, y: 343, type: "control" },
  { d: "M 730 250 V 120 H 520", label: "채팅 · 참여 이력 / Gateway 상태", x: 744, y: 191, type: "control", side: true },
  { d: "M 175 350 V 390 H 685 V 350", label: "03 방송 연결 · 채팅 · 참여자 상태", x: 405, y: 380, type: "control" },
  { d: "M 820 280 H 940", label: "05 Streaming", x: 880, y: 267, type: "live" },
  { d: "M 940 320 H 820", label: "채팅", x: 880, y: 343, type: "control" },
  { d: "M 130 350 V 500 H 340", label: "04 WebRTC 영상 송출", x: 235, y: 488, type: "live" },
  { d: "M 520 480 H 590 V 350 H 685", label: "방송 개설 · 폐기 모니터링", x: 430, y: 425, type: "control" },
  { d: "M 730 350 V 450", label: "06 Recording", x: 744, y: 425, type: "record", side: true },
  { d: "M 940 520 H 900 V 565 H 85 V 350", label: "07 HLS 재생 · CDN → 브라우저", x: 480, y: 585, type: "record" },
  { d: "M 820 500 H 940", label: "녹화 파일", x: 880, y: 488, type: "record" },
];

export default function Architecture() {
  const [selected, setSelected] = useState<(typeof nodes)[number]["key"]>("browser");
  const id = useId().replace(/:/g, "");
  const selectedNode = nodes.find((node) => node.key === selected)!;
  const note = notes[selectedNode.question];
  return (
    <div className="architecture system-architecture">
      <div className="map-toolbar"><span className="map-toolbar-title">BROADCAST SYSTEM <span>/ 전체 연결 구조</span></span><div className="flow-legend"><span><i className="control" />인증 · 제어</span><span><i className="live" />실시간 영상</span><span><i className="record" />녹화 · 재생</span></div></div>
      <div className="system-scroll" role="region" aria-label="방송 시스템 설계도. 좁은 화면에서는 좌우로 스크롤할 수 있습니다." tabIndex={0}>
        <div className="system-diagram">
          <div className="map-zone zone-auth">01 / 인증 · 방송 관리</div><div className="map-zone zone-live">02 / 연결 · 실시간 방송</div><div className="map-zone zone-record">03 / 송출 · 녹화 · 다시 보기</div>
          <svg viewBox="0 0 1160 610" className="system-connections" aria-hidden="true">
            <defs>{["control", "live", "record"].map((type) => <marker key={type} id={`${id}-${type}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9" className={`arrow-${type}`} /></marker>)}</defs>
            {edges.map((edge) => <g key={edge.d} className={`system-edge edge-${edge.type}`}><path d={edge.d} markerStart={edge.d === "M 130 250 V 170" ? `url(#${id}-${edge.type})` : undefined} markerEnd={`url(#${id}-${edge.type})`} /><text x={edge.x} y={edge.y} textAnchor={"side" in edge ? "start" : "middle"}>{edge.label}</text></g>)}
          </svg>
          {nodes.map((node) => <button key={node.key} type="button" className={`map-node ${"browser" in node ? "map-browser" : ""} ${selected === node.key ? "is-selected" : ""}`} style={{ left: `${node.x / 11.6}%`, top: `${node.y / 6.1}%` }} onClick={() => setSelected(node.key)} aria-pressed={selected === node.key} aria-controls={`${id}-note`}>
            {"browser" in node ? <span className="browser-chrome" aria-hidden="true"><i /><i /><i /><span /></span> : null}<strong>{node.name}</strong><small>{node.sub}</small><span className="map-node-link" aria-hidden="true">↗</span>
          </button>)}
        </div>
      </div>
      <div className="map-mobile-hint">← 좌우로 움직여 전체 설계도를 확인하세요 →</div>
      <div className="diagram-note" id={`${id}-note`} aria-live="polite"><div><span className="eyebrow">{selectedNode.name} / CONNECTED QUESTION</span><h3>{note.title}</h3><p>{note.text}</p></div><Link href={`/cases/${note.slug}/`}>고민 따라가기 <span>→</span></Link></div>
    </div>
  );
}
