import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icategoria } from '../interfaces/icategoria';
import { Iproducto } from '../interfaces/iproducto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = "https://6317ca93f6b281877c5d7785.mockapi.io/articulo/";

  constructor(private httpClient: HttpClient) { }

  getProductos() : Observable<Iproducto[]>{
    return this.httpClient.get<Iproducto[]>(this.url);
  }

  getProducto(id: number) : Observable<Iproducto>{
    return this.httpClient.get<Iproducto>(`${this.url}${id}`);
  }

  addProducto(producto: Iproducto) : Observable<Iproducto>{
    return this.httpClient.post<Iproducto>(this.url, producto);
  }

  updateProducto(producto: Iproducto) : Observable<Iproducto>{
    return this.httpClient.put<Iproducto>(`${this.url}${producto.id}`, producto);
  }

  deleteProducto(id: number) : Observable<Iproducto> {
    return this.httpClient.delete<Iproducto>(`${this.url}${id}`);
  }
}
