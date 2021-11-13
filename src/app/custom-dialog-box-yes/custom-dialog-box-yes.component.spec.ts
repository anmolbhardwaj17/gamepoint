import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDialogBoxYesComponent } from './custom-dialog-box-yes.component';

describe('CustomDialogBoxYesComponent', () => {
  let component: CustomDialogBoxYesComponent;
  let fixture: ComponentFixture<CustomDialogBoxYesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDialogBoxYesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDialogBoxYesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
