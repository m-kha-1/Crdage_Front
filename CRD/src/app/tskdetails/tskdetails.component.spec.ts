import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TskdetailsComponent } from './tskdetails.component';

describe('TskdetailsComponent', () => {
  let component: TskdetailsComponent;
  let fixture: ComponentFixture<TskdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TskdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TskdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
