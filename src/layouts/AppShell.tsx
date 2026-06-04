import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Alert,
  AppBar,
  Badge,
  Box,
  Button,
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
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Link as RouterLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CityField, EmailField, GeoFields, InternationalPhoneField } from "../components/FormFields";
import { SiteFooter } from "../components/SiteFooter";
import { api, type Account } from "../lib/api";
import { clearSessionAccount, setSessionAccount } from "../lib/session";
import type { AppThemeMode } from "../theme";

const drawerWidth = 238;
const closedWidth = 68;
const accountTypes = ["Personal", "Organization"];
const organizationCategories = ["Church", "Ministry", "Mission Group"];
const denominations = ["Pentacostal", "Angalican", "Catholic", "Methodist", "SDA"];

type AppShellProps = {
  account: Account;
  onLogout: () => void;
  themeMode: AppThemeMode;
  onToggleTheme: () => void;
  onAccountUpdated: (account: Account) => void;
};

const navItems = [
  { label: "Home", path: "/app", icon: <HomeIcon />, menu: "home" },
  { label: "Financial", path: "/app/financial", icon: <PaidIcon />, menu: "financial" },
  { label: "Support Center", path: "/app/support", icon: <HelpCenterIcon />, menu: "support" },
  { label: "Roles", path: "/app/roles", icon: <ManageAccountsIcon />, menu: "admins" },
];

export function AppShell({ account, onLogout, themeMode, onToggleTheme, onAccountUpdated }: AppShellProps) {
  const [open, setOpen] = useState(false);
  const drawerHistoryRef = useRef(false);
  const overlayHistoryRef = useRef(false);
  const overlayClosingRef = useRef(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [lastLocationPath, setLastLocationPath] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const rememberedLocationKey = `church-admin:last-location:${account.id}`;
  const visibleNavItems = navItems.filter((item) => item.label !== "Roles" || account.type === "Personal");
  const accountFullName = [account.fname, account.lname].filter(Boolean).join(" ") || account.title || account.handle || account.username || "Account";
  const currentPageTitle = (() => {
    if (/^\/app\/cashbooks\/[^/]+$/.test(location.pathname)) {
      return "CashBook";
    }
    if (/^\/app\/locations\/[^/]+$/.test(location.pathname)) {
      return "Location";
    }
    const activeItem = visibleNavItems.find((item) => item.path === location.pathname);
    return activeItem?.label || "Home";
  })();

  useEffect(() => {
    const match = location.pathname.match(/^\/app\/locations\/([^/]+)$/);
    if (match) {
      const nextLocationPath = `/app/locations/${match[1]}`;
      sessionStorage.setItem(rememberedLocationKey, match[1]);
      setLastLocationPath(nextLocationPath);
      setOpen(false);
    }
  }, [location.pathname, rememberedLocationKey]);

  useEffect(() => {
    const rememberedLocationId = sessionStorage.getItem(rememberedLocationKey);
    setLastLocationPath(rememberedLocationId ? `/app/locations/${rememberedLocationId}` : "");
  }, [rememberedLocationKey]);

  useEffect(() => {
    document.title = `ChurchPilot | ${currentPageTitle}`;
  }, [currentPageTitle]);

  useEffect(() => {
    const handlePopState = () => {
      if (drawerHistoryRef.current) {
        drawerHistoryRef.current = false;
        setOpen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      overlayHistoryRef.current = false;
      return undefined;
    }

    const getOpenOverlayRoots = () => Array.from(
      document.querySelectorAll<HTMLElement>(
        ".MuiDialog-root, .MuiDrawer-root:not([data-churchpilot-nav-drawer='true'])",
      ),
    ).filter((element) => {
      const styles = window.getComputedStyle(element);
      return element.getAttribute("aria-hidden") !== "true" && styles.display !== "none" && styles.visibility !== "hidden";
    });

    const closeTopOverlay = () => {
      const overlays = getOpenOverlayRoots();
      const topOverlay = overlays[overlays.length - 1];
      if (!topOverlay) {
        return;
      }
      const backdrop = topOverlay.querySelector<HTMLElement>(".MuiBackdrop-root");
      if (backdrop) {
        backdrop.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true }));
        backdrop.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true }));
        backdrop.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        return;
      }
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true, cancelable: true }));
    };

    const syncOverlayHistory = () => {
      const hasOpenOverlay = getOpenOverlayRoots().length > 0;
      if (hasOpenOverlay && !overlayHistoryRef.current && !overlayClosingRef.current) {
        window.history.pushState({ ...(window.history.state || {}), churchPilotOverlayOpen: true }, "", window.location.href);
        overlayHistoryRef.current = true;
      }
      if (!hasOpenOverlay && overlayHistoryRef.current && !overlayClosingRef.current) {
        overlayHistoryRef.current = false;
        window.history.back();
      }
    };

    const handlePopState = () => {
      if (!overlayHistoryRef.current) {
        return;
      }
      overlayHistoryRef.current = false;
      overlayClosingRef.current = true;
      closeTopOverlay();
      window.setTimeout(() => {
        overlayClosingRef.current = false;
        syncOverlayHistory();
      }, 120);
    };

    const observer = new MutationObserver(syncOverlayHistory);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    window.addEventListener("popstate", handlePopState);
    syncOverlayHistory();

    return () => {
      observer.disconnect();
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isMobile]);

  const openDrawer = () => {
    if (isMobile && !drawerHistoryRef.current) {
      window.history.pushState({ ...(window.history.state || {}), churchPilotDrawerOpen: true }, "", window.location.href);
      drawerHistoryRef.current = true;
    }
    setOpen(true);
  };

  const closeDrawer = () => {
    if (isMobile && drawerHistoryRef.current) {
      drawerHistoryRef.current = false;
      window.history.back();
      setOpen(false);
      return;
    }
    setOpen(false);
  };

  const toggleDrawer = () => {
    if (open) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const handleLogout = () => {
    clearSessionAccount();
    onLogout();
    navigate("/");
  };

  const openProfile = () => {
    setAccountMenuAnchor(null);
    setProfileOpen(true);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (muiTheme) => muiTheme.zIndex.appBar,
          bgcolor: "primary.main",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Tooltip title={isMobile ? "Open menu" : open ? "Collapse menu" : "Expand menu"}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2, fontWeight: 900, display: "block", minWidth: 0 }} noWrap>
            {isMobile ? "ChurchPilot" : currentPageTitle}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            <Box
              component="button"
              onClick={(event) => setAccountMenuAnchor(event.currentTarget)}
              aria-label="Account Menu"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                color: "inherit",
                bgcolor: "transparent",
                border: 0,
                p: 0,
                cursor: "pointer",
                font: "inherit",
                textAlign: "left",
              }}
            >
              <Typography
                component="span"
                variant="body2"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: 800,
                  maxWidth: 220,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                  {accountFullName}
              </Typography>
              {accountMenuAnchor ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
            </Box>
            <Tooltip title="Notifications">
              <IconButton color="inherit" aria-label="Notifications">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={themeMode === "dark" ? "Light Theme" : "Dark Theme"}>
              <IconButton color="inherit" onClick={onToggleTheme} aria-label="Toggle Theme">
                {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={accountMenuAnchor}
              open={Boolean(accountMenuAnchor)}
              onClose={() => setAccountMenuAnchor(null)}
            >
              <MenuItem onClick={openProfile}>
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        slotProps={{ root: { "data-churchpilot-nav-drawer": "true" } as Record<string, string> }}
        sx={{
          width: { xs: 0, md: open ? drawerWidth : closedWidth },
          flexShrink: 0,
          zIndex: (muiTheme) => muiTheme.zIndex.drawer,
          "& .MuiDrawer-paper": {
            width: { xs: drawerWidth, md: open ? drawerWidth : closedWidth },
            top: { xs: "56px !important", sm: "64px !important" },
            height: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
            zIndex: (muiTheme) => muiTheme.zIndex.drawer,
            overflowX: "hidden",
            transition: "width 180ms ease",
            borderRight: "1px solid rgba(14, 9, 61, 0.12)",
          },
        }}
      >
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: open ? "flex-end" : "center", p: 1 }}>
          <Tooltip title={open ? "Collapse" : "Expand"}>
            <IconButton onClick={() => setOpen((current) => !current)}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        <List>
          {visibleNavItems.map((item) => {
            const itemPath = item.menu === "home" && lastLocationPath ? lastLocationPath : item.path;
            const selected = item.menu === "home"
              ? location.pathname === "/app" || /^\/app\/locations\/[^/]+$/.test(location.pathname)
              : location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
                <Tooltip title={open ? "" : item.label} placement="right">
                  <ListItemButton
                    component={RouterLink}
                    to={itemPath}
                    selected={selected}
                    onClick={() => { if (isMobile) closeDrawer(); }}
                    sx={{ minHeight: 48, justifyContent: { xs: "initial", md: open ? "initial" : "center" }, px: 2.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: { xs: 2, md: open ? 2 : "auto" }, justifyContent: "center" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} sx={{ opacity: { xs: 1, md: open ? 1 : 0 } }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ px: { xs: 2, md: open ? 2 : 1 }, py: 1.5, textAlign: { xs: "left", md: open ? "left" : "center" } }}>
          <Typography
            variant="body2"
            sx={{
              display: { xs: "block", md: open ? "block" : "none" },
              fontWeight: 800,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {accountFullName}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: { xs: "block", md: open ? "block" : "none" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {account.email || "No email address"}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: { xs: "block", md: open ? "block" : "none" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {account.type || "User"}
          </Typography>
        </Box>
        <Tooltip title={open ? "" : "Logout"} placement="right">
          <ListItemButton onClick={handleLogout} sx={{ minHeight: 48, justifyContent: { xs: "initial", md: open ? "initial" : "center" }, px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: { xs: 2, md: open ? 2 : "auto" }, justifyContent: "center" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: { xs: 1, md: open ? 1 : 0 } }} />
          </ListItemButton>
        </Tooltip>
      </Drawer>
      <ProfileDrawer
        account={account}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onAccountUpdated={onAccountUpdated}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, md: 3 },
          mt: 8,
          minWidth: 0,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Box sx={{ mt: 4 }}>
          <SiteFooter contained={false} />
        </Box>
      </Box>
    </Box>
  );
}

type ProfileDrawerProps = {
  account: Account;
  open: boolean;
  onClose: () => void;
  onAccountUpdated: (account: Account) => void;
};

function ProfileDrawer({ account, open, onClose, onAccountUpdated }: ProfileDrawerProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    handle: "",
    title: "",
    email: "",
    phone_number: "",
    type: "",
    category: "",
    denomination: "",
    gender: "",
    marital_status: "",
    occupation: "",
    description: "",
    country: "",
    district: "",
    city: "",
    address: "",
  });

  const updateForm = (value: Partial<typeof form>) => {
    setForm((current) => ({ ...current, ...value }));
  };

  useEffect(() => {
    setForm({
      fname: account.fname || "",
      lname: account.lname || "",
      handle: account.handle || account.username || "",
      title: account.title || "",
      email: account.email || "",
      phone_number: account.phone_number || "",
      type: account.type || "",
      category: account.category || "",
      denomination: denominations.includes(account.denomination || "") ? account.denomination || "" : "",
      gender: account.gender || "",
      marital_status: account.marital_status || "",
      occupation: account.occupation || "",
      description: account.description || "",
      country: account.country || "",
      district: account.district || "",
      city: account.city || "",
      address: account.address || "",
    });
    setError("");
    setSuccess("");
  }, [account, open]);

  const getRequestMessage = (requestError: unknown, fallback: string) => {
    if (
      requestError &&
      typeof requestError === "object" &&
      "response" in requestError
    ) {
      const response = (requestError as { response?: { data?: { detail?: string } } }).response;
      if (response?.data?.detail) {
        return response.data.detail;
      }
    }
    return requestError instanceof Error ? requestError.message : fallback;
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const payload = form.type === "Organization" ? { ...form, fname: "", lname: "" } : form;
      const response = await api.patch<Account>(`/accounts/${account.id}`, payload);
      setSessionAccount(response.data);
      onAccountUpdated(response.data);
      setSuccess("Profile updated successfully.");
      setNotification({ message: "Profile updated successfully.", severity: "success" });
    } catch (requestError) {
      const message = getRequestMessage(requestError, "Failed to update profile");
      setError(message);
      setNotification({ message, severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          root: {
            sx: { zIndex: (muiTheme) => muiTheme.zIndex.modal },
          },
          paper: {
            sx: {
              width: { xs: "100%", sm: 480 },
              maxWidth: "100%",
              top: "0 !important",
              height: "100dvh",
              pointerEvents: "auto",
            },
          },
        }}
      >
        <Box component="form" onSubmit={handleSave} sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete or update your account information.
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="Close Profile Drawer">
            <ChevronRightIcon />
          </IconButton>
        </Stack>
        {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
        {success ? <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert> : null}
        <Stack spacing={2}>
          {form.type !== "Organization" ? (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label="First Name" value={form.fname} onChange={(event) => updateForm({ fname: event.target.value })} fullWidth />
              <TextField label="Last Name" value={form.lname} onChange={(event) => updateForm({ lname: event.target.value })} fullWidth />
            </Stack>
          ) : null}
          <TextField label="Account Title" value={form.title} onChange={(event) => updateForm({ title: event.target.value })} fullWidth />
          <TextField label="Handle" value={form.handle} onChange={(event) => updateForm({ handle: event.target.value })} fullWidth />
          <EmailField label="Email" value={form.email} onValueChange={(value) => updateForm({ email: value })} fullWidth />
          <InternationalPhoneField label="Phone Number" country={form.country} value={form.phone_number} onValueChange={(value) => updateForm({ phone_number: value })} fullWidth />
          <TextField select label="Account Type" value={form.type} onChange={(event) => updateForm({ type: event.target.value, category: event.target.value === "Personal" ? "" : form.category || "Church" })} fullWidth>
            {accountTypes.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          {form.type === "Organization" ? (
            <>
              <TextField select label="Organization Category" value={form.category} onChange={(event) => updateForm({ category: event.target.value })} fullWidth>
                {organizationCategories.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField label="Organization Details" value={form.description} onChange={(event) => updateForm({ description: event.target.value })} multiline minRows={3} fullWidth />
            </>
          ) : (
            <>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField select label="Gender" value={form.gender} onChange={(event) => updateForm({ gender: event.target.value })} fullWidth>
                  {["Female", "Male"].map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </TextField>
                <TextField select label="Marital Status" value={form.marital_status} onChange={(event) => updateForm({ marital_status: event.target.value })} fullWidth>
                  {["Single", "Married", "Widowed"].map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </TextField>
              </Stack>
              <TextField label="Occupation" value={form.occupation} onChange={(event) => updateForm({ occupation: event.target.value })} fullWidth />
            </>
          )}
          <TextField select label="Denomination" value={form.denomination} onChange={(event) => updateForm({ denomination: event.target.value })} fullWidth>
            <MenuItem value="">Select denomination</MenuItem>
            {denominations.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <GeoFields
            country={form.country}
            district={form.district}
            city={form.city}
            showCity={false}
            onChange={updateForm}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <CityField
              country={form.country}
              district={form.district}
              city={form.city}
              onChange={updateForm}
            />
            <TextField label="Address" value={form.address} onChange={(event) => updateForm({ address: event.target.value })} fullWidth />
          </Stack>
          <Button type="submit" variant="contained" disabled={saving}>
            Save Profile
          </Button>
        </Stack>
      </Box>
      </Drawer>
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={4000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: (muiTheme) => muiTheme.zIndex.modal + 3 }}
      >
        {notification ? (
          <Alert
            severity={notification.severity}
            variant="filled"
            onClose={() => setNotification(null)}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
}
