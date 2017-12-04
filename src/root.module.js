import angular from 'angular';
// bootstrap
import { RootComponent } from './root.component';
// modules
import { AppMainModule } from './app/app-main.module';
import './root.component.scss';

const MODULE_NAME = 'root';
const COMPONENT_NAME = 'root';
const MODULE_IMPORTS = [
  AppMainModule
];

angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .component(COMPONENT_NAME, RootComponent)
  .value('EventEmmiter', payload => ({ $event: payload }))
  .name;
