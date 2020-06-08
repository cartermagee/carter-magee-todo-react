import { createGlobalStyle } from 'styled-components';

// import UbuntuBold from './Ubuntu/Ubuntu-Bold.ttf';
// import UbuntuItalic from './Ubuntu/Ubuntu-Italic.ttf';
import UbuntuRegular from './Ubuntu/Ubuntu-Regular.ttf';
// import UbuntuLight from './Ubuntu/Ubuntu-Light.ttf';
// import UbuntuMedium from './Ubuntu/Ubuntu-Medium.ttf';
// import UbuntuMediumItalic from './Ubuntu/Ubuntu-Mediumitalic.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Ubuntu Regular';
        src: local('Ubuntu Regular'), local('UbuntuRegular'),
        url(${UbuntuRegular}) format('tff');
        font-weight: 300;
        font-style: normal;
    }
`;
