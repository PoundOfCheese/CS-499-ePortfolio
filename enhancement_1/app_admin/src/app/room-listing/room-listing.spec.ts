import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListing } from './room-listing';

describe('RoomListing', () => {
  let component: RoomListing;
  let fixture: ComponentFixture<RoomListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
