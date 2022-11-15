import React, { useState } from "react";

import { Form, Input, Button, Card, List } from "antd";

const MAX_USERS = 4;

function KingslayerNewGame() {
  const [userInputValue, setUserInputValue] = useState("");
  const [userList, setUserList] = useState([]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onClickAddUser = () => {
    if (userList.length < MAX_USERS) {
      setUserList([...userList, userInputValue]);
      setUserInputValue("");
    }
  };

  return (
    <div>
      <h1>New Game</h1>
      <Card>
        <Input
          value={userInputValue}
          onChange={(e) => setUserInputValue(e.target.value)}
        />
        <Button type="primary" onClick={onClickAddUser}>
          Add User
        </Button>
        <List
          dataSource={userList}
          bordered
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
      <Form
        name="new-game-config"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default KingslayerNewGame;
