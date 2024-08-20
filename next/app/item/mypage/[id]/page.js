'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MyPosts = (context) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    const getFavoriteItems = async (id) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/favorite/${id}`,
        { cache: 'no-store' },
      );
      const jsonData = await response.json();
      setFavoriteItems(jsonData.favoriteItems);
    };
    const getAuthorsItems = async (id) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/author/${id}`,
        { cache: 'no-store' },
      );
      const jsonData = await response.json();
      setMyItems(jsonData.authorsItems);
    };
    getFavoriteItems(context.params.id);
    getAuthorsItems(context.params.id);
  }, [context]);

  if (favoriteItems.length < 1 && myItems.length < 1) {
    return (
      <div>
        <h1 className='page-title'>マイページ</h1>
        <h2 className='margin-bottom'>お気に入りした投稿</h2>
        <div className='basic-font margin-bottom'>投稿がありません。</div>
        <h2 className='margin-bottom'>作成した投稿</h2>
        <div className='basic-font'>投稿がありません。</div>
      </div>
    );
  } else if (favoriteItems.length >= 1 && myItems.length < 1) {
    return (
      <div>
        <h1 className='page-title'>マイページ</h1>
        <h2 className='margin-bottom'>お気に入りした投稿</h2>
        <div className='grid-container-in margin-bottom'>
          {favoriteItems.map((item) => (
            <Link href={`/item/readsingle/${item._id}`} key={item._id}>
              <div className='display-flex'>
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt='item-image'
                  priority
                />
                <div>
                  <h2>{item.title}</h2>
                  <h3>{item.author}</h3>
                  <p>{item.message.substring(0, 10)}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className='margin-bottom'>作成した投稿</h2>
        <div className='basic-font'>投稿がありません。</div>
      </div>
    );
  } else if (favoriteItems.length < 1 && myItems.length >= 1) {
    return (
      <div>
        <h1 className='page-title'>マイページ</h1>
        <h2 className='margin-bottom'>お気に入りした投稿</h2>
        <div className='basic-font margin-bottom'>投稿がありません。</div>
        <h2 className='margin-bottom'>作成した投稿</h2>
        <div className='grid-container-in'>
          {myItems.map((item) => (
            <Link href={`/item/readsingle/${item._id}`} key={item._id}>
              <div className='display-flex'>
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt='item-image'
                  priority
                />
                <div>
                  <h2>{item.title}</h2>
                  <h3>{item.author}</h3>
                  <p>{item.message.substring(0, 10)}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } else if (favoriteItems.length >= 1 && myItems.length >= 1) {
    return (
      <div>
        <h1 className='page-title'>マイページ</h1>
        <h2 className='margin-bottom'>お気に入りした投稿</h2>
        <div className='grid-container-in margin-bottom'>
          {favoriteItems.map((item) => (
            <Link href={`/item/readsingle/${item._id}`} key={item._id}>
              <div className='display-flex'>
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt='item-image'
                  priority
                />
                <div>
                  <h2>{item.title}</h2>
                  <h3>{item.author}</h3>
                  <p>{item.message.substring(0, 10)}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className='margin-bottom'>作成した投稿</h2>
        <div className='grid-container-in'>
          {myItems.map((item) => (
            <Link href={`/item/readsingle/${item._id}`} key={item._id}>
              <div className='display-flex'>
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt='item-image'
                  priority
                />
                <div>
                  <h2>{item.title}</h2>
                  <h3>{item.author}</h3>
                  <p>{item.message.substring(0, 10)}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default MyPosts;
