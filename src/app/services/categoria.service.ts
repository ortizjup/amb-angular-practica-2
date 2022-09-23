import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icategoria } from '../interfaces/icategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = "https://6317ca93f6b281877c5d7785.mockapi.io/categoria/";

  constructor(private httpClient: HttpClient) { }

  getCategorias() : Observable<Icategoria[]> {
      return this.httpClient.get<Icategoria[]>(this.url);
  }

  getCategoriaById(id: number) : Observable<Icategoria>{
     return this.httpClient.get<Icategoria>(`${this.url}${id}`);
  }
}
