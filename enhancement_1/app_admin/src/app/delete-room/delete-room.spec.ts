import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoom } from './delete-room';

describe('DeleteRoom', () => {
  let component: DeleteRoom;
  let fixture: ComponentFixture<DeleteRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
