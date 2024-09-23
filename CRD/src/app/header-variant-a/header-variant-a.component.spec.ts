import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVariantAComponent } from './header-variant-a.component';

describe('HeaderVariantAComponent', () => {
  let component: HeaderVariantAComponent;
  let fixture: ComponentFixture<HeaderVariantAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderVariantAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderVariantAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
