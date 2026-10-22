import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: {default:"Broadcast — 상황과 제약, 선택의 이유",template:"%s | Broadcast"}, description:"방송 서비스 개발에서 마주한 상황과 제약, 해결 방법을 선택한 이유를 기록합니다. FFmpeg·HLS BYTERANGE를 활용한 VOD 재생 대기 시간 개선 경험을 담았습니다." };
export default function RootLayout({ children }: {children:React.ReactNode}) {return <html lang="ko"><body>{children}</body></html>;}

