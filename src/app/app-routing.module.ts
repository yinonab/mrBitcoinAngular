import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { SignupComponent } from './pages/signup/signup.component'

const routes: Routes = [
  {path:'details/:id',component:ContactDetailsPageComponent},
  {
    path: 'contact',
    component: ContactPageComponent,
    children: [
      { path: 'edit/:id', component: ContactEditPageComponent },
      { path: 'edit', component: ContactEditPageComponent }
    ]
  },
  {path:'statistics',component:StatisticPageComponent},
  
  {path:'signup',component:SignupComponent},
  {path:'home/:id',component:HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],

  exports: [RouterModule]
})
export class AppRoutingModule { }
