import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isFormVisible = false;
  isDetailsVisible = false;
  selectedUser: User | null = null;
  loading = true; // Ajoutez une variable pour le chargement

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        console.log('Users loaded:', users);  // Log pour les utilisateurs chargés
        this.users = users;
        this.loading = false;  // Mettre à jour l'état du chargement
      },
      error => {
        console.error('Error loading users:', error);
        this.loading = false;  // Mettre à jour l'état du chargement même en cas d'erreur
      }
    );
  }

  openAddUserForm(): void {
    this.selectedUser = null;
    this.userForm.reset();
    this.isFormVisible = true;
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue(user);
    this.isFormVisible = true;
  }

  viewUserDetails(user: User): void {
    this.selectedUser = user;
    this.isDetailsVisible = true;
  }

  closeForm(): void {
    this.isFormVisible = false;
  }

  closeDetails(): void {
    this.isDetailsVisible = false;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (this.selectedUser && this.selectedUser.id !== undefined) {
        this.userService.updateUser(this.selectedUser.id, formData).subscribe(() => {
          this.loadUsers();
          this.closeForm();
        }, error => {
          console.error('Error updating user:', error);
        });
      } else {
        this.userService.addUser(formData).subscribe(() => {
          this.loadUsers();
          this.closeForm();
        }, error => {
          console.error('Error adding user:', error);
        });
      }
    }
  }
}
