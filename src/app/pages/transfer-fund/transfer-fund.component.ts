import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Transactions, User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrl: './transfer-fund.component.scss'
})
export class TransferFundComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  private contactService = inject(ContactService)
  private userService = inject(UserService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  user = this.userService.getLoggedInUserFromStorage()
  destroySubject$ = new Subject<void>()
  transferAmount: number = 0;
  private formBuilder = inject(FormBuilder)
  private contactId: string = '';
  isMsg: boolean = false
  msg: string = ''
  contact!: Contact
  


  destroySubject = new Subject<void>()
  constructor(
  ) {
    this.contactForm = this.formBuilder.group({
      coins: null,
    });
  }




  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroySubject$),
    ).subscribe(params => {
      console.log('Received ID:', params['id']);
      this.contactId = params['id'];
      if (this.contactId) {
        this.contactService.getContactById(this.contactId).subscribe(contact => {
          console.log('contact:', contact);
          this.contact=contact;
          // this.contactForm.patchValue({ coins: contact.coins }); // Update form with coins value
        });
      }
    });
  }
  onSubmit() {
    if (this.contactForm.valid && this.user!.coins>0) {
      const transactions: Transactions = {
        toId: this.contact._id,
        from: this.user!.name,
        to: this.contact!.name,
        coins: this.contactForm.value.coins,
        at:new Date()
      };
      const updatedCoins = this.contactForm.value.coins;

      if (this.contactId) {
        
        this.contactService.getContactById(this.contactId).subscribe(contact => {
          console.log('contact:', contact);
          // this.contactForm.patchValue({ coins: contact.coins });
          console.log('updatedCoinsd:', updatedCoins)
          console.log('contact.coins:', contact.coins)

          contact.moves!.unshift(transactions);
          const updatedContact: Contact = {
            _id: this.contactId,
            moves: contact.moves,
            name: contact.name || '',
            email: contact.email || '',
            phone: contact.phone || '',
            coins: +contact.coins+ +updatedCoins,


          };
          // (this.contact!.moves as Transactions[]).push(transactions);
          this.contactService.saveContact(updatedContact).subscribe({
            error: (err) => console.log('Contact update error:', err),
          });
        });
      }
      
      if (this.user) {
        this.user.coins -= updatedCoins;
        (this.user.moves as Transactions[]).unshift(transactions);
        this.userService.saveLoggedInUser(this.user as User)
        this.userService.save(this.user).subscribe
        ({
          error: (err) => console.log('User update error:', err),
          complete: () => this.onBack()
        });

      }
      
    }
    else{this.onFailed()

    }
  }
  onBack = () => {
    if (!this.isMsg) {
      this.isMsg = true;
      this.msg = 'Transaction Done';
      setTimeout(() => {
        this.isMsg = false;
        this.router.navigateByUrl('contact');
      }, 2000);
    }
  };
  onFailed = () => {
    if (!this.isMsg) {
      this.isMsg = true;
      this.msg = 'Transaction Failed';
      setTimeout(() => {
        this.isMsg = false;
        this.router.navigateByUrl('contact');
      }, 2000);
    }
  };
  onClose(){
    this.router.navigateByUrl('contact');
  }
  


  ngOnDestroy(): void {

  }
  showMes() {

  }


}



















//  export class TransferFundComponent implements OnInit, OnDestroy {
  // private contactService = inject(ContactService)
  // private userService = inject(UserService)
  // private router = inject(Router)
  // private route = inject(ActivatedRoute)
  // user = this.userService.getLoggedInUserFromStorage()
  // transferAmount:number = 0
  // private formBuilder = inject(FormBuilder)
  // private contactId: string = '';
  // isMsg: boolean = false
  // msg: string = ''
  // contact!: Contact
  // destroySubject$ = new Subject<void>()
  // contact = this.contactService.getEmptyContact()
  // constructor(
  //   ) {
  //     this.contactForm = this.formBuilder.group({
  //       coins: null,
  //     });
  //   }
//   ngOnInit(): void {
//     console.log('user', this.user)
//     this.route.params
//       .pipe(
//         takeUntil(this.destroySubject$),
//         map(params => params['id']),
//         // filter(id => id),
//         tap((id)=>console.log('id', id)),
//         switchMap(id => this.contactService.getContactById(id))
//       )
//       .subscribe(contact => {
//         this.contact = contact
//       })
//   }
//   onTransferCoin(val: number) {
//     console.log('val', val)
//     const transactions: Transactions = {
//       toId: this.contact._id,
//       from: this.user!.name,
//       to: this.contact!.name,
//       coins: val,
//       at:new Date()
//     }
//     if (this.user && this.user.coins >= val) {
//       this.user.coins -= val,
//       (this.user.moves as Transactions[]).unshift(transactions)
//       console.log('this.user', this.user)
//       this.contact.coins! += val
//       console.log('this.contact', this.contact)
//       this.contactService.saveContact(this.contact as Contact)
//             this.userService.save(this.user as User)
//             this.userService.saveLoggedInUser(this.user as User)
//             this.router.navigateByUrl('contact')
//     }
//   }
//   ngOnDestroy(): void {
//     this.destroySubject$.next()
//   }
// }