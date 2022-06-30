import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsolComponent } from './konsol.component';

describe('KonsolComponent', () => {
  let component: KonsolComponent;
  let fixture: ComponentFixture<KonsolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonsolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
