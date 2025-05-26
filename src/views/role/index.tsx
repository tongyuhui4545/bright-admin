import {
  Form,
  message,
  Input,
  Space,
  Button,
  Table,
  TableColumnsType,
  Modal,
} from "antd";
import dayjs from "dayjs";
import api from "../../api";
import { useRef } from "react";
import { IRole, IRoleSearchParams } from "../../types/api";
import { useAntdTable } from "ahooks";

import CreateRole from "./CreateRole";
import SetPermission from "./SetPermission";

const Role = () => {
  const roleRef = useRef<{
    openModal: (type: string, data?: IRole | { parentId: string }) => void;
  }>(null);

  const permissionRef = useRef<{
    openModal: (type: string, data?: IRole) => void;
  }>(null);

  const [form] = Form.useForm();
  const columns: TableColumnsType<IRole> = [
    { title: "Role Name", dataIndex: "roleName", key: "roleName" },
    { title: "Remark", dataIndex: "remark", key: "remark" },
    {
      title: "Created At",
      dataIndex: "createTime",
      key: "createTime",
      render: (text: string) => {
        return dayjs(text).format("dd-MM-yyyy");
      },
    },
    {
      title: "Updated At",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text: string) => {
        return dayjs(text).format("dd-MM-yyyy");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleEdit(record);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleSetPermission(record);
              }}
            >
              Set Permission
            </Button>
            <Button
              danger
              onClick={() => {
                handleDelete(record?._id);
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  //functions
  const handleCreate = () => {
    roleRef.current?.openModal("create");
  };
  const handleSetPermission = (record: IRole) => {
    permissionRef.current?.openModal("setPermission", record);
  };
  const handleEdit = (record: IRole) => {
    roleRef.current?.openModal("edit", record);
  };
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete the role",
      content: "Are you sure you want to delete the role?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        await api.deleteRole({ _id: id });
        message.success("Delete successfully");
        search.submit();
      },
    });
  };

  const getRoleData = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData: IRoleSearchParams
  ) => {
    return await api
      .getRoleList({ ...formData, pageNum: current, pageSize: pageSize })
      .then((data) => {
        return {
          list: data.list,
          total: data.page.total,
        };
      });
  };

  const { tableProps, search } = useAntdTable(getRoleData, {
    form,
    defaultPageSize: 10,
  });

  return (
    <div className="role-wrap">
      <Form form={form} className="search-form" layout="inline">
        <Form.Item name="roleName" label="Role Name">
          <Input placeholder="input role name" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" onClick={search.submit}>
              Search
            </Button>
            <Button type="primary" htmlType="reset" onClick={search.reset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="wrap-table">
        <div className="header">
          <div className="title">Role List</div>
          <div className="action">
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
        <Table columns={columns} {...tableProps}></Table>
      </div>
      {/* Create Role Modal */}
      <CreateRole mref={roleRef} update={search.submit} />
      {/* Set Permission Modal */}
      <SetPermission mref={permissionRef} update={search.submit} />
    </div>
  );
};

export default Role;
