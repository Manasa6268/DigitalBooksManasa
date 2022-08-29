import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebooksComponent } from './createbooks.component';

describe('CreatebooksComponent', () => {
  let component: CreatebooksComponent;
  let fixture: ComponentFixture<CreatebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatebooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
