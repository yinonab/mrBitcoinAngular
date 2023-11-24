import { Injectable } from '@angular/core';
import { User, UserFilter } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { storageService } from './async-storage.service';
import { catchError, retry, tap, map, take } from 'rxjs/operators';



const ENTITY = 'users'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

    const users = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!users || users.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createUsers()))
    }
  }
  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable()
  private _filterBy$ = new BehaviorSubject<UserFilter>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable()

  public query() {

    return from(storageService.query<User>(ENTITY))
      .pipe(
        tap(users => {
          const filterBy = this._filterBy$.value
          console.log('filterBy:', filterBy)
          users = users.filter(user => user.name.toLowerCase().includes(filterBy.term.toLowerCase()))
          this._users$.next(users)

        }),
        retry(3),
        catchError(this._handleError)
      )
  }
  public getById(userId: string): Observable<User> {
    return from(storageService.get<User>(ENTITY, userId))
      .pipe(
        retry(2),
        catchError(this._handleError)
      )

  }
  public setFilterBy(filterBy: UserFilter) {
    this._filterBy$.next(filterBy)
    this.query().pipe(take(1)).subscribe()
}


  private _createUsers() {
    const users: User[] = [
      {
        _id: '123',
        name: 'Penrose',
        coins: 100,
        moves: []
      },
      {
        _id: '124',
        name: 'Bobo',
        coins: 100,
        moves: []
      },
      {
        _id: '125',
        name: 'Gertrude',
        coins: 100,
        moves: []
      },
      {
        _id: '126',
        name: 'Popovich',
        coins: 100,
        moves: []
      },
    ];
    console.log('this.users:', users)
    return users
  }
  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }
}
