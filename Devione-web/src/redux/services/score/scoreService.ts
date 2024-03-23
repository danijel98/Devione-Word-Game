import { AxiosResponse } from 'axios';
import http from '../../../http-common';
import { Score } from '../../../model/Score';


export class ScoreService {
    resourceUrl = '/api/score';
    
    async checkWord(word: string): Promise<AxiosResponse<any>>{
      const response = await http.post(`${this.resourceUrl}/check-word`, { word });
      return this.processResponse(response.data);     }

    async filter(
        searchParam: string,
        page: number,
        size: number
      ): Promise<AxiosResponse<Score[]>> {
        return await http.get(`${this.resourceUrl}`, {
          params: {
            searchParam: searchParam,
            page: page,
            size: size,
          },
        });
      }

      private processResponse(response: string): any {
        const parts = response.split(', ');
        const data: { [key: string]: string } = {}; 

        parts.forEach(part => {
            const [key, value] = part.split(': ');
            data[key] = value;
        });

        return data;
    }
}

export const scoreService = new ScoreService();