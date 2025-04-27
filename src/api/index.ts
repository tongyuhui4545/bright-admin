import request from "../utils/request";
import { ILoginParams, IDeptSearchParams, IDept, IUser } from "../types/api";

export default {
  login(params: ILoginParams) {
    return request.post("users/login", params);
  },
  //get department list
  getDeptList(params?: IDeptSearchParams) {
    return request.get<IDept[]>("/dept/list", params);
  },
  //get user list
  getUserList() {
    return request.get<IUser[]>("/users/list");
  },
  // get all user list
  getAllUserList() {
    return request.get<IUser[]>("/users/all/list");
  },
  // get role list
  getRoleList() {
    return request.get("/role/list");
  },
  //create department
  createDept(params: IDept) {
    return request.post("/dept/create", params);
  },
  //delete department
  deleteDept(params: { _id: string }) {
    return request.delete("/dept/delete", params);
  },
};
