import styled from 'styled-components';
import {
  inputBackground,
  inputBackgroundFocus,
  textColor,
} from '../style-utils/theme';

export const Form = styled.form.attrs({
  autoComplete: 'off',
})`
  background: ${inputBackground};
  bottom: 0;
  display: grid;
  grid-column: 1 /-1;
  grid-template-columns: 5fr 1fr;
  height: 90px;
  letter-spacing: 2px;
  position: sticky;
  overflow: hidden;
  & > * {
    background: inherit;
    border: none;
    color: ${textColor};
    font-size: 1.2rem;
    font-weight: 500;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    text-align: left;
  }
`;

export const Input = styled.input.attrs({
  type: 'text',
})`
  padding: 0 3rem;
  width: 100%;
  &:focus {
    background: ${inputBackgroundFocus};
  }
`;
