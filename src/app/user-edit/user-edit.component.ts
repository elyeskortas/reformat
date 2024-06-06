import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  updateUser(): void {
    if (this.user) {
      this.userService.updateUser(this.user.id!, this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
