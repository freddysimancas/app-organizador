import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TableComponent } from "./pages/table/table.component";
import { LoginComponent } from "./login/login/login.component";
import { PagesComponent } from "./pages/pages.component";
import { LoginUserComponent } from "./login/login-user/login-user.component";
import { LoginGuardGuard } from "./services/guards/login-guard.guard";
import { PageLoginGuard } from "./services/guards/page-login.guard";
import { AdminGuard } from "./services/guards/admin.guard";
import { PropertyComponent } from "./pages/property/property.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: "", component: TableComponent },
      { path: "propiedades", component: PropertyComponent },
      { path: "", redirectTo: "/", pathMatch: "full" }
    ]
  },
  {
    path: "register",
    canActivate: [LoginGuardGuard, AdminGuard],
    component: LoginComponent
  },
  {
    path: "login",
    canActivate: [PageLoginGuard],
    component: LoginUserComponent
  },
  { path: "**", pathMatch: "full", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
