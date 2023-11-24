import { Component, OnInit, inject } from '@angular/core';
import { ContactFilter } from '../../models/contact.model';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit {
  contactService = inject(ContactService);
  subscription!: Subscription
  filterBy!: ContactFilter
  filterSubject$ = new Subject()

  ngOnInit(): void {
    this.contactService.filterBy$
      .subscribe(filterBy => {
        console.log('filterBy:', filterBy)
        this.filterBy = filterBy

      })
    this.filterSubject$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.contactService.setFilterBy(this.filterBy)
    })
  }
  onSetFilter(val: string) {
    this.filterSubject$.next(val)
    
    console.log('val', val)
    console.log('this.filter:', this.filterBy)
  }
}
