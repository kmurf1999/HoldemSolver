import React from 'react';
import styled from 'styled-components';
import RangeSelector from '../containers/RangeSelector';

import BoardSelector from '../components/BoardSelector';
import RangeTable from '../components/RangeTable';
import RangeFilter from '../components/RangeFilter';

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
    grid-template-areas: 'range-table' 'range-selector' 'range-filter' 'board-selector';
    
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
  @media only screen and (min-width: 500px) {
    .main {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: 'range-table board-selector' 'range-selector range-selector' 'range-filter range-filter';
      grid-template-rows: auto repeat(3, fit-content(0));
    }
  }
  @media only screen and (min-width: 800px) {
    .main {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: 'range-table range-selector range-selector' 'board-selector range-selector range-selector' '. range-filter range-filter';
      grid-template-rows: 12em repeat(3, fit-content(0));
    }
  }
  @media only screen and (min-width: 1260px) {
    .main {
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas: 'range-table range-selector range-selector range-filter' 'board-selector range-selector range-selector range-filter';
      grid-template-rows: repeat(2, fit-content(0));
    }
  }
  .footer {
  }
`;

function Home(): React.ReactElement {
    return (
      <Layout>
        <div className="main">
          <BoardSelector className="board-selector" />
          <RangeTable className="range-table" />
          <RangeSelector className="range-selector" />
          <RangeFilter className="range-filter" />
        </div>
      </Layout>
    );
}

export default Home;
