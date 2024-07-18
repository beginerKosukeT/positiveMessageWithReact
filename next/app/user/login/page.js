"use client"
import { useState } from "react"
import useAuth from "../../utils/useAuth"
import Image from "next/image"
import { useRouter } from "next/navigation"
import LoginUser from "../../components/loginUser"


const Login = () => {
    const [email, setEmail] = useState("test@gmail.com")
    const [password, setPassword] = useState("test123")
    const loginUser = useAuth()
    // const [name, setName] = useState("")
    // const [icon, setIcon] = useState("")
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
            localStorage.setItem("token", jsonData.token)

            //↓要修正
            // const token = localStorage.getItem("token")
            // if (!token) {
            //     router.push("/user/login")
            // }
            // try {
            //     const secretKey = new TextEncoder().encode("next-app")
            //     const decodedJwt = await jwtVerify(token, secretKey)
            // setName(decodedJwt.payload.name)
            // setIcon(decodedJwt.payload.icon)
            // } catch (error) {
            //     router.push("/user/login")
            // }
            //↑

            alert(jsonData.message)
            if (jsonData.token) {
                router.push("/")
            }
        } catch (err) {
            alert("ログイン失敗")
        }
    }

    if (loginUser.email) {
        return (
            <div>
                <LoginUser/>
                <h1>ログイン</h1>
                <div className="login-user basic-font">
                    <Image src={`/icons/sg${loginUser.icon}.png`} width={50} height={50} alt="user-icon" className="user-icon" />
                    {loginUser.name}さんがログイン済みです。以下を入力して、ユーザーを切り替える事ができます。
                </div>
                <div className="login-switch-information margin-bottom">
                    【monotein】<br />
                    ・Email: dummy@gmail.com<br />
                    ・Password: mono-123<br />
                    【ユーザーテスト】<br />
                    ・Email: test@gmail.com<br />
                    ・Password: test123
                </div>
                <form onSubmit={handleSubmit}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required /><br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required /><br />
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
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required /><br />
                    <button>ログイン</button>
                </form>
            </div>
        )
    }
}

export default Login
