import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';

import { BatmanModule } from '@batman/aio/batman.module';

import { AppComponent, NavComponent } from './app.component';

import { ListHomeComponent, BasicListComponent } from './list/list.components'

import { Component } from '@angular/core';
@Component({
    template: `
<h1 class="h1"> Angulario Wrappers </h1>
<h2 class="h5">angulario components installation and usage</h2>

<ul>
    <li> Install the packages
        <div class="pad-mar-2x no-mar-collapse">
            <code>npm install ..\\build\\batman-core-1.0.0-alpha.2.tgz</code><br>
            <code>npm install ..\\build\\batman-components-1.0.0-alpha.2.tgz</code><br>
            <code>npm install ..\\build\\batman-aio-1.0.0-alpha.2.tgz</code>
        </div>
    </li>
    <li> 
      Add the following <code>scripts</code> and <code>styles</code> in index.html file
      <div class="pad-mar-2x no-mar-collapse">
          <code>
              &lt;link rel="stylesheet" href="./node_modules/@batman/core/css/batman.css" &gt;
          </code>
      </div>
      <div class="pad-mar-2x no-mar-collapse">
          <code>
              
          </code>
      </div>
    </li>
    <li>
        Configure the following code in <code> systemjs.config.js </code> 
  
      <div class="pad-mar-2x no-mar-collapse">
          <code>
            '@batman/components/components': 'npm:@batman/components/components.js',
          </code>
      </div>
      <div class="pad-mar-2x no-mar-collapse">
          <code>
            '@batman/core/core': 'npm:@batman/core/core.js',
          </code>
      </div>
      <div class="pad-mar-2x no-mar-collapse">
          <code>
            '@batman/aio/batman.module': 'npm:@batman/aio/batman.module.js',
          </code>
      </div>

    </li>
    <li>
      Import <code>BatmanModule</code> module

      <div class="pad-mar-2x no-mar-collapse">
          <code>
            import {{ '{' }} BatmanModule {{ '}' }} from '@batman/aio/batman.module';
          </code>
      </div>

      <div class="pad-mar-2x no-mar-collapse">
          <code>
            @NgModule({{ '{' }}
              imports: [
                BatmanModule
              ],
              declarations: [
                AppComponent,  
              ],
              bootstrap: [AppComponent]
            {{ '}' }})
          </code>
      </div>

    </li>
    <li> Use the following code in template
        <div class="pad-mar-2x no-mar-collapse">
            <code>
              &lt;bat-list [options]="listOptions"&gt; &lt;/bat-list&gt;
            </code>
            <br>
        </div>
    </li>

</ul>
    `
})export class AppHomeComponent{} 

const appRoutes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'home', component: AppHomeComponent },
  { path: 'list-home', component: ListHomeComponent },
  { path: 'list-basic', component: BasicListComponent },
  { path: 'list-auto-resize', component: BasicListComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    BatmanModule
  ],
  declarations: [
    AppComponent,  
    AppHomeComponent,
    ListHomeComponent, 
    BasicListComponent,
    NavComponent
  ],
  bootstrap: [AppComponent,NavComponent]
})
export class AppModule {}

