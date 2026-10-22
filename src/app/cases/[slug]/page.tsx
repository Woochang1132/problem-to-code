import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cases } from "@/data/cases";
import TradeoffChart from "@/components/tradeoff-chart";

export function generateStaticParams() { return cases.map(c => ({ slug: c.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find(c => c.slug === slug);
  return { title: c?.title ?? "사례를 찾을 수 없습니다", description: c?.summary };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cases.find(c => c.slug === slug);
  if (!c) notFound();
  const experience = c.experience === true;

  return <main className="shell">
    <header className="topbar"><Link href="/" className="brand"><span className="brand-icon">B.</span> Broadcast<span className="brand-light"> / engineering notes</span></Link><Link href="/#cases">모든 기록 ↗</Link></header>
    <div className="detail-header">
      <Link className="back-link" href="/">← 전체 기록으로 돌아가기</Link>
      <div className="detail-tags"><span className="eyebrow" style={{ margin: 0 }}>{c.category}</span><span className="tag">{experience ? "구현 경험 · 본인 설명 기반" : "작성 예시 · 검증 전"}</span></div>
      <h1>{c.title}</h1><p className="intro-copy">{c.summary}</p>
      <div className="location-bar">관련 흐름 / {c.location}</div>
      {experience ? <div className="experience-result"><div><span>재생 대기 시간</span><strong>8초 <span>→</span> 3초</strong><small>변경 전 → 변경 후 · 당시 확인한 결과</small></div><div><span>직접 맡은 범위</span><p>FFmpeg 설정 변경<br />플레이어 연동</p></div></div> : null}
    </div>
    <div className="article-layout">
      <nav aria-label="사례 목차" className="toc"><a href="#context">01 상황과 제약</a><a href="#investigation">02 고민의 출발점</a><a href="#alternatives">03 대안과 선택</a><a href="#implementation">04 해결 방법</a><a href="#validation">05 결과와 한계</a><a href="#evidence">06 기여와 근거</a></nav>
      <article className="article">
        <section id="context"><p className="eyebrow">01 / CONTEXT</p><h2>{experience ? "재생을 빨리 시작하려다 생긴 관리 부담" : "어떤 상황과 제약을 마주했는가"}</h2><div className="fact-box"><span className="small-label">{experience ? "경험에서 확인한 사실" : "설계에서 확인한 사실"}</span><p>{c.fact}</p><small>근거: {c.source}</small></div><h3>{experience ? "해결하고 싶었던 문제" : "검토할 문제 상황"}</h3><p>{c.problem}</p></section>
        <section id="investigation"><p className="eyebrow">02 / REASONING</p><h2>{experience ? "재생 구간마다 파일이 하나씩 필요할까?" : "원인을 좁혀가는 순서"}</h2><p>{experience ? "재생에 필요한 데이터의 단위와 저장·관리하는 파일의 단위를 나눠 생각했습니다. 아래 설명은 그 선택을 이해하기 위한 기술적 배경입니다." : "아래는 제안하는 확인 절차입니다. 실제 수행한 조사와 관찰 결과로 교체합니다."}</p><ol>{c.investigate.map(x => <li key={x}>{x}</li>)}</ol>
          {experience ? <div className="delivery-comparison"><div><span className="small-label">BEFORE / 파일 단위 분할</span><h3>여러 개의 작은 TS 파일</h3><p>6초 구간 → 각각의 TS 파일<br />재생 구간 증가 → 파일 관리 부담 증가</p><code>001.ts · 002.ts · 003.ts · …</code></div><div><span className="small-label">AFTER / 요청 범위 분리</span><h3>단일 TS + HLS BYTERANGE</h3><p>m3u8 → 구간별 바이트 위치·길이<br />플레이어 → 필요한 범위만 요청</p><code>vod.ts ← Range: bytes=시작-끝</code></div></div> : null}
        </section>
        <section id="alternatives"><p className="eyebrow">03 / OPTIONS & DECISION</p><h2>{c.tradeoff}</h2><div className="table-scroll"><table><thead><tr><th>대안</th><th>얻는 것</th><th>감수하는 것</th></tr></thead><tbody>{c.options.map(o => <tr key={o.name} className={o.selected ? "chosen" : ""}><td><strong>{o.name}</strong>{o.selected ? <span className="chosen-label">{experience ? "선택한 방식" : "초안의 선택"}</span> : null}</td><td>{o.good}</td><td>{o.cost}</td></tr>)}</tbody></table></div><div className="decision-box"><p>{c.decision}</p></div>{c.slug === "mobile-canvas" ? <TradeoffChart /> : null}</section>
        <section id="implementation"><p className="eyebrow">04 / IMPLEMENTATION</p><h2>{experience ? "FFmpeg 출력과 플레이어 요청 방식 변경" : "선택을 구현으로 옮긴다면"}</h2><ol>{c.steps.map(x => <li key={x}>{x}</li>)}</ol><div className="code-label"><span>{experience ? "FFmpeg · m3u8 · HTTP 요청 구조" : "TypeScript 형태의 의사코드"}</span><span>{experience ? "구조 설명용 예시 · 실제 사용 명령 아님" : "실제 서비스 구현 아님"}</span></div><pre><code>{c.code}</code></pre></section>
        <section id="validation"><p className="eyebrow">05 / RESULT & VALIDATION</p><h2>{experience ? "재생 대기 시간 8초 → 3초" : "무엇으로 결과를 확인할까"}</h2>{c.result ? <div className="decision-box"><p>{c.result}</p></div> : null}<div className="verification"><span className="tag">{experience ? "추가 검증 항목" : "아직 측정하지 않았습니다"}</span><h3>{experience ? "결과를 더 명확히 설명하려면" : "검증 계획"}</h3><ul>{c.checks.map(x => <li key={x}>{x}</li>)}</ul></div><h3>남는 한계와 운영 제약</h3><p>{c.limits}</p></section>
        <section id="evidence"><p className="eyebrow">06 / OWNERSHIP & EVIDENCE</p><h2>{experience ? "직접 맡은 일과 보완할 근거" : "실제 경험으로 완성할 부분"}</h2><p>{experience ? "FFmpeg 설정 변경과 플레이어 연동을 담당했습니다. 아래에는 확인된 기여와 기록에 보완할 자료를 구분했습니다." : "담당 기간, 팀 구성, 직접 맡은 범위와 최종 결정자를 작성하세요. 제안만 한 내용과 직접 구현한 내용을 구분하고, 아래 근거를 연결하면 사례가 완성됩니다."}</p><ul>{c.evidence.map(x => <li key={x}>{x}</li>)}</ul>
          {c.references ? <div className="reference-links"><h3>기술 설명의 참고 문서</h3><ul>{c.references.map(ref => <li key={ref.url}><a href={ref.url} target="_blank" rel="noreferrer">{ref.label} ↗</a></li>)}</ul></div> : <p><strong>결과 작성 틀</strong><br />[재현 조건]에서 [검증 방법]으로 확인한 결과, [관찰한 변화]가 있었습니다. 제가 맡은 부분은 [기여 범위]이며, [남은 제약]은 후속 과제로 남았습니다.</p>}
        </section>
        <div className="case-nav">{cases.filter(x => x.slug !== slug).map(x => <Link key={x.slug} href={`/cases/${x.slug}/`}>{x.title} →</Link>)}</div>
      </article>
    </div><footer><Link href="/">← Broadcast / Engineering Notes</Link><span>{experience ? "상황과 제약, 선택의 이유를 기록합니다." : "설계 기반 사례 초안"}</span></footer>
  </main>;
}
