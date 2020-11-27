import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col, Table, Space } from "antd";
import Column from "antd/lib/table/Column";
// import EmployeeDialog from "../components/EmployeeDialog";

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

function DataPage(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, item) => (
        <Space size="middle">
          <a onClick={() => onEdit(item.id)}>Edit</a>
          <a onClick={() => onDelete(item.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  function start() {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  }

  function onSelectChange(selectedRowKeys) {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (event) => onSelectChange(event),
  };
  // console.log(selectedRowKeys.length);
  const hasSelected = selectedRowKeys.length > 0;
  function closeDialog() {
    setIsOpenDialog(false);
  }

  function onDelete(id) {
    console.log(id);
  }
  function onEdit(a) {
    console.log(a.target);
  }

  return (
    <div>
      {/* {isOpenDialog && <EmployeeDialog closeDialog={closeDialog} />} */}
      <Row>
        <Col span={24}>
          <Button type="primary" onClick={() => setIsOpenDialog(true)}>
            Add
          </Button>
          <h2>Data page</h2>
        </Col>
      </Row>
      <Row>
        <Col span={22}>Table</Col>
        <Col span={22}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          ></Table>
        </Col>
      </Row>
    </div>
  );
}

export default DataPage;
