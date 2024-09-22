'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import useAuth from '../../../utils/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css';

const DeleteItem = (context) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [load, setLoad] = useState(false);
  const loginUser = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getSingleItem = async (id) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`,
        { cache: 'no-store' },
      );
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      setTitle(singleItem.title);
      setAuthor(singleItem.author);
      setImage(singleItem.image);
      setMessage(singleItem.message);
      setEmail(singleItem.email);
      setLoad(true);
    };
    getSingleItem(context.params.id);
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            email: loginUser.email,
          }),
        },
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push('/');
    } catch (err) {
      alert('アイテム削除失敗');
    }
  };

  if (load) {
    if (loginUser.email === email) {
      return (
        <div>
          <Link href={`/item/readsingle/${context.params.id}`}>
            <div className={styles.goBackLink}>
              <Image
                src='/utils/chevron-left.svg'
                width={20}
                height={20}
                alt='goBackLink'
                priority
              />
              <div>戻る</div>
            </div>
          </Link>
          <h1 className='page-title'>アイテム削除</h1>
          <h2 className='margin-bottom'>
            下記のアイテムを削除します。取り消しはできません。
          </h2>
          <form onSubmit={handleSubmit}>
            <div
              className={`${styles.gridContainerSingle} ${styles.border} margin-bottom`}
            >
              <div>
                <Image
                  src={image}
                  width={750}
                  height={500}
                  alt='item-image'
                  priority
                />
              </div>
              <div>
                <h1>{title}</h1>
                <h2>{author}</h2>
                <hr />
                <p>{message}</p>
              </div>
            </div>
            <button>削除</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className='margin-top'>権限がありません</h1>
        </div>
      );
    }
  } else {
    return <h1 className='margin-top'>Loading...</h1>;
  }
};

export default DeleteItem;
