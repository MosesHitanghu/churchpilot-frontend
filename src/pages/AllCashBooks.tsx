import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArticleIcon from "@mui/icons-material/Article";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  Chip,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { type ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { useIncrementalList } from "../hooks/useIncrementalList";
import {
  api,
  type Account,
  type AccountOverview,
  type Cashbook,
  getApiErrorMessage,
} from "../lib/api";
import { useTerminology } from "../lib/terminology";
import { CashbookActionsMenu } from "./DetailPages";

type AllCashBooksProps = {
  account: Account;
};

function CashbookStatListItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <Typography variant="body2">{value.toLocaleString()}</Typography>
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
        primary={
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        }
      />
    </ListItem>
  );
}

function cashbookTotals(cashbook: Cashbook) {
  const transactions = cashbook.transactions || [];
  const amountIn =
    cashbook.amount_in ??
    transactions.reduce(
      (sum, transaction) =>
        (transaction.category || "").trim().toLowerCase() === "income"
          ? sum + Number(transaction.amount || 0)
          : sum,
      0,
    );
  const amountOut =
    cashbook.amount_out ??
    transactions.reduce(
      (sum, transaction) =>
        (transaction.category || "").trim().toLowerCase() === "expense"
          ? sum + Number(transaction.amount || 0)
          : sum,
      0,
    );

  return {
    amountIn,
    amountOut,
    net:
      cashbook.net_balance ??
      Number(cashbook.opening_balance || 0) + amountIn - amountOut,
    transactions: cashbook.transaction_count ?? transactions.length,
  };
}

function AllCashbooksSkeleton() {
  return (
    <>
      <PageHeader title="All Cashbooks" icon={<PaidIcon />} />
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            sx={{
              alignItems: { md: "center" },
              justifyContent: "space-between",
            }}
          >
            <Skeleton variant="text" width={180} height={34} />
            <Skeleton
              variant="rounded"
              height={40}
              sx={{ width: { xs: "100%", md: 360 } }}
            />
          </Stack>
          <Grid container spacing={2}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={1.5}>
                    <Skeleton variant="text" width="70%" height={28} />
                    <Skeleton variant="text" width="45%" />
                    <Stack spacing={1}>
                      {Array.from({ length: 5 }).map((__, rowIndex) => (
                        <Skeleton
                          key={rowIndex}
                          variant="rounded"
                          height={24}
                        />
                      ))}
                    </Stack>
                    <Skeleton variant="rounded" height={34} />
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}

export function AllCashBooks({ account }: AllCashBooksProps) {
  const { term } = useTerminology(
    account.type !== "Personal" ? account.id : null,
  );
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const [overview, setOverview] = useState<AccountOverview | null>(null);
  const [cashbooks, setCashbooks] = useState<Cashbook[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [cashbookSearch, setCashbookSearch] = useState("");
  const [error, setError] = useState("");

  const loadFinancialResources = () =>
    Promise.all([
      api.get<AccountOverview>(`/accounts/${account.id}/overview`),
      api.get<Cashbook[]>(`/cashbooks?requester_id=${account.id}`),
      api.get<Account[]>("/accounts"),
    ])
      .then(([overviewResponse, cashbooksResponse, accountsResponse]) => {
        setOverview(overviewResponse.data);
        setCashbooks(cashbooksResponse.data);
        setAccounts(accountsResponse.data);
      })
      .catch((requestError) =>
        setError(
          getApiErrorMessage(
            requestError,
            "Failed to load financial resources",
          ),
        ),
      );

  useEffect(() => {
    loadFinancialResources();
  }, [account.id]);

  const normalizedCashbookSearch = cashbookSearch.trim().toLowerCase();
  const filteredCashbooks = cashbooks.filter((cashbook) => {
    if (!normalizedCashbookSearch) {
      return true;
    }
    return [cashbook.title, cashbook.location_title].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(normalizedCashbookSearch),
    );
  });
  const {
    visibleItems: visibleCashbooks,
    sentinelRef: cashbookLoadMoreRef,
    hasMore: hasMoreCashbooks,
  } = useIncrementalList(filteredCashbooks, 12, normalizedCashbookSearch);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!overview) {
    return <AllCashbooksSkeleton />;
  }

  return (
    <>
      <PageHeader title="All Cashbooks" icon={<PaidIcon />} />
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              All Cashbooks
            </Typography>
            <TextField
              size="small"
              label="Search cashbooks"
              value={cashbookSearch}
              onChange={(event) => setCashbookSearch(event.target.value)}
              sx={{ width: { xs: "100%", md: 360 } }}
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
          </Stack>
          {cashbooks.length === 0 ? (
            <EmptyState
              title="No CashBooks Yet"
              message="CashBooks will appear after a location super admin or permitted location admin creates them."
            />
          ) : filteredCashbooks.length === 0 ? (
            <EmptyState
              title="No CashBooks Found"
              message="Try another cashbook title or location."
            />
          ) : (
          <Stack spacing={1.5}>
            <Grid container spacing={2}>
              {visibleCashbooks.map((cashbook) => {
              const totals = cashbookTotals(cashbook);
              return (
                <Grid key={cashbook.cashbook_id} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Paper variant="outlined" sx={{ height: "100%", p: 2 }}>
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
                          <Typography variant="caption" color="text.secondary">
                            {cashbook.location_title || term("location")}
                          </Typography>
                        </Box>
                        <CashbookActionsMenu
                          cashbook={cashbook}
                          requesterId={account.id}
                          accounts={accounts}
                          returnTo={`${routerLocation.pathname}${routerLocation.search}`}
                          onRefresh={loadFinancialResources}
                        />
                      </Stack>
                      <List dense disablePadding>
                        <CashbookStatListItem
                          icon={
                            <AttachMoneyIcon color="secondary" fontSize="small" />
                          }
                          label="Opening"
                          value={Number(cashbook.opening_balance || 0)}
                        />
                        <CashbookStatListItem
                          icon={<PaidIcon color="secondary" fontSize="small" />}
                          label="In"
                          value={totals.amountIn}
                        />
                        <CashbookStatListItem
                          icon={<PaidIcon color="secondary" fontSize="small" />}
                          label="Out"
                          value={totals.amountOut}
                        />
                        <CashbookStatListItem
                          icon={
                            <AttachMoneyIcon color="secondary" fontSize="small" />
                          }
                          label="Net"
                          value={totals.net}
                        />
                        <CashbookStatListItem
                          icon={
                            <ArticleIcon color="secondary" fontSize="small" />
                          }
                          label="Transactions"
                          value={totals.transactions}
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
                            (cashbook.status || "").toLowerCase() === "closed"
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
                            navigate(`/app/cashbooks/${cashbook.cashbook_id}`, {
                              state: {
                                cashbookReturnTo: `${routerLocation.pathname}${routerLocation.search}`,
                              },
                            })
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
            {hasMoreCashbooks ? (
              <Box ref={cashbookLoadMoreRef} sx={{ height: 24 }} />
            ) : null}
          </Stack>
          )}
        </Stack>
      </Paper>
    </>
  );
}
