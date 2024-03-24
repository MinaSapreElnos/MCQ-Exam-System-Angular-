import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ExamComponent } from './student/components/exam/exam.component';
import { StudentsComponent } from './doctor/components/students/students.component';
import { NewExamComponent } from './doctor/components/new-exam/new-exam.component';
import { SubjectComponent } from './doctor/components/subject/subject.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'register',pathMatch:'full'},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'exam/:id',canActivate:[AuthGuard] , component:ExamComponent},
  {path:'students' ,canActivate:[AuthGuard] , component:StudentsComponent},
  {path:'subjects' ,canActivate:[AuthGuard] , component:SubjectComponent}, 
  {path:'new-exam' ,canActivate:[AuthGuard] , component:NewExamComponent},
  {path:'**' , redirectTo:'exam' , pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
