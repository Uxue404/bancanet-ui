import {Injectable, Type} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class TransferenciaService {
  private apiUrl = 'https://bancanet.vercel.app/transactions'

  constructor(
    private http: HttpClient,
    private authService: AuthService,) { }
  hacerTransferencia(data: any): Observable<TransferenciaResponse> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<TransferenciaResponse>(this.apiUrl, data, { headers });
  }

  abrirPDFBase64(base64Data: string) {
    const pdfData = base64Data.replace('data:application/pdf;base64,', '');
    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const pdfUrl = window.URL.createObjectURL(blob);
    window.open(pdfUrl, '_blank');

    setTimeout(() => {
      window.URL.revokeObjectURL(pdfUrl);
    }, 100);
  }

  generarTokenTrans(data: any): Observable<string> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<{ token: string }>(`${this.apiUrl}/generate-token`, data, { headers }).pipe(
      map(response => response.token)
    );
  }
}
interface TransferenciaResponse {
  pdfBase64: string;
  message?: string;
}
