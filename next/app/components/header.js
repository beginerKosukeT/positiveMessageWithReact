'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Menu from './menu/menu';
import styles from './components.module.css';
import Descripton from '../components/Description/description';
import cx from 'classnames';

const Header = (props) => {
  return (
    <header>
      <div className={styles.headerTop}>
        <Link href='/' className={styles.logoLink}>
          <h2>Positive Message</h2>
        </Link>
        <Menu />
      </div>
      <section
        className={cx(
          styles.headerContainer,
          props.inLoginPage ? styles.largePadding : styles.smallPadding,
        )}
      >
        {props.inLoginPage && (
          <Descripton
            title='ポジティブな言葉を聞いて、いつでも前向きに'
            sub='ポジティブなメッセージを投稿・読み上げできるサービスです。'
          />
        )}
        <Image
          className={cx(
            styles.bgimg,
            props.inLoginPage ? styles.largeHeight : styles.smallHeight,
          )}
          src='/utils/img-mv.jpg'
          alt=''
          width={4000}
          height={1200}
        />
      </section>
    </header>
  );
};

export default Header;
