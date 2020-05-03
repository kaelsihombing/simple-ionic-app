import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})

export class CardService {
   baseUrl: string = "https://cloud-ace-assignment.herokuapp.com/api/v1";
   results = [];
   constructor(private http: HttpClient) { }

   getMyData(): Observable<any> {

      var authHeader = this.addAuthHead();
      // console.log("AuthHeader: ", authHeader.get('Authorization'))

      return this.http.get<any>(this.baseUrl + '/users', { headers: authHeader })
         .pipe(
            tap(result => {
               this.results = result.data
               return this.results
            })
         )
   }

   updateData(newUserData): Observable<any> {
      console.log("UPDATING DATA.....", newUserData)

      var authHeader = this.addAuthHead();

      return this.http.put<any>(this.baseUrl + '/users', newUserData, { headers: authHeader })
         .pipe(
            tap(result => {
               return result
            })
         )
   }

   addAuthHead() {
      let authToken = JSON.parse(localStorage.getItem('userData'))._token;

      let headers = new HttpHeaders().set("Authorization", authToken);

      return headers;
   }



   // getDetails(id) {
   //    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`)
   // }
}