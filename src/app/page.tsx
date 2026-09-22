import Link from "next/link";
import Architecture from "@/components/architecture";
import { cases } from "@/data/cases";
export default function Home() {
  return <main className="shell">
    <header className="topbar"><Link href="/" className="brand"><span className="brand-icon">B.</span> Broadcast<span className="brand-light"> / engineering notes</span></Link><a href="#cases">의사결정 기록 <span>↗</span></a></header>
    <section className="intro"><div><p className="eyebrow"><span className="status-dot"/> FRONTEND ENGINEERING JOURNAL · 01</p><h1>방송이 이어지는 동안,<br/><span>설계 뒤에 남은 고민들.</span></h1><p className="intro-copy">화면 설계부터 모바일, Player 연동과 Canvas까지.<br/>무엇을 선택했고, 무엇을 감수했는지 설계 위에서 읽는 기술 기록.</p></div><div className="project-meta"><span className="tag">설계 기반 초안</span><dl><div><dt>PROJECT</dt><dd>실시간 증권방송 플랫폼</dd></div><div><dt>MY ROLE</dt><dd>프론트엔드 · 화면/모바일 설계</dd></div><div><dt>STACK</dt><dd>Player 연동 · Canvas 수정</dd></div></dl></div></section>
    <section className="map-section" aria-labelledby="map-title"><div className="section-heading"><div><p className="eyebrow">01 / SYSTEM MAP</p><h2 id="map-title">고민이 시작된 위치</h2></div><p>구성 요소를 선택하면 연결된 사례를 볼 수 있어요.</p></div><Architecture/><div className="map-foot"><span><i className="legend-dot"/> 사례와 연결된 구성 요소</span><span>원본 설계와 담당 영역을 연결한 개념도</span></div></section>
    <section id="cases" className="cases-section"><div className="section-heading"><div><p className="eyebrow">02 / DECISION RECORDS</p><h2>문제에서 선택까지</h2></div><span className="muted">3개의 설계 질문</span></div><div className="case-grid">{cases.map((c,i)=><Link href={`/cases/${c.slug}/`} className="case-card" key={c.slug}><div className="card-top"><span className="case-num">0{i+1}</span><span className="pill">{c.category}</span><span className="card-arrow">↗</span></div><p className="case-location">{c.location}</p><h3>{c.title}</h3><p>{c.summary}</p><div className="tradeoff"><span>TRADE-OFF</span>{c.tradeoff}</div><div className="card-bottom"><span>작성 예시 · 검증 전</span><span>사례 읽기 →</span></div></Link>)}</div></section>
    <section className="note-strip"><span className="note-icon">i</span><div><h3>설계에 있는 사실과, 앞으로 증명할 것을 나눴습니다.</h3><p>시스템 구성은 원본 설계, 담당 영역은 본인 설명에 근거합니다. 문제 상황·선택·코드는 작성 예시이며, 실제 장애 경험이나 구현 성과를 뜻하지 않습니다.</p></div></section><footer><span>Broadcast / Engineering Notes</span><span>완성된 답보다, 선택의 근거를 기록합니다.</span></footer>
  </main>;
}

