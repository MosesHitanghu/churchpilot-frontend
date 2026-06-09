import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterListIcon from "@mui/icons-material/FilterList";
import TableChartIcon from "@mui/icons-material/TableChart";
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { BlobProvider } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import type { ReactElement, ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type MobilePdfViewerProps = {
  document: ReactElement<DocumentProps>;
  fileName: string;
  onExportExcel?: () => void;
  filterPanel?: ReactNode;
};

export function MobilePdfViewer({
  document: pdfDoc,
  fileName,
  onExportExcel,
  filterPanel,
}: MobilePdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);

  const containerCallbackRef = useCallback((el: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!el) return;
    setContainerWidth(Math.floor(el.getBoundingClientRect().width));
    observerRef.current = new ResizeObserver(([entry]) => {
      setContainerWidth(Math.floor(entry.contentRect.width));
    });
    observerRef.current.observe(el);
  }, []);

  return (
    <BlobProvider document={pdfDoc as ReactElement<DocumentProps>}>
      {({ url, loading, error }) => {
        if (loading) {
          return (
            <Box sx={{ display: "grid", placeItems: "center", minHeight: 280 }}>
              <CircularProgress size={32} />
            </Box>
          );
        }
        if (error || !url) {
          return (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body2" color="error">
                Failed to generate report.
              </Typography>
            </Box>
          );
        }

        const handleDownloadPdf = () => {
          const a = window.document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.click();
        };

        return (
          <Stack spacing={0}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1,
                py: 0.5,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                borderRadius: "4px 4px 0 0",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
                <IconButton
                  size="small"
                  color="inherit"
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber((p) => p - 1)}
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{ minWidth: 52, textAlign: "center", fontWeight: 600 }}
                >
                  {pageNumber} / {numPages || "—"}
                </Typography>
                <IconButton
                  size="small"
                  color="inherit"
                  disabled={pageNumber >= numPages}
                  onClick={() => setPageNumber((p) => p + 1)}
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Stack direction="row" spacing={0.25}>
                {filterPanel !== undefined ? (
                  <Tooltip title={filtersVisible ? "Hide Filters" : "Filters"}>
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => setFiltersVisible((v) => !v)}
                      sx={{ opacity: filtersVisible ? 1 : 0.75 }}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {onExportExcel ? (
                  <Tooltip title="Export Excel">
                    <IconButton size="small" color="inherit" onClick={onExportExcel}>
                      <TableChartIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : null}
                <Tooltip title="Download PDF">
                  <IconButton size="small" color="inherit" onClick={handleDownloadPdf}>
                    <FileDownloadIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
            {filterPanel !== undefined ? (
              <Collapse in={filtersVisible}>
                <Box
                  sx={{
                    p: 1.5,
                    border: 1,
                    borderTop: 0,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  {filterPanel}
                </Box>
              </Collapse>
            ) : null}
            <Box
              ref={containerCallbackRef}
              sx={{
                border: 1,
                borderTop: 0,
                borderColor: "divider",
                borderRadius: "0 0 4px 4px",
                overflow: "auto",
                maxHeight: { xs: 480, sm: 560 },
                bgcolor: "background.paper",
                "& .react-pdf__Page": {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            >
              <Document
                file={url}
                onLoadSuccess={({ numPages: n }) => {
                  setNumPages(n);
                  setPageNumber(1);
                }}
                loading={
                  <Box
                    sx={{ display: "grid", placeItems: "center", minHeight: 280 }}
                  >
                    <CircularProgress size={28} />
                  </Box>
                }
              >
                {containerWidth > 0 ? (
                  <Page
                    pageNumber={pageNumber}
                    width={containerWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ) : null}
              </Document>
            </Box>
          </Stack>
        );
      }}
    </BlobProvider>
  );
}
