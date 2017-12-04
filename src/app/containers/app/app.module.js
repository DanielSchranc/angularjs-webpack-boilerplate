import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
// components
import { AppComponent } from './app.component';

const MODULE_NAME = 'app';
const COMPONENT_NAME = 'app';
const MODULE_IMPORTS = [
  uiRouter
];

export const AppModule = angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .component(COMPONENT_NAME, AppComponent)
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state(COMPONENT_NAME, {
        url: `/${COMPONENT_NAME}`,
        component: COMPONENT_NAME,
        data: {
          requiredAuth: true
        }
      });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise(`/${COMPONENT_NAME}`);
  })
  .name;
