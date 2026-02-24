import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SMTModule from './pages/SMTModule';
import ICTModule from './pages/ICTModule';
import PriceActionModule from './pages/PriceActionModule';
import IndicatorsModule from './pages/IndicatorsModule';

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const smtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/smt',
  component: SMTModule,
});

const ictRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ict',
  component: ICTModule,
});

const priceActionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/price-action',
  component: PriceActionModule,
});

const indicatorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/indicators',
  component: IndicatorsModule,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  smtRoute,
  ictRoute,
  priceActionRoute,
  indicatorsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
