import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http: HttpClient) {}

  getListOfHouses () {
    const listUrl = 'https://demo.interfacema.de/programming-assessment-1.0/buildings';
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.get(listUrl, { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
