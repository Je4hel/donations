import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BeneficiariesComponent } from "./components/beneficiaries.component";
import { BeneficiaryDetailComponent } from "./components/beneficiary-detail.component";

const routes = [
    { path: "", redirectTo: "/beneficiaries", pathMatch: "full" },
    { path: "beneficiaries", component: BeneficiariesComponent },
    { path: "beneficiary/:id", component: BeneficiaryDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}