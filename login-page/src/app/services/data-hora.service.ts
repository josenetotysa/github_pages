import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class DataHoraService {

  getCurrentDateTime(): Date {
    return new Date();
  }

  getCurrentDateTimeFormatted(): string {
    const now = this.getCurrentDateTime();
    return format(now, 'HH:mm - dd/MM/yyyy', { locale: ptBR });
  }
}