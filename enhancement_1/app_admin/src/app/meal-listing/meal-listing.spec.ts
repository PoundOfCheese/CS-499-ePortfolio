import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealListing } from './meal-listing';

describe('MealListing', () => {
  let component: MealListing;
  let fixture: ComponentFixture<MealListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
