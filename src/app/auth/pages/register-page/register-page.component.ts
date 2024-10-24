import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private fb: FormBuilder = new FormBuilder();
  private validatorsService = new ValidatorsService();

  constructor(){}

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['',[Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[new EmailValidator()]],
    username: ['',[Validators.required, this.validatorsService.cantBeRocatoro]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]]
  },{
    // NIVEL DE FORMULARIO
    // ESTO QUE ESTA AQUI VA A PASAR COMO ARGUMENTO IMPLICITO TODO EL FORMULARIO
    // COMO ESTO ES A NIVEL DE FORMULARIO, SE TIENE ACCESO A TODOS SUS CAMPOS
    validators:[
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  isValidField(field: string){
    // TODO: OBTENER VALIDACION DESDE UN SERVICIO
    return this.validatorsService.isValidfield(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
