import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
function Index(props) {
  return (
    <div>
      <Link to="/login">
        <button className="btn-action">Login</button>
      </Link>
    </div>
  );
}

export default Index;
