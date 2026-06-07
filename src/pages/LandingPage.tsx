import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GroupsIcon from "@mui/icons-material/Groups";
import LoginIcon from "@mui/icons-material/Login";
import PaidIcon from "@mui/icons-material/Paid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaceIcon from "@mui/icons-material/Place";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CircularProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import type { Account } from "../lib/api";
import { getSessionAccount } from "../lib/session";

const AuthDrawer = lazy(() => import("./AuthPages").then((module) => ({ default: module.AuthDrawer })));

function LandingAuthLoading() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: (theme) => theme.zIndex.modal,
        display: "grid",
        placeItems: "center",
        bgcolor: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(2px)",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

const features = [
  {
    title: "Locations",
    description: "Manage ministry branches, service points, and responsibilities from one account.",
    icon: <PlaceIcon />,
  },
  {
    title: "Finance Management",
    description: "Run cashbooks, review balances, prepare requisitions, and keep approvals visible by location.",
    icon: <PaidIcon />,
  },
  {
    title: "Schedules",
    description: "Organize services, meetings, and recurring ministry rhythms with attendance-ready schedules.",
    icon: <CalendarMonthIcon />,
  },
  {
    title: "Church Database",
    description: "Keep members, zones, missional families, leaders, and contact records organized for daily ministry work.",
    icon: <GroupsIcon />,
  },
  {
    title: "Reporting",
    description: "Create location reports, forward submissions, approve reports, and track ministry accountability.",
    icon: <AssignmentTurnedInIcon />,
  },
  {
    title: "Membership Care",
    description: "Follow attendance patterns, missional family participation, and leadership responsibilities in one place.",
    icon: <GroupsIcon />,
  },
];

type LandingPageProps = {
  onAuthenticated: (account: Account) => void;
  initialAuthMode?: "login" | "signup";
};

export function LandingPage({ onAuthenticated, initialAuthMode }: LandingPageProps) {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"login" | "signup">(initialAuthMode || "login");
  const [authOpen, setAuthOpen] = useState(Boolean(initialAuthMode));
  useEffect(() => {
    if (initialAuthMode) {
      setAuthMode(initialAuthMode);
      setAuthOpen(true);
    }
  }, [initialAuthMode]);

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const loginFromSavedSession = () => {
    const account = getSessionAccount();
    if (account) {
      onAuthenticated(account);
      navigate("/app");
      return;
    }
    setAuthMode("login");
    setAuthOpen(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: "primary.main", display: { xs: "none", md: "block" } }}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 900 }}>
            ChurchPilot
          </Typography>
          <Button
            color="inherit"
            startIcon={<LoginIcon />}
            onClick={loginFromSavedSession}
          >
            Login
          </Button>
          <Button variant="contained" color="secondary" startIcon={<PersonAddIcon />} onClick={() => openAuth("signup")}>
            Create Account
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          pt: { xs: 4, md: 10 },
          pb: { xs: 4, md: 9 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h3" sx={{ fontWeight: 900, maxWidth: 760, lineHeight: 1.12 }}>
                Lead your church operations with clarity.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: "rgba(255,255,255,0.78)", maxWidth: 680, fontSize: { md: 18 } }}>
                ChurchPilot brings locations, people, schedules, reports, cashbooks, requisitions, and attendance into one calm workspace for ministry teams.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Card sx={{ bgcolor: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.22)" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="overline" sx={{ color: "secondary.main" }}>
                    Proverbs 27:23
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, mt: 1 }}>
                    Be diligent to know the state of your flocks,
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "rgba(255,255,255,0.72)" }}>
                    And attend to your herds.
                  </Typography>
                </CardContent>
              </Card>
              <Stack direction="column" spacing={2} sx={{ display: { xs: "flex", md: "none" }, mt: 3 }}>
                <Button size="large" variant="contained" color="secondary" startIcon={<PersonAddIcon />} onClick={() => openAuth("signup")}>
                  Create Account
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  color="inherit"
                  startIcon={<LoginIcon />}
                  onClick={loginFromSavedSession}
                >
                  Login
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack spacing={1} sx={{ mb: 3, maxWidth: 760 }}>
          <Typography variant="overline" color="secondary">What ChurchPilot helps you run</Typography>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>A practical system for ministry administration</Typography>
          <Typography variant="body1" color="text.secondary">
            Keep the important work close: stewardship, membership, reporting, leadership roles, and local church activity.
          </Typography>
        </Stack>
        <Grid container spacing={2.5}>
          {features.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ color: "secondary.main", display: "flex", justifyContent: "center", mb: 1.5 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <SiteFooter />
      {authOpen ? (
        <Suspense fallback={<LandingAuthLoading />}>
          <AuthDrawer
            open={authOpen}
            mode={authMode}
            onClose={() => setAuthOpen(false)}
            onModeChange={setAuthMode}
            onAuthenticated={onAuthenticated}
          />
        </Suspense>
      ) : null}
    </Box>
  );
}
