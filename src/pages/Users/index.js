import React from "react";
import { Card, Input, Button } from "antd";
import ResourceManager from "../../components/ResourceManager";
import { register } from "../../services/api";

function Users() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNewUser = async () => {
    setName("");
    setPassword("");
    await register(name, password);
    window.location.reload();
  };

  return (
    <>
      <Card>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleNewUser}>Create User</Button>
      </Card>
      <ResourceManager resourceName="users" />
    </>
  );
}

export default Users;
