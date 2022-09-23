import { Icategoria } from './icategoria';
export interface Iproducto {
    id: number;
    codigo: number;
    nombre: string; 
    precio: number;
    stock: number;
    categoriaId: number;
    categoria: Icategoria;
}
