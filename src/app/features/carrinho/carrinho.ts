import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderStore } from '../../core/services/order-store';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carrinho {
  protected readonly store = inject(OrderStore);
}
