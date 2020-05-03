import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})

export class SegmentService {
   baseUrl: string = "https://cloud-ace-assignment.herokuapp.com/api/v1";
   results = [];
   constructor(private http: HttpClient) { }

   // searchData(title: string, type: SearchType): Observable<any> {
   //    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`)
   //       .pipe(
   //          map(results => {
   //             console.log('RAW: ', results);
   //             return results['Search'];
   //          })
   //       );
   // }

   searchData(): Observable<any> {

      var authHeader = this.addAuthHead(new Headers());
      // console.log("AuthHeader: ", authHeader.get('Authorization'))

      return this.http.get<any>(this.baseUrl + '/cards', { headers: authHeader })
         .pipe(
            tap(result => {
               result = result.data
               return result
            })
         )


      // let token = JSON.parse(localStorage.getItem("userData"));

      // const headerDict = {
      //    'Authorization': token._token
      // }

      // const requestOptions: RequestOptionsArgs = { headers: customHeaders };

      // return this.http.get('https://cloud-ace-assignment.herokuapp.com/api/v1/cards', requestOptions)
      //    .pipe(
      //       tap(results => {
      //          console.log('RAW: ', results);
      //          return results['data'];
      //       })
      //    )
   }

   addAuthHead(head) {
      // var headers = head || new Headers();
      let authToken = JSON.parse(localStorage.getItem('userData'))._token;
      // console.log("AUTH TOKEN: ", authToken)
      let headers = new HttpHeaders().set("Authorization", authToken);
      // headers.append('Authorization', authToken);
      // console.log(headers.get('Authorization'))
      return headers;
   }

   // getDetails(id) {
   //    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`)
   // }
}