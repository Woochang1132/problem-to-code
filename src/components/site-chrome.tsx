import Link from "next/link";

export function SiteHeader() {
  return <header className="topbar"><Link href="/" className="brand"><span className="brand-icon">P.</span> Problem to Code<span className="brand-light"> / engineering notes</span></Link><Link href="/#projects">프로젝트</Link></header>;
}

export function SiteFooter() {
  return <footer><Link href="/">Problem to Code / Engineering Notes</Link><span>프론트엔드 개발 · 프로젝트 기록</span></footer>;
}
