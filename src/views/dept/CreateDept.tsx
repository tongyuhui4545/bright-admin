import { Modal, Form, Input, Select, TreeSelect, message } from "antd";
import { useState, useEffect, RefObject, useImperativeHandle } from "react";
import api from "../../api";
import { IDept, IUser } from "../../types/api";

interface IProps {
  mref: RefObject<{ openModal: () => void } | null>;
  update: () => void;
}

const CreateDept = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deptList, setDeptList] = useState<IDept[]>([]);
  const [userList, setUserList] = useState<IUser[]>([]);

  //use api for department list
  const getDeptList = async () => {
    const data = await api.getDeptList();
    setDeptList(data);
  };
  //call api for user list
  const getAllUserList = async () => {
    const data = await api.getAllUserList();
    setUserList(data);
  };

  useEffect(() => {
    getDeptList();
    getAllUserList();
  }, []);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    await api.createDept(form.getFieldsValue());
    setIsModalOpen(false);
    handleCancel();
    message.success("Department created successfully!");
    //refresh the department list
    props.update();
  };
  const openModal = () => {
    showModal();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useImperativeHandle(props.mref, () => ({ openModal }));
  return (
    <>
      <Modal
        title="Create Department"
        width={600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} labelAlign="right">
          <Form.Item hidden name="_id">
            <Input />
          </Form.Item>
          <Form.Item label="Superior Department " name="superiorDept">
            <TreeSelect
              placeholder="Please select a superior department"
              allowClear
              treeDefaultExpandAll
              treeData={deptList}
              fieldNames={{ label: "deptName", value: "_id" }}
            ></TreeSelect>
          </Form.Item>
          <Form.Item
            label="Department Name "
            name="deptName"
            rules={[
              { required: true, message: "Please input department name!" },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Manager Name "
            name="userName"
            rules={[
              { required: true, message: "Please select the manager name!" },
            ]}
          >
            <Select>
              {userList.map((user) => {
                return (
                  <Select.Option key={user._id} value={user._id}>
                    {user.userName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateDept;
