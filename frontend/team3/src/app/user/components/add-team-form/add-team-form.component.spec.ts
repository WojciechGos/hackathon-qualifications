import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamFormComponent } from './add-team-form.component';

describe('AddTeamFormComponent', () => {
  let component: AddTeamFormComponent;
  let fixture: ComponentFixture<AddTeamFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeamFormComponent]
    });
    fixture = TestBed.createComponent(AddTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
