import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmployeeAddOrEditComponent} from "../employee-add-or-edit/employee-add-or-edit.component";
import {EmployeeService} from "../../../core/services";
import {Observable} from "rxjs";
import {Employee} from "../../../core/models/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'position', 'birthDate','action'];
  dataSource: Employee[] = [] ;
  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees()
      .subscribe(result => {
        this.dataSource = result.map( (m: any)  => {
          return {
            id: m.payload.doc.id,
            ...m.payload.doc.data()
          } as Employee;
        });
      });
  }
  addOrEdit(element: any = null) {
    const dialogRef = this.dialog.open(EmployeeAddOrEditComponent, {
      data: {
        employee: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEmployees();
      console.log(`Dialog result: ${result}`);
    });
  }

  delete(element: any) {
    console.log(element.id)
    this.employeeService.deleteEmployees(element.id)
      .then( res => {
        console.log(res);
      });
  }

}
