import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  public cantBeRocatoro = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if(value === 'rocatoro'){
      return {
        noRocatoro: true,
      }
    }

    // SI NO ESTA DANDO EL ERROR DE VALIDACION REGRESAMOS NULL
    return null;

  }

  public isValidfield(form: FormGroup, field: string){
    return form.controls[field].errors && form.controls[field].touched;
  }

}
