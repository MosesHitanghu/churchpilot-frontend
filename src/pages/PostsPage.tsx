import RateReviewIcon from "@mui/icons-material/RateReview";
import { Alert, Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { ResourceCard } from "../components/ResourceCard";
import { api, type Account, type AccountOverview } from "../lib/api";

type PostsPageProps = {
  account: Account;
};

export function PostsPage({ account }: PostsPageProps) {
  const [overview, setOverview] = useState<AccountOverview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<AccountOverview>(`/accounts/${account.id}/overview`)
      .then((response) => setOverview(response.data))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Failed to load posts"));
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
      <PageHeader title="Posts" subtitle="Prayer requests, testimonies, devotionals, and inquiries." icon={<RateReviewIcon />} />
      {overview.owned.posts.length === 0 ? (
        <EmptyState
          title="No Posts Yet"
          message="Posts from your locations will appear here after they are created or approved."
        />
      ) : (
        <Grid container spacing={2.5}>
          {overview.owned.posts.map((post) => (
            <Grid key={post.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <ResourceCard
                title={post.title || `Post #${post.id}`}
                eyebrow={post.type || "Post"}
                description={post.description}
                status={post.status}
                href={`/app/posts/${post.id}`}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

