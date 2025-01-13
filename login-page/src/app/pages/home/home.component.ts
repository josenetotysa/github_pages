import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; // Importando MatDialog

import { CommonModule } from '@angular/common';

import { InvalidNumbersModalComponent } from './invalid-numbers-modal/invalid-numbers-modal.component';
import { ListPortabilidadeService } from '../../services/portabilidade/list-portabilidade.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  fullname: string = "";
  invalidNumberCount: number = 0;  // Variável para armazenar o número de números inválidos
  invalidNumbers: string[] = [];   // Variável para armazenar o número de números inválidos

  constructor(
    private authService: AuthService, 
    private router: Router,
    private listPortabilidadeService: ListPortabilidadeService, // Injeção do serviço
    private dialog: MatDialog, // Injeção do MatDialog para abrir o modal
    private httpClient: HttpClient // Injeção do HttpClient
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const fullname = sessionStorage.getItem("fullname");
      if (fullname) {
        this.fullname = fullname;
      }
      // Chama o método para obter a contagem de números inválidos
      this.getInvalidVirtualNumbersCount();
    } else {
      console.warn("Usuário não autenticado");
    }
  }

  // Função para fazer a requisição e obter a contagem dos números inválidos usando o serviço
  getInvalidVirtualNumbersCount(): void {
    this.listPortabilidadeService.getInvalidVirtualNumbersCount()
      .subscribe(
        (count: number) => {
          this.invalidNumberCount = count; // Armazena o número de números inválidos
        },
        (error) => {
          console.error('Erro ao obter contagem de números inválidos:', error);
        }
      );
  }


  openInvalidNumbersModal(): void {
    this.listPortabilidadeService.getInvalidVirtualNumbers()
      .subscribe(
        (numbers: any[]) => {  // Aqui, use o tipo correto, por exemplo, 'any[]'
          this.invalidNumbers = numbers;
          const dialogRef = this.dialog.open(InvalidNumbersModalComponent, {
            width: '600px',
            data: { invalidNumbers: this.invalidNumbers }
          });
  
          dialogRef.afterClosed().subscribe((result: any) => {
          });
        },
        (error) => {
          console.error('Erro ao obter números inválidos:', error);
        }
      );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}