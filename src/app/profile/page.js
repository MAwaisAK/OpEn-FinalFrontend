import AdminBody from "@/components/AdminBody";
import Script from "next/script";
export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
  openGraph: {
    title: "Dashboard - OpEn",
    description: "Dashboard",
    type: "website",
  },
};
export default function Admin() {
  return (
    <>
    <Script
        id="adsense"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4469304838128644"
        crossOrigin="anonymous"
      />
    <AdminBody/>
    </>
  );
}
