import React, { useState } from 'react';
import { Button, Form, Input, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import firebase from '../../firebase';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login(props) {
  
  const [loading, setLoading] = useState(false);
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(signedInUser => {
        setLoading(true);
        // console.log(signedInUser);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
    // console.log("Success:", values);
    // props.history.push("/home");
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
    console.log("Failed:", errorInfo);
  };

  function onCancel() {
    props.history.goBack();
  }
  return (
    <div>
      <Modal
        title="Login"
        visible={true}
        // onOk={this.handleOk}
        onCancel={() => {
          onCancel();
        }}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password  prefix={<LockOutlined className="site-form-item-icon"/>}  placeholder="Password" />
          </Form.Item>
          <Form.Item {...tailLayout}>
          <div >
            <Button loading={loading} type="primary" htmlType="submit">
              Login
            </Button>
            <div className="control">Or register now? <a href="/register">Register</a></div>
          </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
