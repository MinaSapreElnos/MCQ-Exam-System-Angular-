import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { DoctorService } from 'src/app/doctor/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  [x: string]: any;

  id:any
  subject:any
  user:any
  studentInfo:any
  result:number=0
  userSubjects:any[]=[]
  showResulBotten:boolean=false
  vaildExam:boolean=true
  
  constructor(private _ActivatedRoute:ActivatedRoute ,private _DoctorService:DoctorService ,private _ToastrService:ToastrService ,private _AuthserviceService:AuthserviceService){
    this.id =  this._ActivatedRoute.snapshot.paramMap.get('id')
    console.log(this.id)
    this.getSubject()
    this.getLogiedinUser()
    
  }



  getSubject(){
    this._DoctorService.getSubjectById(this.id).subscribe((res)=>{
      this.subject=res
      console.log(res)
    })
  }


  delete(index:number) {
    this.subject.questions.splice(index , 1)

    const model = {
      name:this.subject.name,
      questions:this.subject.questions
    }
    
    this._DoctorService.updatejubjects( this.id , model ).subscribe(res => {
      this._ToastrService.success("تم حذف السؤال بنجاح")
    })
  } 

  // information of the logiedin person//
  getLogiedinUser(){
    this._AuthserviceService.cheakedLogin().subscribe((res)=>{
      console.log(res)
      this.user=res
      this.getUserData()
    })
    
  }

  //information of the student//
  getUserData(){
    this._AuthserviceService.getStudentsById(this.user.userID).subscribe((res:any)=>{
      this.studentInfo=res
      this.userSubjects=res?.subjects ? res?.subjects :[]
      this.getValidExam()
      console.log(this.studentInfo)
    })
  }

  getValidExam(){
    for(let x in this.userSubjects){
      if(this.userSubjects[x].id ==  this.id){
        this.result=this.userSubjects[x].degree
          this.vaildExam=false
      }
    }
    console.log(this.vaildExam)
  }



  getAnswer(event:any){
    let value=event.value
    let questionIndex=event.source.name 
    this.subject.questions[questionIndex].studentAnswer = value
    console.log(this.subject.questions)

  }

  getResult(){
    this.result=0
    for(let i in this.subject.questions ){
      if(this.subject.questions[i].studentAnswer === this.subject.questions[i].correctAnswer){
        this.result++
      }
    }
    this.showResulBotten=true

    this.userSubjects.push({
      name:this.subject.subjectName,
      id:this.subject.id,
      degree:this.result
    })

    const model ={
      userName:this.studentInfo.userName,
      email:this.studentInfo.email,
      password:this.studentInfo.password,
      subjects:this.userSubjects
    }

    this._AuthserviceService.upDateStudentsById(this.user.userID,model).subscribe((res)=>{
      this._ToastrService.success("تم تسجيل النتيجه بنجاح")
    })
    
    console.log(this.result)

  }



}
