import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { CustomDataGridToolbar } from "../components/DataGridToolbar";
import { PageHeader } from "../components/PageHeader";
import { api, type Account, type Role } from "../lib/api";

type RolesPageProps = {
  account: Account;
};

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

  const columns = useMemo<GridColDef<Role>[]>(
    () => [
      { field: "__no", headerName: "No", width: 72, sortable: false, filterable: false },
      { field: "user_display_name", headerName: "Person", minWidth: 180, flex: 1.1, valueGetter: (_, row) => row.user_display_name || (row.user_id ? `Account #${row.user_id}` : "Not assigned") },
      { field: "role", headerName: "Role", minWidth: 170, flex: 1 },
      { field: "title", headerName: "Title", minWidth: 180, flex: 1 },
      { field: "scope", headerName: "Scope", minWidth: 130, flex: 0.8 },
      { field: "location_title", headerName: "Location", minWidth: 170, flex: 1, valueGetter: (_, row) => row.location_title || (row.location_id ? `Location #${row.location_id}` : "Ministry") },
      { field: "status", headerName: "Status", minWidth: 120, flex: 0.7 },
      { field: "authorizer_display_name", headerName: "Authorized By", minWidth: 170, flex: 1, valueGetter: (_, row) => row.authorizer_display_name || (row.authorizer_id ? `Account #${row.authorizer_id}` : "Not set") },
      { field: "start_date", headerName: "Start Date", minWidth: 130, flex: 0.8 },
      { field: "end_date", headerName: "End Date", minWidth: 130, flex: 0.8 },
    ],
    [],
  );
  const displayedRoles = useMemo(() => {
    const ministryRoles = roles.filter((role) => role.scope === "Ministry");
    const ministryMembers = ministryRoles.filter((role) => role.role === "Ministry Member" && role.status === "Active");
    const otherRoles = ministryRoles.filter((role) => role.role !== "Ministry Member");
    return ministryMembers.length
      ? [
          ...otherRoles,
          {
            ...ministryMembers[0],
            id: "__ministry_members__",
            user_display_name: "Ministry Members",
            title: "Ministry Members",
            member_count: ministryMembers.length,
          },
        ]
      : otherRoles;
  }, [roles]);
  const displayColumns = useMemo<GridColDef<Role>[]>(
    () => columns.map((column) => column.field === "user_display_name"
      ? {
          ...column,
          renderCell: (params) => params.row.id === "__ministry_members__" ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", height: "100%" }}>
              <Typography variant="body2">Ministry Members</Typography>
              <Chip size="small" color="secondary" label={params.row.member_count || 0} />
            </Stack>
          ) : params.value,
        }
      : column),
    [columns],
  );

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
      <Paper variant="outlined" sx={{ height: 620, width: "100%" }}>
        {loading ? (
          <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={displayedRoles.map((role, index) => ({ ...role, __no: index + 1 }))}
            columns={displayColumns}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
              sorting: {
                sortModel: [{ field: "created_at", sort: "desc" }],
              },
            }}
            slots={{ toolbar: CustomDataGridToolbar }}
            showToolbar
            disableRowSelectionOnClick
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "background.default",
              },
            }}
          />
        )}
      </Paper>
    </>
  );
}
