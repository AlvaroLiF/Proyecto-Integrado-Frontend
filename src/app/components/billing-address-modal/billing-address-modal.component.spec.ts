import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressModalComponent } from './billing-address-modal.component';

describe('BillingAddressModalComponent', () => {
  let component: BillingAddressModalComponent;
  let fixture: ComponentFixture<BillingAddressModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingAddressModalComponent]
    });
    fixture = TestBed.createComponent(BillingAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
