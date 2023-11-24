import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Subscription, Observable, switchMap, map } from 'rxjs'

@Component({
  selector: 'app-contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit {
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private contactService = inject(ContactService)
  contact$: Observable<Contact> | null = null

  @Input() selectedContact: Contact | null = null;
  @Output() unsSelectedContact = new EventEmitter


  async ngOnInit(): Promise<void> {
    this.contact$ = this.route.params.pipe(
      switchMap(params => this.contactService.getContactById(params['id']))
    )
  }
  goBackToList() {
    this.router.navigateByUrl('/contact')
  }
  // onSelectContact(contactId: string) {
  //   console.log('this.contacts:', this.contacts)
  //   this.contactService.getContactById(contactId)
  //     .subscribe(
  //       (contact: Contact) => {
  //         this.selectedContact = contact;
  //         console.log('Retrieved contact:', this.selectedContact);
  //       },
  //       error => console.error('Error retrieving contact:', error)
  //     );
  // }

}
