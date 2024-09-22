'use client';
import * as React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import checkLoginUser from '../../utils/checkLoginUser';
import styles from './menu.module.css';
import Image from 'next/image';
import cx from 'classnames';

const Menu = () => {
  const [loginUser, setLoginUser] = useState({
    _id: '',
    name: '',
    email: '',
    icon: '',
  });
  useEffect(() => {
    const checkToken = async () => {
      const loginUser = await checkLoginUser();
      setLoginUser({
        _id: loginUser._id,
        name: loginUser.name,
        email: loginUser.email,
        icon: loginUser.icon,
      });
    };
    checkToken();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <nav className={cx(styles.nav, isOpen && styles.open)}>
        <ul className={styles.items}>
          <li>
            <Link href='/' className={styles.item} onClick={close}>
              <Image
                src='/utils/menu/chat-square-text.svg'
                alt='最新の投稿'
                width={16}
                height={16}
                className={styles.marginRight}
              />
              <h4>最新の投稿</h4>
            </Link>
          </li>
          <li>
            <Link href='/item/bests' className={styles.item} onClick={close}>
              <Image
                src='/utils/menu/hand-thumbs-up.svg'
                alt='人気の投稿'
                width={16}
                height={16}
                className={styles.marginRight}
              />
              <h4>人気の投稿</h4>
            </Link>
          </li>
          <li>
            <Link href='/item/search' className={styles.item} onClick={close}>
              <Image
                src='/utils/menu/search.svg'
                alt='検索'
                width={16}
                height={16}
                className={styles.marginRight}
              />
              <h4>検索</h4>
            </Link>
          </li>
          <li>
            <Link href='/user/register' className={styles.item} onClick={close}>
              <Image
                src='/utils/menu/person-plus.svg'
                alt='新規ユーザー登録'
                width={16}
                height={16}
                className={styles.marginRight}
              />
              <h4>新規ユーザー登録</h4>
            </Link>
          </li>
          <li>
            <Link href='/user/login' className={styles.item} onClick={close}>
              <Image
                src='/utils/menu/key.svg'
                alt='ログイン'
                width={16}
                height={16}
                className={styles.marginRight}
              />
              <h4>ログイン</h4>
            </Link>
          </li>
          <li>
            <Link
              href={`/item/mypage/${loginUser._id}`}
              className={styles.item}
              onClick={close}
            >
              <Image
                src='/utils/menu/person.svg'
                alt='マイページ'
                width={16}
                height={16}
                className={styles.marginRight}
              />
              <h4>マイページ</h4>
            </Link>
          </li>
          <li>
            <Link href='/item/create' className={styles.item} onClick={close}>
              <Image
                src='/utils/menu/upload.svg'
                alt='新規投稿'
                width={16}
                height={16}
                className={styles.marginRight}
              />
              <h4>新規投稿</h4>
            </Link>
          </li>
          <li>
            <Link href='/contact' className={styles.item} onClick={close}>
              <Image
                src='/utils/menu/question-lg.svg'
                alt='問い合わせ'
                width={16}
                height={16}
                className={styles.marginRight}
              />
              <h4>問い合わせ</h4>
            </Link>
          </li>
        </ul>
        <button
          className={cx(styles.button, styles.closeButton)}
          onClick={close}
        >
          <Image
            src='/utils/close.svg'
            alt='閉じる'
            width={24}
            height={24}
            priority
          />
        </button>
      </nav>
      <button
        className={cx(styles.button, !isOpen && styles.menuButton)}
        onClick={open}
      >
        <Image
          src='/utils/menu.svg'
          alt='メニューボタン'
          width={24}
          height={24}
        />
      </button>
    </>
  );
};

export default Menu;
