import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BeneficiariesComponent } from "./components/beneficiaries/beneficiaries.component";

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    BeneficiariesComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
