import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import HomeIcon from "@mui/icons-material/Home";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { type FormEvent, useEffect, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { CityField, EmailField, GeoFields, InternationalPhoneField } from "../components/FormFields";
import { PageHeader } from "../components/PageHeader";
import { ResourceCard } from "../components/ResourceCard";
import { api, getApiErrorMessage, type Account, type AccountOverview, type Location } from "../lib/api";

type HomePageProps = {
  account: Account;
};

export function HomePage({ account }: HomePageProps) {
  const [overview, setOverview] = useState<AccountOverview | null>(null);
  const [tab, setTab] = useState(1);
  const [locationSearch, setLocationSearch] = useState("");
  const [error, setError] = useState("");
  const [locationDrawerOpen, setLocationDrawerOpen] = useState(false);
  const [locationMenuAnchor, setLocationMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationEditOpen, setLocationEditOpen] = useState(false);
  const [locationDeleteOpen, setLocationDeleteOpen] = useState(false);
  const [savingLocation, setSavingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [locationForm, setLocationForm] = useState({
    owner_id: "",
    title: "",
    type: "Branch",
    description: "",
    email: "",
    phone_number: "",
    country: "",
    district: "",
    city: "",
    address: "",
  });

  const updateLocationForm = (value: Partial<typeof locationForm>) => {
    setLocationForm((current) => ({ ...current, ...value }));
  };

  const loadOverview = () => {
    return api.get<AccountOverview>(`/accounts/${account.id}/overview`);
  };

  const refreshOverview = async () => {
    const response = await loadOverview();
    setOverview(response.data);
  };

  useEffect(() => {
    let mounted = true;
    loadOverview()
      .then((response) => {
        if (mounted) {
          setOverview(response.data);
        }
      })
      .catch((requestError) => {
        if (mounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Failed to load overview",
          );
        }
      });
    return () => {
      mounted = false;
    };
  }, [account.id]);

  const handleCreateLocation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocationError("");
    if (account.type !== "Organization" && !locationForm.owner_id) {
      setLocationError("Select the ministry you are creating this location for.");
      return;
    }
    setSavingLocation(true);
    try {
      await api.post<Location>("/locations", {
        ...locationForm,
        author_id: account.id,
        owner_id: account.type === "Organization" ? account.id : locationForm.owner_id,
      });
      await refreshOverview();
      setLocationDrawerOpen(false);
      setLocationForm({
        owner_id: "",
        title: "",
        type: "Branch",
        description: "",
        email: "",
        phone_number: "",
        country: "",
        district: "",
        city: "",
        address: "",
      });
    } catch (requestError) {
      setLocationError(getApiErrorMessage(requestError, "Failed to create location"));
    } finally {
      setSavingLocation(false);
    }
  };

  const closeLocationMenu = () => setLocationMenuAnchor(null);

  const openLocationEdit = () => {
    if (!selectedLocation) {
      return;
    }
    setLocationForm({
      owner_id: selectedLocation.owner_id || "",
      title: selectedLocation.title || "",
      type: selectedLocation.type || "Branch",
      description: selectedLocation.description || "",
      email: selectedLocation.email || "",
      phone_number: selectedLocation.phone_number || "",
      country: selectedLocation.country || "",
      district: selectedLocation.district || "",
      city: selectedLocation.city || "",
      address: selectedLocation.address || "",
    });
    closeLocationMenu();
    setLocationEditOpen(true);
  };

  const updateSelectedLocation = async (payload: Partial<typeof locationForm> & { is_hq?: boolean }) => {
    if (!selectedLocation) {
      return;
    }
    setLocationError("");
    try {
      await api.patch(`/locations/${selectedLocation.id}`, { requester_id: account.id, ...payload });
      await refreshOverview();
      setLocationEditOpen(false);
      setSelectedLocation(null);
    } catch (requestError) {
      setLocationError(getApiErrorMessage(requestError, "Failed to update location"));
    }
  };

  const deleteSelectedLocation = async () => {
    if (!selectedLocation) {
      return;
    }
    setLocationError("");
    try {
      await api.delete(`/locations/${selectedLocation.id}?requester_id=${account.id}`);
      await refreshOverview();
      setLocationDeleteOpen(false);
      setSelectedLocation(null);
    } catch (requestError) {
      setLocationError(getApiErrorMessage(requestError, "Failed to delete location"));
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!overview) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: 360 }}>
        <CircularProgress />
      </Box>
    );
  }

  const locations =
    tab === 0 ? overview.owned.locations : overview.assigned.locations;
  const ministryHasHq = overview.owned.locations.some((location) => Boolean(location.is_hq));
  const filteredLocations = locations.filter((location) => (
    !locationSearch.trim()
    || [
      location.title,
      location.type,
      location.description,
      location.city,
      location.district,
      location.country,
    ].filter(Boolean).join(" ").toLowerCase().includes(locationSearch.trim().toLowerCase())
  ));
  const locationCreationMinistries =
    overview.permissions?.location_creation_ministries || [];
  const canCreateLocations =
    overview.permissions?.can_create_locations === true &&
    (account.type === "Organization" || locationCreationMinistries.length > 0);
  const selectedCreationMinistry =
    locationCreationMinistries.find((item) => item.owner_id === locationForm.owner_id) ||
    null;

  return (
    <>
      <PageHeader title="Home" icon={<HomeIcon />} />
      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, mb: 3 }}>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between" }}
          >
            <Tabs value={tab} onChange={(_, nextTab: number) => setTab(nextTab)}>
              <Tab
                icon={<BusinessIcon />}
                iconPosition="start"
                label={`Your Locations (${overview.owned.locations.length})`}
              />
              <Tab
                icon={<GroupWorkIcon />}
                iconPosition="start"
                label={`Assigned Locations (${overview.assigned.locations.length})`}
              />
            </Tabs>
            {canCreateLocations ? (
              <Button
                variant="contained"
                startIcon={<AddLocationAltIcon />}
                onClick={() => {
                  if (
                    account.type !== "Organization" &&
                    locationCreationMinistries.length === 1
                  ) {
                    updateLocationForm({
                      owner_id: locationCreationMinistries[0].owner_id,
                    });
                  }
                  setLocationDrawerOpen(true);
                }}
              >
                Add Location
              </Button>
            ) : null}
          </Stack>
          <TextField
            label="Search locations"
            value={locationSearch}
            onChange={(event) => setLocationSearch(event.target.value)}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </Paper>
      {filteredLocations.length === 0 ? (
        <EmptyState
          title={
            locationSearch.trim()
              ? "No matching locations"
              : tab === 0 ? "No owned locations yet" : "No assigned locations yet"
          }
          message="Locations will appear here after they are created or assigned through ministry and location roles."
        />
      ) : null}
      {filteredLocations.length > 0 ? (
        <Box sx={{ maxHeight: { xs: 520, md: 560 }, overflowY: "auto", pr: { md: 1 } }}>
          <Grid container spacing={2.5}>
            {filteredLocations.map((location) => (
              <Grid key={location.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <ResourceCard
                  title={location.title || `Location #${location.id}`}
                  icon={<HomeWorkIcon fontSize="large" />}
                  centerHeader
                  eyebrow={[location.type || "Location", location.is_hq ? "HQ" : ""].filter(Boolean).join(" - ")}
                  description={location.description}
                  status={location.status}
                  meta={[location.city, location.district, location.country]
                    .filter(Boolean)
                    .join(", ")}
                  href={`/app/locations/${location.id}`}
                  actions={tab === 0 ? (
                    <IconButton
                      aria-label="Location actions"
                      size="small"
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedLocation(location);
                        setLocationMenuAnchor(event.currentTarget);
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  ) : null}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : null}
      <Menu anchorEl={locationMenuAnchor} open={Boolean(locationMenuAnchor)} onClose={closeLocationMenu}>
        <MenuItem onClick={openLocationEdit}><ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>Edit</MenuItem>
        <MenuItem onClick={() => { closeLocationMenu(); setLocationDeleteOpen(true); }}><ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>Delete</MenuItem>
        {selectedLocation?.is_hq ? (
          <MenuItem onClick={() => { closeLocationMenu(); void updateSelectedLocation({ is_hq: false }); }}>
            <ListItemIcon><HomeWorkIcon fontSize="small" /></ListItemIcon>Revert HQ
          </MenuItem>
        ) : !ministryHasHq ? (
          <MenuItem onClick={() => { closeLocationMenu(); void updateSelectedLocation({ is_hq: true }); }}>
            <ListItemIcon><HomeWorkIcon fontSize="small" /></ListItemIcon>Set as HQ
          </MenuItem>
        ) : null}
      </Menu>
      <Dialog open={locationEditOpen} onClose={() => setLocationEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Location</DialogTitle>
        <DialogContent>
          {locationError ? <Alert severity="error" sx={{ mb: 2 }}>{locationError}</Alert> : null}
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Location Name" value={locationForm.title} onChange={(event) => updateLocationForm({ title: event.target.value })} fullWidth required />
            <TextField select label="Location Type" value={locationForm.type} onChange={(event) => updateLocationForm({ type: event.target.value })} fullWidth>
              {["Branch", "Campus", "Mission Station", "Office"].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
            </TextField>
            <TextField label="Description" value={locationForm.description} onChange={(event) => updateLocationForm({ description: event.target.value })} multiline minRows={3} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLocationEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              const { owner_id: _ownerId, ...payload } = locationForm;
              void updateSelectedLocation(payload);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDeleteDialog
        open={locationDeleteOpen}
        title="Delete Location?"
        description="This action permanently removes the selected location."
        error={locationError}
        onCancel={() => setLocationDeleteOpen(false)}
        onConfirm={() => void deleteSelectedLocation()}
      />
      <Drawer
        anchor="right"
        open={locationDrawerOpen}
        onClose={() => setLocationDrawerOpen(false)}
        slotProps={{
          root: {
            sx: { zIndex: (muiTheme) => muiTheme.zIndex.modal },
          },
          paper: {
            sx: {
              width: { xs: "100%", sm: 520 },
              maxWidth: "100%",
              top: "0 !important",
              height: "100dvh",
              pointerEvents: "auto",
            },
          },
        }}
      >
        <Box component="form" onSubmit={handleCreateLocation} sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Add Location
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            Create a branch or ministry location for this account.
          </Typography>
          {locationError ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {locationError}
            </Alert>
          ) : null}
          <Stack spacing={2} sx={{ mt: 3 }}>
            {account.type !== "Organization" ? (
              <Autocomplete
                options={locationCreationMinistries}
                value={selectedCreationMinistry}
                onChange={(_, value) =>
                  updateLocationForm({ owner_id: value?.owner_id || "" })
                }
                getOptionLabel={(option) => option.title || "Ministry"}
                isOptionEqualToValue={(option, value) =>
                  option.owner_id === value.owner_id
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ministry"
                    required
                    fullWidth
                  />
                )}
                fullWidth
              />
            ) : null}
            <TextField
              label="Location Name"
              value={locationForm.title}
              onChange={(event) => updateLocationForm({ title: event.target.value })}
              required
              fullWidth
            />
            <TextField
              select
              label="Location Type"
              value={locationForm.type}
              onChange={(event) => updateLocationForm({ type: event.target.value })}
              fullWidth
            >
              {["Branch", "Campus", "Mission Station", "Office"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              value={locationForm.description}
              onChange={(event) => updateLocationForm({ description: event.target.value })}
              multiline
              minRows={3}
              fullWidth
            />
            <EmailField
              label="Email"
              value={locationForm.email}
              onValueChange={(value) => updateLocationForm({ email: value })}
              fullWidth
            />
            <InternationalPhoneField
              label="Phone Number"
              country={locationForm.country}
              value={locationForm.phone_number}
              onValueChange={(value) => updateLocationForm({ phone_number: value })}
              fullWidth
            />
            <GeoFields
              country={locationForm.country}
              district={locationForm.district}
              city={locationForm.city}
              showCity={false}
              onChange={updateLocationForm}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <CityField
                country={locationForm.country}
                district={locationForm.district}
                city={locationForm.city}
                onChange={updateLocationForm}
              />
              <TextField
                label="Address"
                value={locationForm.address}
                onChange={(event) => updateLocationForm({ address: event.target.value })}
                fullWidth
              />
            </Stack>
            <Button type="submit" variant="contained" disabled={savingLocation}>
              Create Location
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
