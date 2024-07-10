"use client"
import {useState} from "react"

const Login = () => {
    const [email, setEmail] = useState("test@gmail.com")
    const [password, setPassword] = useState("test123")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
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
            alert(jsonData.message)
        } catch (err) {
            alert("ログイン失敗")
        }
    }

    return (
        <div className="body">
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required /><br/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required /><br/>
                <button className="margin-bottom">ログイン</button>
            </form>
        </div>
    )
}

export default Login
