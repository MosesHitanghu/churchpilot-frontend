import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

type SiteFooterProps = {
  contained?: boolean;
};

export function SiteFooter({ contained = true }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const content = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.76)" }}>
          © {currentYear} GoodTech Solutions
        </Typography>
        <IconButton size="small" aria-label="Facebook" href="#" target="_blank" rel="noreferrer" sx={{ color: "common.white", border: 1, borderColor: "rgba(255,255,255,0.2)" }}>
          <FacebookIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" aria-label="X" href="#" target="_blank" rel="noreferrer" sx={{ color: "common.white", border: 1, borderColor: "rgba(255,255,255,0.2)" }}>
          <XIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" aria-label="LinkedIn" href="#" target="_blank" rel="noreferrer" sx={{ color: "common.white", border: 1, borderColor: "rgba(255,255,255,0.2)" }}>
          <LinkedInIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.64)" }}>
        Designed by Moses Hitanghu
      </Typography>
    </Stack>
  );

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#111827",
        color: "common.white",
        borderTop: 1,
        borderColor: "rgba(255,255,255,0.14)",
        py: 3,
      }}
    >
      {contained ? <Container maxWidth="lg">{content}</Container> : <Box sx={{ px: 2 }}>{content}</Box>}
    </Box>
  );
}
