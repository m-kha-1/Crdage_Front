import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionIdTtaskComponent } from './production-id-ttask.component';

describe('ProductionIdTtaskComponent', () => {
  let component: ProductionIdTtaskComponent;
  let fixture: ComponentFixture<ProductionIdTtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionIdTtaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionIdTtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
