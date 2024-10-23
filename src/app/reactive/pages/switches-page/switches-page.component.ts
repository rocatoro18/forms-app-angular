import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//https://v16.angular.io/guide/reactive-forms

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  private fb: FormBuilder = new FormBuilder();

  public myForm: FormGroup = this.fb.group({
    gender:['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(){}

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  // ngSubmit
  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    //console.log(this.myForm.value);

    // newPERSON OBJETO CON TODAS LAS PROPIEDADES, MENOS EL TERMS AND CONDITIONES
    const {termsAndConditions,...newPerson} = this.myForm.value;

    this.person = newPerson;

    console.log(this.myForm.value);
    console.log(this.person);

  }

}
