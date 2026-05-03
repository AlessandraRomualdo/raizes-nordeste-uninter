import { ChangeDetectionStrategy, Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderStore } from '../../core/services/order-store';

@Component({
  selector: 'app-pedidos',
  imports: [RouterLink],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pedidos implements OnDestroy {
  protected readonly store = inject(OrderStore);
  protected readonly remainingSeconds = signal(12 * 60 + 45);
  protected readonly countdown = computed(() => {
    const seconds = this.remainingSeconds();
    const minutesPart = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsPart = (seconds % 60).toString().padStart(2, '0');

    return `${minutesPart}:${secondsPart}`;
  });
  private readonly countdownTimer = window.setInterval(() => {
    this.remainingSeconds.update((seconds) => Math.max(seconds - 1, 0));
  }, 1000);

  protected orderItems() {
    return this.store.activeOrder()?.items ?? [];
  }

  ngOnDestroy(): void {
    window.clearInterval(this.countdownTimer);
  }
}
