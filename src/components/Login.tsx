import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, Select } from "antd";
import { useState } from "react";
import { createUser, signin } from "../api";

function Login() {
  const [form] = Form.useForm();
  const [formType, setFormType] = useState(1);

  const handleSubmit = async (values: any) => {
    console.log(values);
    const data = await form.validateFields();
    const { username, email, password } = data;
    if (formType === 1) {
      console.log(username, password);
      signin({ username, password }).then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
      });
    } else if (formType === 2) {
      if (values.password !== values.passwordRepeat) return;
      createUser({
        username,
        email,
        password,
        firstName: "",
        lastName: "",
        roles: [values.roles],
      }).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <div style={{ padding: 100, border: "4px solid #ccc", width: 260 }}>
      <h2>{formType === 1 ? "登录" : "注册"}</h2>
      <Form form={form} onFinish={handleSubmit}>
        {formType === 1 && (
          <>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input
                type="text"
                placeholder="用户名"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                { min: 6, message: "密码长度至少6位!" },
                { max: 20, message: "密码长度不能超过20位!" },
                {
                  validator: async (_, value) =>
                    value && /[a-z]/.test(value)
                      ? Promise.resolve()
                      : Promise.reject(new Error("密码至少包含一个小写字母!")),
                },
              ]}
            >
              <Input
                type="password"
                placeholder="密码"
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </>
        )}
        {formType === 2 && (
          <>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input
                type="text"
                placeholder="用户名"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "请输入邮箱!" }]}
            >
              <Input
                type="email"
                placeholder="邮箱"
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                { min: 6, message: "密码长度至少6位!" },
                { max: 20, message: "密码长度不能超过20位!" },
                {
                  validator: async (_, value) =>
                    value && /[a-z]/.test(value)
                      ? Promise.resolve()
                      : Promise.reject(new Error("密码至少包含一个小写字母!")),
                },
              ]}
            >
              <Input
                type="password"
                placeholder="密码"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="passwordRepeat"
              rules={[
                {
                  validator: async (_, value) =>
                    value
                      ? value === form.getFieldValue("password")
                        ? Promise.resolve()
                        : Promise.reject(new Error("两次输入的密码不一致！"))
                      : Promise.reject(new Error("请再次输入密码!")),
                },
              ]}
            >
              <Input
                type="password"
                placeholder="密码"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="roles"
              rules={[{ required: true, message: "请选择角色!" }]}
            >
              <Select
                placeholder="请选择角色"
                prefix={<UserSwitchOutlined />}
                options={[
                  { label: "普通用户", value: "ROLE_USER" },
                  { label: "管理员", value: "ROLE_USER_MANAGER" },
                ]}
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
            {formType === 1 ? "登录" : "注册"}
          </Button>
        </Form.Item>
        <Flex justify="space-between">
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => setFormType(1)}
          >
            登录
          </span>
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => setFormType(2)}
          >
            注册账号
          </span>
        </Flex>
      </Form>
    </div>
  );
}

export default Login;
