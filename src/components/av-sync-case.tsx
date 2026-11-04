import Link from "next/link";
import type { DecisionCase } from "@/data/cases";
import { SiteHeader, SiteFooter } from "./site-chrome";

export default function AvSyncCase({ item }: { item: DecisionCase }) {
  return <main className="shell">
    <SiteHeader />
    <header className="detail-header">
      <Link className="back-link" href="/projects/broadcast/#cases">← 방송 프로젝트</Link>
      <p className="eyebrow">AUDIO / VIDEO SYNC</p>
      <h1>{item.title}</h1>
      <p className="intro-copy">{item.summary}</p>
      <div className="location-bar">{item.location}</div>
      <div className="fact-box case-role"><span className="small-label">담당 업무</span><ul>{item.evidence.map(text => <li key={text}>{text}</li>)}</ul></div>
    </header>
    <div className="article-layout">
      <nav className="toc" aria-label="사례 목차"><a href="#context">01 문제 상황</a><a href="#investigation">02 원인과 제약</a><a href="#implementation">03 해결 방법</a><a href="#validation">04 적용 결과</a></nav>
      <article className="article">
        <section id="context"><p className="eyebrow">01 / SYMPTOM</p><h2>영상 로딩 지연이 음성에도 영향</h2><p>{item.fact}</p><p>{item.problem}</p></section>
        <section id="investigation"><p className="eyebrow">02 / ANALYSIS</p><h2>공유한 로딩 경로와 분리 후 동기화</h2><ul>{item.investigate.map(text => <li key={text}>{text}</li>)}</ul></section>
        <section id="implementation"><p className="eyebrow">03 / RESOLUTION</p><h2>파일 분리와 재생 시점 제어</h2><p>{item.decision}</p><ol>{item.steps.map(text => <li key={text}>{text}</li>)}</ol>
          <details className="case-details" id="alternatives"><summary>대안 비교</summary><p className="detail-caption">선택의 차이를 설명하기 위한 비교입니다. 모든 대안을 구현·실험한 기록은 아닙니다.</p><div className="table-scroll"><table><thead><tr><th>구성</th><th>이점</th><th>제약</th></tr></thead><tbody>{item.options.map(option => <tr key={option.name} className={option.selected ? "chosen" : ""}><td>{option.name}{option.selected ? <span className="chosen-label">적용</span> : null}</td><td>{option.good}</td><td>{option.cost}</td></tr>)}</tbody></table></div></details>
          <details className="case-details"><summary>동기화 정책 의사코드</summary><p className="detail-caption">설명용 코드입니다. 실제 API와 경계값 처리는 당시 코드와 대조가 필요합니다.</p><pre><code>{item.code}</code></pre></details>
        </section>
        <section id="validation"><p className="eyebrow">04 / RESULT</p><h2>적용 결과와 측정 한계</h2><p>{item.result}</p><div className="fact-box"><span className="small-label">0.5초 기준의 의미</span><p>{item.limits}</p></div>
          <details className="case-details"><summary>추가 검증 항목</summary><ul>{item.checks.map(text => <li key={text}>{text}</li>)}</ul></details>
          <details className="case-details" id="evidence"><summary>기록 근거와 참고 문서</summary><p>{item.source}</p><ul>{item.references?.map(ref => <li key={ref.url}><a href={ref.url} target="_blank" rel="noreferrer">{ref.label} ↗</a></li>)}</ul></details>
        </section>
        <nav className="case-nav" aria-label="다른 방송 사례"><Link href="/cases/abr-quality-cap/">화질 상한 설정 →</Link><Link href="/cases/vod-byte-range/">VOD 재생 방식 변경 →</Link></nav>
      </article>
    </div>
    <SiteFooter />
  </main>;
}
