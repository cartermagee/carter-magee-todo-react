import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { textColor, backgroundImage } from './theme';
import { media } from './media';

const Wrapper = styled.main`
  align-items: center;
  background: url(${backgroundImage}) center / cover no-repeat fixed;
  background-color: #222;
  color: ${textColor};
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: 0;
  padding: 0;
  transition: all 0.4s linear;
  width: 100%;
  ${media.desktop`
    align-items: flex-start;
   `}
`;

const ThemeToggleContext = React.createContext();
// exports functionality to toggle
export const useTheme = () => React.useContext(ThemeToggleContext);

export const MyThemeProvider = ({ children }) => {
  // check to see if dark mode is available/ enabled
  const [themeState, setThemeState] = useState({
    mode:
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
  });
  // watch for browser changes
  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const mode = e.matches ? 'dark' : 'light';
        setThemeState({ mode });
      });
  });

  const toggle = () => {
    const mode = themeState.mode === 'light' ? `dark` : `light`;
    setThemeState({ mode });
  };
  return (
    <ThemeToggleContext.Provider value={{ toggle }}>
      <ThemeProvider
        theme={{
          mode: themeState.mode,
        }}
      >
        <Wrapper>{children}</Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

MyThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;