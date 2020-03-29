import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Modulos
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { TableComponent } from "./pages/table/table.component";
import { RegisterToolComponent } from "./pages/register-tool/register-tool.component";
import { PropertyComponent } from "./pages/property/property.component";
import { ModalImgComponent } from "./pages/modal-img/modal-img.component";
import { ModalReportsComponent } from "./pages/modal-reports/modal-reports.component";
import { LoginComponent } from "./login/login/login.component";
import { PagesComponent } from "./pages/pages.component";
import { LoginUserComponent } from "./login/login-user/login-user.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    RegisterToolComponent,
    PropertyComponent,
    ModalImgComponent,
    ModalReportsComponent,
    LoginComponent,
    PagesComponent,
    LoginUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
