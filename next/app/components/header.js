import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header className="header">
            <div>
                <Link href="/">
                    <Image src="/logo.jpeg" width={500} height={180} alt="header-image" priority />
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link href="/user/login">ログイン</Link></li>
                    <li><Link href="/user/register">新規ユーザー登録</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
