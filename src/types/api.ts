export interface ILoginParams {
  userName: string;
  userPwd: string;
}

export interface IDeptSearchParams {
  deptName: string;
}

export interface IDept {
  _id: string;
  createTime: string;
  updateTime: string;
  detpName: string;
  parentId: string;
  userName: string;
  children: IDept[];
}

//user
export interface IUser {
  _id: string;
  userName: string;
  userPwd: string;
  deptId: string;
  roleId: string;
  children: IUser[];
}

//search params
export interface ISearchParams {
  menuName: string;
  menuState: number;
}

//create menu params
export interface ICreateMenuParams {
  menuName: string; // menu names
  menuIcon: string; // menu icon
  menuPath: string; //menu path
  menuType: number; // menu type: 1- menu, 2- button, 3- page
  menuCode: string; // menu permissions
  menuStatus: number; // 1- active, 2- disabled, 3- deleted
  parentId: string;
}

//update menu params
export interface IUpdateMenuParams extends ICreateMenuParams {
  _id: string;
}

//menu
export interface IMenu extends ICreateMenuParams {
  _id: string;
  createTime: string;
  buttons?: IMenu[];
  children?: IMenu[];
}
