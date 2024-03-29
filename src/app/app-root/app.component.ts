import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription, take } from 'rxjs';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'meBitcoin';
  private userService=inject(UserService)
  private contactService=inject(ContactService)
  subscription!: Subscription

ngOnInit(): void {
  
  this.subscription = this.userService.query()
  .pipe(take(1))
  .subscribe({
    error: err => console.log('err:', err)
  })
  this.subscription = this.contactService.query()
  .pipe(take(1))
  .subscribe({
    error: err => console.log('err:', err)
  })
  
            
  
}
ngOnDestroy(): void {
  this.subscription?.unsubscribe?.()
}


}
