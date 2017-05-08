export class Beneficiary {
    id: number;
    name: string;
    imagePath: string = null;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static fromJson(json: string): Beneficiary {
        let parsed = JSON.parse(json);
        
        if (!parsed) {
            return null;
        }
        else if (!parsed.id && !parsed.name) {
            throw new Error("Invalid JSON data: missing id and/or name.");
        }

        let beneficiary = new Beneficiary(parsed.id, parsed.name);
        beneficiary.imagePath = parsed.imagePath;

        return beneficiary;
    }

    public toJson(): string {
        return JSON.stringify(this);
    }
}