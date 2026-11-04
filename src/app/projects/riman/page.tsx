import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { rimanAreas } from "@/data/riman";

export const metadata: Metadata = { title: "리만 글로벌 백오피스 시스템 전면 개편", description: "Vue.js·Quasar 기반의 회원·상품·주문·배송·배너 및 팝업 관리 화면 개발과 API 연동 경험입니다." };

export default function RimanPage() {
  return <main className="shell"><SiteHeader />
    <section className="intro chapter-intro"><div><Link className="back-link" href="/#projects">← 프로젝트 목록</Link><p className="eyebrow">CHAPTER 02 / GLOBAL BACK OFFICE</p><h1>리만 글로벌 백오피스<br /><span>시스템 전면 개편</span></h1><p className="intro-copy">Vue.js·Quasar 기반 관리자 화면과 기능 개발.<br />회원·상품·주문·배송·콘텐츠 관리 UI 및 API 연동 담당.</p></div><div className="project-meta"><span className="tag">관리자용 시스템 개발</span><dl><div><dt>MY ROLE</dt><dd>백오피스 화면·기능 개발</dd></div><div><dt>STACK</dt><dd>Vue.js · Quasar</dd></div><div><dt>FOCUS</dt><dd>관리 UI · API 연동</dd></div></dl></div></section>
    <section className="service-context" aria-labelledby="service-title"><div><p className="eyebrow">SERVICE CONTEXT</p><h2 id="service-title">개발 범위: 관리자용 백오피스</h2><p>회원용 쇼핑몰과 별도로, 운영자가 회원·상품·주문·배송·콘텐츠를 관리하는 화면을 개발했습니다.</p></div><div className="service-boundary"><div><span className="small-label">회원용 서비스 · 참고 링크</span><a href="https://kr.riman.com/" target="_blank" rel="noreferrer">리만 공식 쇼핑몰 ↗</a><small>회원용 쇼핑몰 · 개발 범위 참고</small></div><div><span className="small-label">직접 담당한 영역</span><strong>관리자용 백오피스</strong><small>화면·기능 개발과 API 연동</small></div></div></section>
    <section className="cases-section" aria-labelledby="scope-title"><div className="section-heading"><div><p className="eyebrow">01 / IMPLEMENTATION SCOPE</p><h2 id="scope-title">직접 개발한 화면과 기능</h2></div><span className="muted">업무별 구현 범위</span></div><nav className="scope-nav" aria-label="담당 업무 바로가기">{rimanAreas.map(area => <a key={area.id} href={`#${area.id}`}>{area.title}</a>)}</nav><div className="scope-grid">{rimanAreas.map(area => <article className="scope-card" key={area.id} id={area.id}><div className="card-top"><span className="case-num">{area.number}</span><span className="pill">{area.category}</span></div><h3>{area.title}</h3><ul>{area.contributions.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
    <section className="record-continuation"><p className="eyebrow">02 / DECISION RECORDS</p><h2>추가 기록</h2><p>담당 기능별 문제와 선택 과정은 정리 중입니다.</p><span className="tag">상세 의사결정 기록 · 정리 예정</span></section>
    <div className="chapter-next"><Link href="/projects/broadcast/">방송 프로젝트 →</Link></div><SiteFooter />
  </main>;
}
