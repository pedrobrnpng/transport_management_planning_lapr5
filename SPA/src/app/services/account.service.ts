import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserFoundError } from '../helpers/UserFoundError';

import config from '../config';
import User from '../models/user';
import { error } from 'jquery';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email, password) {
    return this.http.post<User>(`${config.mdvurl.apiUrl}Users/Authenticate`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  public logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  public update() {
    this.router.navigate(['/account/update']);
  }

  public updateData(userA: User) {
    var userT;
    this.user.subscribe((user) => userT = user);
    return this.http.put(`${config.mdvurl.apiUrl}Users/` + userT.email, userA).pipe(
      tap((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
      } ))
  }

  public delete() {
    var userT;
    this.user.subscribe((user) => userT = user);
    this.http.delete(`${config.mdvurl.apiUrl}Users/` + userT.email).subscribe(() => {
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/account/login']);
    });
  }

  async register(user: User) {
    var check = await this.getById(user.email);

    if (check.nome==="USER NOT FOUND")
      return await this.http.post(`${config.mdvurl.apiUrl}Users`, user).toPromise();

    return null
  }

  // getAll() {
  //     return this.http.get<User[]>(`${config.mdvurl.apiUrl}/users`);
  // }

  async getById(id: string):Promise<User> {
    return this.http.get<User>(`${config.mdvurl.apiUrl}Users/${id}`).toPromise();
  }

  // delete(id: string) {
  //     return this.http.delete(`${config.mdvurl.apiUrl}/users/${id}`)
  //         .pipe(map(x => {
  //             // auto logout if the logged in user deleted their own record
  //             if (id == this.userValue.email) {
  //                 this.logout();
  //             }
  //             return x;
  //         }));
  // }
}
