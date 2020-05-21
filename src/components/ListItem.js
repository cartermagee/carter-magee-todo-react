import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CheckSquare, Square, X } from 'react-feather';
import { textColor, itemBackground } from '../style-utils/theme';

const Item = styled.div`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${itemBackground} 30%,
    ${({ color }) => color || '#fda085'} 100%
  );
  border-radius: 5px;
  color: ${textColor};
  cursor: grab;
  display: grid;
  grid-template-columns: 1fr 3fr auto;
  height: 90px;
  letter-spacing: 2px;
  text-transform: uppercase;
  width: 100%;
`;

const Checkbox = styled.button`
  background: none;
  border: none;
  color: ${textColor};
  cursor: pointer;
  margin: 0;
  padding: 0;
  width: fit-content;
  outline: none;
  justify-self: center;
`;
const Task = styled.p`
  cursor: text;
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
`;

const OptionsContainer = styled.div`
  align-items: center;
  display: grid;
  height: 90%;
  justify-items: center;
  margin-right: 7px;
  width: 50px;
`;
const OptionsBtn = styled.button`
  background: ${itemBackground};
  border-radius: 5px;
  color: ${textColor};
  padding: 5px;
  width: 100%;
`;
export default function ListItem({ name, complete, color = {}, tags = {} }) {
  return (
    <Item color={color}>
      <Checkbox type="button">
        {complete ? <CheckSquare /> : <Square />}
      </Checkbox>
      <span>
        <Task>{name}</Task>
      </span>
      <OptionsContainer>
        <X cursor="pointer" />
        <OptionsBtn>{color}</OptionsBtn>
        <OptionsBtn>tags</OptionsBtn>
      </OptionsContainer>
    </Item>
  );
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  color: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};
