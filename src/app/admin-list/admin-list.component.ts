import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  admins: Admin[] = [];
  newAdmin: Admin = { id: 0, name: '', email: '', role: '' }; // Nouvel admin à ajouter
  editingAdminId: number | null = null; // ID de l'admin en cours d'édition

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAllAdmins()
      .subscribe(admins => this.admins = admins);
  }

  addAdmin(): void {
    this.adminService.addAdmin(this.newAdmin)
      .subscribe(admin => {
        this.admins.push(admin);
        this.newAdmin = { id: 0, name: '', email: '', role: '' }; // Réinitialise le nouvel admin après l'ajout
      });
  }

  editAdmin(admin: Admin): void {
    this.editingAdminId = admin.id; // Met à jour l'ID de l'admin en cours d'édition
  }

  saveAdminChanges(updatedAdmin: Admin): void {
    this.adminService.updateAdmin(updatedAdmin) // Utilise la méthode updateAdmin du service
      .subscribe(() => {
        // Met à jour l'admin dans la liste avec les données mises à jour
        const index = this.admins.findIndex(a => a.id === updatedAdmin.id);
        if (index !== -1) {
          this.admins[index] = updatedAdmin;
        }
        this.editingAdminId = null; // Termine le mode édition
      });
  }

  cancelEdit(): void {
    this.editingAdminId = null; // Annule le mode édition
  }

  deleteAdmin(adminId: number): void {
    this.adminService.deleteAdmin(adminId)
      .subscribe(() => {
        // Supprime l'admin de la liste côté client
        this.admins = this.admins.filter(admin => admin.id !== adminId);
      });
  }
}
