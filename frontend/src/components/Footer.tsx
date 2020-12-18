import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
  font-family: 'Open Sans', 'sans-serif';
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 0.8em;
  padding: 1em 0;
`;

const Footer: React.FC = () => (
  <FooterStyle>
    <p>
      <a href="https://github.com/kmurf1999/HoldemSolverReact">Holdem Solver</a> is a free, open source project
    </p>
  </FooterStyle>
);

export default Footer;
