import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {

  subjectName =new FormControl(" ") 
  questions:any[]=[]
  questionForm !:FormGroup
  correctAnswer:any
  startAdd:boolean=false 
  preview:boolean = false 
  id:number=0
  updetaItem:any


  constructor(private _fb:FormBuilder , private _ToastrService:ToastrService ,private _DoctorService:DoctorService ,private _Router:Router){}

  ngOnInit(): void {
      this.createForm()
  }

  createForm(){
    console.log(this.updetaItem)
    this.questionForm=this._fb.group({
      question:[this.updetaItem?.question|| '',[Validators.required]],
      answer1:[this.updetaItem?.answer1 ||'',[Validators.required]],
      answer2:[this.updetaItem?.answer2 ||'',[Validators.required]],
      answer3:[this.updetaItem?.answer3 ||'',[Validators.required]],
      answer4:[this.updetaItem?.answer4 ||'',[Validators.required]],
      correctAnswer:[this.updetaItem?.correctAnswer ||'']
    })
  }


  createQuestion(){
    if(this.correctAnswer){
      const questionModel={
        question:this.questionForm.value.question,
        answer1:this.questionForm.value.answer1,
        answer2:this.questionForm.value.answer2,
        answer3:this.questionForm.value.answer3,
        answer4:this.questionForm.value.answer4,
        correctAnswer:this.questionForm.value[this.correctAnswer]
      }

      this.questions.push(questionModel)
      this.questionForm.reset()
    }else{
      this._ToastrService.error("يرجي تحديد الاجابه الصحيحه")
    }
    console.log(this.questions)
  }

  getCorrect(event:any){
    console.log(event.value)
    this.correctAnswer=event.value

  }

  start(){
    if(this.subjectName.value=== " "){
      this._ToastrService.error('برجاء ادخال اسم الماده')
    }
    else{
      this.startAdd=true
      
    }
  }

  clearForm(){
    this.questionForm.reset()
  }

  cancel(){
    this.questions=[],
    this.questionForm.reset(),
    this.subjectName.reset()
    this.startAdd=false
  }

  submit(){
    const model = {
      subjectName:this.subjectName.value,
      questions:this.questions 
    }

    if(this.preview===false){
      this._DoctorService.createSubject(model).subscribe({
        next:(res)=> {
            this.preview=true
            this.id=res.id 
          }})
          console.log( model)
    }
  }


  delete(index:number){
    this.questions.splice(index,1)

    const model = {
      subjectName:this.subjectName.value,
      questions:this.questions
    }

    this._DoctorService.updatejubjects(this.id,model).subscribe((res)=>{
      this._ToastrService.success("تم حزف السوال بنجاح")
    })

  }


  modifiyQuestion(item:any,index:number){
    console.log(item)
    // this.questions.splice(index,1)
    const questionUpdataModel ={
      question:item.question,
        answer1:item.answer1,
        answer2:item.answer2,
        answer3:item.answer3,
        answer4:item.answer4,
        correctAnswer:item.correctAnswer
    }
    console.log(questionUpdataModel)
    this.questions.splice(index,1)

    // this.updetaItem=item
    // console.log(this.updetaItem) //مسكنا السوال
    // console.log(index)
}


// {question: 'student@student.com', answer1: 'sasa', answer2: 'sassas', answer3: 'sasa', answer4: 'asa', …}



  



}
