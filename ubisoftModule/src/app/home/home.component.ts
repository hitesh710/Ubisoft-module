import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/product'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[];
  errMsg: string;

  constructor(private productService: ProductService,
    @Inject('ImageURL') public ImageURL) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products,
        errmess => this.errMsg = <any>errmess);
  }

}
