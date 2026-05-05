import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  OrderStore,
  PaymentMethod,
  PaymentStep,
} from '../../core/services/order-store';

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

  protected readonly gatewaySteps: {
    id: PaymentStep;
    title: string;
    icon: string;
  }[] = [
    {
      id: 'redirecting',
      title: 'Redirecionamento',
      icon: 'open_in_new',
    },
    {
      id: 'gateway',
      title: 'Ambiente externo',
      icon: 'account_balance_wallet',
    },
    {
      id: 'authorizing',
      title: 'Autorização',
      icon: 'verified_user',
    },
    {
      id: 'returning',
      title: 'Retorno ao app',
      icon: 'keyboard_return',
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

  protected paymentStepClass(step: PaymentStep): string {
    const currentStep = this.store.paymentStep();
    const currentIndex = this.gatewaySteps.findIndex(
      (item) => item.id === currentStep,
    );
    const stepIndex = this.gatewaySteps.findIndex((item) => item.id === step);

    if (currentStep === step) {
      return 'is-current';
    }

    if (currentStep === 'success' || currentIndex > stepIndex) {
      return 'is-done';
    }

    return '';
  }
}
