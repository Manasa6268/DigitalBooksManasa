import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookpaymenyComponent } from './bookpaymeny.component';

describe('BookpaymenyComponent', () => {
  let component: BookpaymenyComponent;
  let fixture: ComponentFixture<BookpaymenyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookpaymenyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookpaymenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
