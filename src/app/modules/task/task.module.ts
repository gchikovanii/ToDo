import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasksComponent } from './components/tasks/tasks.component';
import {MaterialModule} from "../material/material.module";
import {SharedModule} from "../shared/shared.module";
import {TaskAddOrEditComponent} from "./components/task-add-or-edit/task-add-or-edit.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TasksComponent,
    TaskAddOrEditComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ]
})
export class TaskModule { }
