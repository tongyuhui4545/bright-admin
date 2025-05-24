import {
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { useState, RefObject, useImperativeHandle } from "react";
import {IRole} from "../../types/api";
import api from "../../api";

interface IProps {
  mref: RefObject<{ openModal: (type:string, data?:IRole | {parentId: string}) => void } | null>;
  update: () => void;
}

const CreateRole = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<string>('create');
  const [form] = Form.useForm();

  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    if(action === 'create') {
      await api.createRole(form.getFieldsValue());
      message.success("Role created successfully!");
    } else if(action === 'edit') {
      await api.updateRole(form.getFieldsValue());
      message.success("Role updated successfully!");
    }
    handleCancel();
    //refresh the department list
    props.update();
  };
  const openModal = (type: string, data?:IRole | {parentId: string}) => {
    if(type === 'create') {
      setIsModalOpen(true);
    } else if(type === 'edit') {
      setIsModalOpen(true);
      setAction('edit');
      form.setFieldsValue(data as IRole);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useImperativeHandle(props.mref, () => ({ openModal }));
  return (
    <>
      <Modal
        title="Create Role"
        width={600}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelAlign="right"
          initialValues={{ menuType: 1, menuState: 1 }}
        >
          <Form.Item hidden name="_id">
            <Input />
          </Form.Item>
          {/* Role name */}
          <Form.Item
            label="Role Name "
            name="roleName"
            rules={[{ required: true, message: "Please input the role name!" }]}
          >
            <Input></Input>
          </Form.Item>
          {/* Remarks */}
          <Form.Item label="Remark" name="remark">
            <Input.TextArea placeholder="Please input remark"></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateRole;
