import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <div>
                <Link href="/">
                    <Image src="/logo.jpeg" width={2880} height={847} alt="header-image" priority />
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link href="/">新作</Link></li>
                    <li><Link href="/item/bests">人気の投稿</Link></li>
                    <li><Link href="/item/search">検索</Link></li>
                    <li><Link href="/item/create">新規投稿</Link></li>
                    <li><Link href="/user/login">ログイン</Link></li>
                    <li><Link href="/user/register">新規ユーザー登録</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
