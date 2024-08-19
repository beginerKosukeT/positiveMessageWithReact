'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import checkLoginUser from '../utils/checkLoginUser';

const LoginUser = () => {
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

  if (loginUser._id !== '') {
    return (
      <div className='login-user put-on-end margin-bottom'>
        <Image
          src={`/icons/sg${loginUser.icon}.png`}
          width={100}
          height={100}
          alt='user-icon'
          className='user-icon'
          priority
        />
        {loginUser.name}さん
      </div>
    );
  }
};

export default LoginUser;
