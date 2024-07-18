import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"

export async function POST(request) {
    const reqBody = await request.json()

    try {
        // ユーザー登録
        await connectDB()
        await UserModel.create(reqBody)
        // ログイン
        const secretKey = new TextEncoder().encode("next-app")
        const payload = {
            name: reqBody.name,
            email: reqBody.email,
            icon: reqBody.icon
        }
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1d")
            .sign(secretKey)
        return NextResponse.json({ message: "ユーザー登録成功", token: token })
    } catch (err) {
        return NextResponse.json({ message: "ユーザー登録失敗" })
    }
}