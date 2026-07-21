import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/HttpAdapter';


@Injectable()
export class AxiosAdapter implements HttpAdapter{

    private axios: AxiosInstance = axios;

    // Importante: JavaScript por detras hace el promise.resolve para que se pueda devolver la data cuando llamas con await este metodo
    async HttpGet<T>(url: string): Promise<T> {

        try {
            const { data } = await this.axios.get<T>(`${url}`);
            return data;
            
        } catch (error) {

            throw new Error("Error inesperado");
            
        }

    }
}
 

