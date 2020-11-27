import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
function Index(props) {
  return (
    <div>
      <Link to="/login">
        <Button type="primary">Login</Button>
      </Link>
    </div>
  );
}

export default Index;
