/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

import { getResource } from "../../services/api";
import styles from "./ResourceSelect.module.css";

function ResourceSelect({ resource, handleChange, nameField }) {
  const [resourceItems, setResourceItems] = React.useState([]);

  useEffect(() => {
    const fetchResource = async () => {
      const newResourceItems = await getResource(resource);
      setResourceItems(newResourceItems);
    };
    fetchResource();
  });

  return (
    <Select
      className={styles.resourceSelect}
      onChange={handleChange}
      options={resourceItems.map((item) => ({
        value: item._id,
        label: item[nameField],
      }))}
      style={{ minWith: "200px" }}
    />
  );
}

ResourceSelect.defaultProps = {
  nameField: "name",
};

ResourceSelect.propTypes = {
  resource: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  nameField: PropTypes.string,
};

export default ResourceSelect;
