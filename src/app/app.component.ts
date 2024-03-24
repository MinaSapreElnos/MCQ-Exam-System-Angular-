import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from './auth/services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mcqExam';
 constructor(private _AuthserviceService:AuthserviceService){}

 ngOnInit(): void {
   this.getUserData()
 }

 getUserData(){
  this._AuthserviceService.cheakedLogin().subscribe({
    next:(res)=>{
      this._AuthserviceService.userLogin.next(res)
    }
  })
 }


}
