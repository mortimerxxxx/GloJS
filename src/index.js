'use strict';
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

countTimer("20 november 2020");

toggleMenu();

togglePopUp();

tabs();

slider();

changeImage();

calc(100);

sendForm();