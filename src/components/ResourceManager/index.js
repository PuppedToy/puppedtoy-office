/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spin, Table, Card, Button, Popconfirm } from "antd";
import { JsonEditor } from "jsoneditor-react";
import Ajv from "ajv";

import "jsoneditor-react/es/editor.min.css";

import {
  getResource,
  createResource,
  updateResource,
  deleteResource,
} from "../../services/api";
import { EditableRow, EditableCell } from "../EditableContext";

const ajv = new Ajv({ allErrors: true, verbose: true });

function ResourceManager({ resourceName }) {
  const [resourceList, setResourceList] = useState([]);
  const [currentJson, setCurrentJson] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchResourceList = async () => {
    setResourceList([]);
    setIsLoading(true);
    const newResourceList = await getResource(resourceName);
    setResourceList(newResourceList);
    if (newResourceList.length) {
      const {
        _id,
        appVersion,
        version,
        isResource,
        createdAt,
        updatedAt,
        ...newCurrentJson
      } = newResourceList[0];
      setCurrentJson(newCurrentJson);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResourceList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceName]);

  const sample = resourceList.length ? resourceList[0] : {};
  const sampleKeys = sample
    ? Object.keys(sample).filter(
        (key) => !["isResource", "appVersion"].includes(key)
      )
    : [];

  const onClickAddButton = async () => {
    setIsLoading(true);
    await createResource(resourceName, currentJson);
    await fetchResourceList();
  };

  const onJSONChange = (json) => {
    setCurrentJson(json);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleDelete = async (id) => {
    await deleteResource(resourceName, id);
    await fetchResourceList();
  };

  const handleSave = async (newValues, row) => {
    const [key] = Object.keys(newValues);
    if (
      [
        "_id",
        "createdAt",
        "updatedAt",
        "appVersion",
        "isResource",
        "operation",
      ].includes(key)
    ) {
      return;
    }
    await updateResource(resourceName, row._id, newValues);
    await fetchResourceList();
  };

  const columns = sampleKeys
    ? [
        ...sampleKeys.map((item) => ({
          title: item,
          dataIndex: item,
          onCell: (record) => ({
            record,
            editable: true,
            dataIndex: item,
            title: item,
            handleSave,
          }),
        })),
        {
          title: "operation",
          dataIndex: "operation",
          render: (_, record) =>
            resourceList.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record._id)}
              >
                <a href="#">Delete</a>
              </Popconfirm>
            ) : null,
        },
      ]
    : [];

  return (
    <Card title={resourceName}>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <JsonEditor value={currentJson} onChange={onJSONChange} ajv={ajv} />
          <Button type="primary" onClick={onClickAddButton}>
            Add
          </Button>
          <Table
            components={components}
            dataSource={resourceList}
            columns={columns}
            handleSave={handleSave}
          />
        </>
      )}
    </Card>
  );
}

ResourceManager.propTypes = {
  resourceName: PropTypes.string.isRequired,
};

export default ResourceManager;
