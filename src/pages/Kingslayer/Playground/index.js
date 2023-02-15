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

/* Alright, some thoughts about this. Everyone npc should have a task list with priorities.
Some tasks will be assigned daily, others will be assigned with certain need thresholds and
others will be assign by command chain.
Some tasks will have deadline. When a task is hitting the deadline, the npc will
start prioritizing it. If the task is not completed, the npc will start to get stressed,
depending on its personality somehow.
Daily tasks will be assigned at different times in the day. For example, task "go home" will
have a lot of priority and will be assigned at a specific time, like 6pm.
NPCs will have certain tags that will grant them tasks. An algorithm should balance more or less
how much can a NPC do in a day. But some will be overloaded and some will be underloaded.
When npcs do not complete tasks in time, consequences will happen depending on the task:
  - For tasks like serving the table, if the lord is not served in time, this will have a mood
  impact in the lord and they will be assigned tasks to take action depending on the kind of lord,
  like sending to kill, firing, insulting, etc.
*/

function KingslayerPlayground() {
  const [currentFortress, setCurrentFortress] = React.useState(null);
  const [people, setPeople] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [fortressStates, setFortressStates] = React.useState([]);

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
