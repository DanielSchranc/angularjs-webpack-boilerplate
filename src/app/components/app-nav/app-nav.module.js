import angular from 'angular';
// app
import { AppNavComponent } from './app-nav.component';
import './app-nav.component.scss';

const MODULE_NAME = 'app.nav';
const COMPONENT_NAME = 'appNav';
const MODULE_IMPORTS = [];

export const AppNavModule = angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .component(COMPONENT_NAME, AppNavComponent)
  .name;
