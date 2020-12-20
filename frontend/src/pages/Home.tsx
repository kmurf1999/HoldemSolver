import React from 'react';
import styled from 'styled-components';
import RangeSelector from '../containers/RangeSelector';

import BoardSelector from '../components/BoardSelector';
import RangeTable from '../components/RangeTable';
import RangeFilter from '../components/RangeFilter';
import Footer from '../components/Footer';

const Layout = styled.div`
  width: 100%;
  .main {
    min-height: 100vh;
    width: 100%;
    flex-grow: 1;
    padding: 1em;
    overflow-y: auto;

    display: grid;
    grid-gap: 2vmin;
    grid-template-columns: minmax(auto, 400px) minmax(300px, 600px) minmax(auto, 400px);
    grid-template-rows: 12em repeat(2, fit-content(0));
    grid-template-areas: 'range-table range-selector range-filter' 'board-selector range-selector .';
    .range-selector {
      grid-area: range-selector;
    }
    .range-table {
      grid-area: range-table;
    }
    .range-filter {
      grid-area: range-filter;
    }
    .board-selector {
      grid-area: board-selector;
    }
  }
  .footer {
  }
`;

const Home: React.FC = () => (
  <Layout>
    <div className="main">
      <BoardSelector className="board-selector" />
      <RangeTable className="range-table" />
      <RangeSelector className="range-selector" />
      <RangeFilter className="range-filter" />
    </div>
    <div className="footer">
      <Footer />
    </div>
  </Layout>
);

export default Home;
