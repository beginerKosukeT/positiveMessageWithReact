import styles from './components.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>@{new Date().getFullYear()} Positive Message</p>
    </footer>
  );
};

export default Footer;
