import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailField, GeoFields, InternationalPhoneField, PasswordField } from "../components/FormFields";
import { api, getApiErrorMessage, type Account } from "../lib/api";
import { setSessionAccount } from "../lib/session";

const organizationCategories = ["Church", "Ministry", "Mission Group"];
const denominations = ["Pentacostal", "Angalican", "Catholic", "Methodist", "SDA"];

function collectDeviceInfo() {
  const userAgent = window.navigator.userAgent;
  const browser = userAgent.includes("Edg/") ? "Edge" : userAgent.includes("Chrome/") ? "Chrome" : userAgent.includes("Firefox/") ? "Firefox" : userAgent.includes("Safari/") ? "Safari" : "Unknown";
  const os = userAgent.includes("Windows") ? "Windows" : userAgent.includes("Mac OS") ? "macOS" : userAgent.includes("Android") ? "Android" : userAgent.includes("iPhone") || userAgent.includes("iPad") ? "iOS" : "Unknown";
  const deviceType = /Mobi|Android|iPhone|iPad/i.test(userAgent) ? "Mobile" : "Desktop";
  return {
    userAgent,
    platform: window.navigator.platform,
    language: window.navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.screen.width}x${window.screen.height} @${window.devicePixelRatio || 1}`,
    deviceMemory: String((window.navigator as Navigator & { deviceMemory?: number }).deviceMemory || ""),
    hardwareConcurrency: String(window.navigator.hardwareConcurrency || ""),
    vendor: window.navigator.vendor,
    browser,
    os,
    deviceType,
  };
}

type AuthPageProps = {
  mode: "login" | "signup";
  onAuthenticated: (account: Account) => void;
};

type AuthDrawerProps = AuthPageProps & {
  open: boolean;
  onClose: () => void;
  onModeChange: (mode: "login" | "signup") => void;
};

function AuthForm({
  mode,
  onAuthenticated,
  onModeChange,
}: AuthPageProps & { onModeChange: (mode: "login" | "signup") => void }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingPasswordAccount, setPendingPasswordAccount] = useState<Account | null>(null);
  const [passwordForm, setPasswordForm] = useState({ handle: "", newPassword: "", confirmPassword: "" });
  const [accountType] = useState<"Personal" | "Organization">("Organization");
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    fname: "",
    lname: "",
    handle: "",
    title: "",
    description: "",
    email: "",
    gender: "",
    marital_status: "",
    phone_number: "",
    type: "Organization",
    category: "Church",
    denomination: "",
    country: "",
    district: "",
    city: "",
    address: "",
    occupation: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const payload =
        mode === "login"
          ? { identifier: form.identifier, password: form.password, device_info: collectDeviceInfo() }
          : {
              fname: accountType === "Personal" ? form.fname : "",
              lname: accountType === "Personal" ? form.lname : "",
              handle: form.handle,
              password: form.password,
              title: accountType === "Organization" ? form.title : `${form.fname} ${form.lname}`.trim(),
              description: accountType === "Organization" ? form.description : "",
              email: form.email,
              gender: accountType === "Personal" ? form.gender : "",
              marital_status: accountType === "Personal" ? form.marital_status : "",
              phone_number: form.phone_number,
              type: accountType,
              category: accountType === "Organization" ? form.category : null,
              denomination: form.denomination,
              country: form.country,
              district: form.district,
              city: accountType === "Personal" ? form.city : "",
              address: form.address,
              occupation: accountType === "Personal" ? form.occupation : "",
            };
      const response = await api.post<{ account: Account; requires_password_change?: boolean }>(mode === "login" ? "/auth/login" : "/auth/signup", payload);
      if (mode === "signup") {
        setSuccess("Account created successfully. Login to continue.");
        setForm((currentForm) => ({
          ...currentForm,
          identifier: currentForm.email || currentForm.handle,
          password: "",
        }));
        onModeChange("login");
        navigate("/login");
        return;
      }
      if (response.data.requires_password_change || response.data.account.requires_password_change) {
        setPendingPasswordAccount(response.data.account);
        setSuccess("Create a new password before continuing.");
        return;
      }
      setSessionAccount(response.data.account);
      onAuthenticated(response.data.account);
      navigate("/app");
    } catch (requestError) {
      const status = typeof requestError === "object" && requestError && "response" in requestError
        ? (requestError as { response?: { status?: number } }).response?.status
        : undefined;
      setError(
        mode === "login" && status === 401
          ? "We could not sign you in. Check your email, handle, phone number, and password, then try again."
          : getApiErrorMessage(requestError, "Authentication failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pendingPasswordAccount) {
      return;
    }
    setError("");
    setSuccess("");
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post<{ account: Account }>("/auth/change-password", {
        account_id: pendingPasswordAccount.id,
        current_password: form.password,
        handle: passwordForm.handle || undefined,
        new_password: passwordForm.newPassword,
      });
      setSessionAccount(response.data.account);
      onAuthenticated(response.data.account);
      navigate("/app");
    } catch (requestError) {
      const message = typeof requestError === "object" && requestError && "response" in requestError
        ? (requestError as { response?: { data?: { detail?: string } } }).response?.data?.detail
        : undefined;
      setError(message || (requestError instanceof Error ? requestError.message : "Failed to update password"));
    } finally {
      setLoading(false);
    }
  };

  return (
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, bgcolor: "transparent" }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            {mode === "login" ? "Login" : "Create account"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {mode === "login" ? "Use email, handle, or phone number." : "Register a ministry organization."}
          </Typography>
          {error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          ) : null}
          {success ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          ) : null}
          {pendingPasswordAccount ? (
            <Stack component="form" spacing={2} sx={{ mt: 3 }} onSubmit={handlePasswordChange}>
              <TextField label="Handle" value={passwordForm.handle} onChange={(event) => setPasswordForm((current) => ({ ...current, handle: event.target.value }))} required={!pendingPasswordAccount.handle && !pendingPasswordAccount.username} fullWidth />
              <PasswordField label="New Password" value={passwordForm.newPassword} onValueChange={(value) => setPasswordForm((current) => ({ ...current, newPassword: value }))} required fullWidth />
              <PasswordField label="Confirm Password" value={passwordForm.confirmPassword} onValueChange={(value) => setPasswordForm((current) => ({ ...current, confirmPassword: value }))} required fullWidth />
              <Button type="submit" variant="contained" size="large" disabled={loading}>
                Continue
              </Button>
            </Stack>
          ) : (
          <Stack component="form" spacing={2} sx={{ mt: 3 }} onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <>
                {accountType === "Personal" ? (
                  <>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField label="First Name" value={form.fname} onChange={(event) => setForm({ ...form, fname: event.target.value })} required fullWidth />
                      <TextField label="Last Name" value={form.lname} onChange={(event) => setForm({ ...form, lname: event.target.value })} required fullWidth />
                    </Stack>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField select label="Gender" value={form.gender} onChange={(event) => setForm({ ...form, gender: event.target.value })} fullWidth>
                        {["Female", "Male"].map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </TextField>
                      <TextField select label="Marital Status" value={form.marital_status} onChange={(event) => setForm({ ...form, marital_status: event.target.value })} fullWidth>
                        {["Single", "Married", "Widowed"].map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                    <TextField label="Occupation" value={form.occupation} onChange={(event) => setForm({ ...form, occupation: event.target.value })} fullWidth />
                  </>
                ) : (
                  <>
                    <TextField label="Organization Name" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required fullWidth />
                    <TextField select label="Organization Category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required fullWidth>
                      {organizationCategories.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                    <TextField label="Organization Details" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} multiline minRows={3} fullWidth />
                  </>
                )}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="Handle" value={form.handle} onChange={(event) => setForm({ ...form, handle: event.target.value })} required fullWidth />
                  <PasswordField label="Password" value={form.password} onValueChange={(value) => setForm({ ...form, password: value })} required fullWidth />
                </Stack>
                <EmailField label="Email" value={form.email} onValueChange={(value) => setForm({ ...form, email: value })} required fullWidth />
                <InternationalPhoneField label="Phone Number" country={form.country} value={form.phone_number} onValueChange={(value) => setForm({ ...form, phone_number: value })} required fullWidth />
                <TextField select label="Denomination" value={form.denomination} onChange={(event) => setForm({ ...form, denomination: event.target.value })} required fullWidth>
                  <MenuItem value="" disabled>Select denomination</MenuItem>
                  {denominations.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </TextField>
                <GeoFields
                  country={form.country}
                  district={form.district}
                  city={form.city}
                  showCity={false}
                  required={accountType === "Organization"}
                  onChange={(value) => setForm({ ...form, ...value })}
                />
                <TextField label="Address" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} required={accountType === "Organization"} fullWidth />
              </>
            ) : (
              <Stack spacing={2}>
                <TextField label="Email, handle, or phone" value={form.identifier} onChange={(event) => setForm({ ...form, identifier: event.target.value })} required fullWidth />
                <PasswordField label="Password" value={form.password} onValueChange={(value) => setForm({ ...form, password: value })} required fullWidth />
              </Stack>
            )}
            <Button type="submit" variant="contained" size="large" disabled={loading} startIcon={mode === "login" ? <LoginIcon /> : <PersonAddIcon />}>
              {mode === "login" ? "Login" : "Create Account"}
            </Button>
            <Button type="button" onClick={() => onModeChange(mode === "login" ? "signup" : "login")}>
              {mode === "login" ? "Create a new account" : "Already have an account"}
            </Button>
          </Stack>
          )}
        </Paper>
  );
}

export function AuthDrawer({ open, onClose, mode, onAuthenticated, onModeChange }: AuthDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 480 }, maxWidth: "100%" } } }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1.5 }}>
        <IconButton onClick={onClose} aria-label="Close Auth Drawer">
          <CloseIcon />
        </IconButton>
      </Box>
      <AuthForm mode={mode} onAuthenticated={onAuthenticated} onModeChange={onModeChange} />
    </Drawer>
  );
}

export function AuthPage({ mode, onAuthenticated }: AuthPageProps) {
  const [authMode, setAuthMode] = useState(mode);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AuthDrawer
        open
        mode={authMode}
        onAuthenticated={onAuthenticated}
        onModeChange={setAuthMode}
        onClose={() => undefined}
      />
    </Box>
  );
}
