import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CandidatService } from '../services/candidat.service';
import { ElecteurService } from '../services/electeur.service';
import { ElectionService } from '../services/election.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCandidats: number = 0;
  totalElecteurs: number = 0;
  totalElections: number = 0;

  constructor(
    private candidatService: CandidatService,
    private electeurService: ElecteurService,
    private electionService: ElectionService
  ) { }

  ngOnInit(): void {
    this.loadStatistics();
    this.generateChart();
  }

  loadStatistics(): void {
    this.candidatService.getTotalCandidats().subscribe(count => this.totalCandidats = count);
    this.electeurService.getTotalElecteurs().subscribe(count => this.totalElecteurs = count);
    this.electionService.getTotalElections().subscribe(count => this.totalElections = count);
  }

  generateChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Candidats', 'Électeurs', 'Élections'],
        datasets: [{
          label: 'Statistiques globales',
          data: [this.totalCandidats, this.totalElecteurs, this.totalElections],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

