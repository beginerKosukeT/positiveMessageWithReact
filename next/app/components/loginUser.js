"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { jwtVerify } from "jose"

const LoginUser = () => {
    const [loginUser, setLoginUser] = useState({
        name: "",
        email: "",
        icon: ""
    })
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const secretKey = new TextEncoder().encode("next-app")
                    const decodedJwt = await jwtVerify(token, secretKey)
                    setLoginUser({
                        name: decodedJwt.payload.name,
                        email: decodedJwt.payload.email,
                        icon: decodedJwt.payload.icon
                    })
                } catch (error) {
                    console.log("トークンの読み込みに失敗しました")
                }
            }
        }
        checkToken()
    })

    if (loginUser.email != "") {
        return (
            <div className="login-user put-on-end margin-bottom">
                <Image src={`/icons/sg${loginUser.icon}.png`} width={100} height={100} alt="user-icon" className="user-icon" priority />
                {loginUser.name}さん
            </div>
        )
    }
}

export default LoginUser