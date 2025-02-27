import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/core/services/auth.service';

import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  RouterEnum = RouterEnum;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
  });

  get controls() {
    return this.form.controls;
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'To pole jest wymagane!';
    }
    if (control.hasError('minlength')) {
      return 'Za mało znaków!';
    }
    if (control.hasError('maxlength')) {
      return 'Za dużo znaków';
    }
    if (control.hasError('email')) {
      return 'Email nie jest poprawny';
    }

    return '';
  }

  onSubmit() {

    const fromValue = this.form.getRawValue();
    const loginData = {

      email: fromValue.email,
      password: fromValue.password,
    };

    console.log(loginData);

    this.authService.login(loginData).subscribe({
      next: () => {
        this.router.navigate([RouterEnum.home]);
        this.notifierService.notify('success', 'Login success!');
      },
      error: (err) => this.notifierService.notify('error', 'Try again!'),
    });
  }
}
