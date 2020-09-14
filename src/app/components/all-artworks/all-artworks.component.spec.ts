import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArtworksComponent } from './all-artworks.component';

describe('AllArtworksComponent', () => {
  let component: AllArtworksComponent;
  let fixture: ComponentFixture<AllArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
