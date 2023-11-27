import { Component, OnDestroy, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, filter, Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 


@Component({
  selector: 'app-contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrl: './contact-edit-page.component.scss'
})
export class ContactEditPageComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  private contactId: string = '';
  private contactService = inject(ContactService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private formBuilder= inject (FormBuilder )
  // contact = this.contactService.getEmptyContact()

  destroySubject = new Subject<void>()
  constructor(
   
    
  ) {}



  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]], // Validators should be in an array
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{9,10}$')]], // Validators in an array
    });
    


    this.route.params.pipe(
      takeUntil(this.destroySubject),
      map(params => {
        console.log('Received ID:', params['id']);
        this.contactId = params['id']
        return params['id'];
      }),
      filter(id => id),
      switchMap(id => this.contactService.getContactById(id))
    ).subscribe((contact) => {
      console.log('contact:', contact)
      this.contactForm.patchValue(contact); 
    });
    
  }
  ngOnDestroy(): void {
    this.destroySubject.next()
  }
  onSaveContact() {
    if (this.contactForm.valid) {
      const updatedContact: Contact = { ...this.contactForm.value, _id: this.contactId }
      console.log('updatedContact:', updatedContact)
      this.contactService.saveContact(updatedContact).subscribe({
        next: this.onBack,
        error: (err) => console.log('err:', err),
      });
    }
  }

  onBack = () => {
    this.router.navigateByUrl('contact');
  };
}
