import type { Metadata } from "next";
import "./globals.css";
import "./projects.css";
export const metadata: Metadata = { title: {default:"Problem to Code — 상황과 제약, 선택의 이유",template:"%s | Problem to Code"}, description:"실시간 방송 플랫폼과 리만 글로벌 백오피스 개발에서 직접 맡은 일, 마주한 문제와 선택의 이유를 기록합니다." };
export default function RootLayout({ children }: {children:React.ReactNode}) {return <html lang="ko"><body>{children}</body></html>;}

