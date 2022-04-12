import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private _fireStore: AngularFirestore
  ) { }
  getEmployees(): Observable<any>{
    return this._fireStore.collection('employees').snapshotChanges();
  }
  getEmployeeById(id: string): Observable<any>{
    return this._fireStore.collection('employees/').doc(id).get();
  }

  async addEmployees(employee: Employee): Promise<any>{
    delete employee.id;
    return await this._fireStore.collection('employees').add(employee);
  }


  async deleteEmployees(employeeId: any): Promise<any>{
    return await this._fireStore.collection('employees').doc(employeeId).delete();
  }

  async updateEmployees(employee: Employee): Promise<any>{
    const employeeId : any = employee.id;
    delete employee.id;
    return await this._fireStore.collection('employees').doc(employeeId).update(employee);
  }

}
