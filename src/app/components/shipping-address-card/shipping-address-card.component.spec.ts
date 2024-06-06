import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressCardComponent } from './shipping-address-card.component';

describe('ShippingAddressCardComponent', () => {
  let component: ShippingAddressCardComponent;
  let fixture: ComponentFixture<ShippingAddressCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingAddressCardComponent]
    });
    fixture = TestBed.createComponent(ShippingAddressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
