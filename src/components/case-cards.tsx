import Link from "next/link";
import type { DecisionCase } from "@/data/cases";

export default function CaseCards({ items }: { items: DecisionCase[] }) {
  return <div className="case-grid">{items.map((c, index) => <Link href={`/cases/${c.slug}/`} className="case-card" key={c.slug}>
    <div className="card-top"><span className="case-num">0{index + 1}</span><span className="pill">{c.category}</span><span className="card-arrow">↗</span></div>
    <p className="case-location">{c.location}</p><h3>{c.title}</h3><p>{c.summary}</p>
    <div className="tradeoff"><span>고민과 선택</span>{c.tradeoff}</div>
    <div className="card-bottom"><span>{c.cardNote ?? "작성 예시 · 검증 전"}</span><span>사례 읽기 →</span></div>
  </Link>)}</div>;
}
