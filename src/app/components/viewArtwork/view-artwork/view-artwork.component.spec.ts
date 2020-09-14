import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArtworkComponent } from './view-artwork.component';

describe('ViewArtworkComponent', () => {
  let component: ViewArtworkComponent;
  let fixture: ComponentFixture<ViewArtworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArtworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
