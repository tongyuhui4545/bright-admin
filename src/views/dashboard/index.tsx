import styles from "./index.module.less";
import { Descriptions } from 'antd'

const Dashboard = () => {
  return <div className={styles.dashboard}>
    <div className={styles.userInfo}>
      <img src="" alt="" />
      <Descriptions title='User Info'>
        <Descriptions.Item label='User ID'>Name</Descriptions.Item>
        <Descriptions.Item label='Email'>123456</Descriptions.Item>
        <Descriptions.Item label='Status'>gugu</Descriptions.Item>
        <Descriptions.Item label='Phone No.'>empty</Descriptions.Item>
        <Descriptions.Item label='Position'>jjj,egksk, 123</Descriptions.Item>
        <Descriptions.Item label='Department'>hulu</Descriptions.Item>
      </Descriptions>
    </div>
    <div className={styles.report}>
      <div className={styles.card}>
        <div className={styles.title}>codes submitted</div>
        <div className={styles.content}>1123</div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>codes submitted</div>
        <div className={styles.content}>1123</div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>codes submitted</div>
        <div className={styles.content}>1123</div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>codes submitted</div>
        <div className={styles.content}>1123</div>
      </div>
    </div>
  </div>;
};

export default Dashboard;
