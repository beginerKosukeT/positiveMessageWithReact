import styles from './description.module.css';

export default async function Description(props) {
  return (
    <div className={styles.zindex}>
      <h1 className={styles.title}>{props.title}</h1>
      <p className={styles.sub}>{props.sub}</p>
    </div>
  );
}
