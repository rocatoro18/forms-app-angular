import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private fb: FormBuilder = new FormBuilder();
  private validatorsService = new ValidatorsService();

  constructor(){}

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['',[Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    username: ['',[Validators.required, this.validatorsService.cantBeRocatoro]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]]
  });

  isValidField(field: string){
    // TODO: OBTENER VALIDACION DESDE UN SERVICIO
    return this.validatorsService.isValidfield(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
