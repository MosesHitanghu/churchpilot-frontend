import type { ReactNode } from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  chip?: string;
  icon?: ReactNode;
  action?: ReactNode;
  titleSubtitle?: string;
};

export function PageHeader({ title, subtitle, chip, icon, action, titleSubtitle }: PageHeaderProps) {
  return (
    <Box sx={{ mb: 3, textAlign: "left" }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 0.75 }}>
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
            {icon ? <Box sx={{ display: "flex", color: "secondary.main" }}>{icon}</Box> : null}
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              {title}
            </Typography>
            {action}
            {chip ? <Chip label={chip} color="secondary" /> : null}
          </Stack>
          {titleSubtitle ? (
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: icon ? 4 : 0 }}>
              {titleSubtitle}
            </Typography>
          ) : null}
        </Box>
      </Stack>
      {subtitle ? (
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      ) : null}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
