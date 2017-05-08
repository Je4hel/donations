import { Component, OnInit } from "@angular/core";

import { BeneficiaryService } from "../services/beneficiary.service";
import { Beneficiary } from "../models/beneficiary";

@Component({
    selector: "beneficiaries",
    templateUrl: "./beneficiaries.component.html"
})
export class BeneficiariesComponent implements OnInit {
    beneficiaries: Beneficiary[];

    constructor(
        private _beneficiaryService: BeneficiaryService
    ) {}

    public ngOnInit(): void {
        this._beneficiaryService.getAll()
            .then(beneficiaries => this.beneficiaries = beneficiaries);
    }

    public createBeneficiary(name: string): void {
        if (!name) return;
        name = name.trim();

        this._beneficiaryService.create(name)
            .then(beneficiary => {
                this.beneficiaries.push(beneficiary);
            })
            .catch(error => {
                console.error("Error when creating a Beneficiary:", error.message || error);
            });
    }
}