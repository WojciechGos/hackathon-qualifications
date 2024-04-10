import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryComponent } from './jury.component';

describe('JuryComponent', () => {
  let component: JuryComponent;
  let fixture: ComponentFixture<JuryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuryComponent]
    });
    fixture = TestBed.createComponent(JuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
