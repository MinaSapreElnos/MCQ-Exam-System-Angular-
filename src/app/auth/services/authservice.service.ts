import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  userLogin:BehaviorSubject<any> =new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient) { }

  
  register(model:any):Observable<any>{
      return this._HttpClient.post('http://localhost:3000/students',model)
  }



  getStudents():Observable<any>{
    return this._HttpClient.get('http://localhost:3000/students')
  }



  getUsers(type:string):Observable<any>{
    return this._HttpClient.get('http://localhost:3000/'+type)
  }

  login(model:any):Observable<any>{
    return this._HttpClient.put('http://localhost:3000/login/1',model)
  }

  cheakedLogin():Observable<any>{
    return this._HttpClient.get('http://localhost:3000/login/1')
  }


  getStudentsById(id:number):Observable<any>{
    return this._HttpClient.get('http://localhost:3000/students/'+id)
  }

  upDateStudentsById(id:number,model:any):Observable<any>{
    return this._HttpClient.put('http://localhost:3000/students/'+id ,model)
  }


  
}

