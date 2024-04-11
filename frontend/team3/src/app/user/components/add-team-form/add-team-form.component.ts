import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/core/services/user.service';
import { RouterEnum } from 'src/enums/router.enum';
import { Team , TeamWithPdf, Pdf } from 'src/app/core/models/team.model';

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
    file: new FormControl(new File([], ''), { validators: [Validators.required] })
  });

  ngOnInit() {
    this.onAmountChange();
  }
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
      let amountValue = amountControl.value;
      if (amountValue > 4) {
        amountControl.setValue(4);
      } else if (amountValue < 1) {
        amountControl.setValue(1);
      }
    }
  
    while (usersArray.length !== 0) {
      usersArray.removeAt(0);
    }
  
    const amountToGenerate = Math.max(amount, 1);
    const maxAllowedUsers = Math.min(amountToGenerate, 4);
  
    for (let i = 0; i < maxAllowedUsers; i++) {
      const userFormGroup = new FormGroup({
        nameAndSurname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
      });
      usersArray.push(userFormGroup);
    }
  }
  

  onSubmit() {
    const usersArray = this.form.get('users') as FormArray;
    console.log(this.form.getRawValue());
    const allEmpty = usersArray.controls.every((control) => !control.value);

    const formValue = this.form.getRawValue();
    const dataToSend: Team = {
      teamName: formValue.teamName,
      teamDescription: formValue.description,
      participantNumber: formValue.amount,
      participantList: formValue.users,
      status: 'PENDING',
      fileName: '',
      filePath: ''
    };
    console.log(dataToSend)

    const uploadDataPdf: Pdf = {
      pdfFile: formValue.file ? new File([formValue.file], formValue.teamName + '.pdf') : new File([], '')
    };
    
    if (formValue.file) {
      const file = new File([formValue.file], formValue.teamName + '.pdf');
      uploadDataPdf.pdfFile = file;
    }
    
    const file = new File([uploadDataPdf.pdfFile], formValue.teamName + '.pdf');
    
    uploadDataPdf.pdfFile = file;
    


    if (allEmpty) {
      this.notifierService.notify(
        'warning',
        'Wprowadź co najmniej jednego użytkownika'
      );
      return;
    }
    // console.log(teamWithPdf);
    this.userService.addTeam(dataToSend).subscribe({
      next: (addTeamResponse) => {
        console.log('addTeam response:', addTeamResponse);
        this.notifierService.notify('success', 'Dodano zespół');
    
        this.userService.uploadPdf(uploadDataPdf.pdfFile, addTeamResponse.id).subscribe({
          next: (uploadPdfResponse) => {
            console.log('uploadPdf response:', uploadPdfResponse);
            this.notifierService.notify('success', 'Dodano zespół');
          },
          error: (err) => {
            console.log('uploadPdf error:', err);
            this.notifierService.notify('error', 'Spróbuj ponownie');
          },
        });
      },
      error: (err) => {
        console.log('addTeam error:', err);
        this.notifierService.notify('error', 'Spróbuj ponownie');
      },
    });
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file')?.setValue(file);
    }
  }
  
}
