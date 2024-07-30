import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel, LikeModel } from "../../../utils/schemaModels"

// お気に入りボタン押下時処理
export async function POST(request) {
    const reqBody = await request.json()
    if (reqBody.liked) {
        try {
            await connectDB()
            await LikeModel.deleteMany(reqBody.like)
            await ItemModel.findByIdAndUpdate(reqBody.like.itemId, { likeNumber: 0 })
            return NextResponse.json({ message: "お気に入り解除成功", success: true })
        } catch (err) {
            return NextResponse.json({ message: "お気に入り解除失敗", success: false })
        }
    } else {
        try {
            await connectDB()
            await LikeModel.create(reqBody.like)
            await ItemModel.findByIdAndUpdate(reqBody.like.itemId, { likeNumber: 2 })
            return NextResponse.json({ message: "お気に入り登録成功", success: true })
        } catch (err) {
            return NextResponse.json({ message: "お気に入り登録失敗", success: false })
        }
    }
}