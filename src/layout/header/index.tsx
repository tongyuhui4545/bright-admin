import styles from "./index.module.less";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Button } from "antd";
import { useStore } from "../../store";
import storage from "../../utils/storage";

const NavHeader = () => {
  const { collapsed, updateCollapsed } = useStore();

  const toggleCollapsed = () => {
    updateCollapsed();
  };
  const items: MenuProps["items"] = [
    {
      key: "email",
      label: "Emailxxxxxxx@xxxxxxx",
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  const onClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      //logout
      storage.remove("token");
      window.location.href = "/login";
    }
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => toggleCollapsed()}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div className={styles.right}>
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <span className={styles.nickName}>yolo</span>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavHeader;
