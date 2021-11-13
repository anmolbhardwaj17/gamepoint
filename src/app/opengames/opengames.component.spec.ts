import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpengamesComponent } from './opengames.component';

describe('OpengamesComponent', () => {
  let component: OpengamesComponent;
  let fixture: ComponentFixture<OpengamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpengamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpengamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
