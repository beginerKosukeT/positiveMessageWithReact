import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"

export async function POST(request) {
    const reqBody = await request.json()

    try {
        await connectDB()
        await ItemModel.create(reqBody)
        return NextResponse.json({ message: "新規投稿成功" })
    } catch (err) {
        return NextResponse.json({ message: "新規投稿失敗" })
    }
}