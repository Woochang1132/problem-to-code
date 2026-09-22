import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: {default:"Broadcast — 설계 뒤에 남은 고민들",template:"%s | Broadcast"}, description:"증권방송 프론트엔드의 화면·모바일 설계, Player 연동, Canvas 수정을 기술적 고민과 연결하는 포트폴리오 초안." };
export default function RootLayout({ children }: {children:React.ReactNode}) {return <html lang="ko"><body>{children}</body></html>;}

