import React, { useState, memo } from 'react';
import { Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

import { GetTab } from '../../helpers/getTab';

const RouteWrapper = styled(animated.section)`
  grid-column: 1/-1;
  grid-row: 2;
  height: 100%;
  max-height: 100%;
  min-height: 30vh;
  overflow-y: scroll;
  user-select: none;
  width: 100%;
`;

function RouteTransitions({ children }) {
  const { currentTab, location } = GetTab();

  const [previousTab, setPreviousTab] = useState(0);

  const transitions = useTransition(location, ({ pathname }) => pathname, {
    unique: true,
    from: () => ({
      transform: `translate3d(${(currentTab - previousTab) * 100}%, 0, 0)`,
    }),
    enter: {
      transform: 'translate3d(0%, 0, 0)',
    },
    leave: () => ({
      transform: `translate3d(${(previousTab - currentTab) * 100}%, 0,0)`,
    }),
  });

  if (currentTab !== previousTab) setPreviousTab(currentTab);

  return transitions.map(({ item, key, props: transition }) => (
    <RouteWrapper key={key} style={transition}>
      <Switch location={item}>{children}</Switch>
    </RouteWrapper>
  ));
}

export default memo(
  RouteTransitions,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
