import axios from "axios";

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const productionApiBaseUrl = "https://churchpilot-backend.vercel.app";
const defaultApiBaseUrl = import.meta.env.DEV ? "http://127.0.0.1:9000" : productionApiBaseUrl;

if (!configuredApiBaseUrl && !import.meta.env.DEV) {
  console.info(`VITE_API_BASE_URL is not set; API calls will use ${productionApiBaseUrl}.`);
}

export const API_BASE_URL = (configuredApiBaseUrl || defaultApiBaseUrl).replace(
  /\/$/,
  "",
);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isUidKey = (key: string) => key === "id" || key.endsWith("_id") || key === "userid";

export function normalizeUidFields<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeUidFields(item)) as T;
  }
  if (!value || typeof value !== "object") {
    return value;
  }

  const normalized: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    normalized[key] = isUidKey(key) && item != null ? String(item) : normalizeUidFields(item);
  }
  return normalized as T;
}

api.interceptors.response.use((response) => {
  response.data = normalizeUidFields(response.data);
  return response;
});

export function getApiErrorMessage(error: unknown, fallback = "Request failed") {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const detail = error.response?.data?.detail;
  if (typeof detail === "string") {
    return detail;
  }
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (!item || typeof item !== "object") {
          return String(item);
        }
        const message = "msg" in item ? String(item.msg) : "Invalid value";
        const path = "loc" in item && Array.isArray(item.loc) ? item.loc.join(".") : "";
        return path ? `${path}: ${message}` : message;
      })
      .join("; ");
  }

  return error.message || fallback;
}

export type Account = {
  id: string;
  fname?: string | null;
  lname?: string | null;
  username?: string | null;
  title?: string | null;
  email?: string | null;
  phone_number?: string | null;
  type?: string | null;
  category?: string | null;
  denomination?: string | null;
  description?: string | null;
  gender?: string | null;
  marital_status?: string | null;
  occupation?: string | null;
  country?: string | null;
  district?: string | null;
  city?: string | null;
  address?: string | null;
  status?: string | null;
  profile_picture?: string | null;
  requires_password_change?: boolean | null;
};

export type Location = {
  id: string;
  title?: string | null;
  description?: string | null;
  type?: string | null;
  email?: string | null;
  phone_number?: string | null;
  country?: string | null;
  district?: string | null;
  city?: string | null;
  status?: string | null;
  is_hq?: boolean | null;
  owner_id?: string | null;
  parent_location_id?: string | null;
  report_receiver_location_id?: string | null;
  mandatory_report_schedule_types?: string | null;
  reporting_start_date?: string | null;
  address?: string | null;
  created_at?: string | null;
};

export type Cashbook = {
  cashbook_id: string;
  title?: string | null;
  description?: string | null;
  status?: string | null;
  location_id?: string | null;
  location_title?: string | null;
  startdate?: string | null;
  enddate?: string | null;
  opening_balance?: number | null;
  closing_balance?: number | null;
  amount_in?: number | null;
  amount_out?: number | null;
  net_balance?: number | null;
  transaction_count?: number | null;
  cashbook_role?: string | null;
  can_admin?: boolean | null;
  can_add_transactions?: boolean | null;
  transactions?: Transaction[];
};

export type Particular = {
  particular_id: string;
  location_id?: string | null;
  category?: string | null;
  type?: string | null;
  title?: string | null;
  description?: string | null;
};

export type Transaction = {
  transaction_id: string;
  transaction_date?: string | null;
  schedule_date?: string | null;
  category?: string | null;
  mode?: string | null;
  amount: number;
  particular_id?: string | null;
  particular_title?: string | null;
  schedule_id?: string | null;
  schedule_title?: string | null;
  author_id?: string | null;
  author_display_name?: string | null;
  remarks?: string | null;
  received_by_or_from?: string | null;
  created_at?: string | null;
};

export type Event = {
  id: string;
  title?: string | null;
  type?: string | null;
  startdate?: string | null;
  starttime?: string | null;
  description?: string | null;
  venue?: string | null;
  location_id?: string | null;
  account_id?: string | null;
  speakers?: string | null;
};

export type Post = {
  id: string;
  title?: string | null;
  description?: string | null;
  status?: string | null;
  location_id?: string | null;
  type?: string | null;
  userid?: string | null;
};

export type Role = {
  id: string;
  status?: string | null;
  location_id?: string | null;
  cashbook_id?: string | null;
  scope?: string | null;
  role?: string | null;
  title?: string | null;
  user_id?: string | null;
  user_display_name?: string | null;
  authorizer_id?: string | null;
  authorizer_display_name?: string | null;
  location_title?: string | null;
  cashbook_title?: string | null;
  member_count?: number | null;
  start_date?: string | null;
  end_date?: string | null;
};

export type Member = {
  id: string;
  location_id?: string | null;
  user_id?: string | null;
  audience?: string | null;
  status?: string | null;
  start_date?: string | null;
  created_at?: string | null;
};

export type Subscription = {
  id: string;
  title?: string | null;
  number_of_locations?: number | null;
  location_members?: number | null;
  location_cashbooks?: number | null;
  small_groups?: number | null;
  zones?: number | null;
  events?: number | null;
  sms_notifications?: boolean | null;
  whatsapp_notifications?: boolean | null;
  rate?: number | null;
  rate_frequency?: string | null;
};

export type LocationSubscription = {
  id: string;
  location_id?: string | null;
  subscription_id?: string | null;
  subscription_title?: string | null;
  managed_by_location_id?: string | null;
  managed_by_location_title?: string | null;
  managed_by_hq?: boolean | null;
  status?: string | null;
  billing_frequency?: string | null;
  start_date?: string | null;
  renewal_date?: string | null;
  notes?: string | null;
};

export type SupportTicket = {
  id: string;
  account_id?: string | null;
  location_id?: string | null;
  location_title?: string | null;
  location_label?: string | null;
  requester_name?: string | null;
  requester_email?: string | null;
  requester_phone?: string | null;
  title?: string | null;
  category?: string | null;
  priority?: string | null;
  status?: string | null;
  description?: string | null;
  screenshot?: string | null;
  messages?: Array<{
    id: string;
    ticket_id?: string | null;
    sender_account_id?: string | null;
    sender_admin_id?: string | null;
    message?: string | null;
    screenshot?: string | null;
    created_at?: string | null;
  }>;
  created_at?: string | null;
  updated_at?: string | null;
};

export type SystemAdmin = {
  id: string;
  fname?: string | null;
  lname?: string | null;
  email?: string | null;
  role?: "Admin" | "Super Admin" | string | null;
  status?: string | null;
};

export type Attendance = {
  id: string;
  title?: string | null;
  description?: string | null;
  type?: string | null;
  status?: string | null;
  date?: string | null;
  time?: string | null;
  no_zones?: number | null;
  no_small_groups?: number | null;
  no_adults?: number | null;
  no_children?: number | null;
  total_attendance?: number | null;
  location_id?: string | null;
  posted_by?: string | null;
  posted_by_display_name?: string | null;
  verified_by?: string | null;
  approved_by?: string | null;
  schedule_id?: string | null;
};

export type LocationReport = {
  id: string;
  schedule_date?: string | null;
  title?: string | null;
  type?: string | null;
  description?: string | null;
  owner_location_id?: string | null;
  receiver_location_id?: string | null;
  particular_id?: string | null;
  value?: number | null;
  added_by?: string | null;
  verified_by?: string | null;
  approved_by?: string | null;
  schedules?: string | null;
  remission_id?: string | null;
  remission_value?: number | null;
  status?: string | null;
};

export type LocationRequisitionItem = {
  particular_id: string;
  amount: number;
  particular_title?: string | null;
  particular_category?: string | null;
  particular_type?: string | null;
};

export type LocationRequisition = {
  id: string;
  date?: string | null;
  title?: string | null;
  description?: string | null;
  items: LocationRequisitionItem[];
  prepared_by?: string | null;
  prepared_by_display_name?: string | null;
  location_id?: string | null;
  status?: string | null;
  total_amount?: number | null;
  created_at?: string | null;
};

export type ForwardedLocationReport = {
  id: string;
  date?: string | null;
  source_location_id?: string | null;
  target_location_id?: string | null;
  forwarded_by_id?: string | null;
  approved_by_id?: string | null;
  shedules_id?: string | null;
  schedule_types?: string | null;
  schedule_labels?: string | null;
  attendance_schedule_count?: number | null;
  mf_attendance?: number | null;
  total_attendance?: number | null;
  financial_particulars?: string | null;
  financial_particulars_value?: number | null;
  financial_particulars_count?: number | null;
  remissions?: string | null;
  remissions_value?: number | null;
  report_details?: string | null;
  screenshop_attachment?: string | null;
  report_type?: string | null;
  status?: string | null;
  source_location_title?: string | null;
  target_location_title?: string | null;
  forwarded_by_display_name?: string | null;
  approved_by_display_name?: string | null;
  created_at?: string | null;
};

export type LocationRemission = {
  id: string;
  location_id?: string | null;
  particular_id?: string | null;
  title?: string | null;
  percentage?: number | null;
  description?: string | null;
  created_at?: string | null;
};

export type Zone = {
  id: string;
  title?: string | null;
  description?: string | null;
  leader1_id?: string | null;
  leader2_id?: string | null;
  location_id?: string | null;
};

export type MissionalFamily = {
  id: string;
  title?: string | null;
  description?: string | null;
  leader1_id?: string | null;
  leader2_id?: string | null;
  zone_id?: string | null;
};

export type MissionalFamilyMember = {
  id: string;
  mf_id?: string | null;
  member_id?: string | null;
  status?: string | null;
  added_by?: string | null;
};

export type MfAttendance = {
  id: string;
  title?: string | null;
  description?: string | null;
  type?: string | null;
  total_number?: number | null;
  adate?: string | null;
  sg_id?: string | null;
  posted_by?: string | null;
  posted_by_display_name?: string | null;
  schedule_id?: string | null;
};

export type Schedule = {
  id: string;
  title?: string | null;
  type?: string | null;
  recurrence?: string | null;
  weekday?: number | null;
  date?: string | null;
  time?: string | null;
  end_time?: string | null;
  all_day?: boolean | null;
  report_status?: string | null;
  location_id?: string | null;
  created_at?: string | null;
};

export type AccountOverview = {
  account: Account;
  permissions?: {
    can_create_locations?: boolean;
    can_manage_locations?: boolean;
    can_view_public_ministry_resources?: boolean;
    can_view_public_location_resources?: boolean;
    roles?: {
      account_admin?: string[];
      location_creator?: string[];
      location_admin?: string[];
      evaluator?: string[];
      ministry_standard_user?: boolean;
      location_standard_user?: string[];
    };
    location_creation_ministries?: Array<{
      owner_id: string;
      location_id?: string | null;
      title?: string | null;
      type?: string | null;
    }>;
    ministry?: ResourceActions;
    location?: ResourceActions;
    individual?: {
      menus?: {
        home?: boolean;
        posts?: boolean;
        financial?: boolean;
        events?: boolean;
        admins?: boolean;
      };
    };
  };
  owned: {
    locations: Location[];
    cashbooks: Cashbook[];
    events: Event[];
    posts: Post[];
  };
  assigned: {
    roles: Role[];
    locations: Location[];
  };
};

export type ResourceActions = {
  can_create?: boolean;
  can_edit?: boolean;
  can_delete?: boolean;
  can_view?: boolean;
  can_comment?: boolean;
};

