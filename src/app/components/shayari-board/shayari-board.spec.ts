import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShayariBoard } from './shayari-board';

describe('ShayariBoard', () => {
  let component: ShayariBoard;
  let fixture: ComponentFixture<ShayariBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShayariBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShayariBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
