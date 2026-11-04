import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { cases } from "@/data/cases";
import { rimanRecords } from "@/data/riman";

export default function Home() {
  const broadcastFeatured = cases.find((item) => item.slug === "av-sync")!;
  return <main className="shell">
    <SiteHeader />
    <section className="intro"><div><p className="eyebrow"><span className="status-dot" />FRONTEND ENGINEERING JOURNAL</p><h1>개발 중 마주한 문제와<br /><span>해결 방법을 선택한 이유를 기록합니다.</span></h1><p className="intro-copy">HLS 기반 영상·음성 동기화와 VOD 재생 개선,<br />Vue.js·Quasar 기반 관리자 화면 개발 경험을 정리했습니다.</p></div><div className="project-meta"><span className="tag">개발 경험과 의사결정</span><dl><div><dt>CHAPTERS</dt><dd>방송 플랫폼 · 글로벌 백오피스</dd></div><div><dt>FOCUS</dt><dd>사용자 경험 · 관리자 업무 흐름</dd></div></dl></div></section>
    <section id="projects" className="project-section"><div className="section-heading"><div><p className="eyebrow">PROJECT CHAPTERS</p><h2>프로젝트</h2></div><p>담당 업무와 구현 기록</p></div>
      <div className="project-grid">
        <article className="project-card"><div className="project-card-heading"><span className="eyebrow">CHAPTER 01 / BROADCAST</span><span className="tag">의사결정 기록 3개</span></div><h3><Link href="/projects/broadcast/">실시간 증권방송 플랫폼</Link></h3><p>영상·음성 동기화, 화질 상한 설정, VOD 재생 방식 변경을 담당했습니다.</p><div className="project-stack">Player 연동 · Canvas 수정 · FFmpeg · HLS</div><div className="project-feature"><span className="small-label">대표 의사결정 기록</span><Link href={`/cases/${broadcastFeatured.slug}/`}>{broadcastFeatured.title}<span> ↗</span></Link><p>영상·음성 파일 분리 후, 시간 차이 메타데이터와 0.5초 기준으로 재생 제어.</p></div><Link className="project-open" href="/projects/broadcast/">방송 프로젝트 <span>→</span></Link></article>
        <article className="project-card"><div className="project-card-heading"><span className="eyebrow">CHAPTER 02 / BACK OFFICE</span><span className="tag">의사결정 기록 {rimanRecords.length}개</span></div><h3><Link href="/projects/riman/">리만 글로벌 백오피스<br />시스템 전면 개편</Link></h3><p>회원·상품·주문·배송·배너 및 팝업을 관리하는 관리자용 화면과 기능을 개발했습니다.</p><div className="project-stack">Vue.js · Quasar · 관리자 화면 · API 연동</div><div className="project-feature"><span className="small-label">업무 규칙과 구현 사례</span>{rimanRecords.map(record => <Link key={record.id} href={`/projects/riman/#${record.id}`}>{record.title}<span> ↗</span></Link>)}<p>상담 완료 조건과 부분 출고 상태를 화면에 반영한 과정.</p></div><Link className="project-open" href="/projects/riman/">리만 프로젝트 <span>→</span></Link></article>
      </div>
    </section>

    <SiteFooter />
  </main>;
}
