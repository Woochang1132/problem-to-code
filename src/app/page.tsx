import Link from "next/link";
import Architecture from "@/components/architecture";
import { cases } from "@/data/cases";
export default function Home() {
  return <main className="shell">
    <header className="topbar"><Link href="/" className="brand"><span className="brand-icon">B.</span> Broadcast<span className="brand-light"> / engineering notes</span></Link><a href="#cases">의사결정 기록 <span>↗</span></a></header>
    <section className="intro"><div><p className="eyebrow"><span className="status-dot"/> FRONTEND ENGINEERING JOURNAL · 01</p><h1>문제를 마주했을 때,<br/><span>선택의 이유를 기록합니다.</span></h1><p className="intro-copy">어떤 상황과 제약이 있었고, 왜 그 해결 방법을 선택했는지.<br/>방송 서비스 개발 과정에서 마주한 고민과 해결의 기록.</p></div><div className="project-meta"><span className="tag">개발 경험과 의사결정</span><dl><div><dt>PROJECT</dt><dd>실시간 증권방송 플랫폼</dd></div><div><dt>MY ROLE</dt><dd>프론트엔드 · 화면/모바일 설계</dd></div><div><dt>STACK</dt><dd>Player 연동 · Canvas 수정</dd></div></dl></div></section>
    <section className="map-section" aria-labelledby="map-title"><div className="section-heading"><div><p className="eyebrow">01 / SYSTEM MAP</p><h2 id="map-title">고민이 시작된 위치</h2></div><p>구성 요소를 선택하면 연결된 사례를 볼 수 있어요.</p></div><Architecture/><div className="map-foot"><span><i className="legend-dot"/> 사례와 연결된 구성 요소</span><span>원본 설계와 담당 영역을 연결한 개념도</span></div></section>
    <section id="cases" className="cases-section"><div className="section-heading"><div><p className="eyebrow">02 / DECISION RECORDS</p><h2>문제에서 선택까지</h2></div><span className="muted">상황 · 제약 · 고민 · 해결</span></div><div className="case-grid">{cases.map((c,i)=><Link href={`/cases/${c.slug}/`} className="case-card" key={c.slug}><div className="card-top"><span className="case-num">0{i+1}</span><span className="pill">{c.category}</span><span className="card-arrow">↗</span></div><p className="case-location">{c.location}</p><h3>{c.title}</h3><p>{c.summary}</p><div className="tradeoff"><span>고민과 선택</span>{c.tradeoff}</div><div className="card-bottom"><span>{c.cardNote ?? "작성 예시 · 검증 전"}</span><span>사례 읽기 →</span></div></Link>)}</div></section>
    <section className="note-strip"><span className="note-icon">i</span><div><h3>경험에서 확인한 사실과 기술적 설명을 구분했습니다.</h3><p>영상·음성 동기화, ABR 화질 제한, VOD 개선 기록은 당시 적용한 방식과 관찰 결과를 담았습니다. 기술 설명용 코드·설정과 추가 검증 항목은 실제 수행 내용과 구분했습니다.</p></div></section><footer><span>Broadcast / Engineering Notes</span><span>완성된 답보다, 선택의 근거를 기록합니다.</span></footer>
  </main>;
}

