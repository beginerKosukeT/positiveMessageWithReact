import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"
import { LikeModel } from "../../../utils/schemaModels"

//初期表示(お気に入り登録状況確認)
export async function POST(request) {
    const reqBody = await request.json()
    await connectDB()
    const like = await LikeModel.find({
        email: reqBody.like.email,
        itemId: reqBody.like.itemId
    })
    return NextResponse.json({ message: "お気に入り登録確認成功", like: like })
}