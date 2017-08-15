import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilConfirmFactComponent } from './sil-confirm-fact.component';

describe('SilConfirmFactComponent', () => {
  let component: SilConfirmFactComponent;
  let fixture: ComponentFixture<SilConfirmFactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilConfirmFactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilConfirmFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
