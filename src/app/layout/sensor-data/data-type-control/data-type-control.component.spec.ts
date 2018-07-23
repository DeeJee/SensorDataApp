import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeControlComponent } from './data-type-control.component';

describe('DataTypeControlComponent', () => {
  let component: DataTypeControlComponent;
  let fixture: ComponentFixture<DataTypeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTypeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
