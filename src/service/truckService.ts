import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Truck } from 'src/model/truck';
import { Box } from 'src/model/box';

@Injectable({
  providedIn: 'root',
})
export class TruckService {
  private trucksUrl = 'api/trucks/';
  private boxesUrl = 'api/boxes/';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {}

  getTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(this.trucksUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  getTruck(truckId: number): Observable<Truck> {
    return this.http.get<Truck>(this.trucksUrl + truckId).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createTruck(truck: Truck): Observable<Truck> {
    truck.truckID = parseInt((Math.random() * 10000).toFixed());
    return this.http.post<Truck>(this.trucksUrl, truck).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  editTruck(truck: Truck): Observable<any> {
    return this.http.put(this.trucksUrl + truck.truckID, truck);
  }

  deleteTruck(id: number): Observable<any> {
    return this.http.delete(this.trucksUrl + id);
  }

  getBoxes(): Observable<Box[]> {
    return this.http.get<Box[]>(this.boxesUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  createBox(box: Box): Observable<Box> {
    box.boxID = parseInt((Math.random() * 10000).toFixed());
    return this.http.post<Box>(this.boxesUrl, box).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  editBox(box: Box): Observable<any> {
    return this.http.put(this.boxesUrl + box.boxID, box);
  }

  deleteBox(id: number): Observable<any> {
    return this.http.delete(this.boxesUrl + id);
  }
}
