import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import Home from "./pages/Home";
import ArtworkDetail from "./pages/ArtworkDetail";
import NotFound from "@/pages/NotFound";
import Exhibitions from "./pages/Exhibitions";
import Commissions from "./pages/Commissions";
import PublicArt from "./pages/PublicArt";
import RepurposedGlass from "./pages/RepurposedGlass";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work/exhibitions" component={Exhibitions} />
      <Route path="/work/commissions" component={Commissions} />
      <Route path="/work/public-art" component={PublicArt} />
      <Route path="/work/repurposed-glass" component={RepurposedGlass} />
      <Route path="/work/:id" component={ArtworkDetail} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
