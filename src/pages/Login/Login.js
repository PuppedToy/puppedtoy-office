import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, Alert, Card } from "antd";
import jwtDecode from "jwt-decode";

import { login } from "../../services/api";
import styles from "./Login.module.css";

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
    try {
      const data = await login(name, password);
      const { token } = data;
      const decodedToken = jwtDecode(token);
      const { name: decodedName, scopes } = decodedToken;
      localStorage.setItem("token", token);
      localStorage.setItem("name", decodedName);
      localStorage.setItem("scopes", scopes);
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
    <div className={styles.container}>
      {error ? (
        <Alert
          className={styles.alert}
          message="Whoops!"
          description={error.message}
          type="error"
          closable
          onClose={onClose}
        />
      ) : null}
      <Card>
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
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
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
      </Card>
    </div>
  );
}
