import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { BatListComponent } from './bat-list.component';
import { BatTreeComponent } from './bat-tree.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppComponent, BatListComponent, BatTreeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    
  }
}
