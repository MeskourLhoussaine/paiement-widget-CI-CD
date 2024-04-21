import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExeptionPermisionComponent } from './exeption-permision.component';

describe('ExeptionPermisionComponent', () => {
  let component: ExeptionPermisionComponent;
  let fixture: ComponentFixture<ExeptionPermisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExeptionPermisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExeptionPermisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
