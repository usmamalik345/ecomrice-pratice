import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatailCardComponent } from './deatail-card.component';

describe('DeatailCardComponent', () => {
  let component: DeatailCardComponent;
  let fixture: ComponentFixture<DeatailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeatailCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeatailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
