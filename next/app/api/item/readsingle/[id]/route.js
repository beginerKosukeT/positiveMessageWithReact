import { NextResponse } from 'next/server';
import connectDB from '../../../../utils/database';
import { ItemModel, UserModel } from '../../../../utils/schemaModels';

export async function GET(request, context) {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);
    return NextResponse.json({
      message: 'アイテム読み取り成功（シングル）',
      singleItem: singleItem,
    });
  } catch (err) {
    return NextResponse.json({ message: 'アイテム読み取り失敗（シングル）' });
  }
}

export async function POST(request) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const user = await UserModel.findOne({
      email: reqBody.email,
    });
    return NextResponse.json({
      message: 'ユーザーID取得成功',
      userId: user._id,
    });
  } catch (err) {
    return NextResponse.json({ message: 'ユーザーID取得失敗' });
  }
}
