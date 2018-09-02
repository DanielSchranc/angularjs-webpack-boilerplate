import angular from 'angular';

// containers
import { AppComponent } from './containers/app/app.component';
// components
import { AppNavComponent } from './components/app-nav/app-nav.component';
// styles
import './components/app-nav/app-nav.component.scss';

const MODULE_NAME = 'common';
const MODULE_IMPORTS = [];

export const CommonModule = angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .component(AppComponent.selector, AppComponent)
  .component(AppNavComponent.selector, AppNavComponent)
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state(AppComponent.selector, {
        url: `/${AppComponent.selector}`,
        component: AppComponent.selector,
        data: {
          requiredAuth: true
        }
      });

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/app');
  })
  .name;
