import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Transactions, User } from '../../models/user';
import { BitcoinService } from '../../services/bitcoin.service';
import { Subscription, Observable, switchMap, map } from 'rxjs'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  userService = inject(UserService)
  bitCoinService = inject(BitcoinService)
  user$: Observable<User> | null = null;
  coins: number = 0
  rate: string = ''
  private route = inject(ActivatedRoute)
  userMoves: Transactions[] = []
  user = this.userService.getLoggedInUserFromStorage()


  ngOnInit(): void {

    this.getUserCoins()
    this.getUserMoves()
    console.log('this.userMoves:', this.userMoves)

  }

  ngOnDestroy(): void {

  }
  getUserMoves() {

    this.userMoves = this.user!.moves.slice(0, 3)
  }
  // async ngOnInit(): Promise<void> {
  //   this.contact$ = this.route.params.pipe(
  //     switchMap(params => this.contactService.getContactById(params['id']))
  //   )
  // }

  async getUserCoins(): Promise<void> {
    this.route.params.subscribe(params => {
      const userId = params['id']; // Fetch 'id' from the route params
      this.user$ = this.userService.getById(userId); // Assign observable to user$
      this.user$.subscribe((user: User) => {
        this.coins = user.coins; // Access 'coins' after the user object is emitted
        this.setRateCoins();
      });
    });
  }

  // async getUserCoinsd(): Promise<void> {
  //   this.user = this.userService.getById('123').subscribe
  //   this.coins = user.coins

  //   this.setRateCoins()
  // }


  setRateCoins() {
    this.bitCoinService.getRate(this.coins).subscribe(
      rate => {
        if (rate !== null && rate !== undefined && rate !== '') {
          this.rate = rate.toString()
        } else {
          console.log('Rate is empty or invalid');
        }
      },
      error => {
        console.error('Error fetching rate:', error);
      }
    );
  }

}
