import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { GetTab } from '../../helpers/getTab';

const SliderContainer = styled(animated.div)`
  margin-top: 3px;
  position: relative;
  width: calc(100% / 3);
`;

const Indicator = styled.div`
  background: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 5px;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export default function Slider() {
  const { currentTab } = GetTab();

  const slide = useSpring({
    transform: `translate3d(${currentTab * 100}%, 0, 0)`,
  });

  return (
    <SliderContainer style={slide}>
      <Indicator />
    </SliderContainer>
  );
}
