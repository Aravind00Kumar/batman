import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { BatListComponent } from './bat-list.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppComponent, BatListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    
  }
}
