import Header from '../../components/header';
import styles from './page.module.css';

const RootLayout = ({ children }) => {
  return (
    <>
      <Header inLoginPage={false} />
      <div className={styles.mainContent}>{children}</div>
    </>
  );
};

export default RootLayout;
