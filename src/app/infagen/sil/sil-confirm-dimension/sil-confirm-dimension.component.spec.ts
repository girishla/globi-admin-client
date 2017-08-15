import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilConfirmDimensionComponent } from './sil-confirm-dimension.component';

describe('SilConfirmDimensionComponent', () => {
  let component: SilConfirmDimensionComponent;
  let fixture: ComponentFixture<SilConfirmDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilConfirmDimensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilConfirmDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
