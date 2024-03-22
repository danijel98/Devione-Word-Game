import { scoreService } from "../services/score/scoreService"

export const filter = (searchParam: string, page: number, size: number) => {
    return scoreService.filter(searchParam, page, size);
}

export const checkWord = (word: string,) => {
    return scoreService.checkWord(word);
}

