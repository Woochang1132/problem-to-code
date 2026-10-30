import Link from "next/link";

export function SiteHeader() {
  return <header className="topbar"><Link href="/" className="brand"><span className="brand-icon">P.</span> Problem to Code<span className="brand-light"> / engineering notes</span></Link><Link href="/#projects">프로젝트 보기 ↗</Link></header>;
}

export function SiteFooter() {
  return <footer><Link href="/">Problem to Code / Engineering Notes</Link><span>완성된 답보다, 선택의 근거를 기록합니다.</span></footer>;
}
