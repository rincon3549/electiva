import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8070';
  get(){
    return this.http.get(this.baseUrl + '/apis/getUsuario');
  }
  post(data){
    return this.http.post(this.baseUrl + '/apis/SaveUsuario', data);
  }
  update(data){
    return this.http.post(this.baseUrl + '/api/UpadateUsuario', data);
  }
  delete(id){
    return this.http.post(this.baseUrl + '/api/deleteUsuario', id);
  }
}
