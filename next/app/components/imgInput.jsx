import { useState } from 'react';
import styles from './components.module.css';

const ImgInput = (props) => {
  const [imageFile, setImageFile] = useState('');

  const handleClick = async () => {
    try {
      const data = new FormData();
      data.append('file', imageFile);
      data.append('upload_preset', 'ojnbekx0');
      data.append('cloud_name', 'dscp7ly3b');
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dscp7ly3b/image/upload',
        { method: 'POST', body: data },
      );
      const jsonData = await response.json();
      await props.setImage(jsonData.url);
      alert('画像アップロード成功');
    } catch (err) {
      alert('画像アップロード失敗');
    }
  };
  return (
    <div className={styles.imgInput}>
      <input
        type='file'
        onChange={(e) => setImageFile(e.target.files[0])}
        accept='image/png, image/jpg, image/jpeg'
      />
      <button onClick={handleClick} disabled={!imageFile}>
        画像アップロード
      </button>
    </div>
  );
};

export default ImgInput;
