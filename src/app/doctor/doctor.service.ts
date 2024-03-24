import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _HttpClient:HttpClient) { }

  createSubject(model:any):Observable<any>{
    return this. _HttpClient.post('http://localhost:3000/subjects',model)
  }

  updatejubjects(id:number,model:any):Observable<any>{
    return this._HttpClient.put('http://localhost:3000/subjects/'+id ,model)

  }


  getAllsubjects():Observable<any>{
    return this._HttpClient.get('http://localhost:3000/subjects')
  }


  deleteSubjects(id:number):Observable<any>{
    return this._HttpClient.delete('http://localhost:3000/subjects/'+id )
  }

  getSubjectById(id:number):Observable<any>{
    return this._HttpClient.get('http://localhost:3000/subjects/'+id )
  }

  
}
