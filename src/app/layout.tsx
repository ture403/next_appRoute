import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEVER_URL}/book`);

    // const datas: BookData[] = await res.json();
    // const len = datas.length;
    // console.log(len);

    return <footer>제작 @YG</footer>;
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className={style.container}>
                    <header>
                        <Link href={"/"}>📚 ONEBITE BOOKS</Link>
                    </header>
                    <main>{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
