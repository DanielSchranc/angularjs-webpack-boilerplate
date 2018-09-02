import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import angularLoadingBar from 'angular-loading-bar';

// bootstrap
import { RootComponent } from './root.component';
// modules
import { CommonModule } from './common/common.module';
import './root.component.scss';

const MODULE_NAME = 'root';
const MODULE_IMPORTS = [
  uiRouter,
  angularLoadingBar,
  CommonModule
];

angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .component(RootComponent.selector, RootComponent)
  .value('EventEmitter', payload => ({ $event: payload }))
  .run(($transitions, cfpLoadingBar) => {
    'ngInject';

    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  })
  .name;
