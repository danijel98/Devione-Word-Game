import { DefaultModel } from "./DefaultModel";

export class User extends DefaultModel {
    name: string;
    lastname: string;
    email: string;
    userName: string;
    active: boolean;
    constructor() {
        super();
        this.name = "";
        this.lastname = "";
        this.email = "";
        this.userName = "";
        this.active = false;
    }
}
