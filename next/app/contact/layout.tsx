import Header from '../components/header';
import styles from './page.module.css';

type Props = {
  children: React.ReactNode;
};

const ContactLayout = ({ children }: Props) => {
  return (
    <>
      <Header inLoginPage={false} />
      <div className={styles.mainContent}>{children}</div>
    </>
  );
};

export default ContactLayout;
