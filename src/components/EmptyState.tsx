import { Paper, Typography } from "@mui/material";

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, textAlign: "left" }}>
      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
        {message}
      </Typography>
    </Paper>
  );
}

