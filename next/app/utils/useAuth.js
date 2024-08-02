import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtVerify } from "jose"

const useAuth = () => {
    const [loginUser, setLoginUser] = useState({
        name: "",
        email: "",
        icon: ""
    })
    const router = useRouter()

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                alert("ログインが必要です。")
                router.push("/user/login")
            }
            
            try {
                const secretKey = new TextEncoder().encode("next-app")
                const decodedJwt = await jwtVerify(token, secretKey)
                setLoginUser({
                    name: decodedJwt.payload.name,
                    email: decodedJwt.payload.email,
                    icon: decodedJwt.payload.icon
                })
            } catch (error) {
                alert("ログイン情報の確認に失敗しました。")
                router.push("/user/login")
            }
        }
        checkToken()
    }, [router])

    return loginUser
}

export default useAuth