import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//https://v16.angular.io/guide/reactive-forms
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

  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  // ESTUDIAR ESTO
  isValidFieldInArray(formArray: FormArray, index: number){
    return formArray.controls[index].errors && formArray.controls[index].touched;
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
    favoriteGames: this.fb.array([
      ['Halo', Validators.required],
      ['The Legend of Zelda: Breath of the Wild', Validators.required],
    ])
  })

  // NUEVO CONTROL
  public newFavorite: FormControl = new FormControl('',Validators.required);

  onAddToFavorites(): void {

    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    // ESTO SERIA SI NO SE ESTUVIESE TRABAJANDO CON EL FORM BUILDER
    //this.favoriteGames.push(new FormControl(newGame,Validators.required));

    // INVESTIGAR VALIDADORES ASINCRONOS
    this.favoriteGames.push(
      this.fb.control(newGame,Validators.required)
    );

    this.newFavorite.reset();

  }

  // EN JAVASCRIPT TODO PASA POR REFERENCIA (INVESTIGAR ESO)
  onDeleteFavorites(index: number): void{
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
