import theme from 'styled-theming';
import BlissLight from '../images/bliss-light.jpg';
import BlissDark from '../images/bliss-dark.jpg';

export const backgroundColor = theme('mode', {
  light: '#fff',
  dark: '#212121',
});

export const textColor = theme('mode', {
  light: '#212121',
  dark: '#fff',
});

export const itemBackground = theme('mode', {
  light: '#fff',
  // light: '#eee',
  dark: '#333333',
});
export const itemBackgroundHover = theme('mode', {
  light: '#F1F3F5',
  dark: 'rgb(52, 58, 64)',
});

export const inputBackground = theme('mode', {
  light: '#fff',
  dark: 'rgb(52, 58, 64)',
});

export const inputBackgroundFocus = theme('mode', {
  light: '#eee',
  dark: 'rgb(52, 58, 64)',
});

export const inputShadow = theme('mode', {
  light: 'rgba(33, 37, 41, 0.12)',
  dark: '#424243',
});

export const submitButtonColor = theme('mode', {
  light: '#2E64EA',
  dark: 'rebeccapurple',
});

export const backgroundImage = theme('mode', {
  light: BlissLight,
  dark: BlissDark,
});

export const dropShadow = theme('mode', {
  light: 'none',
  dark: 'drop-shadow(0px 0px 4px rgba(102,51,153, 0.3))',
});

export const tagBackground = theme('mode', {
  light: '#147efb',
  dark: 'rebeccapurple',
});

export const filterInvert = theme('mode', {
  light: 'none',
  dark: 'invert(1)',
});

/* TODO style inputs and lock down color scheme
react dark background #282c34
twitch dark background main #18181A
twitch sidebar dark for list items? #202023
dark input #424243
dark submit button #2D2D30
material dark white for list items #F5F5F5
material white #fff
material dark background #212121
material dark foreground #333333
material button #626980

emotion dark rgb(52, 58, 64)
 */
// background: `url(${backgroundMain}) center / cover no-repeat fixed`,
