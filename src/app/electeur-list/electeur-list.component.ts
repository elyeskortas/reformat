import { Component, OnInit } from '@angular/core';
import { ElecteurService } from '../services/electeur.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-electeur-list',
  templateUrl: './electeur-list.component.html',
  styleUrls: ['./electeur-list.component.css']
})
export class ElecteurListComponent implements OnInit {
  electeurs: any[] = [];

  constructor(private electeurService: ElecteurService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getElecteurs();
  }

  getElecteurs(): void {
    this.electeurService.getAllElecteurs().subscribe(
      electeurs => {
        this.electeurs = electeurs;
      },
      error => {
        console.error('Error fetching electeurs:', error);
      }
    );
  }
}
