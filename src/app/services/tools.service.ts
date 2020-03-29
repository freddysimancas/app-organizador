import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { UserService } from "./user.service";
import { throwError } from "rxjs";
import { catchError } from "rxjs/internal/operators";

@Injectable({
  providedIn: "root"
})
export class ToolsService {
  constructor(private _http: HttpClient, private userService: UserService) {}

  makeFileRequest(
    url: string,
    params: Array<string>,
    files: Array<File>,
    name: string
  ) {
    return new Promise(function(resolve, reject) {
      var formData = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }

  createdInventory(inventory) {
    return this._http
      .post(
        `${environment.url}/inventory/add-inventory?token=${this.userService.token}`,
        inventory
      )
      .pipe(
        catchError(err => {
          return throwError(err.error.err.errors);
        })
      );
  }

  getToolsById(id: string) {
    return this._http
      .get(
        `${environment.url}/inventory/inventory/${id}?token=${this.userService.token}`
      )
      .pipe(
        map((resp: any) => {
          resp = resp.inventory;
          return resp;
        })
      );
  }

  getTools() {
    return this._http.get(
      `${environment.url}/inventory/inventorys?token=${this.userService.token}`
    );
  }

  updateTool(inventory) {
    return this._http.put(
      `${environment.url}/inventory/update-inventory?token=${this.userService.token}`,
      inventory
    );
  }

  deleteTools(inventory) {
    return this._http.put(
      `${environment.url}/inventory/delete-inventory?token=${this.userService.token}`,
      inventory
    );
  }

  search(busqueda) {
    return this._http
      .get(
        `${environment.url}/inventory/tools/${busqueda}?token=${this.userService.token}`
      )
      .pipe(
        map((tools: any) => {
          tools = tools.tools;
          return tools;
        })
      );
  }

  getReportById(id: string) {
    return this._http.get(`${environment.url}/report/reports/${id}`);
  }

  getReports(id, newReport) {
    return this._http.put(`${environment.url}/report/reports/${id}`, newReport);
  }

  saveReport(report) {
    return this._http.post(`${environment.url}/report/add-report`, report);
  }

  updateReport(report) {
    return this._http.put(
      `${environment.url}/report/update-report?token${this.userService.token}`,
      report
    );
  }

  actualizarEstato(estado) {
    return this._http
      .put(`${environment.url}/report/update-state-report`, estado)
      .pipe(
        catchError(err => {
          return throwError("Error al guardar");
        })
      );
  }
}
