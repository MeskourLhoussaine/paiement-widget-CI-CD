import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmanpayComponent } from './amanpay.component';

describe('AmanpayComponent', () => {
  let component: AmanpayComponent;
  let fixture: ComponentFixture<AmanpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmanpayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmanpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
