import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"

export async function POST(request) {
    const reqBody = await request.json()
    console.log(reqBody.keyword)
    try {
        await connectDB()
        const foundItems = await ItemModel.find({ title: { $regex: `${reqBody.keyword}`, $options: 'i' } }).sort({ createdAt: 'desc' })
        return NextResponse.json({ message: "アイテム読み取り成功（検索）", foundItems: foundItems })
    } catch (err) {
        return NextResponse.json({ message: "アイテム読み取り失敗（検索）" })
    }
}

export const revalidate = 0