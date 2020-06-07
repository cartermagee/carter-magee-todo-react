import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Wheel } from './color-wheel.svg';
import { filterInvert } from '../style-utils/theme';

const Icon = styled.div`
  align-items: center;
  display: grid;
  justify-items: center;
  height: 110%;
  position: absolute;
  width: 110%;
`;
const Eroteme = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  z-index: 2;
`;
const Background = styled(Wheel)`
  filter: ${filterInvert};
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 110%;
`;

export default function ColorWheel() {
  return (
    <Icon>
      <Eroteme>?</Eroteme>
      <Background />
    </Icon>
  );
}
