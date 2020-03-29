import { Component, OnInit, Input } from "@angular/core";
import { ToolsService } from "src/app/services/tools.service";
import { NgForm, FormGroup, NgModel } from "@angular/forms";
import { PropertiesService } from "src/app/services/properties.service";
import { format } from "fecha";
import Swal from "sweetalert2";

@Component({
  selector: "app-modal-reports",
  templateUrl: "./modal-reports.component.html",
  styleUrls: ["./modal-reports.component.css"]
})
export class ModalReportsComponent {
  @Input() name: string;
  @Input() identificador;
  forma: FormGroup;
  nameID: number;
  mostrar: boolean;
  estados: any;
  novedad: any;
  fecha: string;

  constructor(
    private toolService: ToolsService,
    private propertyService: PropertiesService
  ) {
    this.nameID = new Date().getMilliseconds();
    this.mostrar = false;
    this.fecha = format(new Date(), "YYYY MM DD hh:mm:ssa");
  }

  getState() {
    this.propertyService.getProperty("states").subscribe((resp: any) => {
      this.estados = resp.states;
    });
  }

  reportById() {
    this.toolService
      .getReportById(this.identificador)
      .subscribe((resp: any) => {
        this.novedad = resp.report;
      });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    let estado = {
      inventoryId: this.identificador,
      state: forma.value.state
    };

    let report = {
      _id: this.identificador,
      report: forma.value.report,
      createdAtReport: format(new Date(), "YYYY MM DD hh:mm:ssa")
    };

    this.toolService.updateReport(report).subscribe((resp: any) => {});

    this.toolService.actualizarEstato(estado).subscribe();

    Swal.fire("Novedad Guardada!", "", "success");
  }
}
