import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T>{

  constructor(protected http: HttpClient) { }

  abstract uri(): string;

  protected getToken(): string | null {
    return localStorage.getItem('token');
  }
    
  add(data: object): Observable<T> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const httpOptions = { headers };
      return this.http.post<T>(`${environment.url}${this.uri()}`, data, httpOptions);
    } else {
      return throwError('L\'utilisateur n\'est pas connecté.');
    }
  }


  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${environment.url}${this.uri()}/${id}`);
  }
  update(data: number, id: number): Observable<T> {
    // data['_method'] = "PUT"
    return this.http.put<T>(`${environment.url}${this.uri()}/${id}`, data);
  }


}
