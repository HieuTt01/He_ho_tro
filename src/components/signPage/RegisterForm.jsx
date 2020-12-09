import React, { useState } from 'react';
import { Button, Form, Input, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import firebase from '../../firebase';
import { UserOutlined, LockOutlined, CheckCircleOutlined, MailOutlined } from '@ant-design/icons';


export default function Register(props) {
  // const [isloadUser , setIsloaduser] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = (values) => {
    console.log(values);
    if (isPasswordValid(values.password, values.repassword)) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(createdUser => {
          createdUser.user.updateProfile({
            displayName: values.username
          })
            .then(() => {
              setLoading(false);
              saveUser(createdUser).then(() => {
                console.log("user saved")
              })
            })
          message.success('Account created successfully!');
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        })
    } else {
      console.log("Password is invalid!")
    }
  };
  const saveUser = createdUser => {
    return firebase.database().ref('users').child(createdUser.user.uid).set({
      name: createdUser.user.displayName
    });
  }

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
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
              <Button loading={loading} type="primary" htmlType="submit">
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
