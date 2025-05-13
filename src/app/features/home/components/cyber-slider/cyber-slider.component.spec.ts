import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberSliderComponent } from './cyber-slider.component';

describe('CyberSliderComponent', () => {
  let component: CyberSliderComponent;
  let fixture: ComponentFixture<CyberSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
