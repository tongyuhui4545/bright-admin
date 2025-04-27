import styles from "./index.module.less";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import NavHeader from "./header";
import Footer from "./footer";
import SideMenu from "./menu";
import { useStore } from "../store";
import "./index.module.less";

const { Content, Sider } = Layout;

const LayoutCon = () => {
  const { collapsed } = useStore();
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <SideMenu />
        </Sider>
        <Layout>
          <NavHeader></NavHeader>
          <Content>
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <Outlet />
              </div>
              <Footer />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutCon;
