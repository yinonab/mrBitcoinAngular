import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  private userService = inject(UserService)
  // user$: Observable<User | string> | null = null;
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  userName: string = '';
  private userId: string = '';


  ngOnInit(): void {
  }

  async getUserByName(name: string): Promise<void> {
    this.userService.getByName(name).subscribe((result: User | string) => {
      if (typeof result === 'string') {
        console.log('User not found, saving...');
        this.userService.saveUser(name).subscribe((newUser: User | string) => {
          if (typeof newUser !== 'string') {
            const user = newUser as User;
            this.userService.saveLoggedInUser(user);
            this.getUserAndNavigate(user._id);
          } else {
            console.log('Error creating user');
          }
        });
      } else {
        const user = result as User;
        console.log('User exists:', user);
        this.userService.saveLoggedInUser(user);
        this.getUserAndNavigate(user._id); // Navigate if user already exists
      }
    });
  }
  private getUserAndNavigate(name: string): void {
    this.userService.getByName(name).subscribe((user: User | string) => {
      if (typeof user !== 'string') {
        const userId = user._id; 
      
        this.router.navigate(['home', userId]); // Pass userId directly as the parameter
      }
    });
  }
  


  onSubmit(): void {
    if (this.userName.trim() !== '') {
      this.getUserByName(this.userName.trim());
    }
  }
}


