import { DefaultModel } from "../../model/DefaultModel";
import { AxiosResponse } from 'axios';
import http from '../../http-common';

export class AbstractService<T extends DefaultModel> {
    constructor(protected resourceUrl: string) {}
  
    create(t: T): Promise<AxiosResponse<T>> {
      return http.post(this.resourceUrl, t);
    }
  
    update(id: number, t: T): Promise<AxiosResponse<T>> {
      return http.put(this.resourceUrl + "/" + id, t);
    }
  
    delete(id: number): Promise<AxiosResponse<T>> {
      return http.delete(this.resourceUrl + "/" + id);
    }
  
    findAll(): Promise<AxiosResponse<T[]>> {
      return http.get(this.resourceUrl);
    }
  
    findById(id: number): Promise<AxiosResponse<T>> {
      return http.get(this.resourceUrl + "/" + id);
    }
  }
  