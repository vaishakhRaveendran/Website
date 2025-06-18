import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fetchdb } from './fetchdb';

describe('Fetchdb', () => {
  let component: Fetchdb;
  let fixture: ComponentFixture<Fetchdb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fetchdb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fetchdb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
