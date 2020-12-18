import React from "react";
import styled from "styled-components";
import RangeSelector from "./containers/RangeSelector";

import RightSider from "./containers/RightSider";
import BoardSelector from "./components/BoardSelector";
import RangeList from "./components/RangeList";
import RangeFilter from "./components/RangeFilter";

const Layout = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  height: 100vh;
  overflow-x: hidden;

  /* .sider {
    min-width: 80px;
    background: #fff;
  } */
  .main {
    width: 100%;
    flex-grow: 1;
    padding: 1em;
    overflow-y: auto;

    display: grid;
    grid-gap: 2vmin;
    grid-template-columns: minmax(auto, 400px) minmax(300px, 600px) minmax(auto, 400px);
    grid-template-rows: 12em repeat(2, fit-content(0));
    grid-template-areas: 'range-list range-selector range-filter' 'board-selector range-selector .';
  }
  .range-selector {
    grid-area: range-selector;
  }
  .range-list {
    grid-area: range-list;
  }
  .range-filter {
    grid-area: range-filter;
  }
  .board-selector {
    grid-area: board-selector;
  }
  /* .layout-right-sider {
    min-width: 320px;
  } */
`;

function App() {
  return (
    <Layout>
      {/* <div className="sider"></div> */}
      <div className="main">
        <BoardSelector className="board-selector"/>
        <RangeList className="range-list"/>
        <RangeSelector className="range-selector" />
        <RangeFilter className="range-filter"/>
      </div>
      {/* <RightSider className="layout-right-sider" /> */}
    </Layout>
  );
}

export default App;