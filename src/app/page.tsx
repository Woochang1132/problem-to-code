import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { cases } from "@/data/cases";
import { rimanAreas } from "@/data/riman";

export default function Home() {
  const broadcastFeatured = cases.find((item) => item.slug === "av-sync")!;
  return <main className="shell">
    <SiteHeader />
    <section className="intro"><div><p className="eyebrow"><span className="status-dot" />FRONTEND ENGINEERING JOURNAL</p><h1>문제를 마주했을 때,<br /><span>선택의 이유를 기록합니다.</span></h1><p className="intro-copy">실시간 방송의 재생 경험부터 쇼핑몰 관리자의 업무 화면까지.<br />직접 개발한 기능과 그 과정에서의 고민을 프로젝트별로 정리합니다.</p></div><div className="project-meta"><span className="tag">개발 경험과 의사결정</span><dl><div><dt>CHAPTERS</dt><dd>방송 플랫폼 · 글로벌 백오피스</dd></div><div><dt>FOCUS</dt><dd>사용자 경험 · 관리자 업무 흐름</dd></div></dl></div></section>
    <section id="projects" className="project-section"><div className="section-heading"><div><p className="eyebrow">PROJECT CHAPTERS</p><h2>서로 다른 서비스, 직접 맡은 문제들</h2></div><p>프로젝트 소개에서 상세 기록으로 이어집니다.</p></div>
      <div className="project-grid">
        <article className="project-card"><div className="project-card-heading"><span className="eyebrow">CHAPTER 01 / BROADCAST</span><span className="tag">의사결정 기록 3개</span></div><h3><Link href="/projects/broadcast/">실시간 증권방송 플랫폼</Link></h3><p>영상과 음성의 동기화, 화질과 안정성, VOD 재생 대기 시간을 다룬 개발 경험입니다.</p><div className="project-stack">Player 연동 · Canvas 수정 · FFmpeg · HLS</div><div className="project-feature"><span className="small-label">대표 의사결정 기록</span><Link href={`/cases/${broadcastFeatured.slug}/`}>{broadcastFeatured.title}<span> ↗</span></Link><p>분리한 영상과 음성의 재생 시점을 다시 맞추고, 재동기화와 화면 표시를 제어한 경험.</p></div><Link className="project-open" href="/projects/broadcast/">시스템 지도와 전체 기록 보기 <span>→</span></Link></article>
        <article className="project-card"><div className="project-card-heading"><span className="eyebrow">CHAPTER 02 / BACK OFFICE</span><span className="tag">담당 업무 6개 영역</span></div><h3><Link href="/projects/riman/">리만 글로벌 백오피스<br />시스템 전면 개편</Link></h3><p>회원·상품·주문·배송·배너 및 팝업을 관리하는 관리자용 화면과 기능을 개발했습니다.</p><div className="project-stack">Vue.js · Quasar · 관리자 화면 · API 연동</div><div className="project-feature"><span className="small-label">대표 구현 영역</span><Link href="/projects/riman/#audit">{rimanAreas[1].title}<span> ↗</span></Link><p>회원 승급·삭제 등 주요 작업의 변경 내역을 추적할 수 있는 감사 로그 조회 화면.</p></div><Link className="project-open" href="/projects/riman/">프로젝트와 담당 업무 보기 <span>→</span></Link></article>
      </div>
    </section>
    <section className="note-strip"><span className="note-icon">i</span><div><h3>직접 맡은 일에서 출발한 기록입니다.</h3><p>방송 챕터에는 문제와 선택의 과정을, 리만 챕터에는 확인된 구현 범위를 담았습니다. 각 경험의 구체적인 고민과 판단은 이어서 기록합니다.</p></div></section>
    <SiteFooter />
  </main>;
}
