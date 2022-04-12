import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService : AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required]],
      confirm_password: [null,[Validators.required]],
    },{validators: this.checkPasswords})
  }

  ngOnInit(): void {
    const canAccess = this.authService.isAuthorized;
    if(canAccess){
      this._router.navigate(['/task'])
    }
  }
  checkPasswords(group : FormGroup){
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirm_password'].value;
    return pass == confirmPass ? null : {notSame : true};
  }


  submit() {
    if(this.form.invalid) return;
    const{email,password} = this.form.value;

    this.authService.register(email,password)
      .then(auth =>{
        console.log(auth)
        this._snackBar.open('Registered successfully!','close',{duration: 2000})
        this._router.navigate(['/auth'])
      })
      .catch(err =>{
        console.log(err)
        this._snackBar.open('Registration failed!')
      })
  }
}
