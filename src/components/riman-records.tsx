import { rimanRecords } from "@/data/riman";
import "./riman-records.css";

export default function RimanRecords() {
  return <section className="riman-records" aria-labelledby="records-title">
    <div className="section-heading"><div><p className="eyebrow">01 / FRONTEND NOTES</p><h2 id="records-title">완료 버튼 조건과 목록 상태 갱신</h2></div><p>상담 UI · 출고 상태 관리</p></div>
    <nav className="scope-nav" aria-label="리만 개발 사례 바로가기">{rimanRecords.map(record => <a href={`#${record.id}`} key={record.id}>{record.title}</a>)}</nav>
    <div className="riman-record-list">{rimanRecords.map((record, index) => <article className="riman-record" id={record.id} key={record.id} aria-labelledby={`${record.id}-title`}>
      <header className="riman-record-heading"><p className="eyebrow">CASE 0{index + 1} / {record.category}</p><h3 id={`${record.id}-title`}>{record.title}</h3><p>{record.summary}</p></header>
      <div className="riman-record-body">
        <div><h4>문제와 제약</h4><p>{record.requirement}</p></div>
        <div><h4>UI 처리 흐름</h4><ol className="riman-flow">{record.flow.map((step, stepIndex) => <li key={step.title}><span className="small-label">0{stepIndex + 1}</span><strong>{step.title}</strong><p>{step.text}</p></li>)}</ol></div>
        <div><h4>구현 포인트</h4><ul>{record.rules.map(rule => <li key={rule}>{rule}</li>)}</ul></div>
        <div className="riman-tradeoff"><div><h4>기술적 의사결정 · Decision</h4><p>{record.benefit}</p></div><div><h4>제약과 트레이드오프 · Trade-off</h4><p>{record.cost}</p></div></div>
        <div className="riman-ownership"><h4>직접 맡은 범위</h4><p>{record.ownership}</p></div>
      </div>
    </article>)}</div>
  </section>;
}
