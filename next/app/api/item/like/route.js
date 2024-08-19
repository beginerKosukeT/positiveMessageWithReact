import { NextResponse } from 'next/server';
import connectDB from '../../../utils/database';
import { ItemModel, LikeModel } from '../../../utils/schemaModels';

//likesテーブルのお気に入り登録状況確認
export async function POST(request) {
  const reqBody = await request.json();
  await connectDB();
  const myLikeCount = await LikeModel.find({
    email: reqBody.email,
    itemId: reqBody.itemId,
  }).countDocuments();
  const allLikeCount = await LikeModel.find({
    itemId: reqBody.itemId,
  }).countDocuments();
  return NextResponse.json({
    message: 'お気に入り登録確認成功',
    myLikeCount: myLikeCount,
    allLikeCount: allLikeCount,
  });
}

// itemsテーブルのlikeNumber更新
export async function PUT(request) {
  const reqBody = await request.json();
  if (reqBody.iliked) {
    try {
      await connectDB();
      await LikeModel.deleteMany(reqBody.like);
      const likeCount = await LikeModel.find({
        itemId: reqBody.like.itemId,
      }).countDocuments();
      const singleItem = await ItemModel.findById(reqBody.like.itemId);
      singleItem.likeNumber = likeCount;
      await singleItem.save();
      const likeCountRevised = await LikeModel.find({
        itemId: reqBody.like.itemId,
      }).countDocuments();
      return NextResponse.json({
        message: 'お気に入り解除成功',
        success: true,
        likeCountRevised: likeCountRevised,
      });
    } catch (err) {
      return NextResponse.json({
        message: 'お気に入り解除失敗',
        success: false,
        likeCountRevised: likeCountRevised,
      });
    }
  } else {
    try {
      await connectDB();
      await LikeModel.create(reqBody.like);
      const likeCount = await LikeModel.find({
        itemId: reqBody.like.itemId,
      }).countDocuments();
      const singleItem = await ItemModel.findById(reqBody.like.itemId);
      singleItem.likeNumber = likeCount;
      await singleItem.save();
      const likeCountRevised = await LikeModel.find({
        itemId: reqBody.like.itemId,
      }).countDocuments();
      return NextResponse.json({
        message: 'お気に入り登録成功',
        success: true,
        likeCountRevised: likeCountRevised,
      });
    } catch (err) {
      return NextResponse.json({
        message: 'お気に入り登録失敗',
        success: false,
        likeCountRevised: likeCountRevised,
      });
    }
  }
}
