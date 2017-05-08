import { Injectable } from '@angular/core';

import { Beneficiary } from "../models/beneficiary";

const STORAGEKEYS = {
    "beneficiaryPrefix": () => "LSdn-beneficiary-",
    "beneficiary": (id: number) => `LSdn-beneficiary-${id}`,
    "beneficiaryCurrentId": () => "LSdn-beneficiaryCurrentId"
};

@Injectable()
export class BeneficiaryService
{
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public getAll(): Promise<Beneficiary[]> {
        let promise = new Promise<Beneficiary[]>((resolve, reject) => {
            let storedBeneficiaries: Beneficiary[] = [];

            Object.keys(localStorage).forEach(key => {
                    if (key.indexOf(STORAGEKEYS.beneficiaryPrefix()) === 0) {
                        let beneficiary = Beneficiary.fromJson(localStorage.getItem(key));
                        if (beneficiary) {
                            storedBeneficiaries.push(beneficiary);
                        }
                    }
                });

            resolve(storedBeneficiaries);
        });

        return promise;
    }

    public get(id: number): Promise<Beneficiary> {
        let promise = new Promise<Beneficiary>((resolve, reject) => {
            let storedBeneficiary = Beneficiary.fromJson(localStorage.getItem(STORAGEKEYS.beneficiary(id)));
            if (!storedBeneficiary) {
                resolve(null);
            }

            resolve(storedBeneficiary);
        });

        return promise;
    }

    public create(name: string): Promise<Beneficiary> {
        let promise = new Promise<Beneficiary>((resolve, reject) =>
        {
            this.getAll().then(list => {
                if (list.find(beneficiary => beneficiary.name === name))
                {
                    reject(new Error(`A beneficiary named '${name}' already exists.`));
                }
                else
                {
                    let id = +localStorage.getItem(STORAGEKEYS.beneficiaryCurrentId());
                    localStorage.setItem(STORAGEKEYS.beneficiaryCurrentId(), `${++id}`);

                    let beneficiary = new Beneficiary(id, name);
                    localStorage.setItem(STORAGEKEYS.beneficiary(id), beneficiary.toJson());

                    resolve(beneficiary);
                }
            });
        });

        return promise;
    }

    public update(beneficiary: Beneficiary): Promise<Beneficiary> {
        let promise = new Promise<Beneficiary>((resolve, reject) => {
            this.getAll().then(list => {
                if (list.find(b => b.name === beneficiary.name))
                {
                    reject(new Error(`A beneficiary named '${beneficiary.name}' already exists.`));
                }
                else
                {
                    localStorage.setItem(STORAGEKEYS.beneficiary(beneficiary.id), beneficiary.toJson());
                    resolve(beneficiary);
                }
            });
        });

        return promise;
    }

    public delete(id: number): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            localStorage.removeItem(STORAGEKEYS.beneficiary(id));
            resolve();
        });

        return promise;
    }
}