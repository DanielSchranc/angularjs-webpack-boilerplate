export const AppComponent = {
  selector: 'app',
  template: `
    <div class="app">
      <app-nav
        user="$ctrl.user"
        on-logout="$ctrl.logout($event);"
        button-title="{{$ctrl.button}}">
      </app-nav>
      <ui-view></ui-view>
    </div>
  `,
  controller: class AppComponent {
    constructor() {
      'ngInject';

      this.button = null;
      this.user = {};
    }

    $onInit() {
      this.button = 'Logout';
      this.user = {
        email: 'user@email.com',
        password: '3%2f43#}54f[st31'
      };
    }

    logout(event) {
      // Make a service call or simmilar...
      if (event.userEmail === this.user.email) {
        console.log('>>>User has been logged out: ', { email: event.userEmail });
      }
    }
  }
};
