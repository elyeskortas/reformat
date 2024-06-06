import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultat } from '../models/resultat.model';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ResultatService {
  private baseUrl = 'https://127.0.0.1:8000/api/resultats';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    const tokenObject = localStorage.getItem('token');
    if (!tokenObject) {
      console.error('Token JWT non trouvé');
      throw new Error('Token JWT non trouvé');
    }
    const parsedToken = JSON.parse(tokenObject);
    return parsedToken.token; // Assuming the actual token is stored in the 'token' field
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllResultats(): Observable<Resultat[]> {
    const headers = this.getHeaders();
    return this.http.get<Resultat[]>(this.baseUrl, { headers });
  }

  getResultatById(id: number): Observable<Resultat> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Resultat>(url, { headers });
  }

  createResultat(resultat: Resultat): Observable<Resultat> {
    const headers = this.getHeaders();
    return this.http.post<Resultat>(this.baseUrl, resultat, { headers });
  }

  updateResultat(id: number, resultat: Resultat): Observable<Resultat> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Resultat>(url, resultat, { headers });
  }

  deleteResultat(id: number): Observable<void> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  getResultsByElection(electionId: number): Observable<Resultat[]> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}?electionId=${electionId}`;
    return this.http.get<Resultat[]>(url, { headers });
  }

  visualizeResults(resultats: Resultat[]): void {
    const labels = resultats.map(resultat => resultat.candidat);
    const data = resultats.map(resultat => resultat.totalVotes);

    // Récupérer l'élément HTML
    const ctx = document.getElementById('resultatsChart');

    // Vérifier si l'élément HTML existe
    if (ctx instanceof HTMLCanvasElement) {
      // Créer le graphique
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre de votes',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
    } else {
      console.error('Impossible de trouver l\'élément HTML pour le graphique.');
    }
  }

  generateCharts(): Observable<any> {
    // Ajoutez le code pour la génération de graphiques ici
    return new Observable(observer => {
      // Récupérer les résultats
      this.getAllResultats().subscribe(resultats => {
        // Appeler la méthode pour visualiser les résultats
        this.visualizeResults(resultats);
        // Renvoyer une confirmation que les graphiques ont été générés
        observer.next('Les graphiques ont été générés avec succès');
        observer.complete();
      }, error => {
        // En cas d'erreur, renvoyer l'erreur
        observer.error('Une erreur est survenue lors de la récupération des résultats');
      });
    });
  }

  downloadResultsAsCSV(electionId: number): Observable<Blob> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/download/csv?electionId=${electionId}`;
    return this.http.get(url, { headers, responseType: 'blob' });
  }

  getLastElectionResultats(): Observable<Resultat[]> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/last`;
    return this.http.get<Resultat[]>(url, { headers });
  }}