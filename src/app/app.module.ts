import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app.component";
import { BeneficiariesComponent } from "./components/beneficiaries.component";
import { BeneficiaryDetailComponent } from "./components/beneficiary-detail.component";
import { BeneficiaryService } from "./services/beneficiary.service";
import { NotificationService } from "./services/notification.service";

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        BeneficiariesComponent,
        BeneficiaryDetailComponent
    ],
    providers: [
        BeneficiaryService,
        NotificationService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
