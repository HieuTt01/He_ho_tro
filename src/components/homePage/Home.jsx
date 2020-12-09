import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, Switch as BtSwitch } from "antd";
import { Button, Form, Input, Row, Col, InputNumber } from "antd";
import {
  MailOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Layout } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import Predict from "./Predict";
import Data from "./Data";
import StatisticalData from "./StatisticalData";
import userEvent from "@testing-library/user-event";
import firebase from '../../firebase';

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

function Slider(props) {
  const [theme, setThem] = useState("dark");
  const [current, setCurrent] = useState("data");
  function changeTheme(value) {
    var isTheme = value ? "dark" : "light";
    setThem(isTheme);
  }

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.clearUser();
        // console.log("signout")
      })
  }

  function handleClick(e) {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "data") {
      props.history.push("/home/data");
    }
    if (e.key === "predict") {
      props.history.push("/home/predict");
    }
    if (e.key === "statistical") {
      props.history.push("/home/statistical-data");
    }
  }
  return (
    <>
      <Row className="nav">
        <BtSwitch
          checked={theme === "dark"}
          onChange={(event) => changeTheme(event)}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <button onClick={handleLogout} className="btn-action" className="btn-action">
          Logout
        </button>
        {/* <br />
        <br /> */}
      </Row>

      <Row gutter={[24, 8]}>
        <Col xs={6} sm={6} md={6}>
          <Menu
            theme={theme}
            onClick={(event) => handleClick(event)}
            style={{ width: 256 }}
            // defaultOpenKeys={["sub2"]}
            // selectedKeys={[current]}
            mode="inline"
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
              <Menu.Item key="1">
              <Avatar size={18}
            style={{
              backgroundColor: '#f56a00',
            }}
          >
            A
          </Avatar>
                 {props.user && props.user.displayName}</Menu.Item>
              <Menu.Item key="2">Change Info</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Data">
              <Menu.Item key="data">Data</Menu.Item>
              <Menu.Item key="predict">Predict</Menu.Item>
              <Menu.Item key="statistical">Statistical Data</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<SettingOutlined />} title="Setting">
              <Menu.Item key="9">Thresh </Menu.Item>
              <Menu.Item key="10">Blit </Menu.Item>
              <Menu.Item key="11">Nautilus </Menu.Item>
              <Menu.Item key="12">Alistar</Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col xs={18} sm={18} md={18}>
          <Switch>
            <Route exact path="/home/data">
              <Data />
            </Route>
            <Route exact path="/home/predict">
              <Predict />
            </Route>
            <Route exact path="/home/statistical-data">
              <StatisticalData />
            </Route>
          </Switch>
        </Col>
      </Row>
    </>
  );
}
export default Slider;
