import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Employee} from "../../../../core/models/employee";
import {EmployeeService, TaskService} from "../../../../core/services";
import {statuses} from "../../../../core/dictionaries/status";
import {Task} from "../../../../core/models/task";

@Component({
  selector: 'app-task-add-or-edit',
  templateUrl: './task-add-or-edit.component.html',
  styleUrls: ['./task-add-or-edit.component.scss']
})
export class TaskAddOrEditComponent implements OnInit {
  form: FormGroup;
  employees: Employee[] = [];
  statuses = statuses;
  employeeID!: string;
  constructor(
    private employeeService: EmployeeService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }

  ) {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      createAT: new FormControl(new Date(), Validators.required),
      status: new FormControl('TODO', Validators.required),
      employee: new FormControl(null, Validators.required),

    });
  }

  ngOnInit(): void {
    this.getEmployees();
    if (this.data && this.data.task){
      this.employeeID = this.data.task.employeeId;
      this.form.patchValue({
        ...this.data.task,
      });
    }
  }
  getEmployees(){
    this.employeeService.getEmployees()
      .subscribe(result => {
        this.employees = result.map( (m: any)  => {
          return {
            id: m.payload.doc.id,
            ...m.payload.doc.data()
          } as Employee;
        });
      });
  }

  save() {
    if (this.form.invalid) { return; }
    const params = {
      ...this.form.value,
    };
    if (this.data && this.data.task) {
      this.taskService.update(params)
        .then( res => {
          console.log(res);
        })
        .catch( err => {
          console.error(err);
        });
    }else {
      this.taskService.add(params)
        .then( res => {
          console.log(res);
        })
        .catch( err => {
          console.error(err);
        });
    }
  }

  handleEmployee($event: any) {
    this.employeeService.getEmployeeById($event)
      .subscribe( res => {
        this.form.patchValue({
          employee: {
            ...res.data(),
            id: res.id,
          }
        });
      });
  }
}
