import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Alert, Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { ResourceCard } from "../components/ResourceCard";
import { api, type Account, type AccountOverview } from "../lib/api";

type EventsPageProps = {
  account: Account;
};

export function EventsPage({ account }: EventsPageProps) {
  const [overview, setOverview] = useState<AccountOverview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<AccountOverview>(`/accounts/${account.id}/overview`)
      .then((response) => setOverview(response.data))
      .catch((requestError) =>
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to load events",
        ),
      );
  }, [account.id]);

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

  return (
    <>
      <PageHeader title="Events" icon={<CalendarMonthIcon />} />
      {overview.owned.events.length === 0 ? (
        <EmptyState
          title="No events yet"
          message="Events will appear after account admins, pastors, or location admins publish them."
        />
      ) : (
        <Grid container spacing={2.5}>
          {overview.owned.events.map((event) => (
            <Grid key={event.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <ResourceCard
                title={event.title || `Event #${event.id}`}
                eyebrow={event.type || "Event"}
                description={event.description}
                meta={[event.startdate, event.venue]
                  .filter(Boolean)
                  .join(" at ")}
                href={`/app/events/${event.id}`}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
