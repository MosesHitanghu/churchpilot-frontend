import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddIcon from "@mui/icons-material/Add";
import AddPersonIcon from "@mui/icons-material/PersonAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArticleIcon from "@mui/icons-material/Article";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BlockIcon from "@mui/icons-material/Block";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GroupsIcon from "@mui/icons-material/Groups";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HubIcon from "@mui/icons-material/Hub";
import InboxIcon from "@mui/icons-material/Inbox";
import InfoIcon from "@mui/icons-material/Info";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentsIcon from "@mui/icons-material/Payments";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhoneIcon from "@mui/icons-material/Phone";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Link,
  ListItemIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  Skeleton,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  DataGrid,
  type GridColDef,
  type GridValidRowModel,
} from "@mui/x-data-grid";
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
  PickerDay,
  TimePicker,
  type PickerDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { EventCalendar } from "@mui/x-scheduler/event-calendar";
import type { SchedulerEvent } from "@mui/x-scheduler/models";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { MobilePdfViewer } from "../components/MobilePdfViewer";
import dayjs, { type Dayjs } from "dayjs";
import {
  Children,
  type DragEvent as ReactDragEvent,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { CustomDataGridToolbar } from "../components/DataGridToolbar";
import { EmptyState } from "../components/EmptyState";
import {
  CityField,
  EmailField,
  GeoFields,
  InternationalPhoneField,
} from "../components/FormFields";
import { PageHeader } from "../components/PageHeader";
import { ResourceCard } from "../components/ResourceCard";
import defaultProfilePictureAsset from "../assets/default profile picture.png";
import { useIncrementalList } from "../hooks/useIncrementalList";
import {
  api,
  getApiErrorMessage,
  type Account,
  type AccountOverview,
  type Attendance,
  type Cashbook,
  type Event,
  type ForwardedLocationReport,
  type Location,
  type LocationReport,
  type LocationRemission,
  type LocationRequisition,
  type LocationSubscription,
  type Member,
  type MfAttendance,
  type MissionalFamily,
  type MissionalFamilyMember,
  type Particular,
  type Post,
  type Role,
  type Schedule,
  type Subscription,
  type Transaction,
  type Zone,
} from "../lib/api";
import { getSessionAccount } from "../lib/session";
import { useTerminology, type TerminologyKey } from "../lib/terminology";

const locationTabActions = [
  "Create Post",
  "Add Member",
  "New CashBook",
  "Add Record",
  "Create",
  "Assign",
  "Add New",
  "Add New",
  "Create",
  "Add New",
  "Add New",
  "Create Requisition",
];
const menuBackedLocationTabs = [1, 2, 3, 10, 13];
const manageLocationContentTabs = [5, 8, 14, 15, 16];

const locationPastorRoles = [
  "Location Pastor",
  "Location Super Admin",
  "Location Super User",
];
const locationManagerRoles = [...locationPastorRoles, "Location Admin"];
const zoneScopedRoles = ["Zone Leader", "Assistant Zone Leader"];
const familyScopedRoles = [
  "Shepherd",
  "Assistant Shepherd",
  "Sheperd",
  "Assistant Sheperd",
];
const additionalLocationRoles = ["Reports Approver", "Requisitions Approver"];
const hqOnlyLocationRoles = ["Location Creator"];
const assignableLocationRoles = [
  "Location Pastor",
  "Location Admin",
  "Viewer",
  ...additionalLocationRoles,
  ...hqOnlyLocationRoles,
];

const blankActionForm = {
  title: "",
  description: "",
  type: "",
  status: "Active",
  visibility: "Public",
  user_id: "",
  audience: "Physical",
  role: "",
  scope: "Location",
  role_scope_type: "Location",
  menu_scopes: [] as string[],
  start_date: "",
  startdate: "",
  enddate: "",
  opening_balance: "",
  opening_balance_source: "manual",
  opening_balance_cashbook_id: "",
  date: "",
  time: "",
  end_time: "",
  all_day: false,
  starttime: "",
  total_attendance: "",
  total_number: "",
  venue: "",
  speakers: "",
  leader1_id: "",
  leader2_id: "",
  zone_id: "",
  sg_id: "",
  schedule_id: "",
  attendance_records: {} as Record<string, string>,
  attendance_sources: {} as Record<string, "manual" | "mf">,
  recurrence: "",
  weekday: "",
  email: "",
  phone_number: "",
  fname: "",
  lname: "",
  gender: "",
  marital_status: "",
  occupation: "",
  country: "",
  district: "",
  city: "",
  address: "",
  profile_picture: "",
};

type ActionForm = typeof blankActionForm;

const blankReportForm = {
  title: "",
  type: "Attendance",
  schedule_type: "",
  schedule_date: "",
  description: "",
  receiver_location_id: "",
  remission_id: "",
  remission_value: "",
  value: "",
  schedule_ids: [] as string[],
  particular_id: "",
  status: "Draft",
};

type ReportForm = typeof blankReportForm;

const blankRequisitionForm = {
  date: "",
  title: "",
  description: "",
  items: [{ particular_id: "", amount: "" }],
};

type RequisitionForm = typeof blankRequisitionForm;

const blankRemissionForm = {
  title: "",
  particular_id: "",
  percentage: "",
  description: "",
};

type RemissionForm = typeof blankRemissionForm;

type AggregatedReportCard = {
  scheduleDate: string;
  title: string;
  scheduleTypes: string[];
  reports: LocationReport[];
  proofAttachment?: string | null;
  sourceTitle?: string | null;
  status?: string | null;
  forwardedReport?: ForwardedLocationReport;
  attendanceTotal: number;
  attendanceScheduleCount: number;
  particulars: {
    key: string;
    label: string;
    value: number;
    scheduleIds: Set<string>;
  }[];
  particularsTotal: number;
  collectionParticularCount: number;
  collectionTotalCount: number;
  missingCollectionScheduleCount: number;
  remissions: { key: string; label: string; value: number }[];
  remissionsTotal: number;
  scheduleLabels: string[];
  scheduleSummaries: { id: string; label: string; collectionCount: number }[];
};

type CollectionReportRow = {
  key: string;
  particularId: string;
  particularTitle: string;
  remissionId: string | null;
  remissionTitle: string;
  remissionPercentage: number;
  collectionValue: number;
  remissionValue: number;
  scheduleIds: string[];
};

type CashbookTransactionReportType = "all" | "normal" | "schedule";
type ReportsView = "cards" | "locations" | "report";
type PendingReportDetail = {
  scheduleDate: string;
  scheduleType: string;
  scheduleId?: string | null;
  scheduleTitle?: string | null;
  recurrence?: string | null;
};
type PendingReportSummary = {
  count: number;
  pending?: PendingReportDetail[];
};

type CashbookTransactionReportRow = {
  no: number;
  date: string;
  particular: string;
  income: number;
  expenditure: number;
  balance: number;
};

type TransactionGridRow = Transaction & { isOpeningBalance?: boolean };

const postTypes = [
  "Testimony",
  "Prayer Request",
  "Devotional",
  "Communication",
  "Inquiry",
];
const scheduleTypes = [
  "Sunday Service",
  "Mid Week Service",
  "Discipleship",
  "Conference",
  "Workshop",
  "Seminer",
  "Overnight",
  "Meeting",
  "Bootcamp",
  "Revival",
  "Mission",
];
const scheduleRecurrences = ["Weekly", "Monthly", "Yearly", "One-Time"];
const eventTypes = [
  "Conference",
  "Workshop",
  "Seminar",
  "Revival",
  "Mission",
  "Meeting",
  "Bootcamp",
  "Overnight",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const roleTitles = [
  "Apostle",
  "Bishop",
  "Pastor",
  "Shepherd",
  "Mama",
  "Papa",
  "Location Creator",
];
const roleMenuScopes = [
  "Posts",
  "Members",
  "Finances",
  "Attendances",
  "Events",
  "Roles",
  "Zones",
  "Missional Families",
  "Schedules",
  "Branches",
  "Reports",
];
const roleMenuScopeTabIds: Record<string, number> = {
  posts: 0,
  members: 1,
  zones: 1,
  "missional families": 1,
  finances: 2,
  attendances: 3,
  events: 4,
  roles: 5,
  schedules: 8,
  branches: 9,
  reports: 10,
};
const roleMenuScopeActionTabIds: Record<string, number[]> = {
  posts: [0],
  members: [1],
  zones: [6],
  "missional families": [7],
  finances: [2, 15, 16],
  attendances: [3],
  events: [4],
  roles: [5],
  schedules: [8],
  branches: [9],
  reports: [10],
};
const createReportMenuOption = "Create Report";
const reportSettingsMenuOption = "Settings";
const allMinistryReportsMenuOption = "All Ministry Reports";
const receivedReportMenuOption = "Received";
const defaultMandatoryReportScheduleTypes = ["Sunday Service", "Discipleship"];
type ReportMenuOption =
  | "Local"
  | typeof receivedReportMenuOption
  | typeof allMinistryReportsMenuOption;
const reportMenuIcons: Record<ReportMenuOption, ReactNode> = {
  Local: <ArticleIcon fontSize="small" />,
  [receivedReportMenuOption]: <InboxIcon fontSize="small" />,
  [allMinistryReportsMenuOption]: <GroupsIcon fontSize="small" />,
};

function CircularAddButton({
  label,
  onClick,
  disabled = false,
  type = "button",
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          aria-label={label}
          type={type}
          color="primary"
          disabled={disabled}
          onClick={onClick}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" },
            "&.Mui-disabled": { bgcolor: "action.disabledBackground" },
          }}
        >
          <AddIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
}

const today = () => dayjs().format("YYYY-MM-DD");

function reportTitleForDate(value: string) {
  return value ? `${dayjs(value).format("D MMMM YYYY")} Report` : "";
}

const cashbookReportLabels: Record<CashbookTransactionReportType, string> = {
  all: "All Transactions",
  normal: "General Transactions",
  schedule: "Schedule Collections",
};
const particularTypes = ["General", "Schedule Collection"];

const cashbookReportStyles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1f2933",
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: "#5f6b7a",
    marginBottom: 14,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d7dde5",
  },
  row: {
    flexDirection: "row",
    minHeight: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e8ef",
  },
  headerRow: {
    backgroundColor: "#eef3f8",
    fontWeight: 700,
  },
  cell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#e4e8ef",
  },
  noCell: {
    width: "6%",
  },
  dateCell: {
    width: "15%",
  },
  particularCell: {
    width: "31%",
  },
  amountCell: {
    width: "16%",
    textAlign: "right",
  },
  emptyCell: {
    width: "100%",
  },
  footer: {
    marginTop: 10,
    fontSize: 8,
    color: "#5f6b7a",
  },
});

function CashbookTransactionsReportDocument({
  cashbook,
  reportType,
  startDate,
  endDate,
  particularLabel,
  rows,
  title,
}: {
  cashbook: Cashbook;
  reportType: CashbookTransactionReportType;
  startDate: string;
  endDate: string;
  particularLabel?: string;
  rows: CashbookTransactionReportRow[];
  title?: string;
}) {
  const totalIncome = rows.reduce((sum, row) => sum + row.income, 0);
  const totalExpenditure = rows.reduce((sum, row) => sum + row.expenditure, 0);
  const openingBalance = Number(cashbook.opening_balance || 0);
  const finalBalance = rows.at(-1)?.balance ?? openingBalance;
  const documentTitle =
    title ||
    `${cashbook.title || "Cashbook"} ${cashbookReportLabels[reportType]} Report`;
  return (
    <Document title={documentTitle}>
      <Page size="A4" style={cashbookReportStyles.page}>
        <Text style={cashbookReportStyles.title}>
          {cashbook.title || "Cashbook"} - {cashbookReportLabels[reportType]}
        </Text>
        <Text style={cashbookReportStyles.subtitle}>
          {[
            cashbook.location_title,
            particularLabel,
            startDate ? `From ${startDate}` : null,
            endDate ? `To ${endDate}` : null,
          ]
            .filter(Boolean)
            .join(" | ") || "All dates"}
        </Text>
        <View style={cashbookReportStyles.table}>
          <View
            style={[cashbookReportStyles.row, cashbookReportStyles.headerRow]}
          >
            <Text
              style={[cashbookReportStyles.cell, cashbookReportStyles.noCell]}
            >
              No
            </Text>
            <Text
              style={[cashbookReportStyles.cell, cashbookReportStyles.dateCell]}
            >
              Date
            </Text>
            <Text
              style={[
                cashbookReportStyles.cell,
                cashbookReportStyles.particularCell,
              ]}
            >
              Particular
            </Text>
            <Text
              style={[
                cashbookReportStyles.cell,
                cashbookReportStyles.amountCell,
              ]}
            >
              Income
            </Text>
            <Text
              style={[
                cashbookReportStyles.cell,
                cashbookReportStyles.amountCell,
              ]}
            >
              Expenditure
            </Text>
            <Text
              style={[
                cashbookReportStyles.cell,
                cashbookReportStyles.amountCell,
              ]}
            >
              Balance
            </Text>
          </View>
          {rows.length ? (
            rows.map((row) => (
              <View
                key={`${row.no}-${row.date}-${row.particular}`}
                style={cashbookReportStyles.row}
                wrap={false}
              >
                <Text
                  style={[
                    cashbookReportStyles.cell,
                    cashbookReportStyles.noCell,
                  ]}
                >
                  {row.no}
                </Text>
                <Text
                  style={[
                    cashbookReportStyles.cell,
                    cashbookReportStyles.dateCell,
                  ]}
                >
                  {row.date || "Not set"}
                </Text>
                <Text
                  style={[
                    cashbookReportStyles.cell,
                    cashbookReportStyles.particularCell,
                  ]}
                >
                  {row.particular}
                </Text>
                <Text
                  style={[
                    cashbookReportStyles.cell,
                    cashbookReportStyles.amountCell,
                  ]}
                >
                  {row.income ? row.income.toLocaleString() : "-"}
                </Text>
                <Text
                  style={[
                    cashbookReportStyles.cell,
                    cashbookReportStyles.amountCell,
                  ]}
                >
                  {row.expenditure ? row.expenditure.toLocaleString() : "-"}
                </Text>
                <Text
                  style={[
                    cashbookReportStyles.cell,
                    cashbookReportStyles.amountCell,
                  ]}
                >
                  {row.balance.toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <View style={cashbookReportStyles.row}>
              <Text
                style={[
                  cashbookReportStyles.cell,
                  cashbookReportStyles.emptyCell,
                ]}
              >
                No transactions found for this report.
              </Text>
            </View>
          )}
        </View>
        <Text style={cashbookReportStyles.footer}>
          Opening: {openingBalance.toLocaleString()} | Income:{" "}
          {totalIncome.toLocaleString()} | Expenditure:{" "}
          {totalExpenditure.toLocaleString()} | Balance:{" "}
          {finalBalance.toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
}

function ReceivedReportsDocument({
  title,
  locationTitle,
  collectionColumns,
  remissionColumns,
  rows,
}: {
  title: string;
  locationTitle?: string | null;
  collectionColumns: string[];
  remissionColumns: string[];
  rows: Array<{
    no: number;
    location: string;
    scheduleDate: string;
    schedule: string;
    attendance: number;
    collections: Record<string, number>;
    remissions: Record<string, number>;
    status: string;
  }>;
}) {
  const columns = [
    { key: "no", heading: "No", weight: 0.7, align: "left" as const },
    {
      key: "location",
      heading: "Location",
      weight: 2.1,
      align: "left" as const,
    },
    {
      key: "scheduleDate",
      heading: "Schedule Date",
      weight: 1.35,
      align: "left" as const,
    },
    {
      key: "schedule",
      heading: "Schedule",
      weight: 2.4,
      align: "left" as const,
    },
    {
      key: "attendance",
      heading: "Attendance",
      weight: 1.15,
      align: "right" as const,
    },
    ...collectionColumns.map((column) => ({
      key: `collection:${column}`,
      heading: column,
      weight: 1.15,
      align: "right" as const,
    })),
    ...remissionColumns.map((column) => ({
      key: `remission:${column}`,
      heading: column,
      weight: 1.15,
      align: "right" as const,
    })),
    { key: "status", heading: "Status", weight: 1, align: "left" as const },
  ];
  const totalWeight = columns.reduce(
    (total, column) => total + column.weight,
    0,
  );
  const columnStyle = (column: (typeof columns)[number]) => ({
    width: `${(column.weight / totalWeight) * 100}%`,
    textAlign: column.align,
    fontSize: 7,
    lineHeight: 1.25,
  });
  const cellValue = (row: (typeof rows)[number], key: string) => {
    if (key === "no") {
      return row.no;
    }
    if (key === "location") {
      return row.location;
    }
    if (key === "scheduleDate") {
      return row.scheduleDate;
    }
    if (key === "schedule") {
      return row.schedule;
    }
    if (key === "attendance") {
      return row.attendance.toLocaleString();
    }
    if (key.startsWith("collection:")) {
      const value = row.collections[key.replace("collection:", "")];
      return value ? value.toLocaleString() : "-";
    }
    if (key.startsWith("remission:")) {
      const value = row.remissions[key.replace("remission:", "")];
      return value ? value.toLocaleString() : "-";
    }
    return row.status;
  };
  const totalValue = (key: string) => {
    if (key === "no") {
      return "";
    }
    if (key === "location") {
      return "Totals";
    }
    if (["scheduleDate", "schedule"].includes(key)) {
      return "";
    }
    if (key === "attendance") {
      return rows
        .reduce((total, row) => total + row.attendance, 0)
        .toLocaleString();
    }
    if (key.startsWith("collection:")) {
      const column = key.replace("collection:", "");
      return rows
        .reduce((total, row) => total + (row.collections[column] || 0), 0)
        .toLocaleString();
    }
    if (key.startsWith("remission:")) {
      const column = key.replace("remission:", "");
      return rows
        .reduce((total, row) => total + (row.remissions[column] || 0), 0)
        .toLocaleString();
    }
    return "";
  };
  return (
    <Document title={title}>
      <Page size="A4" orientation="landscape" style={cashbookReportStyles.page}>
        <Text style={cashbookReportStyles.title}>{title}</Text>
        <Text style={cashbookReportStyles.subtitle}>
          {locationTitle || "Location"} | Most recent 5 schedule dates
        </Text>
        <View style={cashbookReportStyles.table}>
          <View
            style={[cashbookReportStyles.row, cashbookReportStyles.headerRow]}
          >
            {columns.map((column) => (
              <Text
                key={column.key}
                style={[cashbookReportStyles.cell, columnStyle(column)]}
              >
                {column.heading}
              </Text>
            ))}
          </View>
          {rows.map((row) => (
            <View
              key={`${row.no}-${row.location}-${row.scheduleDate}`}
              style={cashbookReportStyles.row}
              wrap={false}
            >
              {columns.map((column) => (
                <Text
                  key={column.key}
                  style={[cashbookReportStyles.cell, columnStyle(column)]}
                >
                  {cellValue(row, column.key)}
                </Text>
              ))}
            </View>
          ))}
          <View
            style={[cashbookReportStyles.row, cashbookReportStyles.headerRow]}
            wrap={false}
          >
            {columns.map((column) => (
              <Text
                key={column.key}
                style={[cashbookReportStyles.cell, columnStyle(column)]}
              >
                {totalValue(column.key)}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

function toPickerValue(value: string) {
  return value ? dayjs(value) : null;
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function fromPickerValue(value: Dayjs | null) {
  return value ? value.format("YYYY-MM-DD") : "";
}

function escapeExcelXml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeExportFileName(value: string) {
  return (
    value
      .replace(/[^a-z0-9-_]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "cashbook-report"
  );
}

function pdfFileName(title: string) {
  return `${safeExportFileName(title)}.pdf`;
}

function columnName(index: number) {
  let name = "";
  let current = index;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    current = Math.floor((current - 1) / 26);
  }
  return name;
}

function xlsxTextCell(row: number, column: number, value: unknown, style = 1) {
  return `<c r="${columnName(column)}${row}" t="inlineStr" s="${style}"><is><t>${escapeExcelXml(value)}</t></is></c>`;
}

function xlsxNumberCell(row: number, column: number, value: number, style = 2) {
  return `<c r="${columnName(column)}${row}" s="${style}"><v>${Number.isFinite(value) ? value : 0}</v></c>`;
}

function xlsxRow(row: number, cells: string[]) {
  return `<row r="${row}">${cells.join("")}</row>`;
}

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function littleEndian16(value: number) {
  return new Uint8Array([value & 0xff, (value >>> 8) & 0xff]);
}

function littleEndian32(value: number) {
  return new Uint8Array([
    value & 0xff,
    (value >>> 8) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 24) & 0xff,
  ]);
}

function concatBytes(parts: Uint8Array[]) {
  const totalLength = parts.reduce((total, part) => total + part.length, 0);
  const output = new Uint8Array(totalLength);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

function createZip(files: { name: string; content: string }[]) {
  const encoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const contentBytes = encoder.encode(file.content);
    const crc = crc32(contentBytes);
    const localHeader = concatBytes([
      littleEndian32(0x04034b50),
      littleEndian16(20),
      littleEndian16(0x0800),
      littleEndian16(0),
      littleEndian16(0),
      littleEndian16(0),
      littleEndian32(crc),
      littleEndian32(contentBytes.length),
      littleEndian32(contentBytes.length),
      littleEndian16(nameBytes.length),
      littleEndian16(0),
      nameBytes,
    ]);
    localParts.push(localHeader, contentBytes);

    const centralHeader = concatBytes([
      littleEndian32(0x02014b50),
      littleEndian16(20),
      littleEndian16(20),
      littleEndian16(0x0800),
      littleEndian16(0),
      littleEndian16(0),
      littleEndian16(0),
      littleEndian32(crc),
      littleEndian32(contentBytes.length),
      littleEndian32(contentBytes.length),
      littleEndian16(nameBytes.length),
      littleEndian16(0),
      littleEndian16(0),
      littleEndian16(0),
      littleEndian16(0),
      littleEndian32(0),
      littleEndian32(offset),
      nameBytes,
    ]);
    centralParts.push(centralHeader);
    offset += localHeader.length + contentBytes.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const endOfCentralDirectory = concatBytes([
    littleEndian32(0x06054b50),
    littleEndian16(0),
    littleEndian16(0),
    littleEndian16(files.length),
    littleEndian16(files.length),
    littleEndian32(centralDirectory.length),
    littleEndian32(offset),
    littleEndian16(0),
  ]);

  return concatBytes([...localParts, centralDirectory, endOfCentralDirectory]);
}

function createCashbookReportWorkbook({
  title,
  subtitle,
  rows,
  openingBalance,
  totalIncome,
  totalExpenditure,
  finalBalance,
}: {
  title: string;
  subtitle: string;
  rows: CashbookTransactionReportRow[];
  openingBalance: number;
  totalIncome: number;
  totalExpenditure: number;
  finalBalance: number;
}) {
  const sheetRows = [
    xlsxRow(1, [
      `<c r="A1" t="inlineStr" s="3"><is><t>${escapeExcelXml(title)}</t></is></c>`,
    ]),
    xlsxRow(2, [
      `<c r="A2" t="inlineStr" s="1"><is><t>${escapeExcelXml(subtitle)}</t></is></c>`,
    ]),
    xlsxRow(
      4,
      ["No", "Date", "Particular", "Income", "Expenditure", "Balance"].map(
        (heading, index) => xlsxTextCell(4, index + 1, heading, 3),
      ),
    ),
    ...(rows.length
      ? rows.map((row, index) => {
          const excelRow = index + 5;
          return xlsxRow(excelRow, [
            xlsxNumberCell(excelRow, 1, row.no, 1),
            xlsxTextCell(excelRow, 2, row.date || "Not set", 1),
            xlsxTextCell(excelRow, 3, row.particular, 1),
            row.income
              ? xlsxNumberCell(excelRow, 4, row.income)
              : xlsxTextCell(excelRow, 4, "", 1),
            row.expenditure
              ? xlsxNumberCell(excelRow, 5, row.expenditure)
              : xlsxTextCell(excelRow, 5, "", 1),
            xlsxNumberCell(excelRow, 6, row.balance),
          ]);
        })
      : [
          xlsxRow(5, [
            xlsxTextCell(5, 1, "No transactions found for this report.", 1),
          ]),
        ]),
  ];
  const openingRow = rows.length + 6;
  sheetRows.push(
    xlsxRow(openingRow, [
      xlsxTextCell(openingRow, 1, "Summary", 3),
      xlsxTextCell(openingRow, 2, "", 3),
      xlsxTextCell(openingRow, 3, "Opening", 3),
      xlsxTextCell(openingRow, 4, "", 3),
      xlsxTextCell(openingRow, 5, "", 3),
      xlsxNumberCell(openingRow, 6, openingBalance, 4),
    ]),
  );
  const totalsRow = openingRow + 1;
  sheetRows.push(
    xlsxRow(totalsRow, [
      xlsxTextCell(totalsRow, 1, "Totals", 3),
      xlsxTextCell(totalsRow, 2, "", 3),
      xlsxTextCell(totalsRow, 3, "", 3),
      xlsxNumberCell(totalsRow, 4, totalIncome, 4),
      xlsxNumberCell(totalsRow, 5, totalExpenditure, 4),
      xlsxNumberCell(totalsRow, 6, finalBalance, 4),
    ]),
  );

  const worksheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView showGridLines="1" workbookViewId="0" /></sheetViews>
  <cols>
    <col min="1" max="1" width="8" customWidth="1" />
    <col min="2" max="2" width="16" customWidth="1" />
    <col min="3" max="3" width="34" customWidth="1" />
    <col min="4" max="6" width="16" customWidth="1" />
  </cols>
  <sheetData>${sheetRows.join("")}</sheetData>
  <mergeCells count="2"><mergeCell ref="A1:F1" /><mergeCell ref="A2:F2" /></mergeCells>
</worksheet>`;

  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0.00" /></numFmts>
  <fonts count="2"><font><sz val="11" /><name val="Calibri" /></font><font><b /><sz val="11" /><name val="Calibri" /></font></fonts>
  <fills count="2"><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="solid"><fgColor rgb="FFEFF4FA" /><bgColor indexed="64" /></patternFill></fill></fills>
  <borders count="2"><border /><border><left style="thin"><color rgb="FFD7DDE5" /></left><right style="thin"><color rgb="FFD7DDE5" /></right><top style="thin"><color rgb="FFD7DDE5" /></top><bottom style="thin"><color rgb="FFD7DDE5" /></bottom></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs>
  <cellXfs count="5">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" />
    <xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" />
    <xf numFmtId="0" fontId="1" fillId="1" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" />
    <xf numFmtId="164" fontId="1" fillId="1" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" />
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles>
</styleSheet>`;

  return createZip([
    {
      name: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="xml" ContentType="application/xml" />
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />
</Types>`,
    },
    {
      name: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml" />
</Relationships>`,
    },
    {
      name: "xl/workbook.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Transactions" sheetId="1" r:id="rId1" /></sheets>
</workbook>`,
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml" />
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />
</Relationships>`,
    },
    { name: "xl/styles.xml", content: styles },
    { name: "xl/worksheets/sheet1.xml", content: worksheet },
  ]);
}

function createReceivedReportsWorkbook({
  title,
  collectionColumns,
  remissionColumns,
  rows,
}: {
  title: string;
  collectionColumns: string[];
  remissionColumns: string[];
  rows: Array<{
    no: number;
    location: string;
    scheduleDate: string;
    schedule: string;
    attendance: number;
    collections: Record<string, number>;
    remissions: Record<string, number>;
    status: string;
  }>;
}) {
  const colCount = 6 + collectionColumns.length + remissionColumns.length;
  const lastColName = columnName(colCount);
  const headers = [
    "No", "Location", "Date", "Schedule", "Attendance",
    ...collectionColumns,
    ...remissionColumns,
    "Status",
  ];
  const sheetRows = [
    xlsxRow(1, [
      `<c r="A1" t="inlineStr" s="3"><is><t>${escapeExcelXml(title)}</t></is></c>`,
    ]),
    xlsxRow(
      4,
      headers.map((heading, index) => xlsxTextCell(4, index + 1, heading, 3)),
    ),
    ...(rows.length
      ? rows.map((row, index) => {
          const excelRow = index + 5;
          return xlsxRow(excelRow, [
            xlsxNumberCell(excelRow, 1, row.no, 1),
            xlsxTextCell(excelRow, 2, row.location, 1),
            xlsxTextCell(excelRow, 3, row.scheduleDate || "Not set", 1),
            xlsxTextCell(excelRow, 4, row.schedule, 1),
            xlsxNumberCell(excelRow, 5, row.attendance, 1),
            ...collectionColumns.map((col, ci) => {
              const val = row.collections[col] ?? 0;
              return val
                ? xlsxNumberCell(excelRow, 6 + ci, val)
                : xlsxTextCell(excelRow, 6 + ci, "", 1);
            }),
            ...remissionColumns.map((col, ri) => {
              const val = row.remissions[col] ?? 0;
              return val
                ? xlsxNumberCell(excelRow, 6 + collectionColumns.length + ri, val)
                : xlsxTextCell(excelRow, 6 + collectionColumns.length + ri, "", 1);
            }),
            xlsxTextCell(excelRow, colCount, row.status, 1),
          ]);
        })
      : [xlsxRow(5, [xlsxTextCell(5, 1, "No reports found.", 1)])]),
  ];

  const worksheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView showGridLines="1" workbookViewId="0" /></sheetViews>
  <cols>
    <col min="1" max="1" width="6" customWidth="1" />
    <col min="2" max="2" width="26" customWidth="1" />
    <col min="3" max="4" width="16" customWidth="1" />
    <col min="5" max="${colCount}" width="14" customWidth="1" />
  </cols>
  <sheetData>${sheetRows.join("")}</sheetData>
  <mergeCells count="1"><mergeCell ref="A1:${lastColName}1" /></mergeCells>
</worksheet>`;

  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0.00" /></numFmts>
  <fonts count="2"><font><sz val="11" /><name val="Calibri" /></font><font><b /><sz val="11" /><name val="Calibri" /></font></fonts>
  <fills count="2"><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="solid"><fgColor rgb="FFEFF4FA" /><bgColor indexed="64" /></patternFill></fill></fills>
  <borders count="2"><border /><border><left style="thin"><color rgb="FFD7DDE5" /></left><right style="thin"><color rgb="FFD7DDE5" /></right><top style="thin"><color rgb="FFD7DDE5" /></top><bottom style="thin"><color rgb="FFD7DDE5" /></bottom></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs>
  <cellXfs count="5">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" />
    <xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" />
    <xf numFmtId="0" fontId="1" fillId="1" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" />
    <xf numFmtId="164" fontId="1" fillId="1" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" />
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles>
</styleSheet>`;

  return createZip([
    {
      name: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="xml" ContentType="application/xml" />
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />
</Types>`,
    },
    {
      name: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml" />
</Relationships>`,
    },
    {
      name: "xl/workbook.xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Reports" sheetId="1" r:id="rId1" /></sheets>
</workbook>`,
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml" />
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />
</Relationships>`,
    },
    { name: "xl/styles.xml", content: styles },
    { name: "xl/worksheets/sheet1.xml", content: worksheet },
  ]);
}

function toTimePickerValue(value: string) {
  return value ? dayjs(`2000-01-01T${value}`) : null;
}

function fromTimePickerValue(value: Dayjs | null) {
  return value ? value.format("HH:mm") : "";
}

function formatScheduleTime(value?: string | null) {
  return value ? dayjs(`2000-01-01T${value}`).format("hh:mm A") : "";
}

function formatDisplayDate(value?: string | null) {
  if (!value) {
    return "Not set";
  }
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format("D MMMM YYYY") : value;
}

function useResource<T>(url: string | null) {
  const [resource, setResource] = useState<{
    data: T | null;
    url: string | null;
  }>({ data: null, url: null });
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!url) {
      setResource({ data: null, url: null });
      setError("");
      return;
    }
    setResource({ data: null, url });
    setError("");
    api
      .get<T>(url)
      .then((response) => {
        if (!cancelled) {
          setResource({ data: response.data, url });
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(getApiErrorMessage(requestError, "Failed to load resource"));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return {
    data: resource.url === url ? resource.data : null,
    setData: (data: T | null) => setResource({ data, url }),
    error,
  };
}

function LoadingOrError({ error }: { error: string }) {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  return <LocationTabSkeleton />;
}

type ResponsiveGridSize = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

function IncrementalGrid<T>({
  items,
  getKey,
  renderItem,
  gridSize,
  batchSize = 9,
  resetKey = "",
}: {
  items: T[];
  getKey: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
  gridSize: ResponsiveGridSize;
  batchSize?: number;
  resetKey?: string;
}) {
  const { visibleItems, sentinelRef, hasMore } = useIncrementalList(
    items,
    batchSize,
    resetKey,
  );

  return (
    <Stack spacing={1.5}>
      <Grid container spacing={2}>
        {visibleItems.map((item, index) => (
          <Grid key={getKey(item, index)} size={gridSize}>
            {renderItem(item, index)}
          </Grid>
        ))}
      </Grid>
      {hasMore ? <Box ref={sentinelRef} sx={{ height: 24 }} /> : null}
    </Stack>
  );
}

function LocationTabSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Skeleton variant="rounded" height={40} sx={{ flex: 1 }} />
          <Skeleton
            variant="rounded"
            height={40}
            sx={{ width: { xs: "100%", sm: 180 } }}
          />
        </Stack>
        <Grid container spacing={2}>
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <Grid key={item} size={{ xs: 12, md: 6, xl: 4 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={1.25}>
                  <Skeleton variant="rounded" height={150} />
                  <Skeleton variant="text" width="72%" />
                  <Skeleton variant="text" width="48%" />
                  <Skeleton variant="rounded" height={34} />
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

function memberName(
  accounts: Account[],
  userId?: string | null,
  displayName?: string | null,
) {
  if (displayName) {
    return displayName;
  }
  const account = accounts.find((item) => item.id === userId);
  return account
    ? accountOptionLabel(account)
    : userId
      ? "Unknown account"
      : "Not assigned";
}

function accountDetail(
  accounts: Account[],
  userId: string | null | undefined,
  field: keyof Account,
  fallback?: string | null,
) {
  if (fallback) {
    return fallback;
  }
  const account = accounts.find((item) => item.id === userId);
  return account?.[field] || "Not set";
}

function memberPhone(
  accounts: Account[],
  userId?: string | null,
  phoneNumber?: string | null,
) {
  if (phoneNumber) {
    return phoneNumber;
  }
  const account = accounts.find((item) => item.id === userId);
  return account?.phone_number || "Phone not set";
}

function idsEqual(
  left?: string | number | null,
  right?: string | number | null,
) {
  return String(left ?? "") === String(right ?? "");
}

function mfAttendanceTotalForSchedule(
  mfAttendances: MfAttendance[],
  scheduleId: string,
  date: string,
) {
  return mfAttendances
    .filter(
      (attendance) =>
        attendance.schedule_id === scheduleId && attendance.adate === date,
    )
    .reduce(
      (total, attendance) => total + Number(attendance.total_number || 0),
      0,
    );
}

function mfAttendanceCoverageForSchedule(
  mfAttendances: MfAttendance[],
  missionalFamilies: MissionalFamily[],
  scheduleId: string,
  date: string,
) {
  const recordedFamilyIds = new Set(
    mfAttendances
      .filter(
        (attendance) =>
          attendance.schedule_id === scheduleId &&
          attendance.adate === date &&
          attendance.sg_id,
      )
      .map((attendance) => attendance.sg_id),
  );
  const total = missionalFamilies.length;
  const recorded = recordedFamilyIds.size;
  const percentage = total > 0 ? Math.round((recorded / total) * 100) : 0;
  return { recorded, total, percentage };
}

function attendanceValueMissing(value: string | undefined) {
  return value === undefined || value.trim() === "";
}

function effectiveLocationRole(roles: Role[], userId?: string | null) {
  const precedence = [
    "Location Pastor",
    "Location Super Admin",
    "Location Super User",
    "Location Admin",
    "Reports Approver",
    "Requisitions Approver",
    ...zoneScopedRoles,
    ...familyScopedRoles,
    "Viewer",
    "Evaluator",
    "Location Member",
  ];
  return roles
    .filter(
      (role) =>
        role.user_id === userId &&
        role.scope === "Location" &&
        role.status === "Active",
    )
    .sort((left, right) => {
      const leftRank = precedence.indexOf(left.role || "");
      const rightRank = precedence.indexOf(right.role || "");
      return (
        (leftRank === -1 ? precedence.length : leftRank) -
        (rightRank === -1 ? precedence.length : rightRank)
      );
    })[0];
}

function menuScopedLocationTabIds(roles: Role[], userId?: string | null) {
  const tabIds = new Set<number>();
  roles
    .filter(
      (role) =>
        role.user_id === userId &&
        role.status === "Active" &&
        role.scope !== "Location",
    )
    .forEach((role) => {
      (role.scope || "")
        .split(",")
        .map((scope) => scope.trim().toLowerCase())
        .forEach((scope) => {
          const tabId = roleMenuScopeTabIds[scope];
          if (tabId !== undefined) {
            tabIds.add(tabId);
          }
        });
    });
  return Array.from(tabIds);
}

function menuScopedManagerActionTabIds(roles: Role[], userId?: string | null) {
  const tabIds = new Set<number>();
  roles
    .filter(
      (role) =>
        role.user_id === userId &&
        role.status === "Active" &&
        role.scope !== "Location" &&
        locationManagerRoles.includes(role.role || ""),
    )
    .forEach((role) => {
      (role.scope || "")
        .split(",")
        .map((scope) => scope.trim().toLowerCase())
        .forEach((scope) => {
          roleMenuScopeActionTabIds[scope]?.forEach((tabId) =>
            tabIds.add(tabId),
          );
        });
    });
  return Array.from(tabIds);
}

function menuScopedPastorActionTabIds(roles: Role[], userId?: string | null) {
  const tabIds = new Set<number>();
  roles
    .filter(
      (role) =>
        role.user_id === userId &&
        role.status === "Active" &&
        role.scope !== "Location" &&
        locationPastorRoles.includes(role.role || ""),
    )
    .forEach((role) => {
      (role.scope || "")
        .split(",")
        .map((scope) => scope.trim().toLowerCase())
        .forEach((scope) => {
          roleMenuScopeActionTabIds[scope]?.forEach((tabId) =>
            tabIds.add(tabId),
          );
        });
    });
  return Array.from(tabIds);
}

function DataGridPanel<T extends GridValidRowModel>({
  rows,
  columns,
  getRowId,
  empty,
}: {
  rows: T[];
  columns: GridColDef<T>[];
  getRowId: (row: T) => string | number;
  empty: string;
}) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title={empty}
        message="New records will appear here after they are created."
      />
    );
  }
  const hasNumberColumn = columns.some((column) => column.field === "no");
  const displayedRows = hasNumberColumn
    ? rows
    : rows.map((row, index) => ({ ...row, __no: index + 1 }));
  const displayedColumns: GridColDef<GridValidRowModel>[] = hasNumberColumn
    ? (columns as GridColDef<GridValidRowModel>[])
    : [
        {
          field: "__no",
          headerName: "No",
          width: 72,
          sortable: false,
          filterable: false,
        },
        ...(columns as GridColDef<GridValidRowModel>[]),
      ];
  return (
    <Paper variant="outlined" sx={{ height: 460, width: "100%" }}>
      <DataGrid
        rows={displayedRows}
        columns={displayedColumns}
        getRowId={(row) => getRowId(row as T)}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        slots={{ toolbar: CustomDataGridToolbar }}
        showToolbar
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

function scheduleOccursOnDate(schedule: Schedule, date: string) {
  if (!date) {
    return false;
  }
  if (schedule.recurrence === "Weekly" && schedule.weekday != null) {
    return Number(schedule.weekday) === new Date(`${date}T00:00:00`).getDay();
  }
  if (schedule.recurrence === "Monthly" && schedule.date) {
    return dayjs(schedule.date).date() === dayjs(date).date();
  }
  if (schedule.recurrence === "Yearly" && schedule.date) {
    const source = dayjs(schedule.date);
    const candidate = dayjs(date);
    return (
      source.month() === candidate.month() && source.date() === candidate.date()
    );
  }
  return schedule.date === date;
}

function isFuturePickerDay(day: Dayjs) {
  return day.isAfter(dayjs(), "day");
}

function disableFutureSchedulePickerDay(day: Dayjs, schedules: Schedule[]) {
  if (isFuturePickerDay(day)) {
    return true;
  }
  const date = day.format("YYYY-MM-DD");
  return !schedules.some((schedule) => scheduleOccursOnDate(schedule, date));
}

function scheduleLabel(schedule: Schedule) {
  const when = (() => {
    if (schedule.recurrence === "Weekly" && schedule.weekday != null) {
      return `Every ${weekdays[Number(schedule.weekday)]}`;
    }
    if (schedule.recurrence === "Monthly" && schedule.date) {
      return `Monthly on day ${dayjs(schedule.date).date()}`;
    }
    if (schedule.recurrence === "Yearly" && schedule.date) {
      return `Yearly on ${dayjs(schedule.date).format("MMM D")}`;
    }
    return schedule.date;
  })();
  const time = schedule.all_day
    ? "All day"
    : [formatScheduleTime(schedule.time), formatScheduleTime(schedule.end_time)]
        .filter(Boolean)
        .join(" - ");
  return (
    [schedule.title, schedule.type, when, time].filter(Boolean).join(" - ") ||
    `Schedule #${schedule.id}`
  );
}

function scheduleWhenText(schedule: Schedule) {
  const timeText = schedule.all_day
    ? "All day"
    : [formatScheduleTime(schedule.time), formatScheduleTime(schedule.end_time)]
        .filter(Boolean)
        .join(" - ") || "Time not set";
  if (schedule.recurrence === "Weekly" && schedule.weekday != null) {
    return `Every ${weekdays[Number(schedule.weekday)]}, ${timeText}`;
  }
  if (schedule.recurrence === "Monthly" && schedule.date) {
    return `Every month on day ${dayjs(schedule.date).date()}, ${timeText}`;
  }
  if (schedule.recurrence === "Yearly" && schedule.date) {
    return `Every year on ${dayjs(schedule.date).format("MMMM D")}, ${timeText}`;
  }
  return [schedule.date, timeText].filter(Boolean).join(", ") || "Not set";
}

function scheduleOptionLabel(schedule: Schedule) {
  return schedule.title || `Schedule #${schedule.id}`;
}

function scheduleNameTypeLabel(schedule: Schedule) {
  return [schedule.title, schedule.type].filter(Boolean).join(" - ");
}

function uniqueScheduleTypes(schedules: Schedule[]) {
  return Array.from(
    new Set(
      schedules.map((schedule) => schedule.type).filter(Boolean) as string[],
    ),
  );
}

function scheduleHasMissedAttendance(
  schedule: Schedule,
  attendances: Attendance[],
  startDate?: string | null,
  mandatoryTypes: string[] = [],
) {
  if (!mandatoryTypes.includes(schedule.type || "")) {
    return false;
  }
  return occurrenceDates(schedule, dayjs(), startDate).some((occurrence) => {
    const occurrenceDate = occurrence.format("YYYY-MM-DD");
    const isDue =
      occurrenceDate < today() ||
      (occurrenceDate === today() &&
        Boolean(schedule.time) &&
        schedule.time! <= dayjs().format("HH:mm:ss"));
    return (
      isDue &&
      !attendances.some(
        (attendance) =>
          attendance.schedule_id === schedule.id &&
          attendance.date === occurrenceDate,
      )
    );
  });
}

function occurrenceDates(
  schedule: Schedule,
  anchorDate: Dayjs,
  startDate?: string | null,
) {
  const minimumDate =
    startDate && dayjs(startDate).isValid()
      ? dayjs(startDate).startOf("day")
      : null;
  const rangeStart =
    minimumDate &&
    minimumDate.isAfter(
      anchorDate.subtract(18, "month").startOf("month"),
      "day",
    )
      ? minimumDate
      : anchorDate.subtract(18, "month").startOf("month");
  const rangeEnd = anchorDate.add(18, "month").endOf("month");
  const dates: Dayjs[] = [];
  if (schedule.recurrence === "Weekly" && schedule.weekday != null) {
    let current = rangeStart.day(Number(schedule.weekday));
    if (current.isBefore(rangeStart, "day")) {
      current = current.add(1, "week");
    }
    while (!current.isAfter(rangeEnd, "day")) {
      dates.push(current);
      current = current.add(1, "week");
    }
    return dates;
  }
  if (!schedule.date) {
    return dates;
  }
  const source = dayjs(schedule.date);
  if (schedule.recurrence === "Monthly") {
    let currentMonth = rangeStart.startOf("month");
    while (!currentMonth.isAfter(rangeEnd, "month")) {
      if (source.date() <= currentMonth.daysInMonth()) {
        dates.push(currentMonth.date(source.date()));
      }
      currentMonth = currentMonth.add(1, "month");
    }
    return dates;
  }
  if (schedule.recurrence === "Yearly") {
    for (let year = rangeStart.year(); year <= rangeEnd.year(); year += 1) {
      const candidate = dayjs(
        `${year}-${String(source.month() + 1).padStart(2, "0")}-${String(source.date()).padStart(2, "0")}`,
      );
      if (
        candidate.isValid() &&
        candidate.month() === source.month() &&
        candidate.date() === source.date() &&
        !candidate.isBefore(rangeStart, "day") &&
        !candidate.isAfter(rangeEnd, "day")
      ) {
        dates.push(candidate);
      }
    }
    return dates;
  }
  if (!source.isBefore(rangeStart, "day") && !source.isAfter(rangeEnd, "day")) {
    dates.push(source);
  }
  return dates;
}

function renderScheduleAwareDay(
  schedules: Schedule[],
  recordedDates = new Set<string>(),
) {
  return (props: PickerDayProps) => {
    const date = props.day.format("YYYY-MM-DD");
    const hasSchedules = schedules.some((schedule) =>
      scheduleOccursOnDate(schedule, date),
    );
    const isRecorded = recordedDates.has(date);
    const isToday = props.today;
    const scheduleBgcolor = isRecorded ? "action.selected" : "secondary.main";
    const scheduleColor = isRecorded
      ? "text.primary"
      : "secondary.contrastText";

    return (
      <PickerDay
        {...props}
        key={date}
        sx={{
          ...(hasSchedules
            ? {
                bgcolor: scheduleBgcolor,
                color: scheduleColor,
                ...(isToday
                  ? {
                      border: "1px solid",
                      borderColor: "#000000",
                    }
                  : null),
                "&:hover, &.Mui-selected, &.Mui-selected:hover, &.Mui-disabled":
                  {
                    bgcolor: scheduleBgcolor,
                    color: scheduleColor,
                  },
                "&.Mui-disabled": {
                  opacity: 0.65,
                },
              }
            : null),
        }}
      />
    );
  };
}

function ScheduleCalendar({
  schedules,
  attendances,
  startDate,
  mandatoryTypes,
  canManage = false,
  onDetails,
  onEdit,
  onRemove,
}: {
  schedules: Schedule[];
  attendances: Attendance[];
  startDate?: string | null;
  mandatoryTypes?: string[];
  canManage?: boolean;
  onDetails: (schedule: Schedule) => void;
  onEdit: (schedule: Schedule) => void;
  onRemove: (schedule: Schedule) => void;
}) {
  const [visibleDate, setVisibleDate] = useState(() => new Date());
  const [selectedScheduleDate, setSelectedScheduleDate] =
    useState<Dayjs | null>(() => dayjs());
  const [scheduleMenuAnchor, setScheduleMenuAnchor] =
    useState<HTMLElement | null>(null);
  const [menuSchedule, setMenuSchedule] = useState<Schedule | null>(null);
  const [scheduleSearch, setScheduleSearch] = useState("");
  if (schedules.length === 0) {
    return (
      <EmptyState
        title="No schedules for this location yet"
        message="Scheduled activities will appear here after they are created."
      />
    );
  }

  const normalizedScheduleSearch = scheduleSearch.trim().toLowerCase();
  const scheduleDay = renderScheduleAwareDay(
    schedules,
    new Set(
      attendances
        .map((attendance) => attendance.date)
        .filter(Boolean) as string[],
    ),
  );
  const anchorDate = dayjs(visibleDate);
  const calendarOccurrences: SchedulerEvent[] = schedules.flatMap((schedule) =>
    occurrenceDates(schedule, anchorDate, startDate).map((occurrence) => {
      const occurrenceDate = occurrence.format("YYYY-MM-DD");
      const isDue =
        occurrenceDate < today() ||
        (occurrenceDate === today() &&
          Boolean(schedule.time) &&
          schedule.time! <= dayjs().format("HH:mm:ss"));
      const hasAttendance = attendances.some(
        (attendance) =>
          attendance.schedule_id === schedule.id &&
          attendance.date === occurrenceDate,
      );
      const isMissedMandatoryAttendance =
        (mandatoryTypes || []).includes(schedule.type || "") &&
        isDue &&
        !hasAttendance;
      const start =
        schedule.all_day || !schedule.time
          ? occurrenceDate
          : `${occurrenceDate}T${schedule.time}`;
      const end = schedule.all_day
        ? occurrence.add(1, "day").format("YYYY-MM-DD")
        : schedule.end_time
          ? `${occurrenceDate}T${schedule.end_time}`
          : schedule.time
            ? `${occurrenceDate}T${dayjs(`${occurrenceDate}T${schedule.time}`).add(1, "hour").format("HH:mm:ss")}`
            : occurrence.add(1, "day").format("YYYY-MM-DD");
      return {
        id: `${schedule.id}-${occurrenceDate}`,
        title: isMissedMandatoryAttendance
          ? schedule.title || `Schedule #${schedule.id}`
          : schedule.title || `Schedule #${schedule.id}`,
        start,
        end,
        allDay: Boolean(schedule.all_day || !schedule.time),
        color: isMissedMandatoryAttendance ? "amber" : undefined,
      };
    }),
  );
  const calendarEvents = Object.values(
    calendarOccurrences.reduce<Record<string, SchedulerEvent[]>>(
      (groups, event) => {
        const key = `${String(event.start)}|${String(event.end)}|${String(event.allDay)}`;
        groups[key] = [...(groups[key] || []), event];
        return groups;
      },
      {},
    ),
  ).map((eventsAtSameTime) => {
    if (eventsAtSameTime.length === 1) {
      return eventsAtSameTime[0];
    }
    return {
      ...eventsAtSameTime[0],
      id: eventsAtSameTime.map((event) => event.id).join("__"),
      title: eventsAtSameTime.map((event) => `• ${event.title}`).join("\n"),
    };
  });
  const visibleRangeStart = anchorDate.startOf("month");
  const visibleRangeEnd = anchorDate.endOf("month");
  const desktopFilteredSchedules = schedules.filter(
    (schedule) =>
      occurrenceDates(schedule, anchorDate, startDate).some(
        (occurrence) =>
          !occurrence.isBefore(visibleRangeStart, "day") &&
          !occurrence.isAfter(visibleRangeEnd, "day"),
      ) &&
      (!normalizedScheduleSearch ||
        [
          schedule.title,
          schedule.type,
          schedule.recurrence,
          scheduleWhenText(schedule),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedScheduleSearch)),
  );
  const groupedSchedules = desktopFilteredSchedules.reduce<
    Record<string, Schedule[]>
  >((groups, schedule) => {
    const key = scheduleWhenText(schedule);
    groups[key] = [...(groups[key] || []), schedule];
    return groups;
  }, {});

  return (
    <Paper variant="outlined" sx={{ height: "100%", overflow: "hidden" }}>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: { xs: 1.5, sm: 2 },
            }}
          >
            <DateCalendar
              value={selectedScheduleDate}
              onChange={(value) => {
                setSelectedScheduleDate(value);
                if (value) {
                  setVisibleDate(value.toDate());
                }
              }}
              onMonthChange={(value) => setVisibleDate(value.toDate())}
              onYearChange={(value) => setVisibleDate(value.toDate())}
              slots={{ day: scheduleDay }}
              sx={{ width: "100%", maxWidth: 420 }}
            />
          </Box>
        </LocalizationProvider>
        <Divider />
        <Stack spacing={2} sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
              {anchorDate.format("MMMM YYYY")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desktopFilteredSchedules.length} schedule
              {desktopFilteredSchedules.length === 1 ? "" : "s"} in this month
            </Typography>
          </Box>
          <TextField
            label="Search schedules"
            value={scheduleSearch}
            onChange={(event) => setScheduleSearch(event.target.value)}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <List
            dense
            disablePadding
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            {desktopFilteredSchedules.map((schedule) => (
              <ListItem
                key={schedule.id}
                divider
                secondaryAction={
                  <IconButton
                    aria-label={`Actions for ${schedule.title || "schedule"}`}
                    onClick={(event) => {
                      setMenuSchedule(schedule);
                      setScheduleMenuAnchor(event.currentTarget);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                sx={{ py: 1, pr: 6 }}
              >
                <ListItemIcon sx={{ minWidth: 34 }}>
                  <CalendarMonthIcon
                    color={
                      scheduleHasMissedAttendance(
                        schedule,
                        attendances,
                        startDate,
                        mandatoryTypes,
                      )
                        ? "warning"
                        : "secondary"
                    }
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={schedule.title || `Schedule #${schedule.id}`}
                  secondary={[
                    schedule.type || "Schedule",
                    scheduleWhenText(schedule),
                  ]
                    .filter(Boolean)
                    .join(" - ")}
                />
              </ListItem>
            ))}
          </List>
          {desktopFilteredSchedules.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No schedules match this month.
            </Typography>
          ) : null}
        </Stack>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ height: 720, p: 2 }}>
          <EventCalendar
            events={calendarEvents}
            visibleDate={visibleDate}
            onVisibleDateChange={setVisibleDate}
            views={["month", "week", "agenda"]}
            defaultView="agenda"
            defaultPreferences={{ isSidePanelOpen: false }}
            sx={{
              "& .MuiEventCalendar-timeGridEventTitle": {
                display: "block",
                whiteSpace: "pre-line",
                WebkitLineClamp: "unset",
              },
            }}
          />
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ p: 2.5 }}>
          <TextField
            label="Search schedules"
            value={scheduleSearch}
            onChange={(event) => setScheduleSearch(event.target.value)}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          {Object.entries(groupedSchedules).map(([when, items]) => (
            <Box key={when}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 0.75, color: "text.secondary" }}
              >
                {when}
              </Typography>
              <List
                dense
                disablePadding
                sx={{ pl: 2.5, listStyleType: "disc" }}
              >
                {items.map((schedule, index) => (
                  <ListItem
                    key={schedule.id}
                    disableGutters
                    sx={{
                      display: "list-item",
                      py: 0.35,
                      px: 1,
                      bgcolor:
                        index % 2 === 0 ? "background.default" : "action.hover",
                      "&::marker": {
                        color: scheduleHasMissedAttendance(
                          schedule,
                          attendances,
                          startDate,
                          mandatoryTypes,
                        )
                          ? "warning.main"
                          : "text.primary",
                      },
                    }}
                    secondaryAction={
                      <IconButton
                        aria-label={`Actions for ${schedule.title || "schedule"}`}
                        onClick={(event) => {
                          setMenuSchedule(schedule);
                          setScheduleMenuAnchor(event.currentTarget);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={schedule.title || `Schedule #${schedule.id}`}
                      secondary={schedule.type || "Schedule"}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
          {desktopFilteredSchedules.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No schedules match your search.
            </Typography>
          ) : null}
        </Stack>
      </Box>
      <Menu
        anchorEl={scheduleMenuAnchor}
        open={Boolean(scheduleMenuAnchor)}
        onClose={() => setScheduleMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            if (menuSchedule) {
              onDetails(menuSchedule);
            }
            setScheduleMenuAnchor(null);
          }}
        >
          Details
        </MenuItem>
        {canManage ? (
          <MenuItem
            onClick={() => {
              if (menuSchedule) {
                onEdit(menuSchedule);
              }
              setScheduleMenuAnchor(null);
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
        ) : null}
        {canManage ? (
          <MenuItem
            onClick={() => {
              if (menuSchedule) {
                onRemove(menuSchedule);
              }
              setScheduleMenuAnchor(null);
            }}
          >
            Remove
          </MenuItem>
        ) : null}
      </Menu>
    </Paper>
  );
}

export function LocationDetailPage() {
  const { locationId } = useParams();
  const {
    data: location,
    setData: setLocation,
    error,
  } = useResource<Location>(locationId ? `/locations/${locationId}` : null);
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const account = getSessionAccount();
  const ministryTerminologyId =
    location?.owner_id || (account?.type !== "Personal" ? account?.id : null);
  const { term } = useTerminology(ministryTerminologyId);
  const [activeTab, setActiveTab] = useState(10);
  const [cashbooks, setCashbooks] = useState<Cashbook[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [ministryMembers, setMinistryMembers] = useState<Member[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [missionalFamilies, setMissionalFamilies] = useState<MissionalFamily[]>(
    [],
  );
  const [missionalFamilyMembers, setMissionalFamilyMembers] = useState<
    MissionalFamilyMember[]
  >([]);
  const [mfAttendances, setMfAttendances] = useState<MfAttendance[]>([]);
  const [attendanceSubTab, setAttendanceSubTab] = useState(0);
  const [attendanceTabMenuAnchor, setAttendanceTabMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [financeView, setFinanceView] = useState<"cashbooks" | "requisitions">(
    "cashbooks",
  );
  const [financeMenuAnchor, setFinanceMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [membershipView, setMembershipView] = useState<
    "members" | "zones" | "missionalFamilies" | "branches"
  >("members");
  const [membershipMenuAnchor, setMembershipMenuAnchor] =
    useState<null | HTMLElement>(null);
  const locationTabsRef = useRef<HTMLDivElement | null>(null);
  const [hiddenLocationTabCounts, setHiddenLocationTabCounts] = useState({
    left: 0,
    right: 0,
  });
  const [attendanceCreateScope, setAttendanceCreateScope] = useState<
    "location" | "mf"
  >("location");
  const [attendanceMenuAnchor, setAttendanceMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null);
  const [selectedMfAttendance, setSelectedMfAttendance] =
    useState<MfAttendance | null>(null);
  const [attendanceEditOpen, setAttendanceEditOpen] = useState(false);
  const [mfAttendanceEditOpen, setMfAttendanceEditOpen] = useState(false);
  const [attendanceEditError, setAttendanceEditError] = useState("");
  const [attendanceEditForm, setAttendanceEditForm] = useState({
    date: "",
    schedule_id: "",
    total_attendance: "",
    remarks: "",
  });
  const [mfAttendanceEditForm, setMfAttendanceEditForm] = useState({
    adate: "",
    sg_id: "",
    schedule_id: "",
    total_number: "",
    remarks: "",
  });
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [ministrySchedules, setMinistrySchedules] = useState<Schedule[]>([]);
  const [pendingReportCounts, setPendingReportCounts] = useState<
    Record<string, PendingReportSummary>
  >({});
  const [pendingReportDetailsByLocation, setPendingReportDetailsByLocation] =
    useState<Record<string, PendingReportDetail[]>>({});
  const [pendingReportCountLoading, setPendingReportCountLoading] =
    useState(false);
  const [locationTransactions, setLocationTransactions] = useState<
    Transaction[]
  >([]);
  const [locationParticulars, setLocationParticulars] = useState<Particular[]>(
    [],
  );
  const [branches, setBranches] = useState<Location[]>([]);
  const [ministryLocations, setMinistryLocations] = useState<Location[]>([]);
  const [systemLocations, setSystemLocations] = useState<Location[]>([]);
  const [locationReports, setLocationReports] = useState<LocationReport[]>([]);
  const [receivedReports, setReceivedReports] = useState<
    ForwardedLocationReport[]
  >([]);
  const [forwardedReports, setForwardedReports] = useState<
    ForwardedLocationReport[]
  >([]);
  const [locationRemissions, setLocationRemissions] = useState<
    LocationRemission[]
  >([]);
  const [requisitions, setRequisitions] = useState<LocationRequisition[]>([]);
  const [subscriptionsEnforced, setSubscriptionsEnforced] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [locationSubscriptions, setLocationSubscriptions] = useState<
    LocationSubscription[]
  >([]);
  const [subscriptionForm, setSubscriptionForm] = useState({
    subscription_id: "",
    managed_by_location_id: "",
    managed_by_hq: false,
    billing_frequency: "Monthly",
    status: "Active",
    start_date: today(),
    renewal_date: "",
    notes: "",
  });
  const [subscriptionSaving, setSubscriptionSaving] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");
  const [requisitionDrawerOpen, setRequisitionDrawerOpen] = useState(false);
  const [requisitionSaving, setRequisitionSaving] = useState(false);
  const [requisitionError, setRequisitionError] = useState("");
  const [editingRequisition, setEditingRequisition] =
    useState<LocationRequisition | null>(null);
  const [requisitionMenuAnchor, setRequisitionMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [selectedRequisition, setSelectedRequisition] =
    useState<LocationRequisition | null>(null);
  const [memberActionAnchor, setMemberActionAnchor] =
    useState<null | HTMLElement>(null);
  const [memberActionPosition, setMemberActionPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedMemberAction, setSelectedMemberAction] =
    useState<Member | null>(null);
  const [memberSearch, setMemberSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [zoneSearch, setZoneSearch] = useState("");
  const [familySearch, setFamilySearch] = useState("");
  const [memberDetailsOpen, setMemberDetailsOpen] = useState(false);
  const [memberEditOpen, setMemberEditOpen] = useState(false);
  const [memberEditForm, setMemberEditForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone_number: "",
    gender: "",
    marital_status: "",
    occupation: "",
    country: "",
    district: "",
    city: "",
    address: "",
    profile_picture: "",
    audience: "Physical",
    status: "Active",
    start_date: "",
  });
  const [roleActionAnchor, setRoleActionAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [selectedRoleAction, setSelectedRoleAction] = useState<Role | null>(
    null,
  );
  const [roleEditOpen, setRoleEditOpen] = useState(false);
  const [roleEditForm, setRoleEditForm] = useState({
    role: "",
    title: "",
    status: "Active",
  });
  const [branchActionAnchor, setBranchActionAnchor] =
    useState<null | HTMLElement>(null);
  const [selectedBranchAction, setSelectedBranchAction] =
    useState<Location | null>(null);
  const [requisitionForm, setRequisitionForm] = useState<RequisitionForm>({
    ...blankRequisitionForm,
    items: blankRequisitionForm.items.map((item) => ({ ...item })),
  });
  const [reportMenuAnchor, setReportMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [selectedReportMenu, setSelectedReportMenu] =
    useState<ReportMenuOption | null>(null);
  const [reportsView, setReportsView] = useState<ReportsView>("locations");
  const [reportsViewAnchor, setReportsViewAnchor] =
    useState<null | HTMLElement>(null);
  const [reportDateFilterOpen, setReportDateFilterOpen] = useState(false);
  const [pendingReportDetailsDialog, setPendingReportDetailsDialog] = useState<{
    locationId: string;
    locationTitle: string;
    pending: PendingReportDetail[];
    loading?: boolean;
  } | null>(null);
  const [reportFilters, setReportFilters] = useState({
    locationSearch: "",
    startDate: "",
    endDate: "",
  });
  const [reportSettingsOpen, setReportSettingsOpen] = useState(false);
  const [reportSettingsSaving, setReportSettingsSaving] = useState(false);
  const [reportSettingsError, setReportSettingsError] = useState("");
  const [reportSettingsForm, setReportSettingsForm] = useState({
    report_receiver_location_id: "",
    reporting_start_date: "",
    mandatory_report_schedule_types: [] as string[],
  });
  const [reportCreateOpen, setReportCreateOpen] = useState(false);
  const [forwardReportOpen, setForwardReportOpen] = useState(false);
  const [forwardReportCard, setForwardReportCard] =
    useState<AggregatedReportCard | null>(null);
  const [forwardTargetLocationId, setForwardTargetLocationId] = useState("");
  const [proofPreview, setProofPreview] = useState<{
    title: string;
    image: string;
  } | null>(null);
  const [forwardProofAttachment, setForwardProofAttachment] = useState("");
  const [, setForwardProofFileName] = useState("");
  const [forwardReportError, setForwardReportError] = useState("");
  const [forwardReportSuccess, setForwardReportSuccess] = useState("");
  const [forwardReportSaving, setForwardReportSaving] = useState(false);
  const [reportEditOpen, setReportEditOpen] = useState(false);
  const [reportEditCard, setReportEditCard] =
    useState<AggregatedReportCard | null>(null);
  const [reportCardMenuAnchor, setReportCardMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [reportCardMenuPosition, setReportCardMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [reportCardMenuCard, setReportCardMenuCard] =
    useState<AggregatedReportCard | null>(null);
  const [reportDetailsCard, setReportDetailsCard] =
    useState<AggregatedReportCard | null>(null);
  const [reportDeleteCard, setReportDeleteCard] =
    useState<AggregatedReportCard | null>(null);
  const [reportDeleteSaving, setReportDeleteSaving] = useState(false);
  const [reportDeleteError, setReportDeleteError] = useState("");
  const [reportForm, setReportForm] = useState<ReportForm>(blankReportForm);
  const [reportSaving, setReportSaving] = useState(false);
  const [reportError, setReportError] = useState("");
  const [reportSuccess, setReportSuccess] = useState("");
  const [reportSaved, setReportSaved] = useState(false);
  const [financialReportMenuAnchor, setFinancialReportMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [selectedFinancialReport] = useState<LocationReport | null>(null);
  const [financialReportEdit, setFinancialReportEdit] =
    useState<LocationReport | null>(null);
  const [financialReportEditForm, setFinancialReportEditForm] = useState({
    receiver_location_id: "",
    particular_id: "",
    value: "",
    remission_id: "",
    remission_value: "",
    description: "",
    status: "Draft",
  });
  const [financialReportSaving, setFinancialReportSaving] = useState(false);
  const [financialReportError, setFinancialReportError] = useState("");
  const [overview, setOverview] = useState<AccountOverview | null>(null);
  const [locationListSearch, setLocationListSearch] = useState("");
  const [locationDrawerOpen, setLocationDrawerOpen] = useState(false);
  const [locationChooserOpen, setLocationChooserOpen] = useState(false);
  const [savingLocation, setSavingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [locationSuccess, setLocationSuccess] = useState("");
  const [locationForm, setLocationForm] = useState({
    owner_id: "",
    title: "",
    type: "Branch",
    description: "",
    email: "",
    phone_number: "",
    country: "",
    district: "",
    city: "",
    address: "",
  });
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [relatedError, setRelatedError] = useState("");
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [actionTab, setActionTab] = useState(1);
  const [actionSaving, setActionSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionForm, setActionForm] = useState<ActionForm>(blankActionForm);
  const [roleMenuAnchor, setRoleMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [roleSwitchMenuAnchor, setRoleSwitchMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [activeRoleSaving, setActiveRoleSaving] = useState(false);
  const [locationEditOpen, setLocationEditOpen] = useState(false);
  const [locationEditSaving, setLocationEditSaving] = useState(false);
  const [locationEditError, setLocationEditError] = useState("");
  const [locationDeleteOpen, setLocationDeleteOpen] = useState(false);
  const [locationDeleteSaving, setLocationDeleteSaving] = useState(false);
  const [locationDeleteError, setLocationDeleteError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    title: string;
    description: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);
  const [deleteConfirmSaving, setDeleteConfirmSaving] = useState(false);
  const [deleteConfirmError, setDeleteConfirmError] = useState("");
  const [locationDetailsOpen, setLocationDetailsOpen] = useState(false);
  const [locationParticularsOpen, setLocationParticularsOpen] = useState(false);
  const [locationParticularSearch, setLocationParticularSearch] = useState("");
  const [locationParticularForm, setLocationParticularForm] = useState({
    title: "",
    category: "",
    type: "",
  });
  const [locationParticularError, setLocationParticularError] = useState("");
  const [editingLocationParticularId, setEditingLocationParticularId] =
    useState<string | null>(null);
  const [locationRemissionsOpen, setLocationRemissionsOpen] = useState(false);
  const [remissionForm, setRemissionForm] =
    useState<RemissionForm>(blankRemissionForm);
  const [remissionSaving, setRemissionSaving] = useState(false);
  const [remissionError, setRemissionError] = useState("");
  const [editingRemissionId, setEditingRemissionId] = useState<string | null>(
    null,
  );
  const [scheduleDetails, setScheduleDetails] = useState<Schedule | null>(null);
  const [scheduleEdit, setScheduleEdit] = useState<Schedule | null>(null);
  const [scheduleEditForm, setScheduleEditForm] = useState({
    title: "",
    type: "",
    recurrence: "",
    weekday: "",
    date: "",
    time: "",
    end_time: "",
    all_day: false,
  });
  const [zoneMenuAnchor, setZoneMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [zoneEditOpen, setZoneEditOpen] = useState(false);
  const [zoneEditError, setZoneEditError] = useState("");
  const [zoneEditSaving, setZoneEditSaving] = useState(false);
  const [zoneEditForm, setZoneEditForm] = useState({
    title: "",
    description: "",
    leader1_id: "",
    leader2_id: "",
  });
  const [familyMenuAnchor, setFamilyMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [selectedFamily, setSelectedFamily] = useState<MissionalFamily | null>(
    null,
  );
  const [familyMembersOpen, setFamilyMembersOpen] = useState(false);
  const [familyMemberError, setFamilyMemberError] = useState("");
  const [familyMemberSaving, setFamilyMemberSaving] = useState(false);
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState("");
  const [familyEditOpen, setFamilyEditOpen] = useState(false);
  const [familyEditError, setFamilyEditError] = useState("");
  const [familyEditSaving, setFamilyEditSaving] = useState(false);
  const [familyEditForm, setFamilyEditForm] = useState({
    title: "",
    description: "",
    zone_id: "",
    leader1_id: "",
    leader2_id: "",
  });

  const requestDeleteConfirmation = (
    title: string,
    description: string,
    onConfirm: () => Promise<void> | void,
  ) => {
    setDeleteConfirm({ title, description, onConfirm });
    setDeleteConfirmError("");
  };

  const closeDeleteConfirmation = () => {
    if (deleteConfirmSaving) {
      return;
    }
    setDeleteConfirm(null);
    setDeleteConfirmError("");
  };

  const confirmPendingDelete = async () => {
    if (!deleteConfirm) {
      return;
    }
    setDeleteConfirmSaving(true);
    setDeleteConfirmError("");
    try {
      await deleteConfirm.onConfirm();
      setDeleteConfirm(null);
    } catch (requestError) {
      setDeleteConfirmError(
        getApiErrorMessage(requestError, "Failed to delete record"),
      );
    } finally {
      setDeleteConfirmSaving(false);
    }
  };
  const [locationEditForm, setLocationEditForm] = useState({
    title: "",
    type: "",
    description: "",
    email: "",
    phone_number: "",
    country: "",
    district: "",
    city: "",
    address: "",
    reporting_start_date: "",
  });

  const updateLocationForm = (value: Partial<typeof locationForm>) => {
    setLocationForm((current) => ({ ...current, ...value }));
  };

  const resetLocationForm = () => {
    setLocationForm({
      owner_id: "",
      title: "",
      type: "Branch",
      description: "",
      email: "",
      phone_number: "",
      country: "",
      district: "",
      city: "",
      address: "",
    });
  };

  const refreshOverview = async () => {
    if (!account) {
      return;
    }
    const response = await api.get<AccountOverview>(
      `/accounts/${account.id}/overview`,
    );
    setOverview(response.data);
  };

  const refreshMemberAssignmentSources = async () => {
    if (!location?.owner_id || !location.id) {
      return;
    }
    const [accountsResponse, locationMembersResponse, ministryMembersResponse] =
      await Promise.all([
        api.get<Account[]>("/accounts"),
        api.get<Member[]>(`/members?location_id=${location.id}`),
        api.get<Member[]>(`/members?owner_id=${location.owner_id}`),
      ]);
    setAccounts(accountsResponse.data);
    setMembers(locationMembersResponse.data);
    setMinistryMembers(ministryMembersResponse.data);
  };

  const rememberedLocationKey = account
    ? `church-admin:last-location:${account.id}`
    : "";
  const activeLocationIdRef = useRef(locationId);
  activeLocationIdRef.current = locationId;
  const loadedRelatedGroupsRef = useRef<Set<string>>(new Set());
  const pendingRelatedGroupsRef = useRef<Set<string>>(new Set());
  const relatedRecordGroups = [
    "base",
    "posts",
    "membership",
    "finances",
    "attendance",
    "events",
    "roles",
    "schedules",
    "branches",
    "reports",
    "subscriptions",
  ];
  const expandRelatedGroups = (groups: string[] = ["all"]) =>
    groups.includes("all") ? relatedRecordGroups : groups;

  useEffect(() => {
    loadedRelatedGroupsRef.current.clear();
    pendingRelatedGroupsRef.current.clear();
    setLocationChooserOpen(false);
    setRelatedError("");
    setRelatedLoading(false);
    setPosts([]);
    setMembers([]);
    setZones([]);
    setMissionalFamilies([]);
    setMissionalFamilyMembers([]);
    setCashbooks([]);
    setRequisitions([]);
    setAttendances([]);
    setMfAttendances([]);
    setEvents([]);
    setRoles([]);
    setSchedules([]);
    setMinistrySchedules([]);
    setPendingReportCounts({});
    setPendingReportDetailsByLocation({});
    setBranches([]);
    setLocationReports([]);
    setReceivedReports([]);
    setForwardedReports([]);
    setLocationTransactions([]);
    setLocationParticulars([]);
    setLocationRemissions([]);
    setLocationSubscriptions([]);
  }, [locationId]);

  const loadRelatedRecords = (groups: string[] = ["all"]) => {
    if (!locationId || !location) {
      return Promise.resolve();
    }
    const requestLocationId = locationId;
    if (!idsEqual(location.id, requestLocationId)) {
      return Promise.resolve();
    }
    const canApplyRelatedLoad = () =>
      idsEqual(requestLocationId, activeLocationIdRef.current);
    const applyResponse =
      <T,>(setter: (value: T) => void) =>
      (response: { data: T }) => {
        if (canApplyRelatedLoad()) {
          setter(response.data);
        }
      };
    const safeGet = <T,>(url: string, fallback: T) =>
      api.get<T>(url).catch(() => ({ data: fallback }));
    const requestedGroups = expandRelatedGroups(groups);
    const wants = (group: string) =>
      groups.includes("all") || groups.includes(group);
    const jobs: Promise<unknown>[] = [];
    setRelatedError("");
    setRelatedLoading(true);
    requestedGroups.forEach((group) =>
      pendingRelatedGroupsRef.current.add(group),
    );
    if (wants("posts")) {
      jobs.push(
        safeGet<Post[]>(`/posts?location_id=${requestLocationId}`, []).then(
          applyResponse(setPosts),
        ),
      );
    }
    if (wants("membership")) {
      jobs.push(
        safeGet<Member[]>(`/members?location_id=${requestLocationId}`, []).then(
          applyResponse(setMembers),
        ),
      );
      jobs.push(
        safeGet<Zone[]>(
          `/zones?location_id=${requestLocationId}${account ? `&requester_id=${account.id}` : ""}`,
          [],
        ).then(applyResponse(setZones)),
      );
      jobs.push(
        safeGet<MissionalFamily[]>(
          `/missional-families?location_id=${requestLocationId}${account ? `&requester_id=${account.id}` : ""}`,
          [],
        ).then(applyResponse(setMissionalFamilies)),
      );
      jobs.push(
        safeGet<MissionalFamilyMember[]>(
          `/missional-family-members?location_id=${requestLocationId}${account ? `&requester_id=${account.id}` : ""}`,
          [],
        ).then(applyResponse(setMissionalFamilyMembers)),
      );
    }
    if (wants("finances")) {
      jobs.push(
        safeGet<Cashbook[]>(
          `/cashbooks?location_id=${requestLocationId}${account ? `&requester_id=${account.id}` : ""}`,
          [],
        ).then(applyResponse(setCashbooks)),
      );
      jobs.push(
        safeGet<LocationRequisition[]>(
          `/requisitions?location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setRequisitions)),
      );
    }
    if (wants("attendance")) {
      jobs.push(
        safeGet<Attendance[]>(
          `/attendances?location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setAttendances)),
      );
      jobs.push(
        safeGet<MfAttendance[]>(
          `/mf-attendances?location_id=${requestLocationId}${account ? `&requester_id=${account.id}` : ""}`,
          [],
        ).then(applyResponse(setMfAttendances)),
      );
      jobs.push(
        safeGet<Schedule[]>(
          `/schedules?location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setSchedules)),
      );
      jobs.push(
        safeGet<MissionalFamily[]>(
          `/missional-families?location_id=${requestLocationId}${account ? `&requester_id=${account.id}` : ""}`,
          [],
        ).then(applyResponse(setMissionalFamilies)),
      );
    }
    if (wants("events")) {
      jobs.push(
        safeGet<Event[]>(`/events?location_id=${requestLocationId}`, []).then(
          applyResponse(setEvents),
        ),
      );
    }
    if (wants("roles") || wants("base")) {
      jobs.push(
        safeGet<Role[]>(`/roles?location_id=${requestLocationId}`, []).then(
          applyResponse(setRoles),
        ),
      );
    }
    if (wants("schedules") || wants("reports")) {
      jobs.push(
        safeGet<Schedule[]>(
          `/schedules?location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setSchedules)),
      );
    }
    if (wants("reports") || wants("finances")) {
      jobs.push(
        safeGet<Transaction[]>(
          `/transactions?location_id=${requestLocationId}${account ? `&requester_id=${account.id}` : ""}`,
          [],
        ).then(applyResponse(setLocationTransactions)),
      );
      jobs.push(
        safeGet<Particular[]>(
          `/particulars?location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setLocationParticulars)),
      );
      jobs.push(
        safeGet<LocationRemission[]>(
          `/location-remissions?location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setLocationRemissions)),
      );
    }
    if (wants("branches")) {
      jobs.push(
        safeGet<Location[]>(
          `/locations?parent_location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setBranches)),
      );
    }
    if (wants("reports")) {
      jobs.push(
        safeGet<LocationReport[]>(
          `/location-reports?location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setLocationReports)),
      );
      jobs.push(
        safeGet<ForwardedLocationReport[]>(
          `/forwarded-location-reports?target_location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setReceivedReports)),
      );
      jobs.push(
        safeGet<ForwardedLocationReport[]>(
          `/forwarded-location-reports?source_location_id=${requestLocationId}`,
          [],
        ).then(applyResponse(setForwardedReports)),
      );
      jobs.push(
        safeGet<MfAttendance[]>(
          `/mf-attendances?location_id=${requestLocationId}${account ? `&requester_id=${account.id}` : ""}`,
          [],
        ).then(applyResponse(setMfAttendances)),
      );
    }
    if (wants("subscriptions") || wants("base")) {
      jobs.push(
        safeGet<Record<string, string>>("/system-settings", {}).then(
          (response) => {
            if (!canApplyRelatedLoad()) {
              return;
            }
            setSubscriptionsEnforced(
              response.data.subscriptions_enforced === "true",
            );
          },
        ),
      );
      jobs.push(
        safeGet<Subscription[]>("/subscriptions", []).then((response) =>
          applyResponse(setSubscriptions)(response),
        ),
      );
      jobs.push(
        safeGet<LocationSubscription[]>(
          `/location-subscriptions?location_id=${requestLocationId}`,
          [],
        ).then((response) => {
          if (!canApplyRelatedLoad()) {
            return;
          }
          setLocationSubscriptions(response.data);
          const activeAssignment = response.data[0];
          if (activeAssignment) {
            setSubscriptionForm({
              subscription_id: activeAssignment.subscription_id || "",
              managed_by_location_id:
                activeAssignment.managed_by_location_id || "",
              managed_by_hq: Boolean(activeAssignment.managed_by_hq),
              billing_frequency:
                activeAssignment.billing_frequency || "Monthly",
              status: activeAssignment.status || "Active",
              start_date: activeAssignment.start_date || today(),
              renewal_date: activeAssignment.renewal_date || "",
              notes: activeAssignment.notes || "",
            });
          }
        }),
      );
    }
    return Promise.all(jobs)
      .then(() => {
        if (canApplyRelatedLoad()) {
          requestedGroups.forEach((group) =>
            loadedRelatedGroupsRef.current.add(group),
          );
        }
      })
      .catch((requestError) => {
        if (canApplyRelatedLoad()) {
          setRelatedError(
            getApiErrorMessage(requestError, "Failed to load location records"),
          );
        }
      })
      .finally(() => {
        requestedGroups.forEach((group) =>
          pendingRelatedGroupsRef.current.delete(group),
        );
        if (canApplyRelatedLoad()) {
          setRelatedLoading(pendingRelatedGroupsRef.current.size > 0);
        }
      });
  };

  const loadRelatedRecordsOnce = (groups: string[] = ["all"]) => {
    const pendingGroups = expandRelatedGroups(groups).filter(
      (group) =>
        !loadedRelatedGroupsRef.current.has(group) &&
        !pendingRelatedGroupsRef.current.has(group),
    );
    if (!pendingGroups.length) {
      return Promise.resolve();
    }
    return loadRelatedRecords(pendingGroups);
  };

  useEffect(() => {
    void loadRelatedRecordsOnce(["base", "reports"]);
  }, [locationId, location?.owner_id]);

  useEffect(() => {
    if (!locationId) {
      return;
    }
    if (activeTab === 0) {
      void loadRelatedRecordsOnce(["posts"]);
    } else if (activeTab === 1) {
      void loadRelatedRecordsOnce(["membership"]);
    } else if (activeTab === 2) {
      void loadRelatedRecordsOnce(["finances"]);
    } else if (activeTab === 3) {
      void loadRelatedRecordsOnce(["attendance"]);
    } else if (activeTab === 4) {
      void loadRelatedRecordsOnce(["events"]);
    } else if (activeTab === 5) {
      void loadRelatedRecordsOnce(["roles"]);
    } else if (activeTab === 8) {
      void loadRelatedRecordsOnce(["schedules", "attendance"]);
    } else if (activeTab === 9) {
      void loadRelatedRecordsOnce(["branches"]);
    } else if (activeTab === 10) {
      void loadRelatedRecordsOnce(["reports"]);
    } else if (activeTab === 12) {
      void loadRelatedRecordsOnce(["subscriptions"]);
    }
  }, [activeTab, attendanceSubTab, financeView, locationId, membershipView]);

  useEffect(() => {
    api
      .get<Account[]>("/accounts")
      .then((response) => setAccounts(response.data))
      .catch(() => setAccounts([]));
    api
      .get<Location[]>("/locations")
      .then((response) => setSystemLocations(response.data))
      .catch(() => setSystemLocations([]));
  }, []);

  useEffect(() => {
    if (!location?.owner_id) {
      setMinistryLocations([]);
      setMinistryMembers([]);
      setMinistrySchedules([]);
      setPendingReportCounts({});
      setPendingReportDetailsByLocation({});
      return;
    }
    Promise.all([
      api.get<Location[]>(`/locations?owner_id=${location.owner_id}`),
      api.get<Member[]>(`/members?owner_id=${location.owner_id}`),
      api.get<Schedule[]>(`/schedules?owner_id=${location.owner_id}`),
    ])
      .then(
        ([locationsResponse, membersResponse, schedulesResponse]) => {
          setMinistryLocations(locationsResponse.data);
          setMinistryMembers(membersResponse.data);
          setMinistrySchedules(schedulesResponse.data);
        },
      )
      .catch(() => {
        setMinistryLocations([]);
        setMinistryMembers([]);
        setMinistrySchedules([]);
        setPendingReportCounts({});
        setPendingReportDetailsByLocation({});
      });
  }, [location?.owner_id]);

  useEffect(() => {
    if (!location?.owner_id || !location?.id || !ministryLocations.length) {
      setPendingReportCounts({});
      setPendingReportDetailsByLocation({});
      setPendingReportCountLoading(false);
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const locationIds = Array.from(
      new Set(
        [location, ...ministryLocations]
          .map((item) => item?.id)
          .filter(Boolean),
      ),
    );
    const batchSize = 40;
    setPendingReportCounts({});
    setPendingReportDetailsByLocation({});
    setPendingReportCountLoading(true);

    const loadBatch = async (offset: number) => {
      const batchIds = locationIds.slice(offset, offset + batchSize);
      if (!batchIds.length || cancelled) {
        if (!cancelled) {
          setPendingReportCountLoading(false);
        }
        return;
      }
      try {
        const params = new URLSearchParams({
          owner_id: location.owner_id || "",
          location_ids: batchIds.join(","),
        });
        const response = await api.get<Record<string, PendingReportSummary>>(
          `/location-pending-report-counts?${params.toString()}`,
        );
        if (!cancelled) {
          setPendingReportCounts((current) => ({
            ...current,
            ...response.data,
          }));
        }
      } catch {
        if (!cancelled) {
          setPendingReportCounts((current) => {
            const next = { ...current };
            batchIds.forEach((locationIdValue) => {
              next[locationIdValue] = { count: 0, pending: [] };
            });
            return next;
          });
        }
      } finally {
        const nextOffset = offset + batchSize;
        if (!cancelled && nextOffset < locationIds.length) {
          timers.push(
            window.setTimeout(() => {
              void loadBatch(nextOffset);
            }, 120),
          );
        } else if (!cancelled) {
          setPendingReportCountLoading(false);
        }
      }
    };

    void loadBatch(0);
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [location?.owner_id, location?.id, ministryLocations]);

  useEffect(() => {
    const savedMandatoryTypes = (
      location?.mandatory_report_schedule_types || ""
    )
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setReportSettingsForm({
      report_receiver_location_id: location?.report_receiver_location_id || "",
      reporting_start_date: location?.reporting_start_date || "",
      mandatory_report_schedule_types: savedMandatoryTypes.length
        ? savedMandatoryTypes
        : defaultMandatoryReportScheduleTypes,
    });
  }, [
    location?.report_receiver_location_id,
    location?.mandatory_report_schedule_types,
    location?.reporting_start_date,
  ]);

  useEffect(() => {
    if (!account) {
      return;
    }
    refreshOverview().catch(() => setOverview(null));
  }, [account?.id]);

  useEffect(() => {
    if (!rememberedLocationKey) {
      return;
    }
    if (locationId) {
      sessionStorage.setItem(rememberedLocationKey, locationId);
    }
  }, [locationId, navigate, rememberedLocationKey]);

  useEffect(() => {
    if (locationId || !overview) {
      return;
    }
    const accessibleLocations = [
      ...overview.owned.locations,
      ...overview.assigned.locations,
    ].filter(
      (item, index, locations) =>
        locations.findIndex((candidate) => idsEqual(candidate.id, item.id)) ===
        index,
    );
    if (accessibleLocations.length === 1) {
      navigate(`/app/locations/${accessibleLocations[0].id}`, {
        replace: true,
      });
    }
  }, [locationId, navigate, overview]);

  const handleCreateLocation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!account) {
      setLocationError("You must be signed in to create locations.");
      return;
    }
    setLocationError("");
    setLocationSuccess("");
    if (account.type !== "Organization" && !locationForm.owner_id) {
      setLocationError(
        "Select the ministry you are creating this location for.",
      );
      return;
    }
    setSavingLocation(true);
    try {
      const response = await api.post<Location>("/locations", {
        ...locationForm,
        author_id: account.id,
        owner_id:
          account.type === "Organization" ? account.id : locationForm.owner_id,
      });
      await refreshOverview();
      resetLocationForm();
      setLocationSuccess("Location saved successfully.");
      setFeedback({
        severity: "success",
        message: "Location saved successfully.",
      });
      navigate(`/app/locations/${response.data.id}`);
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        "Failed to create location",
      );
      setLocationError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setSavingLocation(false);
    }
  };

  const openActionDrawer = (targetTab = activeTab) => {
    setActionTab(targetTab);
    setActionForm({
      ...blankActionForm,
      status: targetTab === 0 ? "Public" : "Active",
      title: targetTab === 5 ? "Pastor" : "",
      type: targetTab === 9 ? "Branch" : "",
      recurrence: "",
      weekday: "",
      start_date: targetTab === 1 ? today() : "",
      startdate: targetTab === 2 ? today() : "",
      date: targetTab === 3 ? today() : "",
      attendance_records: {},
      attendance_sources: {},
      opening_balance: "",
      opening_balance_source: "manual",
      opening_balance_cashbook_id: "",
    });
    setActionError("");
    setActionOpen(true);
  };

  const updateActionForm = (value: Partial<ActionForm>) => {
    setActionForm((current) => ({ ...current, ...value }));
  };

  const openRequisitionDrawer = () => {
    setEditingRequisition(null);
    setRequisitionForm({
      ...blankRequisitionForm,
      date: today(),
      items: blankRequisitionForm.items.map((item) => ({ ...item })),
    });
    setRequisitionError("");
    setRequisitionDrawerOpen(true);
  };

  const openRequisitionEdit = (requisition: LocationRequisition) => {
    setEditingRequisition(requisition);
    setRequisitionForm({
      date: requisition.date || today(),
      title: requisition.title || "",
      description: requisition.description || "",
      items: requisition.items.length
        ? requisition.items.map((item) => ({
            particular_id: item.particular_id || "",
            amount: String(item.amount || ""),
          }))
        : blankRequisitionForm.items.map((item) => ({ ...item })),
    });
    setRequisitionError("");
    setRequisitionDrawerOpen(true);
    setRequisitionMenuAnchor(null);
  };

  const updateRequisitionItem = (
    index: number,
    value: Partial<RequisitionForm["items"][number]>,
  ) => {
    setRequisitionForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...value } : item,
      ),
    }));
  };

  const addRequisitionItem = () => {
    setRequisitionForm((current) => ({
      ...current,
      items: [...current.items, { particular_id: "", amount: "" }],
    }));
  };

  const removeRequisitionItem = (index: number) => {
    setRequisitionForm((current) => ({
      ...current,
      items:
        current.items.length === 1
          ? current.items
          : current.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const saveRequisition = async () => {
    if (!account || !locationId) {
      return;
    }
    const items = requisitionForm.items
      .map((item) => ({
        particular_id: item.particular_id,
        amount: Number(item.amount || 0),
      }))
      .filter((item) => item.particular_id && item.amount > 0);
    if (!requisitionForm.date || !items.length) {
      setRequisitionError(
        "Select a date and add at least one requisition item with an amount.",
      );
      return;
    }
    const uniqueParticularIds = new Set(
      items.map((item) => item.particular_id),
    );
    if (uniqueParticularIds.size !== items.length) {
      setRequisitionError(
        "Each requisition item must use a different particular.",
      );
      return;
    }
    setRequisitionSaving(true);
    setRequisitionError("");
    try {
      if (editingRequisition) {
        await api.patch<LocationRequisition>(
          `/requisitions/${editingRequisition.id}`,
          {
            requester_id: account.id,
            date: requisitionForm.date,
            title: requisitionForm.title,
            description: requisitionForm.description,
            items,
          },
        );
      } else {
        await api.post<LocationRequisition>("/requisitions", {
          requester_id: account.id,
          location_id: locationId,
          date: requisitionForm.date,
          title: requisitionForm.title,
          description: requisitionForm.description,
          items,
        });
      }
      setEditingRequisition(null);
      await loadRelatedRecords();
      setFeedback({
        severity: "success",
        message: `Requisition ${editingRequisition ? "updated" : "created"} successfully.`,
      });
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        `Failed to ${editingRequisition ? "update" : "create"} requisition`,
      );
      setRequisitionError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setRequisitionSaving(false);
    }
  };

  const closeRequisitionMenu = () => {
    setRequisitionMenuAnchor(null);
    setSelectedRequisition(null);
  };

  const closeRequisitionDrawer = () => {
    setRequisitionDrawerOpen(false);
    setEditingRequisition(null);
    setRequisitionError("");
  };

  const updateRequisitionStatus = async (
    requisition: LocationRequisition,
    action: "submit" | "approve",
  ) => {
    if (!account) {
      return;
    }
    setRequisitionError("");
    try {
      await api.post(`/requisitions/${requisition.id}/${action}`, {
        requester_id: account.id,
      });
      closeRequisitionMenu();
      await loadRelatedRecords();
    } catch (requestError) {
      setRequisitionError(
        getApiErrorMessage(requestError, `Failed to ${action} requisition`),
      );
    }
  };

  const deleteRequisition = async (requisition: LocationRequisition) => {
    if (!account) {
      return;
    }
    setRequisitionError("");
    try {
      await api.delete(
        `/requisitions/${requisition.id}?requester_id=${account.id}`,
      );
      closeRequisitionMenu();
      await loadRelatedRecords();
    } catch (requestError) {
      setRequisitionError(
        getApiErrorMessage(requestError, "Failed to delete requisition"),
      );
    }
  };

  const closeMemberActionMenu = () => {
    setMemberActionAnchor(null);
    setMemberActionPosition(null);
    setSelectedMemberAction(null);
  };

  const openSelectedLocationMemberDetails = () => {
    if (!selectedMemberAction) {
      return;
    }
    setMemberActionAnchor(null);
    setMemberDetailsOpen(true);
  };

  const closeSelectedLocationMemberDetails = () => {
    setMemberDetailsOpen(false);
    setSelectedMemberAction(null);
  };

  const closeRoleActionMenu = () => {
    setRoleActionAnchor(null);
    setSelectedRoleAction(null);
  };

  const closeBranchActionMenu = () => {
    setBranchActionAnchor(null);
    setSelectedBranchAction(null);
  };

  const readMemberEditProfilePicture = (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setMemberEditForm((current) => ({
        ...current,
        profile_picture: String(reader.result || ""),
      }));
    reader.readAsDataURL(file);
  };

  const openSelectedLocationMemberEdit = () => {
    if (!selectedMemberAction) {
      return;
    }
    const memberAccount = accounts.find((item) =>
      idsEqual(item.id, selectedMemberAction.user_id),
    );
    setMemberEditForm({
      fname: memberAccount?.fname || "",
      lname: memberAccount?.lname || "",
      email: memberAccount?.email || "",
      phone_number: memberAccount?.phone_number || "",
      gender: memberAccount?.gender || "",
      marital_status: memberAccount?.marital_status || "",
      occupation: memberAccount?.occupation || "",
      country: memberAccount?.country || "",
      district: memberAccount?.district || "",
      city: memberAccount?.city || "",
      address: memberAccount?.address || "",
      profile_picture: memberAccount?.profile_picture || "",
      audience: selectedMemberAction.audience || "Physical",
      status: selectedMemberAction.status || "Active",
      start_date: selectedMemberAction.start_date || "",
    });
    setMemberActionAnchor(null);
    setMemberEditOpen(true);
  };

  const saveSelectedLocationMember = async () => {
    if (!account || !selectedMemberAction) {
      return;
    }
    setRelatedError("");
    try {
      const memberUpdate = api.patch(`/members/${selectedMemberAction.id}`, {
        requester_id: account.id,
        audience: memberEditForm.audience,
        status: memberEditForm.status,
        start_date: memberEditForm.start_date || null,
      });
      const accountUpdate = selectedMemberAction.user_id
        ? api.patch<Account>(`/accounts/${selectedMemberAction.user_id}`, {
            fname: memberEditForm.fname,
            lname: memberEditForm.lname,
            title: [memberEditForm.fname, memberEditForm.lname]
              .filter(Boolean)
              .join(" "),
            email: memberEditForm.email || null,
            phone_number: memberEditForm.phone_number || null,
            gender: memberEditForm.gender || null,
            marital_status: memberEditForm.marital_status || null,
            occupation: memberEditForm.occupation || null,
            country: memberEditForm.country || null,
            district: memberEditForm.district || null,
            city: memberEditForm.city || null,
            address: memberEditForm.address || null,
            profile_picture: memberEditForm.profile_picture || null,
          })
        : Promise.resolve(null);
      const [, accountResponse] = await Promise.all([
        memberUpdate,
        accountUpdate,
      ]);
      if (accountResponse?.data) {
        setAccounts((current) =>
          current.map((item) =>
            idsEqual(item.id, accountResponse.data.id)
              ? accountResponse.data
              : item,
          ),
        );
      }
      setMemberEditOpen(false);
      setSelectedMemberAction(null);
      await loadRelatedRecords();
    } catch (error) {
      setRelatedError(getApiErrorMessage(error, "Could not update member."));
    }
  };

  const openSelectedLocationRoleEdit = () => {
    if (!selectedRoleAction) {
      return;
    }
    setRoleEditForm({
      role: selectedRoleAction.role || "",
      title: selectedRoleAction.title || selectedRoleAction.role || "",
      status: selectedRoleAction.status || "Active",
    });
    setRoleActionAnchor(null);
    setRoleEditOpen(true);
  };

  const saveSelectedLocationRole = async () => {
    if (!account || !selectedRoleAction) {
      return;
    }
    setRelatedError("");
    try {
      const payload = selectedRoleAction.cashbook_id
        ? {
            requester_id: account.id,
            role: roleEditForm.role,
          }
        : {
            requester_id: account.id,
            role: roleEditForm.role,
            title: roleEditForm.title || roleEditForm.role,
            status: roleEditForm.status,
          };
      await api.patch(`/roles/${selectedRoleAction.id}`, payload);
      setRoleEditOpen(false);
      setSelectedRoleAction(null);
      await loadRelatedRecords();
    } catch (error) {
      setRelatedError(getApiErrorMessage(error, "Could not update role."));
    }
  };

  const deleteSelectedLocationMember = async () => {
    if (!account || !selectedMemberAction) {
      return;
    }
    setRelatedError("");
    try {
      await api.delete(`/members/${selectedMemberAction.id}`, {
        params: { requester_id: account.id },
      });
      closeMemberActionMenu();
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to delete member"),
      );
    }
  };

  const deleteSelectedLocationRole = async () => {
    if (
      !account ||
      !selectedRoleAction ||
      selectedRoleAction.id === "__owner_role__"
    ) {
      return;
    }
    setRelatedError("");
    try {
      await api.delete(`/roles/${selectedRoleAction.id}`, {
        params: { requester_id: account.id },
      });
      closeRoleActionMenu();
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to delete role"),
      );
    }
  };

  const deleteSelectedBranch = async () => {
    if (!account || !selectedBranchAction) {
      return;
    }
    setRelatedError("");
    try {
      await api.delete(`/locations/${selectedBranchAction.id}`, {
        params: { requester_id: account.id },
      });
      closeBranchActionMenu();
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to delete branch"),
      );
    }
  };

  const openReportCreateDialog = () => {
    const scheduleDate = today();
    setReportEditCard(null);
    setReportEditOpen(false);
    setReportForm({
      ...blankReportForm,
      title: reportTitleForDate(scheduleDate),
      schedule_date: scheduleDate,
      value: "",
    });
    setReportError("");
    setReportSuccess("");
    setReportSaved(false);
    setReportCreateOpen(true);
  };

  const updateReportForm = (value: Partial<ReportForm>) => {
    setReportForm((current) => ({ ...current, ...value }));
    setReportSaved(false);
  };

  const openReportCardMenu = (
    event: ReactMouseEvent<HTMLElement>,
    reportCard: AggregatedReportCard,
  ) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setReportCardMenuAnchor(event.currentTarget);
    setReportCardMenuPosition({
      top: Math.round(buttonRect.bottom + 4),
      left: Math.round(buttonRect.right),
    });
    setReportCardMenuCard(reportCard);
  };

  const closeReportCardMenu = () => {
    setReportCardMenuAnchor(null);
    setReportCardMenuPosition(null);
    setReportCardMenuCard(null);
  };

  const updateRemissionForm = (value: Partial<RemissionForm>) => {
    setRemissionForm((current) => ({ ...current, ...value }));
  };

  const transactionMatchesReportScheduleDate = (
    transaction: Transaction,
    scheduleDate: string,
  ) => {
    if (!transaction.schedule_id || !scheduleDate) {
      return false;
    }
    if (transaction.schedule_date) {
      return transaction.schedule_date === scheduleDate;
    }
    if (transaction.transaction_date) {
      return transaction.transaction_date === scheduleDate;
    }
    const schedule = schedules.find(
      (item) => item.id === transaction.schedule_id,
    );
    return schedule ? scheduleOccursOnDate(schedule, scheduleDate) : false;
  };
  const transactionScheduleDate = (transaction: Transaction) =>
    transaction.schedule_date || transaction.transaction_date || "";
  const transactionIsIncomeCollection = (transaction: Transaction) => {
    if (!transaction.particular_id) {
      return false;
    }
    const particular = locationParticulars.find((item) =>
      idsEqual(item.particular_id, transaction.particular_id),
    );
    return (
      (particular?.category || transaction.category || "")
        .trim()
        .toLowerCase() === "income"
    );
  };
  const financeTransactionsForScheduleDate = (scheduleDate: string) =>
    locationTransactions.filter(
      (transaction) =>
        Boolean(transaction.schedule_id) &&
        transactionIsIncomeCollection(transaction) &&
        transactionMatchesReportScheduleDate(transaction, scheduleDate),
    );
  const editingReportIds = new Set(
    reportEditCard?.reports.map((report) => report.id) || [],
  );
  const financialReportedScheduleIdsForDate = (scheduleDate: string) =>
    new Set(
      locationReports
        .filter(
          (report) =>
            report.type === "Financial" &&
            report.schedule_date === scheduleDate &&
            !editingReportIds.has(report.id),
        )
        .flatMap((report) =>
          (report.schedules || "").split(",").filter(Boolean),
        ),
    );
  const financeScheduleIdsForDate = (scheduleDate: string) =>
    new Set(
      financeTransactionsForScheduleDate(scheduleDate)
        .map((transaction) => transaction.schedule_id)
        .filter(Boolean) as string[],
    );
  const isFinanceScheduleDateFullyReported = (scheduleDate: string) => {
    const transactionScheduleIds = financeScheduleIdsForDate(scheduleDate);
    if (transactionScheduleIds.size === 0) {
      return false;
    }
    const reportedScheduleIds =
      financialReportedScheduleIdsForDate(scheduleDate);
    return Array.from(transactionScheduleIds).every((scheduleId) =>
      reportedScheduleIds.has(scheduleId),
    );
  };

  const schedulesForReportDate = schedules.filter((schedule) =>
    scheduleOccursOnDate(schedule, reportForm.schedule_date),
  );
  const reportScheduleTypeOptions = uniqueScheduleTypes(schedulesForReportDate);
  const typedSchedulesForReportDate = schedulesForReportDate.filter(
    (schedule) =>
      !reportForm.schedule_type || schedule.type === reportForm.schedule_type,
  );
  const selectedReportSchedules = schedules.filter((schedule) =>
    reportForm.schedule_ids.includes(schedule.id),
  );
  const reportedAttendanceScheduleDates = new Set(
    locationReports
      .filter(
        (report) =>
          report.type === "Attendance" &&
          report.schedule_date &&
          !editingReportIds.has(report.id),
      )
      .map((report) => report.schedule_date!),
  );
  const isAttendanceScheduleDateReported = (scheduleDate: string) =>
    reportedAttendanceScheduleDates.has(scheduleDate);
  const renderReportScheduleAwareDay = renderScheduleAwareDay(
    schedules,
    reportedAttendanceScheduleDates,
  );
  const financeScheduleDates = new Set(
    locationTransactions
      .filter(
        (transaction) =>
          transaction.schedule_id &&
          transactionIsIncomeCollection(transaction) &&
          transactionScheduleDate(transaction),
      )
      .map((transaction) => transactionScheduleDate(transaction)),
  );
  const availableFinanceScheduleDates = new Set(
    Array.from(financeScheduleDates).filter(
      (scheduleDate) => !isFinanceScheduleDateFullyReported(scheduleDate),
    ),
  );
  const reportedFinanceScheduleIdsForReportDate =
    financialReportedScheduleIdsForDate(reportForm.schedule_date);
  const financeSchedulesForReportDate = financeTransactionsForScheduleDate(
    reportForm.schedule_date,
  )
    .filter(
      (transaction) =>
        transaction.schedule_id &&
        !reportedFinanceScheduleIdsForReportDate.has(transaction.schedule_id),
    )
    .map((transaction) =>
      schedules.find((schedule) => schedule.id === transaction.schedule_id),
    )
    .filter((schedule): schedule is Schedule => Boolean(schedule))
    .filter(
      (schedule) =>
        !reportForm.schedule_type || schedule.type === reportForm.schedule_type,
    )
    .filter(
      (schedule, index, items) =>
        items.findIndex((item) => item.id === schedule.id) === index,
    );
  const financeScheduleTypeOptions = uniqueScheduleTypes(
    financeSchedulesForReportDate,
  );
  const renderFinanceScheduleDateDay = (props: PickerDayProps) => {
    const date = props.day.format("YYYY-MM-DD");
    const hasTransactions = financeScheduleDates.has(date);
    const isReported = isFinanceScheduleDateFullyReported(date);
    const isToday = props.today;
    const scheduleBgcolor = isReported ? "action.selected" : "secondary.main";
    const scheduleColor = isReported
      ? "text.primary"
      : "secondary.contrastText";
    return (
      <PickerDay
        {...props}
        key={date}
        sx={{
          ...(hasTransactions
            ? {
                bgcolor: scheduleBgcolor,
                color: scheduleColor,
                ...(isToday
                  ? {
                      border: "1px solid",
                      borderColor: "#000000",
                    }
                  : null),
                "&:hover, &.Mui-selected, &.Mui-selected:hover, &.Mui-disabled":
                  {
                    bgcolor: scheduleBgcolor,
                    color: scheduleColor,
                  },
                "&.Mui-disabled": {
                  opacity: 0.65,
                },
              }
            : null),
        }}
      />
    );
  };
  const disableFinanceSchedulePickerDay = (day: Dayjs) => {
    const scheduleDate = day.format("YYYY-MM-DD");
    return (
      disableFutureSchedulePickerDay(day, schedules) ||
      !availableFinanceScheduleDates.has(scheduleDate)
    );
  };
  const collectionTransactionsForReport = locationTransactions.filter(
    (transaction) => {
      if (
        !transactionMatchesReportScheduleDate(
          transaction,
          reportForm.schedule_date,
        ) ||
        !transaction.particular_id ||
        !transaction.schedule_id
      ) {
        return false;
      }
      if (!reportForm.schedule_ids.includes(transaction.schedule_id)) {
        return false;
      }
      const schedule = schedules.find(
        (item) => item.id === transaction.schedule_id,
      );
      return (
        !reportForm.schedule_type || schedule?.type === reportForm.schedule_type
      );
    },
  );
  const financeParticularOptions = collectionTransactionsForReport
    .filter((transaction) => {
      const particular = locationParticulars.find((item) =>
        idsEqual(item.particular_id, transaction.particular_id),
      );
      return (
        (particular?.category || transaction.category || "")
          .trim()
          .toLowerCase() === "income"
      );
    })
    .map((transaction) => ({
      id: transaction.particular_id!,
      title:
        locationParticulars.find((item) =>
          idsEqual(item.particular_id, transaction.particular_id),
        )?.title ||
        transaction.particular_title ||
        `Particular #${transaction.particular_id}`,
    }))
    .filter(
      (particular, index, items) =>
        items.findIndex((item) => item.id === particular.id) === index,
    );
  const collectionReportRows: CollectionReportRow[] =
    financeParticularOptions.flatMap((particular): CollectionReportRow[] => {
      const matchingRemissions = locationRemissions.filter((remission) =>
        idsEqual(remission.particular_id, particular.id),
      );
      const matchingTransactions = collectionTransactionsForReport.filter(
        (transaction) => idsEqual(transaction.particular_id, particular.id),
      );
      const scheduleIds = Array.from(
        new Set(
          matchingTransactions
            .map((transaction) => transaction.schedule_id!)
            .filter(Boolean),
        ),
      );
      const collectionValue = matchingTransactions.reduce(
        (total, transaction) => total + Number(transaction.amount || 0),
        0,
      );
      if (!matchingRemissions.length) {
        return [
          {
            key: `${particular.id}-no-remission`,
            particularId: particular.id,
            particularTitle: particular.title,
            remissionId: null,
            remissionTitle: "No remission",
            remissionPercentage: 0,
            collectionValue,
            remissionValue: 0,
            scheduleIds,
          },
        ];
      }
      return matchingRemissions.map((remission) => {
        const percentage = Number(remission.percentage || 0);
        const remissionValue = Number(
          ((collectionValue * percentage) / 100).toFixed(2),
        );
        return {
          key: `${particular.id}-${remission.id}`,
          particularId: particular.id,
          particularTitle: particular.title,
          remissionId: remission.id,
          remissionTitle: remission.title || `Remission #${remission.id}`,
          remissionPercentage: percentage,
          collectionValue,
          remissionValue,
          scheduleIds,
        };
      });
    });
  const collectionRemissionTotal = collectionReportRows.reduce(
    (total, row) => total + row.remissionValue,
    0,
  );
  const reportCreateDisabled =
    reportSaving ||
    reportSaved ||
    !reportForm.title.trim() ||
    !reportForm.schedule_date ||
    !reportForm.schedule_type ||
    reportForm.schedule_ids.length === 0 ||
    (reportForm.type === "Attendance" && reportForm.value === "") ||
    (reportForm.type === "Financial" && collectionReportRows.length === 0);
  const calculateRemissionValue = (
    financialValue: string,
    remissionId: string,
  ) => {
    const remission = locationRemissions.find(
      (item) => item.id === remissionId,
    );
    const amount = Number(financialValue || 0);
    const percentage = Number(remission?.percentage || 0);
    return remissionId ? String(((amount * percentage) / 100).toFixed(2)) : "";
  };
  const reportAttendanceTotal = (scheduleIds: string[], scheduleDate: string) =>
    attendances
      .filter(
        (attendance) =>
          attendance.date === scheduleDate &&
          Boolean(attendance.schedule_id) &&
          scheduleIds.includes(attendance.schedule_id!),
      )
      .reduce(
        (total, attendance) => total + Number(attendance.total_attendance || 0),
        0,
      );

  const handleReportTypeChange = (type: string) => {
    const nextScheduleIds =
      type === "Attendance"
        ? typedSchedulesForReportDate.map((schedule) => schedule.id)
        : [];
    setReportForm((current) => ({
      ...current,
      type,
      schedule_date: current.schedule_date || today(),
      title: reportTitleForDate(current.schedule_date || today()),
      schedule_ids:
        type === "Financial"
          ? financeSchedulesForReportDate.map((schedule) => schedule.id)
          : nextScheduleIds,
      particular_id: "",
      remission_id: type === "Attendance" ? "" : current.remission_id,
      remission_value: type === "Attendance" ? "" : current.remission_value,
      value:
        type === "Attendance"
          ? String(
              reportAttendanceTotal(nextScheduleIds, current.schedule_date),
            )
          : "",
    }));
  };

  const handleReportDateChange = (value: Dayjs | null) => {
    const scheduleDate = fromPickerValue(value);
    setReportForm((current) => ({
      ...current,
      schedule_date: scheduleDate,
      title: reportTitleForDate(scheduleDate),
      schedule_type: "",
      schedule_ids: [],
      particular_id: current.type === "Attendance" ? current.particular_id : "",
      value: current.type === "Attendance" ? "" : current.value,
    }));
  };

  const handleReportScheduleTypeChange = (scheduleType: string) => {
    const schedulesForType = schedulesForReportDate.filter(
      (schedule) => schedule.type === scheduleType,
    );
    const reportedScheduleIds = financialReportedScheduleIdsForDate(
      reportForm.schedule_date,
    );
    const financeScheduleIdsForType = locationTransactions
      .filter((transaction) =>
        transactionMatchesReportScheduleDate(
          transaction,
          reportForm.schedule_date,
        ),
      )
      .filter((transaction) => transactionIsIncomeCollection(transaction))
      .filter(
        (transaction) =>
          schedules.find((schedule) => schedule.id === transaction.schedule_id)
            ?.type === scheduleType,
      )
      .map((transaction) => transaction.schedule_id!)
      .filter((scheduleId) => !reportedScheduleIds.has(scheduleId))
      .filter((scheduleId, index, ids) => ids.indexOf(scheduleId) === index);
    setReportForm((current) => ({
      ...current,
      schedule_type: scheduleType,
      schedule_ids:
        current.type === "Attendance"
          ? schedulesForType.map((schedule) => schedule.id)
          : financeScheduleIdsForType,
      particular_id: "",
      value:
        current.type === "Attendance"
          ? String(
              reportAttendanceTotal(
                schedulesForType.map((schedule) => schedule.id),
                current.schedule_date,
              ),
            )
          : "",
      remission_value:
        current.type === "Financial"
          ? calculateRemissionValue("", current.remission_id)
          : current.remission_value,
    }));
  };

  const handleReportSchedulesChange = (selectedSchedules: Schedule[]) => {
    const includesAll = selectedSchedules.some(
      (schedule) => schedule.id === "__all_schedules__",
    );
    const nextScheduleIds = includesAll
      ? typedSchedulesForReportDate.map((schedule) => schedule.id)
      : selectedSchedules.map((schedule) => schedule.id);
    setReportForm((current) => ({
      ...current,
      schedule_ids: nextScheduleIds,
      value:
        current.type === "Attendance"
          ? String(
              reportAttendanceTotal(nextScheduleIds, current.schedule_date),
            )
          : current.value,
    }));
  };

  const saveLocationReportDraft = async (
    existingCard?: AggregatedReportCard | null,
  ) => {
    if (!location || !account) {
      setReportError("You must be signed in to create reports.");
      return;
    }
    setReportSaving(true);
    setReportError("");
    setReportSuccess("");
    setReportSaved(false);
    try {
      if (reportForm.type === "Financial" && !collectionReportRows.length) {
        setReportError(
          "No income collections are available for this schedule date and type.",
        );
        return;
      }
      if (existingCard) {
        const reportsToReplace = existingCard.reports.filter(
          (report) => report.type === reportForm.type,
        );
        await Promise.all(
          reportsToReplace.map((report) =>
            api.delete(
              `/location-reports/${report.id}?requester_id=${account.id}`,
            ),
          ),
        );
      }
      if (reportForm.type === "Financial") {
        await api.post<LocationReport[]>("/location-reports/bulk", {
          requester_id: account.id,
          reports: collectionReportRows.map((row) => ({
            requester_id: account.id,
            owner_location_id: location.id,
            schedule_date: reportForm.schedule_date || null,
            title: reportTitleForDate(reportForm.schedule_date),
            type: reportForm.type,
            description: reportForm.description,
            particular_id: row.particularId,
            value: row.collectionValue,
            schedules: row.scheduleIds.join(","),
            remission_id: row.remissionId || null,
            remission_value: row.remissionValue,
            status: reportForm.status,
          })),
        });
      } else {
        await api.post<LocationReport>("/location-reports", {
          requester_id: account.id,
          owner_location_id: location.id,
          schedule_date: reportForm.schedule_date || null,
          title: reportTitleForDate(reportForm.schedule_date),
          type: reportForm.type,
          description: reportForm.description,
          particular_id: reportForm.particular_id || null,
          value: reportForm.value ? Number(reportForm.value) : null,
          schedules: reportForm.schedule_ids.join(","),
          remission_id: reportForm.remission_id || null,
          remission_value: reportForm.remission_value
            ? Number(reportForm.remission_value)
            : null,
          status: reportForm.status,
        });
      }
      setActiveTab(10);
      await loadRelatedRecords(["reports"]);
      setSelectedReportMenu("Local");
      setReportsView("cards");
      const message = existingCard
        ? "Report updated successfully."
        : "Report created successfully.";
      setReportSuccess(message);
      setReportSaved(true);
      setFeedback({ severity: "success", message });
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        existingCard ? "Failed to update report" : "Failed to create report",
      );
      setReportError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setReportSaving(false);
    }
  };

  const handleCreateLocationReport = () => saveLocationReportDraft();

  const openReportEditDialog = (reportCard: AggregatedReportCard) => {
    const editableReport =
      reportCard.reports.find((report) => report.type === "Financial") ||
      reportCard.reports[0];
    if (!editableReport) {
      return;
    }
    const editableReports = reportCard.reports.filter(
      (report) => report.type === editableReport.type,
    );
    const scheduleIds = Array.from(
      new Set(
        editableReports.flatMap((report) =>
          (report.schedules || "").split(",").filter(Boolean),
        ),
      ),
    );
    const scheduleTypesForEdit = Array.from(
      new Set(
        scheduleIds
          .map(
            (scheduleId) =>
              schedules.find((schedule) => schedule.id === scheduleId)?.type,
          )
          .filter(Boolean) as string[],
      ),
    );
    const scheduleDate =
      editableReport.schedule_date ||
      (reportCard.scheduleDate === "No schedule date"
        ? ""
        : reportCard.scheduleDate) ||
      today();
    setReportEditCard(reportCard);
    setReportForm({
      ...blankReportForm,
      title: editableReport.title || reportTitleForDate(scheduleDate),
      type: editableReport.type || "Attendance",
      schedule_type:
        scheduleTypesForEdit[0] || reportCard.scheduleTypes[0] || "",
      schedule_date: scheduleDate,
      description: editableReport.description || "",
      receiver_location_id: editableReport.receiver_location_id || "",
      remission_id: editableReport.remission_id || "",
      remission_value:
        editableReport.remission_value != null
          ? String(editableReport.remission_value)
          : "",
      value:
        editableReport.type === "Attendance"
          ? String(reportCard.attendanceTotal || editableReport.value || "")
          : "",
      schedule_ids: scheduleIds,
      particular_id: editableReport.particular_id || "",
      status: editableReport.status || "Draft",
    });
    setReportError("");
    setReportSuccess("");
    setReportSaved(false);
    setReportCreateOpen(false);
    setReportEditOpen(true);
  };

  const openFinancialReportEdit = (report: LocationReport) => {
    setFinancialReportEdit(report);
    setFinancialReportEditForm({
      receiver_location_id: report.receiver_location_id || "",
      particular_id: report.particular_id || "",
      value: report.value != null ? String(report.value) : "",
      remission_id: report.remission_id || "",
      remission_value:
        report.remission_value != null ? String(report.remission_value) : "",
      description: report.description || "",
      status: report.status || "Draft",
    });
    setFinancialReportError("");
    setFinancialReportMenuAnchor(null);
  };

  const updateFinancialReportEditForm = (
    value: Partial<typeof financialReportEditForm>,
  ) => {
    setFinancialReportEditForm((current) => ({ ...current, ...value }));
  };

  const handleFinancialReportEditValueChange = (value: string) => {
    setFinancialReportEditForm((current) => ({
      ...current,
      value,
      remission_value: calculateRemissionValue(value, current.remission_id),
    }));
  };

  const handleFinancialReportEditRemissionChange = (remissionId: string) => {
    setFinancialReportEditForm((current) => ({
      ...current,
      remission_id: remissionId,
      remission_value: calculateRemissionValue(current.value, remissionId),
    }));
  };

  const saveFinancialReportEdit = async () => {
    if (!account || !financialReportEdit) {
      return;
    }
    setFinancialReportSaving(true);
    setFinancialReportError("");
    try {
      await api.patch(`/location-reports/${financialReportEdit.id}`, {
        requester_id: account.id,
        receiver_location_id:
          financialReportEditForm.receiver_location_id || null,
        particular_id: financialReportEditForm.particular_id || null,
        value: financialReportEditForm.value
          ? Number(financialReportEditForm.value)
          : null,
        remission_id: financialReportEditForm.remission_id || null,
        remission_value: financialReportEditForm.remission_value
          ? Number(financialReportEditForm.remission_value)
          : null,
        description: financialReportEditForm.description,
        status: financialReportEditForm.status,
      });
      setFinancialReportEdit(null);
      await loadRelatedRecords();
    } catch (requestError) {
      setFinancialReportError(
        getApiErrorMessage(requestError, "Failed to update financial report"),
      );
    } finally {
      setFinancialReportSaving(false);
    }
  };

  const deleteFinancialReport = async (report: LocationReport) => {
    if (!account) {
      return;
    }
    setFinancialReportError("");
    setFinancialReportMenuAnchor(null);
    try {
      await api.delete(
        `/location-reports/${report.id}?requester_id=${account.id}`,
      );
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to delete financial report"),
      );
    }
  };

  const openReportDeleteDialog = (reportCard: AggregatedReportCard) => {
    setReportDeleteCard(reportCard);
    setReportDeleteError("");
  };

  const closeReportDeleteDialog = () => {
    if (reportDeleteSaving) {
      return;
    }
    setReportDeleteCard(null);
    setReportDeleteError("");
  };

  const deleteDraftReportCard = async () => {
    if (!account || !reportDeleteCard) {
      return;
    }
    setReportDeleteSaving(true);
    setRelatedError("");
    setReportDeleteError("");
    try {
      await Promise.all(
        reportDeleteCard.reports.map((report) =>
          api.delete(
            `/location-reports/${report.id}?requester_id=${account.id}`,
          ),
        ),
      );
      setReportDeleteCard(null);
      await loadRelatedRecords();
    } catch (requestError) {
      setReportDeleteError(
        getApiErrorMessage(requestError, "Failed to remove draft report"),
      );
    } finally {
      setReportDeleteSaving(false);
    }
  };

  const closeZoneMenu = () => {
    setZoneMenuAnchor(null);
  };

  const openZoneMenu = (event: ReactMouseEvent<HTMLElement>, zone: Zone) => {
    event.stopPropagation();
    setSelectedZone(zone);
    setZoneMenuAnchor(event.currentTarget);
  };

  const openMissionalFamilyForZone = () => {
    if (!selectedZone) {
      return;
    }
    closeZoneMenu();
    setActiveTab(1);
    setActionTab(7);
    setMembershipView("missionalFamilies");
    setActionForm({
      ...blankActionForm,
      status: "Active",
      zone_id: selectedZone.id,
    });
    setActionError("");
    setActionOpen(true);
  };

  const openZoneEdit = () => {
    if (!selectedZone) {
      return;
    }
    closeZoneMenu();
    setZoneEditForm({
      title: selectedZone.title || "",
      description: selectedZone.description || "",
      leader1_id: selectedZone.leader1_id || "",
      leader2_id: selectedZone.leader2_id || "",
    });
    setZoneEditError("");
    setZoneEditOpen(true);
  };

  const saveZoneEdit = async () => {
    if (!selectedZone || !account) {
      return;
    }
    setZoneEditSaving(true);
    setZoneEditError("");
    try {
      await api.patch<Zone>(`/zones/${selectedZone.id}`, {
        requester_id: account.id,
        ...zoneEditForm,
        leader1_id: zoneEditForm.leader1_id || null,
        leader2_id: zoneEditForm.leader2_id || null,
      });
      setZoneEditOpen(false);
      await loadRelatedRecords();
    } catch (requestError) {
      setZoneEditError(
        getApiErrorMessage(requestError, "Failed to update zone"),
      );
    } finally {
      setZoneEditSaving(false);
    }
  };

  const deleteSelectedZone = async () => {
    if (!selectedZone || !account) {
      return;
    }
    closeZoneMenu();
    setRelatedError("");
    try {
      await api.delete(`/zones/${selectedZone.id}`, {
        params: { requester_id: account.id },
      });
      setSelectedZone(null);
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to delete zone"),
      );
    }
  };

  const closeFamilyMenu = () => {
    setFamilyMenuAnchor(null);
  };

  const openFamilyMenu = (
    event: ReactMouseEvent<HTMLElement>,
    family: MissionalFamily,
  ) => {
    event.stopPropagation();
    setSelectedFamily(family);
    setFamilyMenuAnchor(event.currentTarget);
  };

  const openFamilyMembers = (family: MissionalFamily) => {
    setSelectedFamily(family);
    setSelectedFamilyMemberId("");
    setFamilyMemberError("");
    setFamilyMembersOpen(true);
  };

  const openSelectedFamilyMembers = () => {
    if (!selectedFamily) {
      return;
    }
    closeFamilyMenu();
    openFamilyMembers(selectedFamily);
  };

  const openFamilyEdit = () => {
    if (!selectedFamily) {
      return;
    }
    closeFamilyMenu();
    setFamilyEditForm({
      title: selectedFamily.title || "",
      description: selectedFamily.description || "",
      zone_id: selectedFamily.zone_id || "",
      leader1_id: selectedFamily.leader1_id || "",
      leader2_id: selectedFamily.leader2_id || "",
    });
    setFamilyEditError("");
    setFamilyEditOpen(true);
  };

  const openSelectedFamilyAttendance = () => {
    if (!selectedFamily) {
      return;
    }
    closeFamilyMenu();
    setActiveTab(3);
    setAttendanceSubTab(1);
    setAttendanceCreateScope("mf");
    openActionDrawer(3);
    setActionForm((current) => ({
      ...current,
      sg_id: selectedFamily.id || "",
    }));
  };

  const saveFamilyEdit = async () => {
    if (!selectedFamily || !account) {
      return;
    }
    setFamilyEditSaving(true);
    setFamilyEditError("");
    try {
      await api.patch<MissionalFamily>(
        `/missional-families/${selectedFamily.id}`,
        {
          requester_id: account.id,
          ...familyEditForm,
          leader1_id: familyEditForm.leader1_id || null,
          leader2_id: familyEditForm.leader2_id || null,
        },
      );
      setFamilyEditOpen(false);
      await loadRelatedRecords();
    } catch (requestError) {
      setFamilyEditError(
        getApiErrorMessage(requestError, "Failed to update missional family"),
      );
    } finally {
      setFamilyEditSaving(false);
    }
  };

  const deleteSelectedFamily = async () => {
    if (!selectedFamily || !account) {
      return;
    }
    closeFamilyMenu();
    setRelatedError("");
    try {
      await api.delete(`/missional-families/${selectedFamily.id}`, {
        params: { requester_id: account.id },
      });
      setSelectedFamily(null);
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to delete missional family"),
      );
    }
  };

  const familyMembersForSelected = selectedFamily
    ? missionalFamilyMembers.filter(
        (member) =>
          idsEqual(member.mf_id, selectedFamily.id) &&
          member.status !== "Inactive",
      )
    : [];
  const activeFamilyMemberIds = new Set(
    missionalFamilyMembers
      .filter((member) => member.status !== "Inactive")
      .map((member) => member.member_id)
      .filter(Boolean),
  );
  const eligibleFamilyMembers = members
    .filter(
      (member) =>
        member.status !== "Inactive" &&
        member.user_id &&
        !activeFamilyMemberIds.has(member.user_id),
    )
    .map((member) =>
      accounts.find((candidate) => idsEqual(candidate.id, member.user_id)),
    )
    .filter((candidate): candidate is Account => Boolean(candidate));

  const addSelectedFamilyMember = async () => {
    if (!selectedFamily || !account || !selectedFamilyMemberId) {
      setFamilyMemberError("Select a member to add.");
      return;
    }
    setFamilyMemberSaving(true);
    setFamilyMemberError("");
    try {
      await api.post<MissionalFamilyMember>(
        `/missional-families/${selectedFamily.id}/members`,
        {
          requester_id: account.id,
          member_id: selectedFamilyMemberId,
        },
      );
      setSelectedFamilyMemberId("");
      await loadRelatedRecords();
    } catch (requestError) {
      setFamilyMemberError(
        getApiErrorMessage(requestError, "Failed to add member"),
      );
    } finally {
      setFamilyMemberSaving(false);
    }
  };

  const removeSelectedFamilyMember = async (member: MissionalFamilyMember) => {
    if (!account) {
      setFamilyMemberError("You must be signed in to remove members.");
      return;
    }
    setFamilyMemberSaving(true);
    setFamilyMemberError("");
    try {
      await api.delete(`/missional-family-members/${member.id}`, {
        params: { requester_id: account.id },
      });
      await loadRelatedRecords();
    } catch (requestError) {
      setFamilyMemberError(
        getApiErrorMessage(requestError, "Failed to remove member"),
      );
    } finally {
      setFamilyMemberSaving(false);
    }
  };

  const saveReportSettings = async () => {
    if (!account || !location) {
      return;
    }
    setReportSettingsSaving(true);
    setReportSettingsError("");
    try {
      await api.patch<Location>(`/locations/${location.id}`, {
        requester_id: account.id,
        report_receiver_location_id:
          reportSettingsForm.report_receiver_location_id || null,
        reporting_start_date: reportSettingsForm.reporting_start_date || null,
        mandatory_report_schedule_types:
          reportSettingsForm.mandatory_report_schedule_types.join(","),
      });
      setReportSettingsOpen(false);
      await loadRelatedRecords();
    } catch (requestError) {
      setReportSettingsError(
        getApiErrorMessage(requestError, "Failed to save report settings"),
      );
    } finally {
      setReportSettingsSaving(false);
    }
  };

  const updateLocationHq = async (isHq: boolean) => {
    if (!location || !account) {
      return;
    }
    setActiveRoleSaving(true);
    setRelatedError("");
    try {
      const response = await api.patch<Location>(`/locations/${location.id}`, {
        requester_id: account.id,
        is_hq: isHq,
      });
      setLocation(response.data);
      await refreshOverview();
      if (response.data.owner_id) {
        api
          .get<Location[]>(`/locations?owner_id=${response.data.owner_id}`)
          .then((locationsResponse) =>
            setMinistryLocations(locationsResponse.data),
          )
          .catch(() => undefined);
      }
      setRoleMenuAnchor(null);
      setRoleSwitchMenuAnchor(null);
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(
          requestError,
          isHq ? "Failed to set HQ" : "Failed to revert HQ",
        ),
      );
    } finally {
      setActiveRoleSaving(false);
    }
  };

  const openForwardReport = (reportCard: AggregatedReportCard) => {
    setForwardReportCard(reportCard);
    setForwardTargetLocationId(
      automaticReportReceiver?.id || (location?.is_hq ? location.id : ""),
    );
    setForwardProofAttachment("");
    setForwardProofFileName("");
    setForwardReportSuccess("");
    setForwardReportError(
      automaticReportReceiver || location?.is_hq
        ? ""
        : "No parent or HQ location was found for this report.",
    );
    setForwardReportOpen(true);
  };

  const handleForwardProofChange = async (file?: File) => {
    setForwardReportError("");
    setForwardReportSuccess("");
    if (!file) {
      setForwardProofAttachment("");
      setForwardProofFileName("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setForwardReportError("Upload a screenshot image as proof.");
      return;
    }
    setForwardProofFileName(file.name);
    setForwardProofAttachment(await fileToDataUrl(file));
  };

  const forwardLocationReport = async () => {
    if (!account || !location || !forwardReportCard) {
      return;
    }
    if (!forwardTargetLocationId) {
      setForwardReportError("Select the location receiving this report.");
      return;
    }
    const isSelfSave = idsEqual(forwardTargetLocationId, location.id);
    if (!isSelfSave && !forwardProofAttachment) {
      setForwardReportError(
        "Add a screenshot proof before forwarding this report.",
      );
      return;
    }
    setForwardReportSaving(true);
    setForwardReportError("");
    setForwardReportSuccess("");
    try {
      await api.post<ForwardedLocationReport>("/forwarded-location-reports", {
        requester_id: account.id,
        date: forwardReportCard.scheduleDate,
        source_location_id: location.id,
        target_location_id: forwardTargetLocationId,
        shedules_id: Array.from(
          new Set(
            forwardReportCard.reports.flatMap((report) =>
              (report.schedules || "").split(",").filter(Boolean),
            ),
          ),
        ).join(","),
        schedule_types: forwardReportCard.scheduleTypes.join(", "),
        schedule_labels: forwardReportCard.scheduleLabels.join(", "),
        attendance_schedule_count: forwardReportCard.attendanceScheduleCount,
        mf_attendance: forwardReportCard.scheduleTypes.includes("Discipleship")
          ? new Set(
              mfAttendances
                .filter(
                  (attendance) =>
                    attendance.adate === forwardReportCard.scheduleDate,
                )
                .map((attendance) => attendance.sg_id)
                .filter(Boolean),
            ).size
          : 0,
        total_attendance: forwardReportCard.attendanceTotal,
        financial_particulars: forwardReportCard.particulars
          .map((item) => item.label)
          .join(", "),
        financial_particulars_value: forwardReportCard.particularsTotal,
        financial_particulars_count:
          forwardReportCard.collectionParticularCount,
        remissions: forwardReportCard.remissions
          .map((item) => item.label)
          .join(", "),
        remissions_value: forwardReportCard.remissionsTotal,
        report_details: JSON.stringify({
          scheduleDate: forwardReportCard.scheduleDate,
          scheduleTypes: forwardReportCard.scheduleTypes,
          attendanceTotal: forwardReportCard.attendanceTotal,
          attendanceScheduleCount: forwardReportCard.attendanceScheduleCount,
          particulars: forwardReportCard.particulars.map((item) => ({
            ...item,
            scheduleIds: Array.from(item.scheduleIds),
          })),
          particularsTotal: forwardReportCard.particularsTotal,
          collectionParticularCount:
            forwardReportCard.collectionParticularCount,
          collectionTotalCount: forwardReportCard.collectionTotalCount,
          missingCollectionScheduleCount:
            forwardReportCard.missingCollectionScheduleCount,
          remissions: forwardReportCard.remissions,
          remissionsTotal: forwardReportCard.remissionsTotal,
          scheduleLabels: forwardReportCard.scheduleLabels,
          scheduleSummaries: forwardReportCard.scheduleSummaries,
        }),
        screenshop_attachment: forwardProofAttachment || null,
        report_type: forwardReportCard.scheduleTypes.join(", ") || "General",
      });
      await loadRelatedRecords();
      const message = isSelfSave
        ? "Report saved successfully."
        : "Report forwarded successfully.";
      setForwardReportSuccess(message);
      setFeedback({ severity: "success", message });
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        "Failed to forward report",
      );
      setForwardReportError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setForwardReportSaving(false);
    }
  };

  const approveForwardedReport = async (report: ForwardedLocationReport) => {
    if (!account) {
      return;
    }
    try {
      await api.post(`/forwarded-location-reports/${report.id}/approve`, {
        requester_id: account.id,
      });
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to approve forwarded report"),
      );
    }
  };

  const openLocationRemissions = () => {
    setRoleMenuAnchor(null);
    setRoleSwitchMenuAnchor(null);
    setRemissionForm(blankRemissionForm);
    setRemissionError("");
    setEditingRemissionId(null);
    setActiveTab(16);
    if (location?.id) {
      void api
        .get<Particular[]>(`/particulars?location_id=${location.id}`)
        .then((response) => setLocationParticulars(response.data))
        .catch(() => undefined);
    }
  };

  const openLocationParticulars = () => {
    setRoleMenuAnchor(null);
    setRoleSwitchMenuAnchor(null);
    setLocationParticularForm({ title: "", category: "", type: "" });
    setLocationParticularError("");
    setEditingLocationParticularId(null);
    setActiveTab(15);
    if (location?.id) {
      void api
        .get<Particular[]>(`/particulars?location_id=${location.id}`)
        .then((response) => setLocationParticulars(response.data))
        .catch(() => undefined);
    }
  };

  const openLocationParticularDrawer = () => {
    resetLocationParticularForm();
    setLocationParticularError("");
    setLocationParticularsOpen(true);
  };

  const openExpenseParticularDrawer = () => {
    resetLocationParticularForm();
    setLocationParticularForm((current) => ({
      ...current,
      category: "Expense",
      type: current.type || "General",
    }));
    setLocationParticularError("");
    setLocationParticularsOpen(true);
  };

  const openLocationRemissionDrawer = () => {
    resetRemissionForm();
    setRemissionError("");
    setLocationRemissionsOpen(true);
  };

  const resetLocationParticularForm = () => {
    setLocationParticularForm({ title: "", category: "", type: "" });
    setEditingLocationParticularId(null);
    setLocationParticularError("");
  };

  const saveLocationParticular = async () => {
    if (
      !account ||
      !location ||
      !locationParticularForm.title.trim() ||
      !locationParticularForm.category ||
      !locationParticularForm.type
    ) {
      setLocationParticularError(
        "Enter a particular title, category, and type.",
      );
      return;
    }
    setLocationParticularError("");
    try {
      const payload = {
        requester_id: account.id,
        title: locationParticularForm.title,
        category: locationParticularForm.category,
        type: locationParticularForm.type,
      };
      if (editingLocationParticularId) {
        await api.patch(`/particulars/${editingLocationParticularId}`, payload);
      } else {
        await api.post("/particulars", {
          ...payload,
          location_id: location.id,
        });
      }
      resetLocationParticularForm();
      await loadRelatedRecords();
      setFeedback({
        severity: "success",
        message: `Particular ${editingLocationParticularId ? "updated" : "saved"} successfully.`,
      });
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        `Failed to ${editingLocationParticularId ? "update" : "add"} particular`,
      );
      setLocationParticularError(message);
      setFeedback({ severity: "error", message });
    }
  };

  const editLocationParticular = (particular: Particular) => {
    setEditingLocationParticularId(particular.particular_id);
    setLocationParticularForm({
      title: particular.title || "",
      category: particular.category || "Income",
      type: particular.type || "General",
    });
    setLocationParticularError("");
    setLocationParticularsOpen(true);
  };

  const removeLocationParticular = async (particular: Particular) => {
    if (!account) {
      setLocationParticularError(
        "You must be signed in to remove particulars.",
      );
      return;
    }
    setLocationParticularError("");
    try {
      await api.delete(`/particulars/${particular.particular_id}`, {
        params: { requester_id: account.id },
      });
      if (editingLocationParticularId === particular.particular_id) {
        resetLocationParticularForm();
      }
      await loadRelatedRecords();
    } catch (requestError) {
      setLocationParticularError(
        getApiErrorMessage(requestError, "Failed to remove particular"),
      );
    }
  };

  const resetRemissionForm = () => {
    setRemissionForm(blankRemissionForm);
    setEditingRemissionId(null);
    setRemissionError("");
  };

  const handleEditLocationRemission = (remission: LocationRemission) => {
    setEditingRemissionId(remission.id);
    setRemissionForm({
      title: remission.title || "",
      particular_id: remission.particular_id || "",
      percentage:
        remission.percentage == null ? "" : String(remission.percentage),
      description: remission.description || "",
    });
    setRemissionError("");
    setLocationRemissionsOpen(true);
  };

  const handleSaveLocationRemission = async () => {
    if (!location || !account) {
      setRemissionError("You must be signed in to create remissions.");
      return;
    }
    setRemissionSaving(true);
    setRemissionError("");
    try {
      const payload = {
        requester_id: account.id,
        particular_id: remissionForm.particular_id || null,
        title: remissionForm.title,
        percentage: Number(remissionForm.percentage || 0),
        description: remissionForm.description,
      };
      if (editingRemissionId) {
        await api.patch<LocationRemission>(
          `/location-remissions/${editingRemissionId}`,
          payload,
        );
      } else {
        await api.post<LocationRemission>("/location-remissions", {
          ...payload,
          location_id: location.id,
        });
      }
      resetRemissionForm();
      await loadRelatedRecords();
      setFeedback({
        severity: "success",
        message: `Remission ${editingRemissionId ? "updated" : "saved"} successfully.`,
      });
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        `Failed to ${editingRemissionId ? "update" : "create"} remission`,
      );
      setRemissionError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setRemissionSaving(false);
    }
  };

  const handleDeleteLocationRemission = async (
    remission: LocationRemission,
  ) => {
    if (!account) {
      setRemissionError("You must be signed in to remove remissions.");
      return;
    }
    setRemissionSaving(true);
    setRemissionError("");
    try {
      await api.delete(`/location-remissions/${remission.id}`, {
        params: { requester_id: account.id },
      });
      if (editingRemissionId === remission.id) {
        resetRemissionForm();
      }
      await loadRelatedRecords();
    } catch (requestError) {
      setRemissionError(
        getApiErrorMessage(requestError, "Failed to remove remission"),
      );
    } finally {
      setRemissionSaving(false);
    }
  };

  const handleSaveAction = async () => {
    if (!location || !account) {
      setActionError("You must be signed in to create records.");
      return;
    }
    setActionSaving(true);
    setActionError("");
    try {
      const targetTab = actionTab;
      const requesterPayload = { requester_id: account.id };
      if (targetTab === 0) {
        await api.post("/posts", {
          ...requesterPayload,
          location_id: location.id,
          title: actionForm.title,
          description: actionForm.description,
          type: actionForm.type,
          status: actionForm.status || "Public",
        });
      } else if (targetTab === 1) {
        await api.post("/members", {
          ...requesterPayload,
          location_id: location.id,
          user_id: actionForm.user_id,
          audience: actionForm.audience,
        });
      } else if (targetTab === 2) {
        await api.post<Cashbook>("/cashbooks", {
          ...requesterPayload,
          location_id: location.id,
          title: actionForm.title,
          description: actionForm.description,
          visibility: actionForm.visibility || "Public",
          startdate: actionForm.startdate || null,
          enddate: actionForm.enddate || null,
          opening_balance:
            actionForm.opening_balance_source === "previous"
              ? null
              : Number(actionForm.opening_balance || 0),
          opening_balance_source: actionForm.opening_balance_source,
          opening_balance_cashbook_id:
            actionForm.opening_balance_source === "previous"
              ? actionForm.opening_balance_cashbook_id || null
              : null,
        });
      } else if (targetTab === 3) {
        if (attendanceCreateScope === "mf") {
          if (!actionForm.sg_id) {
            setActionError("Select a missional family.");
            return;
          }
          const attendanceDate = actionForm.date || today();
          const schedulesForMfAttendanceDate = schedules.filter(
            (schedule) =>
              scheduleOccursOnDate(schedule, attendanceDate) &&
              !mfAttendances.some(
                (attendance) =>
                  attendance.sg_id === actionForm.sg_id &&
                  attendance.schedule_id === schedule.id &&
                  attendance.adate === attendanceDate,
              ),
          );
          if (!schedulesForMfAttendanceDate.length) {
            setActionError(
              "There are no schedules available for attendance on this date.",
            );
            return;
          }
          const missingSchedule = schedulesForMfAttendanceDate.find(
            (schedule) =>
              attendanceValueMissing(
                actionForm.attendance_records[schedule.id],
              ),
          );
          if (missingSchedule) {
            setActionError(
              `Enter attendance for ${scheduleLabel(missingSchedule)}.`,
            );
            return;
          }
          const records = schedulesForMfAttendanceDate.map((schedule) => ({
            schedule_id: schedule.id,
            total_number: Number(
              actionForm.attendance_records[schedule.id] || 0,
            ),
          }));
          await api.post("/mf-attendances/bulk", {
            ...requesterPayload,
            sg_id: actionForm.sg_id,
            remarks: actionForm.description,
            adate: attendanceDate,
            records,
          });
        } else {
          const schedulesForAttendanceDate = schedules.filter(
            (schedule) =>
              scheduleOccursOnDate(schedule, actionForm.date || today()) &&
              !attendances.some(
                (attendance) =>
                  attendance.schedule_id === schedule.id &&
                  attendance.date === (actionForm.date || today()),
              ),
          );
          if (!schedulesForAttendanceDate.length) {
            setActionError(
              "There are no schedules available for attendance on this date.",
            );
            return;
          }
          const missingSchedule = schedulesForAttendanceDate.find(
            (schedule) => {
              const source =
                actionForm.attendance_sources[schedule.id] ||
                (mfAttendanceTotalForSchedule(
                  mfAttendances,
                  schedule.id,
                  actionForm.date || today(),
                ) > 0
                  ? "mf"
                  : "manual");
              return (
                source === "manual" &&
                attendanceValueMissing(
                  actionForm.attendance_records[schedule.id],
                )
              );
            },
          );
          if (missingSchedule) {
            setActionError(
              `Enter attendance for ${scheduleLabel(missingSchedule)}.`,
            );
            return;
          }
          const records = schedulesForAttendanceDate.map((schedule) => ({
            schedule_id: schedule.id,
            use_mf_attendance:
              (actionForm.attendance_sources[schedule.id] ||
                (mfAttendanceTotalForSchedule(
                  mfAttendances,
                  schedule.id,
                  actionForm.date || today(),
                ) > 0
                  ? "mf"
                  : "manual")) === "mf",
            total_attendance: Number(
              actionForm.attendance_records[schedule.id] || 0,
            ),
          }));
          await api.post("/attendances/bulk", {
            ...requesterPayload,
            location_id: location.id,
            date: actionForm.date || today(),
            remarks: actionForm.description,
            records,
          });
        }
      } else if (targetTab === 4) {
        await api.post("/events", {
          ...requesterPayload,
          location_id: location.id,
          title: actionForm.title,
          type: actionForm.type,
          startdate: actionForm.startdate || null,
          starttime: actionForm.starttime || null,
          description: actionForm.description,
          venue: actionForm.venue,
          speakers: actionForm.speakers,
        });
      } else if (targetTab === 5) {
        const roleScope =
          actionForm.role_scope_type === "Menus" &&
          actionForm.menu_scopes.length
            ? actionForm.menu_scopes.join(", ")
            : "Location";
        await api.post("/roles", {
          ...requesterPayload,
          location_id: location.id,
          user_id: actionForm.user_id,
          role: actionForm.role,
          title: actionForm.title || actionForm.role,
          scope: roleScope,
        });
      } else if (targetTab === 6) {
        await api.post("/zones", {
          ...requesterPayload,
          location_id: location.id,
          title: actionForm.title,
          description: actionForm.description,
          leader1_id: actionForm.leader1_id ? actionForm.leader1_id : null,
          leader2_id: actionForm.leader2_id ? actionForm.leader2_id : null,
        });
      } else if (targetTab === 7) {
        await api.post("/missional-families", {
          ...requesterPayload,
          zone_id: actionForm.zone_id,
          title: actionForm.title,
          description: actionForm.description,
          leader1_id: actionForm.leader1_id ? actionForm.leader1_id : null,
          leader2_id: actionForm.leader2_id ? actionForm.leader2_id : null,
        });
      } else if (targetTab === 8) {
        await api.post("/schedules", {
          ...requesterPayload,
          location_id: location.id,
          title: actionForm.title,
          type: actionForm.type,
          recurrence: actionForm.recurrence,
          weekday:
            actionForm.recurrence === "Weekly"
              ? Number(actionForm.weekday)
              : null,
          date:
            actionForm.recurrence === "Weekly" ? null : actionForm.date || null,
          time: actionForm.all_day ? null : actionForm.time || null,
          end_time: actionForm.all_day ? null : actionForm.end_time || null,
          all_day: actionForm.all_day,
        });
      } else if (targetTab === 9) {
        await api.post("/locations", {
          author_id: account.id,
          owner_id: location.owner_id || account.id,
          parent_location_id: location.id,
          title: actionForm.title,
          type: actionForm.type || "Branch",
          description: actionForm.description,
          email: actionForm.email,
          phone_number: actionForm.phone_number,
          country: actionForm.country,
          district: actionForm.district,
          city: actionForm.city,
          address: actionForm.address,
        });
      }
      await loadRelatedRecords(targetTab === 3 ? ["attendance"] : ["all"]);
      if (targetTab === 1) {
        await refreshMemberAssignmentSources();
      }
      setActionForm(blankActionForm);
      setFeedback({
        severity: "success",
        message: `${locationTabActions[targetTab] || "Record"} saved successfully.`,
      });
    } catch (requestError) {
      const message = getApiErrorMessage(requestError, "Failed to save record");
      setActionError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setActionSaving(false);
    }
  };

  const handleRegisterMember = async () => {
    if (!location || !account) {
      setActionError("You must be signed in to register members.");
      return;
    }
    if (!actionForm.fname.trim() || !actionForm.lname.trim()) {
      setActionError("First name and last name are required.");
      return;
    }
    if (!actionForm.phone_number.trim()) {
      setActionError("Phone number is required.");
      return;
    }
    setActionSaving(true);
    setActionError("");
    try {
      await api.post("/members/register", {
        requester_id: account.id,
        location_id: location.id,
        fname: actionForm.fname,
        lname: actionForm.lname,
        email: actionForm.email || null,
        phone_number: actionForm.phone_number,
        gender: actionForm.gender,
        marital_status: actionForm.marital_status,
        occupation: actionForm.occupation,
        country: actionForm.country,
        district: actionForm.district,
        city: actionForm.city,
        address: actionForm.address,
        profile_picture: actionForm.profile_picture || null,
        audience: actionForm.audience,
        start_date: actionForm.start_date || null,
      });
      await Promise.all([loadRelatedRecords(), refreshMemberAssignmentSources()]);
      setActionForm(blankActionForm);
      setFeedback({
        severity: "success",
        message: "Member saved successfully.",
      });
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        "Failed to register member",
      );
      setActionError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setActionSaving(false);
    }
  };

  const handleSelectActiveRole = async (role: string) => {
    if (!location || !account) {
      return;
    }
    setActiveRoleSaving(true);
    setRelatedError("");
    try {
      await api.post(`/locations/${location.id}/active-role`, {
        requester_id: account.id,
        role,
      });
      await loadRelatedRecords();
      setRoleMenuAnchor(null);
      setRoleSwitchMenuAnchor(null);
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to update active role"),
      );
    } finally {
      setActiveRoleSaving(false);
    }
  };

  const openLocationEdit = () => {
    if (!location) {
      return;
    }
    setLocationEditForm({
      title: location.title || "",
      type: location.type || "",
      description: location.description || "",
      email: location.email || "",
      phone_number: location.phone_number || "",
      country: location.country || "",
      district: location.district || "",
      city: location.city || "",
      address: location.address || "",
      reporting_start_date: location.reporting_start_date || "",
    });
    setLocationEditError("");
    setRoleMenuAnchor(null);
    setRoleSwitchMenuAnchor(null);
    setLocationEditOpen(true);
  };

  const saveLocationEdit = async () => {
    if (!location || !account) {
      return;
    }
    setLocationEditSaving(true);
    setLocationEditError("");
    try {
      const response = await api.patch<Location>(`/locations/${location.id}`, {
        requester_id: account.id,
        ...locationEditForm,
      });
      setLocation(response.data);
      await refreshOverview();
      setFeedback({
        severity: "success",
        message: "Location saved successfully.",
      });
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        "Failed to save location",
      );
      setLocationEditError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setLocationEditSaving(false);
    }
  };

  const deleteLocation = async () => {
    if (!location || !account) {
      return;
    }
    setLocationDeleteSaving(true);
    setLocationDeleteError("");
    try {
      await api.delete(`/locations/${location.id}?requester_id=${account.id}`);
      setFeedback({
        severity: "success",
        message: "Location deleted successfully.",
      });
      navigate("/app");
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        "Failed to delete location",
      );
      setLocationDeleteError(message);
      setFeedback({ severity: "error", message });
    } finally {
      setLocationDeleteSaving(false);
    }
  };

  const openScheduleEdit = (schedule: Schedule) => {
    setScheduleEdit(schedule);
    setScheduleEditForm({
      title: schedule.title || "",
      type: schedule.type || scheduleTypes[0],
      recurrence: schedule.recurrence || "Weekly",
      weekday: String(schedule.weekday ?? 0),
      date: schedule.date || "",
      time: schedule.time || "",
      end_time: schedule.end_time || "",
      all_day: Boolean(schedule.all_day),
    });
  };

  const saveScheduleEdit = async () => {
    if (!account || !scheduleEdit) {
      return;
    }
    await api.patch(`/schedules/${scheduleEdit.id}`, {
      requester_id: account.id,
      title: scheduleEditForm.title,
      type: scheduleEditForm.type,
      recurrence: scheduleEditForm.recurrence,
      weekday:
        scheduleEditForm.recurrence === "Weekly"
          ? Number(scheduleEditForm.weekday)
          : null,
      date:
        scheduleEditForm.recurrence === "Weekly"
          ? null
          : scheduleEditForm.date || null,
      time: scheduleEditForm.all_day ? null : scheduleEditForm.time || null,
      end_time: scheduleEditForm.all_day
        ? null
        : scheduleEditForm.end_time || null,
      all_day: scheduleEditForm.all_day,
    });
    setScheduleEdit(null);
    await loadRelatedRecords();
  };

  const removeSchedule = async (schedule: Schedule) => {
    if (!account) {
      return;
    }
    setRelatedError("");
    try {
      await api.delete(`/schedules/${schedule.id}?requester_id=${account.id}`);
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to remove schedule"),
      );
    }
  };

  const closeAttendanceMenu = () => {
    setAttendanceMenuAnchor(null);
    setSelectedAttendance(null);
    setSelectedMfAttendance(null);
  };

  const openAttendanceEdit = () => {
    if (selectedAttendance) {
      setAttendanceEditForm({
        date: selectedAttendance.date || "",
        schedule_id: selectedAttendance.schedule_id || "",
        total_attendance:
          selectedAttendance.total_attendance == null
            ? ""
            : String(selectedAttendance.total_attendance),
        remarks: selectedAttendance.remarks || "",
      });
      setAttendanceEditError("");
      setAttendanceEditOpen(true);
    } else if (selectedMfAttendance) {
      setMfAttendanceEditForm({
        adate: selectedMfAttendance.adate || "",
        sg_id: selectedMfAttendance.sg_id || "",
        schedule_id: selectedMfAttendance.schedule_id || "",
        total_number:
          selectedMfAttendance.total_number == null
            ? ""
            : String(selectedMfAttendance.total_number),
        remarks: selectedMfAttendance.remarks || "",
      });
      setAttendanceEditError("");
      setMfAttendanceEditOpen(true);
    }
    setAttendanceMenuAnchor(null);
  };

  const saveAttendanceEdit = async () => {
    if (!account || !selectedAttendance) {
      return;
    }
    setAttendanceEditError("");
    try {
      await api.patch(`/attendances/${selectedAttendance.id}`, {
        requester_id: account.id,
        date: attendanceEditForm.date || null,
        schedule_id: attendanceEditForm.schedule_id || null,
        total_attendance: Number(attendanceEditForm.total_attendance || 0),
        remarks: attendanceEditForm.remarks,
      });
      setAttendanceEditOpen(false);
      setSelectedAttendance(null);
      await loadRelatedRecords();
    } catch (requestError) {
      setAttendanceEditError(
        getApiErrorMessage(requestError, "Failed to update attendance"),
      );
    }
  };

  const saveMfAttendanceEdit = async () => {
    if (!account || !selectedMfAttendance) {
      return;
    }
    setAttendanceEditError("");
    try {
      await api.patch(`/mf-attendances/${selectedMfAttendance.id}`, {
        requester_id: account.id,
        adate: mfAttendanceEditForm.adate || null,
        sg_id: mfAttendanceEditForm.sg_id || null,
        schedule_id: mfAttendanceEditForm.schedule_id || null,
        total_number: Number(mfAttendanceEditForm.total_number || 0),
        remarks: mfAttendanceEditForm.remarks,
      });
      setMfAttendanceEditOpen(false);
      setSelectedMfAttendance(null);
      await loadRelatedRecords();
    } catch (requestError) {
      setAttendanceEditError(
        getApiErrorMessage(
          requestError,
          "Failed to update missional attendance",
        ),
      );
    }
  };

  const deleteSelectedAttendance = async () => {
    if (!account) {
      return;
    }
    setRelatedError("");
    try {
      if (selectedAttendance) {
        await api.delete(
          `/attendances/${selectedAttendance.id}?requester_id=${account.id}`,
        );
      } else if (selectedMfAttendance) {
        await api.delete(
          `/mf-attendances/${selectedMfAttendance.id}?requester_id=${account.id}`,
        );
      }
      closeAttendanceMenu();
      await loadRelatedRecords();
    } catch (requestError) {
      setRelatedError(
        getApiErrorMessage(requestError, "Failed to delete attendance"),
      );
    }
  };

  const currentOwnerRole = effectiveLocationRole(roles, account?.id);
  const isLocationOwner = Boolean(account && location?.owner_id === account.id);
  const activeLocationRole =
    currentOwnerRole?.role || (isLocationOwner ? "Location Admin" : "");
  const activeLocationRoleNames = roles
    .filter(
      (role) =>
        role.user_id === account?.id &&
        role.scope === "Location" &&
        role.status === "Active",
    )
    .map((role) => role.role || "");
  const activeRoleNames = roles
    .filter(
      (role) =>
        role.user_id === account?.id &&
        role.status === "Active",
    )
    .map((role) => role.role || "");
  const hasActiveRole = (roleNames: string[]) =>
    activeRoleNames.some((role) => roleNames.includes(role));
  const hasActiveLocationRole = (roleNames: string[]) =>
    activeLocationRoleNames.some((role) => roleNames.includes(role));
  const isLocationManagerForUi =
    isLocationOwner || locationManagerRoles.includes(activeLocationRole);
  const menuScopedTabIds = menuScopedLocationTabIds(roles, account?.id);
  const menuScopedManagerTabIds = menuScopedManagerActionTabIds(
    roles,
    account?.id,
  );
  const menuScopedPastorTabIds = menuScopedPastorActionTabIds(
    roles,
    account?.id,
  );
  const canManageLocationActionTab = (tabId: number) =>
    isLocationManagerForUi || menuScopedManagerTabIds.includes(tabId);
  const canViewLocationAsViewer =
    !isLocationManagerForUi && hasActiveLocationRole(["Viewer", "Evaluator"]);
  const hasZoneScopedRole = hasActiveLocationRole(zoneScopedRoles);
  const hasFamilyScopedRole = hasActiveLocationRole(familyScopedRoles);
  const hasScopedLeadershipRole = hasZoneScopedRole || hasFamilyScopedRole;
  const canOpenManageTab =
    isLocationManagerForUi ||
    menuScopedTabIds.some((tabId) => manageLocationContentTabs.includes(tabId));
  const canApproveReportsForUi =
    isLocationOwner ||
    locationPastorRoles.includes(activeLocationRole) ||
    canManageLocationActionTab(10) ||
    hasActiveRole(["Reports Approver"]);
  const canApproveRequisitionsForUi =
    isLocationOwner ||
    locationPastorRoles.includes(activeLocationRole) ||
    canManageLocationActionTab(2) ||
    hasActiveRole(["Requisitions Approver"]);
  const canCreatePrivateCashbooks =
    locationPastorRoles.includes(activeLocationRole) ||
    hasActiveLocationRole(locationPastorRoles) ||
    menuScopedPastorTabIds.includes(2);
  const activeResourceTab =
    activeTab === 1
      ? membershipView === "zones"
        ? 6
        : membershipView === "missionalFamilies"
          ? 7
          : membershipView === "branches"
            ? 9
            : 1
      : activeTab;
  const canManageLocationResources =
    canManageLocationActionTab(activeResourceTab) || hasScopedLeadershipRole;
  const canManageLocationReports = canManageLocationActionTab(10);
  const isBranchLocation =
    String(location?.type || "").toLowerCase() === "branch";
  const isOfficeLocation =
    String(location?.type || "").toLowerCase() === "office";
  const availableAssignableLocationRoles = assignableLocationRoles.filter(
    (role) => !hqOnlyLocationRoles.includes(role) || Boolean(location?.is_hq),
  );
  const canUseLocalReports = isBranchLocation;
  const canUseAllMinistryReports =
    !isBranchLocation || Boolean(location?.is_hq);
  const visibleLocationTabs = (
    isLocationManagerForUi
        ? [10, 2, 3, 1, 8, 9, 5, ...(subscriptionsEnforced ? [12] : [])]
        : menuScopedTabIds.length
          ? [
              ...menuScopedTabIds,
              ...(canApproveReportsForUi ? [10] : []),
              ...(canApproveRequisitionsForUi ? [2] : []),
            ]
        : activeLocationRole === "Location Member"
          ? [8, 9]
        : canViewLocationAsViewer
          ? [10, 2, 3, 1, 8, 9]
          : hasScopedLeadershipRole
            ? [1, 3, 8]
            : [
                ...menuScopedTabIds,
                ...(canApproveReportsForUi ? [10] : []),
                ...(canApproveRequisitionsForUi ? [2] : []),
              ]
  )
    .filter(
      (tabId) =>
        menuScopedTabIds.includes(tabId) ||
        isBranchLocation ||
        canViewLocationAsViewer ||
        ![3, 1, 9].includes(tabId),
    )
    .filter((tabId) => menuScopedTabIds.includes(tabId) || !isOfficeLocation || tabId !== 11);
  useEffect(() => {
    if (
      !visibleLocationTabs.includes(activeTab) &&
      !(canOpenManageTab && manageLocationContentTabs.includes(activeTab))
    ) {
      setActiveTab(visibleLocationTabs[0] ?? -1);
    }
  }, [activeTab, canOpenManageTab, visibleLocationTabs]);
  useEffect(() => {
    const root = locationTabsRef.current;
    const scroller = root?.querySelector<HTMLElement>(".MuiTabs-scroller");
    if (!root || !scroller) {
      return undefined;
    }

    const updateHiddenTabCounts = () => {
      const scrollerRect = scroller.getBoundingClientRect();
      const tabs = Array.from(
        root.querySelectorAll<HTMLElement>('[role="tab"]'),
      ).filter((tab) => !tab.hasAttribute("hidden"));
      const nextCounts = tabs.reduce(
        (counts, tab) => {
          const tabRect = tab.getBoundingClientRect();
          if (tabRect.right < scrollerRect.left - 1) {
            counts.left += 1;
          } else if (tabRect.left > scrollerRect.right + 1) {
            counts.right += 1;
          }
          return counts;
        },
        { left: 0, right: 0 },
      );
      setHiddenLocationTabCounts((current) =>
        current.left === nextCounts.left && current.right === nextCounts.right
          ? current
          : nextCounts,
      );
    };

    updateHiddenTabCounts();
    scroller.addEventListener("scroll", updateHiddenTabCounts, {
      passive: true,
    });
    window.addEventListener("resize", updateHiddenTabCounts);
    const observer = new ResizeObserver(updateHiddenTabCounts);
    observer.observe(scroller);
    Array.from(root.querySelectorAll<HTMLElement>('[role="tab"]')).forEach(
      (tab) => observer.observe(tab),
    );

    return () => {
      scroller.removeEventListener("scroll", updateHiddenTabCounts);
      window.removeEventListener("resize", updateHiddenTabCounts);
      observer.disconnect();
    };
  }, [activeTab, membershipView, subscriptionsEnforced, visibleLocationTabs]);
  useEffect(() => {
    if (!isLocationManagerForUi && canApproveRequisitionsForUi) {
      setFinanceView("requisitions");
    }
  }, [canApproveRequisitionsForUi, isLocationManagerForUi]);
  useEffect(() => {
    if (isOfficeLocation && financeView === "requisitions") {
      setFinanceView("cashbooks");
    }
  }, [financeView, isOfficeLocation]);
  useEffect(() => {
    if (selectedReportMenu === null) {
      return;
    }
    if (!canUseLocalReports && selectedReportMenu === "Local") {
      setSelectedReportMenu(null);
      setReportsView("locations");
      return;
    }
    if (
      !canUseAllMinistryReports &&
      selectedReportMenu === allMinistryReportsMenuOption
    ) {
      setSelectedReportMenu(null);
      setReportsView("locations");
    }
  }, [canUseAllMinistryReports, canUseLocalReports, selectedReportMenu]);
  useEffect(() => {
    if (selectedReportMenu !== null || !visibleLocationTabs.includes(10)) {
      return;
    }
    setSelectedReportMenu(
      canUseLocalReports ? "Local" : receivedReportMenuOption,
    );
    setReportsView("locations");
  }, [canUseLocalReports, selectedReportMenu, visibleLocationTabs]);
  const membershipMenuOptions = [
    {
      value: "members" as const,
      label: "Members",
      icon: <GroupsIcon fontSize="small" />,
    },
    {
      value: "zones" as const,
      label: term("zones"),
      icon: <HubIcon fontSize="small" />,
    },
    {
      value: "missionalFamilies" as const,
      label: term("missionalFamilies"),
      icon: <Diversity2Icon fontSize="small" />,
    },
    {
      value: "branches" as const,
      label: term("branches"),
      icon: <HomeWorkIcon fontSize="small" />,
    },
  ].filter(
    (option) => {
      const optionActionTab =
        option.value === "zones"
          ? 6
          : option.value === "missionalFamilies"
            ? 7
            : option.value === "branches"
              ? 9
              : 1;
      if (
        menuScopedTabIds.includes(1) &&
        !isLocationManagerForUi &&
        !hasScopedLeadershipRole
      ) {
        return canManageLocationActionTab(optionActionTab);
      }
      return (
        (option.value === "branches" ? visibleLocationTabs.includes(9) : true) &&
        (isLocationManagerForUi ||
        canManageLocationActionTab(optionActionTab) ||
        !hasScopedLeadershipRole ||
        hasZoneScopedRole ||
          option.value === "missionalFamilies")
      );
    },
  );
  const attendanceMenuOptions = [
    { value: 0, label: term("location"), icon: <HomeWorkIcon fontSize="small" /> },
    {
      value: 1,
      label: term("missionalFamilies"),
      icon: <Diversity2Icon fontSize="small" />,
    },
  ].filter(
    (option) =>
      isLocationManagerForUi ||
      !hasScopedLeadershipRole ||
      hasZoneScopedRole ||
      option.value === 1,
  );
  const membershipActionTab =
    membershipView === "zones"
      ? 6
      : membershipView === "missionalFamilies"
        ? 7
        : membershipView === "branches"
          ? 9
          : 1;
  const membershipActionLabel =
    locationTabActions[membershipActionTab] || "Create";
  const membershipViewCount =
    membershipView === "zones"
      ? zones.length
      : membershipView === "missionalFamilies"
        ? missionalFamilies.length
        : membershipView === "branches"
          ? branches.length
          : members.length;
  const normalizedZoneSearch = zoneSearch.trim().toLowerCase();
  const filteredZones = zones.filter((zone) => {
    if (!normalizedZoneSearch) {
      return true;
    }
    return [
      zone.title,
      memberName(accounts, zone.leader1_id, zone.leader1_display_name),
      memberName(accounts, zone.leader2_id, zone.leader2_display_name),
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(normalizedZoneSearch),
    );
  });
  const normalizedFamilySearch = familySearch.trim().toLowerCase();
  const filteredMissionalFamilies = missionalFamilies.filter((family) => {
    if (!normalizedFamilySearch) {
      return true;
    }
    return [
      family.title,
      memberName(accounts, family.leader1_id, family.leader1_display_name),
      memberName(accounts, family.leader2_id, family.leader2_display_name),
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(normalizedFamilySearch),
    );
  });
  useEffect(() => {
    if (
      !membershipMenuOptions.some((option) => option.value === membershipView)
    ) {
      setMembershipView(membershipMenuOptions[0]?.value || "missionalFamilies");
    }
  }, [
    branches.length,
    hasScopedLeadershipRole,
    hasZoneScopedRole,
    isLocationManagerForUi,
    membershipView,
    members.length,
    missionalFamilies.length,
    visibleLocationTabs,
    zones.length,
  ]);
  useEffect(() => {
    if (
      !attendanceMenuOptions.some((option) => option.value === attendanceSubTab)
    ) {
      setAttendanceSubTab(attendanceMenuOptions[0]?.value ?? 1);
    }
  }, [
    attendanceSubTab,
    attendances.length,
    hasScopedLeadershipRole,
    hasZoneScopedRole,
    isLocationManagerForUi,
    mfAttendances.length,
  ]);
  const zonesMembershipContent =
    zones.length === 0 ? (
      <EmptyState
        title="No zones for this location yet"
        message="Create a zone to see it here."
      />
    ) : (
      <Stack spacing={2}>
        <TextField
          size="small"
          label="Search zones"
          value={zoneSearch}
          onChange={(event) => setZoneSearch(event.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        {filteredZones.length ? (
          <IncrementalGrid
            items={filteredZones}
            resetKey={normalizedZoneSearch}
            gridSize={{ xs: 12, sm: 6, md: 4 }}
            getKey={(zone) => zone.id}
            renderItem={(zone) => (
              <Paper variant="outlined" sx={{ height: "100%", p: 2.25 }}>
                <Stack spacing={1.5} sx={{ height: "100%" }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="overline" color="text.secondary">
                        Zone
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, mt: 0.25 }}
                      >
                        {zone.title || `Zone #${zone.id}`}
                      </Typography>
                    </Box>
                    {canManageLocationResources ? (
                      <IconButton
                        aria-label="Zone actions"
                        size="small"
                        onClick={(event) => openZoneMenu(event, zone)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    ) : null}
                  </Stack>
                  <List dense disablePadding>
                    {[
                      {
                        label: "Leader",
                        value: memberName(
                          accounts,
                          zone.leader1_id,
                          zone.leader1_display_name,
                        ),
                        subtitle: memberPhone(
                          accounts,
                          zone.leader1_id,
                          zone.leader1_phone_number,
                        ),
                      },
                      {
                        label: "Assistant",
                        value: memberName(
                          accounts,
                          zone.leader2_id,
                          zone.leader2_display_name,
                        ),
                        subtitle: memberPhone(
                          accounts,
                          zone.leader2_id,
                          zone.leader2_phone_number,
                        ),
                      },
                      {
                        label: "Missional Families",
                        value: String(
                          missionalFamilies.filter(
                            (family) => family.zone_id === zone.id,
                          ).length,
                        ),
                      },
                    ].map((item) => (
                      <ListItem
                        key={item.label}
                        disableGutters
                        divider
                        sx={{ py: 0.75, gap: 1 }}
                      >
                        <ListItemText
                          primary={item.label}
                          slotProps={{
                            primary: {
                              variant: "body2",
                              color: "text.secondary",
                            },
                          }}
                        />
                        <Box sx={{ minWidth: 0, textAlign: "right" }}>
                          <Typography variant="body2" color="text.secondary">
                            {item.value}
                          </Typography>
                          {item.subtitle ? (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {item.subtitle}
                            </Typography>
                          ) : null}
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: "auto" }}
                  >
                    {zone.description || "No description has been added yet."}
                  </Typography>
                </Stack>
              </Paper>
            )}
          />
        ) : (
          <EmptyState
            title="No zones found"
            message="Try another zone title or leader name."
          />
        )}
      </Stack>
    );
  const missionalFamiliesMembershipContent =
    missionalFamilies.length === 0 ? (
      <EmptyState
        title="No missional families for this location yet"
        message="Create a missional family to see it here."
      />
    ) : (
      <Stack spacing={2}>
        <TextField
          size="small"
          label="Search missional families"
          value={familySearch}
          onChange={(event) => setFamilySearch(event.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        {filteredMissionalFamilies.length ? (
          <IncrementalGrid
            items={filteredMissionalFamilies}
            resetKey={normalizedFamilySearch}
            gridSize={{ xs: 12, sm: 6, md: 4 }}
            getKey={(family) => family.id}
            renderItem={(family) => (
              <Paper variant="outlined" sx={{ height: "100%", p: 2.25 }}>
                <Stack spacing={1.5} sx={{ height: "100%" }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="overline" color="text.secondary">
                        Missional Family
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, mt: 0.25 }}
                      >
                        {family.title || `Missional Family #${family.id}`}
                      </Typography>
                    </Box>
                    {canManageLocationResources ? (
                      <IconButton
                        aria-label="Missional family actions"
                        size="small"
                        onClick={(event) => openFamilyMenu(event, family)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    ) : null}
                  </Stack>
                  <List dense disablePadding>
                    {[
                      {
                        label: "Zone",
                        value:
                          zones.find((zone) =>
                            idsEqual(zone.id, family.zone_id),
                          )?.title || "Not set",
                      },
                      {
                        label: "Leader",
                        value: memberName(
                          accounts,
                          family.leader1_id,
                          family.leader1_display_name,
                        ),
                        subtitle: memberPhone(
                          accounts,
                          family.leader1_id,
                          family.leader1_phone_number,
                        ),
                      },
                      {
                        label: "Assistant",
                        value: memberName(
                          accounts,
                          family.leader2_id,
                          family.leader2_display_name,
                        ),
                        subtitle: memberPhone(
                          accounts,
                          family.leader2_id,
                          family.leader2_phone_number,
                        ),
                      },
                      {
                        label: "Members",
                        value: String(
                          missionalFamilyMembers.filter(
                            (member) =>
                              idsEqual(member.mf_id, family.id) &&
                              member.status !== "Inactive",
                          ).length,
                        ),
                      },
                    ].map((item) => (
                      <ListItem
                        key={item.label}
                        disableGutters
                        divider
                        sx={{ py: 0.75, gap: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircleIcon color="secondary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          slotProps={{
                            primary: {
                              variant: "body2",
                              color: "text.secondary",
                            },
                          }}
                        />
                        <Box sx={{ minWidth: 0, textAlign: "right" }}>
                          <Typography variant="body2" color="text.secondary">
                            {item.value}
                          </Typography>
                          {item.subtitle ? (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {item.subtitle}
                            </Typography>
                          ) : null}
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="body2" color="text.secondary">
                    {family.description || "No description has been added yet."}
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<GroupsIcon />}
                      onClick={() => openFamilyMembers(family)}
                    >
                      View Members
                    </Button>
                  </Box>
                </Stack>
              </Paper>
            )}
          />
        ) : (
          <EmptyState
            title="No missional families found"
            message="Try another family title or leader name."
          />
        )}
      </Stack>
    );

  const listedLocations = [
    ...(overview?.owned.locations || []),
    ...(overview?.assigned.locations || []),
  ]
    .filter(
      (item, index, items) =>
        items.findIndex((candidate) => idsEqual(candidate.id, item.id)) ===
        index,
    )
    .filter((item) => {
      const searchValue = locationListSearch.trim().toLowerCase();
      if (!searchValue) {
        return true;
      }
      return [item.title, item.type, item.city, item.district, item.country]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(searchValue);
    })
    .sort((left, right) => {
      if (location?.id) {
        if (idsEqual(left.id, location.id)) {
          return -1;
        }
        if (idsEqual(right.id, location.id)) {
          return 1;
        }
      }
      return (left.title || "").localeCompare(right.title || "", undefined, {
        sensitivity: "base",
      });
    });
  const locationsListFetching = !overview;
  const locationCreationMinistries =
    overview?.permissions?.location_creation_ministries || [];
  const canCreateLocations =
    overview?.permissions?.can_create_locations === true &&
    (account?.type === "Organization" || locationCreationMinistries.length > 0);
  const selectedCreationMinistry =
    locationCreationMinistries.find(
      (item) => item.owner_id === locationForm.owner_id,
    ) || null;
  const openCreateLocationDrawer = () => {
    setLocationError("");
    resetLocationForm();
    if (
      account?.type !== "Organization" &&
      locationCreationMinistries.length === 1
    ) {
      updateLocationForm({
        owner_id: locationCreationMinistries[0].owner_id,
      });
    }
    setLocationDrawerOpen(true);
  };
  const renderLocationsCard = (showCreateAction = true) => (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Locations
        </Typography>
        {canCreateLocations && showCreateAction ? (
          <IconButton
            color="primary"
            size="small"
            aria-label="Create New Location"
            onClick={openCreateLocationDrawer}
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              height: 32,
              width: 32,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        ) : null}
      </Box>
      <Box sx={{ px: 2.5, py: 1.5, borderTop: 1, borderColor: "divider" }}>
        <TextField
          label="Search locations"
          value={locationListSearch}
          onChange={(event) => setLocationListSearch(event.target.value)}
          fullWidth
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      {locationsListFetching ? (
        <Stack spacing={1.25} sx={{ p: 1.5 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center" }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton variant="text" width="72%" />
                <Skeleton variant="text" width="46%" />
              </Box>
            </Stack>
          ))}
        </Stack>
      ) : listedLocations.length === 0 ? (
        <Box sx={{ px: 2.5, py: 3 }}>
          <Typography variant="body2" color="text.secondary">
            No locations to show.
          </Typography>
        </Box>
      ) : (
        <List
          disablePadding
          sx={{ maxHeight: { xs: 360, md: 420 }, overflowY: "auto" }}
        >
          {listedLocations.map((item) => (
            <ListItem key={item.id} disablePadding divider>
              <ListItemButton
                selected={
                  Boolean(location?.id) && idsEqual(item.id, location?.id)
                }
                onClick={() => {
                  setLocationChooserOpen(false);
                  window.setTimeout(() => {
                    navigate(`/app/locations/${item.id}`);
                  }, 0);
                }}
                dense
              >
                <ListItemText
                  primary={item.title || `Location #${item.id}`}
                  secondary={[item.type || "Location", item.is_hq ? "HQ" : ""]
                    .filter(Boolean)
                    .join(" - ")}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
  const locationsCard = renderLocationsCard();
  const createLocationDrawer = (
    <Drawer
      anchor="right"
      open={locationDrawerOpen}
      onClose={() => setLocationDrawerOpen(false)}
      slotProps={{
        root: {
          sx: { zIndex: (muiTheme) => muiTheme.zIndex.modal },
        },
        paper: {
          sx: {
            width: { xs: "100%", sm: 520 },
            maxWidth: "100%",
            top: "0 !important",
            height: "100dvh",
            pointerEvents: "auto",
          },
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleCreateLocation}
        sx={{ p: { xs: 3, sm: 4 } }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          Create New {term("location")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          Add a ministry {term("location").toLowerCase()} without leaving this workspace.
        </Typography>
        {locationError ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {locationError}
          </Alert>
        ) : null}
        {locationSuccess ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            {locationSuccess}
          </Alert>
        ) : null}
        <Stack spacing={2} sx={{ mt: 3 }}>
          {account?.type !== "Organization" ? (
            <Autocomplete
              options={locationCreationMinistries}
              value={selectedCreationMinistry}
              onChange={(_, value) =>
                updateLocationForm({ owner_id: value?.owner_id || "" })
              }
              getOptionLabel={(option) => option.title || "Ministry"}
              isOptionEqualToValue={(option, value) =>
                option.owner_id === value.owner_id
              }
              renderInput={(params) => (
                <TextField {...params} label="Ministry" required fullWidth />
              )}
              fullWidth
            />
          ) : null}
          <TextField
            label={`${term("location")} Name`}
            value={locationForm.title}
            onChange={(event) =>
              updateLocationForm({ title: event.target.value })
            }
            required
            fullWidth
          />
          <TextField
            select
            label={`${term("location")} Type`}
            value={locationForm.type}
            onChange={(event) =>
              updateLocationForm({ type: event.target.value })
            }
            fullWidth
          >
            {["Branch", "Office"].map((option) => (
              <MenuItem key={option} value={option}>
                {option === "Branch" ? term("branches").replace(/es$/i, "") : option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            value={locationForm.description}
            onChange={(event) =>
              updateLocationForm({ description: event.target.value })
            }
            multiline
            minRows={3}
            fullWidth
          />
          <GeoFields
            country={locationForm.country}
            district={locationForm.district}
            city={locationForm.city}
            showCity={false}
            onChange={updateLocationForm}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <CityField
              country={locationForm.country}
              district={locationForm.district}
              city={locationForm.city}
              onChange={updateLocationForm}
            />
            <TextField
              label="Address"
              value={locationForm.address}
              onChange={(event) =>
                updateLocationForm({ address: event.target.value })
              }
              fullWidth
            />
          </Stack>
          <EmailField
            label="Email"
            value={locationForm.email}
            onValueChange={(value) => updateLocationForm({ email: value })}
            fullWidth
          />
          <InternationalPhoneField
            label="Phone Number"
            country={locationForm.country}
            value={locationForm.phone_number}
            onValueChange={(value) =>
              updateLocationForm({ phone_number: value })
            }
            fullWidth
          />
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLocationDrawerOpen(false)}
              disabled={savingLocation}
              fullWidth
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={savingLocation}
              fullWidth
            >
              {savingLocation ? (
                <>
                  <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );

  if (!locationId) {
    if (locationsListFetching) {
      return (
        <Box sx={{ display: "grid", minHeight: 400, placeItems: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
    return (
      <>
        <Grid container spacing={2.5}>
          <Grid
            size={{ xs: 12, md: 4, lg: 3 }}
            sx={{ order: { xs: 2, md: 1 } }}
          >
            {locationsCard}
          </Grid>
          <Grid
            size={{ xs: 12, md: 8, lg: 9 }}
            sx={{ order: { xs: 1, md: 2 } }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, sm: 4 },
                minHeight: 260,
                display: "grid",
                placeItems: "center",
              }}
            >
              <EmptyState
                title="Select a location"
                message="Choose a location from the list to open its details, members, CashBooks, schedules, and reports."
              />
            </Paper>
          </Grid>
        </Grid>
        {createLocationDrawer}
      </>
    );
  }

  if (!location) {
    return <LoadingOrError error={error} />;
  }

  const canCreateForActiveTab = (() => {
    const createActionTab =
      activeTab === 1
        ? membershipView === "zones"
          ? 6
          : membershipView === "missionalFamilies"
            ? 7
            : membershipView === "branches"
              ? 9
              : 1
        : activeTab;
    if (canManageLocationActionTab(createActionTab)) {
      return true;
    }
    if (activeTab === 1) {
      return (
        hasScopedLeadershipRole &&
        ["members", "missionalFamilies"].includes(membershipView)
      );
    }
    if (activeTab === 3) {
      return hasScopedLeadershipRole && attendanceSubTab === 1;
    }
    return false;
  })();
  const activeTabCreateLabel =
    activeTab === 15
      ? "Add Particular"
      : activeTab === 16
        ? "Add Remission"
        : locationTabActions[activeTab];
  const openActiveTabCreate = () => {
    if (activeTab === 15) {
      openLocationParticularDrawer();
      return;
    }
    if (activeTab === 16) {
      openLocationRemissionDrawer();
      return;
    }
    openActionDrawer(activeTab);
  };
  const submitLoadingActive =
    savingLocation ||
    requisitionSaving ||
    subscriptionSaving ||
    reportSettingsSaving ||
    forwardReportSaving ||
    reportDeleteSaving ||
    reportSaving ||
    financialReportSaving ||
    actionSaving ||
    activeRoleSaving ||
    remissionSaving ||
    zoneEditSaving ||
    familyMemberSaving ||
    familyEditSaving;
  const showRelatedLoadingOverlay =
    Boolean(location) && relatedLoading && !submitLoadingActive;
  const canEditLocation = isLocationManagerForUi;
  const canDeleteLocation = isLocationOwner;
  const ministryHasOtherHq = ministryLocations.some(
    (item) => Boolean(item.is_hq) && !idsEqual(item.id, location.id),
  );
  const subscriptionManagerOptions = [
    location,
    ...ministryLocations,
    ...branches,
  ].filter(
    (item, index, items) =>
      items.findIndex((candidate) => idsEqual(candidate.id, item.id)) === index,
  );
  const saveLocationSubscription = async () => {
    if (!account || !location || !subscriptionForm.subscription_id) {
      setSubscriptionError("Select a package before saving.");
      return;
    }
    setSubscriptionSaving(true);
    setSubscriptionError("");
    try {
      await api.post(`/locations/${location.id}/subscription`, {
        requester_id: account.id,
        ...subscriptionForm,
        managed_by_location_id:
          subscriptionForm.managed_by_location_id || location.id,
        start_date: subscriptionForm.start_date || null,
        renewal_date: subscriptionForm.renewal_date || null,
      });
      await loadRelatedRecords();
    } catch (requestError) {
      setSubscriptionError(
        getApiErrorMessage(requestError, "Failed to save subscription"),
      );
    } finally {
      setSubscriptionSaving(false);
    }
  };
  const incomeLocationParticulars = locationParticulars.filter(
    (particular) =>
      idsEqual(particular.location_id, location.id) &&
      (particular.category || "").trim().toLowerCase() === "income",
  );
  const expenseLocationParticulars = locationParticulars.filter(
    (particular) =>
      idsEqual(particular.location_id, location.id) &&
      (particular.category || "").trim().toLowerCase() === "expense",
  );
  const filteredLocationParticulars = locationParticulars.filter(
    (particular) => {
      const searchValue = locationParticularSearch.trim().toLowerCase();
      if (!searchValue) {
        return true;
      }
      return [particular.title, particular.category, particular.type].some(
        (value) =>
          String(value || "")
            .toLowerCase()
            .includes(searchValue),
      );
    },
  );
  const reportReceiverOptions = [
    location,
    ...ministryLocations,
    ...(overview?.owned.locations || []),
    ...(overview?.assigned.locations || []),
    ...branches,
    ...systemLocations,
  ]
    .filter((item): item is Location => Boolean(item))
    .filter(
      (item, index, items) =>
        !idsEqual(item.id, location.id) &&
        items.findIndex((candidate) => idsEqual(candidate.id, item.id)) ===
          index,
    );
  const automaticReportReceiver = (() => {
    if (location.is_hq) {
      return null;
    }
    if (location.parent_location_id) {
      return (
        ministryLocations.find((item) =>
          idsEqual(item.id, location.parent_location_id),
        ) ||
        reportReceiverOptions.find((item) =>
          idsEqual(item.id, location.parent_location_id),
        ) ||
        null
      );
    }
    return (
      ministryLocations.find(
        (item) => Boolean(item.is_hq) && !idsEqual(item.id, location.id),
      ) || null
    );
  })();
  const selectedFinancialReportReceiver =
    reportReceiverOptions.find((item) =>
      idsEqual(item.id, financialReportEditForm.receiver_location_id),
    ) || null;
  const reportScheduleLabels = (report: LocationReport) =>
    (report.schedules || "")
      .split(",")
      .filter(Boolean)
      .map((scheduleId) =>
        scheduleOptionLabel(
          schedules.find((schedule) => schedule.id === scheduleId) ||
            ({ id: scheduleId } as Schedule),
        ),
      );
  const reportRemissionLabel = (report: LocationReport) => {
    const remission = locationRemissions.find((item) =>
      idsEqual(item.id, report.remission_id),
    );
    return remission
      ? `${remission.title || `Remission #${remission.id}`} (${Number(remission.percentage || 0)}%)`
      : "Not set";
  };
  const reportParticularLabel = (report: LocationReport) => {
    const particular = locationParticulars.find((item) =>
      idsEqual(item.particular_id, report.particular_id),
    );
    return (
      particular?.title ||
      (report.particular_id ? `Particular #${report.particular_id}` : "Not set")
    );
  };
  const reportScheduleTypes = (report: LocationReport) =>
    Array.from(
      new Set(
        (report.schedules || "")
          .split(",")
          .filter(Boolean)
          .map(
            (scheduleId) =>
              schedules.find((schedule) => schedule.id === scheduleId)?.type,
          )
          .filter(Boolean) as string[],
      ),
    );
  const dynamicScheduleTypeOptions = Array.from(
    new Set([
      ...scheduleTypes,
      ...(schedules
        .map((schedule) => schedule.type)
        .filter(Boolean) as string[]),
      ...ministryLocations.flatMap((item) =>
        (item.mandatory_report_schedule_types || "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
      ),
      ...reportSettingsForm.mandatory_report_schedule_types,
    ]),
  ).sort((left, right) =>
    left.localeCompare(right, undefined, { sensitivity: "base" }),
  );
  const forwardedReportScheduleIds = (value?: string | null) =>
    new Set((value || "").split(",").filter(Boolean));
  const reportCardScheduleIds = (reportCard: AggregatedReportCard) =>
    new Set(
      reportCard.reports.flatMap((report) =>
        (report.schedules || "").split(",").filter(Boolean),
      ),
    );
  const sameScheduleSet = (left: Set<string>, right: Set<string>) =>
    left.size === right.size &&
    Array.from(left).every((scheduleId) => right.has(scheduleId));
  const forwardedReportMatchesCardSchedules = (
    report: ForwardedLocationReport,
    reportCard: AggregatedReportCard,
  ) => {
    const forwardedScheduleIds = forwardedReportScheduleIds(report.shedules_id);
    const cardScheduleIds = reportCardScheduleIds(reportCard);
    return forwardedScheduleIds.size
      ? sameScheduleSet(forwardedScheduleIds, cardScheduleIds)
      : true;
  };
  const matchingForwardedReport = (reportCard: AggregatedReportCard) => {
    return forwardedReports.find(
      (report) =>
        (report.status === "Pending" || report.status === "Approved") &&
        idsEqual(report.source_location_id, location.id) &&
        report.date === reportCard.scheduleDate &&
        forwardedReportMatchesCardSchedules(report, reportCard),
    );
  };
  const hasForwardedReport = (reportCard: AggregatedReportCard) =>
    Boolean(matchingForwardedReport(reportCard));
  const parseForwardedDetails = (report: ForwardedLocationReport) => {
    try {
      return report.report_details
        ? (JSON.parse(report.report_details) as Partial<AggregatedReportCard>)
        : {};
    } catch {
      return {};
    }
  };
  const financialReportTransactions = (
    report: LocationReport,
    scheduleDate: string,
  ) => {
    const reportScheduleIds = new Set(
      (report.schedules || "").split(",").filter(Boolean),
    );
    return locationTransactions.filter(
      (transaction) =>
        Boolean(transaction.transaction_id) &&
        Boolean(transaction.particular_id) &&
        idsEqual(transaction.particular_id, report.particular_id) &&
        Boolean(transaction.schedule_id) &&
        reportScheduleIds.has(transaction.schedule_id!) &&
        transactionMatchesReportScheduleDate(transaction, scheduleDate),
    );
  };
  const aggregatedReportCards: AggregatedReportCard[] = Object.entries(
    locationReports.reduce<Record<string, LocationReport[]>>(
      (groups, report) => {
        const scheduleTypes = reportScheduleTypes(report);
        const key = [
          report.schedule_date || "No schedule date",
          scheduleTypes.join(", ") || "No schedule type",
        ].join("__");
        groups[key] = [...(groups[key] || []), report];
        return groups;
      },
      {},
    ),
  )
    .sort(([left], [right]) => {
      if (left === "unknown" && right === "unknown") {
        return 0;
      }
      if (left === "unknown") {
        return 1;
      }
      if (right === "unknown") {
        return -1;
      }
      return right.localeCompare(left);
    })
    .map(([scheduleDate, reports]) => {
      const attendanceTotal = reports
        .filter((report) => report.type === "Attendance")
        .reduce((total, report) => total + Number(report.value || 0), 0);
      const cardScheduleDate = scheduleDate.split("__")[0];
      const particulars = Object.entries(
        reports
          .filter((report) => report.type === "Financial")
          .reduce<
            Record<
              string,
              {
                label: string;
                transactionIds: Set<string>;
                value: number;
                scheduleIds: Set<string>;
              }
            >
          >((items, report) => {
            const key = report.particular_id || "no-particular";
            const current = items[key] || {
              label: reportParticularLabel(report),
              transactionIds: new Set<string>(),
              value: 0,
              scheduleIds: new Set<string>(),
            };
            financialReportTransactions(report, cardScheduleDate).forEach(
              (transaction) => {
                if (
                  transaction.transaction_id &&
                  !current.transactionIds.has(transaction.transaction_id)
                ) {
                  current.transactionIds.add(transaction.transaction_id);
                  current.value += Number(transaction.amount || 0);
                }
              },
            );
            (report.schedules || "")
              .split(",")
              .filter(Boolean)
              .forEach((scheduleId) => current.scheduleIds.add(scheduleId));
            items[key] = current;
            return items;
          }, {}),
      ).map(([key, item]) => ({
        key,
        label: item.label,
        value: item.value,
        scheduleIds: item.scheduleIds,
      }));
      const remissions = Object.entries(
        reports
          .filter(
            (report) =>
              report.type === "Financial" &&
              (report.remission_id || Number(report.remission_value || 0) > 0),
          )
          .reduce<Record<string, { label: string; value: number }>>(
            (items, report) => {
              const key = report.remission_id || "no-remission";
              const current = items[key] || {
                label: reportRemissionLabel(report),
                value: 0,
              };
              current.value += Number(report.remission_value || 0);
              items[key] = current;
              return items;
            },
            {},
          ),
      ).map(([key, item]) => ({ key, ...item }));
      const scheduleLabels = Array.from(
        new Set(reports.flatMap((report) => reportScheduleLabels(report))),
      );
      const scheduleTypes = Array.from(
        new Set(reports.flatMap((report) => reportScheduleTypes(report))),
      );
      const attendanceScheduleCount = new Set(
        reports
          .filter((report) => report.type === "Attendance")
          .flatMap((report) =>
            (report.schedules || "").split(",").filter(Boolean),
          ),
      ).size;
      const scheduleIds = new Set(
        reports.flatMap((report) =>
          (report.schedules || "").split(",").filter(Boolean),
        ),
      );
      const includedCollectionTransactionIds = new Set(
        reports
          .filter((report) => report.type === "Financial")
          .flatMap((report) =>
            financialReportTransactions(report, cardScheduleDate).map(
              (transaction) => transaction.transaction_id,
            ),
          )
          .filter(Boolean) as string[],
      );
      const collectionParticularCount = includedCollectionTransactionIds.size;
      const eligibleCollectionTransactions = locationTransactions.filter(
        (transaction) =>
          Boolean(transaction.particular_id) &&
          Boolean(transaction.schedule_id) &&
          scheduleIds.has(transaction.schedule_id!) &&
          transactionMatchesReportScheduleDate(transaction, cardScheduleDate),
      );
      const collectionTotalCount = eligibleCollectionTransactions.length;
      const missingCollectionScheduleCount = Array.from(scheduleIds).filter(
        (scheduleId) =>
          attendances.some(
            (attendance) =>
              attendance.schedule_id === scheduleId &&
              attendance.date === cardScheduleDate,
          ) &&
          !eligibleCollectionTransactions.some(
            (transaction) => transaction.schedule_id === scheduleId,
          ),
      ).length;
      const scheduleSummaries = Array.from(scheduleIds).map((scheduleId) => {
        const schedule =
          schedules.find((item) => item.id === scheduleId) ||
          ({ id: scheduleId } as Schedule);
        const collectionTransactionIds = new Set(
          reports
            .filter((report) => report.type === "Financial")
            .flatMap((report) =>
              financialReportTransactions(report, cardScheduleDate),
            )
            .filter((transaction) => transaction.schedule_id === scheduleId)
            .map((transaction) => transaction.transaction_id)
            .filter(Boolean) as string[],
        );
        return {
          id: scheduleId,
          label: scheduleOptionLabel(schedule),
          collectionCount: collectionTransactionIds.size,
        };
      });
      const particularsTotal = particulars.reduce(
        (total, particular) => total + particular.value,
        0,
      );
      const remissionsTotal = remissions.reduce(
        (total, remission) => total + remission.value,
        0,
      );
      const forwardedMatch = forwardedReports.find(
        (report) =>
          (report.status === "Pending" || report.status === "Approved") &&
          idsEqual(report.source_location_id, location.id) &&
          report.date === cardScheduleDate &&
          (forwardedReportScheduleIds(report.shedules_id).size
            ? sameScheduleSet(
                forwardedReportScheduleIds(report.shedules_id),
                scheduleIds,
              )
            : true),
      );
      return {
        scheduleDate: cardScheduleDate,
        title: reports[0]?.title || reportTitleForDate(cardScheduleDate),
        scheduleTypes,
        reports,
        proofAttachment: forwardedMatch?.screenshop_attachment || null,
        status: forwardedMatch?.status || null,
        attendanceTotal,
        attendanceScheduleCount,
        particulars,
        particularsTotal,
        collectionParticularCount,
        collectionTotalCount,
        missingCollectionScheduleCount,
        remissions,
        remissionsTotal,
        scheduleLabels,
        scheduleSummaries,
      };
    });
  const forwardedReportsToCards = (
    reports: ForwardedLocationReport[],
  ): AggregatedReportCard[] =>
    reports.map((report) => {
      const details = parseForwardedDetails(report);
      const particulars = Array.isArray(details.particulars)
        ? details.particulars.map((item: any, index: number) => ({
            key: String(item.key || index),
            label: String(item.label || "Collection"),
            value: Number(item.value || 0),
            scheduleIds: new Set<string>(item.scheduleIds || []),
          }))
        : (report.financial_particulars || "")
            .split(",")
            .filter(Boolean)
            .map((label, index) => ({
              key: `${report.id}-particular-${index}`,
              label: label.trim(),
              value: 0,
              scheduleIds: new Set<string>(),
            }));
      const remissions = Array.isArray(details.remissions)
        ? details.remissions.map((item: any, index: number) => ({
            key: String(item.key || index),
            label: String(item.label || "Remission"),
            value: Number(item.value || 0),
          }))
        : (report.remissions || "")
            .split(",")
            .filter(Boolean)
            .map((label, index) => ({
              key: `${report.id}-remission-${index}`,
              label: label.trim(),
              value: 0,
            }));
      const scheduleLabels = (report.schedule_labels || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const scheduleSummaries = Array.isArray(
        (details as any).scheduleSummaries,
      )
        ? (details as any).scheduleSummaries.map(
            (item: any, index: number) => ({
              id: String(item.id || `${report.id}-schedule-${index}`),
              label: String(item.label || `Schedule #${index + 1}`),
              collectionCount: Number(item.collectionCount || 0),
            }),
          )
        : scheduleLabels.map((label, index) => ({
            id: `${report.id}-schedule-${index}`,
            label,
            collectionCount: 0,
          }));
      return {
        scheduleDate: report.date || "No schedule date",
        title: report.date
          ? reportTitleForDate(report.date)
          : "Forwarded Report",
        scheduleTypes: (report.schedule_types || report.report_type || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        reports: [],
        proofAttachment: report.screenshop_attachment,
        sourceTitle: report.source_location_title,
        status: report.status,
        forwardedReport: report,
        attendanceTotal: Number(
          report.total_attendance || details.attendanceTotal || 0,
        ),
        attendanceScheduleCount: Number(
          report.attendance_schedule_count ||
            details.attendanceScheduleCount ||
            0,
        ),
        particulars,
        particularsTotal: Number(
          report.financial_particulars_value ?? details.particularsTotal ?? 0,
        ),
        collectionParticularCount: Number(
          report.financial_particulars_count ||
            details.collectionParticularCount ||
            particulars.length,
        ),
        collectionTotalCount: Number(
          details.collectionTotalCount ||
            report.financial_particulars_count ||
            details.collectionParticularCount ||
            particulars.length,
        ),
        missingCollectionScheduleCount: Number(
          details.missingCollectionScheduleCount || 0,
        ),
        remissions,
        remissionsTotal: Number(
          report.remissions_value || details.remissionsTotal || 0,
        ),
        scheduleLabels,
        scheduleSummaries,
      };
    });
  const receivedReportCards = forwardedReportsToCards(receivedReports);
  const localSavedReportCards = forwardedReportsToCards(forwardedReports);
  const localDraftReportCards = aggregatedReportCards
    .filter((card) => !hasForwardedReport(card))
    .map((card) => ({ ...card, sourceTitle: location.title || "Location" }));
  const localReportCards = [...localSavedReportCards, ...localDraftReportCards];
  const allMinistryReportCards: AggregatedReportCard[] = [
    ...localSavedReportCards,
    ...receivedReportCards.filter(
      (card) =>
        !idsEqual(card.forwardedReport?.source_location_id, location.id),
    ),
  ];
  const activeReportCards: AggregatedReportCard[] =
    selectedReportMenu === "Local"
      ? localReportCards
      : selectedReportMenu === allMinistryReportsMenuOption
        ? allMinistryReportCards
        : selectedReportMenu === receivedReportMenuOption
          ? receivedReportCards
          : [];
  const filteredReportCards = activeReportCards
    .filter((card) => {
      const searchValue = reportFilters.locationSearch.trim().toLowerCase();
      const sourceTitle = String(
        card.sourceTitle || location.title || "",
      ).toLowerCase();
      if (searchValue && !sourceTitle.includes(searchValue)) {
        return false;
      }
      if (
        reportFilters.startDate &&
        card.scheduleDate < reportFilters.startDate
      ) {
        return false;
      }
      if (reportFilters.endDate && card.scheduleDate > reportFilters.endDate) {
        return false;
      }
      return true;
    })
    .sort((left, right) => {
      const leftDate = left.scheduleDate || "";
      const rightDate = right.scheduleDate || "";
      if (!leftDate && !rightDate) {
        return 0;
      }
      if (!leftDate) {
        return 1;
      }
      if (!rightDate) {
        return -1;
      }
      return rightDate.localeCompare(leftDate);
    });
  const receivedReportSenderLocations = [
    ...branches,
    ...ministryLocations.filter(
      (item) =>
        idsEqual(item.parent_location_id, location.id) ||
        (Boolean(location.is_hq) &&
          !item.parent_location_id &&
          !idsEqual(item.id, location.id)),
    ),
  ].filter(
    (item, index, items) =>
      items.findIndex((candidate) => idsEqual(candidate.id, item.id)) ===
        index &&
      (!reportFilters.locationSearch.trim() ||
        String(item.title || "")
          .toLowerCase()
          .includes(reportFilters.locationSearch.trim().toLowerCase())),
  );
  const activeReportSenderLocations =
    selectedReportMenu === "Local"
      ? [location]
      : selectedReportMenu === allMinistryReportsMenuOption
        ? ministryLocations
        : selectedReportMenu === receivedReportMenuOption
          ? receivedReportSenderLocations
          : [];
  const forwardedStatCards =
    selectedReportMenu === "Local"
      ? localReportCards
      : selectedReportMenu === allMinistryReportsMenuOption
        ? allMinistryReportCards
        : selectedReportMenu === receivedReportMenuOption
          ? receivedReportCards
          : [];
  const filteredForwardedStatCards = forwardedStatCards.filter((card) => {
    const searchValue = reportFilters.locationSearch.trim().toLowerCase();
    const sourceTitle = String(
      card.sourceTitle || location.title || "",
    ).toLowerCase();
    if (searchValue && !sourceTitle.includes(searchValue)) {
      return false;
    }
    if (
      reportFilters.startDate &&
      card.scheduleDate < reportFilters.startDate
    ) {
      return false;
    }
    if (reportFilters.endDate && card.scheduleDate > reportFilters.endDate) {
      return false;
    }
    return true;
  });
  const formatScheduleDateRange = (values: string[]) => {
    const dates = Array.from(
      new Set(
        values.filter(
          (value) =>
            value && value !== "No schedule date" && dayjs(value).isValid(),
        ),
      ),
    ).sort((left, right) => left.localeCompare(right));
    if (!dates.length) {
      return "No report";
    }
    const firstDate = dayjs(dates[0]);
    const lastDate = dayjs(dates[dates.length - 1]);
    if (dates.length === 1 || firstDate.isSame(lastDate, "day")) {
      return firstDate.format("D MMMM YYYY");
    }
    if (firstDate.isSame(lastDate, "year")) {
      return `${firstDate.format("D MMMM")} - ${lastDate.format("D MMMM YYYY")}`;
    }
    return `${firstDate.format("D MMMM YYYY")} - ${lastDate.format("D MMMM YYYY")}`;
  };
  const reportCardScheduleDateRange = (reportCard: AggregatedReportCard) =>
    formatScheduleDateRange([
      reportCard.scheduleDate,
      ...reportCard.reports.map((report) => report.schedule_date || ""),
    ]);
  const reportCardsScheduleDateRange = (reportCards: AggregatedReportCard[]) =>
    formatScheduleDateRange(reportCards.map((card) => card.scheduleDate));
  const reportCardsWeekCount = (reportCards: AggregatedReportCard[]) => {
    const dates = reportCards
      .map((card) => card.scheduleDate)
      .filter(
        (value) =>
          value && value !== "No schedule date" && dayjs(value).isValid(),
      )
      .sort((left, right) => left.localeCompare(right));
    if (!dates.length) {
      return 1;
    }
    const rangeStart =
      reportFilters.startDate && dayjs(reportFilters.startDate).isValid()
        ? reportFilters.startDate
        : dates[0];
    const rangeEnd =
      reportFilters.endDate && dayjs(reportFilters.endDate).isValid()
        ? reportFilters.endDate
        : dates[dates.length - 1];
    const days = Math.max(
      dayjs(rangeEnd).diff(dayjs(rangeStart), "day") + 1,
      1,
    );
    return Math.max(Math.ceil(days / 7), 1);
  };
  const mandatoryTypesForLocation = (sender: Location) => {
    const ministryScope = [location, ...ministryLocations];
    const hqLocation =
      ministryScope.find(
        (item) =>
          Boolean(item.is_hq) &&
          (idsEqual(item.owner_id, sender.owner_id) ||
            idsEqual(item.id, sender.owner_id)),
      ) || ministryScope.find((item) => Boolean(item.is_hq));
    const mandatoryTypes = (hqLocation?.mandatory_report_schedule_types || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    return mandatoryTypes.length
      ? mandatoryTypes
      : defaultMandatoryReportScheduleTypes;
  };
  const reportWindowScheduleDates = (sender: Location) => {
    const mandatoryTypes = mandatoryTypesForLocation(sender);
    const allSchedules = ministrySchedules.length
      ? ministrySchedules
      : schedules;
    const senderSchedules = allSchedules.filter(
      (schedule) =>
        idsEqual(schedule.location_id, sender.id) &&
        mandatoryTypes.includes(schedule.type || ""),
    );
    return Array.from(
      new Set(
        senderSchedules.flatMap((schedule) =>
          occurrenceDates(schedule, dayjs(), sender.reporting_start_date)
            .filter((date) => !date.isAfter(dayjs(), "day"))
            .map((date) => date.format("YYYY-MM-DD")),
        ),
      ),
    )
      .sort((left, right) => right.localeCompare(left))
      .slice(0, 5);
  };
  const openPendingReportDetails = async (sender: Location) => {
    if (!location?.owner_id) {
      return;
    }
    const locationIdValue = sender.id;
    const locationTitle = sender.title || `Location #${sender.id}`;
    const cachedPending = pendingReportDetailsByLocation[locationIdValue];
    setPendingReportDetailsDialog({
      locationId: locationIdValue,
      locationTitle,
      pending: cachedPending || [],
      loading: !cachedPending,
    });
    if (cachedPending) {
      return;
    }
    try {
      const params = new URLSearchParams({
        owner_id: location.owner_id,
        location_id: locationIdValue,
      });
      const response = await api.get<PendingReportSummary>(
        `/location-pending-report-details?${params.toString()}`,
      );
      const pending = response.data.pending || [];
      setPendingReportDetailsByLocation((current) => ({
        ...current,
        [locationIdValue]: pending,
      }));
      setPendingReportCounts((current) => ({
        ...current,
        [locationIdValue]: {
          count: response.data.count,
          pending,
        },
      }));
      setPendingReportDetailsDialog((current) =>
        current?.locationId === locationIdValue
          ? {
              locationId: locationIdValue,
              locationTitle,
              pending,
              loading: false,
            }
          : current,
      );
    } catch (requestError) {
      const message = getApiErrorMessage(
        requestError,
        "Failed to load pending report schedules",
      );
      setFeedback({ severity: "error", message });
      setPendingReportDetailsDialog((current) =>
        current?.locationId === locationIdValue
          ? { ...current, loading: false }
          : current,
      );
    }
  };
  const receivedReportLocationStats = activeReportSenderLocations.map(
    (sender) => {
      const defaultScheduleDates = reportWindowScheduleDates(sender);
      const defaultScheduleDateSet = new Set(defaultScheduleDates);
      const hasManualDateFilter = Boolean(
        reportFilters.startDate || reportFilters.endDate,
      );
      const reportingStartDate =
        sender.reporting_start_date &&
        dayjs(sender.reporting_start_date).isValid()
          ? dayjs(sender.reporting_start_date).format("YYYY-MM-DD")
          : "";
      const reports = filteredForwardedStatCards
        .filter(
          (card) =>
            idsEqual(
              card.forwardedReport?.source_location_id ||
                (card.sourceTitle === sender.title ? sender.id : ""),
              sender.id,
            ) ||
            (selectedReportMenu === "Local" &&
              idsEqual(sender.id, location.id)),
        )
        .filter(
          (card) =>
            !reportingStartDate || card.scheduleDate >= reportingStartDate,
        )
        .filter(
          (card) =>
            hasManualDateFilter ||
            !defaultScheduleDateSet.size ||
            defaultScheduleDateSet.has(card.scheduleDate),
        );
      const approved = reports.filter(
        (card) => card.status === "Approved",
      ).length;
      const pending = reports.filter(
        (card) => card.status === "Pending",
      ).length;
      const attendance = reports.reduce(
        (total, card) => total + card.attendanceTotal,
        0,
      );
      const collections = reports.reduce(
        (total, card) => total + card.particularsTotal,
        0,
      );
      const remissions = reports.reduce(
        (total, card) => total + card.remissionsTotal,
        0,
      );
      const weekCount = reportCardsWeekCount(reports);
      const averageAttendance = attendance / weekCount;
      const averageCollections = collections / weekCount;
      const averageRemissions = remissions / weekCount;
      const pendingReportSummary = pendingReportCounts[sender.id];
      const pendingReportDetails =
        pendingReportDetailsByLocation[sender.id] ||
        pendingReportSummary?.pending ||
        [];
      const pendingReports =
        pendingReportSummary?.count ?? (pendingReportCountLoading ? "..." : 0);
      const hasPendingReports =
        typeof pendingReports === "number" && pendingReports > 0;
      const scheduleDateRange = hasManualDateFilter
        ? reportCardsScheduleDateRange(reports)
        : formatScheduleDateRange(defaultScheduleDates);
      return {
        location: sender,
        reports: reports.length,
        approved,
        pending,
        pendingReports,
        hasPendingReports,
        pendingReportDetails,
        attendance,
        collections,
        remissions,
        averageAttendance,
        averageCollections,
        averageRemissions,
        weekCount,
        scheduleDateRange,
      };
    },
  );
  const recentReceivedReportDates = Array.from(
    new Set(
      filteredReportCards.map((card) => card.scheduleDate).filter(Boolean),
    ),
  )
    .sort((left, right) => right.localeCompare(left))
    .slice(0, 5);
  const receivedReportCollectionColumns = Array.from(
    new Set(
      filteredReportCards
        .filter((card) => recentReceivedReportDates.includes(card.scheduleDate))
        .flatMap((card) =>
          card.particulars
            .map((particular) => particular.label.trim())
            .filter(Boolean),
        ),
    ),
  ).sort((left, right) =>
    left.localeCompare(right, undefined, { sensitivity: "base" }),
  );
  const receivedReportRemissionColumns = Array.from(
    new Set(
      filteredReportCards
        .filter((card) => recentReceivedReportDates.includes(card.scheduleDate))
        .flatMap((card) =>
          card.remissions
            .map((remission) => remission.label.trim())
            .filter(Boolean),
        ),
    ),
  ).sort((left, right) =>
    left.localeCompare(right, undefined, { sensitivity: "base" }),
  );
  const receivedReportPdfRows = filteredReportCards
    .filter((card) => recentReceivedReportDates.includes(card.scheduleDate))
    .sort(
      (left, right) =>
        right.scheduleDate.localeCompare(left.scheduleDate) ||
        (left.sourceTitle || "").localeCompare(right.sourceTitle || ""),
    )
    .map((card, index) => ({
      no: index + 1,
      location: card.sourceTitle || "Location",
      scheduleDate: card.scheduleDate,
      schedule:
        card.scheduleLabels.join(", ") ||
        card.scheduleTypes.join(", ") ||
        "Not set",
      attendance: card.attendanceTotal,
      collections: card.particulars.reduce<Record<string, number>>(
        (items, particular) => {
          const label = particular.label.trim();
          if (label) {
            items[label] = (items[label] || 0) + particular.value;
          }
          return items;
        },
        {},
      ),
      remissions: card.remissions.reduce<Record<string, number>>(
        (items, remission) => {
          const label = remission.label.trim();
          if (label) {
            items[label] = (items[label] || 0) + remission.value;
          }
          return items;
        },
        {},
      ),
      status: card.status || "Pending",
    }));
  const activeReportsTitle =
    selectedReportMenu === "Local"
      ? `${location.title || "Location"} Reports`
      : selectedReportMenu === allMinistryReportsMenuOption
        ? "All Ministry Reports"
        : selectedReportMenu === receivedReportMenuOption
          ? "Received Reports"
          : "Reports";
  const receivedReportsPdfTitle = [
    location.title || "Location",
    activeReportsTitle,
  ]
    .filter(Boolean)
    .join(" - ");
  const receivedReportsPdfFileName = pdfFileName(receivedReportsPdfTitle);
  const exportReceivedReportsExcel = () => {
    const workbook = createReceivedReportsWorkbook({
      title: receivedReportsPdfTitle,
      collectionColumns: receivedReportCollectionColumns,
      remissionColumns: receivedReportRemissionColumns,
      rows: receivedReportPdfRows,
    });
    const blob = new Blob([workbook], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeExportFileName(receivedReportsPdfTitle)}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const activeReportsView =
    selectedReportMenu === allMinistryReportsMenuOption
      ? "report"
      : reportsView;
  const forwardReceivingLocationLabel = idsEqual(
    forwardTargetLocationId,
    location.id,
  )
    ? location.is_hq && !automaticReportReceiver
      ? "None"
      : location.title || "This location"
    : automaticReportReceiver?.title || "No report receiver set";
  const isHqSelfSaveWithoutReceiver = Boolean(
    location.is_hq &&
    !automaticReportReceiver &&
    idsEqual(forwardTargetLocationId, location.id),
  );
  const ScheduleCountBadge = ({ count }: { count: number }) => (
    <Chip
      size="small"
      color="secondary"
      label={count}
      sx={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        "& .MuiChip-label": { px: 0, fontSize: "0.75rem", fontWeight: 800 },
      }}
    />
  );
  const LocationReportStatListItem = ({
    icon,
    label,
    value,
  }: {
    icon: ReactNode;
    label: string;
    value: number | string;
  }) => (
    <ListItem
      disableGutters
      secondaryAction={
        <Typography variant="body2">
          {typeof value === "number"
            ? value.toLocaleString(undefined, { maximumFractionDigits: 1 })
            : value}
        </Typography>
      }
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        py: 0.75,
        "&:last-of-type": { borderBottom: 0 },
      }}
    >
      <ListItemIcon sx={{ minWidth: 30 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        slotProps={{ primary: { variant: "body2" } }}
        sx={{ pr: 4 }}
      />
    </ListItem>
  );
  const ReportListItem = ({
    label,
    value,
    divider = true,
  }: {
    label: string;
    value?: string | number;
    divider?: boolean;
  }) => (
    <ListItem
      disableGutters
      secondaryAction={
        value !== undefined ? (
          <Typography variant="body2">
            {typeof value === "number" ? value.toLocaleString() : value}
          </Typography>
        ) : undefined
      }
      sx={{
        borderBottom: divider ? 1 : 0,
        borderColor: "divider",
        py: 0.6,
      }}
    >
      <ListItemIcon sx={{ minWidth: 30 }}>
        <CheckCircleIcon color="secondary" fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={label}
        slotProps={{ primary: { variant: "body2" } }}
        sx={{ pr: value !== undefined ? 4 : 0 }}
      />
    </ListItem>
  );
  const ReportCard = ({
    reportCard,
    action,
    menuAction,
    proofMeta,
  }: {
    reportCard: AggregatedReportCard;
    action?: ReactNode;
    menuAction?: ReactNode;
    proofMeta?: ReactNode;
  }) => {
    const isSavedReport = Boolean(
      reportCard.forwardedReport &&
      idsEqual(
        reportCard.forwardedReport.source_location_id,
        reportCard.forwardedReport.target_location_id,
      ),
    );
    const showStatusChip = Boolean(reportCard.status && !isSavedReport);
    return (
      <Paper
        variant="outlined"
        sx={{ height: "100%", overflow: "hidden", position: "relative" }}
      >
        {menuAction ? (
          <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
            {menuAction}
          </Box>
        ) : null}
        {showStatusChip ? (
          <Chip
            size="small"
            color={reportCard.status === "Approved" ? "success" : "warning"}
            label={reportCard.status}
            sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}
          />
        ) : null}
        <Stack
          spacing={1.5}
          sx={{
            p: 2,
            height: "100%",
            pt: showStatusChip || menuAction ? 5 : 2,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              rowGap: 0.75,
            }}
          >
            <Stack spacing={0.75}>
              <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                {reportCard.sourceTitle || location.title || "Location"}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {reportCard.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {reportCard.scheduleTypes.join(", ") || "No schedule type"}
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <GroupsIcon color="secondary" fontSize="small" />
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Attendance
              </Typography>
              <ScheduleCountBadge count={reportCard.attendanceScheduleCount} />
            </Stack>
            <List dense disablePadding>
              <ReportListItem
                label="Total"
                value={reportCard.attendanceTotal}
              />
            </List>
          </Stack>
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <AttachMoneyIcon color="secondary" fontSize="small" />
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Collections
              </Typography>
              <ScheduleCountBadge
                count={reportCard.collectionParticularCount}
              />
            </Stack>
            <List dense disablePadding>
              {reportCard.particulars.length ? (
                reportCard.particulars.map((particular) => (
                  <ReportListItem
                    key={particular.key}
                    label={particular.label}
                    value={particular.value}
                  />
                ))
              ) : (
                <ReportListItem label="No collections recorded" />
              )}
              <ReportListItem
                label="Total"
                value={reportCard.particularsTotal}
                divider={false}
              />
            </List>
          </Stack>
          <Stack spacing={0.75}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              Remissions
            </Typography>
            <List dense disablePadding>
              {reportCard.remissions.length ? (
                reportCard.remissions.map((remission) => (
                  <ReportListItem
                    key={remission.key}
                    label={remission.label}
                    value={remission.value}
                  />
                ))
              ) : (
                <ReportListItem label="No remissions recorded" />
              )}
              <ReportListItem
                label="Total"
                value={reportCard.remissionsTotal}
              />
            </List>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: "auto",
            }}
          >
            <Stack
              direction="row"
              spacing={0.75}
              sx={{ alignItems: "center", minWidth: 0 }}
            >
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<VisibilityIcon />}
                onClick={() =>
                  reportCard.proofAttachment &&
                  setProofPreview({
                    title: reportCard.title,
                    image: reportCard.proofAttachment,
                  })
                }
                disabled={!reportCard.proofAttachment}
                sx={{ flex: "0 0 auto", minWidth: "auto", px: 1.25 }}
              >
                Proof
              </Button>
              {proofMeta}
            </Stack>
            {action ? (
              <Box sx={{ flex: "0 0 auto", minWidth: 0 }}>{action}</Box>
            ) : null}
          </Stack>
        </Stack>
      </Paper>
    );
  };

  const editableLocationRoleNames = new Set([
    "Location Pastor",
    "Location Admin",
    "Viewer",
  ]);
  const editableCashbookRoleNames = new Set([
    "Cashbook Admin",
    "Cashbook Viewer",
    "Data Entrant",
  ]);
  const selectedMemberAccount = accounts.find((item) =>
    idsEqual(item.id, selectedMemberAction?.user_id),
  );
  const filteredMembers = members.filter((member) => {
    const searchValue = memberSearch.trim().toLowerCase();
    if (!searchValue) {
      return true;
    }
    const memberAccount = accounts.find((item) =>
      idsEqual(item.id, member.user_id),
    );
    return [
      memberName(accounts, member.user_id, member.user_display_name),
      member.audience,
      member.status,
      member.start_date,
      member.user_email || memberAccount?.email,
      member.user_phone_number || memberAccount?.phone_number,
      member.user_address || memberAccount?.address,
      memberAccount?.marital_status,
      memberAccount?.occupation,
      memberAccount?.gender,
      memberAccount?.country,
      memberAccount?.district,
      memberAccount?.city,
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(searchValue),
    );
  });
  const MemberInfoRow = ({
    label,
    value,
    icon,
    mobileOnly = false,
    action,
  }: {
    label: string;
    value: ReactNode;
    icon?: ReactNode;
    mobileOnly?: boolean;
    action?: ReactNode;
  }) => (
    <ListItem
      divider
      secondaryAction={action}
      sx={{
        py: 0.75,
        display: mobileOnly ? { xs: "flex", sm: "none" } : "flex",
        alignItems: "flex-start",
        pr: action ? 7 : 2,
      }}
    >
      {icon ? (
        <ListItemIcon sx={{ minWidth: 34, pt: 0.3 }}>{icon}</ListItemIcon>
      ) : null}
      <ListItemText
        primary={label}
        secondary={value}
        slotProps={{
          primary: { variant: "caption", color: "text.secondary" },
          secondary: {
            variant: "body2",
            color: "text.primary",
            sx: { overflowWrap: "anywhere" },
          },
        }}
      />
    </ListItem>
  );
  const memberCards = members.length ? (
    <Stack spacing={2}>
      <TextField
        size="small"
        label="Search members"
        value={memberSearch}
        onChange={(event) => setMemberSearch(event.target.value)}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
      {filteredMembers.length ? (
        <IncrementalGrid
          items={filteredMembers}
          resetKey={memberSearch.trim().toLowerCase()}
          gridSize={{ xs: 12, md: 6, xl: 4 }}
          getKey={(member) => member.id}
          renderItem={(member) => {
            const memberAccount = accounts.find((item) =>
              idsEqual(item.id, member.user_id),
            );
            const memberDisplayName = memberName(
              accounts,
              member.user_id,
              member.user_display_name,
            );
            const memberActionsButton = (
              <IconButton
                size="small"
                aria-label="Member actions"
                onClick={(event) => {
                  const buttonRect =
                    event.currentTarget.getBoundingClientRect();
                  setSelectedMemberAction(member);
                  setMemberActionAnchor(event.currentTarget);
                  setMemberActionPosition({
                    top: Math.round(buttonRect.bottom + 4),
                    left: Math.round(buttonRect.right),
                  });
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            );
            const rows = [
              {
                label: "Name",
                value: memberDisplayName,
                icon: <AddPersonIcon color="secondary" fontSize="small" />,
                action: memberActionsButton,
              },
              {
                label: "Email",
                value: accountDetail(
                  accounts,
                  member.user_id,
                  "email",
                  member.user_email,
                ),
                icon: <EmailIcon color="secondary" fontSize="small" />,
              },
              {
                label: "Phone",
                value: accountDetail(
                  accounts,
                  member.user_id,
                  "phone_number",
                  member.user_phone_number,
                ),
                icon: <PhoneIcon color="secondary" fontSize="small" />,
              },
              {
                label: "Address",
                value: accountDetail(
                  accounts,
                  member.user_id,
                  "address",
                  member.user_address,
                ),
                icon: <LocationOnIcon color="secondary" fontSize="small" />,
              },
            ];
            return (
              <Paper
                variant="outlined"
                sx={{ height: "100%", overflow: "hidden" }}
              >
                <Box sx={{ position: "relative", bgcolor: "action.hover" }}>
                  <Avatar
                    src={
                      member.user_profile_picture ||
                      memberAccount?.profile_picture ||
                      defaultProfilePictureAsset
                    }
                    alt={memberDisplayName}
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: 220,
                      borderRadius: 0,
                      bgcolor: "background.paper",
                      "& img": { objectFit: "cover" },
                    }}
                  />
                </Box>
                <List
                  dense
                  disablePadding
                  sx={{ borderTop: 1, borderColor: "divider" }}
                >
                  {rows.map((row) => (
                    <MemberInfoRow
                      key={row.label}
                      label={row.label}
                      value={row.value}
                      icon={row.icon}
                      action={row.action}
                    />
                  ))}
                </List>
              </Paper>
            );
          }}
        />
      ) : (
        <EmptyState
          title="No members found"
          message="Try a different name, contact, or profile detail."
        />
      )}
    </Stack>
  ) : (
    <EmptyState
      title="No members for this location yet"
      message="Registered and assigned members will appear here."
    />
  );
  const attendanceSchedulesForEditDate = schedules.filter((schedule) =>
    scheduleOccursOnDate(schedule, attendanceEditForm.date),
  );
  const mfAttendanceSchedulesForEditDate = schedules.filter((schedule) =>
    scheduleOccursOnDate(schedule, mfAttendanceEditForm.adate),
  );
  const renderAttendanceEditDay = renderScheduleAwareDay(
    schedules,
    new Set(
      attendances
        .map((attendance) => attendance.date)
        .filter(Boolean) as string[],
    ),
  );
  const renderMfAttendanceEditDay = renderScheduleAwareDay(
    schedules,
    new Set(
      mfAttendances
        .filter(
          (attendance) =>
            !mfAttendanceEditForm.sg_id ||
            attendance.sg_id === mfAttendanceEditForm.sg_id,
        )
        .map((attendance) => attendance.adate)
        .filter(Boolean) as string[],
    ),
  );
  const roleSearchValue = roleSearch.trim().toLowerCase();
  const displayRoles = (() => {
    const standardUsers = roles.filter(
      (role) => role.role === "Location Member",
    );
    const otherRoles = roles.filter((role) => role.role !== "Location Member");
    const preparedRoles = standardUsers.length
      ? [
          ...otherRoles,
          {
            ...standardUsers[0],
            id: "__owner_role__",
            user_display_name: "All Members",
            title: "All Members",
            member_count: members.length,
          },
        ]
      : otherRoles;
    if (!roleSearchValue) {
      return preparedRoles;
    }
    return preparedRoles.filter((role) => {
      const haystack = [
        role.role,
        role.title,
        role.user_display_name,
        role.cashbook_title,
        role.id === "__owner_role__"
          ? "All Members"
          : memberName(accounts, role.user_id),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(roleSearchValue);
    });
  })();
  const roleCardGroups = Array.from(
    displayRoles
      .reduce<Map<string, { roleName: string; records: Role[] }>>(
        (groups, role) => {
          const roleName = role.role || role.title || "Role";
          const existing = groups.get(roleName) || { roleName, records: [] };
          existing.records.push(role);
          groups.set(roleName, existing);
          return groups;
        },
        new Map(),
      )
      .values(),
  ).sort((left, right) => left.roleName.localeCompare(right.roleName));
  const locationAttendanceCards = Array.from(
    attendances
      .reduce<Map<string, { date: string; records: Attendance[] }>>(
        (groups, attendance) => {
          const date = attendance.date || "No schedule date";
          const existing = groups.get(date) || { date, records: [] };
          existing.records.push(attendance);
          groups.set(date, existing);
          return groups;
        },
        new Map(),
      )
      .values(),
  ).sort((left, right) => right.date.localeCompare(left.date));
  const mfAttendanceCardGroups = Array.from(
    mfAttendances
      .reduce<Map<string, { date: string; records: MfAttendance[] }>>(
        (groups, attendance) => {
          const date = attendance.adate || "No schedule date";
          const existing = groups.get(date) || {
            date,
            records: [],
          };
          existing.records.push(attendance);
          groups.set(date, existing);
          return groups;
        },
        new Map(),
      )
      .values(),
  ).sort((left, right) => right.date.localeCompare(left.date));
  const attendanceRecordActions = (attendance: Attendance) =>
    canManageLocationResources ? (
      <IconButton
        size="small"
        aria-label="Attendance actions"
        onClick={(event) => {
          event.stopPropagation();
          setSelectedAttendance(attendance);
          setSelectedMfAttendance(null);
          setAttendanceMenuAnchor(event.currentTarget);
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    ) : null;
  const mfAttendanceRecordActions = (attendance: MfAttendance) =>
    canManageLocationResources ? (
      <IconButton
        size="small"
        aria-label="Missional attendance actions"
        onClick={(event) => {
          event.stopPropagation();
          setSelectedMfAttendance(attendance);
          setSelectedAttendance(null);
          setAttendanceMenuAnchor(event.currentTarget);
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    ) : null;
  return (
    <>
      <Menu
        anchorEl={roleMenuAnchor}
        open={Boolean(roleMenuAnchor)}
        onClose={() => {
          setRoleMenuAnchor(null);
          setRoleSwitchMenuAnchor(null);
        }}
        slotProps={{
          list: { role: "menubar", "aria-labelledby": "location-tab-13" },
        }}
      >
        {isLocationManagerForUi ? (
          <MenuItem
            onClick={() => {
              setRoleMenuAnchor(null);
              setRoleSwitchMenuAnchor(null);
              setActiveTab(14);
            }}
          >
            <ListItemIcon>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            About
          </MenuItem>
        ) : null}
        {canOpenManageTab && visibleLocationTabs.includes(8) ? (
          <MenuItem
            onClick={() => {
              setActiveTab(8);
              setRoleMenuAnchor(null);
              setRoleSwitchMenuAnchor(null);
            }}
          >
            <ListItemIcon>
              <EventRepeatIcon fontSize="small" />
            </ListItemIcon>
            Schedules
          </MenuItem>
        ) : null}
        {canEditLocation && location.is_hq ? (
          <MenuItem
            onClick={() => void updateLocationHq(false)}
            disabled={activeRoleSaving}
          >
            <ListItemIcon>
              <HomeWorkIcon fontSize="small" />
            </ListItemIcon>
            Revert HQ
          </MenuItem>
        ) : canEditLocation && !ministryHasOtherHq ? (
          <MenuItem
            onClick={() => void updateLocationHq(true)}
            disabled={activeRoleSaving}
          >
            <ListItemIcon>
              <HomeWorkIcon fontSize="small" />
            </ListItemIcon>
            Set as HQ
          </MenuItem>
        ) : null}
        {isLocationManagerForUi ? (
          <MenuItem onClick={openLocationParticulars}>
            <ListItemIcon>
              <CollectionsBookmarkIcon fontSize="small" />
            </ListItemIcon>
            {term("particulars")}
          </MenuItem>
        ) : null}
        {isLocationManagerForUi ? (
          <MenuItem onClick={openLocationRemissions}>
            <ListItemIcon>
              <PaidIcon fontSize="small" />
            </ListItemIcon>
            {term("remissions")}
          </MenuItem>
        ) : null}
        {canOpenManageTab && visibleLocationTabs.includes(5) ? (
          <MenuItem
            onClick={() => {
              setActiveTab(5);
              setRoleMenuAnchor(null);
              setRoleSwitchMenuAnchor(null);
            }}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Roles
          </MenuItem>
        ) : null}
        {isLocationOwner ? (
          <MenuItem
            aria-haspopup="menu"
            aria-controls={
              roleSwitchMenuAnchor ? "location-role-submenu" : undefined
            }
            onClick={(event) => setRoleSwitchMenuAnchor(event.currentTarget)}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Switch Role
          </MenuItem>
        ) : null}
      </Menu>
      <Menu
        id="location-role-submenu"
        anchorEl={roleSwitchMenuAnchor}
        open={Boolean(roleSwitchMenuAnchor)}
        onClose={() => setRoleSwitchMenuAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          list: { role: "menu", "aria-label": "Switch active role" },
        }}
      >
        {["Location Admin", "Viewer"].map((role) => (
          <MenuItem key={role} onClick={() => handleSelectActiveRole(role)}>
            <CheckIcon
              fontSize="small"
              color={activeLocationRole === role ? "secondary" : "disabled"}
              sx={{
                mr: 1,
                visibility: activeLocationRole === role ? "visible" : "hidden",
              }}
            />
            {role}
          </MenuItem>
        ))}
      </Menu>
      <Stack
        direction="row"
        spacing={1.25}
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Tooltip title={`Switch ${term("location")}`}>
          <IconButton
            color="secondary"
            aria-label={`Switch ${term("location")}`}
            onClick={() => setLocationChooserOpen(true)}
            sx={{ border: 1, borderColor: "divider" }}
          >
            <SwapHorizIcon />
          </IconButton>
        </Tooltip>
        {canCreateLocations ? (
          <Tooltip title={`Add ${term("location")}`}>
            <IconButton
              color="primary"
              aria-label={`Add ${term("location")}`}
              onClick={openCreateLocationDrawer}
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
      <Grid container spacing={2.5} sx={{ alignItems: "stretch" }}>
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Stack spacing={2.5} sx={{ width: "100%" }}>
            {locationsCard}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }} sx={{ display: "flex" }}>
          <Paper variant="outlined" sx={{ overflow: "hidden", width: "100%" }}>
            <Box sx={{ position: "relative" }}>
              <Tabs
                ref={locationTabsRef}
                value={
                  activeTab === -1
                    ? false
                    : manageLocationContentTabs.includes(activeTab)
                      ? 13
                      : activeTab === 9
                        ? 1
                        : activeTab
                }
                onChange={(_, nextTab: number) => {
                  if (!menuBackedLocationTabs.includes(nextTab)) {
                    setActiveTab(nextTab);
                  }
                }}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  px: 1,
                  "& .MuiTab-root": {
                    fontSize: { xs: 0, sm: "0.875rem" },
                    minWidth: { xs: 48, sm: 90 },
                    px: { xs: 1, sm: 2 },
                  },
                  "& .MuiTab-root > svg": {
                    display: "inline-flex",
                  },
                  "& .MuiTab-icon, & .MuiTab-iconWrapper": {
                    display: "inline-flex",
                    mr: { xs: 0, sm: 1 },
                  },
                }}
              >
                {visibleLocationTabs.includes(10) ? (
                  <Tab
                    value={10}
                    id="location-tab-10"
                    aria-controls="location-tabpanel-10"
                    icon={<RateReviewIcon />}
                    iconPosition="start"
                    onClick={(event) => setReportMenuAnchor(event.currentTarget)}
                    label={
                      <Box
                        component="span"
                        onClick={(event) => {
                          event.stopPropagation();
                          setReportMenuAnchor(event.currentTarget);
                        }}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.4,
                        }}
                      >
                        Reports
                        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                      </Box>
                    }
                  />
                ) : null}
                {visibleLocationTabs.includes(2) ? (
                  <Tab
                    value={2}
                    id="location-tab-2"
                    aria-controls="location-tabpanel-2"
                    icon={<PaidIcon />}
                    iconPosition="start"
                    onClick={(event) => setFinanceMenuAnchor(event.currentTarget)}
                    label={
                      <Box
                        component="span"
                        onClick={(event) => {
                          event.stopPropagation();
                          setFinanceMenuAnchor(event.currentTarget);
                        }}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.4,
                        }}
                      >
                        Finances
                        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                      </Box>
                    }
                  />
                ) : null}
                {visibleLocationTabs.includes(3) ? (
                  <Tab
                    value={3}
                    id="location-tab-3"
                    aria-controls="location-tabpanel-3"
                    icon={<FormatListNumberedIcon />}
                    iconPosition="start"
                    onClick={(event) => setAttendanceTabMenuAnchor(event.currentTarget)}
                    label={
                      <Box
                        component="span"
                        onClick={(event) => {
                          event.stopPropagation();
                          setAttendanceTabMenuAnchor(event.currentTarget);
                        }}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.4,
                        }}
                      >
                        Attendances
                        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                      </Box>
                    }
                  />
                ) : null}
                {visibleLocationTabs.includes(1) ? (
                  <Tab
                    value={1}
                    id="location-tab-1"
                    aria-controls="location-tabpanel-1"
                    icon={<GroupsIcon />}
                    iconPosition="start"
                    onClick={(event) => setMembershipMenuAnchor(event.currentTarget)}
                    label={
                      <Box
                        component="span"
                        onClick={(event) => {
                          event.stopPropagation();
                          setMembershipMenuAnchor(event.currentTarget);
                        }}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.4,
                        }}
                      >
                        Memberships
                        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                      </Box>
                    }
                  />
                ) : null}
                {visibleLocationTabs.includes(0) ? (
                  <Tab
                    value={0}
                    id="location-tab-0"
                    aria-controls="location-tabpanel-0"
                    icon={<RateReviewIcon />}
                    iconPosition="start"
                    label="Posts"
                  />
                ) : null}
                {visibleLocationTabs.includes(4) ? (
                  <Tab
                    value={4}
                    id="location-tab-4"
                    aria-controls="location-tabpanel-4"
                    icon={<CalendarMonthIcon />}
                    iconPosition="start"
                    label="Events"
                  />
                ) : null}
                {visibleLocationTabs.includes(12) ? (
                  <Tab
                    value={12}
                    id="location-tab-12"
                    aria-controls="location-tabpanel-12"
                    icon={<PaidIcon />}
                    iconPosition="start"
                    label="Subscriptions"
                  />
                ) : null}
                {canOpenManageTab ? (
                  <Tab
                    value={13}
                    id="location-tab-13"
                    icon={<SettingsIcon />}
                    iconPosition="start"
                    label={
                      <Box
                        component="span"
                        onClick={(event) => {
                          event.stopPropagation();
                          setRoleMenuAnchor(event.currentTarget);
                        }}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.4,
                        }}
                      >
                        Manage
                        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                      </Box>
                    }
                    onClick={(event) => setRoleMenuAnchor(event.currentTarget)}
                    disabled={activeRoleSaving}
                  />
                ) : null}
              </Tabs>
              {hiddenLocationTabCounts.left > 0 ? (
                <Chip
                  size="small"
                  color="secondary"
                  label={`+${hiddenLocationTabCounts.left}`}
                  sx={{
                    position: "absolute",
                    left: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    height: 22,
                    fontWeight: 900,
                    pointerEvents: "none",
                    boxShadow: 1,
                  }}
                />
              ) : null}
              {hiddenLocationTabCounts.right > 0 ? (
                <Chip
                  size="small"
                  color="secondary"
                  label={`+${hiddenLocationTabCounts.right}`}
                  sx={{
                    position: "absolute",
                    right: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    height: 22,
                    fontWeight: 900,
                    pointerEvents: "none",
                    boxShadow: 1,
                  }}
                />
              ) : null}
            </Box>
            <Menu
              id="reports-tab-menu"
              anchorEl={reportMenuAnchor}
              open={Boolean(reportMenuAnchor)}
              onClose={() => setReportMenuAnchor(null)}
              slotProps={{ list: { "aria-labelledby": "location-tab-10" } }}
            >
              {canUseLocalReports && canCreateForActiveTab ? (
                <MenuItem
                  onClick={() => {
                    setReportMenuAnchor(null);
                    openReportCreateDialog();
                  }}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  {createReportMenuOption}
                </MenuItem>
              ) : null}
              {(
                [
                  ...(canUseLocalReports
                    ? [
                        {
                          value: "Local" as const,
                          label: `${location.title || "Location"} Reports`,
                        },
                      ]
                    : []),
                  {
                    value: receivedReportMenuOption,
                    label: "Received Reports",
                  },
                  ...(canUseAllMinistryReports
                    ? [
                        {
                          value: allMinistryReportsMenuOption,
                          label: allMinistryReportsMenuOption,
                        },
                      ]
                    : []),
                ] as { value: ReportMenuOption; label: string }[]
              ).map((option) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === selectedReportMenu}
                  onClick={() => {
                    setSelectedReportMenu(option.value);
                    if (option.value !== allMinistryReportsMenuOption) {
                      setReportsView("locations");
                    }
                    setActiveTab(10);
                    setReportMenuAnchor(null);
                  }}
                >
                  <ListItemIcon>{reportMenuIcons[option.value]}</ListItemIcon>
                  {option.label}
                </MenuItem>
              ))}
              {canManageLocationReports ? <Divider /> : null}
              {canManageLocationReports ? (
                <MenuItem
                  onClick={() => {
                    setReportMenuAnchor(null);
                    setActiveTab(10);
                    setReportSettingsOpen(true);
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  {reportSettingsMenuOption}
                </MenuItem>
              ) : null}
            </Menu>
            <Menu
              id="finances-tab-menu"
              anchorEl={financeMenuAnchor}
              open={Boolean(financeMenuAnchor)}
              onClose={() => setFinanceMenuAnchor(null)}
              slotProps={{ list: { "aria-labelledby": "location-tab-2" } }}
            >
              {[
                {
                  value: "cashbooks" as const,
                  label: "CashBooks",
                  icon: <PaidIcon fontSize="small" />,
                },
                ...(!isOfficeLocation
                  ? [
                      {
                        value: "requisitions" as const,
                        label: "Requisitions",
                        icon: <ArticleIcon fontSize="small" />,
                      },
                    ]
                  : []),
              ].map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => {
                    setFinanceView(option.value);
                    setActiveTab(2);
                    setFinanceMenuAnchor(null);
                  }}
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              id="attendance-tab-menu"
              anchorEl={attendanceTabMenuAnchor}
              open={Boolean(attendanceTabMenuAnchor)}
              onClose={() => setAttendanceTabMenuAnchor(null)}
              slotProps={{ list: { "aria-labelledby": "location-tab-3" } }}
            >
              <MenuItem
                disabled
                sx={{
                  display: { xs: "flex", sm: "none" },
                  color: "text.primary",
                  fontWeight: 400,
                  opacity: "1 !important",
                }}
              >
                Attendances
              </MenuItem>
              <Divider sx={{ display: { xs: "block", sm: "none" } }} />
              {attendanceMenuOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => {
                    setAttendanceSubTab(option.value);
                    setActiveTab(3);
                    setAttendanceTabMenuAnchor(null);
                  }}
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              id="membership-tab-menu"
              anchorEl={membershipMenuAnchor}
              open={Boolean(membershipMenuAnchor)}
              onClose={() => setMembershipMenuAnchor(null)}
              slotProps={{ list: { "aria-labelledby": "location-tab-1" } }}
            >
              {membershipMenuOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => {
                    setMembershipView(option.value);
                    setActiveTab(option.value === "branches" ? 9 : 1);
                    setMembershipMenuAnchor(null);
                  }}
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                position: "relative",
                minHeight: { xs: 360, sm: 420 },
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "flex-end", mb: 2 }}>
                {canCreateForActiveTab &&
                activeTab !== 1 &&
                activeTab !== 2 &&
                activeTab !== 3 &&
                activeTab !== 5 &&
                activeTab !== 10 &&
                activeTab !== 11 ? (
                  <CircularAddButton
                    label={activeTabCreateLabel}
                    onClick={openActiveTabCreate}
                  />
                ) : null}
              </Stack>
              {relatedError ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {relatedError}
                </Alert>
              ) : null}
              {showRelatedLoadingOverlay ? (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 5,
                    display: "grid",
                    alignItems: "start",
                    pointerEvents: "none",
                    bgcolor: "background.paper",
                  }}
                >
                  <LocationTabSkeleton />
                </Box>
              ) : null}
              <TabPanel value={activeTab} index={0}>
                <ResourceGrid empty="No posts for this location yet">
                  {posts.map((post) => (
                    <ResourceCard
                      key={post.id}
                      title={post.title || `Post #${post.id}`}
                      eyebrow={post.type || "Post"}
                      description={post.description}
                      status={post.status}
                      href={`/app/posts/${post.id}`}
                    />
                  ))}
                </ResourceGrid>
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", minWidth: 0 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 900 }}
                        noWrap
                      >
                        {membershipMenuOptions.find(
                          (option) => option.value === membershipView,
                        )?.label || "Membership"}
                      </Typography>
                      <Chip
                        size="small"
                        color="secondary"
                        label={membershipViewCount}
                        sx={{ height: 22, fontWeight: 900 }}
                      />
                    </Stack>
                    {canCreateForActiveTab ? (
                      <CircularAddButton
                        label={membershipActionLabel}
                        onClick={() => openActionDrawer(membershipActionTab)}
                      />
                    ) : null}
                  </Stack>
                  {membershipView === "members"
                    ? memberCards
                    : membershipView === "zones"
                      ? zonesMembershipContent
                      : missionalFamiliesMembershipContent}
                </Stack>
              </TabPanel>
              <TabPanel
                value={financeView === "cashbooks" ? activeTab : 11}
                index={2}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                      CashBooks
                    </Typography>
                    {canCreateForActiveTab ? (
                      <CircularAddButton
                        label="New CashBook"
                        onClick={() => openActionDrawer(2)}
                      />
                    ) : null}
                  </Stack>
                  {cashbooks.length === 0 ? (
                    <EmptyState
                      title="No cashbooks for this location yet"
                      message="CashBooks will appear here after they are created."
                    />
                  ) : (
                    <Grid container spacing={2}>
                      {cashbooks.map((cashbook) => {
                        const cashbookTransactions =
                          cashbook.transactions || [];
                        const cashbookAmountIn = cashbookTransactions.reduce(
                          (sum, transaction) =>
                            (transaction.category || "")
                              .trim()
                              .toLowerCase() === "income"
                              ? sum + Number(transaction.amount || 0)
                              : sum,
                          0,
                        );
                        const cashbookAmountOut = cashbookTransactions.reduce(
                          (sum, transaction) =>
                            (transaction.category || "")
                              .trim()
                              .toLowerCase() === "expense"
                              ? sum + Number(transaction.amount || 0)
                              : sum,
                          0,
                        );
                        const cashbookNet =
                          cashbook.net_balance ??
                          Number(cashbook.opening_balance || 0) +
                            cashbookAmountIn -
                            cashbookAmountOut;
                        return (
                          <Grid
                            key={cashbook.cashbook_id}
                            size={{ xs: 12, sm: 6, lg: 4 }}
                          >
                            <Paper
                              variant="outlined"
                              sx={{ height: "100%", p: 2 }}
                            >
                              <Stack spacing={1.5} sx={{ height: "100%" }}>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 900 }}
                                      noWrap
                                    >
                                      {cashbook.title ||
                                        `CashBook #${cashbook.cashbook_id}`}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {cashbook.location_title ||
                                        location.title ||
                                        "Location"}
                                    </Typography>
                                  </Box>
                                  <CashbookActionsMenu
                                    cashbook={cashbook}
                                    requesterId={account?.id}
                                    accounts={accounts}
                                    canManagePrivateVisibility={
                                      canCreatePrivateCashbooks
                                    }
                                    returnTo={`${routerLocation.pathname}${routerLocation.search}`}
                                    onRefresh={loadRelatedRecords}
                                  />
                                </Stack>
                                <List dense disablePadding>
                                  <LocationReportStatListItem
                                    icon={
                                      <AttachMoneyIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    }
                                    label="Opening"
                                    value={Number(
                                      cashbook.opening_balance || 0,
                                    )}
                                  />
                                  <LocationReportStatListItem
                                    icon={
                                      <PaidIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    }
                                    label="In"
                                    value={
                                      cashbook.amount_in ?? cashbookAmountIn
                                    }
                                  />
                                  <LocationReportStatListItem
                                    icon={
                                      <PaidIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    }
                                    label="Out"
                                    value={
                                      cashbook.amount_out ?? cashbookAmountOut
                                    }
                                  />
                                  <LocationReportStatListItem
                                    icon={
                                      <AttachMoneyIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    }
                                    label="Net"
                                    value={cashbookNet}
                                  />
                                  <LocationReportStatListItem
                                    icon={
                                      <ArticleIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    }
                                    label="Transactions"
                                    value={
                                      cashbook.transaction_count ??
                                      cashbookTransactions.length
                                    }
                                  />
                                </List>
                                <Stack
                                  direction="row"
                                  sx={{
                                    mt: "auto",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 1,
                                  }}
                                >
                                  <Chip
                                    size="small"
                                    color={
                                      (cashbook.status || "").toLowerCase() ===
                                      "closed"
                                        ? "default"
                                        : "secondary"
                                    }
                                    label={cashbook.status || "Active"}
                                  />
                                  <Button
                                    size="small"
                                    variant="text"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() =>
                                      navigate(
                                        `/app/cashbooks/${cashbook.cashbook_id}`,
                                        {
                                          state: {
                                            cashbookReturnTo: `${routerLocation.pathname}${routerLocation.search}`,
                                          },
                                        },
                                      )
                                    }
                                    sx={{ minWidth: 0, px: 0.75 }}
                                  >
                                    Open
                                  </Button>
                                </Stack>
                              </Stack>
                            </Paper>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={3}>
                <Paper variant="outlined" sx={{ overflow: "hidden" }}>
                  <Box sx={{ p: 2 }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                        {attendanceSubTab === 0
                          ? "Location"
                          : "Missional Families"}
                      </Typography>
                      {canCreateForActiveTab ? (
                        <CircularAddButton
                          label="Add Record"
                          onClick={() => {
                            setAttendanceCreateScope(
                              attendanceSubTab === 0 ? "location" : "mf",
                            );
                            openActionDrawer();
                          }}
                        />
                      ) : null}
                    </Stack>
                    {attendanceSubTab === 0 ? (
                      locationAttendanceCards.length === 0 ? (
                        <EmptyState
                          title="No attendance records for this location yet"
                          message="Recorded attendance will appear here by schedule."
                        />
                      ) : (
                        <Grid container spacing={2}>
                          {locationAttendanceCards.map(({ date, records }) => (
                            <Grid key={date} size={{ xs: 12, md: 4 }}>
                              <Paper
                                variant="outlined"
                                sx={{ height: "100%", p: 2 }}
                              >
                                <Stack spacing={1.5} sx={{ height: "100%" }}>
                                  <Box>
                                    <Typography
                                      variant="overline"
                                      color="text.secondary"
                                    >
                                      Schedule Date
                                    </Typography>
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 900 }}
                                    >
                                      {date}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {records.length} schedule
                                      {records.length === 1 ? "" : "s"} recorded
                                    </Typography>
                                  </Box>
                                  <List
                                    dense
                                    disablePadding
                                    sx={{
                                      borderTop: 1,
                                      borderColor: "divider",
                                    }}
                                  >
                                    {records.map((attendance) => {
                                      const schedule = schedules.find(
                                        (item) =>
                                          item.id === attendance.schedule_id,
                                      );
                                      return (
                                        <ListItem
                                          key={attendance.id}
                                          disableGutters
                                          secondaryAction={attendanceRecordActions(
                                            attendance,
                                          )}
                                          sx={{
                                            py: 0.75,
                                            pr: 5,
                                            borderBottom: 1,
                                            borderColor: "divider",
                                          }}
                                        >
                                          <ListItemIcon sx={{ minWidth: 30 }}>
                                            <CalendarMonthIcon
                                              color="secondary"
                                              fontSize="small"
                                            />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={
                                              schedule?.title ||
                                              `Schedule #${attendance.schedule_id || "N/A"}`
                                            }
                                            secondary={[
                                              schedule?.type || "Attendance",
                                              `Total: ${Number(attendance.total_attendance || 0).toLocaleString()}`,
                                              attendance.posted_by_display_name ||
                                                null,
                                            ]
                                              .filter(Boolean)
                                              .join(" - ")}
                                          />
                                        </ListItem>
                                      );
                                    })}
                                  </List>
                                </Stack>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      )
                    ) : mfAttendanceCardGroups.length === 0 ? (
                      <EmptyState
                        title="No missional family attendance records yet"
                        message="Recorded missional family attendance will appear here by schedule."
                      />
                    ) : (
                      <Grid container spacing={2}>
                        {mfAttendanceCardGroups.map(({ date, records }) => (
                          <Grid key={date} size={{ xs: 12, md: 4 }}>
                            <Paper
                              variant="outlined"
                              sx={{ height: "100%", p: 2 }}
                            >
                              <Stack spacing={1.5} sx={{ height: "100%" }}>
                                <Box>
                                  <Typography
                                    variant="overline"
                                    color="text.secondary"
                                  >
                                    Schedule Date
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 900 }}
                                  >
                                    {date}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {records.length} missional family record
                                    {records.length === 1 ? "" : "s"}
                                  </Typography>
                                </Box>
                                <List
                                  dense
                                  disablePadding
                                  sx={{ borderTop: 1, borderColor: "divider" }}
                                >
                                  {records.map((attendance) => {
                                    const schedule = schedules.find(
                                      (item) =>
                                        item.id === attendance.schedule_id,
                                    );
                                    const family = missionalFamilies.find(
                                      (item) =>
                                        idsEqual(item.id, attendance.sg_id),
                                    );
                                    return (
                                      <ListItem
                                        key={attendance.id}
                                        disableGutters
                                        secondaryAction={mfAttendanceRecordActions(
                                          attendance,
                                        )}
                                        sx={{
                                          py: 0.75,
                                          pr: 5,
                                          borderBottom: 1,
                                          borderColor: "divider",
                                        }}
                                      >
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                          <GroupsIcon
                                            color="secondary"
                                            fontSize="small"
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={
                                            family?.title ||
                                            `Family #${attendance.sg_id || "N/A"}`
                                          }
                                          secondary={[
                                            schedule?.title ||
                                              `Schedule #${attendance.schedule_id || "N/A"}`,
                                            schedule?.type || "Attendance",
                                            `Total: ${Number(attendance.total_number || 0).toLocaleString()}`,
                                            attendance.posted_by_display_name ||
                                              null,
                                          ]
                                            .filter(Boolean)
                                            .join(" - ")}
                                        />
                                      </ListItem>
                                    );
                                  })}
                                </List>
                              </Stack>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                </Paper>
              </TabPanel>
              <TabPanel
                value={financeView === "requisitions" ? activeTab : 11}
                index={2}
              >
                <Paper variant="outlined" sx={{ overflow: "hidden" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                        Requisitions
                      </Typography>
                    </Box>
                    {canCreateForActiveTab ? (
                      <CircularAddButton
                        label="Create Requisition"
                        onClick={openRequisitionDrawer}
                      />
                    ) : null}
                  </Stack>
                  <Box sx={{ p: 2 }}>
                    {requisitionError ? (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {requisitionError}
                      </Alert>
                    ) : null}
                    {requisitions.length === 0 ? (
                      <EmptyState
                        title="No requisitions for this location yet"
                        message="Prepared requisitions will appear here."
                      />
                    ) : (
                      <Grid container spacing={2}>
                        {requisitions.map((requisition) => {
                          const requisitionTotal = Number(
                            requisition.total_amount ||
                              requisition.items.reduce(
                                (sum, item) => sum + Number(item.amount || 0),
                                0,
                              ),
                          );
                          const isApproved =
                            (requisition.status || "").toLowerCase() ===
                            "approved";
                          return (
                            <Grid key={requisition.id} size={{ xs: 12, md: 4 }}>
                              <Paper
                                variant="outlined"
                                sx={{ p: 2, height: "100%" }}
                              >
                                <Stack spacing={1.5} sx={{ height: "100%" }}>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                      alignItems: "flex-start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box sx={{ minWidth: 0 }}>
                                      <Typography
                                        variant="overline"
                                        color="text.secondary"
                                      >
                                        Requisition
                                      </Typography>
                                      <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 900 }}
                                      >
                                        {requisition.title ||
                                          "Untitled requisition"}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: "block" }}
                                      >
                                        {requisition.prepared_by_display_name
                                          ? `Prepared by ${requisition.prepared_by_display_name}`
                                          : "Preparer not set"}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: "block" }}
                                      >
                                        {formatDisplayDate(requisition.date)}
                                      </Typography>
                                      {requisition.description ? (
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{ mt: 0.75 }}
                                        >
                                          {requisition.description}
                                        </Typography>
                                      ) : null}
                                    </Box>
                                    {canCreateForActiveTab ? (
                                      <IconButton
                                        aria-label="Requisition actions"
                                        size="small"
                                        onClick={(event) => {
                                          setSelectedRequisition(requisition);
                                          setRequisitionMenuAnchor(
                                            event.currentTarget,
                                          );
                                        }}
                                      >
                                        <MoreVertIcon fontSize="small" />
                                      </IconButton>
                                    ) : null}
                                  </Stack>
                                  <List
                                    dense
                                    disablePadding
                                    sx={{
                                      borderTop: 1,
                                      borderColor: "divider",
                                    }}
                                  >
                                    {requisition.items.map((item, index) => (
                                      <ListItem
                                        key={`${requisition.id}-${item.particular_id}-${index}`}
                                        disableGutters
                                        sx={{
                                          py: 0.75,
                                          borderBottom: 1,
                                          borderColor: "divider",
                                        }}
                                      >
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                          <CheckCircleIcon
                                            color="secondary"
                                            fontSize="small"
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={
                                            item.particular_title ||
                                            `Particular #${item.particular_id}`
                                          }
                                          slotProps={{
                                            primary: { variant: "body2" },
                                          }}
                                        />
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          sx={{ ml: 1, textAlign: "right" }}
                                        >
                                          {Number(
                                            item.amount || 0,
                                          ).toLocaleString()}
                                        </Typography>
                                      </ListItem>
                                    ))}
                                    <ListItem
                                      disableGutters
                                      sx={{
                                        py: 0.75,
                                        borderBottom: 1,
                                        borderColor: "divider",
                                      }}
                                    >
                                      <ListItemIcon sx={{ minWidth: 30 }}>
                                        <CheckCircleIcon
                                          color="secondary"
                                          fontSize="small"
                                        />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="Total"
                                        slotProps={{
                                          primary: { variant: "body2" },
                                        }}
                                      />
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ ml: 1, textAlign: "right" }}
                                      >
                                        {requisitionTotal.toLocaleString()}
                                      </Typography>
                                    </ListItem>
                                  </List>
                                  <Stack
                                    direction="row"
                                    spacing={1.25}
                                    sx={{ alignItems: "center", mt: "auto" }}
                                  >
                                    <Chip
                                      size="small"
                                      label={requisition.status || "Pending"}
                                      color={isApproved ? "success" : "warning"}
                                      sx={{ flex: 1 }}
                                    />
                                    {canApproveRequisitionsForUi &&
                                    !isApproved ? (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<VerifiedIcon />}
                                        onClick={() =>
                                          updateRequisitionStatus(
                                            requisition,
                                            "approve",
                                          )
                                        }
                                        sx={{ flex: 1 }}
                                      >
                                        Approve
                                      </Button>
                                    ) : null}
                                  </Stack>
                                </Stack>
                              </Paper>
                            </Grid>
                          );
                        })}
                      </Grid>
                    )}
                  </Box>
                </Paper>
                <Menu
                  anchorEl={requisitionMenuAnchor}
                  open={Boolean(requisitionMenuAnchor)}
                  onClose={closeRequisitionMenu}
                >
                  <MenuItem
                    disabled={
                      !selectedRequisition ||
                      (selectedRequisition.status || "").toLowerCase() ===
                        "approved"
                    }
                    onClick={() =>
                      selectedRequisition &&
                      openRequisitionEdit(selectedRequisition)
                    }
                  >
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem
                    disabled={!selectedRequisition}
                    onClick={() =>
                      selectedRequisition &&
                      updateRequisitionStatus(selectedRequisition, "submit")
                    }
                  >
                    <ListItemIcon>
                      <ForwardToInboxIcon fontSize="small" />
                    </ListItemIcon>
                    Submit
                  </MenuItem>
                  <MenuItem
                    disabled={
                      !selectedRequisition ||
                      (selectedRequisition.status || "").toLowerCase() ===
                        "approved"
                    }
                    onClick={() =>
                      selectedRequisition &&
                      requestDeleteConfirmation(
                        "Delete Requisition?",
                        `This will permanently delete ${selectedRequisition.title || "this requisition"}.`,
                        () => deleteRequisition(selectedRequisition),
                      )
                    }
                  >
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </Menu>
              </TabPanel>
              <TabPanel value={activeTab} index={4}>
                <ResourceGrid empty="No events for this location yet">
                  {events.map((event) => (
                    <ResourceCard
                      key={event.id}
                      title={event.title || `Event #${event.id}`}
                      eyebrow={event.type || "Event"}
                      description={event.description}
                      meta={[event.startdate, event.starttime]
                        .filter(Boolean)
                        .join(" ")}
                      href={`/app/events/${event.id}`}
                    />
                  ))}
                </ResourceGrid>
              </TabPanel>
              <TabPanel value={activeTab} index={5}>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", minWidth: 0 }}
                  >
                    <TextField
                      label="Search Roles"
                      value={roleSearch}
                      onChange={(event) => setRoleSearch(event.target.value)}
                      size="small"
                      sx={{ flex: "1 1 auto", minWidth: 0 }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    {canCreateForActiveTab ? (
                      <Box sx={{ flex: "0 0 auto" }}>
                        <CircularAddButton
                          label={activeTabCreateLabel}
                          onClick={openActiveTabCreate}
                        />
                      </Box>
                    ) : null}
                  </Stack>
                  {roleCardGroups.length === 0 ? (
                    <EmptyState
                      title={
                        roleSearchValue
                          ? "No matching roles"
                          : "No roles for this location yet"
                      }
                      message={
                        roleSearchValue
                          ? "Try a different role, person, or cashbook title."
                          : "Assigned location roles will appear here."
                      }
                    />
                  ) : (
                    <Grid container spacing={2}>
                    {roleCardGroups.map(({ roleName, records }) => (
                      <Grid key={roleName} size={{ xs: 12, md: 4 }}>
                        <Paper
                          variant="outlined"
                          sx={{ height: "100%", overflow: "hidden" }}
                        >
                          <Box
                            sx={{
                              px: 2,
                              py: 1.5,
                              borderBottom: 1,
                              borderColor: "divider",
                            }}
                          >
                            <Typography
                              variant="overline"
                              color="text.secondary"
                            >
                              Role
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                              {roleName}
                            </Typography>
                          </Box>
                          <List dense disablePadding>
                            {records.some((role) => role.cashbook_id)
                              ? Array.from(
                                  records
                                    .reduce<
                                      Map<
                                        string,
                                        { cashbookTitle: string; roles: Role[] }
                                      >
                                    >((groups, role) => {
                                      const cashbookTitle =
                                        role.cashbook_title ||
                                        (role.cashbook_id
                                          ? `Cashbook #${role.cashbook_id}`
                                          : "Cashbook");
                                      const existing = groups.get(
                                        cashbookTitle,
                                      ) || {
                                        cashbookTitle,
                                        roles: [],
                                      };
                                      existing.roles.push(role);
                                      groups.set(cashbookTitle, existing);
                                      return groups;
                                    }, new Map())
                                    .values(),
                                ).map((cashbookGroup, groupIndex, groups) => (
                                  <Box key={cashbookGroup.cashbookTitle}>
                                    <ListItem
                                      disableGutters
                                      sx={{
                                        px: 2,
                                        py: 0.75,
                                        bgcolor: "action.hover",
                                        borderBottom: 1,
                                        borderColor: "divider",
                                      }}
                                    >
                                      <ListItemText
                                        primary={cashbookGroup.cashbookTitle}
                                        slotProps={{
                                          primary: {
                                            variant: "caption",
                                            sx: {
                                              color: "text.secondary",
                                              textTransform: "uppercase",
                                            },
                                          },
                                        }}
                                      />
                                    </ListItem>
                                    {cashbookGroup.roles.map((role, index) => {
                                      const personName =
                                        role.user_display_name ||
                                        memberName(accounts, role.user_id);
                                      return (
                                        <ListItem
                                          key={role.id}
                                          divider={
                                            index <
                                              cashbookGroup.roles.length - 1 ||
                                            groupIndex < groups.length - 1
                                          }
                                          secondaryAction={
                                            <IconButton
                                              size="small"
                                              aria-label="Role actions"
                                              onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedRoleAction(role);
                                                setRoleActionAnchor(
                                                  event.currentTarget,
                                                );
                                              }}
                                            >
                                              <MoreVertIcon fontSize="small" />
                                            </IconButton>
                                          }
                                          sx={{
                                            px: 2,
                                            py: 1,
                                            pr: 6,
                                          }}
                                        >
                                          <ListItemIcon sx={{ minWidth: 34 }}>
                                            <CheckCircleIcon
                                              color="secondary"
                                              fontSize="small"
                                            />
                                          </ListItemIcon>
                                          <ListItemText primary={personName} />
                                        </ListItem>
                                      );
                                    })}
                                  </Box>
                                ))
                              : records.map((role, index) => {
                                  const personName =
                                    role.id === "__owner_role__"
                                      ? "All Members"
                                      : role.user_display_name ||
                                        memberName(accounts, role.user_id);
                                  const secondaryText =
                                    !["Location Pastor", "Location Admin"].includes(
                                      role.role || "",
                                    ) &&
                                    role.title &&
                                    role.title !== role.role
                                      ? role.title
                                      : "";
                                  return (
                                    <ListItem
                                      key={role.id}
                                      divider={index < records.length - 1}
                                      secondaryAction={
                                        role.id === "__owner_role__" ? null : (
                                          <IconButton
                                            size="small"
                                            aria-label="Role actions"
                                            onClick={(event) => {
                                              event.stopPropagation();
                                              setSelectedRoleAction(role);
                                              setRoleActionAnchor(
                                                event.currentTarget,
                                              );
                                            }}
                                          >
                                            <MoreVertIcon fontSize="small" />
                                          </IconButton>
                                        )
                                      }
                                      sx={{
                                        px: 2,
                                        py: 1,
                                        pr:
                                          role.id === "__owner_role__" ? 2 : 6,
                                      }}
                                    >
                                      <ListItemIcon sx={{ minWidth: 34 }}>
                                        <CheckCircleIcon
                                          color="secondary"
                                          fontSize="small"
                                        />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{
                                              alignItems: "center",
                                              minWidth: 0,
                                            }}
                                          >
                                            <Typography
                                              variant="body2"
                                              sx={{ minWidth: 0 }}
                                              noWrap
                                            >
                                              {personName}
                                            </Typography>
                                            {role.id === "__owner_role__" ? (
                                              <Chip
                                                size="small"
                                                color="secondary"
                                                label={role.member_count || 0}
                                              />
                                            ) : null}
                                          </Stack>
                                        }
                                        secondary={secondaryText || undefined}
                                      />
                                    </ListItem>
                                  );
                                })}
                          </List>
                        </Paper>
                      </Grid>
                    ))}
                    </Grid>
                  )}
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={14}>
                <Stack spacing={2.5}>
                  <Paper variant="outlined" sx={{ overflow: "hidden" }}>
                    <Box
                      sx={{
                        px: 2,
                        py: 1.5,
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        About
                      </Typography>
                    </Box>
                    <List dense disablePadding>
                      {[
                        { label: "Type", value: location.type || "Not set" },
                        { label: "Status", value: location.status || "Active" },
                        {
                          label: "Active Role",
                          value: activeLocationRole || "No active role",
                        },
                        { label: "Email", value: location.email || "Not set" },
                        {
                          label: "Phone",
                          value: location.phone_number || "Not set",
                        },
                        {
                          label: "Address",
                          value:
                            [
                              location.address,
                              location.city,
                              location.district,
                              location.country,
                            ]
                              .filter(Boolean)
                              .join(", ") || "Not set",
                        },
                        {
                          label: "Reporting Start Date",
                          value: location.reporting_start_date || "Not set",
                        },
                        {
                          label: "Parent Location",
                          value: location.parent_location_id
                            ? `Location #${location.parent_location_id}`
                            : "Main account location",
                        },
                      ].map((item) => (
                        <ListItem key={item.label} divider>
                          <ListItemText
                            primary={item.label}
                            secondary={item.value}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                  {location.description ? (
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 900, mb: 0.75 }}
                      >
                        Description
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {location.description}
                      </Typography>
                    </Paper>
                  ) : null}
                  {canEditLocation || canDeleteLocation ? (
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.5}
                    >
                      {canEditLocation ? (
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          onClick={openLocationEdit}
                        >
                          Edit Location
                        </Button>
                      ) : null}
                      {canDeleteLocation ? (
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setLocationDeleteError("");
                            setLocationDeleteOpen(true);
                          }}
                        >
                          Delete Location
                        </Button>
                      ) : null}
                    </Stack>
                  ) : null}
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={15}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {term("particulars")}
                  </Typography>
                  <TextField
                    size="small"
                    label={`Search ${term("particulars").toLowerCase()}`}
                    value={locationParticularSearch}
                    onChange={(event) =>
                      setLocationParticularSearch(event.target.value)
                    }
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <List
                    dense
                    disablePadding
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    {filteredLocationParticulars.map((particular) => (
                      <ListItem
                        key={particular.particular_id}
                        divider
                        secondaryAction={
                          <Stack direction="row" spacing={0.5}>
                            <IconButton
                              edge="end"
                              size="small"
                              aria-label={`Edit ${particular.title || "particular"}`}
                              onClick={() => editLocationParticular(particular)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              edge="end"
                              size="small"
                              color="error"
                              aria-label={`Remove ${particular.title || "particular"}`}
                              onClick={() =>
                                requestDeleteConfirmation(
                                  "Delete Particular?",
                                  `This will permanently delete ${particular.title || "this particular"}.`,
                                  () => removeLocationParticular(particular),
                                )
                              }
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        }
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 38 }}>
                          <CollectionsBookmarkIcon
                            color="secondary"
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            particular.title ||
                            `Particular #${particular.particular_id}`
                          }
                          secondary={[
                            particular.category || "No category",
                            particular.type || "General",
                          ].join(" - ")}
                          sx={{ pr: 8 }}
                          slotProps={{
                            primary: { sx: { fontWeight: 800 } },
                            secondary: { noWrap: true },
                          }}
                        />
                      </ListItem>
                    ))}
                    {!filteredLocationParticulars.length ? (
                      <ListItem disableGutters>
                        <ListItemText primary={`No ${term("particulars").toLowerCase()} found`} />
                      </ListItem>
                    ) : null}
                  </List>
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={16}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    {term("remissions")}
                  </Typography>
                  {locationRemissions.length === 0 ? (
                    <EmptyState
                      title={`No ${term("remissions").toLowerCase()} for this ${term("location").toLowerCase()} yet`}
                      message={`Create ${term("remissions").toLowerCase()} to see them here.`}
                    />
                  ) : (
                    <List
                      dense
                      sx={{
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                      }}
                    >
                      {locationRemissions.map((remission) => (
                        <ListItem
                          key={remission.id}
                          divider
                          secondaryAction={
                            <Stack direction="row" spacing={0.5}>
                              <IconButton
                                edge="end"
                                size="small"
                                aria-label={`Edit ${remission.title || "remission"}`}
                                onClick={() =>
                                  handleEditLocationRemission(remission)
                                }
                                disabled={remissionSaving}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                edge="end"
                                size="small"
                                aria-label={`Remove ${remission.title || "remission"}`}
                                onClick={() =>
                                  requestDeleteConfirmation(
                                    "Delete Remission?",
                                    `This will permanently delete ${remission.title || "this remission"}.`,
                                    () =>
                                      handleDeleteLocationRemission(remission),
                                  )
                                }
                                disabled={remissionSaving}
                                color="error"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          }
                        >
                          <ListItemText
                            primary={`${remission.title || `Remission #${remission.id}`} (${Number(remission.percentage || 0)}%)`}
                            secondary={[
                              incomeLocationParticulars.find((particular) =>
                                idsEqual(
                                  particular.particular_id,
                                  remission.particular_id,
                                ),
                              )?.title || "No particular selected",
                              remission.description || "No description",
                            ].join(" - ")}
                            sx={{ pr: 8 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={6}>
                {zones.length === 0 ? (
                  <EmptyState
                    title={`No ${term("zones").toLowerCase()} for this ${term("location").toLowerCase()} yet`}
                    message={`Create ${term("zones").toLowerCase()} to see them here.`}
                  />
                ) : (
                  <Grid container spacing={2}>
                    {zones.map((zone) => (
                      <Grid key={zone.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper
                          variant="outlined"
                          sx={{ height: "100%", p: 2.25 }}
                        >
                          <Stack spacing={1.5} sx={{ height: "100%" }}>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                              }}
                            >
                              <Diversity2Icon
                                color="secondary"
                                sx={{ mt: 0.5 }}
                              />
                              <Box sx={{ minWidth: 0 }}>
                                <Typography
                                  variant="overline"
                                  color="text.secondary"
                                >
                                  {term("zones").replace(/s$/i, "")}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 800, mt: 0.25 }}
                                >
                                  {zone.title || `${term("zones").replace(/s$/i, "")} #${zone.id}`}
                                </Typography>
                              </Box>
                              {canManageLocationResources ? (
                                <IconButton
                                  aria-label="Zone actions"
                                  size="small"
                                  onClick={(event) => openZoneMenu(event, zone)}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              ) : null}
                            </Stack>
                            <List dense disablePadding>
                              {[
                                {
                                  label: "Leader",
                                  value: memberName(
                                    accounts,
                                    zone.leader1_id,
                                    zone.leader1_display_name,
                                  ),
                                  subtitle: memberPhone(
                                    accounts,
                                    zone.leader1_id,
                                    zone.leader1_phone_number,
                                  ),
                                },
                                {
                                  label: "Assistant",
                                  value: memberName(
                                    accounts,
                                    zone.leader2_id,
                                    zone.leader2_display_name,
                                  ),
                                  subtitle: memberPhone(
                                    accounts,
                                    zone.leader2_id,
                                    zone.leader2_phone_number,
                                  ),
                                },
                                {
                                  label: term("missionalFamilies"),
                                  value: String(
                                    missionalFamilies.filter(
                                      (family) => family.zone_id === zone.id,
                                    ).length,
                                  ),
                                },
                              ].map((item) => (
                                <ListItem
                                  key={item.label}
                                  disableGutters
                                  divider
                                  sx={{ py: 0.75, gap: 1 }}
                                >
                                  <ListItemIcon sx={{ minWidth: 30 }}>
                                    <CheckCircleIcon
                                      color="secondary"
                                      fontSize="small"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={item.label}
                                    slotProps={{
                                      primary: {
                                        variant: "body2",
                                        color: "text.secondary",
                                      },
                                    }}
                                  />
                                  <Box sx={{ minWidth: 0, textAlign: "right" }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {item.value}
                                    </Typography>
                                    {item.subtitle ? (
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {item.subtitle}
                                      </Typography>
                                    ) : null}
                                  </Box>
                                </ListItem>
                              ))}
                            </List>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: "auto" }}
                            >
                              {zone.description ||
                                "No description has been added yet."}
                            </Typography>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </TabPanel>
              <TabPanel value={activeTab} index={7}>
                {missionalFamilies.length === 0 ? (
                  <EmptyState
                    title="No missional families for this location yet"
                    message="Create a missional family to see it here."
                  />
                ) : (
                  <Grid container spacing={2}>
                    {missionalFamilies.map((family) => (
                      <Grid key={family.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper
                          variant="outlined"
                          sx={{ height: "100%", p: 2.25 }}
                        >
                          <Stack spacing={1.5} sx={{ height: "100%" }}>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box sx={{ minWidth: 0 }}>
                                <Typography
                                  variant="overline"
                                  color="text.secondary"
                                >
                                  Missional Family
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 800, mt: 0.25 }}
                                >
                                  {family.title ||
                                    `Missional Family #${family.id}`}
                                </Typography>
                              </Box>
                              {canManageLocationResources ? (
                                <IconButton
                                  aria-label="Missional family actions"
                                  size="small"
                                  onClick={(event) =>
                                    openFamilyMenu(event, family)
                                  }
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              ) : null}
                            </Stack>
                            <List dense disablePadding>
                              {[
                                {
                                  label: "Zone",
                                  value:
                                    zones.find((zone) =>
                                      idsEqual(zone.id, family.zone_id),
                                    )?.title || "Not set",
                                },
                                {
                                  label: "Leader",
                                  value: memberName(
                                    accounts,
                                    family.leader1_id,
                                    family.leader1_display_name,
                                  ),
                                  subtitle: memberPhone(
                                    accounts,
                                    family.leader1_id,
                                    family.leader1_phone_number,
                                  ),
                                },
                                {
                                  label: "Assistant",
                                  value: memberName(
                                    accounts,
                                    family.leader2_id,
                                    family.leader2_display_name,
                                  ),
                                  subtitle: memberPhone(
                                    accounts,
                                    family.leader2_id,
                                    family.leader2_phone_number,
                                  ),
                                },
                                {
                                  label: "Members",
                                  value: String(
                                    missionalFamilyMembers.filter(
                                      (member) =>
                                        idsEqual(member.mf_id, family.id) &&
                                        member.status !== "Inactive",
                                    ).length,
                                  ),
                                },
                              ].map((item) => (
                                <ListItem
                                  key={item.label}
                                  disableGutters
                                  divider
                                  sx={{ py: 0.75, gap: 1 }}
                                >
                                  <ListItemIcon sx={{ minWidth: 30 }}>
                                    <CheckCircleIcon
                                      color="secondary"
                                      fontSize="small"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={item.label}
                                    slotProps={{
                                      primary: {
                                        variant: "body2",
                                        color: "text.secondary",
                                      },
                                    }}
                                  />
                                  <Box sx={{ minWidth: 0, textAlign: "right" }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {item.value}
                                    </Typography>
                                    {item.subtitle ? (
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {item.subtitle}
                                      </Typography>
                                    ) : null}
                                  </Box>
                                </ListItem>
                              ))}
                            </List>
                            <Typography variant="body2" color="text.secondary">
                              {family.description ||
                                "No description has been added yet."}
                            </Typography>
                            <Box sx={{ mt: "auto" }}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<GroupsIcon />}
                                onClick={() => openFamilyMembers(family)}
                              >
                                View Members
                              </Button>
                            </Box>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </TabPanel>
              <TabPanel value={activeTab} index={8}>
                <ScheduleCalendar
                  schedules={schedules}
                  attendances={attendances}
                  startDate={location.reporting_start_date}
                  mandatoryTypes={mandatoryTypesForLocation(location)}
                  canManage={canManageLocationActionTab(8)}
                  onDetails={setScheduleDetails}
                  onEdit={openScheduleEdit}
                  onRemove={(schedule) =>
                    requestDeleteConfirmation(
                      "Delete Schedule?",
                      `This will permanently delete ${schedule.title || "this schedule"}.`,
                      () => removeSchedule(schedule),
                    )
                  }
                />
              </TabPanel>
              <TabPanel value={activeTab} index={9}>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center", minWidth: 0 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 900 }}
                      noWrap
                    >
                      {term("branches")}
                    </Typography>
                    <Chip
                      size="small"
                      color="secondary"
                      label={branches.length}
                      sx={{ height: 22, fontWeight: 900 }}
                    />
                  </Stack>
                  {branches.length === 0 ? (
                    <EmptyState
                      title={`No child ${term("branches").toLowerCase()} for this ${term("location").toLowerCase()} yet`}
                      message={`${term("branches")} created under this ${term("location").toLowerCase()} will appear here.`}
                    />
                  ) : (
                    <Grid container spacing={2}>
                      {branches.map((branch) => (
                        <Grid key={branch.id} size={{ xs: 12, md: 4 }}>
                          <Paper
                            variant="outlined"
                            sx={{ height: "100%", p: 2 }}
                          >
                            <Stack spacing={1.5} sx={{ height: "100%" }}>
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                  alignItems: "flex-start",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography
                                    variant="overline"
                                    color="text.secondary"
                                  >
                                    {branch.type || term("branches").replace(/es$/i, "")}
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 900 }}
                                  >
                                    {branch.title || `${term("location")} #${branch.id}`}
                                  </Typography>
                                </Box>
                                <IconButton
                                  size="small"
                                  aria-label={`${term("branches").replace(/es$/i, "")} actions`}
                                  onClick={(event) => {
                                    setSelectedBranchAction(branch);
                                    setBranchActionAnchor(event.currentTarget);
                                  }}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                              <List
                                dense
                                disablePadding
                                sx={{ borderTop: 1, borderColor: "divider" }}
                              >
                                {[
                                  {
                                    icon: (
                                      <VerifiedIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    ),
                                    label: "Status",
                                    value: branch.status || "Active",
                                  },
                                  {
                                    icon: (
                                      <LocationOnIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    ),
                                    label: "City",
                                    value: branch.city || "Not set",
                                  },
                                  {
                                    icon: (
                                      <HomeWorkIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    ),
                                    label: "Region",
                                    value: branch.district || "Not set",
                                  },
                                  {
                                    icon: (
                                      <LanguageIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    ),
                                    label: "Country",
                                    value: branch.country || "Not set",
                                  },
                                  {
                                    icon: (
                                      <EmailIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    ),
                                    label: "Email",
                                    value: branch.email || "Not set",
                                  },
                                  {
                                    icon: (
                                      <PhoneIcon
                                        color="secondary"
                                        fontSize="small"
                                      />
                                    ),
                                    label: "Phone",
                                    value: branch.phone_number || "Not set",
                                  },
                                ].map((item) => (
                                  <ListItem
                                    key={item.label}
                                    disableGutters
                                    sx={{
                                      py: 0.75,
                                      borderBottom: 1,
                                      borderColor: "divider",
                                      gap: 1,
                                    }}
                                  >
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={item.label}
                                      slotProps={{
                                        primary: {
                                          variant: "body2",
                                          color: "text.secondary",
                                        },
                                      }}
                                    />
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ textAlign: "right" }}
                                    >
                                      {item.value}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                              <Button
                                size="small"
                                variant="outlined"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() =>
                                  navigate(`/app/locations/${branch.id}`)
                                }
                                sx={{ mt: "auto" }}
                              >
                                Open
                              </Button>
                            </Stack>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={10}>
                <Stack spacing={2}>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={1.5}
                    sx={{
                      alignItems: { xs: "stretch", lg: "center" },
                      justifyContent: "space-between",
                      mt: -1.5,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        label="Search locations"
                        size="small"
                        value={reportFilters.locationSearch}
                        onChange={(event) =>
                          setReportFilters((current) => ({
                            ...current,
                            locationSearch: event.target.value,
                          }))
                        }
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Filter reports by date"
                                  edge="end"
                                  size="small"
                                  color={
                                    reportFilters.startDate ||
                                    reportFilters.endDate
                                      ? "secondary"
                                      : "default"
                                  }
                                  onClick={() => setReportDateFilterOpen(true)}
                                >
                                  <CalendarMonthIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                        fullWidth
                      />
                    </Box>
                    <Stack
                      direction="row"
                      spacing={1.25}
                      sx={{ alignItems: "center", justifyContent: "flex-end" }}
                    >
                      <Button
                        size="small"
                        startIcon={<RestartAltIcon fontSize="small" />}
                        onClick={() =>
                          setReportFilters({
                            locationSearch: "",
                            startDate: "",
                            endDate: "",
                          })
                        }
                        disabled={
                          !reportFilters.locationSearch &&
                          !reportFilters.startDate &&
                          !reportFilters.endDate
                        }
                      >
                        Reset
                      </Button>
                      {selectedReportMenu &&
                      selectedReportMenu !== allMinistryReportsMenuOption ? (
                        <Link
                          component="button"
                          type="button"
                          underline="none"
                          onClick={(event) =>
                            setReportsViewAnchor(event.currentTarget)
                          }
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.4,
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            lineHeight: 1.2,
                            "&:hover": { textDecoration: "none" },
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                          View
                          <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                        </Link>
                      ) : null}
                    </Stack>
                    <Menu
                      anchorEl={reportsViewAnchor}
                      open={Boolean(reportsViewAnchor)}
                      onClose={() => setReportsViewAnchor(null)}
                    >
                      {[
                        ["cards", "Reports Cards"],
                        ["locations", "Location Cards"],
                        ["report", "Report View"],
                      ].map(([value, label]) => (
                        <MenuItem
                          key={value}
                          selected={reportsView === value}
                          onClick={() => {
                            setReportsView(value as ReportsView);
                            setReportsViewAnchor(null);
                          }}
                        >
                          {label}
                        </MenuItem>
                      ))}
                    </Menu>
                    <Menu
                      id="report-card-actions-menu"
                      anchorEl={reportCardMenuAnchor}
                      anchorReference={
                        reportCardMenuPosition ? "anchorPosition" : "anchorEl"
                      }
                      anchorPosition={reportCardMenuPosition || undefined}
                      open={Boolean(reportCardMenuAnchor)}
                      onClose={closeReportCardMenu}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem
                        onClick={() => {
                          const card = reportCardMenuCard;
                          closeReportCardMenu();
                          if (card) {
                            setReportDetailsCard(card);
                          }
                        }}
                      >
                        <ListItemIcon>
                          <InfoIcon fontSize="small" />
                        </ListItemIcon>
                        Details
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          const card = reportCardMenuCard;
                          closeReportCardMenu();
                          if (card) {
                            openReportEditDialog(card);
                          }
                        }}
                      >
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        Modify
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          const card = reportCardMenuCard;
                          closeReportCardMenu();
                          if (card) {
                            openReportDeleteDialog(card);
                          }
                        }}
                      >
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        Delete
                      </MenuItem>
                    </Menu>
                  </Stack>
                  {selectedReportMenu ? (
                    <>
                      <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                        {activeReportsTitle}
                      </Typography>
                      {activeReportsView === "cards" ? (
                        filteredReportCards.length === 0 ? (
                          <EmptyState
                            title="No reports found"
                            message="Reports matching the current menu and filters will appear here."
                          />
                        ) : (
                          <Grid container spacing={2}>
                            {filteredReportCards.map((reportCard) => (
                              <Grid
                                key={
                                  reportCard.forwardedReport?.id ||
                                  `${reportCard.scheduleDate}-${reportCard.sourceTitle || location.title}`
                                }
                                size={{ xs: 12, sm: 6, lg: 4 }}
                              >
                                <ReportCard
                                  reportCard={reportCard}
                                  action={
                                    selectedReportMenu === "Local" &&
                                    canCreateForActiveTab &&
                                    reportCard.reports.length ? (
                                      <Button
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<ForwardToInboxIcon />}
                                        onClick={() =>
                                          openForwardReport(reportCard)
                                        }
                                        fullWidth
                                      >
                                        {location.is_hq &&
                                        !automaticReportReceiver
                                          ? "Save"
                                          : "Forward"}
                                      </Button>
                                    ) : selectedReportMenu === "Local" &&
                                      reportCard.forwardedReport ? (
                                      <IconButton
                                        size="small"
                                        color="secondary"
                                        aria-label="Report details"
                                        onClick={() =>
                                          setReportDetailsCard(reportCard)
                                        }
                                      >
                                        <InfoIcon fontSize="small" />
                                      </IconButton>
                                    ) : reportCard.forwardedReport?.status ===
                                        "Pending" && canApproveReportsForUi ? (
                                      <Stack
                                        direction="row"
                                        spacing={0.75}
                                        sx={{ alignItems: "center" }}
                                      >
                                        <Button
                                          size="small"
                                          variant="contained"
                                          color="secondary"
                                          startIcon={<VerifiedIcon />}
                                          onClick={() =>
                                            approveForwardedReport(
                                              reportCard.forwardedReport!,
                                            )
                                          }
                                          fullWidth
                                        >
                                          Approve
                                        </Button>
                                        <IconButton
                                          size="small"
                                          color="secondary"
                                          aria-label="Report details"
                                          onClick={() =>
                                            setReportDetailsCard(reportCard)
                                          }
                                        >
                                          <InfoIcon fontSize="small" />
                                        </IconButton>
                                      </Stack>
                                    ) : reportCard.forwardedReport ? (
                                      <IconButton
                                        size="small"
                                        color="secondary"
                                        aria-label="Report details"
                                        onClick={() =>
                                          setReportDetailsCard(reportCard)
                                        }
                                      >
                                        <InfoIcon fontSize="small" />
                                      </IconButton>
                                    ) : null
                                  }
                                  proofMeta={
                                    selectedReportMenu === "Local" &&
                                    reportCard.forwardedReport ? (
                                      <Chip
                                        size="small"
                                        color={
                                          idsEqual(
                                            reportCard.forwardedReport
                                              .source_location_id,
                                            reportCard.forwardedReport
                                              .target_location_id,
                                          )
                                            ? "default"
                                            : "success"
                                        }
                                        label={
                                          idsEqual(
                                            reportCard.forwardedReport
                                              .source_location_id,
                                            reportCard.forwardedReport
                                              .target_location_id,
                                          )
                                            ? "Saved"
                                            : "Forwarded"
                                        }
                                      />
                                    ) : null
                                  }
                                  menuAction={
                                    selectedReportMenu === "Local" &&
                                    canCreateForActiveTab &&
                                    reportCard.reports.length ? (
                                      <IconButton
                                        aria-label="Report actions"
                                        aria-controls={
                                          reportCardMenuCard === reportCard
                                            ? "report-card-actions-menu"
                                            : undefined
                                        }
                                        aria-haspopup="true"
                                        size="small"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          openReportCardMenu(event, reportCard);
                                        }}
                                      >
                                        <MoreVertIcon fontSize="small" />
                                      </IconButton>
                                    ) : null
                                  }
                                />
                              </Grid>
                            ))}
                          </Grid>
                        )
                      ) : null}
                      {activeReportsView === "locations" ? (
                        receivedReportLocationStats.length === 0 ? (
                          <EmptyState
                            title="No reporting locations"
                            message="Locations matching this report view will appear here."
                          />
                        ) : (
                          <Grid container spacing={2}>
                            {receivedReportLocationStats.map((item) => (
                              <Grid
                                key={item.location.id}
                                size={{ xs: 12, sm: 6, lg: 4 }}
                              >
                                <Paper
                                  variant="outlined"
                                  sx={{
                                    p: 2,
                                    pb: item.hasPendingReports ? 5 : 2,
                                    height: "100%",
                                    position: "relative",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 900 }}
                                  >
                                    {item.location.title ||
                                      `Location #${item.location.id}`}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {item.scheduleDateRange}
                                  </Typography>
                                  <List dense disablePadding sx={{ mt: 1.5 }}>
                                    <LocationReportStatListItem
                                      icon={
                                        <PendingActionsIcon
                                          color="warning"
                                          fontSize="small"
                                        />
                                      }
                                      label="Pending reports"
                                      value={item.pendingReports}
                                    />
                                    <LocationReportStatListItem
                                      icon={
                                        <VerifiedIcon
                                          color="success"
                                          fontSize="small"
                                        />
                                      }
                                      label="Approved reports"
                                      value={item.approved}
                                    />
                                    <LocationReportStatListItem
                                      icon={
                                        <RateReviewIcon
                                          color="warning"
                                          fontSize="small"
                                        />
                                      }
                                      label="Pending approvals"
                                      value={item.pending}
                                    />
                                  </List>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 900, mt: 1.5 }}
                                  >
                                    Average Weekly
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Based on {item.weekCount.toLocaleString()}{" "}
                                    week{item.weekCount === 1 ? "" : "s"}
                                  </Typography>
                                  <List dense disablePadding sx={{ mt: 0.75 }}>
                                    <LocationReportStatListItem
                                      icon={
                                        <GroupsIcon
                                          color="secondary"
                                          fontSize="small"
                                        />
                                      }
                                      label="Attendance"
                                      value={item.averageAttendance}
                                    />
                                    <LocationReportStatListItem
                                      icon={
                                        <AttachMoneyIcon
                                          color="secondary"
                                          fontSize="small"
                                        />
                                      }
                                      label="Collections"
                                      value={item.averageCollections}
                                    />
                                    <LocationReportStatListItem
                                      icon={
                                        <PaidIcon
                                          color="secondary"
                                          fontSize="small"
                                        />
                                      }
                                      label="Remissions"
                                      value={item.averageRemissions}
                                    />
                                  </List>
                                  {item.hasPendingReports ? (
                                    <Tooltip title="Pending report schedules">
                                      <IconButton
                                        aria-label={`Pending report schedules for ${
                                          item.location.title ||
                                          `Location #${item.location.id}`
                                        }`}
                                        color="warning"
                                        size="small"
                                        onClick={() =>
                                          void openPendingReportDetails(
                                            item.location,
                                          )
                                        }
                                        sx={{
                                          position: "absolute",
                                          right: 10,
                                          bottom: 10,
                                          border: 1,
                                          borderColor: "divider",
                                          bgcolor: "background.paper",
                                          "&:hover": {
                                            bgcolor: "action.hover",
                                          },
                                        }}
                                      >
                                        <HelpOutlinedIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  ) : null}
                                </Paper>
                              </Grid>
                            ))}
                          </Grid>
                        )
                      ) : null}
                      {activeReportsView === "report" ? (
                        receivedReportPdfRows.length === 0 ? (
                          <EmptyState
                            title="No reports to print"
                            message="The report preview will appear after reports are available."
                          />
                        ) : (
                          <Stack spacing={1.5}>
                              <MobilePdfViewer
                                document={
                                  <ReceivedReportsDocument
                                    title={receivedReportsPdfTitle}
                                    locationTitle={location.title}
                                    collectionColumns={
                                      receivedReportCollectionColumns
                                    }
                                    remissionColumns={
                                      receivedReportRemissionColumns
                                    }
                                    rows={receivedReportPdfRows}
                                  />
                                }
                                fileName={receivedReportsPdfFileName}
                                onExportExcel={exportReceivedReportsExcel}
                              />
                          </Stack>
                        )
                      ) : null}
                    </>
                  ) : (
                    <EmptyState
                      title="Select a reports menu"
                      message="Choose Local, Received, or All Ministry Reports from the Reports dropdown."
                    />
                  )}
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={12}>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, lg: 7 }}>
                    <Paper variant="outlined" sx={{ p: 2.5 }}>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 900 }}>
                            Location Subscription
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Choose a package and decide whether this location,
                            HQ, or another ministry location manages billing.
                          </Typography>
                        </Box>
                        {subscriptionError ? (
                          <Alert severity="error">{subscriptionError}</Alert>
                        ) : null}
                        <Grid container spacing={1.5}>
                          {subscriptions.map((subscription) => {
                            const selected =
                              subscriptionForm.subscription_id ===
                              subscription.id;
                            return (
                              <Grid
                                key={subscription.id}
                                size={{ xs: 12, md: 4 }}
                              >
                                <Paper
                                  variant="outlined"
                                  onClick={() =>
                                    setSubscriptionForm((current) => ({
                                      ...current,
                                      subscription_id: subscription.id,
                                    }))
                                  }
                                  sx={{
                                    p: 2,
                                    height: "100%",
                                    cursor: "pointer",
                                    borderColor: selected
                                      ? "primary.main"
                                      : "divider",
                                    bgcolor: selected
                                      ? "action.selected"
                                      : "background.paper",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 900 }}
                                  >
                                    {subscription.title}
                                  </Typography>
                                  <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 900, mt: 1 }}
                                  >
                                    {Number(
                                      subscription.rate || 0,
                                    ).toLocaleString()}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {subscription.rate_frequency || "Monthly"}
                                  </Typography>
                                  <List dense disablePadding sx={{ mt: 1.5 }}>
                                    {[
                                      [
                                        "Locations",
                                        subscription.number_of_locations,
                                      ],
                                      [
                                        "Members",
                                        subscription.location_members,
                                      ],
                                      [
                                        "CashBooks",
                                        subscription.location_cashbooks,
                                      ],
                                      [
                                        "Missional Families",
                                        subscription.small_groups,
                                      ],
                                    ].map(([label, value]) => (
                                      <ListItem
                                        key={label}
                                        disableGutters
                                        sx={{ py: 0.25 }}
                                      >
                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                          <CheckIcon
                                            color="secondary"
                                            fontSize="small"
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={`${label}: ${value}`}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Paper>
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Autocomplete
                          options={subscriptionManagerOptions}
                          value={
                            subscriptionManagerOptions.find((item) =>
                              idsEqual(
                                item.id,
                                subscriptionForm.managed_by_location_id,
                              ),
                            ) || null
                          }
                          onChange={(_, value) =>
                            setSubscriptionForm((current) => ({
                              ...current,
                              managed_by_location_id: value?.id || "",
                              managed_by_hq: Boolean(value?.is_hq),
                            }))
                          }
                          getOptionLabel={(item) =>
                            `${item.title || "Location"}${item.is_hq ? " (HQ)" : ""}`
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Managed By"
                              fullWidth
                            />
                          )}
                        />
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                        >
                          <TextField
                            select
                            label="Billing Frequency"
                            value={subscriptionForm.billing_frequency}
                            onChange={(event) =>
                              setSubscriptionForm((current) => ({
                                ...current,
                                billing_frequency: event.target.value,
                              }))
                            }
                            fullWidth
                          >
                            {["Monthly", "Quarterly", "Annual"].map(
                              (option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ),
                            )}
                          </TextField>
                          <TextField
                            select
                            label="Status"
                            value={subscriptionForm.status}
                            onChange={(event) =>
                              setSubscriptionForm((current) => ({
                                ...current,
                                status: event.target.value,
                              }))
                            }
                            fullWidth
                          >
                            {["Active", "Trial", "Paused", "Cancelled"].map(
                              (option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ),
                            )}
                          </TextField>
                        </Stack>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                        >
                          <TextField
                            type="date"
                            label="Start Date"
                            value={subscriptionForm.start_date}
                            onChange={(event) =>
                              setSubscriptionForm((current) => ({
                                ...current,
                                start_date: event.target.value,
                              }))
                            }
                            slotProps={{ inputLabel: { shrink: true } }}
                            fullWidth
                          />
                          <TextField
                            type="date"
                            label="Renewal Date"
                            value={subscriptionForm.renewal_date}
                            onChange={(event) =>
                              setSubscriptionForm((current) => ({
                                ...current,
                                renewal_date: event.target.value,
                              }))
                            }
                            slotProps={{ inputLabel: { shrink: true } }}
                            fullWidth
                          />
                        </Stack>
                        <TextField
                          label="Notes"
                          value={subscriptionForm.notes}
                          onChange={(event) =>
                            setSubscriptionForm((current) => ({
                              ...current,
                              notes: event.target.value,
                            }))
                          }
                          multiline
                          minRows={3}
                          fullWidth
                        />
                        <Button
                          variant="contained"
                          onClick={saveLocationSubscription}
                          disabled={
                            subscriptionSaving ||
                            !subscriptionForm.subscription_id
                          }
                        >
                          {subscriptionSaving
                            ? "Saving..."
                            : "Save Subscription"}
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, lg: 5 }}>
                    <Paper variant="outlined" sx={{ p: 2.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
                        Current Assignment
                      </Typography>
                      {locationSubscriptions.length ? (
                        locationSubscriptions.map((assignment) => (
                          <List
                            key={assignment.id}
                            dense
                            disablePadding
                            sx={{
                              border: 1,
                              borderColor: "divider",
                              borderRadius: 1,
                              overflow: "hidden",
                            }}
                          >
                            {[
                              [
                                "Package",
                                assignment.subscription_title || "Not set",
                              ],
                              [
                                "Managed By",
                                assignment.managed_by_location_title ||
                                  "This location",
                              ],
                              ["Status", assignment.status || "Active"],
                              [
                                "Billing",
                                assignment.billing_frequency || "Monthly",
                              ],
                              ["Renewal", assignment.renewal_date || "Not set"],
                            ].map(([label, value]) => (
                              <ListItem key={label} divider>
                                <ListItemText
                                  primary={label}
                                  secondary={value}
                                />
                              </ListItem>
                            ))}
                          </List>
                        ))
                      ) : (
                        <EmptyState
                          title="No subscription assigned"
                          message="Select a package to activate subscription management for this location."
                        />
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={Boolean(pendingReportDetailsDialog)}
        onClose={() => setPendingReportDetailsDialog(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {pendingReportDetailsDialog?.locationTitle || "Location"} Pending
          Reports
        </DialogTitle>
        <DialogContent>
          {pendingReportDetailsDialog?.loading ? (
            <List
              dense
              disablePadding
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                mt: 1,
                overflow: "hidden",
              }}
            >
              {[0, 1, 2, 3].map((item) => (
                <ListItem
                  key={item}
                  divider={item < 3}
                  sx={{ alignItems: "center", py: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 34 }}>
                    <Skeleton variant="circular" width={20} height={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Skeleton variant="text" width="58%" />}
                    secondary={<Skeleton variant="text" width="36%" />}
                  />
                </ListItem>
              ))}
            </List>
          ) : pendingReportDetailsDialog?.pending.length ? (
            <List
              dense
              disablePadding
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                mt: 1,
                overflow: "hidden",
              }}
            >
              {pendingReportDetailsDialog.pending.map((pendingItem, index) => (
                <ListItem
                  key={`${pendingItem.scheduleDate}-${pendingItem.scheduleType}-${
                    pendingItem.scheduleId || index
                  }`}
                  divider={
                    index < pendingReportDetailsDialog.pending.length - 1
                  }
                  sx={{ py: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 34 }}>
                    <CancelOutlinedIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${pendingItem.scheduleDate} - ${pendingItem.scheduleType}`}
                    secondary={
                      [pendingItem.scheduleTitle, pendingItem.recurrence]
                        .filter(Boolean)
                        .join(" - ") || undefined
                    }
                    slotProps={{
                      primary: {
                        variant: "body2",
                        sx: { fontWeight: 700 },
                      },
                      secondary: { variant: "caption" },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <EmptyState
              title="No pending reports"
              message="This location has no pending report schedules."
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setPendingReportDetailsDialog(null)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={reportDateFilterOpen}
        onClose={() => setReportDateFilterOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Filter Dates</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <DatePicker
                label="Start Date"
                value={toPickerValue(reportFilters.startDate)}
                onChange={(value) =>
                  setReportFilters((current) => ({
                    ...current,
                    startDate: fromPickerValue(value),
                  }))
                }
                disableFuture
                maxDate={toPickerValue(reportFilters.endDate) || undefined}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DatePicker
                label="End Date"
                value={toPickerValue(reportFilters.endDate)}
                onChange={(value) =>
                  setReportFilters((current) => ({
                    ...current,
                    endDate: fromPickerValue(value),
                  }))
                }
                disableFuture
                minDate={toPickerValue(reportFilters.startDate) || undefined}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setReportFilters((current) => ({
                ...current,
                startDate: "",
                endDate: "",
              }))
            }
          >
            Clear Dates
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setReportDateFilterOpen(false)}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(reportDetailsCard)}
        onClose={() => setReportDetailsCard(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Report Details</DialogTitle>
        <DialogContent>
          {reportDetailsCard ? (
            <Stack spacing={2.25} sx={{ pt: 1 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                  {reportDetailsCard.sourceTitle ||
                    location.title ||
                    "Location"}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {reportDetailsCard.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {reportCardScheduleDateRange(reportDetailsCard)}
                </Typography>
              </Box>
              <Paper variant="outlined" sx={{ p: 1.5 }}>
                <Stack spacing={0.75}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    Collections
                  </Typography>
                  <List dense disablePadding>
                    {[
                      `${reportDetailsCard.collectionParticularCount.toLocaleString()} out of ${reportDetailsCard.collectionTotalCount.toLocaleString()} collections aggregated`,
                      `${Math.max(reportDetailsCard.collectionTotalCount - reportDetailsCard.missingCollectionScheduleCount, 0).toLocaleString()} out of ${reportDetailsCard.collectionTotalCount.toLocaleString()} schedule collections recorded`,
                    ].map((item) => (
                      <ListItem
                        key={item}
                        disableGutters
                        divider
                        sx={{ py: 0.75, "&:last-of-type": { borderBottom: 0 } }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon color="secondary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          slotProps={{ primary: { variant: "body2" } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Paper>
              <Paper variant="outlined" sx={{ p: 1.5 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    Schedules
                  </Typography>
                  <List dense disablePadding>
                    {reportDetailsCard.scheduleSummaries.length ? (
                      reportDetailsCard.scheduleSummaries.map((schedule) => (
                        <ListItem
                          key={schedule.id}
                          disableGutters
                          divider
                          secondaryAction={
                            <Typography variant="body2">
                              {schedule.collectionCount.toLocaleString()}
                            </Typography>
                          }
                          sx={{
                            py: 0.75,
                            "&:last-of-type": { borderBottom: 0 },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleIcon
                              color="secondary"
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={schedule.label}
                            slotProps={{ primary: { variant: "body2" } }}
                            sx={{ pr: 4 }}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem disableGutters sx={{ py: 0.75 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon color="disabled" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="No schedules"
                          slotProps={{ primary: { variant: "body2" } }}
                        />
                      </ListItem>
                    )}
                  </List>
                </Stack>
              </Paper>
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setReportDetailsCard(null)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={attendanceMenuAnchor}
        open={Boolean(attendanceMenuAnchor)}
        onClose={closeAttendanceMenu}
      >
        <MenuItem onClick={openAttendanceEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            requestDeleteConfirmation(
              "Delete Attendance?",
              "This will permanently delete the selected attendance record.",
              () => deleteSelectedAttendance(),
            )
          }
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={attendanceEditOpen}
        onClose={() => setAttendanceEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Attendance</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {attendanceEditError ? (
                <Alert severity="error">{attendanceEditError}</Alert>
              ) : null}
              <DatePicker
                label="Schedule Date"
                value={toPickerValue(attendanceEditForm.date)}
                onChange={(value) =>
                  setAttendanceEditForm((current) => ({
                    ...current,
                    date: fromPickerValue(value),
                    schedule_id: "",
                  }))
                }
                disableFuture
                shouldDisableDate={(day) =>
                  disableFutureSchedulePickerDay(day, schedules)
                }
                slots={{ day: renderAttendanceEditDay }}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <TextField
                select
                label="Schedule"
                value={attendanceEditForm.schedule_id}
                onChange={(event) =>
                  setAttendanceEditForm((current) => ({
                    ...current,
                    schedule_id: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="">Select schedule</MenuItem>
                {attendanceSchedulesForEditDate.map((schedule) => (
                  <MenuItem key={schedule.id} value={schedule.id}>
                    {scheduleLabel(schedule)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                type="number"
                label="Total"
                value={attendanceEditForm.total_attendance}
                onChange={(event) =>
                  setAttendanceEditForm((current) => ({
                    ...current,
                    total_attendance: event.target.value,
                  }))
                }
                fullWidth
                slotProps={{ htmlInput: { min: 0 } }}
              />
              <TextField
                label="Remarks"
                value={attendanceEditForm.remarks}
                onChange={(event) =>
                  setAttendanceEditForm((current) => ({
                    ...current,
                    remarks: event.target.value,
                  }))
                }
                multiline
                minRows={3}
                fullWidth
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setAttendanceEditOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => void saveAttendanceEdit()}
            disabled={
              !attendanceEditForm.date || !attendanceEditForm.schedule_id
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={mfAttendanceEditOpen}
        onClose={() => setMfAttendanceEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Missional Attendance</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {attendanceEditError ? (
                <Alert severity="error">{attendanceEditError}</Alert>
              ) : null}
              <TextField
                select
                label="Missional Family"
                value={mfAttendanceEditForm.sg_id}
                onChange={(event) =>
                  setMfAttendanceEditForm((current) => ({
                    ...current,
                    sg_id: event.target.value,
                    schedule_id: "",
                  }))
                }
                fullWidth
              >
                {missionalFamilies.map((family) => (
                  <MenuItem key={family.id} value={family.id}>
                    {family.title || `Missional Family #${family.id}`}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                label="Schedule Date"
                value={toPickerValue(mfAttendanceEditForm.adate)}
                onChange={(value) =>
                  setMfAttendanceEditForm((current) => ({
                    ...current,
                    adate: fromPickerValue(value),
                    schedule_id: "",
                  }))
                }
                disableFuture
                shouldDisableDate={(day) =>
                  disableFutureSchedulePickerDay(day, schedules)
                }
                slots={{ day: renderMfAttendanceEditDay }}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <TextField
                select
                label="Schedule"
                value={mfAttendanceEditForm.schedule_id}
                onChange={(event) =>
                  setMfAttendanceEditForm((current) => ({
                    ...current,
                    schedule_id: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="">Select schedule</MenuItem>
                {mfAttendanceSchedulesForEditDate.map((schedule) => (
                  <MenuItem key={schedule.id} value={schedule.id}>
                    {scheduleLabel(schedule)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                type="number"
                label="Total"
                value={mfAttendanceEditForm.total_number}
                onChange={(event) =>
                  setMfAttendanceEditForm((current) => ({
                    ...current,
                    total_number: event.target.value,
                  }))
                }
                fullWidth
                slotProps={{ htmlInput: { min: 0 } }}
              />
              <TextField
                label="Remarks"
                value={mfAttendanceEditForm.remarks}
                onChange={(event) =>
                  setMfAttendanceEditForm((current) => ({
                    ...current,
                    remarks: event.target.value,
                  }))
                }
                multiline
                minRows={3}
                fullWidth
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setMfAttendanceEditOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => void saveMfAttendanceEdit()}
            disabled={
              !mfAttendanceEditForm.adate ||
              !mfAttendanceEditForm.sg_id ||
              !mfAttendanceEditForm.schedule_id
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(reportDeleteCard)}
        onClose={closeReportDeleteDialog}
        aria-labelledby="delete-report-dialog-title"
        aria-describedby="delete-report-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="delete-report-dialog-title">Delete Report</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {reportDeleteError ? (
              <Alert severity="error">{reportDeleteError}</Alert>
            ) : null}
            <Alert severity="warning" id="delete-report-dialog-description">
              This will delete {reportDeleteCard?.title || "this draft report"}.
              This action cannot be undone.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeReportDeleteDialog}
            disabled={reportDeleteSaving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => void deleteDraftReportCard()}
            disabled={reportDeleteSaving}
          >
            {reportDeleteSaving ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={reportSettingsOpen}
        onClose={() => setReportSettingsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Report Settings</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {reportSettingsError ? (
                <Alert severity="error">{reportSettingsError}</Alert>
              ) : null}
              {location.is_hq ? (
                <Autocomplete
                  options={reportReceiverOptions}
                  value={
                    reportReceiverOptions.find((item) =>
                      idsEqual(
                        item.id,
                        reportSettingsForm.report_receiver_location_id,
                      ),
                    ) || null
                  }
                  onChange={(_, option) =>
                    setReportSettingsForm((current) => ({
                      ...current,
                      report_receiver_location_id: option?.id || "",
                    }))
                  }
                  getOptionLabel={(option) =>
                    option.title || `Location #${option.id}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Forward HQ reports to"
                      helperText="Leave blank when the HQ should keep reports locally."
                      fullWidth
                    />
                  )}
                  fullWidth
                />
              ) : null}
              <DatePicker
                label="Reporting Start Date"
                value={toPickerValue(reportSettingsForm.reporting_start_date)}
                onChange={(value) =>
                  setReportSettingsForm((current) => ({
                    ...current,
                    reporting_start_date: fromPickerValue(value),
                  }))
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
              <Autocomplete
                multiple
                options={dynamicScheduleTypeOptions}
                value={reportSettingsForm.mandatory_report_schedule_types}
                onChange={(_, value) =>
                  setReportSettingsForm((current) => ({
                    ...current,
                    mandatory_report_schedule_types: value,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Mandatory schedule types from branches"
                    fullWidth
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setReportSettingsOpen(false)}
            disabled={reportSettingsSaving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={saveReportSettings}
            disabled={reportSettingsSaving}
          >
            {reportSettingsSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={financialReportMenuAnchor}
        open={Boolean(financialReportMenuAnchor)}
        onClose={() => setFinancialReportMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            if (selectedFinancialReport) {
              openFinancialReportEdit(selectedFinancialReport);
            }
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedFinancialReport) {
              requestDeleteConfirmation(
                "Delete Financial Report?",
                `This will permanently delete ${selectedFinancialReport.title || "this financial report"}.`,
                () => deleteFinancialReport(selectedFinancialReport),
              );
            }
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={forwardReportOpen}
        onClose={() => setForwardReportOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {idsEqual(forwardTargetLocationId, location.id)
            ? "Save Aggregated Report"
            : "Report Summary"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {forwardReportError ? (
              <Alert severity="error">{forwardReportError}</Alert>
            ) : null}
            {forwardReportSuccess ? (
              <Alert severity="success">{forwardReportSuccess}</Alert>
            ) : null}
            {forwardReportCard ? (
              <Paper variant="outlined" sx={{ overflow: "hidden" }}>
                <List disablePadding>
                  {[
                    {
                      label: "Date",
                      value: forwardReportCard.scheduleDate,
                    },
                    {
                      label: "Type",
                      value:
                        forwardReportCard.scheduleTypes.join(", ") ||
                        "General",
                    },
                    {
                      label: "Attendance",
                      value: forwardReportCard.attendanceTotal.toLocaleString(),
                    },
                    {
                      label: "Collections",
                      value: forwardReportCard.particularsTotal.toLocaleString(),
                    },
                    {
                      label: "Remissions",
                      value: forwardReportCard.remissionsTotal.toLocaleString(),
                    },
                  ].map((item, index) => (
                    <ListItem
                      key={item.label}
                      secondaryAction={
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.primary",
                            fontWeight: 700,
                            textAlign: "right",
                          }}
                        >
                          {item.value}
                        </Typography>
                      }
                      sx={{
                        borderBottom: index === 4 ? 0 : "1px solid",
                        borderColor: "divider",
                        py: 1.25,
                        pr: 16,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="secondary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            color: "text.secondary",
                            variant: "body2",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ) : null}
            {isHqSelfSaveWithoutReceiver ? (
              <Button
                variant="contained"
                onClick={forwardLocationReport}
                disabled={
                  forwardReportSaving ||
                  Boolean(forwardReportSuccess) ||
                  !forwardTargetLocationId
                }
                sx={{ alignSelf: "flex-start" }}
              >
                {forwardReportSaving ? "Forwarding..." : "Save"}
              </Button>
            ) : null}
            {forwardProofAttachment ? (
              <Box
                component="img"
                src={forwardProofAttachment}
                alt="Forwarding proof"
                sx={{
                  maxHeight: 220,
                  objectFit: "contain",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              />
            ) : null}
            {!idsEqual(forwardTargetLocationId, location.id) ? (
              <Button
                variant="outlined"
                component="label"
                sx={{ alignSelf: "flex-start" }}
              >
                {forwardProofAttachment ? "Change" : "Add Screenshot Proof"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    void handleForwardProofChange(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </Button>
            ) : null}
            {isHqSelfSaveWithoutReceiver ? (
              <Alert severity="info">
                Sending to: {location.title || "HQ location"}
              </Alert>
            ) : (
              <Alert
                severity={
                  idsEqual(forwardTargetLocationId, location.id) ||
                  automaticReportReceiver
                    ? "info"
                    : "warning"
                }
              >
                Sending to: {forwardReceivingLocationLabel}
              </Alert>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setForwardReportOpen(false)}
            disabled={forwardReportSaving}
          >
            Cancel
          </Button>
          {!isHqSelfSaveWithoutReceiver ? (
            <Button
              variant="contained"
              onClick={forwardLocationReport}
              disabled={
                forwardReportSaving ||
                Boolean(forwardReportSuccess) ||
                !forwardTargetLocationId ||
                (!idsEqual(forwardTargetLocationId, location.id) &&
                  !forwardProofAttachment)
              }
            >
              {forwardReportSaving
                ? "Forwarding..."
                : idsEqual(forwardTargetLocationId, location.id)
                  ? "Save"
                  : "Forward"}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(proofPreview)}
        onClose={() => setProofPreview(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{proofPreview?.title || "Report Proof"}</DialogTitle>
        <DialogContent>
          {proofPreview ? (
            <Box
              component="img"
              src={proofPreview.image}
              alt="Report proof"
              sx={{
                width: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                display: "block",
                borderRadius: 1,
              }}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setProofPreview(null)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(financialReportEdit)}
        onClose={() => setFinancialReportEdit(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Collections Report</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {financialReportError ? (
              <Alert severity="error">{financialReportError}</Alert>
            ) : null}
            <TextField
              label="Collection"
              value={financialReportEditForm.particular_id}
              onChange={(event) =>
                updateFinancialReportEditForm({
                  particular_id: event.target.value,
                })
              }
              select
              fullWidth
            >
              <MenuItem value="">No collection</MenuItem>
              {locationParticulars.map((particular) => (
                <MenuItem
                  key={particular.particular_id}
                  value={particular.particular_id}
                >
                  {particular.title}
                </MenuItem>
              ))}
            </TextField>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Collection Value"
                type="number"
                value={financialReportEditForm.value}
                onChange={(event) =>
                  handleFinancialReportEditValueChange(event.target.value)
                }
                fullWidth
              />
              <TextField
                label="Remission Type"
                value={financialReportEditForm.remission_id}
                onChange={(event) =>
                  handleFinancialReportEditRemissionChange(event.target.value)
                }
                select
                fullWidth
              >
                <MenuItem value="">None</MenuItem>
                {locationRemissions.map((remission) => (
                  <MenuItem key={remission.id} value={remission.id}>
                    {remission.title || `Remission #${remission.id}`} (
                    {Number(remission.percentage || 0)}%)
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Total"
                type="number"
                value={financialReportEditForm.remission_value}
                slotProps={{ input: { readOnly: true } }}
                fullWidth
              />
              <TextField
                label="Status"
                value={financialReportEditForm.status}
                select
                fullWidth
                slotProps={{ input: { readOnly: true } }}
              >
                <MenuItem value="Draft">Draft</MenuItem>
              </TextField>
            </Stack>
            <Autocomplete
              options={reportReceiverOptions}
              value={selectedFinancialReportReceiver}
              onChange={(_, value) =>
                updateFinancialReportEditForm({
                  receiver_location_id: value?.id || "",
                })
              }
              getOptionLabel={(item) => item.title || `Location #${item.id}`}
              isOptionEqualToValue={(option, value) =>
                idsEqual(option.id, value.id)
              }
              renderInput={(params) => (
                <TextField {...params} label="Receiver Location" fullWidth />
              )}
              fullWidth
            />
            <TextField
              label="Description"
              value={financialReportEditForm.description}
              onChange={(event) =>
                updateFinancialReportEditForm({
                  description: event.target.value,
                })
              }
              multiline
              minRows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setFinancialReportEdit(null)}
            disabled={financialReportSaving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={saveFinancialReportEdit}
            disabled={financialReportSaving}
          >
            {financialReportSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={zoneMenuAnchor}
        open={Boolean(zoneMenuAnchor)}
        onClose={closeZoneMenu}
      >
        <MenuItem onClick={openMissionalFamilyForZone}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Add Missional Family
        </MenuItem>
        <MenuItem onClick={openZoneEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            requestDeleteConfirmation(
              "Delete Zone?",
              `This will permanently delete ${selectedZone?.title || "this zone"}.`,
              () => deleteSelectedZone(),
            )
          }
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={zoneEditOpen}
        onClose={() => setZoneEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Zone</DialogTitle>
        <DialogContent>
          {zoneEditError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {zoneEditError}
            </Alert>
          ) : null}
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Zone Name"
              value={zoneEditForm.title}
              onChange={(event) =>
                setZoneEditForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={zoneEditForm.description}
              onChange={(event) =>
                setZoneEditForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              multiline
              minRows={3}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Leader"
                value={zoneEditForm.leader1_id}
                onChange={(event) =>
                  setZoneEditForm((current) => ({
                    ...current,
                    leader1_id: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="">Not assigned</MenuItem>
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.user_id || ""}>
                    {memberName(
                      accounts,
                      member.user_id,
                      member.user_display_name,
                    )}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Assistant"
                value={zoneEditForm.leader2_id}
                onChange={(event) =>
                  setZoneEditForm((current) => ({
                    ...current,
                    leader2_id: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="">Not assigned</MenuItem>
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.user_id || ""}>
                    {memberName(
                      accounts,
                      member.user_id,
                      member.user_display_name,
                    )}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setZoneEditOpen(false)}
            disabled={zoneEditSaving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => void saveZoneEdit()}
            disabled={zoneEditSaving || !zoneEditForm.title.trim()}
          >
            {zoneEditSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={familyMenuAnchor}
        open={Boolean(familyMenuAnchor)}
        onClose={closeFamilyMenu}
      >
        <MenuItem onClick={openSelectedFamilyAttendance}>
          <ListItemIcon>
            <ChecklistIcon fontSize="small" />
          </ListItemIcon>
          Record Attendance
        </MenuItem>
        <MenuItem onClick={openSelectedFamilyMembers}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Add Member
        </MenuItem>
        <MenuItem onClick={openFamilyEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            requestDeleteConfirmation(
              "Delete Missional Family?",
              `This will permanently delete ${selectedFamily?.title || "this missional family"}.`,
              () => deleteSelectedFamily(),
            )
          }
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={memberActionAnchor}
        anchorReference={memberActionPosition ? "anchorPosition" : "anchorEl"}
        anchorPosition={memberActionPosition || undefined}
        open={Boolean(memberActionAnchor)}
        onClose={closeMemberActionMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={openSelectedLocationMemberDetails}>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          Details
        </MenuItem>
        {isLocationManagerForUi ? (
          <MenuItem onClick={openSelectedLocationMemberEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
        ) : null}
        {isLocationManagerForUi ? (
          <MenuItem
            onClick={() =>
              requestDeleteConfirmation(
                "Delete Member?",
                "This will remove the selected member from this location.",
                () => deleteSelectedLocationMember(),
              )
            }
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        ) : null}
      </Menu>
      <Dialog
        open={memberDetailsOpen}
        onClose={closeSelectedLocationMemberDetails}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {memberName(
            accounts,
            selectedMemberAction?.user_id,
            selectedMemberAction?.user_display_name,
          )}
        </DialogTitle>
        <DialogContent>
          <List
            dense
            disablePadding
            sx={{
              mt: 1,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            {[
              ["Audience", selectedMemberAction?.audience || "Physical"],
              ["Status", selectedMemberAction?.status || "Active"],
              ["Gender", selectedMemberAccount?.gender || "Not set"],
              [
                "Marital Status",
                selectedMemberAccount?.marital_status || "Not set",
              ],
              ["Occupation", selectedMemberAccount?.occupation || "Not set"],
              ["Country", selectedMemberAccount?.country || "Not set"],
              ["Region", selectedMemberAccount?.district || "Not set"],
              ["City", selectedMemberAccount?.city || "Not set"],
            ].map(([label, value]) => (
              <MemberInfoRow key={label} label={label} value={value} />
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={closeSelectedLocationMemberDetails}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={roleActionAnchor}
        open={Boolean(roleActionAnchor)}
        onClose={closeRoleActionMenu}
      >
        {selectedRoleAction &&
        (selectedRoleAction.cashbook_id
          ? editableCashbookRoleNames.has(selectedRoleAction.role || "")
          : editableLocationRoleNames.has(selectedRoleAction.role || "")) ? (
          [
            <MenuItem key="edit" onClick={openSelectedLocationRoleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>,
            <MenuItem
              key="delete"
              onClick={() =>
                requestDeleteConfirmation(
                  "Delete Role?",
                  "This will remove the selected role assignment.",
                  () => deleteSelectedLocationRole(),
                )
              }
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>,
          ]
        ) : (
          <Box sx={{ px: 2, py: 1.5, maxWidth: 280 }}>
            <Typography variant="body2" color="text.secondary">
              This role is managed where its resource assignment is made.
            </Typography>
          </Box>
        )}
      </Menu>
      <Menu
        anchorEl={branchActionAnchor}
        open={Boolean(branchActionAnchor)}
        onClose={closeBranchActionMenu}
      >
        <MenuItem
          onClick={() => {
            if (selectedBranchAction?.id)
              navigate(`/app/locations/${selectedBranchAction.id}`);
            closeBranchActionMenu();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            requestDeleteConfirmation(
              "Delete Branch?",
              `This will permanently delete ${selectedBranchAction?.title || "this branch"}.`,
              () => deleteSelectedBranch(),
            )
          }
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={memberEditOpen}
        onClose={() => setMemberEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Box
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                readMemberEditProfilePicture(event.dataTransfer.files?.[0]);
              }}
              sx={{
                border: 1,
                borderStyle: "dashed",
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                bgcolor: "action.hover",
              }}
            >
              <Avatar
                src={
                  memberEditForm.profile_picture || defaultProfilePictureAsset
                }
                variant="rounded"
                sx={{
                  width: 92,
                  height: 92,
                  borderRadius: 1.5,
                  bgcolor: "background.paper",
                }}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                  Profile Picture
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Drag an image here or choose one from your device.
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        readMemberEditProfilePicture(event.target.files?.[0])
                      }
                    />
                  </Button>
                  {memberEditForm.profile_picture ? (
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() =>
                        setMemberEditForm((current) => ({
                          ...current,
                          profile_picture: "",
                        }))
                      }
                    >
                      Remove
                    </Button>
                  ) : null}
                </Stack>
              </Box>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="First Name"
                value={memberEditForm.fname}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    fname: event.target.value,
                  }))
                }
                required
                fullWidth
              />
              <TextField
                label="Last Name"
                value={memberEditForm.lname}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    lname: event.target.value,
                  }))
                }
                required
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Email"
                value={memberEditForm.email}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={memberEditForm.phone_number}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    phone_number: event.target.value,
                  }))
                }
                required
                fullWidth
              />
            </Stack>
            <TextField
              select
              label="Audience"
              value={memberEditForm.audience}
              onChange={(event) =>
                setMemberEditForm((current) => ({
                  ...current,
                  audience: event.target.value,
                }))
              }
              fullWidth
            >
              {["Physical", "Online"].map((audience) => (
                <MenuItem key={audience} value={audience}>
                  {audience}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              value={memberEditForm.status}
              onChange={(event) =>
                setMemberEditForm((current) => ({
                  ...current,
                  status: event.target.value,
                }))
              }
              fullWidth
            >
              {["Active", "Inactive"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Gender"
                select
                value={memberEditForm.gender}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    gender: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="">Not set</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
              <TextField
                label="Marital Status"
                select
                value={memberEditForm.marital_status}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    marital_status: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="">Not set</MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Widow">Widow</MenuItem>
                <MenuItem value="Widowar">Widowar</MenuItem>
              </TextField>
            </Stack>
            <TextField
              label="Occupation"
              value={memberEditForm.occupation}
              onChange={(event) =>
                setMemberEditForm((current) => ({
                  ...current,
                  occupation: event.target.value,
                }))
              }
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Country"
                value={memberEditForm.country}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    country: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Region"
                value={memberEditForm.district}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    district: event.target.value,
                  }))
                }
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="City"
                value={memberEditForm.city}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    city: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Address"
                value={memberEditForm.address}
                onChange={(event) =>
                  setMemberEditForm((current) => ({
                    ...current,
                    address: event.target.value,
                  }))
                }
                fullWidth
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMemberEditOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => void saveSelectedLocationMember()}
            disabled={
              !memberEditForm.fname.trim() ||
              !memberEditForm.lname.trim() ||
              !memberEditForm.phone_number.trim()
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={roleEditOpen}
        onClose={() => setRoleEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Person"
              value={
                selectedRoleAction?.user_display_name ||
                memberName(accounts, selectedRoleAction?.user_id) ||
                "Not set"
              }
              fullWidth
              slotProps={{ input: { readOnly: true } }}
            />
            {selectedRoleAction?.cashbook_id ? (
              <TextField
                label="Cashbook"
                value={
                  selectedRoleAction.cashbook_title ||
                  `Cashbook #${selectedRoleAction.cashbook_id}`
                }
                fullWidth
                slotProps={{ input: { readOnly: true } }}
              />
            ) : null}
            <TextField
              select
              label="Role"
              value={roleEditForm.role}
              onChange={(event) =>
                setRoleEditForm((current) => ({
                  ...current,
                  role: event.target.value,
                  title: current.title || event.target.value,
                }))
              }
              fullWidth
            >
              {(selectedRoleAction?.cashbook_id
                ? Array.from(editableCashbookRoleNames)
                : availableAssignableLocationRoles
              ).map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
            {selectedRoleAction?.cashbook_id ? null : (
              <>
                <TextField
                  label="Title"
                  value={roleEditForm.title}
                  onChange={(event) =>
                    setRoleEditForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  select
                  label="Status"
                  value={roleEditForm.status}
                  onChange={(event) =>
                    setRoleEditForm((current) => ({
                      ...current,
                      status: event.target.value,
                    }))
                  }
                  fullWidth
                >
                  {["Active", "Inactive"].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoleEditOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => void saveSelectedLocationRole()}
            disabled={!roleEditForm.role}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={familyMembersOpen}
        onClose={() => setFamilyMembersOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedFamily?.title || "Missional Family"} Members
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {familyMemberError ? (
              <Alert severity="error">{familyMemberError}</Alert>
            ) : null}
            {canManageLocationResources ? (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Autocomplete
                  options={eligibleFamilyMembers}
                  value={
                    eligibleFamilyMembers.find((member) =>
                      idsEqual(member.id, selectedFamilyMemberId),
                    ) || null
                  }
                  onChange={(_, value) =>
                    setSelectedFamilyMemberId(value?.id || "")
                  }
                  getOptionLabel={accountOptionLabel}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Add member"
                      size="small"
                      fullWidth
                    />
                  )}
                  fullWidth
                />
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => void addSelectedFamilyMember()}
                  disabled={familyMemberSaving || !selectedFamilyMemberId}
                  sx={{ minWidth: 120 }}
                >
                  Add
                </Button>
              </Stack>
            ) : null}
            <List
              dense
              disablePadding
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              {familyMembersForSelected.length ? (
                familyMembersForSelected.map((member) => (
                  <ListItem
                    key={member.id}
                    divider
                    secondaryAction={
                      canManageLocationResources ? (
                        <IconButton
                          aria-label={`Remove ${memberName(
                            accounts,
                            member.member_id,
                            member.member_display_name,
                          )}`}
                          color="error"
                          size="small"
                          onClick={() =>
                            requestDeleteConfirmation(
                              "Remove Family Member?",
                              `This will remove ${memberName(
                                accounts,
                                member.member_id,
                                member.member_display_name,
                              )} from this missional family.`,
                              () => removeSelectedFamilyMember(member),
                            )
                          }
                          disabled={familyMemberSaving}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      ) : null
                    }
                    sx={{ pr: canManageLocationResources ? 7 : 0 }}
                  >
                    <ListItemIcon sx={{ minWidth: 34 }}>
                      <CheckCircleIcon color="secondary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={memberName(
                        accounts,
                        member.member_id,
                        member.member_display_name,
                      )}
                      secondary={member.status || "Active"}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No members in this missional family yet" />
                </ListItem>
              )}
            </List>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setFamilyMembersOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={familyEditOpen}
        onClose={() => setFamilyEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Missional Family</DialogTitle>
        <DialogContent>
          {familyEditError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {familyEditError}
            </Alert>
          ) : null}
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Missional Family Name"
              value={familyEditForm.title}
              onChange={(event) =>
                setFamilyEditForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              required
              fullWidth
            />
            <TextField
              select
              label="Zone"
              value={familyEditForm.zone_id}
              onChange={(event) =>
                setFamilyEditForm((current) => ({
                  ...current,
                  zone_id: event.target.value,
                }))
              }
              required
              fullWidth
            >
              {zones.map((zone) => (
                <MenuItem key={zone.id} value={zone.id}>
                  {zone.title || `Zone #${zone.id}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              value={familyEditForm.description}
              onChange={(event) =>
                setFamilyEditForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              multiline
              minRows={3}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Leader"
                value={familyEditForm.leader1_id}
                onChange={(event) =>
                  setFamilyEditForm((current) => ({
                    ...current,
                    leader1_id: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="">Not assigned</MenuItem>
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.user_id || ""}>
                    {memberName(
                      accounts,
                      member.user_id,
                      member.user_display_name,
                    )}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Assistant"
                value={familyEditForm.leader2_id}
                onChange={(event) =>
                  setFamilyEditForm((current) => ({
                    ...current,
                    leader2_id: event.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="">Not assigned</MenuItem>
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.user_id || ""}>
                    {memberName(
                      accounts,
                      member.user_id,
                      member.user_display_name,
                    )}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setFamilyEditOpen(false)}
            disabled={familyEditSaving}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => void saveFamilyEdit()}
            disabled={
              familyEditSaving ||
              !familyEditForm.title.trim() ||
              !familyEditForm.zone_id
            }
          >
            {familyEditSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="right"
        open={requisitionDrawerOpen}
        onClose={closeRequisitionDrawer}
        slotProps={{
          root: { sx: { zIndex: (muiTheme) => muiTheme.zIndex.modal } },
          paper: {
            sx: {
              width: { xs: "100%", sm: 560 },
              maxWidth: "100%",
              top: "0 !important",
              height: "100dvh",
              pointerEvents: "auto",
            },
          },
        }}
      >
        <Box sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={0.75} sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              {editingRequisition ? "Edit Requisition" : "Create Requisition"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prepare expense items for this location.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {requisitionError ? (
              <Alert severity="error">{requisitionError}</Alert>
            ) : null}
            <TextField
              label="Requisition Title"
              value={requisitionForm.title}
              onChange={(event) =>
                setRequisitionForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Description"
              value={requisitionForm.description}
              onChange={(event) =>
                setRequisitionForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              fullWidth
              multiline
              minRows={2}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Requisition Date"
                value={toPickerValue(requisitionForm.date)}
                onChange={(value) =>
                  setRequisitionForm((current) => ({
                    ...current,
                    date: fromPickerValue(value),
                  }))
                }
                slotProps={{
                  textField: { size: "small", fullWidth: true, required: true },
                }}
              />
            </LocalizationProvider>
            <Stack spacing={1.5}>
              {requisitionForm.items.map((item, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 1.5 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.25}
                    sx={{ alignItems: { sm: "center" } }}
                  >
                    <Autocomplete
                      options={expenseLocationParticulars}
                      value={
                        expenseLocationParticulars.find(
                          (particular) =>
                            particular.particular_id === item.particular_id,
                        ) || null
                      }
                      onChange={(_, value) =>
                        updateRequisitionItem(index, {
                          particular_id: value?.particular_id || "",
                        })
                      }
                      getOptionLabel={(option) =>
                        option.title || `Particular #${option.particular_id}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Particular"
                          required
                          fullWidth
                          slotProps={{
                            ...params.slotProps,
                            input: {
                              ...params.slotProps.input,
                              endAdornment: (
                                <>
                                  <InputAdornment position="end">
                                    <Tooltip title="Add particular">
                                      <IconButton
                                        edge="end"
                                        size="small"
                                        aria-label="Add particular"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          openExpenseParticularDrawer();
                                        }}
                                      >
                                        <AddIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </InputAdornment>
                                  {params.slotProps.input?.endAdornment}
                                </>
                              ),
                            },
                          }}
                        />
                      )}
                      fullWidth
                    />
                    <TextField
                      type="number"
                      label="Amount"
                      value={item.amount}
                      onChange={(event) =>
                        updateRequisitionItem(index, {
                          amount: event.target.value,
                        })
                      }
                      required
                      sx={{ minWidth: { sm: 150 } }}
                      slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                    />
                    <IconButton
                      aria-label="Remove requisition item"
                      color="error"
                      onClick={() => removeRequisitionItem(index)}
                      disabled={requisitionForm.items.length === 1}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Paper>
              ))}
            </Stack>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addRequisitionItem}
              disabled={!expenseLocationParticulars.length}
              fullWidth
            >
              Add Item
            </Button>
            {!expenseLocationParticulars.length ? (
              <Alert severity="info">
                Create expense particulars for this location before preparing
                requisitions.
              </Alert>
            ) : null}
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={closeRequisitionDrawer}
                disabled={requisitionSaving}
                fullWidth
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={saveRequisition}
                disabled={
                  requisitionSaving || !expenseLocationParticulars.length
                }
                fullWidth
              >
                {requisitionSaving ? (
                  <>
                    <CircularProgress
                      size={18}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Saving...
                  </>
                ) : editingRequisition ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
      <LocationActionDrawer
        open={actionOpen}
        actionLabel={locationTabActions[actionTab]}
        activeTab={actionTab}
        form={actionForm}
        accounts={accounts}
        members={members}
        ministryMembers={ministryMembers}
        cashbooks={cashbooks}
        roles={roles}
        availableAssignableLocationRoles={availableAssignableLocationRoles}
        zones={zones}
        missionalFamilies={missionalFamilies}
        schedules={schedules}
        attendances={attendances}
        mfAttendances={mfAttendances}
        attendanceCreateScope={attendanceCreateScope}
        terminology={term}
        canCreatePrivateCashbooks={canCreatePrivateCashbooks}
        error={actionError}
        saving={actionSaving}
        onChange={updateActionForm}
        onClose={() => setActionOpen(false)}
        onSave={handleSaveAction}
        onRegisterMember={handleRegisterMember}
      />
      <Dialog
        open={Boolean(scheduleDetails)}
        onClose={() => setScheduleDetails(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Schedule Details</DialogTitle>
        <DialogContent>
          {scheduleDetails ? (
            <List dense>
              <ListItem disableGutters>
                <ListItemText
                  primary="Title"
                  secondary={scheduleDetails.title || "Not set"}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Type"
                  secondary={scheduleDetails.type || "Not set"}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Recurrence"
                  secondary={scheduleDetails.recurrence || "One-Time"}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="When"
                  secondary={scheduleWhenText(scheduleDetails)}
                />
              </ListItem>
            </List>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setScheduleDetails(null)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(scheduleEdit)}
        onClose={() => setScheduleEdit(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Schedule Name"
                value={scheduleEditForm.title}
                onChange={(event) =>
                  setScheduleEditForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                fullWidth
                required
              />
              <Autocomplete
                freeSolo
                options={scheduleTypes}
                value={scheduleEditForm.type}
                onInputChange={(_, value) =>
                  setScheduleEditForm((current) => ({
                    ...current,
                    type: value,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Type" fullWidth />
                )}
              />
              <TextField
                select
                label="Recurrence"
                value={scheduleEditForm.recurrence}
                onChange={(event) =>
                  setScheduleEditForm((current) => ({
                    ...current,
                    recurrence: event.target.value,
                  }))
                }
                fullWidth
              >
                {scheduleRecurrences.map((recurrence) => (
                  <MenuItem key={recurrence} value={recurrence}>
                    {recurrence}
                  </MenuItem>
                ))}
              </TextField>
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  {scheduleEditForm.recurrence === "Weekly" ? (
                    <TextField
                      select
                      label="Weekday"
                      value={scheduleEditForm.weekday}
                      onChange={(event) =>
                        setScheduleEditForm((current) => ({
                          ...current,
                          weekday: event.target.value,
                        }))
                      }
                      fullWidth
                    >
                      {weekdays.map((weekday, index) => (
                        <MenuItem key={weekday} value={String(index)}>
                          {weekday}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <DatePicker
                      label="Date"
                      value={toPickerValue(scheduleEditForm.date)}
                      onChange={(value) =>
                        setScheduleEditForm((current) => ({
                          ...current,
                          date: fromPickerValue(value),
                        }))
                      }
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  )}
                </Stack>
                <Stack spacing={1.5} sx={{ width: "100%" }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ width: "100%" }}
                  >
                    <TimePicker
                      label="Start Time"
                      value={toTimePickerValue(scheduleEditForm.time)}
                      onChange={(value) =>
                        setScheduleEditForm((current) => ({
                          ...current,
                          time: fromTimePickerValue(value),
                        }))
                      }
                      ampm
                      views={["hours", "minutes"]}
                      format="hh:mm a"
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                    <TimePicker
                      label="End Time"
                      value={toTimePickerValue(scheduleEditForm.end_time)}
                      onChange={(value) =>
                        setScheduleEditForm((current) => ({
                          ...current,
                          end_time: fromTimePickerValue(value),
                        }))
                      }
                      ampm
                      views={["hours", "minutes"]}
                      format="hh:mm a"
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setScheduleEdit(null)}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={saveScheduleEdit}
            disabled={!scheduleEditForm.title.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="right"
        open={reportCreateOpen || reportEditOpen}
        onClose={() => {
          setReportCreateOpen(false);
          setReportEditOpen(false);
          setReportEditCard(null);
        }}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "100vw", sm: 560 },
              maxWidth: "100%",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <DialogTitle>
            {reportEditOpen ? "Modify General Report" : "Create General Report"}
          </DialogTitle>
          <DialogContent sx={{ flex: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2} sx={{ pt: 1 }}>
                {reportError ? (
                  <Alert severity="error">{reportError}</Alert>
                ) : null}
                {reportSuccess ? (
                  <Alert severity="success">{reportSuccess}</Alert>
                ) : null}
                <Tabs
                  value={reportForm.type}
                  onChange={(_, value: string) => handleReportTypeChange(value)}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab value="Attendance" label="Attendance" />
                  <Tab value="Financial" label="Collections" />
                </Tabs>
                {reportForm.type === "Attendance" ? (
                  <>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <DatePicker
                        label="Schedule Date"
                        value={toPickerValue(reportForm.schedule_date)}
                        onChange={handleReportDateChange}
                        disableFuture
                        shouldDisableDate={(day) =>
                          disableFutureSchedulePickerDay(day, schedules) ||
                          isAttendanceScheduleDateReported(
                            day.format("YYYY-MM-DD"),
                          )
                        }
                        slots={{ day: renderReportScheduleAwareDay }}
                        slotProps={{
                          textField: { fullWidth: true, size: "medium" },
                        }}
                      />
                      <TextField
                        label="Report Title"
                        value={reportForm.title}
                        slotProps={{ input: { readOnly: true } }}
                        fullWidth
                        required
                      />
                    </Stack>
                    <TextField
                      select
                      label="Schedule Type"
                      value={reportForm.schedule_type}
                      onChange={(event) =>
                        handleReportScheduleTypeChange(event.target.value)
                      }
                      fullWidth
                      required
                    >
                      {reportScheduleTypeOptions.length === 0 ? (
                        <MenuItem value="">No schedule types</MenuItem>
                      ) : (
                        reportScheduleTypeOptions.map((scheduleType) => (
                          <MenuItem key={scheduleType} value={scheduleType}>
                            {scheduleType}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      options={[
                        {
                          id: "__all_schedules__",
                          title: "All schedules",
                        } as Schedule,
                        ...typedSchedulesForReportDate,
                      ]}
                      value={selectedReportSchedules}
                      onChange={(_, value) =>
                        handleReportSchedulesChange(value)
                      }
                      getOptionLabel={scheduleOptionLabel}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderOption={(props, option, { selected }) => {
                        const isAllOption = option.id === "__all_schedules__";
                        const allSelected =
                          typedSchedulesForReportDate.length > 0 &&
                          reportForm.schedule_ids.length ===
                            typedSchedulesForReportDate.length;
                        return (
                          <li {...props}>
                            <Checkbox
                              checked={isAllOption ? allSelected : selected}
                              sx={{ mr: 1 }}
                            />
                            {scheduleOptionLabel(option)}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Schedules"
                          required
                          fullWidth
                        />
                      )}
                      slotProps={{
                        chip: { color: "secondary", size: "small" },
                      }}
                      fullWidth
                    />
                  </>
                ) : (
                  <>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <DatePicker
                        label="Schedule Date"
                        value={toPickerValue(reportForm.schedule_date)}
                        onChange={handleReportDateChange}
                        disableFuture
                        shouldDisableDate={disableFinanceSchedulePickerDay}
                        slots={{ day: renderFinanceScheduleDateDay }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            size: "medium",
                          },
                        }}
                      />
                      <TextField
                        label="Report Title"
                        value={reportForm.title}
                        slotProps={{ input: { readOnly: true } }}
                        fullWidth
                        required
                      />
                    </Stack>
                    <TextField
                      select
                      label="Schedule Type"
                      value={reportForm.schedule_type}
                      onChange={(event) =>
                        handleReportScheduleTypeChange(event.target.value)
                      }
                      fullWidth
                      required
                    >
                      {financeScheduleTypeOptions.length === 0 ? (
                        <MenuItem value="">No schedule types</MenuItem>
                      ) : (
                        financeScheduleTypeOptions.map((scheduleType) => (
                          <MenuItem key={scheduleType} value={scheduleType}>
                            {scheduleType}
                          </MenuItem>
                        ))
                      )}
                    </TextField>
                    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
                      <Grid
                        container
                        spacing={0}
                        sx={{ bgcolor: "action.hover", px: 1.5, py: 1 }}
                      >
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 800 }}
                          >
                            Collections
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 800 }}
                          >
                            Remissions
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 800 }}
                          >
                            Remission Value
                          </Typography>
                        </Grid>
                      </Grid>
                      <Stack divider={<Divider />}>
                        {collectionReportRows.length ? (
                          collectionReportRows.map((row) => (
                            <Grid
                              key={row.key}
                              container
                              spacing={1.5}
                              sx={{ px: 1.5, py: 1.25, alignItems: "center" }}
                            >
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 700 }}
                                >
                                  {row.particularTitle}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {row.scheduleIds.length} schedule
                                  {row.scheduleIds.length === 1
                                    ? ""
                                    : "s"} ·{" "}
                                  {row.collectionValue.toLocaleString()}
                                </Typography>
                              </Grid>
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography variant="body2">
                                  {row.remissionTitle}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {row.remissionPercentage}%
                                </Typography>
                              </Grid>
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField
                                  value={row.remissionValue}
                                  size="small"
                                  slotProps={{ input: { readOnly: true } }}
                                  fullWidth
                                />
                              </Grid>
                            </Grid>
                          ))
                        ) : (
                          <Box sx={{ px: 1.5, py: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              No income collections are recorded for this
                              schedule date and type.
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </Paper>
                  </>
                )}
                {reportForm.type === "Attendance" ? (
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="Total Attendance"
                      type="number"
                      value={reportForm.value}
                      slotProps={{ input: { readOnly: true } }}
                      fullWidth
                      required
                    />
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) 48px",
                      gap: 1,
                      alignItems: "start",
                    }}
                  >
                    <TextField
                      label="Remission Value"
                      type="number"
                      value={collectionRemissionTotal.toFixed(2)}
                      slotProps={{ input: { readOnly: true } }}
                      fullWidth
                      required
                    />
                    <Tooltip title="Manage remissions">
                      <IconButton
                        aria-label="Manage remissions"
                        color="secondary"
                        onClick={openLocationRemissionDrawer}
                        sx={{
                          border: 1,
                          borderColor: "divider",
                          height: 40,
                          width: 40,
                        }}
                      >
                        <SettingsIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                <TextField
                  label="Description"
                  value={reportForm.description}
                  onChange={(event) =>
                    updateReportForm({ description: event.target.value })
                  }
                  multiline
                  minRows={3}
                  fullWidth
                />
                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setReportCreateOpen(false);
                      setReportEditOpen(false);
                      setReportEditCard(null);
                    }}
                    disabled={reportSaving}
                    fullWidth
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      void (reportEditOpen
                        ? saveLocationReportDraft(reportEditCard)
                        : handleCreateLocationReport())
                    }
                    disabled={reportCreateDisabled}
                    fullWidth
                  >
                    {reportSaving ? "Saving..." : "Save"}
                  </Button>
                </Stack>
              </Stack>
            </LocalizationProvider>
          </DialogContent>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={locationEditOpen}
        onClose={() => setLocationEditOpen(false)}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            width: { xs: "100vw", sm: 520 },
            maxWidth: "100%",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
            Edit Location
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2}>
              {locationEditError ? (
                <Alert severity="error">{locationEditError}</Alert>
              ) : null}
              <TextField
                label="Location Name"
                value={locationEditForm.title}
                onChange={(event) =>
                  setLocationEditForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Type"
                value={locationEditForm.type}
                onChange={(event) =>
                  setLocationEditForm((current) => ({
                    ...current,
                    type: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Description"
                value={locationEditForm.description}
                onChange={(event) =>
                  setLocationEditForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                multiline
                minRows={3}
                fullWidth
              />
              <TextField
                label="Email"
                value={locationEditForm.email}
                onChange={(event) =>
                  setLocationEditForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={locationEditForm.phone_number}
                onChange={(event) =>
                  setLocationEditForm((current) => ({
                    ...current,
                    phone_number: event.target.value,
                  }))
                }
                fullWidth
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Country"
                  value={locationEditForm.country}
                  onChange={(event) =>
                    setLocationEditForm((current) => ({
                      ...current,
                      country: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Region"
                  value={locationEditForm.district}
                  onChange={(event) =>
                    setLocationEditForm((current) => ({
                      ...current,
                      district: event.target.value,
                    }))
                  }
                  fullWidth
                />
              </Stack>
              <TextField
                label="City"
                value={locationEditForm.city}
                onChange={(event) =>
                  setLocationEditForm((current) => ({
                    ...current,
                    city: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                label="Address"
                value={locationEditForm.address}
                onChange={(event) =>
                  setLocationEditForm((current) => ({
                    ...current,
                    address: event.target.value,
                  }))
                }
                fullWidth
              />
              <DatePicker
                label="Reporting Start Date"
                value={toPickerValue(locationEditForm.reporting_start_date)}
                onChange={(value) =>
                  setLocationEditForm((current) => ({
                    ...current,
                    reporting_start_date: fromPickerValue(value),
                  }))
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  onClick={saveLocationEdit}
                  disabled={locationEditSaving}
                  startIcon={
                    locationEditSaving ? (
                      <CircularProgress color="inherit" size={16} />
                    ) : null
                  }
                >
                  {locationEditSaving ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setLocationEditOpen(false)}
                  disabled={locationEditSaving}
                >
                  Close
                </Button>
              </Stack>
            </Stack>
          </LocalizationProvider>
        </Box>
      </Drawer>
      <Dialog
        open={locationDeleteOpen}
        onClose={() => {
          if (!locationDeleteSaving) {
            setLocationDeleteOpen(false);
          }
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete Location</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Alert severity="warning">
              This will permanently delete this location and its related
              records.
            </Alert>
            {locationDeleteError ? (
              <Alert severity="error">{locationDeleteError}</Alert>
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setLocationDeleteOpen(false)}
            disabled={locationDeleteSaving}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deleteLocation}
            disabled={locationDeleteSaving}
            startIcon={
              locationDeleteSaving ? (
                <CircularProgress color="inherit" size={16} />
              ) : (
                <DeleteIcon />
              )
            }
          >
            {locationDeleteSaving ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDeleteDialog
        open={Boolean(deleteConfirm)}
        title={deleteConfirm?.title || "Delete Record?"}
        description={
          deleteConfirm?.description || "This action cannot be undone."
        }
        error={deleteConfirmError}
        loading={deleteConfirmSaving}
        onCancel={closeDeleteConfirmation}
        onConfirm={() => void confirmPendingDelete()}
      />
      <Drawer
        anchor="right"
        open={locationParticularsOpen}
        onClose={() => setLocationParticularsOpen(false)}
      >
        <Box sx={{ width: { xs: "100vw", sm: 560 }, maxWidth: "100%" }}>
          <DialogTitle>{term("particulars")}</DialogTitle>
          <DialogContent>
            {locationParticularError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {locationParticularError}
              </Alert>
            ) : null}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 1.5,
                mb: 2,
                mt: 1,
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                label={term("particulars").replace(/s$/i, "")}
                value={locationParticularForm.title}
                onChange={(event) =>
                  setLocationParticularForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                size="small"
                select
                label="Category"
                value={locationParticularForm.category}
                onChange={(event) =>
                  setLocationParticularForm((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
                fullWidth
              >
                {["Income", "Expense"].map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                size="small"
                select
                label="Type"
                value={locationParticularForm.type}
                onChange={(event) =>
                  setLocationParticularForm((current) => ({
                    ...current,
                    type: event.target.value,
                  }))
                }
                fullWidth
              >
                {particularTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setLocationParticularsOpen(false)}
                fullWidth
              >
                Close
              </Button>
              <Button
                variant="contained"
                startIcon={
                  editingLocationParticularId ? <SaveIcon /> : <AddIcon />
                }
                onClick={saveLocationParticular}
                disabled={
                  !locationParticularForm.title.trim() ||
                  !locationParticularForm.category ||
                  !locationParticularForm.type
                }
                fullWidth
              >
                {editingLocationParticularId ? "Update" : "Add"}
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={locationRemissionsOpen}
        onClose={() => setLocationRemissionsOpen(false)}
      >
        <Box sx={{ width: { xs: "100vw", sm: 560 }, maxWidth: "100%" }}>
          <DialogTitle>{`${term("location")} ${term("remissions")}`}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {remissionError ? (
                <Alert severity="error">{remissionError}</Alert>
              ) : null}
              <Autocomplete
                options={incomeLocationParticulars}
                value={
                  incomeLocationParticulars.find((particular) =>
                    idsEqual(
                      particular.particular_id,
                      remissionForm.particular_id,
                    ),
                  ) || null
                }
                onChange={(_, value) =>
                  updateRemissionForm({
                    particular_id: value?.particular_id || "",
                  })
                }
                getOptionLabel={(particular) =>
                  particular.title || `${term("particulars").replace(/s$/i, "")} #${particular.particular_id}`
                }
                isOptionEqualToValue={(option, value) =>
                  idsEqual(option.particular_id, value.particular_id)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={term("particulars").replace(/s$/i, "")}
                    required
                    fullWidth
                  />
                )}
                fullWidth
              />
              <TextField
                label="Title"
                value={remissionForm.title}
                onChange={(event) =>
                  updateRemissionForm({ title: event.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Percentage"
                type="number"
                value={remissionForm.percentage}
                onChange={(event) =>
                  updateRemissionForm({ percentage: event.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Description"
                value={remissionForm.description}
                onChange={(event) =>
                  updateRemissionForm({ description: event.target.value })
                }
                multiline
                minRows={3}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setLocationRemissionsOpen(false)}
                disabled={remissionSaving}
                fullWidth
              >
                Close
              </Button>
              <Button
                variant="contained"
                startIcon={editingRemissionId ? <SaveIcon /> : <AddIcon />}
                onClick={handleSaveLocationRemission}
                disabled={
                  remissionSaving ||
                  !remissionForm.title.trim() ||
                  !remissionForm.percentage ||
                  !remissionForm.particular_id
                }
                fullWidth
              >
                {remissionSaving
                  ? "Saving..."
                  : editingRemissionId
                    ? "Update"
                    : "Add"}
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Drawer>
      <Dialog
        open={locationDetailsOpen}
        onClose={() => setLocationDetailsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{`${term("location")} Details`}</DialogTitle>
        <DialogContent>
          <List dense>
            <ListItem disableGutters>
              <ListItemText
                primary="Type"
                secondary={location.type || "Not set"}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Email"
                secondary={location.email || "Not set"}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Phone"
                secondary={location.phone_number || "Not set"}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Address"
                secondary={
                  [location.city, location.district, location.country]
                    .filter(Boolean)
                    .join(", ") || "Not set"
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Parent Location"
                secondary={
                  location.parent_location_id
                    ? `Location #${location.parent_location_id}`
                    : "Main account location"
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setLocationDetailsOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="left"
        open={locationChooserOpen}
        onClose={() => setLocationChooserOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "86vw", sm: 360 },
              maxWidth: "100%",
              top: { xs: "56px !important", sm: "64px !important" },
              height: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
            },
          },
        }}
      >
        {renderLocationsCard(false)}
      </Drawer>
      {createLocationDrawer}
      <Snackbar
        open={Boolean(feedback)}
        autoHideDuration={4000}
        onClose={() => setFeedback(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {feedback ? (
          <Alert
            severity={feedback.severity}
            variant="filled"
            onClose={() => setFeedback(null)}
          >
            {feedback.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
}

function TabPanel({
  value,
  index,
  children,
}: {
  value: number;
  index: number;
  children: ReactNode;
}) {
  if (value !== index) {
    return null;
  }
  return (
    <Box
      id={`location-tabpanel-${index}`}
      role="tabpanel"
      aria-labelledby={`location-tab-${index}`}
    >
      {children}
    </Box>
  );
}

type LocationActionDrawerProps = {
  open: boolean;
  actionLabel: string;
  activeTab: number;
  form: ActionForm;
  accounts: Account[];
  members: Member[];
  ministryMembers: Member[];
  cashbooks: Cashbook[];
  roles: Role[];
  availableAssignableLocationRoles: string[];
  zones: Zone[];
  missionalFamilies: MissionalFamily[];
  schedules: Schedule[];
  attendances: Attendance[];
  mfAttendances: MfAttendance[];
  attendanceCreateScope: "location" | "mf";
  terminology: (key: TerminologyKey) => string;
  canCreatePrivateCashbooks: boolean;
  error: string;
  saving: boolean;
  onChange: (value: Partial<ActionForm>) => void;
  onClose: () => void;
  onSave: () => void;
  onRegisterMember: () => void;
};

function accountOptionLabel(account: Account) {
  if (account.type === "Organization" && account.title) {
    return account.title;
  }
  return (
    [account.fname, account.lname].filter(Boolean).join(" ") ||
    account.title ||
    account.username ||
    account.email ||
    `Account #${account.id}`
  );
}

export function CashbookActionsMenu({
  cashbook,
  requesterId,
  accounts,
  canManagePrivateVisibility = false,
  returnTo,
  onRefresh,
}: {
  cashbook: Cashbook;
  requesterId?: string;
  accounts: Account[];
  canManagePrivateVisibility?: boolean;
  returnTo?: string;
  onRefresh: () => Promise<void>;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [reportAnchorEl, setReportAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [rolesOpen, setRolesOpen] = useState(false);
  const [roleForm, setRoleForm] = useState({ user_id: "", role: "" });
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportType, setReportType] =
    useState<CashbookTransactionReportType>("all");
  const [reportFilters, setReportFilters] = useState({
    particularId: "",
    startDate: "",
    endDate: "",
  });
  const [reportCashbook, setReportCashbook] = useState<Cashbook | null>(null);
  const [editForm, setEditForm] = useState({
    title: cashbook.title || "",
    description: cashbook.description || "",
    status: cashbook.status || "Active",
    visibility: cashbook.visibility || "Public",
    startdate: cashbook.startdate || "",
    enddate: cashbook.enddate || "",
    opening_balance: String(cashbook.opening_balance || 0),
  });
  const theme = useTheme();
  const isMobilePdfPreview = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const closeMenu = () => {
    setAnchorEl(null);
    setReportAnchorEl(null);
  };
  const canAdmin = Boolean(cashbook.can_admin);
  const isClosed = (cashbook.status || "").toLowerCase() === "closed";
  const activeReportCashbook = reportCashbook || cashbook;
  const reportParticularOptions = Array.from(
    new Map(
      (activeReportCashbook.transactions || [])
        .filter((transaction) => transaction.particular_id)
        .map((transaction) => [
          transaction.particular_id!,
          {
            particular_id: transaction.particular_id!,
            title:
              transaction.particular_title ||
              `Particular #${transaction.particular_id}`,
          } as Particular,
        ]),
    ).values(),
  );
  const selectedReportParticular =
    reportParticularOptions.find(
      (particular) => particular.particular_id === reportFilters.particularId,
    ) || null;
  const reportTransactions = (activeReportCashbook.transactions || [])
    .filter((transaction) => {
      if (reportType === "normal" && transaction.schedule_id) {
        return false;
      }
      if (reportType === "schedule" && !transaction.schedule_id) {
        return false;
      }
      if (
        reportFilters.particularId &&
        transaction.particular_id !== reportFilters.particularId
      ) {
        return false;
      }
      const reportDate =
        transaction.transaction_date || transaction.schedule_date || "";
      if (
        reportFilters.startDate &&
        (!reportDate || reportDate < reportFilters.startDate)
      ) {
        return false;
      }
      if (
        reportFilters.endDate &&
        (!reportDate || reportDate > reportFilters.endDate)
      ) {
        return false;
      }
      return true;
    })
    .slice()
    .sort(
      (first, second) =>
        (first.transaction_date || first.schedule_date || "").localeCompare(
          second.transaction_date || second.schedule_date || "",
        ) ||
        (first.created_at || "").localeCompare(second.created_at || "") ||
        first.transaction_id.localeCompare(second.transaction_id),
    );
  const reportOpeningBalance = Number(
    activeReportCashbook.opening_balance || 0,
  );
  const reportPdfTitle = `${activeReportCashbook.title || "Cashbook"} - ${
    cashbookReportLabels[reportType]
  } Report`;
  const reportPdfFileName = pdfFileName(reportPdfTitle);
  const reportRows = reportTransactions.reduce<CashbookTransactionReportRow[]>(
    (rows, transaction, index) => {
      const amount = Number(transaction.amount || 0);
      const isIncome =
        (transaction.category || "").trim().toLowerCase() === "income";
      const income = isIncome ? amount : 0;
      const expenditure = isIncome ? 0 : amount;
      const previousBalance = rows.at(-1)?.balance || reportOpeningBalance;
      rows.push({
        no: index + 1,
        date: transaction.transaction_date || transaction.schedule_date || "",
        particular:
          transaction.particular_title ||
          (transaction.particular_id
            ? `Particular #${transaction.particular_id}`
            : "Not set"),
        income,
        expenditure,
        balance: previousBalance + income - expenditure,
      });
      return rows;
    },
    [],
  );

  const openRoles = () => {
    setRoleForm({ user_id: "", role: "" });
    setRolesOpen(true);
    closeMenu();
  };

  const openEdit = () => {
    setEditForm({
      title: cashbook.title || "",
      description: cashbook.description || "",
      status: cashbook.status || "Active",
      visibility: cashbook.visibility || "Public",
      startdate: cashbook.startdate || "",
      enddate: cashbook.enddate || "",
      opening_balance: String(cashbook.opening_balance || 0),
    });
    setEditOpen(true);
    closeMenu();
  };

  const openReport = async (nextReportType: CashbookTransactionReportType) => {
    if (!requesterId) {
      return;
    }
    setReportType(nextReportType);
    setReportLoading(true);
    setReportOpen(true);
    closeMenu();
    try {
      const response = await api.get<Cashbook>(
        `/cashbooks/${cashbook.cashbook_id}?requester_id=${requesterId}`,
      );
      setReportCashbook(response.data);
    } finally {
      window.setTimeout(() => setReportLoading(false), 350);
    }
  };

  const reloadReport = () => {
    setReportLoading(true);
    window.setTimeout(() => setReportLoading(false), 350);
  };

  const exportReportExcel = () => {
    const totalIncome = reportRows.reduce((sum, row) => sum + row.income, 0);
    const totalExpenditure = reportRows.reduce(
      (sum, row) => sum + row.expenditure,
      0,
    );
    const finalBalance = reportRows.at(-1)?.balance ?? reportOpeningBalance;
    const dateRange = [
      selectedReportParticular?.title || null,
      reportFilters.startDate ? `From ${reportFilters.startDate}` : null,
      reportFilters.endDate ? `To ${reportFilters.endDate}` : null,
    ]
      .filter(Boolean)
      .join(" ");
    const workbook = createCashbookReportWorkbook({
      title: reportPdfTitle,
      subtitle: [activeReportCashbook.location_title, dateRange || "All dates"]
        .filter(Boolean)
        .join(" | "),
      rows: reportRows,
      openingBalance: reportOpeningBalance,
      totalIncome,
      totalExpenditure,
      finalBalance,
    });
    const blob = new Blob([workbook], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeExportFileName(`${activeReportCashbook.title || "cashbook"}-${cashbookReportLabels[reportType]}`)}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const closeCashbook = async () => {
    if (!requesterId) {
      return;
    }
    setActionError("");
    await api.post(`/cashbooks/${cashbook.cashbook_id}/close`, {
      requester_id: requesterId,
    });
    setCloseConfirmOpen(false);
    closeMenu();
    await onRefresh();
  };

  const deleteCashbook = async () => {
    if (!requesterId) {
      return;
    }
    setActionError("");
    await api.delete(
      `/cashbooks/${cashbook.cashbook_id}?requester_id=${requesterId}`,
    );
    setDeleteConfirmOpen(false);
    closeMenu();
    await onRefresh();
  };

  const saveRole = async () => {
    if (!requesterId || !roleForm.user_id || !roleForm.role) {
      return;
    }
    await api.post(`/cashbooks/${cashbook.cashbook_id}/roles`, {
      requester_id: requesterId,
      user_id: roleForm.user_id,
      role: roleForm.role,
    });
    setRolesOpen(false);
    closeMenu();
    await onRefresh();
  };

  const saveEdit = async () => {
    if (!requesterId) {
      return;
    }
    await api.patch(`/cashbooks/${cashbook.cashbook_id}`, {
      requester_id: requesterId,
      title: editForm.title,
      description: editForm.description || null,
      status: editForm.status,
      ...(canManagePrivateVisibility
        ? { visibility: editForm.visibility }
        : {}),
      startdate: editForm.startdate || null,
      enddate: editForm.enddate || null,
      opening_balance: Number(editForm.opening_balance || 0),
    });
    setEditOpen(false);
    await onRefresh();
  };

  return (
    <>
      <IconButton
        size="small"
        aria-label="Cashbook actions"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem
          onClick={() =>
            navigate(`/app/cashbooks/${cashbook.cashbook_id}`, {
              state: returnTo ? { cashbookReturnTo: returnTo } : undefined,
            })
          }
        >
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          Open
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDetailsOpen(true);
            closeMenu();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          Details
        </MenuItem>
        <MenuItem onClick={(event) => setReportAnchorEl(event.currentTarget)}>
          <ListItemIcon>
            <RateReviewIcon fontSize="small" />
          </ListItemIcon>
          Report
          <KeyboardArrowRightIcon fontSize="small" sx={{ ml: "auto" }} />
        </MenuItem>
        {canAdmin ? (
          <MenuItem onClick={openRoles}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Permissions
          </MenuItem>
        ) : null}
        {canAdmin ? (
          <MenuItem onClick={openEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
        ) : null}
        {canAdmin ? (
          <MenuItem
            onClick={() => {
              setDeleteConfirmOpen(true);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        ) : null}
        {canAdmin && !isClosed ? (
          <MenuItem
            onClick={() => {
              setCloseConfirmOpen(true);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" />
            </ListItemIcon>
            Close
          </MenuItem>
        ) : null}
      </Menu>
      <Menu
        anchorEl={reportAnchorEl}
        open={Boolean(reportAnchorEl)}
        onClose={() => setReportAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => openReport("all")}>All Transactions</MenuItem>
        <MenuItem onClick={() => openReport("normal")}>
          General Transactions
        </MenuItem>
        <MenuItem onClick={() => openReport("schedule")}>
          Schedule Collections
        </MenuItem>
      </Menu>
      {isMobilePdfPreview ? (
        <Drawer
          anchor="bottom"
          open={reportOpen}
          onClose={() => setReportOpen(false)}
          slotProps={{
            paper: {
              sx: {
                maxHeight: "90dvh",
                borderRadius: "12px 12px 0 0",
                display: "flex",
                flexDirection: "column",
              },
            },
          }}
        >
          <DialogTitle>{cashbookReportLabels[reportType]} Report</DialogTitle>
          <DialogContent sx={{ overflow: "auto", flex: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                {reportLoading ? (
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      minHeight: 280,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <MobilePdfViewer
                    document={
                      <CashbookTransactionsReportDocument
                        cashbook={activeReportCashbook}
                        reportType={reportType}
                        startDate={reportFilters.startDate}
                        endDate={reportFilters.endDate}
                        particularLabel={
                          selectedReportParticular?.title || undefined
                        }
                        rows={reportRows}
                        title={reportPdfTitle}
                      />
                    }
                    fileName={reportPdfFileName}
                    onExportExcel={exportReportExcel}
                    filterPanel={
                      <Stack direction="column" spacing={2}>
                        <Autocomplete
                          options={reportParticularOptions}
                          value={selectedReportParticular}
                          onChange={(_, value) => {
                            setReportFilters((current) => ({
                              ...current,
                              particularId: value?.particular_id || "",
                            }));
                            reloadReport();
                          }}
                          getOptionLabel={(option) =>
                            option.title ||
                            `Particular #${option.particular_id}`
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Particular"
                              size="small"
                              fullWidth
                            />
                          )}
                          fullWidth
                        />
                        <DatePicker
                          label="Start Date"
                          value={toPickerValue(reportFilters.startDate)}
                          onChange={(value) => {
                            setReportFilters((current) => ({
                              ...current,
                              startDate: fromPickerValue(value),
                            }));
                            reloadReport();
                          }}
                          disableFuture
                          maxDate={
                            toPickerValue(reportFilters.endDate) || undefined
                          }
                          slotProps={{
                            textField: { size: "small", fullWidth: true },
                          }}
                        />
                        <DatePicker
                          label="End Date"
                          value={toPickerValue(reportFilters.endDate)}
                          onChange={(value) => {
                            setReportFilters((current) => ({
                              ...current,
                              endDate: fromPickerValue(value),
                            }));
                            reloadReport();
                          }}
                          disableFuture
                          minDate={
                            toPickerValue(reportFilters.startDate) || undefined
                          }
                          slotProps={{
                            textField: { size: "small", fullWidth: true },
                          }}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setReportFilters({
                              particularId: "",
                              startDate: "",
                              endDate: "",
                            });
                            reloadReport();
                          }}
                          sx={{ minWidth: 96 }}
                        >
                          Clear
                        </Button>
                      </Stack>
                    }
                  />
                )}
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => setReportOpen(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Drawer>
      ) : (
        <Dialog
          open={reportOpen}
          onClose={() => setReportOpen(false)}
          fullWidth
          maxWidth="lg"
          slotProps={{
            paper: {
              sx: {
                height: { xs: "100dvh", sm: "auto" },
                m: { xs: 0, sm: 2 },
                maxHeight: { xs: "100dvh", sm: "calc(100% - 64px)" },
              },
            },
          }}
        >
          <DialogTitle>{cashbookReportLabels[reportType]} Report</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                {!isMobilePdfPreview ? (
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Autocomplete
                      options={reportParticularOptions}
                      value={selectedReportParticular}
                      onChange={(_, value) => {
                        setReportFilters((current) => ({
                          ...current,
                          particularId: value?.particular_id || "",
                        }));
                        reloadReport();
                      }}
                      getOptionLabel={(option) =>
                        option.title || `Particular #${option.particular_id}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Particular"
                          size="small"
                          fullWidth
                        />
                      )}
                      fullWidth
                    />
                    <DatePicker
                      label="Start Date"
                      value={toPickerValue(reportFilters.startDate)}
                      onChange={(value) => {
                        setReportFilters((current) => ({
                          ...current,
                          startDate: fromPickerValue(value),
                        }));
                        reloadReport();
                      }}
                      disableFuture
                      maxDate={toPickerValue(reportFilters.endDate) || undefined}
                      slotProps={{ textField: { size: "small", fullWidth: true } }}
                    />
                    <DatePicker
                      label="End Date"
                      value={toPickerValue(reportFilters.endDate)}
                      onChange={(value) => {
                        setReportFilters((current) => ({
                          ...current,
                          endDate: fromPickerValue(value),
                        }));
                        reloadReport();
                      }}
                      disableFuture
                      minDate={toPickerValue(reportFilters.startDate) || undefined}
                      slotProps={{ textField: { size: "small", fullWidth: true } }}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setReportFilters({
                          particularId: "",
                          startDate: "",
                          endDate: "",
                        });
                        reloadReport();
                      }}
                      sx={{ minWidth: 96, alignSelf: { sm: "center" } }}
                    >
                      Clear
                    </Button>
                  </Stack>
                ) : null}
                {reportLoading ? (
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      minHeight: 280,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <MobilePdfViewer
                    document={
                      <CashbookTransactionsReportDocument
                        cashbook={activeReportCashbook}
                        reportType={reportType}
                        startDate={reportFilters.startDate}
                        endDate={reportFilters.endDate}
                        particularLabel={
                          selectedReportParticular?.title || undefined
                        }
                        rows={reportRows}
                        title={reportPdfTitle}
                      />
                    }
                    fileName={reportPdfFileName}
                    onExportExcel={exportReportExcel}
                    filterPanel={
                      isMobilePdfPreview ? (
                        <Stack direction="column" spacing={2}>
                          <Autocomplete
                            options={reportParticularOptions}
                            value={selectedReportParticular}
                            onChange={(_, value) => {
                              setReportFilters((current) => ({
                                ...current,
                                particularId: value?.particular_id || "",
                              }));
                              reloadReport();
                            }}
                            getOptionLabel={(option) =>
                              option.title ||
                              `Particular #${option.particular_id}`
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Particular"
                                size="small"
                                fullWidth
                              />
                            )}
                            fullWidth
                          />
                          <DatePicker
                            label="Start Date"
                            value={toPickerValue(reportFilters.startDate)}
                            onChange={(value) => {
                              setReportFilters((current) => ({
                                ...current,
                                startDate: fromPickerValue(value),
                              }));
                              reloadReport();
                            }}
                            disableFuture
                            maxDate={
                              toPickerValue(reportFilters.endDate) || undefined
                            }
                            slotProps={{
                              textField: { size: "small", fullWidth: true },
                            }}
                          />
                          <DatePicker
                            label="End Date"
                            value={toPickerValue(reportFilters.endDate)}
                            onChange={(value) => {
                              setReportFilters((current) => ({
                                ...current,
                                endDate: fromPickerValue(value),
                              }));
                              reloadReport();
                            }}
                            disableFuture
                            minDate={
                              toPickerValue(reportFilters.startDate) || undefined
                            }
                            slotProps={{
                              textField: { size: "small", fullWidth: true },
                            }}
                          />
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setReportFilters({
                                particularId: "",
                                startDate: "",
                                endDate: "",
                              });
                              reloadReport();
                            }}
                            sx={{ minWidth: 96 }}
                          >
                            Clear
                          </Button>
                        </Stack>
                      ) : undefined
                    }
                  />
                )}
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => setReportOpen(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Cashbook Details</DialogTitle>
        <DialogContent>
          <List dense disablePadding sx={{ mt: 1 }}>
            <ListItem disableGutters divider>
              <ListItemText
                primary="Cashbook"
                secondary={
                  cashbook.title || `Cashbook #${cashbook.cashbook_id}`
                }
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemText
                primary="Description"
                secondary={cashbook.description || "Not set"}
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemText
                primary="Visibility"
                secondary={cashbook.visibility || "Public"}
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemText
                primary="Start Date"
                secondary={cashbook.startdate || "Not set"}
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemText
                primary="End Date"
                secondary={cashbook.enddate || "Not set"}
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemText
                primary="Opening"
                secondary={Number(
                  cashbook.opening_balance || 0,
                ).toLocaleString()}
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemText
                primary="Closing"
                secondary={
                  (cashbook.status || "").toLowerCase() === "closed"
                    ? Number(cashbook.closing_balance || 0).toLocaleString()
                    : "-"
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Status"
                secondary={cashbook.status || "Not set"}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDetailsOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete Cashbook?</DialogTitle>
        <DialogContent>
          {actionError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {actionError}
            </Alert>
          ) : null}
          <Typography variant="body2">
            This action permanently removes the cashbook. Cashbooks with
            transactions cannot be deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setDeleteConfirmOpen(false)}
          >
            Close
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() =>
              void deleteCashbook().catch((error) =>
                setActionError(
                  getApiErrorMessage(error, "Failed to delete cashbook"),
                ),
              )
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={closeConfirmOpen}
        onClose={() => setCloseConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Close Cashbook?</DialogTitle>
        <DialogContent>
          {actionError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {actionError}
            </Alert>
          ) : null}
          <Typography variant="body2">
            Closing stores the current balance and prevents new transactions
            from being added.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setCloseConfirmOpen(false)}
          >
            Close
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() =>
              void closeCashbook().catch((error) =>
                setActionError(
                  getApiErrorMessage(error, "Failed to close cashbook"),
                ),
              )
            }
          >
            Close Cashbook
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={rolesOpen}
        onClose={() => setRolesOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Set Cashbook Role</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              select
              label="User"
              value={roleForm.user_id}
              onChange={(event) =>
                setRoleForm((current) => ({
                  ...current,
                  user_id: event.target.value,
                }))
              }
              fullWidth
            >
              {accounts
                .filter((account) => account.type === "Personal")
                .map((account) => (
                  <MenuItem key={account.id} value={String(account.id)}>
                    {accountOptionLabel(account)}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              select
              label="Role"
              value={roleForm.role}
              onChange={(event) =>
                setRoleForm((current) => ({
                  ...current,
                  role: event.target.value,
                }))
              }
              fullWidth
            >
              {["Cashbook Admin", "Cashbook Viewer", "Data Entrant"].map(
                (role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ),
              )}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setRolesOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={saveRole}
            disabled={!roleForm.user_id || !roleForm.role}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Cashbook</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Cashbook Name"
                value={editForm.title}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                fullWidth
                required
              />
              <TextField
                label="Description"
                value={editForm.description}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                fullWidth
                multiline
                minRows={3}
              />
              {canManagePrivateVisibility ? (
                <TextField
                  select
                  label="Visibility"
                  value={editForm.visibility}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      visibility: event.target.value,
                    }))
                  }
                  fullWidth
                >
                  {["Public", "Private"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}
              <TextField
                type="number"
                label="Opening Balance"
                value={editForm.opening_balance}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    opening_balance: event.target.value,
                  }))
                }
                fullWidth
                slotProps={{ htmlInput: { step: "0.01" } }}
              />
              <TextField
                select
                label="Status"
                value={editForm.status}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
                fullWidth
              >
                {["Active", "Closed"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <DatePicker
                  label="Start Date"
                  value={toPickerValue(editForm.startdate)}
                  onChange={(value) =>
                    setEditForm((current) => ({
                      ...current,
                      startdate: fromPickerValue(value),
                    }))
                  }
                  disableFuture
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="End Date"
                  value={toPickerValue(editForm.enddate)}
                  onChange={(value) =>
                    setEditForm((current) => ({
                      ...current,
                      enddate: fromPickerValue(value),
                    }))
                  }
                  disablePast
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Stack>
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setEditOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={saveEdit}
            disabled={!editForm.title.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function LocationActionDrawer({
  open,
  actionLabel,
  activeTab,
  form,
  accounts,
  members,
  ministryMembers,
  cashbooks,
  roles,
  availableAssignableLocationRoles,
  zones,
  missionalFamilies,
  schedules,
  attendances,
  mfAttendances,
  attendanceCreateScope,
  terminology,
  canCreatePrivateCashbooks,
  error,
  saving,
  onChange,
  onClose,
  onSave,
  onRegisterMember,
}: LocationActionDrawerProps) {
  const personalAccounts = accounts.filter(
    (account) => account.type === "Personal",
  );
  const activeLocationMemberIds = new Set(
    members
      .filter((member) => member.status !== "Inactive")
      .map((member) => member.user_id),
  );
  const activeMinistryMemberIds = new Set(
    ministryMembers
      .filter((member) => member.status !== "Inactive")
      .map((member) => member.user_id),
  );
  const ministryMemberAccounts = personalAccounts.filter((account) =>
    activeMinistryMemberIds.has(account.id),
  );
  const locationMemberAccounts = personalAccounts.filter((account) =>
    activeLocationMemberIds.has(account.id),
  );
  const closedAdminCashbooks = cashbooks.filter(
    (cashbook) =>
      (cashbook.status || "").toLowerCase() === "closed" && cashbook.can_admin,
  );
  const selectedOpeningBalanceCashbook =
    closedAdminCashbooks.find(
      (cashbook) => cashbook.cashbook_id === form.opening_balance_cashbook_id,
    ) || null;
  const memberPersonOptions = ministryMemberAccounts;
  const rolePersonOptions = ministryMemberAccounts;
  const selectedMemberPerson =
    memberPersonOptions.find((account) => account.id === form.user_id) || null;
  const selectedRolePerson =
    rolePersonOptions.find((account) => account.id === form.user_id) || null;
  const selectedAssignableRole = (form.role || "").trim().toLowerCase();
  const hasDuplicateLocationRole =
    activeTab === 5 &&
    Boolean(form.user_id && selectedAssignableRole) &&
    roles.some(
      (role) =>
        role.user_id === form.user_id &&
        !role.cashbook_id &&
        (role.status || "Active").trim().toLowerCase() === "active" &&
        (role.role || "").trim().toLowerCase() === selectedAssignableRole,
    );
  const leaderOptions = locationMemberAccounts.filter(
    (account) => account.id !== form.leader2_id,
  );
  const assistantOptions = locationMemberAccounts.filter(
    (account) => account.id !== form.leader1_id,
  );
  const schedulesForDate = schedules.filter((schedule) =>
    scheduleOccursOnDate(schedule, form.date),
  );
  const unrecordedSchedulesForDate = schedulesForDate.filter(
    (schedule) =>
      !attendances.some(
        (attendance) =>
          attendance.schedule_id === schedule.id &&
          attendance.date === form.date,
      ),
  );
  const unrecordedMfSchedulesForDate = schedulesForDate.filter(
    (schedule) =>
      !mfAttendances.some(
        (attendance) =>
          attendance.sg_id === form.sg_id &&
          attendance.schedule_id === schedule.id &&
          attendance.adate === form.date,
      ),
  );
  const locationAttendanceRecordedDates = new Set(
    attendances
      .map((attendance) => attendance.date)
      .filter(Boolean) as string[],
  );
  const mfAttendanceRecordedDates = new Set(
    mfAttendances
      .filter((attendance) => !form.sg_id || attendance.sg_id === form.sg_id)
      .map((attendance) => attendance.adate)
      .filter(Boolean) as string[],
  );
  const renderLocationAttendanceScheduleAwareDay = renderScheduleAwareDay(
    schedules,
    locationAttendanceRecordedDates,
  );
  const renderMfAttendanceScheduleAwareDay = renderScheduleAwareDay(
    schedules,
    mfAttendanceRecordedDates,
  );
  const titleLabel =
    activeTab === 2
      ? "CashBook Name"
      : activeTab === 6
        ? `${terminology("zones").replace(/s$/i, "")} Name`
        : activeTab === 7
          ? `${terminology("missionalFamilies")} Name`
          : activeTab === 8
            ? "Schedule Name"
            : activeTab === 9
              ? `${terminology("location")} Name`
              : "Title";
  const memberRegisterDisabled =
    saving ||
    !form.fname.trim() ||
    !form.lname.trim() ||
    !form.phone_number.trim();
  const readProfilePicture = (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      onChange({ profile_picture: String(reader.result || "") });
    reader.readAsDataURL(file);
  };
  const handleProfileDrop = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    readProfilePicture(event.dataTransfer.files?.[0]);
  };
  const actionSaveDisabled =
    saving ||
    hasDuplicateLocationRole ||
    (activeTab === 5 && (!form.user_id || !form.role)) ||
    (activeTab === 7 && !form.zone_id) ||
    (activeTab === 0 && !form.type) ||
    (activeTab === 2 &&
      (!form.title.trim() ||
        !form.startdate ||
        !form.opening_balance_source ||
        (form.opening_balance_source === "previous"
          ? !form.opening_balance_cashbook_id
          : form.opening_balance === ""))) ||
    (activeTab === 8 &&
      (!form.title.trim() ||
        !form.type.trim() ||
        !form.recurrence ||
        (form.recurrence === "Weekly" ? !form.weekday : !form.date) ||
        (!form.all_day && (!form.time || !form.end_time))));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 520 },
            maxWidth: "100%",
          },
        },
      }}
    >
      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              {activeTab === 1
                ? "Add Members"
                : activeTab === 5
                  ? "Assign Role"
                  : activeTab === 7
                    ? `New ${terminology("missionalFamilies")}`
                    : activeTab === 8
                      ? "Create Schedule"
                      : actionLabel}
            </Typography>
          </Box>
        </Stack>
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : null}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2}>
            {activeTab === 1 ? (
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <Autocomplete
                  options={memberPersonOptions}
                  value={selectedMemberPerson}
                  onChange={(_, value) =>
                    onChange({ user_id: value?.id || "" })
                  }
                  getOptionLabel={accountOptionLabel}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Person"
                      required
                      fullWidth
                      slotProps={{
                        ...params.slotProps,
                        input: {
                          ...params.slotProps?.input,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                  fullWidth
                />
                <Tooltip title="Add Member">
                  <span>
                    <IconButton
                      aria-label="Add Member"
                      color="primary"
                      onClick={onSave}
                      disabled={saving || !form.user_id}
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        flex: "0 0 auto",
                        "&:hover": { bgcolor: "primary.dark" },
                        "&.Mui-disabled": {
                          bgcolor: "action.disabledBackground",
                        },
                      }}
                    >
                      <AddPersonIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            ) : null}
            {activeTab === 5 ? (
              <Autocomplete
                options={rolePersonOptions}
                value={selectedRolePerson}
                onChange={(_, value) => onChange({ user_id: value?.id || "" })}
                getOptionLabel={accountOptionLabel}
                renderInput={(params) => (
                  <TextField {...params} label="Person" required fullWidth />
                )}
                fullWidth
              />
            ) : null}
            {activeTab === 5 ? (
              <TextField
                select
                label="Role"
                value={form.role}
                onChange={(event) =>
                  onChange({
                    role: event.target.value,
                    title: event.target.value,
                  })
                }
                required
                fullWidth
              >
                {availableAssignableLocationRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
            {hasDuplicateLocationRole ? (
              <Alert severity="warning">
                This person already has this role at this location.
              </Alert>
            ) : null}
            {activeTab === 5 ? (
              <Stack spacing={1.25}>
                <RadioGroup
                  row
                  value={form.role_scope_type}
                  onChange={(event) =>
                    onChange({
                      role_scope_type: event.target.value,
                      menu_scopes:
                        event.target.value === "Location"
                          ? []
                          : form.menu_scopes,
                    })
                  }
                >
                  <FormControlLabel
                    value="Location"
                    control={<Radio />}
                    label={`Entire ${terminology("location")}`}
                  />
                  <FormControlLabel
                    value="Menus"
                    control={<Radio />}
                    label="Menus"
                  />
                </RadioGroup>
                <TextField
                  select
                  label={`${terminology("location")} Menus`}
                  value={form.menu_scopes}
                  onChange={(event) =>
                    onChange({
                      menu_scopes:
                        typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value,
                    })
                  }
                  disabled={form.role_scope_type !== "Menus"}
                  fullWidth
                  slotProps={{
                    select: {
                      multiple: true,
                      MenuProps: {
                        slotProps: {
                          paper: {
                            sx: { maxHeight: 280 },
                          },
                        },
                      },
                      renderValue: (selected) => (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ flexWrap: "wrap", gap: 0.5 }}
                        >
                          {(selected as string[]).map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              size="small"
                              color="secondary"
                              onMouseDown={(event) => event.stopPropagation()}
                              onDelete={() =>
                                onChange({
                                  menu_scopes: form.menu_scopes.filter(
                                    (scope) => scope !== value,
                                  ),
                                })
                              }
                            />
                          ))}
                        </Stack>
                      ),
                    },
                  }}
                >
                  {roleMenuScopes.map((scope) => (
                    <MenuItem key={scope} value={scope}>
                      <Checkbox checked={form.menu_scopes.includes(scope)} />
                      {scope}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            ) : null}
            {activeTab === 8 ? (
              <Autocomplete
                freeSolo
                options={scheduleTypes}
                value={form.type}
                onInputChange={(_, value) => onChange({ type: value })}
                renderInput={(params) => (
                  <TextField {...params} label="Type" required fullWidth />
                )}
              />
            ) : null}
            {activeTab !== 1 &&
            activeTab !== 3 &&
            activeTab !== 5 &&
            activeTab !== 8 ? (
              <TextField
                label={titleLabel}
                value={form.title}
                onChange={(event) => onChange({ title: event.target.value })}
                required
                fullWidth
              />
            ) : null}
            {activeTab === 8 ? (
              <TextField
                label="Schedule Name"
                value={form.title}
                onChange={(event) => onChange({ title: event.target.value })}
                required
                fullWidth
              />
            ) : null}
            {activeTab === 5 ? (
              <TextField
                select
                label="Role Title"
                value={form.title}
                onChange={(event) => onChange({ title: event.target.value })}
                fullWidth
              >
                {roleTitles.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
            {activeTab === 1 ? (
              <>
                <Divider>Register new person</Divider>
                <Box
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={handleProfileDrop}
                  sx={{
                    border: 1,
                    borderStyle: "dashed",
                    borderColor: "divider",
                    borderRadius: 1,
                    p: 2,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    bgcolor: "action.hover",
                  }}
                >
                  <Avatar
                    src={form.profile_picture || defaultProfilePictureAsset}
                    variant="rounded"
                    sx={{
                      width: 92,
                      height: 92,
                      borderRadius: 1.5,
                      bgcolor: "background.paper",
                    }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                      Profile Picture
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Drag an image here or choose one from your device.
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap" }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            readProfilePicture(event.target.files?.[0])
                          }
                        />
                      </Button>
                      {form.profile_picture ? (
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => onChange({ profile_picture: "" })}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </Stack>
                  </Box>
                </Box>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="First Name"
                    value={form.fname}
                    onChange={(event) =>
                      onChange({ fname: event.target.value })
                    }
                    required
                    fullWidth
                  />
                  <TextField
                    label="Last Name"
                    value={form.lname}
                    onChange={(event) =>
                      onChange({ lname: event.target.value })
                    }
                    required
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Email"
                    value={form.email}
                    onChange={(event) =>
                      onChange({ email: event.target.value })
                    }
                    fullWidth
                  />
                  <TextField
                    label="Phone Number"
                    value={form.phone_number}
                    onChange={(event) =>
                      onChange({ phone_number: event.target.value })
                    }
                    required
                    fullWidth
                  />
                </Stack>
                <TextField
                  select
                  label="Audience"
                  value={form.audience}
                  onChange={(event) =>
                    onChange({ audience: event.target.value })
                  }
                  fullWidth
                >
                  {["Physical", "Online"].map((audience) => (
                    <MenuItem key={audience} value={audience}>
                      {audience}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ) : null}
            {activeTab === 7 ? (
              <TextField
                select
                label={terminology("zones").replace(/s$/i, "")}
                value={form.zone_id}
                onChange={(event) => onChange({ zone_id: event.target.value })}
                required
                fullWidth
              >
                {zones.map((zone) => (
                  <MenuItem key={zone.id} value={String(zone.id)}>
                    {zone.title || `${terminology("zones").replace(/s$/i, "")} #${zone.id}`}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
            {activeTab === 3 ? (
              attendanceCreateScope === "mf" ? (
                <TextField
                  select
                  label={terminology("missionalFamilies")}
                  value={form.sg_id}
                  onChange={(event) => onChange({ sg_id: event.target.value })}
                  required
                  fullWidth
                >
                  {missionalFamilies.map((family) => (
                    <MenuItem key={family.id} value={family.id}>
                      {family.title || `${terminology("missionalFamilies")} #${family.id}`}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null
            ) : null}
            {activeTab === 3 && attendanceCreateScope === "location" ? (
              <DatePicker
                label="Schedule Date"
                value={toPickerValue(form.date)}
                onChange={(value) =>
                  onChange({
                    date: fromPickerValue(value),
                    attendance_records: {},
                    attendance_sources: {},
                  })
                }
                disableFuture
                shouldDisableDate={(day) =>
                  disableFutureSchedulePickerDay(day, schedules)
                }
                slots={{ day: renderLocationAttendanceScheduleAwareDay }}
                slotProps={{ textField: { fullWidth: true } }}
              />
            ) : null}
            {activeTab === 3 && attendanceCreateScope === "location" ? (
              <Stack spacing={1.5}>
                {schedulesForDate.length === 0 ? (
                  <Alert severity="info">
                    No schedules occur on this date.
                  </Alert>
                ) : null}
                {schedulesForDate.length > 0 &&
                unrecordedSchedulesForDate.length === 0 ? (
                  <Alert severity="success">
                    Attendance is already recorded for every schedule on this
                    date.
                  </Alert>
                ) : null}
                {unrecordedSchedulesForDate.map((schedule) => {
                  const aggregateTotal = mfAttendanceTotalForSchedule(
                    mfAttendances,
                    schedule.id,
                    form.date,
                  );
                  const source =
                    form.attendance_sources[schedule.id] ||
                    (aggregateTotal > 0 ? "mf" : "manual");
                  const coverage = mfAttendanceCoverageForSchedule(
                    mfAttendances,
                    missionalFamilies,
                    schedule.id,
                    form.date,
                  );
                  return (
                    <Stack key={schedule.id} spacing={1}>
                      {aggregateTotal > 0 ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={source === "mf"}
                              onChange={(event) =>
                                onChange({
                                  attendance_sources: {
                                    ...form.attendance_sources,
                                    [schedule.id]: event.target.checked
                                      ? "mf"
                                      : "manual",
                                  },
                                })
                              }
                            />
                          }
                          label={
                            <span>{`Use MFs aggregate (${aggregateTotal.toLocaleString()})`}</span>
                          }
                        />
                      ) : null}
                      <TextField
                        type="number"
                        label={
                          scheduleNameTypeLabel(schedule) ||
                          `Schedule #${schedule.id}`
                        }
                        value={
                          source === "mf"
                            ? String(aggregateTotal)
                            : form.attendance_records[schedule.id] || ""
                        }
                        onChange={(event) =>
                          onChange({
                            attendance_records: {
                              ...form.attendance_records,
                              [schedule.id]: event.target.value,
                            },
                          })
                        }
                        required={source === "manual"}
                        slotProps={{
                          input: {
                            readOnly: source === "mf",
                            endAdornment:
                              source === "mf" ? (
                                <InputAdornment position="end">
                                  <Chip
                                    size="small"
                                    color="secondary"
                                    label={`${coverage.percentage}% Recorded`}
                                  />
                                </InputAdornment>
                              ) : null,
                          },
                          htmlInput: { min: 0 },
                        }}
                        fullWidth
                      />
                    </Stack>
                  );
                })}
              </Stack>
            ) : null}
            {[0, 2, 4, 6, 7, 9].includes(activeTab) ? (
              <TextField
                label="Description"
                value={form.description}
                onChange={(event) =>
                  onChange({ description: event.target.value })
                }
                multiline
                minRows={3}
                fullWidth
              />
            ) : null}
            {activeTab === 0 ? (
              <TextField
                select
                label="Post Type"
                value={form.type}
                onChange={(event) => onChange({ type: event.target.value })}
                required
                fullWidth
              >
                {postTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
            {activeTab === 8 ? (
              <TextField
                select
                label="Recurrence"
                value={form.recurrence}
                onChange={(event) =>
                  onChange({ recurrence: event.target.value })
                }
                required
                fullWidth
              >
                {scheduleRecurrences.map((recurrence) => (
                  <MenuItem key={recurrence} value={recurrence}>
                    {recurrence}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
            {activeTab === 9 ? (
                <TextField
                  label="Type"
                  value={terminology("branches").replace(/es$/i, "")}
                  fullWidth
                slotProps={{ input: { readOnly: true } }}
              />
            ) : null}
            {activeTab === 4 ? (
              <Autocomplete
                freeSolo
                options={eventTypes}
                value={form.type}
                onInputChange={(_, value) => onChange({ type: value })}
                renderInput={(params) => (
                  <TextField {...params} label="Type" fullWidth />
                )}
              />
            ) : null}
            {activeTab === 0 ? (
              <TextField
                label="Status"
                value={form.status}
                onChange={(event) => onChange({ status: event.target.value })}
                fullWidth
              />
            ) : null}
            {activeTab === 2 ? (
              <>
                {canCreatePrivateCashbooks ? (
                  <TextField
                    select
                    label="Visibility"
                    value={form.visibility}
                    onChange={(event) =>
                      onChange({ visibility: event.target.value })
                    }
                    fullWidth
                  >
                    {["Public", "Private"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
                <TextField
                  select
                  label="Opening Balance Source"
                  value={form.opening_balance_source}
                  onChange={(event) =>
                    onChange({
                      opening_balance_source: event.target.value,
                      opening_balance_cashbook_id: "",
                      opening_balance: "",
                    })
                  }
                  required
                  fullWidth
                >
                  <MenuItem value="manual">Enter opening balance</MenuItem>
                  <MenuItem value="previous">Pull from cashbook</MenuItem>
                </TextField>
                {form.opening_balance_source === "previous" ? (
                  <Autocomplete
                    options={closedAdminCashbooks}
                    value={selectedOpeningBalanceCashbook}
                    onChange={(_, value) =>
                      onChange({
                        opening_balance_cashbook_id: value?.cashbook_id || "",
                        opening_balance:
                          value?.closing_balance != null
                            ? String(value.closing_balance)
                            : "",
                      })
                    }
                    onInputChange={(_, __, reason) => {
                      if (reason === "clear") {
                        onChange({
                          opening_balance_cashbook_id: "",
                          opening_balance: "",
                        });
                      }
                    }}
                    getOptionLabel={(cashbook) =>
                      `${cashbook.title || `Cashbook #${cashbook.cashbook_id}`} - ${Number(cashbook.closing_balance || 0).toLocaleString()}`
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.cashbook_id === value.cashbook_id
                    }
                    noOptionsText="No closed admin cashbooks found"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Closed Cashbook"
                        helperText="Search closed cashbooks where you are an admin."
                        required
                        fullWidth
                      />
                    )}
                    fullWidth
                  />
                ) : (
                  <TextField
                    type="number"
                    label="Opening Balance"
                    value={form.opening_balance}
                    onChange={(event) =>
                      onChange({ opening_balance: event.target.value })
                    }
                    slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                    required
                    fullWidth
                  />
                )}
                <DatePicker
                  label="Start Date"
                  value={toPickerValue(form.startdate)}
                  onChange={(value) =>
                    onChange({ startdate: fromPickerValue(value) })
                  }
                  disableFuture
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      required: true,
                    },
                  }}
                />
                <DatePicker
                  label="End Date"
                  value={toPickerValue(form.enddate)}
                  onChange={(value) =>
                    onChange({ enddate: fromPickerValue(value) })
                  }
                  disablePast
                  slotProps={{ textField: { size: "small", fullWidth: true } }}
                />
              </>
            ) : null}
            {activeTab === 4 ? (
              <>
                <DatePicker
                  label="Start Date"
                  value={toPickerValue(form.startdate)}
                  onChange={(value) =>
                    onChange({ startdate: fromPickerValue(value) })
                  }
                  disableFuture
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <TextField
                  type="time"
                  label="Start Time"
                  value={form.starttime}
                  onChange={(event) =>
                    onChange({ starttime: event.target.value })
                  }
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </>
            ) : null}
            {activeTab === 8 ? (
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  {form.recurrence === "Weekly" ? (
                    <TextField
                      select
                      label="Weekday"
                      value={form.weekday}
                      onChange={(event) =>
                        onChange({ weekday: event.target.value })
                      }
                      required
                      fullWidth
                    >
                      {weekdays.map((weekday, index) => (
                        <MenuItem key={weekday} value={String(index)}>
                          {weekday}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <DatePicker
                      label="Date"
                      value={toPickerValue(form.date)}
                      onChange={(value) =>
                        onChange({ date: fromPickerValue(value) })
                      }
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  )}
                </Stack>
                <Stack spacing={1.5} sx={{ width: "100%" }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ width: "100%" }}
                  >
                    <TimePicker
                      label="Start Time"
                      value={toTimePickerValue(form.time)}
                      onChange={(value) =>
                        onChange({ time: fromTimePickerValue(value) })
                      }
                      ampm
                      views={["hours", "minutes"]}
                      format="hh:mm a"
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                    <TimePicker
                      label="End Time"
                      value={toTimePickerValue(form.end_time)}
                      onChange={(value) =>
                        onChange({ end_time: fromTimePickerValue(value) })
                      }
                      ampm
                      views={["hours", "minutes"]}
                      format="hh:mm a"
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            ) : null}
            {activeTab === 3 && attendanceCreateScope === "mf" ? (
              <>
                <DatePicker
                  label="Schedule Date"
                  value={toPickerValue(form.date)}
                  onChange={(value) =>
                    onChange({
                      date: fromPickerValue(value),
                      schedule_id: "",
                      attendance_records: {},
                    })
                  }
                  disableFuture
                  shouldDisableDate={(day) =>
                    disableFutureSchedulePickerDay(day, schedules)
                  }
                  slots={{ day: renderMfAttendanceScheduleAwareDay }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <Stack spacing={1.5}>
                  {schedulesForDate.length === 0 ? (
                    <Alert severity="info">
                      No schedules occur on this date.
                    </Alert>
                  ) : null}
                  {schedulesForDate.length > 0 && !form.sg_id ? (
                    <Alert severity="info">
                      Select a missional family to collect schedule attendances.
                    </Alert>
                  ) : null}
                  {form.sg_id &&
                  schedulesForDate.length > 0 &&
                  unrecordedMfSchedulesForDate.length === 0 ? (
                    <Alert severity="success">
                      Attendance is already recorded for every schedule on this
                      date.
                    </Alert>
                  ) : null}
                  {form.sg_id
                    ? unrecordedMfSchedulesForDate.map((schedule) => (
                        <TextField
                          key={schedule.id}
                          type="number"
                          label={
                            scheduleNameTypeLabel(schedule) ||
                            `Schedule #${schedule.id}`
                          }
                          value={form.attendance_records[schedule.id] || ""}
                          onChange={(event) =>
                            onChange({
                              attendance_records: {
                                ...form.attendance_records,
                                [schedule.id]: event.target.value,
                              },
                            })
                          }
                          required
                          slotProps={{ htmlInput: { min: 0 } }}
                          fullWidth
                        />
                      ))
                    : null}
                </Stack>
                <TextField
                  label="Remarks"
                  value={form.description}
                  onChange={(event) =>
                    onChange({ description: event.target.value })
                  }
                  multiline
                  minRows={3}
                  fullWidth
                />
              </>
            ) : null}
            {activeTab === 3 && attendanceCreateScope === "location" ? (
              <TextField
                label="Remarks"
                value={form.description}
                onChange={(event) =>
                  onChange({ description: event.target.value })
                }
                multiline
                minRows={3}
                fullWidth
              />
            ) : null}
            {activeTab === 4 ? (
              <>
                <TextField
                  label="Venue"
                  value={form.venue}
                  onChange={(event) => onChange({ venue: event.target.value })}
                  fullWidth
                />
                <TextField
                  label="Speakers"
                  value={form.speakers}
                  onChange={(event) =>
                    onChange({ speakers: event.target.value })
                  }
                  fullWidth
                />
              </>
            ) : null}
            {[6, 7].includes(activeTab) ? (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Autocomplete
                  options={leaderOptions}
                  value={
                    locationMemberAccounts.find(
                      (account) => account.id === form.leader1_id,
                    ) || null
                  }
                  onChange={(_, value) =>
                    onChange({ leader1_id: value?.id || "" })
                  }
                  getOptionLabel={accountOptionLabel}
                  renderInput={(params) => (
                    <TextField {...params} label="Leader" fullWidth />
                  )}
                  fullWidth
                />
                <Autocomplete
                  options={assistantOptions}
                  value={
                    locationMemberAccounts.find(
                      (account) => account.id === form.leader2_id,
                    ) || null
                  }
                  onChange={(_, value) =>
                    onChange({ leader2_id: value?.id || "" })
                  }
                  getOptionLabel={accountOptionLabel}
                  renderInput={(params) => (
                    <TextField {...params} label="Assistant" fullWidth />
                  )}
                  fullWidth
                />
              </Stack>
            ) : null}
            {activeTab === 9 ? (
              <>
                <TextField
                  label="Email"
                  value={form.email}
                  onChange={(event) => onChange({ email: event.target.value })}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  value={form.phone_number}
                  onChange={(event) =>
                    onChange({ phone_number: event.target.value })
                  }
                  fullWidth
                />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Country"
                    value={form.country}
                    onChange={(event) =>
                      onChange({ country: event.target.value })
                    }
                    fullWidth
                  />
                  <TextField
                    label="Region"
                    value={form.district}
                    onChange={(event) =>
                      onChange({ district: event.target.value })
                    }
                    fullWidth
                  />
                </Stack>
                <TextField
                  label="City"
                  value={form.city}
                  onChange={(event) => onChange({ city: event.target.value })}
                  fullWidth
                />
                <TextField
                  label="Address"
                  value={form.address}
                  onChange={(event) =>
                    onChange({ address: event.target.value })
                  }
                  fullWidth
                />
              </>
            ) : null}
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClose}
                disabled={saving}
                fullWidth
              >
                Close
              </Button>
              {activeTab === 1 ? null : (
                <Button
                  variant="contained"
                  onClick={onSave}
                  disabled={actionSaveDisabled}
                  fullWidth
                >
                  {saving ? (
                    <>
                      <CircularProgress
                        size={18}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              )}
              {activeTab === 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onRegisterMember}
                  disabled={memberRegisterDisabled}
                  fullWidth
                >
                  {saving ? (
                    <>
                      <CircularProgress
                        size={18}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Saving...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </LocalizationProvider>
      </Box>
    </Drawer>
  );
}

function ResourceGrid({
  empty,
  children,
}: {
  empty: string;
  children: ReactNode;
}) {
  const items = Children.toArray(children);

  return items.length === 0 ? (
    <EmptyState
      title={empty}
      message="Create or assign records in the backend to see them here."
    />
  ) : (
    <Grid container spacing={2}>
      {items.map((child, index) => (
        <Grid key={index} size={{ xs: 12, lg: 6 }}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
}

export function CashbookDetailPage() {
  const { cashbookId } = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const account = getSessionAccount();
  const theme = useTheme();
  const isMobilePdfPreview = useMediaQuery(theme.breakpoints.down("md"));
  const {
    data: cashbook,
    setData: setCashbook,
    error,
  } = useResource<Cashbook>(
    `/cashbooks/${cashbookId}?requester_id=${account?.id || ""}`,
  );
  const [userCashbooks, setUserCashbooks] = useState<Cashbook[]>([]);
  const [particulars, setParticulars] = useState<Particular[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [particularsOpen, setParticularsOpen] = useState(false);
  const [permissionsOpen, setPermissionsOpen] = useState(false);
  const [cashbookEditOpen, setCashbookEditOpen] = useState(false);
  const [cashbookDeleteConfirmOpen, setCashbookDeleteConfirmOpen] =
    useState(false);
  const [cashbookCloseConfirmOpen, setCashbookCloseConfirmOpen] =
    useState(false);
  const [cashbookMenuAnchor, setCashbookMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [cashbookReportMenuAnchor, setCashbookReportMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [cashbookReportOpen, setCashbookReportOpen] = useState(false);
  const [cashbookReportLoading, setCashbookReportLoading] = useState(false);
  const [cashbookReportType, setCashbookReportType] =
    useState<CashbookTransactionReportType>("all");
  const [cashbookChooserOpen, setCashbookChooserOpen] = useState(false);
  const [permissionsError, setPermissionsError] = useState("");
  const [cashbookEditError, setCashbookEditError] = useState("");
  const [cashbookActionError, setCashbookActionError] = useState("");
  const [cashbookRoles, setCashbookRoles] = useState<Role[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [cashbookMinistryMembers, setCashbookMinistryMembers] = useState<
    Member[]
  >([]);
  const [cashbookSearch, setCashbookSearch] = useState("");
  const [particularForm, setParticularForm] = useState({
    title: "",
    category: "",
    type: "",
  });
  const [particularSearch, setParticularSearch] = useState("");
  const [editingParticularId, setEditingParticularId] = useState<string | null>(
    null,
  );
  const [permissionForm, setPermissionForm] = useState({
    user_id: "",
    role: "",
  });
  const [transactionError, setTransactionError] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState("");
  const [transactionSaving, setTransactionSaving] = useState(false);
  const [transactionValidation, setTransactionValidation] = useState<
    Record<string, string>
  >({});
  const [addTransactionOpen, setAddTransactionOpen] = useState(false);
  const [transactionTab, setTransactionTab] = useState("normal");
  const [particularError, setParticularError] = useState("");
  const [cashbookEditForm, setCashbookEditForm] = useState({
    title: "",
    description: "",
    status: "Active",
    startdate: "",
    enddate: "",
    opening_balance: "",
  });
  const [cashbookReportFilters, setCashbookReportFilters] = useState({
    particularId: "",
    startDate: "",
    endDate: "",
  });
  const [transactionForm, setTransactionForm] = useState({
    transaction_date: today(),
    schedule_date: "",
    category: "",
    mode: "",
    amount: "",
    particular_id: "",
    schedule_id: "",
    schedule_not_applicable: false,
    received_by_or_from: "",
    remarks: "",
  });
  const [transactionMenuAnchor, setTransactionMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactionDetailsOpen, setTransactionDetailsOpen] = useState(false);
  const [transactionEditOpen, setTransactionEditOpen] = useState(false);
  const [transactionDeleteConfirmOpen, setTransactionDeleteConfirmOpen] =
    useState(false);
  const [transactionActionError, setTransactionActionError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    title: string;
    description: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);
  const [deleteConfirmSaving, setDeleteConfirmSaving] = useState(false);
  const [deleteConfirmError, setDeleteConfirmError] = useState("");
  const [transactionEditForm, setTransactionEditForm] = useState({
    transaction_date: "",
    schedule_date: "",
    category: "",
    mode: "",
    amount: "",
    particular_id: "",
    schedule_id: "",
    received_by_or_from: "",
    remarks: "",
  });
  const [scheduleCollectionForm, setScheduleCollectionForm] = useState({
    schedule_date: "",
    schedule_type: "",
    particular_id: "",
    mode: "",
    remarks: "",
    amounts: {} as Record<string, string>,
  });
  const [scheduleCollectionValidation, setScheduleCollectionValidation] =
    useState<Record<string, string>>({});

  const requestDeleteConfirmation = (
    title: string,
    description: string,
    onConfirm: () => Promise<void> | void,
  ) => {
    setDeleteConfirm({ title, description, onConfirm });
    setDeleteConfirmError("");
  };

  const closeDeleteConfirmation = () => {
    if (deleteConfirmSaving) {
      return;
    }
    setDeleteConfirm(null);
    setDeleteConfirmError("");
  };

  const confirmPendingDelete = async () => {
    if (!deleteConfirm) {
      return;
    }
    setDeleteConfirmSaving(true);
    setDeleteConfirmError("");
    try {
      await deleteConfirm.onConfirm();
      setDeleteConfirm(null);
    } catch (requestError) {
      setDeleteConfirmError(
        getApiErrorMessage(requestError, "Failed to delete record"),
      );
    } finally {
      setDeleteConfirmSaving(false);
    }
  };

  useEffect(() => {
    if (!cashbook?.location_id) {
      return;
    }
    api
      .get<Particular[]>(`/particulars?location_id=${cashbook.location_id}`)
      .then((response) => setParticulars(response.data))
      .catch(() => setParticulars([]));
    api
      .get<Schedule[]>(`/schedules?location_id=${cashbook.location_id}`)
      .then((response) => setSchedules(response.data))
      .catch(() => setSchedules([]));
  }, [cashbook?.location_id]);

  useEffect(() => {
    if (!account) {
      return;
    }
    api
      .get<Cashbook[]>(`/cashbooks?requester_id=${account.id}`)
      .then((response) => setUserCashbooks(response.data))
      .catch(() => setUserCashbooks([]));
  }, [account?.id]);

  if (!cashbook) {
    return <LoadingOrError error={error} />;
  }

  const cashbookRouteState = routerLocation.state as {
    cashbookReturnTo?: string;
  } | null;
  const cashbookReturnTo =
    cashbookRouteState?.cashbookReturnTo ||
    (cashbook.location_id ? `/app/locations/${cashbook.location_id}` : "/app");
  const transactions = cashbook.transactions || [];
  const openingBalanceTransactionRow: TransactionGridRow = {
    transaction_id: "__opening_balance__",
    transaction_date: cashbook.startdate || "",
    particular_title: "Opening Balance",
    category: "Balance",
    amount: Number(cashbook.opening_balance || 0),
    mode: "-",
    isOpeningBalance: true,
  };
  const transactionGridRows: TransactionGridRow[] = [
    openingBalanceTransactionRow,
    ...transactions,
  ];
  const transactionColumns: GridColDef<TransactionGridRow>[] = [
    {
      field: "transaction_date",
      headerName: "Date",
      minWidth: 130,
      flex: 0.75,
    },
    {
      field: "particular_title",
      headerName: "Particular",
      minWidth: 170,
      flex: 1,
    },
    { field: "category", headerName: "Type", minWidth: 120, flex: 0.7 },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 130,
      flex: 0.8,
      valueGetter: (_, row) => Number(row.amount || 0).toLocaleString(),
    },
    { field: "mode", headerName: "Mode", minWidth: 120, flex: 0.7 },
    {
      field: "actions",
      headerName: "Actions",
      width: 96,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) =>
        row.isOpeningBalance ? null : (
          <IconButton
            aria-label="Transaction actions"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedTransaction(row);
              setTransactionMenuAnchor(event.currentTarget);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        ),
    },
  ];
  const incomeTotal = transactions.reduce(
    (sum, transaction) =>
      transaction.category?.toLowerCase() === "income"
        ? sum + Number(transaction.amount || 0)
        : sum,
    0,
  );
  const expenseTotal = transactions.reduce(
    (sum, transaction) =>
      transaction.category?.toLowerCase() === "expense"
        ? sum + Number(transaction.amount || 0)
        : sum,
    0,
  );
  const total = incomeTotal - expenseTotal;
  const monthlyTransactionCards = Array.from(
    transactions
      .reduce<
        Map<
          string,
          {
            label: string;
            rows: Transaction[];
            income: number;
            expense: number;
          }
        >
      >((groups, transaction) => {
        const date = dayjs(
          transaction.transaction_date || transaction.created_at || undefined,
        );
        const key = date.isValid() ? date.format("YYYY-MM") : "unknown";
        const existing = groups.get(key) || {
          label: date.isValid() ? date.format("MMMM YYYY") : "Undated",
          rows: [],
          income: 0,
          expense: 0,
        };
        existing.rows.push(transaction);
        if ((transaction.category || "").toLowerCase() === "income") {
          existing.income += Number(transaction.amount || 0);
        }
        if ((transaction.category || "").toLowerCase() === "expense") {
          existing.expense += Number(transaction.amount || 0);
        }
        groups.set(key, existing);
        return groups;
      }, new Map())
      .entries(),
  )
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([, group]) => group);
  const TransactionMetricItem = ({
    icon,
    label,
    value,
  }: {
    icon: ReactNode;
    label: string;
    value: string | number;
  }) => (
    <ListItem
      disableGutters
      divider
      sx={{ py: 0.9, "&:last-of-type": { borderBottom: 0 } }}
    >
      <ListItemIcon sx={{ minWidth: 34 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        slotProps={{ primary: { variant: "body2" } }}
      />
      <Typography variant="body2" sx={{ ml: 2 }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </Typography>
    </ListItem>
  );
  const selectedCashbookReportParticular =
    particulars.find(
      (particular) =>
        particular.particular_id === cashbookReportFilters.particularId,
    ) || null;
  const cashbookReportTransactions = transactions
    .filter((transaction) => {
      if (cashbookReportType === "normal" && transaction.schedule_id) {
        return false;
      }
      if (cashbookReportType === "schedule" && !transaction.schedule_id) {
        return false;
      }
      if (
        cashbookReportFilters.particularId &&
        transaction.particular_id !== cashbookReportFilters.particularId
      ) {
        return false;
      }
      const reportDate =
        transaction.transaction_date || transaction.schedule_date || "";
      if (
        cashbookReportFilters.startDate &&
        (!reportDate || reportDate < cashbookReportFilters.startDate)
      ) {
        return false;
      }
      if (
        cashbookReportFilters.endDate &&
        (!reportDate || reportDate > cashbookReportFilters.endDate)
      ) {
        return false;
      }
      return true;
    })
    .slice()
    .sort(
      (first, second) =>
        (first.transaction_date || first.schedule_date || "").localeCompare(
          second.transaction_date || second.schedule_date || "",
        ) ||
        (first.created_at || "").localeCompare(second.created_at || "") ||
        first.transaction_id.localeCompare(second.transaction_id),
    );
  const cashbookOpeningBalance = Number(cashbook.opening_balance || 0);
  const cashbookReportRows = cashbookReportTransactions.reduce<
    CashbookTransactionReportRow[]
  >((rows, transaction, index) => {
    const amount = Number(transaction.amount || 0);
    const isIncome =
      (transaction.category || "").trim().toLowerCase() === "income";
    const income = isIncome ? amount : 0;
    const expenditure = isIncome ? 0 : amount;
    const previousBalance = rows.at(-1)?.balance || cashbookOpeningBalance;
    rows.push({
      no: index + 1,
      date: transaction.transaction_date || transaction.schedule_date || "",
      particular:
        transaction.particular_title ||
        (transaction.particular_id
          ? `Particular #${transaction.particular_id}`
          : "Not set"),
      income,
      expenditure,
      balance: previousBalance + income - expenditure,
    });
    return rows;
  }, []);
  const cashbookReportPdfTitle = `${cashbook.title || "Cashbook"} - ${
    cashbookReportLabels[cashbookReportType]
  } Report`;
  const cashbookReportPdfFileName = pdfFileName(cashbookReportPdfTitle);
  const exportCashbookReportExcel = () => {
    const totalIncome = cashbookReportRows.reduce(
      (sum, row) => sum + row.income,
      0,
    );
    const totalExpenditure = cashbookReportRows.reduce(
      (sum, row) => sum + row.expenditure,
      0,
    );
    const finalBalance =
      cashbookReportRows.at(-1)?.balance ?? cashbookOpeningBalance;
    const title = cashbookReportPdfTitle;
    const dateRange = [
      selectedCashbookReportParticular?.title || null,
      cashbookReportFilters.startDate
        ? `From ${cashbookReportFilters.startDate}`
        : null,
      cashbookReportFilters.endDate
        ? `To ${cashbookReportFilters.endDate}`
        : null,
    ]
      .filter(Boolean)
      .join(" ");
    const workbook = createCashbookReportWorkbook({
      title,
      subtitle: [cashbook.location_title, dateRange || "All dates"]
        .filter(Boolean)
        .join(" | "),
      rows: cashbookReportRows,
      openingBalance: cashbookOpeningBalance,
      totalIncome,
      totalExpenditure,
      finalBalance,
    });
    const blob = new Blob([workbook], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeExportFileName(`${cashbook.title || "cashbook"}-${cashbookReportLabels[cashbookReportType]}`)}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const personalAccounts = accounts.filter((item) => item.type === "Personal");
  const eligibleCashbookUserIds = new Set(
    cashbookMinistryMembers
      .filter((member) => member.status !== "Inactive" && member.user_id)
      .map((member) => member.user_id!),
  );
  const eligibleCashbookAccounts = personalAccounts.filter((item) =>
    eligibleCashbookUserIds.has(item.id),
  );
  const displayedUserCashbooks = userCashbooks
    .filter((item) => {
      const searchValue = cashbookSearch.trim().toLowerCase();
      if (!searchValue) {
        return true;
      }
      return [
        item.title,
        item.location_title,
        item.status,
        item.description,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchValue),
      );
    })
    .slice()
    .sort((left, right) => {
      if (left.cashbook_id === cashbook.cashbook_id) {
        return -1;
      }
      if (right.cashbook_id === cashbook.cashbook_id) {
        return 1;
      }
      return 0;
    });
  const cashbookListContent = (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Cashbooks
        </Typography>
        <TextField
          label="Search cashbooks"
          value={cashbookSearch}
          onChange={(event) => setCashbookSearch(event.target.value)}
          fullWidth
          sx={{ mt: 1.5 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      {displayedUserCashbooks.length === 0 ? (
        <Box sx={{ px: 2.5, pb: 2.5 }}>
          <Typography variant="body2" color="text.secondary">
            No cashbooks to show.
          </Typography>
        </Box>
      ) : (
        <List
          disablePadding
          sx={{
            maxHeight: { xs: "calc(100dvh - 220px)", md: 420 },
            overflowY: "auto",
          }}
        >
          {displayedUserCashbooks.map((item) => (
            <ListItem key={item.cashbook_id} disablePadding divider>
              <ListItemButton
                selected={item.cashbook_id === cashbook.cashbook_id}
                onClick={() => {
                  setCashbookChooserOpen(false);
                  navigate(`/app/cashbooks/${item.cashbook_id}`, {
                    state: { cashbookReturnTo },
                  });
                }}
              >
                <ListItemText
                  primary={
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", minWidth: 0 }}
                    >
                      <Typography variant="body1" sx={{ minWidth: 0 }} noWrap>
                        {item.title || `Cashbook #${item.cashbook_id}`}
                      </Typography>
                      {(item.status || "").toLowerCase() === "closed" ? (
                        <BlockIcon color="disabled" fontSize="small" />
                      ) : (
                        <VerifiedIcon color="secondary" fontSize="small" />
                      )}
                    </Stack>
                  }
                  secondary={item.location_title || "Cashbook"}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
  const filteredParticulars = particulars.filter((particular) => {
    const searchValue = particularSearch.trim().toLowerCase();
    if (!searchValue) {
      return true;
    }
    return [particular.title, particular.category, particular.type].some(
      (value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchValue),
    );
  });
  const generalParticulars = particulars.filter(
    (particular) =>
      (particular.type || "General").trim().toLowerCase() === "general",
  );
  const incomeParticulars = particulars.filter(
    (particular) =>
      (particular.category || "").trim().toLowerCase() === "income" &&
      (particular.type || "General").trim().toLowerCase() ===
        "schedule collection",
  );
  const canOpenCashbookMenu = Boolean(cashbook.cashbook_id);
  const transactionRecordedScheduleDates = new Set(
    transactions
      .filter((transaction) => Boolean(transaction.schedule_id))
      .map((transaction) => transaction.schedule_date)
      .filter(Boolean) as string[],
  );
  const renderScheduleFilterDay = renderScheduleAwareDay(
    schedules,
    transactionRecordedScheduleDates,
  );
  const scheduleCollectionSchedulesForDate = schedules.filter((schedule) =>
    scheduleOccursOnDate(schedule, scheduleCollectionForm.schedule_date),
  );
  const scheduleCollectionTypeOptions = uniqueScheduleTypes(
    scheduleCollectionSchedulesForDate,
  );
  const scheduleCollectionSchedules = scheduleCollectionSchedulesForDate.filter(
    (schedule) =>
      !scheduleCollectionForm.schedule_type ||
      schedule.type === scheduleCollectionForm.schedule_type,
  );
  const scheduleCollectionRecorded = (scheduleId: string) =>
    transactions.find(
      (transaction) =>
        transaction.schedule_id === scheduleId &&
        transaction.schedule_date === scheduleCollectionForm.schedule_date &&
        transaction.particular_id === scheduleCollectionForm.particular_id,
    );

  const addTransaction = async () => {
    if (!account) {
      return;
    }
    setTransactionError("");
    setTransactionSuccess("");
    const validation: Record<string, string> = {};
    if (!transactionForm.transaction_date) {
      validation.transaction_date = "Date is required.";
    }
    if (!transactionForm.category) {
      validation.category = "Type is required.";
    }
    if (!transactionForm.amount || Number(transactionForm.amount) <= 0) {
      validation.amount = "Enter an amount greater than zero.";
    }
    if (!transactionForm.particular_id) {
      validation.particular_id = "Particular is required.";
    }
    if (!transactionForm.mode) {
      validation.mode = "Mode is required.";
    }
    setTransactionValidation(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    setTransactionSaving(true);
    try {
      await api.post("/transactions", {
        requester_id: account.id,
        cashbook_id: cashbook.cashbook_id,
        transaction_date: transactionForm.transaction_date || null,
        schedule_date: null,
        category: transactionForm.category,
        mode: transactionForm.mode,
        amount: Number(transactionForm.amount || 0),
        particular_id: transactionForm.particular_id || null,
        schedule_id: null,
        received_by_or_from: transactionForm.received_by_or_from,
        remarks: transactionForm.remarks,
      });
      const response = await api.get<Cashbook>(
        `/cashbooks/${cashbook.cashbook_id}?requester_id=${account.id}`,
      );
      setCashbook(response.data);
      setTransactionForm({
        transaction_date: today(),
        schedule_date: "",
        category: "",
        mode: "",
        amount: "",
        particular_id: "",
        schedule_id: "",
        schedule_not_applicable: false,
        received_by_or_from: "",
        remarks: "",
      });
      setTransactionValidation({});
      setTransactionSuccess("Transaction saved successfully.");
    } catch (requestError) {
      setTransactionError(
        getApiErrorMessage(requestError, "Failed to save transaction"),
      );
    } finally {
      setTransactionSaving(false);
    }
  };

  const saveScheduleCollections = async () => {
    if (!account) {
      return;
    }
    setTransactionError("");
    setTransactionSuccess("");
    const validation: Record<string, string> = {};
    if (!scheduleCollectionForm.schedule_date) {
      validation.schedule_date = "Schedule date is required.";
    }
    if (!scheduleCollectionForm.particular_id) {
      validation.particular_id = "Collection is required.";
    }
    if (!scheduleCollectionForm.mode) {
      validation.mode = "Mode is required.";
    }
    const rows = scheduleCollectionSchedules
      .map((schedule) => ({
        schedule,
        amount: Number(scheduleCollectionForm.amounts[schedule.id] || 0),
        duplicate: Boolean(scheduleCollectionRecorded(schedule.id)),
      }))
      .filter((row) => row.amount > 0);
    if (!rows.length) {
      validation.amounts = "Enter at least one collection amount.";
    }
    const duplicateRow = rows.find((row) => row.duplicate);
    if (duplicateRow) {
      validation.amounts = `${scheduleOptionLabel(duplicateRow.schedule)} is already recorded for this collection.`;
    }
    setScheduleCollectionValidation(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    setTransactionSaving(true);
    try {
      await Promise.all(
        rows.map((row) =>
          api.post("/transactions", {
            requester_id: account.id,
            cashbook_id: cashbook.cashbook_id,
            transaction_date: scheduleCollectionForm.schedule_date,
            schedule_date: scheduleCollectionForm.schedule_date,
            category: "Income",
            mode: scheduleCollectionForm.mode,
            amount: row.amount,
            particular_id: scheduleCollectionForm.particular_id,
            schedule_id: row.schedule.id,
            remarks: scheduleCollectionForm.remarks,
          }),
        ),
      );
      const response = await api.get<Cashbook>(
        `/cashbooks/${cashbook.cashbook_id}?requester_id=${account.id}`,
      );
      setCashbook(response.data);
      setScheduleCollectionForm({
        schedule_date: "",
        schedule_type: "",
        particular_id: "",
        mode: "",
        remarks: "",
        amounts: {},
      });
      setScheduleCollectionValidation({});
      setTransactionSuccess("Schedule collections saved successfully.");
    } catch (requestError) {
      setTransactionError(
        getApiErrorMessage(requestError, "Failed to save schedule collections"),
      );
    } finally {
      setTransactionSaving(false);
    }
  };

  const addTransactionSaveDisabled =
    transactionSaving ||
    (transactionTab === "schedule"
      ? !scheduleCollectionForm.schedule_date ||
        !scheduleCollectionForm.particular_id ||
        !scheduleCollectionForm.mode
      : !transactionForm.category ||
        !transactionForm.particular_id ||
        !transactionForm.mode);

  const saveActiveTransactionTab = () => {
    if (transactionTab === "schedule") {
      void saveScheduleCollections();
      return;
    }
    void addTransaction();
  };

  const loadParticulars = async () => {
    if (!cashbook.location_id) {
      return;
    }
    const response = await api.get<Particular[]>(
      `/particulars?location_id=${cashbook.location_id}`,
    );
    setParticulars(response.data);
  };

  const resetParticularForm = () => {
    setParticularForm({ title: "", category: "", type: "" });
    setEditingParticularId(null);
    setParticularError("");
  };

  const openParticularsModal = () => {
    resetParticularForm();
    setParticularsOpen(true);
  };

  const saveParticular = async () => {
    if (
      !account ||
      !cashbook.location_id ||
      !particularForm.title.trim() ||
      !particularForm.category ||
      !particularForm.type
    ) {
      setParticularError("Enter a particular title, category, and type.");
      return;
    }
    setParticularError("");
    try {
      const payload = {
        requester_id: account.id,
        cashbook_id: cashbook.cashbook_id,
        title: particularForm.title,
        category: particularForm.category,
        type: particularForm.type,
      };
      if (editingParticularId) {
        await api.patch(`/particulars/${editingParticularId}`, payload);
      } else {
        await api.post("/particulars", {
          ...payload,
          location_id: cashbook.location_id,
        });
      }
      resetParticularForm();
      await loadParticulars();
    } catch (requestError) {
      setParticularError(
        getApiErrorMessage(
          requestError,
          `Failed to ${editingParticularId ? "update" : "add"} particular`,
        ),
      );
    }
  };

  const editParticular = (particular: Particular) => {
    setEditingParticularId(particular.particular_id);
    setParticularForm({
      title: particular.title || "",
      category: particular.category || "Income",
      type: particular.type || "General",
    });
    setParticularError("");
  };

  const loadCashbookRoles = async () => {
    const response = await api.get<Role[]>(
      `/roles?cashbook_id=${cashbook.cashbook_id}`,
    );
    setCashbookRoles(
      response.data.filter((role) => role.status !== "Inactive"),
    );
  };

  const refreshSelectedCashbook = async () => {
    if (!account) {
      return;
    }
    const response = await api.get<Cashbook>(
      `/cashbooks/${cashbook.cashbook_id}?requester_id=${account.id}`,
    );
    setCashbook(response.data);
    const cashbooksResponse = await api.get<Cashbook[]>(
      `/cashbooks?requester_id=${account.id}`,
    );
    setUserCashbooks(cashbooksResponse.data);
  };

  const closeTransactionMenu = () => {
    setTransactionMenuAnchor(null);
  };

  const openTransactionDetails = () => {
    setTransactionDetailsOpen(true);
    setTransactionActionError("");
    closeTransactionMenu();
  };

  const openTransactionEdit = () => {
    if (!selectedTransaction) {
      return;
    }
    setTransactionEditForm({
      transaction_date: selectedTransaction.transaction_date || "",
      schedule_date: selectedTransaction.schedule_date || "",
      category: selectedTransaction.category || "",
      mode: selectedTransaction.mode || "",
      amount: String(selectedTransaction.amount || ""),
      particular_id: selectedTransaction.particular_id || "",
      schedule_id: selectedTransaction.schedule_id || "",
      received_by_or_from: selectedTransaction.received_by_or_from || "",
      remarks: selectedTransaction.remarks || "",
    });
    setTransactionActionError("");
    setTransactionEditOpen(true);
    closeTransactionMenu();
  };

  const saveTransactionEdit = async () => {
    if (!account || !selectedTransaction) {
      return;
    }
    setTransactionActionError("");
    try {
      await api.patch(`/transactions/${selectedTransaction.transaction_id}`, {
        requester_id: account.id,
        transaction_date: transactionEditForm.transaction_date || null,
        schedule_date: transactionEditForm.schedule_id
          ? transactionEditForm.schedule_date ||
            transactionEditForm.transaction_date ||
            null
          : null,
        category: transactionEditForm.category,
        mode: transactionEditForm.mode,
        amount: Number(transactionEditForm.amount || 0),
        particular_id: transactionEditForm.particular_id || null,
        schedule_id: transactionEditForm.schedule_id || null,
        received_by_or_from: transactionEditForm.received_by_or_from,
        remarks: transactionEditForm.remarks,
      });
      setTransactionEditOpen(false);
      setSelectedTransaction(null);
      await refreshSelectedCashbook();
      setTransactionSuccess("Transaction updated successfully.");
    } catch (requestError) {
      setTransactionActionError(
        getApiErrorMessage(requestError, "Failed to update transaction"),
      );
    }
  };

  const deleteTransaction = async () => {
    if (!account || !selectedTransaction) {
      return;
    }
    setTransactionActionError("");
    try {
      await api.delete(
        `/transactions/${selectedTransaction.transaction_id}?requester_id=${account.id}`,
      );
      setTransactionDeleteConfirmOpen(false);
      setSelectedTransaction(null);
      await refreshSelectedCashbook();
      setTransactionSuccess("Transaction deleted successfully.");
    } catch (requestError) {
      setTransactionActionError(
        getApiErrorMessage(requestError, "Failed to delete transaction"),
      );
    }
  };

  const openPermissions = async () => {
    setPermissionsError("");
    setCashbookMenuAnchor(null);
    setPermissionsOpen(true);
    try {
      const [rolesResponse, accountsResponse] = await Promise.all([
        api.get<Role[]>(`/roles?cashbook_id=${cashbook.cashbook_id}`),
        api.get<Account[]>("/accounts"),
      ]);
      let ministryMembers: Member[] = [];
      if (cashbook.location_id) {
        const locationResponse = await api.get<Location>(
          `/locations/${cashbook.location_id}`,
        );
        if (locationResponse.data.owner_id) {
          const membersResponse = await api.get<Member[]>(
            `/members?owner_id=${locationResponse.data.owner_id}`,
          );
          ministryMembers = membersResponse.data;
        }
      }
      setCashbookRoles(
        rolesResponse.data.filter((role) => role.status !== "Inactive"),
      );
      setAccounts(accountsResponse.data);
      setCashbookMinistryMembers(ministryMembers);
    } catch (requestError) {
      setPermissionsError(
        getApiErrorMessage(requestError, "Failed to load cashbook permissions"),
      );
    }
  };

  const saveCashbookRole = async () => {
    if (!account || !permissionForm.user_id || !permissionForm.role) {
      return;
    }
    setPermissionsError("");
    try {
      await api.post(`/cashbooks/${cashbook.cashbook_id}/roles`, {
        requester_id: account.id,
        user_id: permissionForm.user_id,
        role: permissionForm.role,
      });
      setPermissionForm({ user_id: "", role: "" });
      await loadCashbookRoles();
    } catch (requestError) {
      setPermissionsError(
        getApiErrorMessage(requestError, "Failed to save cashbook role"),
      );
    }
  };

  const changeCashbookRole = async (role: Role, nextRole: string) => {
    if (!account || !role.user_id) {
      return;
    }
    setPermissionsError("");
    try {
      await api.post(`/cashbooks/${cashbook.cashbook_id}/roles`, {
        requester_id: account.id,
        user_id: role.user_id,
        role: nextRole,
      });
      await loadCashbookRoles();
    } catch (requestError) {
      setPermissionsError(
        getApiErrorMessage(requestError, "Failed to update cashbook role"),
      );
    }
  };

  const removeCashbookRole = async (role: Role) => {
    if (!account) {
      return;
    }
    setPermissionsError("");
    try {
      await api.delete(
        `/cashbooks/${cashbook.cashbook_id}/roles/${role.id}?requester_id=${account.id}`,
      );
      await loadCashbookRoles();
    } catch (requestError) {
      setPermissionsError(
        getApiErrorMessage(requestError, "Failed to remove cashbook role"),
      );
    }
  };

  const openCashbookReport = (reportType: CashbookTransactionReportType) => {
    setCashbookReportType(reportType);
    setCashbookReportLoading(true);
    setCashbookReportOpen(true);
    setCashbookReportMenuAnchor(null);
    setCashbookMenuAnchor(null);
    window.setTimeout(() => setCashbookReportLoading(false), 350);
  };

  const reloadCashbookReport = () => {
    setCashbookReportLoading(true);
    window.setTimeout(() => setCashbookReportLoading(false), 350);
  };

  const openCashbookEdit = () => {
    setCashbookEditError("");
    setCashbookEditForm({
      title: cashbook.title || "",
      description: cashbook.description || "",
      status: cashbook.status || "Active",
      startdate: cashbook.startdate || "",
      enddate: cashbook.enddate || "",
      opening_balance: String(cashbook.opening_balance || 0),
    });
    setCashbookMenuAnchor(null);
    setCashbookEditOpen(true);
  };

  const saveCashbookEdit = async () => {
    if (!account || !cashbookEditForm.title.trim()) {
      return;
    }
    setCashbookEditError("");
    try {
      await api.patch(`/cashbooks/${cashbook.cashbook_id}`, {
        requester_id: account.id,
        title: cashbookEditForm.title,
        description: cashbookEditForm.description || null,
        status: cashbookEditForm.status,
        startdate: cashbookEditForm.startdate || null,
        enddate: cashbookEditForm.enddate || null,
        opening_balance: Number(cashbookEditForm.opening_balance || 0),
      });
      setCashbookEditOpen(false);
      await refreshSelectedCashbook();
    } catch (requestError) {
      setCashbookEditError(
        getApiErrorMessage(requestError, "Failed to update cashbook"),
      );
    }
  };

  const closeCashbook = async () => {
    if (!account) {
      return;
    }
    setCashbookActionError("");
    setCashbookMenuAnchor(null);
    try {
      await api.post(`/cashbooks/${cashbook.cashbook_id}/close`, {
        requester_id: account.id,
      });
      setCashbookCloseConfirmOpen(false);
      await refreshSelectedCashbook();
      setTransactionSuccess("Cashbook closed successfully.");
    } catch (requestError) {
      setCashbookActionError(
        getApiErrorMessage(requestError, "Failed to close cashbook"),
      );
    }
  };

  const deleteCashbook = async () => {
    if (!account) {
      return;
    }
    setCashbookActionError("");
    setCashbookMenuAnchor(null);
    try {
      await api.delete(
        `/cashbooks/${cashbook.cashbook_id}?requester_id=${account.id}`,
      );
      setCashbookDeleteConfirmOpen(false);
      navigate(
        cashbook.location_id
          ? `/app/locations/${cashbook.location_id}`
          : "/app",
      );
    } catch (requestError) {
      setCashbookActionError(
        getApiErrorMessage(requestError, "Failed to delete cashbook"),
      );
    }
  };

  const removeParticular = async (particular: Particular) => {
    if (!account) {
      return;
    }
    setParticularError("");
    try {
      await api.delete(
        `/particulars/${particular.particular_id}?requester_id=${account.id}&cashbook_id=${cashbook.cashbook_id}`,
      );
      if (transactionForm.particular_id === particular.particular_id) {
        setTransactionForm((current) => ({ ...current, particular_id: "" }));
      }
      if (editingParticularId === particular.particular_id) {
        resetParticularForm();
      }
      await loadParticulars();
    } catch (requestError) {
      setParticularError(
        getApiErrorMessage(requestError, "Failed to remove particular"),
      );
    }
  };

  const goBackFromCashbook = () => {
    navigate(cashbookReturnTo, { replace: true });
  };

  return (
    <>
      <PageHeader
        title={cashbook.title || "Cashbook"}
        action={
          canOpenCashbookMenu ? (
            <>
              <IconButton
                aria-label="Cashbook actions"
                onClick={(event) => setCashbookMenuAnchor(event.currentTarget)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={cashbookMenuAnchor}
                open={Boolean(cashbookMenuAnchor)}
                onClose={() => {
                  setCashbookMenuAnchor(null);
                  setCashbookReportMenuAnchor(null);
                }}
              >
                <MenuItem
                  aria-haspopup="menu"
                  aria-controls={
                    cashbookReportMenuAnchor
                      ? "cashbook-report-submenu"
                      : undefined
                  }
                  onClick={(event) =>
                    setCashbookReportMenuAnchor(event.currentTarget)
                  }
                >
                  <ListItemIcon>
                    <RateReviewIcon fontSize="small" />
                  </ListItemIcon>
                  Report
                  <KeyboardArrowRightIcon
                    fontSize="small"
                    sx={{ ml: "auto" }}
                  />
                </MenuItem>
                {cashbook.can_add_transactions ? (
                  <MenuItem
                    onClick={() => {
                      setCashbookMenuAnchor(null);
                      setParticularsOpen(true);
                    }}
                  >
                    <ListItemIcon>
                      <CollectionsBookmarkIcon fontSize="small" />
                    </ListItemIcon>
                    Particulars
                  </MenuItem>
                ) : null}
                {cashbook.can_admin ? (
                  <MenuItem onClick={openPermissions}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Permissions
                  </MenuItem>
                ) : null}
                {cashbook.can_admin ? (
                  <MenuItem onClick={openCashbookEdit}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                ) : null}
                {cashbook.can_admin ? (
                  <MenuItem
                    onClick={() => {
                      setCashbookDeleteConfirmOpen(true);
                      setCashbookMenuAnchor(null);
                    }}
                  >
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                ) : null}
                {cashbook.can_admin &&
                (cashbook.status || "").toLowerCase() !== "closed" ? (
                  <MenuItem
                    onClick={() => {
                      setCashbookCloseConfirmOpen(true);
                      setCashbookMenuAnchor(null);
                    }}
                  >
                    <ListItemIcon>
                      <CheckCircleIcon fontSize="small" />
                    </ListItemIcon>
                    Close
                  </MenuItem>
                ) : null}
              </Menu>
              <Menu
                id="cashbook-report-submenu"
                anchorEl={cashbookReportMenuAnchor}
                open={Boolean(cashbookReportMenuAnchor)}
                onClose={() => setCashbookReportMenuAnchor(null)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={() => openCashbookReport("all")}>
                  All Transactions
                </MenuItem>
                <MenuItem onClick={() => openCashbookReport("normal")}>
                  General Transactions
                </MenuItem>
                <MenuItem onClick={() => openCashbookReport("schedule")}>
                  Schedule Collections
                </MenuItem>
              </Menu>
            </>
          ) : null
        }
        icon={
          <IconButton
            aria-label="Go back"
            onClick={goBackFromCashbook}
            color="secondary"
            size="small"
            sx={{ border: 1, borderColor: "divider" }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        }
      />
      <Grid container spacing={2.5} sx={{ alignItems: "flex-start" }}>
        <Grid
          size={{ xs: 12, md: 3 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {cashbookListContent}
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Stack spacing={2.5}>
            <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
              <List dense disablePadding>
                <TransactionMetricItem
                  icon={<ReceiptIcon color="secondary" fontSize="small" />}
                  label="Transactions"
                  value={transactions.length}
                />
                <TransactionMetricItem
                  icon={<VisibilityIcon color="secondary" fontSize="small" />}
                  label="Visibility"
                  value={cashbook.visibility || "Public"}
                />
                <TransactionMetricItem
                  icon={<TrendingUpIcon color="success" fontSize="small" />}
                  label="In"
                  value={incomeTotal}
                />
                <TransactionMetricItem
                  icon={<TrendingDownIcon color="warning" fontSize="small" />}
                  label="Out"
                  value={expenseTotal}
                />
                <TransactionMetricItem
                  icon={<PaymentsIcon color="secondary" fontSize="small" />}
                  label="Net"
                  value={total}
                />
              </List>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mt: 1.5,
                }}
              >
                <Tooltip title="Switch Cashbooks">
                  <IconButton
                    color="secondary"
                    aria-label="Switch Cashbooks"
                    onClick={() => setCashbookChooserOpen(true)}
                    sx={{
                      display: { xs: "inline-flex", md: "none" },
                      border: 1,
                      borderColor: "divider",
                    }}
                  >
                    <SwapHorizIcon />
                  </IconButton>
                </Tooltip>
                {cashbook.can_add_transactions ? (
                  <CircularAddButton
                    label="Add Transaction"
                    onClick={() => setAddTransactionOpen(true)}
                  />
                ) : null}
              </Stack>
            </Paper>
            {cashbook.can_add_transactions ? (
              <Drawer
                anchor="right"
                open={addTransactionOpen}
                onClose={() => setAddTransactionOpen(false)}
                slotProps={{
                  paper: {
                    sx: {
                      width: { xs: "100vw", sm: 720 },
                      maxWidth: "100%",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <DialogTitle>Add Transaction</DialogTitle>
                  <DialogContent sx={{ flex: 1 }}>
                    {transactionError ? (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {transactionError}
                      </Alert>
                    ) : null}
                    {transactionSuccess ? (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        {transactionSuccess}
                      </Alert>
                    ) : null}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Tabs
                        value={transactionTab}
                        onChange={(_, value: string) =>
                          setTransactionTab(value)
                        }
                        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
                      >
                        <Tab value="normal" label="General" />
                        <Tab value="schedule" label="Schedule Collections" />
                      </Tabs>
                      {transactionTab === "normal" ? (
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, minmax(0, 1fr))",
                                lg: "repeat(3, minmax(0, 1fr))",
                              },
                              gap: 2,
                            }}
                          >
                            <DatePicker
                              label="Date"
                              value={toPickerValue(
                                transactionForm.transaction_date,
                              )}
                              disableFuture
                              onChange={(value) => {
                                setTransactionValidation((current) => ({
                                  ...current,
                                  transaction_date: "",
                                }));
                                setTransactionForm((current) => ({
                                  ...current,
                                  transaction_date: fromPickerValue(value),
                                }));
                              }}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  fullWidth: true,
                                  required: true,
                                  error: Boolean(
                                    transactionValidation.transaction_date,
                                  ),
                                  helperText:
                                    transactionValidation.transaction_date,
                                },
                              }}
                            />
                            <TextField
                              select
                              label="Particular"
                              value={transactionForm.particular_id}
                              onChange={(event) => {
                                setTransactionValidation((current) => ({
                                  ...current,
                                  particular_id: "",
                                }));
                                setTransactionForm((current) => ({
                                  ...current,
                                  particular_id: event.target.value,
                                }));
                              }}
                              size="small"
                              fullWidth
                              required
                              error={Boolean(
                                transactionValidation.particular_id,
                              )}
                              helperText={transactionValidation.particular_id}
                              slotProps={{
                                input: {
                                  endAdornment: (
                                    <InputAdornment
                                      position="end"
                                      sx={{ mr: 2 }}
                                    >
                                      <Tooltip title="Add particular">
                                        <IconButton
                                          edge="end"
                                          size="small"
                                          aria-label="Add particular"
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            openParticularsModal();
                                          }}
                                        >
                                          <AddIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </InputAdornment>
                                  ),
                                },
                              }}
                            >
                              <MenuItem value="">Select particular</MenuItem>
                              {generalParticulars.map((particular) => (
                                <MenuItem
                                  key={particular.particular_id}
                                  value={particular.particular_id}
                                >
                                  {particular.title}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              select
                              label="Type"
                              value={transactionForm.category}
                              onChange={(event) => {
                                setTransactionValidation((current) => ({
                                  ...current,
                                  category: "",
                                }));
                                setTransactionForm((current) => ({
                                  ...current,
                                  category: event.target.value,
                                }));
                              }}
                              size="small"
                              fullWidth
                              required
                              error={Boolean(transactionValidation.category)}
                              helperText={transactionValidation.category}
                            >
                              {["Income", "Expense"].map((category) => (
                                <MenuItem key={category} value={category}>
                                  {category}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              type="number"
                              label="Amount"
                              value={transactionForm.amount}
                              onChange={(event) => {
                                setTransactionValidation((current) => ({
                                  ...current,
                                  amount: "",
                                }));
                                setTransactionForm((current) => ({
                                  ...current,
                                  amount: event.target.value,
                                }));
                              }}
                              size="small"
                              fullWidth
                              required
                              error={Boolean(transactionValidation.amount)}
                              helperText={transactionValidation.amount}
                            />
                            <TextField
                              select
                              label="Mode"
                              value={transactionForm.mode}
                              onChange={(event) => {
                                setTransactionValidation((current) => ({
                                  ...current,
                                  mode: "",
                                }));
                                setTransactionForm((current) => ({
                                  ...current,
                                  mode: event.target.value,
                                }));
                              }}
                              size="small"
                              fullWidth
                              required
                              error={Boolean(transactionValidation.mode)}
                              helperText={transactionValidation.mode}
                            >
                              {["Cash", "Cheque", "MOMO"].map((mode) => (
                                <MenuItem key={mode} value={mode}>
                                  {mode}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              size="small"
                              label="Received By/From"
                              value={transactionForm.received_by_or_from}
                              onChange={(event) =>
                                setTransactionForm((current) => ({
                                  ...current,
                                  received_by_or_from: event.target.value,
                                }))
                              }
                              fullWidth
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: {
                                xs: "1fr",
                                md: "minmax(0, 1fr) auto",
                              },
                              gap: 2,
                              alignItems: "start",
                            }}
                          >
                            <TextField
                              size="small"
                              label="Remarks"
                              value={transactionForm.remarks}
                              onChange={(event) =>
                                setTransactionForm((current) => ({
                                  ...current,
                                  remarks: event.target.value,
                                }))
                              }
                              multiline
                              minRows={1}
                              fullWidth
                            />
                          </Box>
                        </Stack>
                      ) : (
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, minmax(0, 1fr))",
                                lg: "repeat(3, minmax(0, 1fr))",
                              },
                              gap: 2,
                            }}
                          >
                            <DatePicker
                              label="Schedule Date"
                              value={toPickerValue(
                                scheduleCollectionForm.schedule_date,
                              )}
                              onChange={(value) => {
                                setScheduleCollectionValidation((current) => ({
                                  ...current,
                                  schedule_date: "",
                                  amounts: "",
                                }));
                                setScheduleCollectionForm((current) => ({
                                  ...current,
                                  schedule_date: fromPickerValue(value),
                                  schedule_type: "",
                                  amounts: {},
                                }));
                              }}
                              disableFuture
                              shouldDisableDate={(day) =>
                                disableFutureSchedulePickerDay(day, schedules)
                              }
                              slots={{ day: renderScheduleFilterDay }}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  fullWidth: true,
                                  required: true,
                                  error: Boolean(
                                    scheduleCollectionValidation.schedule_date,
                                  ),
                                  helperText:
                                    scheduleCollectionValidation.schedule_date,
                                },
                              }}
                            />
                            <Autocomplete
                              options={incomeParticulars}
                              value={
                                incomeParticulars.find(
                                  (particular) =>
                                    particular.particular_id ===
                                    scheduleCollectionForm.particular_id,
                                ) || null
                              }
                              onChange={(_, value) => {
                                setScheduleCollectionValidation((current) => ({
                                  ...current,
                                  particular_id: "",
                                  amounts: "",
                                }));
                                setScheduleCollectionForm((current) => ({
                                  ...current,
                                  particular_id: value?.particular_id || "",
                                }));
                              }}
                              getOptionLabel={(particular) =>
                                particular.title ||
                                `Particular #${particular.particular_id}`
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.particular_id === value.particular_id
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  label="Collection"
                                  required
                                  fullWidth
                                  error={Boolean(
                                    scheduleCollectionValidation.particular_id,
                                  )}
                                  helperText={
                                    scheduleCollectionValidation.particular_id
                                  }
                                  slotProps={{
                                    ...params.slotProps,
                                    input: {
                                      ...params.slotProps.input,
                                      endAdornment: (
                                        <>
                                          <InputAdornment position="end">
                                            <Tooltip title="Add collection">
                                              <IconButton
                                                edge="end"
                                                size="small"
                                                aria-label="Add collection"
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  openParticularsModal();
                                                }}
                                              >
                                                <AddIcon fontSize="small" />
                                              </IconButton>
                                            </Tooltip>
                                          </InputAdornment>
                                          {params.slotProps.input?.endAdornment}
                                        </>
                                      ),
                                    },
                                  }}
                                />
                              )}
                              fullWidth
                            />
                            <TextField
                              select
                              label="Schedule Type"
                              value={scheduleCollectionForm.schedule_type}
                              onChange={(event) => {
                                setScheduleCollectionValidation((current) => ({
                                  ...current,
                                  amounts: "",
                                }));
                                setScheduleCollectionForm((current) => ({
                                  ...current,
                                  schedule_type: event.target.value,
                                  amounts: {},
                                }));
                              }}
                              size="small"
                              fullWidth
                              disabled={
                                !scheduleCollectionForm.schedule_date ||
                                scheduleCollectionTypeOptions.length === 0
                              }
                            >
                              <MenuItem value="">All schedule types</MenuItem>
                              {scheduleCollectionTypeOptions.map(
                                (scheduleType) => (
                                  <MenuItem
                                    key={scheduleType}
                                    value={scheduleType}
                                  >
                                    {scheduleType}
                                  </MenuItem>
                                ),
                              )}
                            </TextField>
                          </Box>
                          {scheduleCollectionValidation.amounts ? (
                            <Alert severity="error">
                              {scheduleCollectionValidation.amounts}
                            </Alert>
                          ) : null}
                          <Paper variant="outlined" sx={{ overflow: "hidden" }}>
                            <Box sx={{ px: 2, py: 1, bgcolor: "action.hover" }}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 900 }}
                              >
                                Schedules on selected date
                              </Typography>
                            </Box>
                            <Stack divider={<Divider />}>
                              {!scheduleCollectionForm.schedule_date ? (
                                <Box sx={{ px: 2, py: 2 }}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Select a schedule date to load schedules.
                                  </Typography>
                                </Box>
                              ) : scheduleCollectionSchedules.length === 0 ? (
                                <Box sx={{ px: 2, py: 2 }}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    No schedules occur on this date.
                                  </Typography>
                                </Box>
                              ) : (
                                scheduleCollectionSchedules.map((schedule) => {
                                  const duplicate = scheduleCollectionRecorded(
                                    schedule.id,
                                  );
                                  return (
                                    <Box
                                      key={schedule.id}
                                      sx={{
                                        px: 2,
                                        py: 1.5,
                                        display: "grid",
                                        gridTemplateColumns: {
                                          xs: "1fr",
                                          sm: "minmax(0, 1fr) 180px",
                                        },
                                        gap: 1.5,
                                        alignItems: "center",
                                      }}
                                    >
                                      <Box sx={{ minWidth: 0 }}>
                                        <Typography
                                          variant="body2"
                                          sx={{ fontWeight: 800 }}
                                        >
                                          {scheduleOptionLabel(schedule)}
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          {scheduleWhenText(schedule)}
                                        </Typography>
                                      </Box>
                                      <TextField
                                        type="number"
                                        size="small"
                                        label={
                                          duplicate
                                            ? "Already recorded"
                                            : "Amount"
                                        }
                                        value={
                                          scheduleCollectionForm.amounts[
                                            schedule.id
                                          ] || ""
                                        }
                                        onChange={(event) =>
                                          setScheduleCollectionForm(
                                            (current) => ({
                                              ...current,
                                              amounts: {
                                                ...current.amounts,
                                                [schedule.id]:
                                                  event.target.value,
                                              },
                                            }),
                                          )
                                        }
                                        disabled={Boolean(duplicate)}
                                        slotProps={{ htmlInput: { min: 0 } }}
                                        fullWidth
                                      />
                                    </Box>
                                  );
                                })
                              )}
                            </Stack>
                          </Paper>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: {
                                xs: "1fr",
                                md: "220px minmax(0, 1fr) auto",
                              },
                              gap: 2,
                              alignItems: "start",
                            }}
                          >
                            <TextField
                              select
                              label="Mode"
                              value={scheduleCollectionForm.mode}
                              onChange={(event) => {
                                setScheduleCollectionValidation((current) => ({
                                  ...current,
                                  mode: "",
                                }));
                                setScheduleCollectionForm((current) => ({
                                  ...current,
                                  mode: event.target.value,
                                }));
                              }}
                              size="small"
                              fullWidth
                              required
                              error={Boolean(scheduleCollectionValidation.mode)}
                              helperText={scheduleCollectionValidation.mode}
                            >
                              {["Cash", "Cheque", "MOMO"].map((mode) => (
                                <MenuItem key={mode} value={mode}>
                                  {mode}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              size="small"
                              label="Remarks"
                              value={scheduleCollectionForm.remarks}
                              onChange={(event) =>
                                setScheduleCollectionForm((current) => ({
                                  ...current,
                                  remarks: event.target.value,
                                }))
                              }
                              multiline
                              minRows={1}
                              fullWidth
                            />
                          </Box>
                        </Stack>
                      )}
                      <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => setAddTransactionOpen(false)}
                          disabled={transactionSaving}
                          fullWidth
                        >
                          Close
                        </Button>
                        <Button
                          variant="contained"
                          onClick={saveActiveTransactionTab}
                          startIcon={
                            transactionSaving ? (
                              <CircularProgress size={18} color="inherit" />
                            ) : (
                              <SaveIcon />
                            )
                          }
                          disabled={addTransactionSaveDisabled}
                          fullWidth
                        >
                          {transactionSaving ? "Saving..." : "Save"}
                        </Button>
                      </Stack>
                    </LocalizationProvider>
                  </DialogContent>
                </Box>
              </Drawer>
            ) : null}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              {monthlyTransactionCards.length === 0 ? (
                <EmptyState
                  title="No transactions yet"
                  message="Transactions will appear here after they are recorded."
                />
              ) : (
                <Stack spacing={2}>
                  {monthlyTransactionCards.map((month) => (
                    <Paper
                      key={month.label}
                      variant="outlined"
                      sx={{ overflow: "hidden" }}
                    >
                      <Box
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderBottom: 1,
                          borderColor: "divider",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 900 }}
                        >
                          {month.label}
                        </Typography>
                      </Box>
                      <List dense disablePadding>
                        {month.rows.map((transaction) => {
                          const isIncome =
                            (transaction.category || "").toLowerCase() ===
                            "income";
                          return (
                            <ListItem
                              key={transaction.transaction_id}
                              divider
                              sx={{ py: 1 }}
                            >
                              <ListItemIcon sx={{ minWidth: 34 }}>
                                {isIncome ? (
                                  <TrendingUpIcon
                                    color="success"
                                    fontSize="small"
                                  />
                                ) : (
                                  <TrendingDownIcon
                                    color="warning"
                                    fontSize="small"
                                  />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      minWidth: 0,
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ minWidth: 0 }}
                                      noWrap
                                    >
                                      {transaction.particular_title ||
                                        "Transaction"}
                                    </Typography>
                                    <Stack
                                      direction="row"
                                      spacing={0.5}
                                      sx={{
                                        alignItems: "center",
                                        flexShrink: 0,
                                      }}
                                    >
                                      <Typography variant="body2">
                                        {Number(
                                          transaction.amount || 0,
                                        ).toLocaleString()}
                                      </Typography>
                                      <IconButton
                                        size="small"
                                        aria-label="Transaction actions"
                                        onClick={(event) => {
                                          setSelectedTransaction(transaction);
                                          setTransactionMenuAnchor(
                                            event.currentTarget,
                                          );
                                        }}
                                      >
                                        <MoreVertIcon fontSize="small" />
                                      </IconButton>
                                    </Stack>
                                  </Stack>
                                }
                                secondary={
                                  transaction.category || "Transaction"
                                }
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          flexWrap: "wrap",
                          gap: 1,
                          px: 2,
                          py: 1.5,
                          borderTop: 1,
                          borderColor: "divider",
                        }}
                      >
                        <Chip
                          size="small"
                          color="success"
                          label={`In: ${month.income.toLocaleString()}`}
                        />
                        <Chip
                          size="small"
                          color="warning"
                          label={`Out: ${month.expense.toLocaleString()}`}
                        />
                        <Chip
                          size="small"
                          label={`Net: ${(month.income - month.expense).toLocaleString()}`}
                        />
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <DataGridPanel
                rows={transactionGridRows}
                columns={transactionColumns}
                getRowId={(row) => row.transaction_id}
                empty="No transactions yet"
              />
            </Box>
            <Menu
              anchorEl={transactionMenuAnchor}
              open={Boolean(transactionMenuAnchor)}
              onClose={closeTransactionMenu}
            >
              <MenuItem onClick={openTransactionDetails}>
                <ListItemIcon>
                  <VisibilityIcon fontSize="small" />
                </ListItemIcon>
                Details
              </MenuItem>
              {cashbook.can_admin ? (
                <MenuItem onClick={openTransactionEdit}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  Edit
                </MenuItem>
              ) : null}
              {cashbook.can_admin ? (
                <MenuItem
                  onClick={() => {
                    setTransactionDeleteConfirmOpen(true);
                    setTransactionActionError("");
                    closeTransactionMenu();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  Delete
                </MenuItem>
              ) : null}
            </Menu>
          </Stack>
        </Grid>
      </Grid>
      <Drawer
        anchor="left"
        open={cashbookChooserOpen}
        onClose={() => setCashbookChooserOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "86vw", sm: 380 },
              maxWidth: "100%",
              top: { xs: "56px !important", sm: "64px !important" },
              height: { xs: "calc(100dvh - 56px)", sm: "calc(100dvh - 64px)" },
            },
          },
        }}
      >
        {cashbookListContent}
      </Drawer>
      <Dialog
        open={transactionDetailsOpen}
        onClose={() => setTransactionDetailsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            {[
              [
                "Schedule Date",
                selectedTransaction?.schedule_id
                  ? selectedTransaction?.schedule_date || "Not set"
                  : "Not set",
              ],
              ["Schedule", selectedTransaction?.schedule_title || "Not set"],
              [
                "Recorded By",
                selectedTransaction?.author_display_name || "Not set",
              ],
              [
                "Received By/From",
                selectedTransaction?.received_by_or_from || "Not set",
              ],
              ["Remarks", selectedTransaction?.remarks || "Not set"],
              ["Created At", selectedTransaction?.created_at || "Not set"],
            ].map(([label, value]) => (
              <Box
                key={label}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "160px minmax(0, 1fr)",
                  },
                  gap: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setTransactionDetailsOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={transactionEditOpen}
        onClose={() => setTransactionEditOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {transactionActionError ? (
                <Alert severity="error">{transactionActionError}</Alert>
              ) : null}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                <DatePicker
                  label="Date"
                  value={toPickerValue(transactionEditForm.transaction_date)}
                  disableFuture
                  onChange={(value) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      transaction_date: fromPickerValue(value),
                    }))
                  }
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
                <TextField
                  select
                  label="Type"
                  value={transactionEditForm.category}
                  onChange={(event) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  fullWidth
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end" sx={{ mr: 2 }}>
                          <Tooltip title="Add particular">
                            <IconButton
                              edge="end"
                              size="small"
                              aria-label="Add particular"
                              onClick={(event) => {
                                event.stopPropagation();
                                openParticularsModal();
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    },
                  }}
                >
                  {["Income", "Expense"].map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  type="number"
                  label="Amount"
                  value={transactionEditForm.amount}
                  onChange={(event) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                  fullWidth
                  required
                />
                <TextField
                  select
                  label="Particular"
                  value={transactionEditForm.particular_id}
                  onChange={(event) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      particular_id: event.target.value,
                    }))
                  }
                  fullWidth
                  required
                >
                  <MenuItem value="">Select particular</MenuItem>
                  {particulars.map((particular) => (
                    <MenuItem
                      key={particular.particular_id}
                      value={particular.particular_id}
                    >
                      {particular.title}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Mode"
                  value={transactionEditForm.mode}
                  onChange={(event) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      mode: event.target.value,
                    }))
                  }
                  fullWidth
                  required
                >
                  {["Cash", "Cheque", "MOMO"].map((mode) => (
                    <MenuItem key={mode} value={mode}>
                      {mode}
                    </MenuItem>
                  ))}
                </TextField>
                <DatePicker
                  label="Schedule Date"
                  value={toPickerValue(transactionEditForm.schedule_date)}
                  disableFuture
                  shouldDisableDate={(day) =>
                    disableFutureSchedulePickerDay(day, schedules)
                  }
                  slots={{ day: renderScheduleFilterDay }}
                  onChange={(value) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      schedule_date: fromPickerValue(value),
                    }))
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <TextField
                  select
                  label="Schedule"
                  value={transactionEditForm.schedule_id}
                  onChange={(event) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      schedule_id: event.target.value,
                    }))
                  }
                  fullWidth
                >
                  <MenuItem value="">Not set</MenuItem>
                  {schedules.map((schedule) => (
                    <MenuItem key={schedule.id} value={schedule.id}>
                      {scheduleOptionLabel(schedule)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Received By/From"
                  value={transactionEditForm.received_by_or_from}
                  onChange={(event) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      received_by_or_from: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Remarks"
                  value={transactionEditForm.remarks}
                  onChange={(event) =>
                    setTransactionEditForm((current) => ({
                      ...current,
                      remarks: event.target.value,
                    }))
                  }
                  multiline
                  minRows={2}
                  fullWidth
                />
              </Box>
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setTransactionEditOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={saveTransactionEdit}
            disabled={
              !transactionEditForm.transaction_date ||
              !transactionEditForm.category ||
              !transactionEditForm.particular_id ||
              !transactionEditForm.mode ||
              !transactionEditForm.amount
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={transactionDeleteConfirmOpen}
        onClose={() => setTransactionDeleteConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete Transaction?</DialogTitle>
        <DialogContent>
          {transactionActionError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {transactionActionError}
            </Alert>
          ) : null}
          <Typography variant="body2">
            This action permanently removes the selected transaction.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransactionDeleteConfirmOpen(false)}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={deleteTransaction}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {isMobilePdfPreview ? (
        <Drawer
          anchor="bottom"
          open={cashbookReportOpen}
          onClose={() => setCashbookReportOpen(false)}
          slotProps={{
            paper: {
              sx: {
                maxHeight: "90dvh",
                borderRadius: "12px 12px 0 0",
                display: "flex",
                flexDirection: "column",
              },
            },
          }}
        >
          <DialogTitle>
            {cashbookReportLabels[cashbookReportType]} Report
          </DialogTitle>
          <DialogContent sx={{ overflow: "auto", flex: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                {cashbookReportLoading ? (
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      minHeight: 280,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <MobilePdfViewer
                    document={
                      <CashbookTransactionsReportDocument
                        cashbook={cashbook}
                        reportType={cashbookReportType}
                        startDate={cashbookReportFilters.startDate}
                        endDate={cashbookReportFilters.endDate}
                        particularLabel={
                          selectedCashbookReportParticular?.title || undefined
                        }
                        rows={cashbookReportRows}
                        title={cashbookReportPdfTitle}
                      />
                    }
                    fileName={cashbookReportPdfFileName}
                    onExportExcel={exportCashbookReportExcel}
                    filterPanel={
                      <Stack direction="column" spacing={2}>
                        <Autocomplete
                          options={particulars}
                          value={selectedCashbookReportParticular}
                          onChange={(_, value) => {
                            setCashbookReportFilters((current) => ({
                              ...current,
                              particularId: value?.particular_id || "",
                            }));
                            reloadCashbookReport();
                          }}
                          getOptionLabel={(option) =>
                            option.title ||
                            `Particular #${option.particular_id}`
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Particular"
                              size="small"
                              fullWidth
                            />
                          )}
                          fullWidth
                        />
                        <DatePicker
                          label="Start Date"
                          value={toPickerValue(cashbookReportFilters.startDate)}
                          onChange={(value) => {
                            setCashbookReportFilters((current) => ({
                              ...current,
                              startDate: fromPickerValue(value),
                            }));
                            reloadCashbookReport();
                          }}
                          disableFuture
                          maxDate={
                            toPickerValue(cashbookReportFilters.endDate) ||
                            undefined
                          }
                          slotProps={{
                            textField: { size: "small", fullWidth: true },
                          }}
                        />
                        <DatePicker
                          label="End Date"
                          value={toPickerValue(cashbookReportFilters.endDate)}
                          onChange={(value) => {
                            setCashbookReportFilters((current) => ({
                              ...current,
                              endDate: fromPickerValue(value),
                            }));
                            reloadCashbookReport();
                          }}
                          disableFuture
                          minDate={
                            toPickerValue(cashbookReportFilters.startDate) ||
                            undefined
                          }
                          slotProps={{
                            textField: { size: "small", fullWidth: true },
                          }}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setCashbookReportFilters({
                              particularId: "",
                              startDate: "",
                              endDate: "",
                            });
                            reloadCashbookReport();
                          }}
                          sx={{ minWidth: 96 }}
                        >
                          Clear
                        </Button>
                      </Stack>
                    }
                  />
                )}
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => setCashbookReportOpen(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Drawer>
      ) : (
        <Dialog
          open={cashbookReportOpen}
          onClose={() => setCashbookReportOpen(false)}
          fullWidth
          maxWidth="lg"
          slotProps={{
            paper: {
              sx: {
                height: { xs: "100dvh", sm: "auto" },
                m: { xs: 0, sm: 2 },
                maxHeight: { xs: "100dvh", sm: "calc(100% - 64px)" },
              },
            },
          }}
        >
          <DialogTitle>
            {cashbookReportLabels[cashbookReportType]} Report
          </DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                {!isMobilePdfPreview ? (
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Autocomplete
                      options={particulars}
                      value={selectedCashbookReportParticular}
                      onChange={(_, value) => {
                        setCashbookReportFilters((current) => ({
                          ...current,
                          particularId: value?.particular_id || "",
                        }));
                        reloadCashbookReport();
                      }}
                      getOptionLabel={(option) =>
                        option.title || `Particular #${option.particular_id}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Particular"
                          size="small"
                          fullWidth
                        />
                      )}
                      fullWidth
                    />
                    <DatePicker
                      label="Start Date"
                      value={toPickerValue(cashbookReportFilters.startDate)}
                      onChange={(value) => {
                        setCashbookReportFilters((current) => ({
                          ...current,
                          startDate: fromPickerValue(value),
                        }));
                        reloadCashbookReport();
                      }}
                      disableFuture
                      maxDate={
                        toPickerValue(cashbookReportFilters.endDate) || undefined
                      }
                      slotProps={{ textField: { size: "small", fullWidth: true } }}
                    />
                    <DatePicker
                      label="End Date"
                      value={toPickerValue(cashbookReportFilters.endDate)}
                      onChange={(value) => {
                        setCashbookReportFilters((current) => ({
                          ...current,
                          endDate: fromPickerValue(value),
                        }));
                        reloadCashbookReport();
                      }}
                      disableFuture
                      minDate={
                        toPickerValue(cashbookReportFilters.startDate) || undefined
                      }
                      slotProps={{ textField: { size: "small", fullWidth: true } }}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setCashbookReportFilters({
                          particularId: "",
                          startDate: "",
                          endDate: "",
                        });
                        reloadCashbookReport();
                      }}
                      sx={{ minWidth: 96, alignSelf: { sm: "center" } }}
                    >
                      Clear
                    </Button>
                  </Stack>
                ) : null}
                {cashbookReportLoading ? (
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      minHeight: 280,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <MobilePdfViewer
                    document={
                      <CashbookTransactionsReportDocument
                        cashbook={cashbook}
                        reportType={cashbookReportType}
                        startDate={cashbookReportFilters.startDate}
                        endDate={cashbookReportFilters.endDate}
                        particularLabel={
                          selectedCashbookReportParticular?.title || undefined
                        }
                        rows={cashbookReportRows}
                        title={cashbookReportPdfTitle}
                      />
                    }
                    fileName={cashbookReportPdfFileName}
                    onExportExcel={exportCashbookReportExcel}
                    filterPanel={
                      isMobilePdfPreview ? (
                        <Stack direction="column" spacing={2}>
                          <Autocomplete
                            options={particulars}
                            value={selectedCashbookReportParticular}
                            onChange={(_, value) => {
                              setCashbookReportFilters((current) => ({
                                ...current,
                                particularId: value?.particular_id || "",
                              }));
                              reloadCashbookReport();
                            }}
                            getOptionLabel={(option) =>
                              option.title ||
                              `Particular #${option.particular_id}`
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Particular"
                                size="small"
                                fullWidth
                              />
                            )}
                            fullWidth
                          />
                          <DatePicker
                            label="Start Date"
                            value={toPickerValue(
                              cashbookReportFilters.startDate,
                            )}
                            onChange={(value) => {
                              setCashbookReportFilters((current) => ({
                                ...current,
                                startDate: fromPickerValue(value),
                              }));
                              reloadCashbookReport();
                            }}
                            disableFuture
                            maxDate={
                              toPickerValue(cashbookReportFilters.endDate) ||
                              undefined
                            }
                            slotProps={{
                              textField: { size: "small", fullWidth: true },
                            }}
                          />
                          <DatePicker
                            label="End Date"
                            value={toPickerValue(cashbookReportFilters.endDate)}
                            onChange={(value) => {
                              setCashbookReportFilters((current) => ({
                                ...current,
                                endDate: fromPickerValue(value),
                              }));
                              reloadCashbookReport();
                            }}
                            disableFuture
                            minDate={
                              toPickerValue(cashbookReportFilters.startDate) ||
                              undefined
                            }
                            slotProps={{
                              textField: { size: "small", fullWidth: true },
                            }}
                          />
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setCashbookReportFilters({
                                particularId: "",
                                startDate: "",
                                endDate: "",
                              });
                              reloadCashbookReport();
                            }}
                            sx={{ minWidth: 96 }}
                          >
                            Clear
                          </Button>
                        </Stack>
                      ) : undefined
                    }
                  />
                )}
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => setCashbookReportOpen(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={cashbookDeleteConfirmOpen}
        onClose={() => setCashbookDeleteConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete Cashbook?</DialogTitle>
        <DialogContent>
          {cashbookActionError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {cashbookActionError}
            </Alert>
          ) : null}
          <Typography variant="body2">
            This action permanently removes the cashbook. Cashbooks with
            transactions cannot be deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCashbookDeleteConfirmOpen(false)}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={deleteCashbook}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDeleteDialog
        open={Boolean(deleteConfirm)}
        title={deleteConfirm?.title || "Delete Record?"}
        description={
          deleteConfirm?.description || "This action cannot be undone."
        }
        error={deleteConfirmError}
        loading={deleteConfirmSaving}
        onCancel={closeDeleteConfirmation}
        onConfirm={() => void confirmPendingDelete()}
      />
      <Dialog
        open={cashbookCloseConfirmOpen}
        onClose={() => setCashbookCloseConfirmOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Close Cashbook?</DialogTitle>
        <DialogContent>
          {cashbookActionError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {cashbookActionError}
            </Alert>
          ) : null}
          <Typography variant="body2">
            Closing stores the current balance and prevents new transactions
            from being added.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCashbookCloseConfirmOpen(false)}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={closeCashbook}>
            Close Cashbook
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={cashbookEditOpen}
        onClose={() => setCashbookEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Cashbook</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {cashbookEditError ? (
                <Alert severity="error">{cashbookEditError}</Alert>
              ) : null}
              <TextField
                label="Cashbook Name"
                value={cashbookEditForm.title}
                onChange={(event) =>
                  setCashbookEditForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                fullWidth
                required
              />
              <TextField
                label="Description"
                value={cashbookEditForm.description}
                onChange={(event) =>
                  setCashbookEditForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                fullWidth
                multiline
                minRows={3}
              />
              <TextField
                type="number"
                label="Opening Balance"
                value={cashbookEditForm.opening_balance}
                onChange={(event) =>
                  setCashbookEditForm((current) => ({
                    ...current,
                    opening_balance: event.target.value,
                  }))
                }
                fullWidth
                slotProps={{ htmlInput: { step: "0.01" } }}
              />
              <TextField
                select
                label="Status"
                value={cashbookEditForm.status}
                onChange={(event) =>
                  setCashbookEditForm((current) => ({
                    ...current,
                    status: event.target.value,
                  }))
                }
                fullWidth
              >
                {["Active", "Closed"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <DatePicker
                  label="Start Date"
                  value={toPickerValue(cashbookEditForm.startdate)}
                  onChange={(value) =>
                    setCashbookEditForm((current) => ({
                      ...current,
                      startdate: fromPickerValue(value),
                    }))
                  }
                  disableFuture
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="End Date"
                  value={toPickerValue(cashbookEditForm.enddate)}
                  onChange={(value) =>
                    setCashbookEditForm((current) => ({
                      ...current,
                      enddate: fromPickerValue(value),
                    }))
                  }
                  disablePast
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Stack>
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setCashbookEditOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={saveCashbookEdit}
            disabled={!cashbookEditForm.title.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={permissionsOpen}
        onClose={() => setPermissionsOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Cashbook Permissions</DialogTitle>
        <DialogContent>
          {permissionsError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {permissionsError}
            </Alert>
          ) : null}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1 }}>
                Allowed Roles
              </Typography>
              <Stack spacing={0.75}>
                <Typography variant="body2">
                  <strong>Cashbook Admin:</strong> add transactions, edit or
                  close the cashbook, and manage cashbook permissions.
                </Typography>
                <Typography variant="body2">
                  <strong>Data Entrant:</strong> add transactions but cannot
                  edit or delete transactions.
                </Typography>
                <Typography variant="body2">
                  <strong>Cashbook Viewer:</strong> view the cashbook and its
                  transactions.
                </Typography>
              </Stack>
            </Paper>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <TextField
                select
                label="User"
                value={permissionForm.user_id}
                onChange={(event) =>
                  setPermissionForm((current) => ({
                    ...current,
                    user_id: event.target.value,
                  }))
                }
                fullWidth
              >
                {eligibleCashbookAccounts.map((item) => (
                  <MenuItem key={item.id} value={String(item.id)}>
                    {accountOptionLabel(item)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Role"
                value={permissionForm.role}
                onChange={(event) =>
                  setPermissionForm((current) => ({
                    ...current,
                    role: event.target.value,
                  }))
                }
                sx={{ minWidth: { sm: 220 } }}
              >
                {["Cashbook Admin", "Cashbook Viewer", "Data Entrant"].map(
                  (role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ),
                )}
              </TextField>
              <Button
                variant="contained"
                onClick={saveCashbookRole}
                disabled={!permissionForm.user_id || !permissionForm.role}
                sx={{ minWidth: 130 }}
              >
                Save
              </Button>
            </Stack>
            <Divider />
            {cashbookRoles.length === 0 ? (
              <EmptyState
                title="No cashbook permissions yet"
                message="Authorized users will appear here after they are added."
              />
            ) : (
              <Stack spacing={1.5}>
                {cashbookRoles.map((role) => (
                  <Paper key={role.id} variant="outlined" sx={{ p: 2 }}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={1.5}
                      sx={{
                        alignItems: { md: "center" },
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 900 }}
                        >
                          {role.user_display_name ||
                            memberName(accounts, role.user_id)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {role.title || role.role}
                        </Typography>
                      </Box>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        sx={{ alignItems: { sm: "center" } }}
                      >
                        <TextField
                          select
                          size="small"
                          label="Role"
                          value={role.role || "Cashbook Viewer"}
                          onChange={(event) =>
                            changeCashbookRole(role, event.target.value)
                          }
                          sx={{ minWidth: 220 }}
                        >
                          {[
                            "Cashbook Admin",
                            "Cashbook Viewer",
                            "Data Entrant",
                          ].map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() =>
                            requestDeleteConfirmation(
                              "Remove Cashbook Permission?",
                              "This will remove this user's CashBook permission.",
                              () => removeCashbookRole(role),
                            )
                          }
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setPermissionsOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={particularsOpen}
        onClose={() => setParticularsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Particulars</DialogTitle>
        <DialogContent>
          {particularError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {particularError}
            </Alert>
          ) : null}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 1.5,
              mb: 2,
              mt: 1,
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              label="Particular"
              value={particularForm.title}
              onChange={(event) =>
                setParticularForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              size="small"
              select
              label="Category"
              value={particularForm.category}
              onChange={(event) =>
                setParticularForm((current) => ({
                  ...current,
                  category: event.target.value,
                }))
              }
              fullWidth
            >
              {["Income", "Expense"].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              select
              label="Type"
              value={particularForm.type}
              onChange={(event) =>
                setParticularForm((current) => ({
                  ...current,
                  type: event.target.value,
                }))
              }
              fullWidth
            >
              {particularTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            {editingParticularId ? (
              <Button
                variant="contained"
                onClick={saveParticular}
                startIcon={<SaveIcon />}
                disabled={
                  !particularForm.title.trim() ||
                  !particularForm.category ||
                  !particularForm.type
                }
                sx={{ minWidth: 120, justifySelf: { sm: "start" } }}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={saveParticular}
                disabled={
                  !particularForm.title.trim() ||
                  !particularForm.category ||
                  !particularForm.type
                }
                sx={{
                  gridColumn: { xs: "1 / -1", sm: "auto" },
                  justifySelf: "stretch",
                }}
              >
                Add
              </Button>
            )}
          </Box>
          {editingParticularId ? (
            <Button size="small" onClick={resetParticularForm} sx={{ mb: 2 }}>
              Close Edit
            </Button>
          ) : null}
          <TextField
            size="small"
            label="Search particulars"
            value={particularSearch}
            onChange={(event) => setParticularSearch(event.target.value)}
            fullWidth
            sx={{ mb: 1 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <List
            dense
            disablePadding
            sx={{
              mt: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            {filteredParticulars.map((particular) => (
              <ListItem
                key={particular.particular_id}
                divider
                secondaryAction={
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      edge="end"
                      size="small"
                      aria-label={`Edit ${particular.title || "particular"}`}
                      onClick={() => editParticular(particular)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      size="small"
                      color="error"
                      aria-label={`Remove ${particular.title || "particular"}`}
                      onClick={() =>
                        requestDeleteConfirmation(
                          "Delete Particular?",
                          `This will permanently delete ${particular.title || "this particular"}.`,
                          () => removeParticular(particular),
                        )
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                }
                sx={{ py: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 38 }}>
                  <CollectionsBookmarkIcon color="secondary" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    particular.title ||
                    `Particular #${particular.particular_id}`
                  }
                  secondary={[
                    particular.category || "No category",
                    particular.type || "General",
                  ].join(" - ")}
                  sx={{ pr: 8 }}
                  slotProps={{
                    primary: { sx: { fontWeight: 800 } },
                    secondary: { noWrap: true },
                  }}
                />
              </ListItem>
            ))}
            {!filteredParticulars.length ? (
              <ListItem disableGutters>
                <ListItemText primary="No particulars found" />
              </ListItem>
            ) : null}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setParticularsOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function EventDetailPage() {
  const { eventId } = useParams();
  const { data: event, error } = useResource<Event>(`/events/${eventId}`);

  if (!event) {
    return <LoadingOrError error={error} />;
  }

  return (
    <>
      <PageHeader
        title={event.title || "Event"}
        subtitle={event.description || undefined}
        chip={event.type || undefined}
        icon={<CalendarMonthIcon />}
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <List dense>
          <ListItem disableGutters>
            <ListItemText
              primary="Date"
              secondary={
                [event.startdate, event.starttime].filter(Boolean).join(" ") ||
                "Not set"
              }
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Venue"
              secondary={event.venue || "Not set"}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Speakers"
              secondary={event.speakers || "Not set"}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Scope"
              secondary={
                event.location_id
                  ? `Location #${event.location_id}`
                  : `Account #${event.account_id || "N/A"}`
              }
            />
          </ListItem>
        </List>
      </Paper>
    </>
  );
}

export function MissionalFamilyDetailPage() {
  const { missionalFamilyId } = useParams();
  const account = getSessionAccount();
  const { data: missionalFamily, error } = useResource<MissionalFamily>(
    `/missional-families/${missionalFamilyId}`,
  );
  const [zone, setZone] = useState<Zone | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [locationMembers, setLocationMembers] = useState<Member[]>([]);
  const [familyMembers, setFamilyMembers] = useState<MissionalFamilyMember[]>(
    [],
  );
  const [locationFamilyMembers, setLocationFamilyMembers] = useState<
    MissionalFamilyMember[]
  >([]);
  const [selectedMember, setSelectedMember] = useState<Account | null>(null);
  const [memberError, setMemberError] = useState("");
  const [savingMember, setSavingMember] = useState(false);

  const loadFamilyMembers = () => {
    if (!missionalFamilyId) {
      return Promise.resolve();
    }
    return api
      .get<MissionalFamilyMember[]>(
        `/missional-family-members?mf_id=${missionalFamilyId}`,
      )
      .then((response) => setFamilyMembers(response.data))
      .catch(() => setFamilyMembers([]));
  };

  useEffect(() => {
    api
      .get<Account[]>("/accounts")
      .then((response) => setAccounts(response.data))
      .catch(() => setAccounts([]));
  }, []);

  useEffect(() => {
    loadFamilyMembers();
  }, [missionalFamilyId]);

  useEffect(() => {
    if (!missionalFamily?.zone_id) {
      return;
    }
    api
      .get<Zone>(`/zones/${missionalFamily.zone_id}`)
      .then((response) => setZone(response.data))
      .catch(() => setZone(null));
  }, [missionalFamily?.zone_id]);

  useEffect(() => {
    if (!zone?.location_id) {
      return;
    }
    Promise.all([
      api.get<Member[]>(`/members?location_id=${zone.location_id}`),
      api.get<MissionalFamilyMember[]>(
        `/missional-family-members?location_id=${zone.location_id}`,
      ),
    ])
      .then(([membersResponse, familyMembersResponse]) => {
        setLocationMembers(membersResponse.data);
        setLocationFamilyMembers(familyMembersResponse.data);
      })
      .catch(() => {
        setLocationMembers([]);
        setLocationFamilyMembers([]);
      });
  }, [zone?.location_id]);

  const activeFamilyMemberIds = new Set(
    locationFamilyMembers
      .filter((member) => member.status !== "Inactive")
      .map((member) => member.member_id)
      .filter(Boolean),
  );
  const eligibleAccounts = locationMembers
    .filter(
      (member) =>
        member.status !== "Inactive" &&
        !activeFamilyMemberIds.has(member.user_id),
    )
    .map((member) =>
      accounts.find((candidate) => candidate.id === member.user_id),
    )
    .filter((candidate): candidate is Account => Boolean(candidate));

  const addMember = async () => {
    if (!missionalFamilyId || !account || !selectedMember) {
      setMemberError("Select a member to add.");
      return;
    }
    setSavingMember(true);
    setMemberError("");
    try {
      const response = await api.post<MissionalFamilyMember>(
        `/missional-families/${missionalFamilyId}/members`,
        {
          requester_id: account.id,
          member_id: selectedMember.id,
        },
      );
      await loadFamilyMembers();
      setLocationFamilyMembers((current) => [
        ...current.filter((member) => member.id !== response.data.id),
        response.data,
      ]);
      setSelectedMember(null);
    } catch (requestError) {
      setMemberError(getApiErrorMessage(requestError, "Failed to add member"));
    } finally {
      setSavingMember(false);
    }
  };

  if (!missionalFamily) {
    return <LoadingOrError error={error} />;
  }

  return (
    <>
      <PageHeader
        title={missionalFamily.title || "Missional Family"}
        subtitle={missionalFamily.description || undefined}
        icon={<Diversity2Icon />}
        action={
          <Chip
            label={
              familyMembers.filter((member) => member.status !== "Inactive")
                .length
            }
            color="secondary"
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              "& .MuiChip-label": { px: 0 },
            }}
          />
        }
      />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Details
            </Typography>
            <List dense>
              <ListItem disableGutters>
                <ListItemText
                  primary="Zone"
                  secondary={zone?.title || "Not set"}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Leader"
                  secondary={memberName(
                    accounts,
                    missionalFamily.leader1_id,
                    missionalFamily.leader1_display_name,
                  )}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Assistant"
                  secondary={memberName(
                    accounts,
                    missionalFamily.leader2_id,
                    missionalFamily.leader2_display_name,
                  )}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Members
              </Typography>
              {memberError ? (
                <Alert severity="error">{memberError}</Alert>
              ) : null}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Autocomplete
                  options={eligibleAccounts}
                  value={selectedMember}
                  onChange={(_, value) => setSelectedMember(value)}
                  getOptionLabel={accountOptionLabel}
                  renderInput={(params) => (
                    <TextField {...params} label="Add member" fullWidth />
                  )}
                  fullWidth
                />
                <CircularAddButton
                  label="Add Member"
                  onClick={addMember}
                  disabled={savingMember || !selectedMember}
                />
              </Stack>
              <List disablePadding>
                {familyMembers.filter((member) => member.status !== "Inactive")
                  .length === 0 ? (
                  <ListItem disableGutters>
                    <ListItemText primary="No members in this missional family yet" />
                  </ListItem>
                ) : (
                  familyMembers
                    .filter((member) => member.status !== "Inactive")
                    .map((member) => (
                      <ListItem key={member.id} divider disableGutters>
                        <ListItemText
                          primary={memberName(
                            accounts,
                            member.member_id,
                            member.member_display_name,
                          )}
                          secondary={member.status || "Active"}
                        />
                      </ListItem>
                    ))
                )}
              </List>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export function PostDetailPage() {
  const { postId } = useParams();
  const { data: post, error } = useResource<Post>(`/posts/${postId}`);

  if (!post) {
    return <LoadingOrError error={error} />;
  }

  return (
    <>
      <PageHeader
        title={post.title || "Post"}
        subtitle={post.description || undefined}
        chip={post.status || undefined}
        icon={<RateReviewIcon />}
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <List dense>
          <ListItem disableGutters>
            <ListItemText primary="Type" secondary={post.type || "Not set"} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Location"
              secondary={
                post.location_id ? `Location #${post.location_id}` : "Not set"
              }
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Author"
              secondary={post.userid ? `Account #${post.userid}` : "Not set"}
            />
          </ListItem>
        </List>
      </Paper>
    </>
  );
}
