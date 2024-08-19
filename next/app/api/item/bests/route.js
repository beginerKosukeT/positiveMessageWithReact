import { NextResponse } from 'next/server';
import connectDB from '../../../utils/database';
import { ItemModel } from '../../../utils/schemaModels';

export async function GET() {
  try {
    await connectDB();
    const bests = await ItemModel.find({ likeNumber: { $gte: 1 } })
      .limit(8)
      .sort({ likeNumber: 'desc' });
    return NextResponse.json({
      message: 'アイテム読み取り成功（オール）',
      bests: bests,
    });
  } catch (err) {
    return NextResponse.json({ message: 'アイテム読み取り失敗（オール）' });
  }
}

export const revalidate = 0;
