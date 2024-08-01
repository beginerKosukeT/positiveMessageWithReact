import { NextResponse } from "next/server"
import connectDB from "../../../../utils/database"
import { ItemModel, UserModel } from "../../../../utils/schemaModels"

export async function GET(request, context) {
    try {
        await connectDB()
        const authorsItems = await ItemModel.find({ email: context.params.id }).sort({ createdAt: 'desc' })
        if (authorsItems.length === 0) {
            const author = await UserModel.findOne({ email: context.params.id })
            return NextResponse.json({ message: "アイテム読み取り成功（投稿者別）", authorsItems: authorsItems, author: author })
        } else {
            return NextResponse.json({ message: "アイテム読み取り成功（投稿者別）", authorsItems: authorsItems })
        }
    } catch (err) {
        return NextResponse.json({ message: "アイテム読み取り失敗（投稿者別）" })
    }
}

export const revalidate = 0