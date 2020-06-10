import styled from 'styled-components';

export const ListHeader = styled.header`
  background: rgb(52, 58, 64);
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  color: #fff;
  display: grid;
  grid-template-rows: 90px 30px 90px;
  height: fit-content;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const ListTitle = styled.h1`
  align-items: center;
  display: flex;
  justify-content: center;
  justify-self: center;
  position: relative;
  left: 21px;
`;
