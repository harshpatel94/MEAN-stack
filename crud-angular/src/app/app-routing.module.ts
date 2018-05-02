import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
import { UserComponent }   from './user/user.component';
import { DeckComponent }     from './deck/deck.component';
import { UserSignupComponent }     from './user-signup/user-signup.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
 
const appRoutes: Routes = [
    { path: '',   redirectTo: '/user', pathMatch: 'full' },
    { path: 'user', component: UserComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'deck', component: DeckComponent },
    { path: '**', component: PageNotFoundComponentComponent },
    
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}