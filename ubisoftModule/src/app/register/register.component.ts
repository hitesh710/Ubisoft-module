import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { Product } from '../shared/product'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitForm: FormGroup;
  product: Product;
  errMess: string;
  isSubmit = false;
  accept = ".png, .jpg, .jpeg, .webp";
  @ViewChild('fform') productFormDirective;

  formErrors = {
    'title': '',
    'description': '',
    'image': ''
  };
  validationMessages = {
    'title': {
      'required': 'Title is required ',
      'minlength': 'Title must be at least 1 characters long.',
      'maxlength': 'Title cannot be more than 25 characters long.'
    },
    'description': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 10 characters long.',
      'maxlength': 'Description cannot be more than 500 characters long.'
    },
    'image': {
      'required': 'image is required.',

    }
  };


  constructor(private fb: FormBuilder,
    private productService: ProductService, private _snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.submitForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      image: ['', [Validators.required, Validators.pattern]]
    });
    this.submitForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onValueChanged(data?: any) {
    if (!this.submitForm) { return; }
    const form = this.submitForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.product = this.submitForm.value;
    this.product.date = new Date().toISOString();
    this.product.imagePath = this.product.image.name;

    this.productService.submitProduct(this.product)
      .subscribe((product) => {
        this.product = product;
      },
        errmess => { this.errMess = <any>errmess; });

    this.productService.submitImage(this.product)
      .subscribe(product => {
        this.product = product;
      },
        errmess => { this.errMess = <any>errmess; });
    this.openSnackBar('Submitted Successfully!', 'close');

    this.createForm();
    this.productFormDirective.resetForm();

  }

}
