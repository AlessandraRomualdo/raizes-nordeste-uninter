import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem, OrderStore } from '../../core/services/order-store';

@Component({
  selector: 'app-cardapio',
  imports: [RouterLink],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cardapio implements OnDestroy {
  protected readonly store = inject(OrderStore);
  private readonly router = inject(Router);
  private readonly promotionTimer = window.setInterval(() => {
    this.activePromotionIndex.update((index) => (index + 1) % this.promotions.length);
  }, 2000);

  protected readonly categories = ['Todos', 'Salgados', 'Bebidas', 'Leves', 'Sobremesas'];
  protected readonly promotions = [
    {
      label: 'Campanha da semana',
      title: 'Combo Acarajé + Suco',
      description: 'Ganhe pontos em dobro no programa de fidelidade.',
      price: 'R$ 32',
    },
    {
      label: 'Oferta junina',
      title: 'Waffes + Sorvete',
      description: 'Sobremesa regional com 120 pts extras no resgate.',
      price: 'R$ 29',
    },
  ];
  protected readonly activePromotionIndex = signal(0);
  protected activeCategory = 'Todos';

  constructor() {
    if (!this.store.selectedUnit()) {
      this.router.navigateByUrl('/unidades');
    }
  }

  protected filteredItems(): MenuItem[] {
    if (this.activeCategory === 'Todos') {
      return this.store.availableMenuItems();
    }

    return this.store
      .availableMenuItems()
      .filter((item) => item.category === this.activeCategory);
  }

  protected selectCategory(category: string): void {
    this.activeCategory = category;
  }

  ngOnDestroy(): void {
    window.clearInterval(this.promotionTimer);
  }
}
