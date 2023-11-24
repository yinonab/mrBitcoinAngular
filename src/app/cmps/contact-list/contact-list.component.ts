import { Component, inject, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  @Input() contacts!: Contact[] | null
  // @Output() select = new EventEmitter()
  // selectedContact: Contact | null = null;

  contactService = inject(ContactService)
  ngOnInit(): void {
    console.log('this.contacts:', this.contacts)
  }
  trackByFn(idx: number, selectedContact: Contact) {
    return selectedContact._id
  }
  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe({
      error: err => console.log('err:', err)

    })
  }



  // goBackToList(contact: Contact | null) {
  //   this.selectedContact = contact;
  // }
  // goBackToList(this.router.navigate('/')) {
  // }


}
