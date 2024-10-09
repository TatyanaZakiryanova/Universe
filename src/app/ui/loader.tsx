import styles from './searchinput.module.scss';

const Loader = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
