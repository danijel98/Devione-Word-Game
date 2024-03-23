import { scoreService } from "../services/score/scoreService"

export const filter = (searchParam: string, page: number, size: number) => {
    return scoreService.filter(searchParam, page, size);
}

export const checkWord = (word: string) => {
    return scoreService.checkWord(word)
      .then(
        (response: any) => {
          return response;
        },
        (error: any) => {
          const message = error.response.data;
          return Promise.reject(message);
        }
      );
  };

