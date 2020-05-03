import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class SignupService {
   baseUrl: string = "https://cloud-ace-assignment.herokuapp.com/api/v1";

   user = new BehaviorSubject<User>(null);

   constructor(private http: HttpClient) { }

   // Authentication
   signup(
      email: string,
      username: string,
      password: string,
   ) {
      return this.http
         .post<any>(this.baseUrl + "/users", {
            email,
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
