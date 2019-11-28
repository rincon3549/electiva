import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CriterioService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8070';
  get() {
    return this.http.get(this.baseUrl + '/api/getCriterio');
  }
  post(data) {
    return this.http.post(this.baseUrl + '/apis/SaveCriterio', data);
  }
  update(data) {
    return this.http.post(this.baseUrl + '/api/UpadateCriterio', data);
  }
  delete(id) {
    return this.http.post(this.baseUrl + '/api/deleteCriterio', id);
  }
}
