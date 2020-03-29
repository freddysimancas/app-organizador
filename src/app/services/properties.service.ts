import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { UserService } from "./user.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class PropertiesService {
  constructor(private _http: HttpClient, private userService: UserService) {}

  getProperty(nombre: string) {
    return this._http.get(`${environment.url}/properties/${nombre}`);
  }
  getLocations() {
    return this._http.get(`${environment.url}/location/locacions`);
  }

  saveLocation(location) {
    return this._http
      .post(`${environment.url}/location/add-location`, location)
      .pipe(map(() => Swal.fire("Guardado Exitosamente!", "", "success")));
  }

  saveProperty(campo, name: string) {
    return this._http
      .post(
        `${environment.url}/properties/add-${name}?token=${this.userService.token}`,
        campo
      )
      .pipe(map(() => Swal.fire("Guardado Exitosamente!", "", "success")));
  }

  deleteProperty(name: string, id) {
    return this._http.delete(
      `${environment.url}/properties/delete-${name}/${id}`
    );
  }
}
