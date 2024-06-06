export interface Candidat {
  id: number;
  nom: string;
  // autres propriétés du candidat
}

export interface Resultat {
  candidat: Candidat;
  totalVotes: number;
  // autres propriétés du résultat
}
