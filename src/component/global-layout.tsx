import Link from "next/link";
import style from './global-layout.module.css';

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div className={style.container}>
            <header>
                <Link href={'/'}>🧅 양파마켓</Link>
            </header>
            <main>{children}</main>
            <footer>양파마켓: 010-1234-5678</footer>
        </div>
    );
}