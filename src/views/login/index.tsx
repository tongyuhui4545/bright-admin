import { Form, Input, Button } from "antd";
import style from "./index.module.less";
import api from "../../api";
import { ILoginParams } from "../../types/api";
import storage from "../../utils/storage";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const Login = () => {
  const onFinish = async (values: ILoginParams) => {
    const data = await api.login(values);
    const dataToString = JSON.stringify(data);
    window.location.href = "/";
    storage.set("token", dataToString);
  };
  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.title}>Login System</div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
