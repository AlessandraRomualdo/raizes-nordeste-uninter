import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrderStore } from '../../core/services/order-store';

@Component({
  selector: 'app-unidades',
  imports: [RouterLink],
  templateUrl: './unidades.html',
  styleUrl: './unidades.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Unidades {
  protected readonly store = inject(OrderStore);
  private readonly router = inject(Router);

  protected chooseUnit(unitId: string): void {
    this.store.selectUnit(unitId);

    if (this.store.selectedUnit()?.id === unitId) {
      this.router.navigateByUrl('/cardapio');
    }
  }
}
