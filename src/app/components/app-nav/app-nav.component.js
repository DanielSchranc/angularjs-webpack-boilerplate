export const AppNavComponent = {
  bindings: {
    user: '<',
    onLogout: '&',
    buttonTitle: '@'
  },
  template: `
    <header>
      <div class="header__fixed">
        <div class="header__wrapper">
          <h3 class="header__title">
            Hello <span class="header__title--email">{{$ctrl.user.email}}</span>
          </h3>
          <div class="header__logout">
            <a
              href=""
              ng-click="$ctrl.onLogout();">
              <span class="header__button">
                <svg class="header__logout--icon" xmlns="http://www.w3.org/2000/svg" fill="#ff6347" height="18" viewBox="0 0 24 24" width="18">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                </svg>
                {{::$ctrl.buttonTitle}}
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  controller: class AppNavComponent {
    constructor(EventEmmiter) {
      'ngInject';

      this.EventEmmiter = EventEmmiter;
    }
  }
};
