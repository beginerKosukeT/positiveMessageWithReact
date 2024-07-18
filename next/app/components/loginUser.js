"use client"
import Image from "next/image"
import useAuth from "../utils/useAuth"

const LoginUser = () => {
    const loginUser = useAuth()
    if (loginUser.email) {
        return (
            <div className="login-user put-on-end margin-bottom">
                <Image src={`/icons/sg${loginUser.icon}.png`} width={100} height={100} alt="user-icon" className="user-icon" />
                {loginUser.name}さん
            </div>
        )
    }
}

export default LoginUser