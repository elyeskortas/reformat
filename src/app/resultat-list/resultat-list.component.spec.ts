import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatListComponent } from './resultat-list.component';

describe('ResultatListComponent', () => {
  let component: ResultatListComponent;
  let fixture: ComponentFixture<ResultatListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultatListComponent]
    });
    fixture = TestBed.createComponent(ResultatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
