import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntergameComponent } from './entergame.component';

describe('EntergameComponent', () => {
  let component: EntergameComponent;
  let fixture: ComponentFixture<EntergameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntergameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntergameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
