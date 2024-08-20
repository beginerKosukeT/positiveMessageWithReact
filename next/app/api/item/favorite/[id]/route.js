import { NextResponse } from 'next/server';
import connectDB from '../../../../utils/database';
import {
  ItemModel,
  UserModel,
  LikeModel,
} from '../../../../utils/schemaModels';

export async function GET(request, context) {
  try {
    await connectDB();
    const user = await UserModel.findOne({
      _id: context.params.id,
    });
    // ログインユーザーが行ったお気に入りを取得
    const likes = await LikeModel.find({ email: user.email });
    //　お気に入りされた投稿の詳細を取得
    const favoriteItems = [];
    for (let i = 0; i < likes.length; i++) {
      const favoriteItem = await ItemModel.findOne({
        _id: likes[i].itemId,
      });
      favoriteItems.push(favoriteItem);
    }
    return NextResponse.json({
      message: 'アイテム読み取り成功（お気に入り）',
      favoriteItems: favoriteItems,
    });
  } catch (err) {
    return NextResponse.json({ message: 'アイテム読み取り失敗（お気に入り）' });
  }
}

export const revalidate = 0;
