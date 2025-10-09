import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchConfig, type TableConfig } from "../api/config.api.ts";
import { fetchDrugs, type DrugRow } from "../api/drug.api.ts";
import { useEffect, useMemo, useState } from "react";
import { fetchCompany } from "../api/company.ts";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(undefined, { day: "2-digit", month: "2-digit", year: "numeric" })
    .format(new Date(iso));

export default function DrugsPage() {
  const [config, setConfig] = useState<TableConfig | null>(null);
  const [rows, setRows] = useState<DrugRow[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [company, setCompany] = useState<string>("");

  // pagination:
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const { rows, total } = await fetchDrugs(
          { page: paginationModel.page + 1, limit: paginationModel.pageSize, company },
        );
        setRows(rows);
        setRowCount(total);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [paginationModel]);

  useEffect(() => {
    const initialData = async () => {
      const cfg = await fetchConfig();
      setConfig(cfg);
      const { rows } = await fetchDrugs({ page: 1, limit: 10 });
      setRows(rows);
      const companies = await fetchCompany();
      setCompanies(companies)
    };
    initialData();
  }, []);

  useEffect(() => {
    const companySpecificData = async () => {
      const result = await fetchDrugs({ page: paginationModel.page + 1, limit: paginationModel.pageSize, company });
      setRows(result.rows);
      setRowCount(result.total);
    };
    companySpecificData();
  }, [company]);

  // Map backend fields -> DataGrid column defs
  const columns = useMemo<GridColDef<DrugRow>[]>(() => {
    if (!config) return [];
    // backend can only send plain data (JSON), not UI behavior
    const base: Record<string, GridColDef<DrugRow>> = {
      id: { field: "id", headerName: "Id", width: 80 },
      code: { field: "code", headerName: "Code", flex: 1, minWidth: 140 },
      name: { field: "name", headerName: "Name", flex: 1.4, minWidth: 220 },
      company: {
        field: "company", headerName: "Company", flex: 1.2, minWidth: 220,
        renderCell: (p) => (<span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => setCompany(p.value || "")}>{p.value}</span>)
      },
      launchDate: {
        field: "launchDate", headerName: "Launch Date", flex: 1, minWidth: 140,
        renderCell: (p) => (<span>{formatDate(p.value)}</span>),
        sortComparator: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      },
    };
    // preserve backend order & labels, keep our renderers/widths
    return config.columns.map(c => ({ ...base[c.field], headerName: c.headerName }));
  }, [config]);

  return (
    <Box sx={{ p: 2 }}>
      <FormControl size="small" sx={{ mb: 2, width: 360 }}>
        <InputLabel id="company-filter-label">Filter by Company</InputLabel>
        <Select
          labelId="company-filter-label"
          value={company}
          label="Filter by Company"
          onChange={(e) => setCompany(e.target.value)}
        >
          <MenuItem value="">All companies</MenuItem>
          {companies.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>

      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={rowCount}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 50]}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
