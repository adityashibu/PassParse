"use client";

import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Alert,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FIELD_LABELS = {
  surname: "Surname",
  given_names: "Given Names",
  nationality: "Nationality",
  date_of_birth: "Date of Birth",
  sex: "Sex",
  place_of_birth: "Place of Birth",
  date_of_issue: "Date of Issue",
  date_of_expiry: "Date of Expiry",
  passport_number: "Passport Number",
  personal_number: "Personal Number",
  mrz_line1: "MRZ Line 1",
  mrz_line2: "MRZ Line 2",
};

export default function ResultTable({ data, error }) {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data) return null;

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CheckCircleIcon color="success" />
        Extracted Data
        <Chip label="Saved to Excel" color="success" size="small" sx={{ ml: 1 }} />
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableBody>
            {Object.entries(FIELD_LABELS).map(([key, label]) => (
              <TableRow key={key} sx={{ "&:last-child td": { border: 0 } }}>
                <TableCell sx={{ fontWeight: 600, width: "35%", color: "text.secondary" }}>
                  {label}
                </TableCell>
                <TableCell sx={{ fontFamily: key.startsWith("mrz") ? "monospace" : "inherit" }}>
                  {data[key] ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
