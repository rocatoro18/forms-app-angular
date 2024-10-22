import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

  private fb: FormBuilder = new FormBuilder();
  // IMPORTAR REACTIVE FORMS MODULE DONDE SE ESTE UTILIZANDO EL FORM GROUP
  //public myForm: FormGroup = new FormGroup({
  //  name: new FormControl(''),
  //  price: new FormControl(0),
  //  inStorage: new FormControl(0),
  //})

  constructor(){}

  public myForm: FormGroup = this.fb.group({
    name: [''],
    price: [0],
    inStorage: [0]
  });

  onSave(): void {
    console.log(this.myForm.value);
  }

}
