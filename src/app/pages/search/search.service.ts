import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// export enum SearchType {
//    all = '',
//    movie = 'movie',
//    series = 'series',
//    episode = 'episode'
// }

@Injectable({
   providedIn: 'root'
})

export class SearchService {
   baseUrl: string = "https://cloud-ace-assignment.herokuapp.com/api/v1";
   // movieUrl: string = `http://api.github.com/search/users?q=${text}&client_id=b6ba9bf5a26e6db11627&client_secret=bc885999e8fc97b13173e5255fcfe8320c2935ee`
   url = 'http://www.omdbapi.com'
   apiKey = '4a5e611c';
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

   searchDatas(name: string): Observable<any> {
      return this.http.get(`http://api.github.com/search/users?q=${name}&client_id=b6ba9bf5a26e6db11627&client_secret=bc885999e8fc97b13173e5255fcfe8320c2935ee`)
         .pipe(
            map(results => {
               console.log('RAW: ', results);
               return results['items'];
            })
         )
   }

   getDetails(id) {
      return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`)
   }
}