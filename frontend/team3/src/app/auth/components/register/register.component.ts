import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {}
  RouterEnum = RouterEnum;

  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),

    lastName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),

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
    this.authService.register(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate([RouterEnum.home]);
        this.notifierService.notify('success', 'Register success');
      },
      error: (err) => this.notifierService.notify('error', 'Try again!'),
    });
  }
}
