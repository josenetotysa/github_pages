import { Component, Inject, Injectable, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página:';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';

  override getRangeLabel: (page: number, pageSize: number, length: number) => string =
    (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
}

@Component({
  selector: 'app-invalid-numbers-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatFormFieldModule, MatPaginator, MatPaginatorModule],
  templateUrl: './invalid-numbers-modal.component.html',
  styleUrl: './invalid-numbers-modal.component.scss'
})
export class InvalidNumbersModalComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['index', 'realnumber', 'virtualnumber'];  // Colunas da tabela
  dataSource = new MatTableDataSource<{ realnumber: string, virtualnumber: string }>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Recebendo dados do modal e atribuindo ao dataSource
  ngOnInit(): void {
    if (this.data && this.data.invalidNumbers) {
      this.dataSource.data = this.data.invalidNumbers;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Método de filtro (opcional)
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Atualizando o filtro para garantir que o retorno seja booleano
    this.dataSource.filterPredicate = (data: { realnumber: string, virtualnumber: string }, filter: string): boolean => {
      const realNumberMatch = data.realnumber.toLowerCase().includes(filter);
      const virtualNumberMatch = data.virtualnumber ? data.virtualnumber.toLowerCase().includes(filter) : false;
      return realNumberMatch || virtualNumberMatch;
    };

    this.dataSource.filter = filterValue;
  }

  // Fechar o modal
  onCloseClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<InvalidNumbersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}