import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMeal } from './delete-meal';

describe('DeleteMeal', () => {
  let component: DeleteMeal;
  let fixture: ComponentFixture<DeleteMeal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMeal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMeal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
