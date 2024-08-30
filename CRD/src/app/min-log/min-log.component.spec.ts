import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinLogComponent } from './min-log.component';

describe('MinLogComponent', () => {
  let component: MinLogComponent;
  let fixture: ComponentFixture<MinLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
