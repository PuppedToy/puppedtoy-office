import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, Alert } from "antd";

import { login } from "../services/api";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    const { name, password } = values;
    setIsLoading(true);
    let token;
    try {
      const data = await login(name, password);
      token = data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err);
    }
    setIsLoading(false);
  };

  const onClose = () => {
    setError(null);
  };

  return (
    <>
      {error ? (
        <Alert
          message="Whoops!"
          description={error.message}
          type="error"
          closable
          onClose={onClose}
        />
      ) : null}
      {isLoading ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
