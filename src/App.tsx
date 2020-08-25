import React from "react";
import styled from "styled-components";
import RangeSelector from "./containers/RangeSelector";

import RightSider from "./containers/RightSider";

const Layout = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  height: 100vh;
  overflow-x: hidden;

  .sider {
    min-width: 80px;
    background: #fff;
  }
  .main {
    width: 100%;
    flex-grow: 1;
    padding: 24px;
    overflow-y: auto;
  }
  .layout-right-sider {
    min-width: 320px;
  }
`;

function App() {
  return (
    <Layout>
      <div className="sider"></div>
      <div className="main">
        <RangeSelector />
      </div>
      <RightSider className="layout-right-sider" />
    </Layout>
  );
}

export default App;
