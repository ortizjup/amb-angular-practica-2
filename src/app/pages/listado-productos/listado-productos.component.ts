import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproducto } from '../../interfaces/iproducto';
import { Icategoria } from '../../interfaces/icategoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {

  productos!: Iproducto[];
  categorias!: Icategoria[];
  private subscription = new Subscription();

  constructor(private productoService: ProductoService, private catService: CategoriaService, private route: Router) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() : void {
    this.subscription.add(
      this.catService.getCategorias().subscribe({
        next: (result) => this.loadgrid(result),
        error: (error) => {console.log(error)}
      }))
  }

  loadgrid(cats: Icategoria[]) : void {
    this.subscription.add(
      this.productoService.getProductos().subscribe({
        next: (result) => {
          this.productos = result;
          this.categorias = cats;
          this.productos.forEach((x) => {
              x.categoria = {} as Icategoria;
              x.categoria.id = x.categoriaId;
              x.categoria.nombre = cats.find(f => f.id == x.categoriaId)?.nombre ?? "Inexistente";
          }); 
        },
        error: (error) => {console.log(error)}
      }))
  }

  public deleteProducto(id: number) : void {
    this.subscription.add(this.productoService.deleteProducto(id).subscribe({
      next: (result) => this.loadgrid(this.categorias),
      error: (error) => {console.log(error)}
    }));
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
