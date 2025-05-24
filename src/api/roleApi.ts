import request from "../utils/request";
import {
  IRoleSearchParams,
  IRoleCreateParams,
  IPermission,
  IRoleUpdateParams,
  ResultData,
  IRole
} from "../types/api";

export default {
  // get role list
  getRoleList(params: IRoleSearchParams) {
    return request.get<ResultData<IRole>>("/roles/list", params);
  },
  // delete role
  deleteRole(params: { _id: string }) {
    return request.post("/roles/delete", params);
  },
  //update role
  updatePermission(params: IPermission) {
    return request.post("/roles/update/permission", params);
  },
  // create role
  createRole(params: IRoleCreateParams) {
    return request.post("/roles/create", params);
  },

  //update role
  updateRole(params: IRoleUpdateParams) {
    return request.post("/roles/edit", params);
  },
};
