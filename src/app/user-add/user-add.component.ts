import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: ''  // Initialisation de la propriété password
  };

  constructor(private userService: UserService, private router: Router) { }

  addUser(): void {
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
