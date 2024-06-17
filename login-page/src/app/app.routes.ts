import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { PortabilidadeComponent } from './pages/portabilidade/portabilidade.component';
import { OperadorasComponent } from './pages/operadoras/operadoras.component';
import { AuthGuard } from './services/auth-guard.service';
import { NotAuthguardService } from './services/not-authguard.service';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [NotAuthguardService]
    
    },

    {
        path: "signup",
        component: SignupComponent,
        canActivate: [AuthGuard]
    },

    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard]
    },

    {
        path: "listUsers",
        component: ListUsersComponent,
        canActivate: [AuthGuard]
    },

    {
        path: "portabilidade",
        component: PortabilidadeComponent,
        canActivate: [AuthGuard]
    },

    {
        path: "operadoras",
        component: OperadorasComponent,
        canActivate: [AuthGuard]
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
