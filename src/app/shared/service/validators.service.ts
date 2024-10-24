import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

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

  // ESTO ES UNA FUNCION QUE REGRESA UNA FUNCION
  public isFieldOneEqualFieldTwo(field1: string, field2: string){

    return (formGroup: AbstractControl) : ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value || '';

      const fieldValue2 = formGroup.get(field2)?.value || '';

      // SI SON DIFERENTES
      if(fieldValue1 !== fieldValue2) {
        // ESTABLECEMOS EN EL INPUT2 (FIELD2) EL ERROR
        // CON QUE UN INPUT TENGA UN ERROR, TODO EL FORMULARIO TENDRA EL ERROR
        formGroup.get(field2)?.setErrors({notEqual:true});
        return { notEqual : true }
      }
      // SI SON IGUALES
      // CHECAR ESTO PARA MANEJAR VARIOS ERRORES EN CASO DE FALLO
      formGroup.get(field2)?.setErrors(null);

      return null;
    }

  }


}
