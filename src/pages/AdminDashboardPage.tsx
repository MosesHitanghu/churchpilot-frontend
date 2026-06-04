import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArticleIcon from "@mui/icons-material/Article";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import BookIcon from "@mui/icons-material/Book";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaidIcon from "@mui/icons-material/Paid";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TimelineIcon from "@mui/icons-material/Timeline";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { type ReactNode, useEffect, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { SiteFooter } from "../components/SiteFooter";
import { api, getApiErrorMessage, type Subscription, type SupportTicket, type SystemAdmin } from "../lib/api";

type DashboardMetrics = {
  accounts: number;
  locations: number;
  members: number;
  cashbooks: number;
  support_tickets_open: number;
  active_location_subscriptions: number;
  login_devices: number;
};

type AdminAccountSummary = {
  id: string;
  display_name?: string | null;
  title?: string | null;
  email?: string | null;
  phone_number?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  type?: string | null;
  category?: string | null;
  status?: string | null;
  locations: number;
  members: number;
  average_weekly_attendance: number;
  cashbooks: number;
  transactions: number;
  reports: number;
  roles: number;
};

type AdminLocationSummary = {
  id: string;
  title?: string | null;
  type?: string | null;
  city?: string | null;
  district?: string | null;
  country?: string | null;
  status?: string | null;
  branches: number;
  members: number;
  cashbooks: number;
  transactions: number;
  average_weekly_attendance: number;
  average_monthly_attendance?: number;
  reports: number;
  subscription_status?: string | null;
};

const ADMIN_SESSION_KEY = "churchpilot:system-admin";
const drawerWidth = 238;
const closedWidth = 68;

const navItems = [
  { key: "analytics", label: "Analytics", icon: <AnalyticsIcon /> },
  { key: "accounts", label: "Accounts", icon: <BusinessIcon /> },
  { key: "support", label: "Support", icon: <SupportAgentIcon /> },
  { key: "users", label: "Users", icon: <PeopleIcon /> },
  { key: "admins", label: "Admins", icon: <AdminPanelSettingsIcon /> },
  { key: "settings", label: "Settings", icon: <SettingsIcon /> },
  { key: "logs", label: "Logs", icon: <TimelineIcon /> },
] as const;

type AdminSection = (typeof navItems)[number]["key"];

function adminName(admin: SystemAdmin | null) {
  return admin ? [admin.fname, admin.lname].filter(Boolean).join(" ") || admin.email || "System Admin" : "System Admin";
}

function metricText(value?: number | null) {
  return Number(value || 0).toLocaleString();
}

function BorderedDetails({ rows }: { rows: Array<{ icon: ReactNode; label: string; value: ReactNode }> }) {
  return (
    <List dense disablePadding sx={{ border: 1, borderColor: "divider", borderRadius: 1, overflow: "hidden" }}>
      {rows.map((row) => (
        <ListItem key={row.label} divider sx={{ py: 0.8 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>{row.icon}</ListItemIcon>
          <ListItemText primary={row.label} secondary={row.value} slotProps={{ primary: { variant: "caption", color: "text.secondary" }, secondary: { sx: { fontWeight: 800, color: "text.primary" } } }} />
        </ListItem>
      ))}
    </List>
  );
}

export function AdminDashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [section, setSection] = useState<AdminSection>("analytics");
  const [admin, setAdmin] = useState<SystemAdmin | null>(() => {
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? JSON.parse(raw) as SystemAdmin : null;
  });
  const [hasSuperAdmin, setHasSuperAdmin] = useState(true);
  const [authForm, setAuthForm] = useState({ fname: "", lname: "", email: "", password: "", role: "Admin" });
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [subscriptionsEnforced, setSubscriptionsEnforced] = useState(false);
  const [accountApprovalsEnforced, setAccountApprovalsEnforced] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [admins, setAdmins] = useState<SystemAdmin[]>([]);
  const [accounts, setAccounts] = useState<AdminAccountSummary[]>([]);
  const [userAccounts, setUserAccounts] = useState<AdminAccountSummary[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<AdminAccountSummary | null>(null);
  const [actionAccount, setActionAccount] = useState<AdminAccountSummary | null>(null);
  const [accountLocations, setAccountLocations] = useState<AdminLocationSummary[]>([]);
  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null);
  const [replyByTicket, setReplyByTicket] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmError, setDeleteConfirmError] = useState("");
  const [deleteConfirmSaving, setDeleteConfirmSaving] = useState(false);

  const loadBootstrap = () => {
    api.get<{ has_super_admin: boolean }>("/system-admins/bootstrap-status").then((response) => setHasSuperAdmin(response.data.has_super_admin)).catch(() => setHasSuperAdmin(true));
  };

  const loadDashboard = () => {
    if (!admin) {
      return;
    }
    api.get<{ metrics: DashboardMetrics; subscriptions_enforced: boolean; account_approvals_enforced: boolean }>(`/system-admin-dashboard?admin_id=${admin.id}`).then((response) => {
      setMetrics(response.data.metrics);
      setSubscriptionsEnforced(response.data.subscriptions_enforced);
      setAccountApprovalsEnforced(response.data.account_approvals_enforced);
    }).catch(() => undefined);
    api.get<Subscription[]>("/subscriptions").then((response) => setSubscriptions(response.data)).catch(() => setSubscriptions([]));
    api.get<SupportTicket[]>(`/support-tickets?admin_id=${admin.id}`).then((response) => setTickets(response.data)).catch(() => setTickets([]));
    api.get<AdminAccountSummary[]>(`/system-admin-accounts?admin_id=${admin.id}&account_type=Organization`).then((response) => setAccounts(response.data.filter((account) => account.type !== "Personal"))).catch(() => setAccounts([]));
    api.get<AdminAccountSummary[]>(`/system-admin-accounts?admin_id=${admin.id}&account_type=Personal`).then((response) => setUserAccounts(response.data)).catch(() => setUserAccounts([]));
    if (admin.role === "Super Admin") {
      api.get<SystemAdmin[]>(`/system-admins?admin_id=${admin.id}`).then((response) => setAdmins(response.data)).catch(() => setAdmins([]));
    }
  };

  useEffect(() => {
    loadBootstrap();
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [admin?.id]);

  const sectionTitle = navItems.find((item) => item.key === section)?.label || "Analytics";

  useEffect(() => {
    document.title = `ChurchPilot | Admin - ${sectionTitle}`;
  }, [sectionTitle]);

  const submitAuth = async () => {
    setSaving(true);
    setError("");
    try {
      const response = hasSuperAdmin
        ? await api.post<{ admin: SystemAdmin }>("/system-admins/login", { email: authForm.email, password: authForm.password })
        : await api.post<{ admin: SystemAdmin }>("/system-admins/register", { ...authForm, role: "Super Admin" });
      setAdmin(response.data.admin);
      window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(response.data.admin));
      loadBootstrap();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Admin authentication failed"));
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setAdmin(null);
  };

  const addAdmin = async () => {
    if (!admin) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      await api.post("/system-admins/register", { ...authForm, requester_admin_id: admin.id });
      setAuthForm({ fname: "", lname: "", email: "", password: "", role: "Admin" });
      loadDashboard();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Failed to add admin"));
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = async (key: string, value: boolean) => {
    if (!admin) {
      return;
    }
    if (key === "subscriptions_enforced") {
      setSubscriptionsEnforced(value);
    } else {
      setAccountApprovalsEnforced(value);
    }
    await api.patch(`/system-settings/${key}`, { admin_id: admin.id, value: value ? "true" : "false" });
  };

  const sendTicketReply = async (ticket: SupportTicket, status = ticket.status || "In Progress") => {
    if (!admin || !replyByTicket[ticket.id]?.trim()) {
      return;
    }
    await api.post(`/support-tickets/${ticket.id}/messages`, { admin_id: admin.id, message: replyByTicket[ticket.id], status });
    setReplyByTicket((current) => ({ ...current, [ticket.id]: "" }));
    loadDashboard();
  };

  const accountAction = async (action: string) => {
    if (!admin || !actionAccount) {
      return;
    }
    await api.post(`/system-admin-accounts/${actionAccount.id}/action`, { admin_id: admin.id, action });
    setAccountAnchor(null);
    setActionAccount(null);
    loadDashboard();
  };

  const confirmDeleteAccount = async () => {
    if (!admin || !actionAccount) {
      return;
    }
    setDeleteConfirmSaving(true);
    setDeleteConfirmError("");
    try {
      await accountAction("delete");
      setDeleteConfirmOpen(false);
    } catch (requestError) {
      setDeleteConfirmError(getApiErrorMessage(requestError, "Failed to delete account"));
    } finally {
      setDeleteConfirmSaving(false);
    }
  };

  const openAccountLocations = async (account: AdminAccountSummary) => {
    if (!admin) {
      return;
    }
    setSelectedAccount(account);
    setSection("accounts");
    const response = await api.get<{ account: AdminAccountSummary; locations: AdminLocationSummary[] }>(`/system-admin-accounts/${account.id}/locations?admin_id=${admin.id}`);
    setSelectedAccount(response.data.account);
    setAccountLocations(response.data.locations);
  };

  if (!admin) {
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "background.default", p: 2 }}>
        <Paper variant="outlined" sx={{ width: "100%", maxWidth: 460, p: 3 }}>
          <Stack spacing={2}>
            <AdminPanelSettingsIcon color="primary" fontSize="large" />
            <Typography variant="h5" sx={{ fontWeight: 900 }}>{hasSuperAdmin ? "System Admin Login" : "Register Super Admin"}</Typography>
            {!hasSuperAdmin ? <Alert severity="info">No Super Admin exists yet. Register the first Super Admin to activate the admin dashboard.</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
            {!hasSuperAdmin ? (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField label="First Name" value={authForm.fname} onChange={(event) => setAuthForm((current) => ({ ...current, fname: event.target.value }))} fullWidth />
                <TextField label="Last Name" value={authForm.lname} onChange={(event) => setAuthForm((current) => ({ ...current, lname: event.target.value }))} fullWidth />
              </Stack>
            ) : null}
            <TextField label="Email" value={authForm.email} onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))} fullWidth />
            <TextField label="Password" type="password" value={authForm.password} onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))} fullWidth />
            <Button variant="contained" onClick={submitAuth} disabled={saving || !authForm.email || !authForm.password}>{hasSuperAdmin ? "Login" : "Register Super Admin"}</Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: drawerOpen ? "flex-end" : "center", p: 1 }}>
        <IconButton onClick={() => setDrawerOpen((current) => !current)}>
          {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={section === item.key}
              onClick={() => { setSection(item.key); if (isMobile) setDrawerOpen(false); }}
              sx={{ minHeight: 48, justifyContent: { xs: "initial", md: drawerOpen ? "initial" : "center" }, px: 2.5 }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: { xs: 2, md: drawerOpen ? 2 : "auto" }, justifyContent: "center" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} sx={{ opacity: { xs: 1, md: drawerOpen ? 1 : 0 } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ px: { xs: 2, md: drawerOpen ? 2 : 1 }, py: 1.5, textAlign: { xs: "left", md: drawerOpen ? "left" : "center" } }}>
        <Typography variant="subtitle2" sx={{ display: { xs: "block", md: drawerOpen ? "block" : "none" }, fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{adminName(admin)}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: { xs: "block", md: drawerOpen ? "block" : "none" }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{admin.email}</Typography>
        <Chip label={admin.role || "Admin"} size="small" color="secondary" sx={{ mt: 1, display: { xs: "inline-flex", md: drawerOpen ? "inline-flex" : "none" } }} />
      </Box>
      <ListItemButton onClick={logout} sx={{ minHeight: 48, justifyContent: { xs: "initial", md: drawerOpen ? "initial" : "center" }, px: 2.5 }}>
        <ListItemIcon sx={{ minWidth: 0, mr: { xs: 2, md: drawerOpen ? 2 : "auto" }, justifyContent: "center" }}><LogoutIcon /></ListItemIcon>
        <ListItemText primary="Logout" sx={{ opacity: { xs: 1, md: drawerOpen ? 1 : 0 } }} />
      </ListItemButton>
    </Box>
  );

  const metricCards = [
    ["Accounts", metrics?.accounts, <PeopleIcon color="secondary" />],
    ["Locations", metrics?.locations, <HomeWorkIcon color="secondary" />],
    ["Members", metrics?.members, <Diversity2Icon color="secondary" />],
    ["CashBooks", metrics?.cashbooks, <BookIcon color="secondary" />],
    ["Open Tickets", metrics?.support_tickets_open, <SupportAgentIcon color="secondary" />],
    ["Login Devices", metrics?.login_devices, <TimelineIcon color="secondary" />],
  ];

  const accountRows = (account: AdminAccountSummary) => [
    { icon: <HomeWorkIcon color="secondary" fontSize="small" />, label: "Locations", value: metricText(account.locations) },
    { icon: <GroupsIcon color="secondary" fontSize="small" />, label: "Members", value: metricText(account.members) },
    { icon: <TimelineIcon color="secondary" fontSize="small" />, label: "Average Weekly Attendance", value: metricText(account.average_weekly_attendance) },
    { icon: <BookIcon color="secondary" fontSize="small" />, label: "Cashbooks", value: metricText(account.cashbooks) },
    { icon: <ReceiptLongIcon color="secondary" fontSize="small" />, label: "Transactions", value: metricText(account.transactions) },
    { icon: <ArticleIcon color="secondary" fontSize="small" />, label: "Reports", value: metricText(account.reports) },
    { icon: <BadgeIcon color="secondary" fontSize="small" />, label: "Roles", value: metricText(account.roles) },
    { icon: <VerifiedIcon color="secondary" fontSize="small" />, label: "Status", value: account.status || "Not set" },
  ];

  const locationRows = (location: AdminLocationSummary) => [
    { icon: <HomeWorkIcon color="secondary" fontSize="small" />, label: "Name", value: location.title || "Not set" },
    { icon: <AccountBalanceIcon color="secondary" fontSize="small" />, label: "Branches", value: metricText(location.branches) },
    { icon: <GroupsIcon color="secondary" fontSize="small" />, label: "Members", value: metricText(location.members) },
    { icon: <BookIcon color="secondary" fontSize="small" />, label: "CashBooks", value: metricText(location.cashbooks) },
    { icon: <ReceiptLongIcon color="secondary" fontSize="small" />, label: "Transactions", value: metricText(location.transactions) },
    { icon: <TimelineIcon color="secondary" fontSize="small" />, label: "Average Weekly Attendance", value: metricText(location.average_weekly_attendance ?? location.average_monthly_attendance) },
    { icon: <ArticleIcon color="secondary" fontSize="small" />, label: "Reports", value: metricText(location.reports) },
    { icon: <PaidIcon color="secondary" fontSize="small" />, label: "Subscription Status", value: location.subscription_status || "Not assigned" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (muiTheme) => muiTheme.zIndex.appBar, bgcolor: "primary.main", boxShadow: "none" }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen((current) => !current)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 900, flexGrow: 1 }}>Admin - {sectionTitle}</Typography>
          <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>{adminName(admin)}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: { xs: 0, md: drawerOpen ? drawerWidth : closedWidth },
          flexShrink: 0,
          zIndex: (muiTheme) => muiTheme.zIndex.drawer,
          "& .MuiDrawer-paper": {
            width: { xs: drawerWidth, md: drawerOpen ? drawerWidth : closedWidth },
            top: { xs: "56px !important", sm: "64px !important" },
            height: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
            zIndex: (muiTheme) => muiTheme.zIndex.drawer,
            overflowX: "hidden",
            transition: "width 180ms ease",
            boxSizing: "border-box",
            borderRight: "1px solid rgba(14, 9, 61, 0.12)",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: { xs: 2, md: 3 }, mt: 8, minWidth: 0, minHeight: "calc(100vh - 64px)" }}>
        <Box sx={{ flexGrow: 1 }}>
          {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

          {section === "analytics" ? (
          <Stack spacing={2.5}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>Analytics</Typography>
            <Grid container spacing={2}>
              {metricCards.map(([label, value, icon]) => (
                <Grid key={String(label)} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">{label}</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900 }}>{metricText(Number(value || 0))}</Typography>
                      </Box>
                      {icon}
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        ) : null}

        {section === "accounts" ? (
          <Stack spacing={2.5}>
            <Stack direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-between", gap: 1 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{selectedAccount ? `${selectedAccount.display_name || selectedAccount.title} Locations` : "Accounts"}</Typography>
                <Typography variant="body2" color="text.secondary">{selectedAccount ? "Open ministry locations and operating metrics." : "Review organization and personal accounts across the system."}</Typography>
              </Box>
              {selectedAccount ? <Button variant="outlined" onClick={() => { setSelectedAccount(null); setAccountLocations([]); }}>Back to Accounts</Button> : null}
            </Stack>
            {!selectedAccount ? (
              <Grid container spacing={2}>
                {accounts.map((account) => (
                  <Grid key={account.id} size={{ xs: 12, md: 6, xl: 4 }}>
                    <Paper variant="outlined" sx={{ height: "100%", p: 2 }}>
                      <Stack spacing={1.5}>
                        <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>{account.display_name || account.title || "Account"}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {[account.phone_number, account.address || [account.city, account.country].filter(Boolean).join(", ")].filter(Boolean).join(" - ") || account.email || account.type}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={(event) => {
                              event.stopPropagation();
                              setActionAccount(account);
                              setAccountAnchor(event.currentTarget);
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Stack>
                        <BorderedDetails rows={accountRows(account)} />
                        <Button variant="outlined" onClick={() => openAccountLocations(account)}>Open</Button>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : accountLocations.length ? (
              <Grid container spacing={2}>
                {accountLocations.map((location) => (
                  <Grid key={location.id} size={{ xs: 12, md: 6, xl: 4 }}>
                    <Paper variant="outlined" sx={{ height: "100%", p: 2 }}>
                      <Stack spacing={1.5}>
                        <Typography variant="h6" sx={{ fontWeight: 900 }}>{location.title || "Location"}</Typography>
                        <Typography variant="body2" color="text.secondary">{[location.type, location.city, location.country].filter(Boolean).join(" - ") || "Location"}</Typography>
                        <BorderedDetails rows={locationRows(location)} />
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyState title="No locations found" message="This account has not created locations yet." />
            )}
          </Stack>
        ) : null}

        {section === "support" ? (
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>Support</Typography>
            {tickets.map((ticket) => (
              <Paper key={ticket.id} variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Stack direction="row" sx={{ justifyContent: "space-between", gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>{ticket.title}</Typography>
                    <Chip size="small" label={ticket.status || "Open"} />
                  </Stack>
                  <BorderedDetails rows={[
                    { icon: <PersonIcon color="secondary" fontSize="small" />, label: "Submitted By", value: ticket.requester_name || "Unknown user" },
                    { icon: <EmailIcon color="secondary" fontSize="small" />, label: "User Contact", value: [ticket.requester_email, ticket.requester_phone].filter(Boolean).join(" - ") || "Not provided" },
                    { icon: <HomeWorkIcon color="secondary" fontSize="small" />, label: "Related Location", value: ticket.location_label || ticket.location_title || "Not linked" },
                  ]} />
                  <Typography variant="body2" color="text.secondary">{ticket.description}</Typography>
                  <TextField size="small" label="Reply" value={replyByTicket[ticket.id] || ""} onChange={(event) => setReplyByTicket((current) => ({ ...current, [ticket.id]: event.target.value }))} fullWidth />
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" onClick={() => sendTicketReply(ticket)}>Reply</Button>
                    <Button size="small" variant="outlined" onClick={() => sendTicketReply(ticket, "Closed")}>Close</Button>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        ) : null}

        {section === "users" ? (
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>Users</Typography>
            <Grid container spacing={2}>
              {userAccounts.map((account) => (
                <Grid key={account.id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <BorderedDetails rows={[
                      { icon: <PersonIcon color="secondary" fontSize="small" />, label: "Name", value: account.display_name || account.title || "User" },
                      { icon: <EmailIcon color="secondary" fontSize="small" />, label: "Email", value: account.email || "Not set" },
                      { icon: <VerifiedIcon color="secondary" fontSize="small" />, label: "Status", value: account.status || "Not set" },
                    ]} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        ) : null}

        {section === "admins" ? (
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Stack spacing={2}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>Admins</Typography>
              {admin.role === "Super Admin" ? (
                <>
                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField size="small" label="First" value={authForm.fname} onChange={(event) => setAuthForm((current) => ({ ...current, fname: event.target.value }))} fullWidth /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField size="small" label="Last" value={authForm.lname} onChange={(event) => setAuthForm((current) => ({ ...current, lname: event.target.value }))} fullWidth /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField size="small" label="Email" value={authForm.email} onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))} fullWidth /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField size="small" label="Password" type="password" value={authForm.password} onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))} fullWidth /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField size="small" select label="Role" value={authForm.role} onChange={(event) => setAuthForm((current) => ({ ...current, role: event.target.value }))} fullWidth>{["Admin", "Super Admin"].map((role) => <MenuItem key={role} value={role}>{role}</MenuItem>)}</TextField></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><Button variant="contained" onClick={addAdmin} disabled={saving || !authForm.email || !authForm.password} fullWidth>Add Admin</Button></Grid>
                  </Grid>
                  <List dense disablePadding sx={{ border: 1, borderColor: "divider", borderRadius: 1, overflow: "hidden" }}>
                    {admins.map((item) => <ListItem key={item.id} divider><ListItemText primary={adminName(item)} secondary={`${item.email} - ${item.role} - ${item.status}`} /></ListItem>)}
                  </List>
                </>
              ) : <Alert severity="info">Admin management is reserved for Super Admins.</Alert>}
            </Stack>
          </Paper>
        ) : null}

        {section === "settings" ? (
          <Paper variant="outlined" sx={{ p: 2.5, maxWidth: 760 }}>
            <Stack spacing={2}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>Settings</Typography>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>Enforce Subscriptions</Typography>
                  <Typography variant="body2" color="text.secondary">Show subscription tabs and require subscription management for locations.</Typography>
                </Box>
                <Switch checked={subscriptionsEnforced} onChange={(event) => updateSetting("subscriptions_enforced", event.target.checked)} disabled={admin.role !== "Super Admin"} />
              </Stack>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", border: 1, borderColor: "divider", borderRadius: 1, p: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>Enforce Account Approvals</Typography>
                  <Typography variant="body2" color="text.secondary">Organization accounts can login but must be approved before creating locations or using system resources.</Typography>
                </Box>
                <Switch checked={accountApprovalsEnforced} onChange={(event) => updateSetting("account_approvals_enforced", event.target.checked)} disabled={admin.role !== "Super Admin"} />
              </Stack>
              <List dense disablePadding sx={{ border: 1, borderColor: "divider", borderRadius: 1, overflow: "hidden" }}>
                {subscriptions.map((subscription) => (
                  <ListItem key={subscription.id} divider>
                    <ListItemText primary={subscription.title} secondary={`${Number(subscription.rate || 0).toLocaleString()} / ${subscription.rate_frequency || "Monthly"}`} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Paper>
        ) : null}

          {section === "logs" ? (
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Logs</Typography>
            <BorderedDetails rows={[
              { icon: <TimelineIcon color="secondary" fontSize="small" />, label: "Captured Login Devices", value: metricText(metrics?.login_devices) },
              { icon: <SupportAgentIcon color="secondary" fontSize="small" />, label: "Open Support Tickets", value: metricText(metrics?.support_tickets_open) },
              { icon: <AttachMoneyIcon color="secondary" fontSize="small" />, label: "Active Location Subscriptions", value: metricText(metrics?.active_location_subscriptions) },
            ]} />
          </Paper>
          ) : null}
        </Box>
        <Box sx={{ mt: 4 }}>
          <SiteFooter contained={false} />
        </Box>
      </Box>
      <Menu
        anchorEl={accountAnchor}
        open={Boolean(accountAnchor)}
        onClose={() => { setAccountAnchor(null); setActionAccount(null); }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => accountAction("approve")}><ListItemIcon><CheckCircleIcon fontSize="small" /></ListItemIcon>Approve</MenuItem>
        <MenuItem onClick={() => accountAction("reject")}><ListItemIcon><VerifiedIcon fontSize="small" /></ListItemIcon>Reject</MenuItem>
        <MenuItem onClick={() => accountAction("deactivate")}><ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>Deactivate</MenuItem>
        <MenuItem
          onClick={() => {
            setAccountAnchor(null);
            setDeleteConfirmError("");
            setDeleteConfirmOpen(true);
          }}
        >
          <ListItemIcon><ReceiptLongIcon fontSize="small" /></ListItemIcon>Delete
        </MenuItem>
      </Menu>
      <ConfirmDeleteDialog
        open={deleteConfirmOpen}
        title="Delete Account?"
        description={`This will permanently delete ${actionAccount?.display_name || actionAccount?.title || "this account"}.`}
        error={deleteConfirmError}
        loading={deleteConfirmSaving}
        onCancel={() => {
          if (!deleteConfirmSaving) {
            setDeleteConfirmOpen(false);
            setDeleteConfirmError("");
            setActionAccount(null);
          }
        }}
        onConfirm={() => void confirmDeleteAccount()}
      />
    </Box>
  );
}
