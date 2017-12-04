import angular from 'angular';
import { AppModule } from './containers/app/app.module';
import { AppNavModule } from './components/app-nav/app-nav.module';

const MODULE_NAME = 'main';
const MODULE_IMPORTS = [
  AppModule,
  AppNavModule
];

export const AppMainModule = angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .name;
