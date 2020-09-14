import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksByCategoryComponent } from './artworks-by-category.component';

describe('ArtworksByCategoryComponent', () => {
  let component: ArtworksByCategoryComponent;
  let fixture: ComponentFixture<ArtworksByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworksByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworksByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
