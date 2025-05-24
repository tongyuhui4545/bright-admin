import { useEffect, useState, useRef } from "react";
import { Button, Space, Table, Form, Input, Modal, message } from "antd";
import type { TableColumnsType } from "antd";
import api from "../../api";
import { IDept } from "../../types/api";
import CreateDept from "./CreateDept";
import dayjs from "dayjs";

// let cocococ = dayjs("2023-10-01 12:00:00").format("YYYY-MM-DD HH:mm:ss");
// console.log(cocococ);

const Department = () => {
  const deptRef = useRef<{ openModal: () => void }>(null);
  const [data, setData] = useState<IDept[]>([]);
  const [form] = Form.useForm();

  const columns: TableColumnsType<IDept> = [
    {
      title: "Dept Name",
      dataIndex: "deptName",
      key: "deptName",
      width: "200",
    },
    {
      title: "Personnel",
      dataIndex: "userName",
      key: "userName",
      width: "150",
    },
    {
      title: "Update at",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text) => {
        return text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-";
      },
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
  const handleEdit = (record: IDept) => {
    console.log(record);
  };
  //delete dept
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Department",
      content: "Are you sure you want to delete this department?",
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
    getDeptData();
  };

  const getDeptData = async () => {
    const data = await api.getDeptList(form.getFieldsValue());
    setData(data);
  };

  //reset
  const handleReset = () => {
    form.resetFields();
    getDeptData();
  };

  useEffect(() => {
    getDeptData();
  });

  return (
    <>
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item name="deptName" label="Dept Name">
          <Input placeholder="Please input dept name" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="mr10"
            htmlType="submit"
            onClick={getDeptData}
          >
            Search
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleReset()
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
      <CreateDept mref={deptRef} update={getDeptData} />
    </>
  );
};

export default Department;
