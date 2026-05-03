import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrderStore, PaymentMethod } from '../../core/services/order-store';

@Component({
  selector: 'app-pagamento',
  imports: [RouterLink],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagamento {
  protected readonly store = inject(OrderStore);
  private readonly router = inject(Router);

  protected readonly methods: {
    id: PaymentMethod;
    title: string;
    subtitle: string;
    icon: string;
  }[] = [
    {
      id: 'card',
      title: 'Cartão de Crédito',
      subtitle: 'Final 4429 - Expira 08/26',
      icon: 'credit_card',
    },
    {
      id: 'pix',
      title: 'Pix (Copia e Cola)',
      subtitle: 'Confirmação instantânea',
      icon: 'qr_code_2',
    },
  ];

  protected async confirmPayment(forceFailure = false): Promise<void> {
    const approved = await this.store.confirmPayment(forceFailure);

    if (approved) {
      setTimeout(() => {
        this.router.navigateByUrl('/pedidos');
      }, 450);
    }
  }
}
