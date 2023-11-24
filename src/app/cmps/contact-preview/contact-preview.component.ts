import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrl: './contact-preview.component.scss'
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact!: Contact
  @Output() remove = new EventEmitter()

  ngOnInit(): void {
  }
  onRemoveContact() {
    this.remove.emit(this.contact._id)
}
  // onSelectUser() {
  //   this.select.emit(this.contact._id)
  //   console.log(this.contact._id);
    
  // }
}
