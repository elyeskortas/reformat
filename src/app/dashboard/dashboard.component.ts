// components/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CandidatService } from '../services/candidat.service';
import { ElecteurService } from '../services/electeur.service';
import { ElectionService } from '../services/election.service';
import { ResultatService } from '../services/resultat.service';
import { Resultat } from '../models/resultat.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCandidats: number = 0;
  totalElecteurs: number = 0;
  totalElections: number = 0;
  resultats: Resultat[] = [];

  constructor(
    private candidatService: CandidatService,
    private electeurService: ElecteurService,
    private electionService: ElectionService,
    private resultatService: ResultatService
  ) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadStatistics().then(() => {
      this.generateChart();
      this.getLastElectionResults();
    });
  }
  
  async loadStatistics(): Promise<void> {
    try {
      const candidatsResponse = await this.candidatService.getTotalCandidats().toPromise();
      console.log('Réponse des candidats:', candidatsResponse);
  
      const electeursResponse = await this.electeurService.getTotalElecteurs().toPromise();
      console.log('Réponse des électeurs:', electeursResponse);
  
      const electionsResponse = await this.electionService.getTotalElections().toPromise();
      console.log('Réponse des élections:', electionsResponse);
  
      // Assigner les valeurs seulement si les réponses sont des nombres
      if (typeof candidatsResponse === 'number') {
        this.totalCandidats = candidatsResponse;
      }
      if (typeof electeursResponse === 'number') {
        this.totalElecteurs = electeursResponse;
      }
      if (typeof electionsResponse === 'number') {
        this.totalElections = electionsResponse;
      }
    } catch (error) {
      console.error('Une erreur est survenue lors du chargement des statistiques :', error);
    }
  }

  getLastElectionResults(): void {
    this.resultatService.getLastElectionResultats()
      .subscribe(resultats => this.resultats = resultats);
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
  }}
