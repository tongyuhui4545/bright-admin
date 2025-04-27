import styles from "./index.module.less";
import {
  UserOutlined,
  MailOutlined,
  SolutionOutlined,
  PieChartOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { useStore } from "../../store";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/dashboard", icon: <PieChartOutlined />, label: "Dashboard" },
  {
    key: "/user",
    label: "User",
    icon: <MailOutlined />,
    children: [
      {
        key: "/user-list",
        label: "User List",
        icon: <UserOutlined />,
      },
      {
        key: "/menu-list",
        label: "Menu",
        icon: <MailOutlined />,
      },
      {
        key: "/role-management",
        label: "Role",
        icon: <SolutionOutlined />,
      },
      {
        key: "/dept-management",
        label: "Department",
        icon: <LaptopOutlined />,
      },
    ],
  },
];


const SideMenu = () => {
  const navigate = useNavigate();
  const { collapsed, currentMenu, setCurrentMenu } = useStore();
  const menuClick = ({key}: {key: string}) => {
    setCurrentMenu(key);
    navigate(key);
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.logo}>
        <img src="/imgs/logo.png" className={styles.logo} alt="logo" />
        {collapsed ? null : <span>Admin Panel</span>}
      </div>
      <Menu
        defaultSelectedKeys={["/dashboard"]}
        defaultOpenKeys={["/user"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={menuClick}
        items={items}
      />
    </div>
  );
};

export default SideMenu;
