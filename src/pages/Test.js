import React from "react";
import { useParams } from "react-router-dom";
import ResourceManager from "../components/ResourceManager";

function Home() {
  // Get the path param :userId from URL
  const { userId } = useParams();

  return (
    <div>
      <h1>This is your param: {userId}</h1>
      <ResourceManager resourceName="test" />
    </div>
  );
}

export default Home;
