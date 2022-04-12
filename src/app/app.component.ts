import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit{
  title = 'ToDo';
  constructor() {
  }

  ngOnInit(): void {
  }

}
