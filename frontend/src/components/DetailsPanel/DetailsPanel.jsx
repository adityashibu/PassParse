"use client";

import {
  Paper,
  Typography,
  Box,
  Alert,
  Skeleton,
  Chip,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FIELDS = [
  { key: "surname", label: "Surname" },
  { key: "given_names", label: "Given Names" },
  { key: "nationality", label: "Nationality" },
  { key: "date_of_birth", label: "Date of Birth" },
  { key: "sex", label: "Sex" },
  { key: "place_of_birth", label: "Place of Birth" },
  { key: "date_of_issue", label: "Date of Issue" },
  { key: "date_of_expiry", label: "Date of Expiry" },
  { key: "passport_number", label: "Passport Number" },
  { key: "mrz_line1", label: "MRZ Line 1" },
  { key: "mrz_line2", label: "MRZ Line 2" },
];

function FieldRow({ label, value, loading, isMrz, editable, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1,
        px: 2,
        borderBottom: 1,
        borderColor: "divider",
        "&:last-child": { borderBottom: 0 },
        gap: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          minWidth: 130,
          color: "text.secondary",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>

      {loading ? (
        <Skeleton variant="text" width="60%" height={22} />
      ) : editable ? (
        <TextField
          variant="standard"
          size="small"
          fullWidth
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          inputProps={{
            style: { fontFamily: isMrz ? "monospace" : "inherit", fontSize: 14 },
          }}
        />
      ) : (
        <Typography variant="body2" color="text.disabled">
          —
        </Typography>
      )}
    </Box>
  );
}

export default function DetailsPanel({
  data,
  error,
  loading,
  saving,
  saved,
  onFieldChange,
  onSaveToExcel,
}) {
  const hasData = !!data;

  return (
    <Paper
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "grey.50",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <BadgeIcon fontSize="small" color="primary" />
        <Typography variant="subtitle1" fontWeight={600}>
          Passport Details
        </Typography>
        {saved && (
          <Chip
            icon={<CheckCircleIcon />}
            label="Saved to Excel"
            color="success"
            size="small"
            sx={{ ml: "auto" }}
          />
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mx: 2, mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Scrollable fields */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {FIELDS.map(({ key, label }) => (
          <FieldRow
            key={key}
            label={label}
            value={data?.[key] ?? null}
            loading={loading}
            editable={hasData}
            isMrz={key.startsWith("mrz")}
            onChange={(val) => onFieldChange(key, val)}
          />
        ))}
      </Box>

      {/* Save button — only visible once data is present */}
      {hasData && (
        <>
          <Divider />
          <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color={saved ? "success" : "primary"}
              startIcon={
                saving ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <SaveAltIcon />
                )
              }
              onClick={onSaveToExcel}
              disabled={saving || saved}
            >
              {saved ? "Saved" : saving ? "Saving…" : "Add to Excel"}
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}
