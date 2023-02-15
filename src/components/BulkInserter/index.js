/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spin, Card, Button, List, Input, Form } from "antd";

import { getResource, createResource } from "../../services/api";

const { TextArea } = Input;

function BulkInserter({ resourceName, listKeys }) {
  const [fields, setFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchFields = async () => {
    setIsLoading(true);
    const result = await getResource(resourceName);
    if (result.length) {
      const {
        _id,
        appVersion,
        version,
        isResource,
        createdAt,
        updatedAt,
        ...newFields
      } = result[0];
      setFields(newFields);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceName]);

  const fieldsKeys = Object.keys(fields);

  const data = fieldsKeys.map((key) => {
    return {
      title: key,
      content: (
        <Form.Item name={key} rules={[{ required: true }]}>
          {listKeys.includes(key) ? (
            <TextArea rows={6} />
          ) : (
            <Input type={typeof fields[key]} />
          )}
        </Form.Item>
      ),
    };
  });

  const onClickAddButton = async (bulkInsertData) => {
    const newValues = [];
    const baseObject = {};
    fieldsKeys.forEach((key) => {
      baseObject[key] = listKeys.includes(key) ? null : bulkInsertData[key];
    });
    listKeys.forEach((key) => {
      const values = bulkInsertData[key].split("\n");
      values.forEach((value, index) => {
        if (!newValues[index]) {
          newValues[index] = { ...baseObject };
        }
        newValues[index][key] = value;
      });
    });
    await Promise.all(
      newValues.map((value) => createResource(resourceName, value))
    );
  };

  return (
    <Card title={`Bulk Inserter - ${resourceName}`}>
      {isLoading ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onClickAddButton}
          autoComplete="off"
        >
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title}>{item.content}</Card>
              </List.Item>
            )}
          />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Bulk Insert
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
}

BulkInserter.propTypes = {
  resourceName: PropTypes.string.isRequired,
  listKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BulkInserter;
