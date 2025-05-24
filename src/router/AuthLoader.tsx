import api from "../api";
import {getMenuPath} from '../utils' 

const AuthLoader = async () => {
  const data = await api.getPermissionList();
  const {menuList} = data;
  const menuPathList = getMenuPath(menuList);

  return {
    menuList,
    menuPathList,
    buttonList: data?.buttonList
  }
}

export default AuthLoader