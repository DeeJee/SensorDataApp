import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatasourceComponent } from './add-datasource.component';

describe('DatasourceManagementComponent', () => {
  let component: AddDatasourceComponent;
  let fixture: ComponentFixture<AddDatasourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDatasourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
