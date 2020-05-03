import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({
   providedIn: 'root'
})
export class LoginService {
   baseUrl: string = "https://cloud-ace-assignment.herokuapp.com/api/v1";

   user = new BehaviorSubject<User>(null);

   constructor(private http: HttpClient) { }

   signin(username: string, password: string) {

      return this.http
         .post<any>(this.baseUrl + "/users/login", {
            username,
            password
         })
         .pipe(
            tap(resData => {
               resData = resData.data;
               this.handleAuthentication(
                  resData.id,
                  resData.username,
                  resData.email,
                  resData.token
               );
            })
         );
   }

   autoLogin() {
      const userData: {
         id: string;
         username: string;
         email: string;
         _token: string;
      } = JSON.parse(localStorage.getItem("userData"));
      if (!userData) {
         return;
      }
      const loadedUser = new User(
         userData.id,
         userData.username,
         userData.email,
         userData._token
      );

      if (loadedUser.token) {
         this.user.next(loadedUser);
      }
   }

   signout() {
      this.user.next(null);
      localStorage.removeItem("userData");
   }
   
   private handleAuthentication(
      id: string,
      username: string,
      email: string,
      token: string
   ) {
      const user = new User(id, username, email, token);
      this.user.next(user);
      localStorage.setItem("userData", JSON.stringify(user));
   }
}