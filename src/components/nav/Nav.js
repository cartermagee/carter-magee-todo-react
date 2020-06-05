import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Slider from './Slider';

const NavContainer = styled.div`
  width: 100%;
`;
const TabsContainer = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;
const Tab = styled(NavLink)`
  background: inherit;
  color: #999;
  font-size: inherit;
  &:hover {
    color: #fff;
  }
  &.active {
    color: #fff;
  }
`;

function Nav() {
  // console.log('nav rendered');
  return (
    <NavContainer>
      <TabsContainer>
        <Tab exact to={{ pathname: '/', state: { index: 0 } }}>
          List
        </Tab>
        <Tab to={{ pathname: '/tags', state: { index: 1 } }}>Tags</Tab>
        <Tab to={{ pathname: '/colors', state: { index: 2 } }}>Colors</Tab>
      </TabsContainer>
      <Slider />
    </NavContainer>
  );
}
export default memo(Nav);
