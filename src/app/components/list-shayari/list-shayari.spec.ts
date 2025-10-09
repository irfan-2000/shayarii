import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShayari } from './list-shayari';

describe('ListShayari', () => {
  let component: ListShayari;
  let fixture: ComponentFixture<ListShayari>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListShayari]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShayari);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
