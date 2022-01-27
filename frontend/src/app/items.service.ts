import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Item } from './Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  url = "http://localhost:3000"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url + "/get")
      .pipe(
        catchError(this.handleError<Item[]>('getHeroes', []))
      );
  }

  getItem(name: string): Observable<Item> {
    return this.http.get<Item>(this.url + "/getItem/" + name)
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.url + "/add", item, this.httpOptions).pipe(
      catchError(this.handleError<Item>('addHero'))
    );
  }

  deleteItem(id: string): Observable<Item> {
    const url = `${this.url}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      catchError(this.handleError<Item>('deleteHero'))
    );
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put(this.url + "/update", item, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      return of(result as T);
    };
  }
}
