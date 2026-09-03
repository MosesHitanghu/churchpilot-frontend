import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { type ChangeEvent, useEffect, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import {
  api,
  getApiErrorMessage,
  type Account,
  type AccountOverview,
  type Location,
  type SupportTicket,
} from "../lib/api";
import { useTerminology } from "../lib/terminology";

type SupportCenterPageProps = {
  account: Account;
};

function readImage(
  event: ChangeEvent<HTMLInputElement>,
  onValue: (value: string) => void,
) {
  const file = event.target.files?.[0];
  if (!file || !file.type.startsWith("image/")) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => onValue(String(reader.result || ""));
  reader.readAsDataURL(file);
}

export function SupportCenterPage({ account }: SupportCenterPageProps) {
  const { term, termMany } = useTerminology(
    account.type !== "Personal" ? account.id : null,
  );
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );
  const [reply, setReply] = useState("");
  const [replyScreenshot, setReplyScreenshot] = useState("");
  const [form, setForm] = useState({
    title: "",
    category: "Technical",
    priority: "Normal",
    location_id: "",
    description: "",
    screenshot: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadTickets = () => {
    api
      .get<SupportTicket[]>(`/support-tickets?requester_id=${account.id}`)
      .then((response) => setTickets(response.data))
      .catch(() => setTickets([]));
  };

  useEffect(() => {
    loadTickets();
    api
      .get<AccountOverview>(`/accounts/${account.id}/overview`)
      .then((response) => {
        const connectedLocations = [
          ...response.data.owned.locations,
          ...response.data.assigned.locations,
        ].filter((location, index, items) => (
          items.findIndex((candidate) => String(candidate.id) === String(location.id)) === index
        ));
        setLocations(connectedLocations);
      })
      .catch(() => setLocations([]));
  }, [account.id]);

  const selectedLocation = locations.find((location) => String(location.id) === String(form.location_id)) || null;

  const createTicket = async () => {
    setSaving(true);
    setError("");
    try {
      await api.post("/support-tickets", {
        requester_id: account.id,
        ...form,
        location_id: form.location_id || null,
      });
      setOpen(false);
      setForm({
        title: "",
        category: "Technical",
        priority: "Normal",
        location_id: "",
        description: "",
        screenshot: "",
      });
      loadTickets();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Failed to submit ticket"));
    } finally {
      setSaving(false);
    }
  };

  const sendReply = async () => {
    if (!selectedTicket || !reply.trim()) {
      return;
    }
    setSaving(true);
    try {
      const response = await api.post<SupportTicket>(
        `/support-tickets/${selectedTicket.id}/messages`,
        {
          requester_id: account.id,
          message: reply,
          screenshot: replyScreenshot || null,
        },
      );
      setSelectedTicket(response.data);
      setReply("");
      setReplyScreenshot("");
      loadTickets();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Support Center"
        subtitle="Open tickets and follow responses from the system Support team."
        icon={<HelpCenterIcon />}
      />
      <Stack direction="row" sx={{ justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Ticket
        </Button>
      </Stack>
      {tickets.length === 0 ? (
        <EmptyState
          title="No support tickets yet"
          message="Create a ticket when you need technical, billing, or account help."
        />
      ) : (
        <Grid container spacing={2}>
          {tickets.map((ticket) => (
            <Grid key={ticket.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                <Stack spacing={1.25}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      {ticket.title}
                    </Typography>
                    <Chip
                      size="small"
                      label={ticket.status || "Open"}
                      color={
                        ticket.status === "Closed" ? "default" : "secondary"
                      }
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {ticket.description}
                  </Typography>
                  <List
                    dense
                    disablePadding
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <ListItem divider>
                      <ListItemText
                        primary="Category"
                        secondary={ticket.category || "General"}
                      />
                    </ListItem>
                    <ListItem divider>
                      <ListItemText
                        primary="Priority"
                        secondary={ticket.priority || "Normal"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={term("location")}
                        secondary={ticket.location_title || "Not linked"}
                      />
                    </ListItem>
                  </List>
                  {ticket.screenshot ? (
                    <Box
                      component="img"
                      src={ticket.screenshot}
                      alt="Ticket screenshot"
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        border: 1,
                        borderColor: "divider",
                      }}
                    />
                  ) : null}
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    Open Conversation
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>New Support Ticket</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              label="Title"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              fullWidth
              required
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Category"
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
                fullWidth
              >
                {["Technical", "Billing", "Account", "Data", "Security"].map(
                  (option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ),
                )}
              </TextField>
              <TextField
                select
                label="Priority"
                value={form.priority}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    priority: event.target.value,
                  }))
                }
                fullWidth
              >
                {["Low", "Normal", "High", "Urgent"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Autocomplete
              options={locations}
              value={selectedLocation}
              onChange={(_, value) =>
                setForm((current) => ({
                  ...current,
                  location_id: value?.id || "",
                }))
              }
              getOptionLabel={(location) => location.title || `${term("location")} #${location.id}`}
              isOptionEqualToValue={(option, value) => String(option.id) === String(value.id)}
              renderInput={(params) => (
                <TextField {...params} label={`Related ${term("location")}`} helperText={`Only ${termMany("location").toLowerCase()} connected to your account are shown.`} fullWidth />
              )}
              fullWidth
            />
            <TextField
              label="Issue Details"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              multiline
              minRows={4}
              fullWidth
              required
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
            >
              Add Screenshot
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(event) =>
                  readImage(event, (value) =>
                    setForm((current) => ({ ...current, screenshot: value })),
                  )
                }
              />
            </Button>
            {form.screenshot ? (
              <Box
                component="img"
                src={form.screenshot}
                alt="Screenshot preview"
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "divider",
                }}
              />
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={createTicket}
            disabled={saving || !form.title.trim() || !form.description.trim()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(selectedTicket)}
        onClose={() => setSelectedTicket(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{selectedTicket?.title || "Support Ticket"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {selectedTicket?.description}
            </Typography>
            <List
              disablePadding
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              {(selectedTicket?.messages || []).map((message) => (
                <ListItem key={message.id} divider alignItems="flex-start">
                  <ListItemText
                    primary={message.sender_admin_id ? "Support Team" : "You"}
                    secondary={message.message}
                  />
                </ListItem>
              ))}
              {!(selectedTicket?.messages || []).length ? (
                <ListItem>
                  <ListItemText primary="No replies yet" />
                </ListItem>
              ) : null}
            </List>
            <TextField
              label="Reply"
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              multiline
              minRows={3}
              fullWidth
            />
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
              >
                Screenshot
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(event) => readImage(event, setReplyScreenshot)}
                />
              </Button>
              <IconButton
                color="primary"
                onClick={sendReply}
                disabled={saving || !reply.trim()}
              >
                <SendIcon />
              </IconButton>
            </Stack>
            {replyScreenshot ? (
              <Box
                component="img"
                src={replyScreenshot}
                alt="Reply screenshot preview"
                sx={{
                  width: "100%",
                  maxHeight: 260,
                  objectFit: "contain",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "divider",
                }}
              />
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTicket(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
