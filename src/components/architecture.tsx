"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { publicDiagram, unlockDiagram, type Diagram } from "@/data/architecture";
import "./architecture.css";

export default function Architecture() {
  const [detail, setDetail] = useState<Diagram | null>(null);
  const [selected, setSelected] = useState("browser");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { nodes, edges, notes } = detail ?? publicDiagram;
  async function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const diagram = await unlockDiagram(password);
      setDetail(diagram);
      setSelected("browser");
    } catch {
      setError("비밀번호를 확인한 뒤 다시 입력해 주세요.");
    } finally {
      setPassword("");
      setBusy(false);
    }
  }
  const id = useId().replace(/:/g, "");
  const selectedNode = nodes.find((node) => node.key === selected) ?? nodes[0];
  const note = notes[selectedNode.question];
  return (
    <div className="architecture system-architecture">
      <div className="map-access">
        <div><strong>{detail ? "상세 설계도 열람 중" : "공개용 개념도"}</strong><p>{detail ? "열람을 마치면 다시 잠가 주세요." : "주요 흐름과 직접 다룬 영역을 정리했습니다. 상세 설계도는 비밀번호 입력 후 볼 수 있습니다."}</p></div>
        {detail ? <button className="map-access-button" type="button" onClick={() => { setDetail(null); setSelected("browser"); setError(""); }}>다시 잠그기</button> :
          <form className="map-unlock" onSubmit={unlock} aria-busy={busy}>
            <label htmlFor={`${id}-password`}>상세 설계도 비밀번호</label>
            <div className="map-unlock-row"><input id={`${id}-password`} type="password" autoComplete="off" required value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} disabled={busy} /><button className="map-access-button" type="submit" disabled={busy}>{busy ? "확인 중…" : "상세 보기"}</button></div>
            {error && <p id={`${id}-error`} className="map-unlock-error" role="alert">{error}</p>}
          </form>}
      </div>
      <div className="map-toolbar"><span className="map-toolbar-title">BROADCAST SYSTEM <span>/ {detail ? "전체 연결 구조" : "공개용 개념도"}</span></span><div className="flow-legend"><span><i className="control" />연결 · 제어</span><span><i className="live" />실시간 영상</span><span><i className="record" />녹화 · 재생</span></div></div>
      <div className="system-scroll" role="region" aria-label={detail ? "상세 방송 시스템 설계도. 좌우로 스크롤할 수 있습니다." : "공개용 방송 시스템 개념도. 좌우로 스크롤할 수 있습니다."} tabIndex={0}>
        <div className="system-diagram">
          <div className="map-zone zone-auth">{detail ? "01 / 인증 · 방송 관리" : "01 / 송출에서 시청까지"}</div><div className="map-zone zone-live">{detail ? "02 / 연결 · 실시간 방송" : "02 / 재생 경험을 만드는 영역"}</div><div className="map-zone zone-record">{detail ? "03 / 송출 · 녹화 · 다시 보기" : "03 / 저장 · 다시 보기"}</div>
          <svg viewBox="0 0 1160 610" className="system-connections" aria-hidden="true">
            <defs>{["control", "live", "record"].map((type) => <marker key={type} id={`${id}-${type}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9" className={`arrow-${type}`} /></marker>)}</defs>
            {edges.map((edge) => <g key={edge.d} className={`system-edge edge-${edge.type}`}><path d={edge.d} markerStart={edge.d === "M 130 250 V 170" ? `url(#${id}-${edge.type})` : undefined} markerEnd={`url(#${id}-${edge.type})`} /><text x={edge.x} y={edge.y} textAnchor={edge.side ? "start" : "middle"}>{edge.label}</text></g>)}
          </svg>
          {nodes.map((node) => <button key={node.key} type="button" className={`map-node ${node.browser ? "map-browser" : ""} ${selected === node.key ? "is-selected" : ""}`} style={{ left: `${node.x / 11.6}%`, top: `${node.y / 6.1}%` }} onClick={() => setSelected(node.key)} aria-pressed={selected === node.key} aria-controls={`${id}-note`}>
            {node.browser ? <span className="browser-chrome" aria-hidden="true"><i /><i /><i /><span /></span> : null}<strong>{node.name}</strong><small>{node.sub}</small><span className="map-node-link" aria-hidden="true">↗</span>
          </button>)}
        </div>
      </div>
      <div className="map-mobile-hint">← 좌우로 움직여 전체 설계도를 확인하세요 →</div>
      <div className="diagram-note" id={`${id}-note`} aria-live="polite"><div><span className="eyebrow">{selectedNode.name} / CONNECTED QUESTION</span><h3>{note.title}</h3><p>{note.text}</p></div><Link href={`/cases/${note.slug}/`}>고민 따라가기 <span>→</span></Link></div>
    </div>
  );
}
