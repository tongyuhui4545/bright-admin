import { Button } from "antd";
import styles from "./index.module.less";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcome}>
        <div className={styles.subTitle}>Welcome to use</div>
        <div className={styles.title}>
          This is the admin panel for Brighten techs
        </div>
        <div className={styles.desc}>Powered by React and TS</div>
      </div>
      <div className={styles.img}></div>
    </div>
  );
};

export default Welcome;
