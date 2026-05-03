import { computed, Injectable, signal } from '@angular/core';

export type PaymentMethod = 'card' | 'pix';
export type PaymentState = 'idle' | 'loading' | 'success' | 'error';
export type FulfillmentMethod = 'pickup' | 'delivery';

export interface Unit {
  id: string;
  name: string;
  city: string;
  address: string;
  distance: string;
  hours: string;
  format: string;
  isOpen: boolean;
  availableProductIds: string[];
  highlight: string;
}

// Produto exibido no cardápio.
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  points: number;
  image: string;
  badge?: string;
}

// Item do carrinho, com produto e quantidade.
export interface CartItem {
  product: MenuItem;
  quantity: number;
}

// Pedido finalizado após pagamento aprovado.
export interface Order {
  code: string;
  createdAt: Date;
  items: CartItem[];
  total: number;
  method: PaymentMethod;
  unit: Unit;
  fulfillment: FulfillmentMethod;
  deliveryFee: number;
}

@Injectable({ providedIn: 'root' })
export class OrderStore {
  // Dados mockados das unidades disponíveis para pedido.
  readonly units = signal<Unit[]>([
    {
      id: 'recife-centro',
      name: 'Recife Centro',
      city: 'Recife - PE',
      address: 'Rua da Aurora, 120 - Boa Vista',
      distance: '1,8 km',
      hours: 'Aberta até 22:00',
      format: 'Cozinha completa',
      isOpen: true,
      availableProductIds: ['acarajé', 'suco', 'salada', 'sorvete', 'waffes'],
      highlight: 'Menu completo e retirada rápida.',
    },
    {
      id: 'ponta-negra',
      name: 'Ponta Negra',
      city: 'Natal - RN',
      address: 'Av. Roberto Freire, 812 - Ponta Negra',
      distance: '3,2 km',
      hours: 'Aberta até 21:30',
      format: 'Loja compacta',
      isOpen: true,
      availableProductIds: ['acarajé', 'suco', 'sorvete'],
      highlight: 'Operação reduzida com os campeões da casa.',
    },
    {
      id: 'caruaru-shopping',
      name: 'Caruaru Shopping',
      city: 'Caruaru - PE',
      address: 'Av. Adjar da Silva Case, 800',
      distance: '7,4 km',
      hours: 'Aberta até 23:00',
      format: 'Período junino',
      isOpen: true,
      availableProductIds: ['acarajé', 'suco', 'waffes'],
      highlight: 'Receitas sazonais e pontos em dobro.',
    },
    {
      id: 'salvador-pituba',
      name: 'Salvador Pituba',
      city: 'Salvador - BA',
      address: 'Rua Amazonas, 45 - Pituba',
      distance: '5,6 km',
      hours: 'Fecha às 20:00',
      format: 'Balcão e pick-up',
      isOpen: false,
      availableProductIds: ['suco', 'salada', 'sorvete'],
      highlight: 'Indisponível para novos pedidos agora.',
    },
  ]);

  // cardápio
  readonly menuItems = signal<MenuItem[]>([
    {
      id: 'acarajé',
      name: 'Acarajé Especial da Casa',
      category: 'Salgados',
      description: 'Vatapá, caruru, camarão e pimenta da casa.',
      price: 24,
      points: 500,
      image: '/acarajé.jpg',
      badge: 'Mais pedido',
    },
    {
      id: 'suco',
      name: 'Suco de Laranja 500ml',
      category: 'Bebidas',
      description: 'Fruta fresca, batido na hora.',
      price: 12,
      points: 250,
      image: '/suco.jpg',
    },
    {
      id: 'salada',
      name: 'Salada Mandacaru',
      category: 'Leves',
      description: 'Folhas, queijo coalho, castanhas e molho de mel.',
      price: 18,
      points: 320,
      image: '/salada.jpg',
      badge: 'Novo',
    },
    {
      id: 'sorvete',
      name: 'Sorvete Napolitano',
      category: 'Sobremesas',
      description: 'Cremoso, artesanal e finalizado com farofa doce.',
      price: 14,
      points: 280,
      image: '/sorvete.jpg',
    },
    {
      id: 'waffes',
      name: 'Waffes de Frutas Vermelhas',
      category: 'Sobremesas',
      description: 'Massa de tapioca, mel de engenho e banana.',
      price: 22,
      points: 420,
      image: '/waffes.jpg',
    },
  ]);

  readonly selectedUnit = signal<Unit | null>(null);
  readonly cart = signal<CartItem[]>([]);
  readonly activeOrder = signal<Order | null>(null);

  readonly selectedPayment = signal<PaymentMethod>('card');
  readonly selectedFulfillment = signal<FulfillmentMethod>('pickup');
  readonly paymentState = signal<PaymentState>('idle');
  readonly paymentMessage = signal('');

  readonly cartCount = computed(() =>
    this.cart().reduce((total, item) => total + item.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.cart().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  readonly deliveryFee = computed(() =>
    this.subtotal() > 0 && this.selectedFulfillment() === 'delivery' ? 6 : 0,
  );

  readonly total = computed(() => this.subtotal() + this.deliveryFee());

  readonly availableMenuItems = computed(() => {
    const unit = this.selectedUnit();

    if (!unit) {
      return [];
    }

    return this.menuItems().filter((item) => unit.availableProductIds.includes(item.id));
  });

  selectUnit(unitId: string): void {
    const nextUnit = this.units().find((unit) => unit.id === unitId);

    if (!nextUnit || !nextUnit.isOpen) {
      return;
    }

    const previousUnit = this.selectedUnit();
    this.selectedUnit.set(nextUnit);

    if (previousUnit?.id !== nextUnit.id) {
      this.cart.set([]);
      this.paymentState.set('idle');
      this.paymentMessage.set('');
    }
  }

  addToCart(product: MenuItem): void {
    this.cart.update((items) => {
      const existing = items.find((item) => item.product.id === product.id);

      if (existing) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  increase(productId: string): void {
    this.cart.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  decrease(productId: string): void {
    this.cart.update((items) =>
      items
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  
  setPaymentMethod(method: PaymentMethod): void {
    this.selectedPayment.set(method);
    this.paymentState.set('idle');
    this.paymentMessage.set('');
  }

  setFulfillment(method: FulfillmentMethod): void {
    this.selectedFulfillment.set(method);
  }

  async confirmPayment(forceFailure = false): Promise<boolean> {
    const unit = this.selectedUnit();

    if (!unit) {
      this.paymentState.set('error');
      this.paymentMessage.set('Escolha uma unidade antes de pagar.');
      return false;
    }

    if (this.cart().length === 0) {
      this.paymentState.set('error');
      this.paymentMessage.set('Seu carrinho está vazio.');
      return false;
    }

    this.paymentState.set('loading');
    this.paymentMessage.set('Enviando pagamento para aprovação...');

    await new Promise((resolve) => setTimeout(resolve, 750));

    if (forceFailure) {
      this.paymentState.set('error');
      this.paymentMessage.set('Pagamento recusado. Tente Pix ou outro cartão.');
      return false;
    }
    const order: Order = {
      code: '#RN-9284',
      createdAt: new Date(),
      items: this.cart().map((item) => ({ ...item })),
      total: this.total(),
      method: this.selectedPayment(),
      unit,
      fulfillment: this.selectedFulfillment(),
      deliveryFee: this.deliveryFee(),
    };

    this.activeOrder.set(order);
    this.cart.set([]);
    this.paymentState.set('success');
    this.paymentMessage.set('Pagamento aprovado. Pedido enviado para a cozinha.');
    return true;
  }

  resetFlow(): void {
    this.cart.set([]);
    this.paymentState.set('idle');
    this.paymentMessage.set('');
  }

  money(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
}
