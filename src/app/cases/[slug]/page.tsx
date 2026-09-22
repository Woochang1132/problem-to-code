import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cases } from "@/data/cases";
import TradeoffChart from "@/components/tradeoff-chart";
export function generateStaticParams(){return cases.map(c=>({slug:c.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const c=cases.find(c=>c.slug===slug);return {title:c?.title??"사례를 찾을 수 없습니다",description:c?.summary};}
export default async function CasePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const c=cases.find(c=>c.slug===slug);if(!c)notFound();
 return <main className="shell"><header className="topbar"><Link href="/" className="brand"><span className="brand-icon">B.</span> Broadcast<span className="brand-light"> / engineering notes</span></Link><Link href="/#cases">모든 기록 ↗</Link></header><div className="detail-header"><Link className="back-link" href="/">← 설계 지도로 돌아가기</Link><div className="detail-tags"><span className="eyebrow" style={{margin:0}}>{c.category}</span><span className="tag">작성 예시 · 검증 전</span></div><h1>{c.title}</h1><p className="intro-copy">{c.summary}</p><div className="location-bar">설계 위치 / {c.location}</div></div><div className="article-layout"><nav aria-label="사례 목차" className="toc"><a href="#context">01 설계와 문제</a><a href="#investigation">02 원인 파악</a><a href="#alternatives">03 대안과 선택</a><a href="#implementation">04 구현 방향</a><a href="#validation">05 검증과 한계</a><a href="#evidence">06 나의 기여</a></nav><article className="article">
 <section id="context"><p className="eyebrow">01 / CONTEXT</p><h2>어디에서 생길 수 있는 문제인가</h2><div className="fact-box"><span className="small-label">설계에서 확인한 사실</span><p>{c.fact}</p><small>근거: {c.source}</small></div><h3>검토할 문제 상황</h3><p>{c.problem}</p></section>
 <section id="investigation"><p className="eyebrow">02 / INVESTIGATION</p><h2>원인을 좁혀가는 순서</h2><p>아래는 제안하는 확인 절차입니다. 실제 수행한 조사와 관찰 결과로 교체합니다.</p><ol>{c.investigate.map(x=><li key={x}>{x}</li>)}</ol></section>
 <section id="alternatives"><p className="eyebrow">03 / TRADE-OFF</p><h2>{c.tradeoff}</h2><div className="table-scroll"><table><thead><tr><th>대안</th><th>얻는 것</th><th>감수하는 것</th></tr></thead><tbody>{c.options.map(o=><tr key={o.name} className={o.selected?"chosen":""}><td><strong>{o.name}</strong>{o.selected&&<span className="chosen-label">초안의 선택</span>}</td><td>{o.good}</td><td>{o.cost}</td></tr>)}</tbody></table></div><div className="decision-box"><p>{c.decision}</p></div>{c.slug==="mobile-canvas"&&<TradeoffChart/>}</section>
 <section id="implementation"><p className="eyebrow">04 / IMPLEMENTATION</p><h2>선택을 구현으로 옮긴다면</h2><ol>{c.steps.map(x=><li key={x}>{x}</li>)}</ol><div className="code-label"><span>TypeScript 형태의 의사코드</span><span>실제 서비스 구현 아님</span></div><pre><code>{c.code}</code></pre></section>
 <section id="validation"><p className="eyebrow">05 / VALIDATION</p><h2>무엇으로 결과를 확인할까</h2><div className="verification"><span className="tag">아직 측정하지 않았습니다</span><h3>검증 계획</h3><ul>{c.checks.map(x=><li key={x}>{x}</li>)}</ul></div><h3>남는 한계</h3><p>{c.limits}</p></section>
 <section id="evidence"><p className="eyebrow">06 / OWNERSHIP & EVIDENCE</p><h2>실제 경험으로 완성할 부분</h2><p>담당 기간, 팀 구성, 직접 맡은 범위와 최종 결정자를 작성하세요. 제안만 한 내용과 직접 구현한 내용을 구분하고, 아래 근거를 연결하면 사례가 완성됩니다.</p><ul>{c.evidence.map(x=><li key={x}>{x}</li>)}</ul><p><strong>결과 작성 틀</strong><br/>[재현 조건]에서 [검증 방법]으로 확인한 결과, [관찰한 변화]가 있었습니다. 제가 맡은 부분은 [기여 범위]이며, [남은 제약]은 후속 과제로 남았습니다.</p></section>
 <div className="case-nav">{cases.filter(x=>x.slug!==slug).map(x=><Link key={x.slug} href={`/cases/${x.slug}/`}>{x.title} →</Link>)}</div></article></div><footer><Link href="/">← Broadcast / Engineering Notes</Link><span>설계 기반 사례 초안</span></footer></main>
}

