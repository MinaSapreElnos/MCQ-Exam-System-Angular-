import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  displayedColumns:any
  dataSourse:any
  dataTeble:any[]=[]

    constructor(private _AuthserviceService:AuthserviceService){
      this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
    }

    ngOnInit(): void {
        this.getAllSTudents() 
    }


    getAllSTudents(){
      this._AuthserviceService.getStudents().subscribe((res:any)=>{
         this.dataSourse = res?.map((student:any)=>{
        if(student?.subjects) {
          return student?.subjects?.map((sub:any) => {
            return {
              name:student.userName,
              subjectName:sub.name,
              degree:sub.degree
            }
          })
        }else {
          return [{
            name:student.userName,
            subjectName:"__",
            degree:"__"
          }]
        }
       
      })
         this.dataSourse.forEach((itam:any)=>{
              itam.forEach((sub:any)=>{
                this.dataTeble.push(
                  {
                    
                    name:sub.name,
                    subjectName:sub. subjectName,
                    degree:sub.degree
                  }
                )
              })
              console.log(this.dataTeble)
         })





         console.log(this.dataSourse) 
      })
      
    }


  }
