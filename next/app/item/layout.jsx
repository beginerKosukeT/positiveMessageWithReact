import Header from '../components/header';
import styles from './item.module.css';

const RootLayout = ({ children }) => {
  return (
    <>
      <Header inLoginPage={false} />
      <div className={styles.mainContent}>{children}</div>
    </>
  );
};

export default RootLayout;
