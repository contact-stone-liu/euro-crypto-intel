import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "欧洲媒体视角：日更加密情报看板",
  description: "过去24小时滚动窗口，Top5话题簇，中文输出",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
