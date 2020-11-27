import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, Switch as BtSwitch } from "antd";
import { Button, Form, Input, Row, Col, InputNumber } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import Predict from "./Predict";
import Data from "./Data";
import StatisticalData from "./StatisticalData";

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

function Slider(props) {
  const [theme, setThem] = useState("dark");
  const [current, setCurrent] = useState("data");

  function changeTheme(value) {
    console.log(value);
    var isTheme = value ? "dark" : "light";
    setThem(isTheme);
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
        <button className="btn-action" className="btn-action">
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
            <SubMenu key="sub1" icon={<MailOutlined />} title="Profile">
              <Menu.Item key="1">Caitlyn</Menu.Item>
              <Menu.Item key="2">Jinx</Menu.Item>
              <Menu.Item key="3">Misfortune</Menu.Item>
              <Menu.Item key="4">Ashe</Menu.Item>
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
