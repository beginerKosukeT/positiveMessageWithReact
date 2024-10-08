'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/register`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            icon: icon,
            email: email,
            password: password,
          }),
        },
      );
      const jsonData = await response.json();
      localStorage.setItem('token', jsonData.token);
      alert(jsonData.message);
      router.push('/');
    } catch (err) {
      alert('ユーザー登録失敗');
    }
  };

  var icons = Array(45);
  for (let i = 0; i < 45; i++) {
    icons[i] = String(i + 1);
  }

  return (
    <div>
      <h1>新規ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.gridContainerIcon} margin-bottom`}>
          {icons.map((num) => (
            <Image
              src={`/icons/sg${num}.png`}
              width={50}
              height={50}
              alt={`user-icon-${num}`}
              key={`user-icon-${num}`}
              priority
              className={
                num === icon ? styles.selectedIcon : styles.hoveringIcon
              }
              onClick={() => setIcon(num)}
            />
          ))}
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          name='name'
          placeholder='名前'
          required
        />
        <br />
        <input value={icon} type='hidden' name='icon' required />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          name='email'
          placeholder='メールアドレス'
          required
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='text'
          name='password'
          placeholder='パスワード'
          required
        />
        <br />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
