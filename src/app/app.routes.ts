import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/main-layout/main-layout').then(
        (m) => m.MainLayout,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./features/home/home').then(
            (m) => m.Home,
          ),
      },
      {
        path: 'cadastro',
        loadComponent: () =>
          import('./features/cadastro/cadastro').then(
            (m) => m.Cadastro,
          ),
      },
      {
        path: 'unidades',
        loadComponent: () =>
          import('./features/unidades/unidades').then(
            (m) => m.Unidades,
          ),
      },
      {
        path: 'cardapio',
        loadComponent: () =>
          import('./features/cardapio/cardapio').then(
            (m) => m.Cardapio,
          ),
      },
      {
        path: 'carrinho',
        loadComponent: () =>
          import('./features/carrinho/carrinho').then(
            (m) => m.Carrinho,
          ),
      },
      {
        path: 'pagamento',
        loadComponent: () =>
          import('./features/pagamento/pagamento').then(
            (m) => m.Pagamento,
          ),
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./features/pedidos/pedidos').then(
            (m) => m.Pedidos,
          ),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./features/perfil/perfil').then(
            (m) => m.Perfil,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
