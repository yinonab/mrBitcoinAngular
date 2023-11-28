import { Component, Input, OnInit } from '@angular/core';
import { Transactions } from '../../models/user'; 

@Component({
  selector: 'app-moves-list',
  templateUrl: './moves-list.component.html',
  styleUrl: './moves-list.component.scss'
})
export class MovesListComponent implements OnInit {
  @Input() move!: Transactions

  ngOnInit(): void {
    console.log('this.move:', this.move)
  }

}
