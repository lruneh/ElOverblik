import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverblikMainComponent } from './overblik-main.component';

describe('OverblikMainComponent', () => {
  let component: OverblikMainComponent;
  let fixture: ComponentFixture<OverblikMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverblikMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverblikMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
