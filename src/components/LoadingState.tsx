import { Alert, Box, CircularProgress } from "@mui/material";

type LoadingStateProps = {
  error?: string;
  minHeight?: number | string;
};

export function LoadingState({ error = "", minHeight = 360 }: LoadingStateProps) {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ display: "grid", minHeight, placeItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}
