import React from "react";
import { Tabs, Table, Card, Space, Button } from "antd";
import ResourceSelect from "../../../components/ResourceSelect";

const roomViewColumns = [
  {
    title: "Room",
    dataIndex: "room",
    key: "room",
  },
  {
    title: "People in the room",
    dataIndex: "crew",
    key: "crew",
  },
];

const crewViewColumns = [
  {
    title: "Crew member",
    dataIndex: "crew",
    key: "crew",
  },
  {
    title: "Room",
    dataIndex: "room",
    key: "room",
  },
];

function KingslayerPlayground() {
  const [currentFortress, setCurrentFortress] = React.useState(null);
  const [people, setPeople] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);

  return (
    <Card>
      <div>
        <Space>
          <ResourceSelect resource="fortresses" onChange={setCurrentFortress} />
          <Button>Load</Button>
        </Space>
      </div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Room view" key="1">
          <Table columns={roomViewColumns} dataSource={rooms} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Crew view" key="2">
          <Table columns={crewViewColumns} dataSource={people} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}

export default KingslayerPlayground;
