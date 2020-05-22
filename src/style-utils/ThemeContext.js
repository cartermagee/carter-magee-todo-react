import React, { useState, useEffect, createContext, useContext } from 'react';
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

const ThemeToggleContext = createContext();
// exports functionality to DarkModeToggle
export const useTheme = () => useContext(ThemeToggleContext);

export const MyThemeProvider = ({ children }) => {
  // sets dark mode if user's browser/system is set to dark
  const [themeState, setThemeState] = useState({
    mode:
      (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light') || 'light',
  });

  // watches for system changes
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
