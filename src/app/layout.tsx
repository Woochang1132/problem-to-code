import type { Metadata } from "next";
import "./globals.css";
import "./projects.css";
import "./editorial.css";
export const metadata: Metadata = { title: {default:"Problem to Code — 프론트엔드 개발 기록",template:"%s | Problem to Code"}, description:"HLS 기반 방송 플레이어와 Vue.js·Quasar 기반 리만 백오피스의 담당 업무, 구현 방법, 결과를 정리했습니다." };
export default function RootLayout({ children }: {children:React.ReactNode}) {return <html lang="ko"><body>{children}</body></html>;}

