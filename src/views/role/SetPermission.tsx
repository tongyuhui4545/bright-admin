import { Modal, Form, Tree, message } from "antd";
import { useState, RefObject, useImperativeHandle } from "react";
import { IRole, IMenu } from "../../types/api";
import api from "../../api";

interface IProps {
  mref: RefObject<{
    openModal: (type: string, data?: IRole | { parentId: string }) => void;
  } | null>;
  update: () => void;
}

const CreateRole = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<string>("create");

  const [checkedKeys, setCheckedKeys] = useState<string>([]);
  const [menuList, setMenuList] = useState<IMenu[]>([]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    if (action === "create") {
      await api.createRole(form.getFieldsValue());
      message.success("Role created successfully!");
    } else if (action === "edit") {
      await api.updateRole(form.getFieldsValue());
      message.success("Role updated successfully!");
    }
    handleCancel();
    //refresh the department list
    props.update();
  };
  const openModal = (type: string, data?: IRole | { parentId: string }) => {
    if (type === "create") {
      setIsModalOpen(true);
    } else if (type === "edit") {
      setIsModalOpen(true);
      setAction("edit");
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
        <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
          {/* Role name */}
          <Form.Item label="Role Name " name="roleName"></Form.Item>
          <Form.Item label="Permission" name="permission">
            <Tree
              checkable
              defaultExpandAll
              defaultCheckedKeys={checkedKeys}
              onCheck={onCheck}
              treeData={treeData}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateRole;
