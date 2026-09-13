import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { Intro, SiteShell, type CartLine } from '@/components/site-shell';
import { HomePage } from '@/pages/home';
import { MenuPage } from '@/pages/menu';
import { BranchesPage } from '@/pages/branches';
import { ReviewsPage } from '@/pages/reviews';
import { ContactPage } from '@/pages/contact';
import type { MenuItem } from '@/data/content';

const queryClient = new QueryClient();

function Router() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const add = (item: MenuItem) => setCart(lines => {
    const found = lines.find(line => line.id === item.id);
    return found ? lines.map(line => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line) : [...lines, { ...item, quantity: 1 }];
  });
  const change = (id: string, amount: number) => setCart(lines => lines.flatMap(line => line.id === id ? (line.quantity + amount > 0 ? [{ ...line, quantity: line.quantity + amount }] : []) : [line]));
  const remove = (id: string) => setCart(lines => lines.filter(line => line.id !== id));
  const clear = () => setCart([]);
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <SiteShell cart={cart} add={add} change={change} remove={remove} clear={clear}>
        <Switch>
          <Route path="/" component={() => <HomePage add={add} />} />
          <Route path="/menu" component={() => <MenuPage add={add} />} />
          <Route path="/branches" component={BranchesPage} />
          <Route path="/reviews" component={ReviewsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </SiteShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Intro />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
