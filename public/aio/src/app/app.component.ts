import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}


@Component({
  selector: '[my-nav]',
  template: `
        <ul class="no-pad-mar">
          <li><a routerLink="/home">Home</a></li>
          <li><a routerLink="/list-home">List</a></li>
          <li><a routerLink="/list-basic">Basic</a></li>
          <li><a routerLink="/list-auto-resize">Auto resize</a></li>
          <li><a routerLink="/list-custom-template">Custom template</a></li>
          <li><a routerLink="/list-complex-template">Complex template</a></li>
          <li><a routerLink="/list-custom-event">Custom events</a></li>
          <li><a routerLink="/list-huge-data">Huge data</a></li>
        </ul>
  `
})
export class NavComponent {}

