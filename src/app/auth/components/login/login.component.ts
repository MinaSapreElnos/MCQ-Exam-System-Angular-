import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  [x: string]: any;
 
  constructor(private _fb:FormBuilder ,private _AuthService:AuthserviceService , private _Router:Router ,private _ToastrService:ToastrService){}
  loginForm!: FormGroup;
  users:any[]= [];
  type:string = "students"

  ngOnInit(): void {
    this.cearteForm()
    this.getUser()
  } 

  cearteForm(){
    this.loginForm=this._fb.group({
      type:[this.type],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required ,Validators.pattern(/^[0-9]{6}$/)]],
      
    })
   }

   get email():AbstractControl|null{
    return this.loginForm.get('email')
  }
  
  get password():AbstractControl|null{
    return this.loginForm.get('password')
  }

  getUser(){
    this._AuthService.getUsers(this.type).subscribe({
      next:(res)=>{
        console.log(res)
        this.users=res
      }
    })
  }


  getRole(type:string){
    this.type=type
    this.getUser()
  }


  login(){
    let index=this.users.findIndex(itam =>itam.email===this.loginForm.value.email&&itam.password===this.loginForm.value.password)
    if(index ===-1){
      this._ToastrService.error('الاميل او كلمه السر غير صحيحه')
    }else{
      const model={
        userName:this.users[index].userName,
        role:this.type ,
        userID:this.users[index].id
      }
      this._AuthService.login(model).subscribe({
        next:(res)=>{
          this._AuthService.userLogin.next(res)
          this._ToastrService.success('تم تسجيل الدخول بنجاح')
          this._Router.navigate(['/subjects'])
        }
      })
    }


  }










  




}
