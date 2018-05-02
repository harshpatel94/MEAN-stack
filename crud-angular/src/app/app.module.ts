import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DeckComponent } from './deck/deck.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { UserSignupComponent } from './user-signup/user-signup.component';


@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    UserComponent,
    PageNotFoundComponentComponent,
    UserSignupComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
