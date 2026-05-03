import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderStore } from '../../core/services/order-store';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Perfil {
  protected readonly store = inject(OrderStore);
}
