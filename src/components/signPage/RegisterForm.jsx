import React from 'react';
import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import firebase from '../../firebase';
import { UserOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function login(props) {
  // const [errors, setErrors] = useState('');

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = (values) => {
    if (isPasswordValid(values.password, values.repassword)) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(createdUser => {
          console.log(createdUser);
          props.history.push("/login");
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      console.log("Password is invalid!")
    }
  };
  const isPasswordValid = (password, repassword) => {
    if (password.length < 6 || repassword.length < 6) {
      // setErrors("Password should be at least 6 characters!");
      return false;
    } else if (password !== repassword) {
      // setErrors("Password is invalid!");
      return false;
    } else {
      return true;
    }
  }


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onCancel() {
    props.history.goBack();
  }
  return (
    <div>
      <Modal
        title="Register"
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
            rules={[{
              type: 'email',
              message: 'The input is not valid E-mail!',
            }, { required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }
              , { min: 6, message: "Password should be at least 6 characters!" }]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="repassword"
            rules={[{ required: true, message: "Please re-input your password!" }
              , { min: 6, message: "Password should be at least 6 characters!" }]}
          >
            <Input.Password prefix={<CheckCircleOutlined className="site-form-item-icon" />} placeholder="Password Confirmation" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <div>
              <Button type="primary" htmlType="submit">
                Submit
            </Button>
              <div className="control">Back to login? <a href="/login">Login</a></div>
            </div>

          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
