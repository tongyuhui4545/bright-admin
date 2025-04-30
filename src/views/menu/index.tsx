import { useEffect, useState, useRef } from "react";
import {
  Button,
  Space,
  Select,
  Table,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import type { TableColumnsType } from "antd";
import api from "../../api";
import { IMenu } from "../../types/api";
// import CreateDept from "./CreateDept";
import dayjs from "dayjs";

// let cocococ = dayjs("2023-10-01 12:00:00").format("YYYY-MM-DD HH:mm:ss");
// console.log(cocococ);

const Menu = () => {
  const deptRef = useRef<{ openModal: () => void }>(null);
  const [data, setData] = useState<IMenu[]>([]);
  const [form] = Form.useForm();

  const columns: TableColumnsType<IMenu> = [
    {
      title: "Menu Name",
      dataIndex: "menuName",
      key: "menuName",
      width: "200",
    },
    {
      title: "Menu Icon",
      dataIndex: "menuIcon",
      key: "menuIcon",
      width: "150",
    },
    {
      title: "Menu Type",
      dataIndex: "menuType",
      key: "menuType",
      render: (text: number) => {
        return {
          1: "Menu",
          2: "Button",
          3: "Page",
        }[text];
      },
      width: "150",
    },
    {
      title: "Menu Code",
      dataIndex: "menuCode",
      key: "menuCode",
      width: "150",
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
      width: "150",
    },
    {
      title: "Component",
      dataIndex: "component",
      key: "component",
      width: "150",
    },
    {
      title: "Menu Icon",
      dataIndex: "menuIcon",
      key: "menuIcon",
      width: "150",
    },
    {
      title: "Created at",
      dataIndex: "createTime",
      key: "createTime",
      render: (text) => {
        return text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-";
      },
    },
    {
      title: "Action",
      key: "action",
      width: "200",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleSubCreate(record._id);
            }}
          >
            Add
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleEdit(record);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              handleDelete(record._id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  //add dept
  const handleCreate = () => {
    if (deptRef.current) {
      deptRef.current.openModal();
    }
  };
  //add sub dept
  const handleSubCreate = (id: string) => {
    console.log("add sub dept", id);
    return null;
  };
  //edit dept
  const handleEdit = (record: IMenu) => {
    console.log(record);
  };
  //delete dept
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Menu",
      content: "Are you sure you want to delete this Menu?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: async () => {
        handleDelOk(id);
      },
    });
  };

  const handleDelOk = async (id: string) => {
    await api.deleteDept({ _id: id });
    message.success("Department deleted successfully!");
    getMenuData();
  };

  const getMenuData = async () => {
    const data = await api.getMenuList(form.getFieldsValue());
    setData(data);
  };

  //reset
  const handleReset = () => {
    form.resetFields();
    getMenuData();
  };

  useEffect(() => { console.log('kwkwkw');
  
    getMenuData();
  }, []);

  return (
    <>
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item name="menuName" label="Menu Name">
          <Input placeholder="Please input Menu name" />
        </Form.Item>
        <Form.Item name="menuState" label="Menu State">
          <Select
            placeholder="Please select menu status"
            style={{ width: 100 }}
          >
            <Select.Option value={1}>Active</Select.Option>
            <Select.Option value={2 }>Disable</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="mr10"
            htmlType="submit"
            onClick={getMenuData}
          >
            Search
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
      <div className="wrap-table">
        <div className="header">
          <div className="title">Department List</div>
          <div className="action">
            <Button
              onClick={() => {
                handleCreate();
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <Table rowKey="_id" columns={columns} dataSource={data} />
      </div>
      {/* <CreateDept mref={deptRef} update={getMenuData} /> */}
    </>
  );
};

export default Menu;
