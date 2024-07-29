import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
export const routes: Routes = [
    {
        path:"",
        component : UserListComponent
    },
    {
        path:"user-list",
        component: UserListComponent
    },
    {
        path:"create-user",
        component:UserFormComponent
    },
    {
        path:"user/:id",
        component:UserFormComponent
    }
];
