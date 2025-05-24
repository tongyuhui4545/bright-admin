import {
  Modal,
  Form,
  Radio,
  Input,
  TreeSelect,
  InputNumber,
  message,
} from "antd";
import { useState, RefObject, useImperativeHandle } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import api from "../../api";
import { IMenu } from "../../types/api";

interface IProps {
  mref: RefObject<{
    openModal: (type: string, data?: IMenu | { parentId: string }) => void;
  } | null>;
  update: () => void;
}

const CreateMenu = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [action, setAction] = useState<string>("create");
  //get menu list
  const getMenuData = async () => {
    const data = await api.getMenuList();
    setMenuList(data);
  };

  const [form] = Form.useForm();

  const openModal = (type: string, data?: IMenu | { parentId: string }) => {
    setAction(type);
    getMenuData();
    setIsModalOpen(true);
    if (data) {
      form.setFieldsValue(data);
    }
  };
  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    if (action === "create") {
      await api.createMenu(form.getFieldsValue());
      message.success("Menu created successfully!");
    } else if (action === "edit") {
      await api.updateMenu(form.getFieldsValue());
      message.success("Menu updated successfully!");
    }
    handleCancel();
    //refresh the department list
    props.update();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useImperativeHandle(props.mref, () => ({ openModal }));
  return (
    <>
      <Modal
        title="Create Menu"
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
          <Form.Item label="Superior Menu " name="superiorMenu">
            <TreeSelect
              placeholder="Please select a superior menu"
              allowClear
              treeDefaultExpandAll
              treeData={menuList}
              fieldNames={{ label: "menuName", value: "_id" }}
            ></TreeSelect>
          </Form.Item>
          <Form.Item label="Menu Type " name="menuType">
            <Radio.Group>
              <Radio value={1}>Menu</Radio>
              <Radio value={2}>Button</Radio>
              <Radio value={3}>Page</Radio>
            </Radio.Group>
          </Form.Item>
          {/* Menu name */}
          <Form.Item
            label="Menu Name "
            name="menuName"
            rules={[{ required: true, message: "Please input the menu name!" }]}
          >
            <Input></Input>
          </Form.Item>
          {/* menu content */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              return form.getFieldValue("menuType") === 2 ? (
                <Form.Item label="Menu code" name="menuCode">
                  <Input placeholder="Please input menu code" />
                </Form.Item>
              ) : (
                <>
                  <Form.Item label="menu icon" name="icon">
                    <Input placeholder="Please input menu icon" />
                  </Form.Item>
                  <Form.Item label="Route path" name="path">
                    <Input placeholder="Please input route path" />
                  </Form.Item>
                </>
              );
            }}
          </Form.Item>
          {/* component name */}
          <Form.Item label="Component name" name="component">
            <Input placeholder="Please input component name" />
          </Form.Item>
          {/* order */}
          <Form.Item
            label="Order"
            name="orderBy"
            tooltip={{
              title: "Larger number has a larger order",
              icon: <InfoCircleOutlined rev={undefined} />,
            }}
          >
            <InputNumber placeholder="Please input the order number" />
          </Form.Item>
          <Form.Item label="Menu state" name="menuState">
            <Radio.Group>
              <Radio value={1}>Active</Radio>
              <Radio value={2}>Disable</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateMenu;
