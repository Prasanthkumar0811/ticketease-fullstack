import { Routes } from '@angular/router';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { ShowTimeComponent } from './pages/show-time/show-time.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { SuccessComponent } from './pages/success/success.component';
import { SeatSelectionComponent } from './pages/seat-selection/seat-selection.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './_guard/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [


    {
        path:'',
        component:AuthLayoutComponent,
        children:[
            {path:'register',component:RegisterComponent},
            {path:'login',component:LoginComponent},
            {path:'',redirectTo:'register',pathMatch:'full'}
        ]
    },
    {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'movies', component: MovieListComponent },
      { path: 'show-times/:id', component: ShowTimeComponent },
      { path: 'seat-selection/:id', component: SeatSelectionComponent },
      { path: 'payment/:id', component: PaymentPageComponent },
      { path: 'payment-method/:id', component: PaymentMethodComponent },
      { path: 'success', component: SuccessComponent },
      {path:'**', component:NotFoundComponent}
    ]
  },
   
];
