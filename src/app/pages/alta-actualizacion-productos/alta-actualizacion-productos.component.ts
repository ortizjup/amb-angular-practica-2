import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Icategoria } from '../../interfaces/icategoria';
import { Iproducto } from '../../interfaces/iproducto';

@Component({
  selector: 'app-alta-actualizacion-productos',
  templateUrl: './alta-actualizacion-productos.component.html',
  styleUrls: ['./alta-actualizacion-productos.component.css']
})
export class AltaActualizacionProductosComponent implements OnInit {

  private subscription = new Subscription();
  categorias!: Icategoria[];
  product = {} as Iproducto;
  titulo: string = "";

  constructor(private activeRoute: ActivatedRoute, 
    private productService: ProductoService, 
    private categoriaService: CategoriaService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(){
    this.subscription.add(
      this.categoriaService.getCategorias().subscribe({
        next: (resultado) => { 
          this.categorias = resultado; this.activeRoute.paramMap.subscribe({
            next: (param) => { this.loadForm(param.get("id")) },
            error: (error) => {console.log(error)}
         })
        }, error: (error) => {console.log(error)}
      }));
  }

  loadForm(id: any) : void {
    if(!id){
      this.titulo = "Alta Producto";
    }else{
      this.titulo = "Edicion Producto";
      this.subscription.add(
        this.productService.getProducto(id).subscribe({
          next: (result) => { Object.assign(this.product, result) },
          error: (error) => {console.log(error)}
      }));
    }
  }

  submit(f: NgForm){
    if(f.valid){
      if(this.product.id){
        this.subscription.add(this.productService.updateProducto(this.product).subscribe({
          next: (result) => { this.router.navigateByUrl(""); },
          error: (error) => {console.log(error)}     
        }));
      }else{
        this.subscription.add(this.productService.addProducto(this.product).subscribe({
          next: (result) => { this.router.navigateByUrl(""); },
          error: (error) => {console.log(error)}
        }));
      }
    }
  }

  goBackListing() : void {
    this.router.navigateByUrl("");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
