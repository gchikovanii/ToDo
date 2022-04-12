import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  displayedColumns: string[] = ['name', 'employee', 'createAT', 'status', 'action'];
  dataSource: Task[] = [];
  constructor(
    private Firestore: AngularFirestore
  ) { }
  get(): Observable<any>{
    return this.Firestore.collection('tasks').snapshotChanges();
  }
  async add(task: Task): Promise<any>{
    delete task.id;
    return await this.Firestore.collection('tasks').add(task);
  }
  async delete(taskId: any): Promise<any>{
    return await this.Firestore.collection('tasks').doc(taskId).delete();
  }

  async update(task: Task): Promise<any>{
    const taskId : any = task.id;
    delete task.id;
    return await this.Firestore.collection('tasks').doc(taskId).update(task);
  }


}
