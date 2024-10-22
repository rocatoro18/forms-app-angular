import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  /*
  public myForm2 = new FormGroup({
    favoriteGames: new FormArray([])
  });
  */

  private fb: FormBuilder = new FormBuilder();

  constructor(){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Halo', Validators.required],
      ['The Legend of Zelda: Breath of the Wild', Validators.required],
    ])
  })

  onSubmit(): void {

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }

}
