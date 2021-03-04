import { Component, OnInit } from '@angular/core';
import User from './models/user';
import { MessageService } from './services/message.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  constructor(public messageService: MessageService, public accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
  }

  update() {
    this.accountService.update();
  }

  delete() {
    this.accountService.delete();
  }

  showEmail() : string {
    this.user= this.accountService.userValue;
    if (this.user==null) return "";
    return this.user.email;
  }

  showUserName() : string {
    if (this.user==null) return "";
    return this.user.nome;
  }

  userFunc() : number {
    if (this.user==null) return 0;
    return this.user.func;
  }

  title = 'Optimização e Planeamento de Transportes';
}
