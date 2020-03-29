import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { UserModel } from "src/app/models/user.model";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login-user",
  templateUrl: "./login-user.component.html",
  styleUrls: ["./login-user.component.css"]
})
export class LoginUserComponent implements OnInit {
  forma: FormGroup;
  error: HttpErrorResponse;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.forma = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  validarCampos(campo: string) {
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }

  login() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    let user = new UserModel(
      null,
      null,
      null,
      this.forma.get("email").value,
      this.forma.get("password").value
    );

    this.usuarioService.login(user).subscribe(
      login => {
        this.forma.reset();
        this.router.navigate([""]);
      },
      err => {
        this.error = err;
      }
    );
  }
}
