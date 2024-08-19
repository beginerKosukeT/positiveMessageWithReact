import { jwtVerify } from 'jose';

const checkLoginUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const secretKey = new TextEncoder().encode('next-app');
      const decodedJwt = await jwtVerify(token, secretKey);
      const loginUser = {
        _id: decodedJwt.payload._id,
        name: decodedJwt.payload.name,
        email: decodedJwt.payload.email,
        icon: decodedJwt.payload.icon,
      };
      return loginUser;
    } catch (error) {
      console.log('ログイン情報の確認に失敗しました。');
      localStorage.removeItem('token');
      const loginUser = {
        _id: '',
        name: '',
        email: '',
        icon: '',
      };
      return loginUser;
    }
  } else {
    const loginUser = {
      _id: '',
      name: '',
      email: '',
      icon: '',
    };
    return loginUser;
  }
};

export default checkLoginUser;
