import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isAuthorized(): any{
    const IsAuthorized: any = JSON.parse(localStorage.getItem('IsAuthorized') as string);
    return IsAuthorized.isAuthorized || false;
  }


  constructor(
    private fireAuthService: AngularFireAuth
  ) { }
  async login(email: string, password: string): Promise<any>{
    return await this.fireAuthService.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('IsAuthorized', JSON.stringify({isAuthorized: true}));
        return res;
      })
      .catch(err => {
        localStorage.setItem('IsAuthorized', JSON.stringify({isAuthorized: false}));
        return err;
      });
  }
  async register(email: string, password: string): Promise<any>{
    return await this.fireAuthService.createUserWithEmailAndPassword(email, password);
  }



}
