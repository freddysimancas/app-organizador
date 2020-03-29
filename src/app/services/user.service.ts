import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/internal/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: UserModel;
  token: string;

  constructor(private _http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.token = "";
      this.user = null;
    }
  }

  guardarStorage(id: string, token: string, user: UserModel) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  login(user: UserModel) {
    return this._http.post(`${environment.url}/user/login`, user).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.user);
        return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  logout() {
    this.user = null;
    this.token = "";

    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  saveUser(user: UserModel) {
    return this._http
      .post(`${environment.url}/user/add-user?token=${this.token}`, user)
      .pipe(
        map((resp: any) => {
          Swal.fire("Usuario Creado", "success");
          return resp.user;
        }),
        catchError(err => {
          Swal.fire(`${err.error.message}`, "error");
          return throwError(err.error.message);
        })
      );
  }
}
