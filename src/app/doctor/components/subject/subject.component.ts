import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../doctor.service';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  [x: string]: any;

  subjects:any[]=[]
  user:any={}

  constructor(private _DoctorService:DoctorService ,private _AuthserviceService:AuthserviceService ,private _ToastrService:ToastrService){}
  

  ngOnInit(): void {
      this.getSubjects() 
      this.getUserInfo()
  }


  getSubjects(){
    this._DoctorService.getAllsubjects().subscribe((res)=>{
      this.subjects=res
    })
  }

  getUserInfo(){
    this._AuthserviceService.cheakedLogin().subscribe((res)=>{
      console.log(res)
      this.user=res
    })
  }

  delete(index:number) {
    let id  = this.subjects[index].id
    this.subjects.splice(index , 1)
    this._DoctorService.deleteSubjects(id).subscribe(res => {
      this._ToastrService.success("تم حذف المادة بنجاح")
    })
  }

}


