import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceManagementComponent } from './datasource-management.component';

describe('DatasourceManagementComponent', () => {
  let component: DatasourceManagementComponent;
  let fixture: ComponentFixture<DatasourceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
