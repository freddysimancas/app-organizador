import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PropertiesService } from "src/app/services/properties.service";
import { property } from "../../interfaces/interface";
import { ToolsService } from "src/app/services/tools.service";
import { ToolsModel } from "src/app/models/Tools";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { UserService } from "src/app/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register-tool",
  templateUrl: "./register-tool.component.html",
  styleUrls: ["./register-tool.component.css"]
})
export class RegisterToolComponent implements OnDestroy {
  forma: FormGroup;
  errors;
  public types: property;
  public groups: property;
  public marcas: property;
  public states: property;
  public sizes: property;
  public colors: property;
  public ubicaciones: property;
  public tool = new ToolsModel();
  filesToUpload: Array<File>;
  cantidad: number;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertiesService,
    private toolService: ToolsService,
    private userService: UserService
  ) {
    this.createForm();
    this.cantidad = 0;
  }

  cargarCampos() {
    this.getTypes();
    this.getGroups();
    this.getMarcas();
    this.getStates();
    this.getUbicacion();
    this.getSizes();
    this.getColors();
  }

  ngOnDestroy() {
    this.getTypes().unsubscribe();
    this.getGroups().unsubscribe();
    this.getMarcas().unsubscribe();
    this.getStates().unsubscribe();
    this.getUbicacion().unsubscribe();
    this.getSizes().unsubscribe();
    this.getColors().unsubscribe();
  }

  cambiarValor(num: number) {
    if (this.cantidad < 1) {
      this.cantidad = 1;
      return;
    }
    this.cantidad = this.cantidad + num;
  }
  // Form

  createForm() {
    this.forma = this.fb.group({
      name: ["", Validators.required],
      group: ["", Validators.required],
      type: ["", Validators.required],
      marca: ["", Validators.required],
      size: ["", Validators.required],
      color: ["", Validators.required],
      escaparate: ["", Validators.required],
      columna: ["", Validators.required],
      fila: ["", Validators.required],
      quantify: ["", Validators.required],
      state: ["", Validators.required]
    });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  validarCampos(campo: string) {
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }

  save() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.toolService.createdInventory(this.forma.value).subscribe(
      (resp: any) => {
        if (this.filesToUpload !== undefined) {
          this.toolService
            .makeFileRequest(
              `${environment.url}/inventory/image-upload/${resp.inventarios._id}?token=${this.userService.token}`,
              [],
              this.filesToUpload,
              "image"
            )
            .then((resp: any) => {
              this.forma.reset();
            });
        }

        Swal.fire(
          "Guardado Exitosamente",
          `${resp.inventarios.name} guardado`,
          "success"
        );
        this.forma.reset();
      },
      err => {
        // this.errors = err.error.err.errors;
        this.errors = err;
      }
    );
  }

  // Campos

  getTypes() {
    return this.propertyService.getProperty("types").subscribe((resp: any) => {
      this.types = resp.types;
    });
  }

  getGroups() {
    return this.propertyService.getProperty("groups").subscribe((resp: any) => {
      this.groups = resp.groups;
    });
  }

  getMarcas() {
    return this.propertyService.getProperty("marcas").subscribe((resp: any) => {
      this.marcas = resp.marcas;
    });
  }

  getStates() {
    return this.propertyService.getProperty("states").subscribe((resp: any) => {
      this.states = resp.states;
    });
  }

  getSizes() {
    return this.propertyService.getProperty("sizes").subscribe((resp: any) => {
      this.sizes = resp.sizes;
    });
  }

  getColors() {
    return this.propertyService.getProperty("colors").subscribe((resp: any) => {
      this.colors = resp.colors;
    });
  }

  getUbicacion() {
    return this.propertyService.getLocations().subscribe((resp: any) => {
      this.ubicaciones = resp.locacions;
    });
  }
}
