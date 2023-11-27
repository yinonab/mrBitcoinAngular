import { Injectable } from '@angular/core';
import { User, UserFilter } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject,of, from, Observable, throwError } from 'rxjs';
import { storageService } from './async-storage.service';
import { catchError, retry, tap, map, take } from 'rxjs/operators';



const ENTITY = 'users'
const LOGGED_IN_USER_KEY = 'loggedInUser';


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

  private loggedInUser: User | null = null;
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();
  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable()
  private _filterBy$ = new BehaviorSubject<UserFilter>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable()

  public query() {

    return from(storageService.query<User>(ENTITY))
      .pipe(
        tap(users => {
          const filterBy = this._filterBy$.value
          // console.log('filterBy:', filterBy)
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
  getByName(userName: string): Observable<User | string> {
    console.log('userName:', userName);
    return from(storageService.get<User>(ENTITY, userName)).pipe(
      map(user => user || 'User not found'),
      catchError(error => {
        console.error('Error fetching user:', error);
        return of('Error fetching user');
      })
    );
  }
  
  public saveUser(name: string) {
    console.log('name:', name);
    let user: Partial<User> = {
      name,
      coins: 100,
      moves: []
    };
    return this._addUser(user as User);
  }
  
  private _addUser(user: User) {
    console.log('user:', user);
    return from(storageService.post(ENTITY, user)).pipe(
      take(1),
      retry(1),
      catchError(this._handleError)
    );
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
  public saveLoggedInUser(user: User): void {
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    this.loggedInUserSubject.next(user);
  }

  public getLoggedInUserFromStorage(): User | null {
    const userJSON = localStorage.getItem(LOGGED_IN_USER_KEY);
    return userJSON ? JSON.parse(userJSON) as User : null;
  }
}


