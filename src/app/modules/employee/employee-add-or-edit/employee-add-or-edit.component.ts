import {Component, Inject, OnInit} from '@angular/core';
import {positions} from "../../../core/dictionaries";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Employee} from "../../../core/models/employee";
import {EmployeeService} from "../../../core/services";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-add-or-edit',
  templateUrl: './employee-add-or-edit.component.html',
  styleUrls: ['./employee-add-or-edit.component.scss']
})
export class EmployeeAddOrEditComponent implements OnInit {
 positions = positions
  form!: FormGroup;

  constructor(
    private employeeService : EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  )
  {
    this.form = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      position: new FormControl(null,Validators.required),
      birthDate: new FormControl(null,Validators.required),
    })
  }

  ngOnInit(): void {
    if(this.data && this.data.employee){
      this.form.patchValue({
        ...this.data.employee,
        birthDate: this.data.employee.birthDate.toDate()
      });
    }
  }

  save() {
    if (this.form.invalid) { return; }
    if (this.data && this.data.employee) {
      this.employeeService.updateEmployees(this.form.value)
        .then( res => {
          console.log(res);
        })
        .catch( err => {
          console.error(err);
        });
    }else {
      this.employeeService.addEmployees(this.form.value)
        .then( res => {
          console.log(res);
        })
        .catch( err => {
          console.error(err);
        });
    }
  }
}
