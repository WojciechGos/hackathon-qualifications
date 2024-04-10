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
    users: new FormArray([], Validators.required),
    file: new FormControl('', { nonNullable: true }) 
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
    const amountControl = this.form.get('amount');

    if (amountControl) {
      let amount = amountControl.value;
      if (amount > 4) {
        amountControl.setValue(4);
      } else if (amount <= 1) {
        amount = 1;
        amountControl.setValue(1);
      }
    }
    while (usersArray.length !== 0) {
      usersArray.removeAt(0);
    }

    const amountToGenerate = Math.min(amount, 4);

    for (let i = 0; i < amountToGenerate; i++) {
      const userFormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
      });
      usersArray.push(userFormGroup);
    }
  }

  onSubmit() {
    const usersArray = this.form.get('users') as FormArray;
    console.log(this.form.getRawValue());
    const allEmpty = usersArray.controls.every((control) => !control.value);

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
