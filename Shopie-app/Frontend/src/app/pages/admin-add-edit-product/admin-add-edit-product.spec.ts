import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEditProduct } from './admin-add-edit-product';

describe('AdminAddEditProduct', () => {
  let component: AdminAddEditProduct;
  let fixture: ComponentFixture<AdminAddEditProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddEditProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEditProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
