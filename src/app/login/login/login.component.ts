import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { UserService } from "src/app/services/user.service";
import { UserModel } from "src/app/models/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  forma: FormGroup;

  constructor(private fb: FormBuilder, private userServices: UserService) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.forma = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      sex: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  validarCampos(campo: string) {
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }

  guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    let user = new UserModel(
      this.forma.get("firstName").value,
      this.forma.get("lastName").value,
      this.forma.get("sex").value,
      this.forma.get("email").value,
      this.forma.get("password").value
    );

    this.userServices.saveUser(user).subscribe(resp => {
      Swal.fire("Usuario Guardado Exitosamente!", "", "success");
      this.forma.reset();
    });
  }
}
