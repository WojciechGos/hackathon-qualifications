import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/core/services/user.service';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-add-team-form',
  templateUrl: './add-team-form.component.html',
  styleUrls: ['./add-team-form.component.scss'],
})
export class AddTeamFormComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  RouterEnum = RouterEnum;

  form = new FormGroup({
    teamName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150),
      ],
      nonNullable: true,
    }),
    amount: new FormControl(1, {
      validators: [Validators.required, Validators.min(1), Validators.max(4)],
      nonNullable: true,
    }),
    users: new FormArray([new FormControl('', { nonNullable: true })]),
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
    if (control.hasError('min')) {
      return 'Za mała liczba!';
    }
    if (control.hasError('max')) {
      return 'Za duża liczba';
    }

    return '';
  }

  onAmountChange() {
    const amount = +this.form.getRawValue().amount;
    const usersArray = this.form.get('users') as FormArray;

    while (usersArray.length !== 0) {
      usersArray.removeAt(0);
    }

    for (let i = 0; i < amount; i++) {
      usersArray.push(new FormControl('', { nonNullable: true }));
    }
  }

  onSubmit() {
    const usersArray = this.form.get('users') as FormArray;

    const allEmpty = usersArray.controls.filter((control) => !control.value);

    if (allEmpty) {
      this.notifierService.notify(
        'warning',
        'Wprowadź co najmniej jednego użytkownika'
      );
      return;
    }

    this.userService.addTeam(this.form.getRawValue()).subscribe({
      next: () => {
        this.notifierService.notify('success', 'Dodano zespół');
      },
      error: (err) => this.notifierService.notify('error', 'Spróbuj ponownie'),
    });
  }
}
