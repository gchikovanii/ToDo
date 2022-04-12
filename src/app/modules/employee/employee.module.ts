import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddOrEditComponent } from './employee-add-or-edit/employee-add-or-edit.component';
import {MaterialModule} from "../material/material.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeAddOrEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    MaterialModule,


  ]
})
export class EmployeeModule { }
