import { DefaultModel } from "./DefaultModel";

export class Score extends DefaultModel {
    points: number;
    word: string;
    user: string;
    constructor() {
        super();
        this.points = 0
        this.word = "";
        this.user = "";
    }
}
