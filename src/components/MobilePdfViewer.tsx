import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TableChartIcon from "@mui/icons-material/TableChart";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { BlobProvider } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type MobilePdfViewerProps = {
  document: ReactElement;
  fileName: string;
  onExportExcel?: () => void;
};

export function MobilePdfViewer({
  document: pdfDoc,
  fileName,
  onExportExcel,
}: MobilePdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.clientWidth);
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <BlobProvider document={pdfDoc}>
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
              <Stack direction="row" alignItems="center" spacing={0.5}>
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
            <Box
              ref={containerRef}
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
