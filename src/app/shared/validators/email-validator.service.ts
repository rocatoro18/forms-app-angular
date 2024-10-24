import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    console.log({email})

    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      console.log({email});

      if(email === 'roberto@google.com'){
        subscriber.next({emailTaken:true});
        // CON ESTO SE HACE LA LIMPIEZA Y SE VA A DESUSCRIBIR, NO SE VAN A SEGUIR EMITIENDO MAS VALORES
        subscriber.complete();
        //return;
      }

      subscriber.next(null);
      // CON ESTO SE HACE LA LIMPIEZA Y SE VA A DESUSCRIBIR, NO SE VAN A SEGUIR EMITIENDO MAS VALORES
      subscriber.complete();

    }).pipe(
      delay(3000)
    );

    return httpCallObservable;

  }

  /*
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    console.log({email})

    return of({
      emailTaken: true
    }).pipe(
      delay(2000)
    )

  }
  */

}

/**
 * return this.http.get<any[]>(`https://localhost:3000/users?q=${email}`)
 * .pipe(
 *  map(resp => {
 *    return (resp.length === 0)
 *    ? null
 *    : {emailTaken:true}
 * })
 * );
 */
