import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { AbstractService } from './abstract.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VenteService extends AbstractService<any>{

  override uri(): string {
    return "produit "
  }

  search(idsucc: number, code: any): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const httpOptions = { headers };

      return this.http.get<any>(`${environment.url}succursales/${idsucc}/search/${code}`, httpOptions);
    } else {
      return throwError('L\'utilisateur n\'est pas connecté.');
    }
  }

  vente(commande: any): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const httpOptions = { headers };

      return this.http.post<any>(`${environment.url}commande`, commande, httpOptions);
    } else {
      return throwError('L\'utilisateur n\'est pas connecté.');
    }
  }

  getProduitBySuccursale(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url}product/succursales/${id}`);
  }

  all(): Observable<any> {
    return this.http.get<any>(`${environment.url}all`);
  }

  
  getCategorieByMarque(id:number): Observable<any> {
    return this.http.get<any>(`${environment.url}categorieProduit/${id}`);
  }

  getvalueByCaract(id:number): Observable<any> {
    return this.http.get<any>(`${environment.url}carateristique/suggest-value/${id}`);
  }





}


