import 'jest-preset-angular/setup-jest';
import { TextEncoder, TextDecoder } from 'util';
import '@angular/localize/init';

global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder
