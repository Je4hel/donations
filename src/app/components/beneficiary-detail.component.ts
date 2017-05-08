import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import "rxjs/add/operator/switchMap";

import { BeneficiaryService } from "../services/beneficiary.service";
import { Beneficiary } from "../models/beneficiary";

@Component({
    selector: 'beneficiary-detail',
    templateUrl: './beneficiary-detail.component.html'
})

export class BeneficiaryDetailComponent implements OnInit {
    beneficiary: Beneficiary;
    isEditing: boolean = false;

    constructor(
        private _beneficiaryService: BeneficiaryService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location
    ) { }

    public ngOnInit(): void {
        this._route.params
            .switchMap((params: Params) => this._beneficiaryService.get(+params['id']))
            .subscribe(beneficiary => this.beneficiary = beneficiary);
    }

    public updateBeneficiary(): void {
        this._beneficiaryService.update(this.beneficiary)
            .then(() => this.switchEditing())
            .catch(error => {
                console.error("Could not save modifications", error.message || error);
                this.switchEditing();
            });
    }

    public deleteBeneficiary(): void {
        this._beneficiaryService.delete(this.beneficiary.id)
            .then(() => this._router.navigate([""]));
    }

    public switchEditing(): void {
        if (this.isEditing) {
            this._beneficiaryService.get(this.beneficiary.id)
                .then(beneficiary => {
                    this.beneficiary = beneficiary;
                    this.isEditing = false;
                });
        }
        else {
            this.isEditing = true;
        }
    }

    public goBack(): void {
        this._location.back();
    }
}