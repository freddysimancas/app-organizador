import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PropertiesService } from "src/app/services/properties.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-property",
  templateUrl: "./property.component.html",
  styleUrls: ["./property.component.css"]
})
export class PropertyComponent implements OnInit {
  public propiedades = [
    "group",
    "type",
    "marca",
    "size",
    "color",
    "state",
    "escaparate",
    "columna",
    "fila"
  ];

  eliminar: boolean;
  p;
  pro: string;
  constructor(private propertyService: PropertiesService) {
    this.eliminar = false;
  }

  ngOnInit() {}

  getPropiedad(propieda: string) {
    this.propertyService.getProperty(`${propieda}s`).subscribe((resp: any) => {
      this.pro = propieda;
      this.p = resp[`${propieda}s`];
    });
  }

  borrar(id) {
    Swal.fire({
      title: "Estas seguro que quieres eliminarlo ?",
      text: "No podras recuperarla!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then(result => {
      if (result.value) {
        this.propertyService.deleteProperty(this.pro, id).subscribe();
        this.propertyService.getProperty(`${this.pro}s`).subscribe();
        Swal.fire("Eliminado!", "Correctamente");
        this.eliminar = false;
      }
    });
  }
  save(forma: NgForm, campo: string) {
    if (forma.invalid) {
      return;
    }

    for (let index = 0; index < this.propiedades.length; index++) {
      if (this.propiedades[index] === campo && index <= 5) {
        this.propertyService.saveProperty(forma.value, campo).subscribe();
      }

      if (this.propiedades[index] === campo && index >= 6) {
        this.propertyService.saveLocation(forma.value).subscribe();
      }
    }
  }
}
