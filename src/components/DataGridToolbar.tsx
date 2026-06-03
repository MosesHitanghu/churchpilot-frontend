import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export function CustomDataGridToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        px: 1.5,
        py: 1,
        gap: 1,
        justifyContent: "flex-end",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <GridToolbarFilterButton />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      <Box sx={{ minWidth: 220 }}>
        <GridToolbarQuickFilter debounceMs={300} />
      </Box>
    </GridToolbarContainer>
  );
}
