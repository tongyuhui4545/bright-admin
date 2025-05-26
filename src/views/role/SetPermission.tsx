/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Form, Tree, message, TreeProps, TreeDataNode, DataNode } from "antd";
import { useState, RefObject, useImperativeHandle, useEffect } from "react";
import { IRole, IMenu, IPermission } from "../../types/api";
import api from "../../api";

interface IProps {
  mref: RefObject<{
    openModal: (type: string, data?: IRole) => void;
  } | null>;
  update: () => void;
}

const CreateRole = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roleInfo, setRoleInfo] = useState<IRole>();

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [permission, setPermission] = useState<IPermission>();
  const [menuList, setMenuList] = useState<IMenu[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    getMenuList();
  }, []);

  const getMenuList = async () => {
    const data = await api.getMenuList();
    console.log('mmmmm', data);
    setMenuList(data);
  };

  const handleOk = async () => {
    if(permission) {
      await api.updatePermission(permission);
      message.success('Update successfully');
    }
  };
  const openModal = (type: string, data?: IRole) => {
    setRoleInfo(data);
    if(type === 'setPermission') {
      setCheckedKeys(data?.permissionList.checkedKeys || [])
      setIsModalOpen(true);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys: any, info: any) => {
    console.log("onCheck", checkedKeys, info);
      const checkedKeysTemp: string[] = [];
      const halfCheckedKeysTemp: string[] = [];
    info.checkedNodes.map((node: DataNode ) => {
      if(node.menuType === 2) {
        checkedKeysTemp.push(node._id);
      } else {
        halfCheckedKeysTemp.push(node.parentId);
      }
    })
    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys: checkedKeysTemp,
        halfCheckedKeys: halfCheckedKeysTemp.concat(...info.halfCheckedKeys)
      }
    })
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
          <Form.Item label="Role Name "></Form.Item>
          <Form.Item label="Permission">
            <Tree
              checkable
              defaultExpandAll
              defaultCheckedKeys={checkedKeys}
              onCheck={onCheck}
              fieldNames={{
                title: "menuName",
                key: "_id",
                children: "children",
              }}
              treeData={menuList as unknown as TreeDataNode[]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateRole;
