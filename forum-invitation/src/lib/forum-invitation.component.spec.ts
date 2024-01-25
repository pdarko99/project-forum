import { ComponentFixture, TestBed } from '@angular/core/testing';
import  ForumInvitationComponent from './forum-invitation.component';

describe('ForumInvitationComponent', () => {
  let component: ForumInvitationComponent;
  let fixture: ComponentFixture<ForumInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumInvitationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForumInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
