import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { PortabilidadeComponent } from './pages/portabilidade/portabilidade.component';
import { OperadorasComponent } from './pages/operadoras/operadoras.component';
import { MenuDropdownComponent } from './components/menu-dropdown/menu-dropdown.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },

    {
        path: "signup",
        component: SignupComponent
    },

    {
        path: "home",
        component: HomeComponent
    },

    {
        path: "listUsers",
        component: ListUsersComponent
    },

    {
        path: "portabilidade",
        component: PortabilidadeComponent
    },

    {
        path: "operadoras",
        component: OperadorasComponent
    },

    {
        path: 'menudrop', component: MenuDropdownComponent
    },

    { 
        path: '', redirectTo: '/login', pathMatch: 'full' 
    },

    {
        path: '**', component: Error404Component
    }
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
