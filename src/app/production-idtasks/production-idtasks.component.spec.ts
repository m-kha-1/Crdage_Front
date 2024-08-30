import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionIdtasksComponent } from './production-idtasks.component';

describe('ProductionIdtasksComponent', () => {
  let component: ProductionIdtasksComponent;
  let fixture: ComponentFixture<ProductionIdtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionIdtasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionIdtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
