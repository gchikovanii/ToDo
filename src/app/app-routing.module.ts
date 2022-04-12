import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthModule} from "./modules/auth/auth.module";
import {EmployeeModule} from "./modules/employee/employee.module";
import {TaskModule} from "./modules/task/task.module";
import {LayoutComponent} from "./modules/shared/components/layout/layout.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth'
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'employee',
        loadChildren: () => EmployeeModule
      },
      {
        path: 'task',
        loadChildren: () => TaskModule
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
