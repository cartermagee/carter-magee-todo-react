import theme from 'styled-theming';

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
  light:
    'https://cdn.wallpaperhub.app/cloudcache/4/f/1/d/a/5/4f1da567bcf6abaf85015c813bff2d25904c244e.jpg',
  dark:
    'https://cdn.wallpaperhub.app/cloudcache/0/8/6/e/e/d/086eed9097d7bfd99edb252913fadccddbef63c2.jpg',
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
