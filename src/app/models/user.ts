export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password?: string;  // Ajout de la propriété password avec ? pour indiquer qu'elle est optionnelle
}
