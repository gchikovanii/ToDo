import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PositionPipe} from "../../core/pipes";
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [
    LayoutComponent,
    PositionPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MaterialModule
  ],
  exports: [
    LayoutComponent,
    PositionPipe
  ]
})
export class SharedModule { }
