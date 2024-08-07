"use client"
import { useState } from "react"
import useAuth from "../../utils/useAuth"
import Image from "next/image"
import { useRouter } from "next/navigation"


const Login = () => {
    const [email, setEmail] = useState("test1@gmail.com")
    const [password, setPassword] = useState("123456")
    const loginUser = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            if (jsonData.token) {
                localStorage.setItem("token", jsonData.token)
            }
            alert(jsonData.message)
            if (jsonData.token) {
                router.push("/")
            }
        } catch (err) {
            alert("ログイン失敗")
        }
    }

    if (loginUser.email != "") {
        return (
            <div>
                <h1>ログイン</h1>
                <div className="login-user">
                    <Image src={`/icons/sg${loginUser.icon}.png`} width={50} height={50} alt="user-icon" className="user-icon" priority />
                    {loginUser.name}さんがログイン済みです。以下を入力して、ユーザーを切り替える事ができます。
                </div>
                <div className="login-switch-information margin-bottom">
                    【テストユーザー1】<br />
                    ・Email: test1@gmail.com<br />
                    ・Password: mono-123<br />
                    【テストユーザー2】<br />
                    ・Email: test2@gmail.com<br />
                    ・Password: 123456<br/>
                    【テストユーザー3】<br />
                    ・Email: test3@gmail.com<br />
                    ・Password: 123456
                </div>
                <form onSubmit={handleSubmit}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required /><br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="パスワード" required /><br />
                    <button>ログイン(ユーザー切り替え)</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <h1>ログイン</h1>
                <form onSubmit={handleSubmit}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required /><br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="パスワード" required /><br />
                    <button>ログイン</button>
                </form>
            </div>
        )
    }
}

export default Login
