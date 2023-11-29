import { Component,inject,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  private userService = inject(UserService)
  loggedInUser: User | null = null; 
  userId: string=''
  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
      this.userId = user ? user._id : '';
      console.log('Updated loggedInUser:', this.loggedInUser);
    });
  }
}
