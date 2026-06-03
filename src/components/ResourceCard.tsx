import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

type ResourceCardProps = {
  title: string;
  eyebrow?: string;
  description?: string | null;
  status?: string | null;
  href?: string;
  state?: unknown;
  meta?: string;
  actions?: ReactNode;
  icon?: ReactNode;
  centerHeader?: boolean;
};

export function ResourceCard({ title, eyebrow, description, status, href, state, meta, actions, icon, centerHeader = false }: ResourceCardProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1, textAlign: centerHeader ? "center" : "left" }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="overline" color="text.secondary">
            {eyebrow || "Resource"}
          </Typography>
          {status ? <Chip label={status} size="small" color="secondary" /> : null}
        </Stack>
        {icon ? (
          <Box sx={{ mt: 1.5, display: "grid", placeItems: "center", color: "primary.main" }}>
            {icon}
          </Box>
        ) : null}
        <Typography variant="h6" sx={{ mt: 1, fontWeight: 800 }}>
          {title}
        </Typography>
        {meta ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {meta}
          </Typography>
        ) : null}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          {description || "No description has been added yet."}
        </Typography>
      </CardContent>
      {href || actions ? (
        <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
          {href ? (
            <Button component={RouterLink} to={href} state={state} endIcon={<ArrowForwardIcon />} size="small">
              Open
            </Button>
          ) : <Box />}
          {actions}
        </CardActions>
      ) : (
        <Box sx={{ pb: 2 }} />
      )}
    </Card>
  );
}
