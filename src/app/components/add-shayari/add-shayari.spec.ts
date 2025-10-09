import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShayari } from './add-shayari';

describe('AddShayari', () => {
  let component: AddShayari;
  let fixture: ComponentFixture<AddShayari>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShayari]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShayari);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
