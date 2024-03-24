import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../auth/services/authservice.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
  constructor(private _AuthserviceService:AuthserviceService){}

  user:any =null
  islogin:boolean=false

  ngOnInit(): void {
    this._AuthserviceService.userLogin.subscribe((res:any) =>{
      if(res?.role){
        this.user=res
      }
      console.log(res)
    })
  }



  logout() {
    const model = {}
    this._AuthserviceService.login(model).subscribe(res => {
      this.user = null
      this._AuthserviceService.userLogin.next(res)
    })
  }
 
  
  }




