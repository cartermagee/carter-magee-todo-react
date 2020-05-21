import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CheckSquare, Square, X } from 'react-feather';

const Item = styled.div`
  align-items: center;
  background: linear-gradient(
    135deg,
    #222 30%,
    ${({ color }) => color || '#fda085'} 100%
  );
  border-radius: 5px;
  color: #fff;
  display: grid;
  font-size: 1.5rem;
  grid-template-columns: 1fr 3fr auto;
  height: 90px;
  letter-spacing: 2px;
  line-height: 90px;
  text-transform: uppercase;
  width: 100%;
`;

const Checkbox = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin: 0;
  padding: 0;
  outline: none;
`;
const Task = styled.p`
  width: 100%;
  cursor: text;
`;

const OptionsContainer = styled.div`
  align-items: center;
  display: grid;
  height: 90%;
  justify-items: center;
  width: 50px;
`;
const OptionsBtn = styled.button`
  border-radius: 5px;
  width: 100%;
`;
export default function ListItem({ name, complete, color, tags }) {
  console.log({ name, tags, complete, color });
  return (
    <Item color={color}>
      <Checkbox type="button">
        {complete ? <CheckSquare /> : <Square />}
      </Checkbox>
      <Task>{name}</Task>
      <OptionsContainer>
        <X />
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
