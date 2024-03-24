import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _fb:FormBuilder ,private _AuthService:AuthserviceService , private _Router:Router ,private _ToastrService:ToastrService){}
  registerForm !: FormGroup
  students:any[]=[]

  ngOnInit(): void {
    this.cearteForm()
    this.getStudents()
  }

 cearteForm(){
  this.registerForm=this._fb.group({
    userName:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required ,Validators.pattern(/^[0-9]{6}$/)]],
    confirmPassword:['',[Validators.required ,Validators.pattern(/^[0-9]{6}$/)]]
  })
 }


 get  userName() :AbstractControl|null{
  return this.registerForm.get('userName')
}

get email():AbstractControl|null{
  return this.registerForm.get('email')
}

get password():AbstractControl|null{
  return this.registerForm.get('password')
}

get confirmPassword():AbstractControl|null{
  return this.registerForm.get('confirmPassword')
}


submit(){
  const model={
    userName:this.registerForm.value.userName,
    email:this.registerForm.value.email,
    password:this.registerForm.value.password
  }

  let index=this.students.findIndex(item=>item.email===this.registerForm.value.email)
  if(index !==-1){
    this._ToastrService.error('الايمسل موجود مسبقا ')
  }else{
    this._AuthService.register(model).subscribe({
      next:(res)=>{
        this._ToastrService.success('تم انشاء الحساب بنجاح')
        console.log(model)
        this._Router.navigate(['/login'])
        // console.log(res)
      }
    })
  }
  
}



  //get all students//
getStudents(){
  this._AuthService.getStudents().subscribe({
      next:(res)=>{
      console.log(res)
      this.students=res
      console.log(this.students)
      }
  })
}


}
