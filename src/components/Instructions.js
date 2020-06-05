import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ArrowDown } from 'react-feather';

const InstructionsContainer = styled.span`
  display: grid;
  justify-items: center;
  justify-self: center;
`;

export default function Instructions({ text, add }) {
  return (
    <InstructionsContainer>
      {text}
      {add && <ArrowDown />}
    </InstructionsContainer>
  );
}

Instructions.propTypes = {
  text: PropTypes.string.isRequired,
  add: PropTypes.bool,
};
