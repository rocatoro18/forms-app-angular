import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//https://v16.angular.io/guide/reactive-forms
const xbox = {
  name: 'Xbox Series X',
  price: 499,
  inStorage: 10
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  private fb: FormBuilder = new FormBuilder();
  // IMPORTAR REACTIVE FORMS MODULE DONDE SE ESTE UTILIZANDO EL FORM GROUP
  //public myForm: FormGroup = new FormGroup({
  //  name: new FormControl(''),
  //  price: new FormControl(0),
  //  inStorage: new FormControl(0),
  //})

  constructor(){}

  ngOnInit(): void {
    //this.myForm.reset(xbox)
  }

  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;

      }
    }

    return null;
  }

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  onSave(): void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({price: 0, inStorage:0});
  }

}
