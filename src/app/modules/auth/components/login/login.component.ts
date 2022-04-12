import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;

  constructor(
      private _authService: AuthService,
      private _snackBar: MatSnackBar,
      private _router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(): void {
    const canAccess = this._authService.isAuthorized;
    if(canAccess){
      this._router.navigate(['/task'])
    }
  }

    submit() {
      if(this.form.invalid) return;
      const{email,password} = this.form.value;
      this._authService.login(email,password)
          .then(auth =>{
            console.log(auth)
            this._snackBar.open('Signed in successfully!','close',{duration: 2000})
              this._router.navigate(['/task'])
          })
          .catch(err =>{
            console.log(err)
            this._snackBar.open('Signing failed! Incorrect email or password!')
          })
    }
}
