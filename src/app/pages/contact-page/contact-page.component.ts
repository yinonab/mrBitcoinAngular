import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit, OnDestroy {
  contactService=inject(ContactService)
  contacts$:Observable<Contact[]>=this.contactService.contacts$;
 
  ngOnInit(): void {
     
  
  }
  ngOnDestroy(): void {
    
  }
  
}
