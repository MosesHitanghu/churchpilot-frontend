import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoadingState } from "./components/LoadingState";
import type { Account } from "./lib/api";
import { clearSessionAccount, getSessionAccount } from "./lib/session";
import type { AppThemeMode } from "./theme";

const AppShell = lazy(() => import("./layouts/AppShell").then((module) => ({ default: module.AppShell })));
const LandingPage = lazy(() => import("./pages/LandingPage").then((module) => ({ default: module.LandingPage })));
const AllCashBooks = lazy(() => import("./pages/AllCashBooks").then((module) => ({ default: module.AllCashBooks })));
const EventsPage = lazy(() => import("./pages/EventsPage").then((module) => ({ default: module.EventsPage })));
const RolesPage = lazy(() => import("./pages/AccountAdminsPage").then((module) => ({ default: module.RolesPage })));
const PostsPage = lazy(() => import("./pages/PostsPage").then((module) => ({ default: module.PostsPage })));
const SupportCenterPage = lazy(() => import("./pages/SupportCenterPage").then((module) => ({ default: module.SupportCenterPage })));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage").then((module) => ({ default: module.AdminDashboardPage })));
const LocationDetailPage = lazy(() => import("./pages/DetailPages").then((module) => ({ default: module.LocationDetailPage })));
const CashbookDetailPage = lazy(() => import("./pages/DetailPages").then((module) => ({ default: module.CashbookDetailPage })));
const EventDetailPage = lazy(() => import("./pages/DetailPages").then((module) => ({ default: module.EventDetailPage })));
const PostDetailPage = lazy(() => import("./pages/DetailPages").then((module) => ({ default: module.PostDetailPage })));

type AppProps = {
  themeMode: AppThemeMode;
  onToggleTheme: () => void;
};

function App({ themeMode, onToggleTheme }: AppProps) {
  const initialAccount = useMemo(() => getSessionAccount(), []);
  const [account, setAccount] = useState<Account | null>(initialAccount);

  useEffect(() => {
    if (!account) {
      return undefined;
    }

    const TIMEOUT = 60 * 60 * 1000;
    const THROTTLE = 5_000;

    let timeoutId = window.setTimeout(() => {
      clearSessionAccount();
      setAccount(null);
    }, TIMEOUT);

    let lastReset = Date.now();

    const resetTimer = () => {
      const now = Date.now();
      if (now - lastReset < THROTTLE) return;
      lastReset = now;
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        clearSessionAccount();
        setAccount(null);
      }, TIMEOUT);
    };

    const events = ["click", "keydown", "scroll", "touchstart"];
    events.forEach((eventName) =>
      window.addEventListener(eventName, resetTimer, { passive: true }),
    );

    return () => {
      window.clearTimeout(timeoutId);
      events.forEach((eventName) =>
        window.removeEventListener(eventName, resetTimer),
      );
    };
  }, [account]);

  return (
    <Suspense fallback={<LoadingState minHeight="100vh" />}>
      <Routes>
      <Route
        path="/"
        element={<LandingPage onAuthenticated={setAccount} />}
      />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/login" element={<LandingPage onAuthenticated={setAccount} initialAuthMode="login" />} />
      <Route path="/signup" element={<LandingPage onAuthenticated={setAccount} initialAuthMode="signup" />} />
      <Route
        path="/app"
        element={
          account ? (
            <AppShell
              account={account}
              onLogout={() => setAccount(null)}
              themeMode={themeMode}
              onToggleTheme={onToggleTheme}
              onAccountUpdated={setAccount}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route index element={<LocationDetailPage />} />
        <Route path="posts" element={<PostsPage account={account as Account} />} />
        <Route path="financial" element={<AllCashBooks account={account as Account} />} />
        <Route path="events" element={<EventsPage account={account as Account} />} />
        <Route path="support" element={<SupportCenterPage account={account as Account} />} />
        <Route path="roles" element={<RolesPage account={account as Account} />} />
        <Route path="admins" element={<Navigate to="/app/roles" replace />} />
        <Route path="account-managers" element={<Navigate to="/app/roles" replace />} />
        <Route path="locations/:locationId" element={<LocationDetailPage />} />
        <Route path="cashbooks/:cashbookId" element={<CashbookDetailPage />} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
        <Route path="posts/:postId" element={<PostDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to={account ? "/app" : "/"} replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
