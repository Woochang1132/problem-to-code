import type { Metadata } from "next";
import Link from "next/link";
import Architecture from "@/components/architecture";
import CaseCards from "@/components/case-cards";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { cases } from "@/data/cases";

export const metadata: Metadata = { title: "실시간 증권방송 플랫폼", description: "방송 시스템 지도와 영상·음성 동기화, 화질 제어, VOD 개선의 의사결정 기록입니다." };

export default function BroadcastPage() {
  return <main className="shell"><SiteHeader />
    <section className="intro chapter-intro"><div><Link className="back-link" href="/#projects">← 프로젝트 목록</Link><p className="eyebrow">CHAPTER 01 / BROADCAST</p><h1>실시간 증권방송 플랫폼</h1><p className="intro-copy">어떤 상황과 제약이 있었고, 왜 그 해결 방법을 선택했는지.<br />방송 서비스 개발 과정에서 마주한 고민과 해결의 기록입니다.</p></div><div className="project-meta"><span className="tag">개발 경험과 의사결정</span><dl><div><dt>MY ROLE</dt><dd>프론트엔드 · 화면/모바일 설계</dd></div><div><dt>FOCUS</dt><dd>Player 연동 · Canvas 수정</dd></div></dl></div></section>
    <section className="map-section" aria-labelledby="map-title"><div className="section-heading"><div><p className="eyebrow">01 / SYSTEM MAP</p><h2 id="map-title">고민이 시작된 위치</h2></div><p>구성 요소를 선택하면 연결된 사례를 볼 수 있어요.</p></div><Architecture /><div className="map-foot"><span><i className="legend-dot" />사례와 연결된 구성 요소</span><span>공개용 개념도 · 비밀번호로 여는 상세 설계도</span></div></section>
    <section id="cases" className="cases-section"><div className="section-heading"><div><p className="eyebrow">02 / DECISION RECORDS</p><h2>문제에서 선택까지</h2></div><span className="muted">상황 · 제약 · 고민 · 해결</span></div><CaseCards items={cases} /></section>
    <section className="note-strip"><span className="note-icon">i</span><div><h3>경험에서 확인한 사실과 기술적 설명을 구분했습니다.</h3><p>영상·음성 동기화, ABR 화질 제한, VOD 개선 기록은 당시 적용한 방식과 관찰 결과를 담았습니다. 기술 설명용 코드·설정과 추가 검증 항목은 실제 수행 내용과 구분했습니다.</p></div></section><div className="chapter-next"><Link href="/projects/riman/">다음 챕터 · 리만 글로벌 백오피스 →</Link></div><SiteFooter />
  </main>;
}
