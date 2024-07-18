"use client"
import { useState } from "react"
import LoginUser from "../../components/loginUser"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Register = () => {
    const [name, setName] = useState("")
    const [icon, setIcon] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    icon: icon,
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            console.log(jsonData)
            localStorage.setItem("token", jsonData.token)
            alert(jsonData.message)
            router.push("/")
        } catch (err) {
            alert("ユーザー登録失敗")
        }
    }
    var icons = Array(45)
    for (let i = 0; i < 45; i++) {
        icons[i] = String(i + 1)
    }

    return (
        <div>
            <LoginUser />
            <h1>新規ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid-container-icon margin-bottom">
                    {icons.map(num =>
                        <Image src={`/icons/sg${num}.png`} width={50} height={50} alt={`user-icon-${num}`} key={`user-icon-${num}`} priority
                            className={num == icon ? "selected-icon" : ""} onClick={() => setIcon(num)}
                        />
                    )}
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前" required /><br />
                <input value={icon} type="hidden" name="icon" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required /><br />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required /><br />
                <button>登録</button>
            </form>
        </div>
    )
}

export default Register