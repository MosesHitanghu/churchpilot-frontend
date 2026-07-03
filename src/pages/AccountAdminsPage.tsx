import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { api, type Account, type Role } from "../lib/api";

type RolesPageProps = {
  account: Account;
};

type GroupedRole = {
  role: string;
  title: string;
  rows: Role[];
};

function roleResourceLabel(role: Role) {
  if (role.location_title) {
    return role.location_title;
  }
  if (role.location_id) {
    return `Location #${role.location_id}`;
  }
  if (role.cashbook_title) {
    return role.cashbook_title;
  }
  if (role.cashbook_id) {
    return `Cashbook #${role.cashbook_id}`;
  }
  if ((role.scope || "").toLowerCase() === "account") {
    return "Account";
  }
  if ((role.scope || "").toLowerCase() === "ministry") {
    return "Ministry";
  }
  return role.scope || "Assigned resource";
}

function roleDetailRows(role: Role) {
  return [
    role.title && role.title !== role.role
      ? ["Title", role.title]
      : null,
    ["Scope", role.scope || "Not set"],
    [
      "Authorized by",
      role.authorizer_display_name ||
        (role.authorizer_id ? `Account #${role.authorizer_id}` : "Not set"),
    ],
  ].filter(Boolean) as string[][];
}

export function RolesPage({ account }: RolesPageProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get<Role[]>(`/roles?user_id=${account.id}`)
      .then((response) => {
        if (mounted) {
          setRoles(response.data);
        }
      })
      .catch((requestError) => {
        if (mounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Failed to load roles",
          );
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [account.id]);

  const groupedRoles = useMemo<GroupedRole[]>(() => {
    const groups = new Map<string, GroupedRole>();
    roles.forEach((role) => {
      const roleName = role.role || "Assigned Role";
      const group = groups.get(roleName);
      if (group) {
        group.rows.push(role);
        return;
      }
      groups.set(roleName, {
        role: roleName,
        title: role.title || roleName,
        rows: [role],
      });
    });
    return Array.from(groups.values()).sort((left, right) =>
      left.role.localeCompare(right.role, undefined, { sensitivity: "base" }),
    );
  }, [roles]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <PageHeader
        title="Roles"
        subtitle="Roles assigned to your account."
        icon={<ManageAccountsIcon />}
      />
      {loading ? (
        <Paper variant="outlined" sx={{ minHeight: 360 }}>
          <Box sx={{ display: "grid", placeItems: "center", minHeight: 360 }}>
            <CircularProgress />
          </Box>
        </Paper>
      ) : groupedRoles.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary">
            No roles have been assigned to this account yet.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {groupedRoles.map((group) => (
            <Grid key={group.role} size={{ xs: 12, md: 6 }}>
              <Paper variant="outlined" sx={{ height: "100%", p: 2 }}>
                <Stack spacing={1.5}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }} noWrap>
                        {group.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {group.title}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      color="secondary"
                      label={group.rows.length}
                      sx={{ fontWeight: 800 }}
                    />
                  </Stack>
                  <List
                    disablePadding
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    {group.rows.map((role, index) => (
                      <ListItem
                        key={role.id}
                        divider={index < group.rows.length - 1}
                        sx={{ alignItems: "flex-start" }}
                        secondaryAction={
                          <Chip
                            size="small"
                            label={role.status || "Active"}
                            color={
                              (role.status || "Active") === "Active"
                                ? "success"
                                : "default"
                            }
                            variant="outlined"
                          />
                        }
                      >
                        <ListItemIcon sx={{ minWidth: 36, pt: 0.35 }}>
                          <CheckCircleIcon color="secondary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={roleResourceLabel(role)}
                          secondary={
                            <List dense disablePadding sx={{ mt: 0.75 }}>
                              {roleDetailRows(role).map(([label, value]) => (
                                <ListItem
                                  key={label}
                                  disableGutters
                                  sx={{
                                    borderTop: 1,
                                    borderColor: "divider",
                                    py: 0.5,
                                  }}
                                >
                                  <ListItemText
                                    primary={label}
                                    secondary={value}
                                    slotProps={{
                                      primary: {
                                        variant: "caption",
                                        sx: {
                                          color: "text.secondary",
                                          fontWeight: 800,
                                          textTransform: "uppercase",
                                        },
                                      },
                                      secondary: {
                                        variant: "body2",
                                        sx: { color: "text.primary" },
                                      },
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          }
                          sx={{ pr: 9 }}
                          slotProps={{
                            primary: { sx: { fontWeight: 800 } },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
        )}
    </>
  );
}
