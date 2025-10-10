import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListing } from './news-listing';

describe('NewsListing', () => {
  let component: NewsListing;
  let fixture: ComponentFixture<NewsListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
