"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Paper } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function ImageUploader({ onImageAccepted }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) onImageAccepted(acceptedFiles[0]);
    },
    [onImageAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <Paper
      {...getRootProps()}
      variant="outlined"
      sx={{
        p: 6,
        textAlign: "center",
        cursor: "pointer",
        borderStyle: "dashed",
        borderWidth: 2,
        borderColor: isDragActive ? "primary.main" : "grey.400",
        bgcolor: isDragActive ? "primary.50" : "background.paper",
        transition: "all 0.2s",
        "&:hover": { borderColor: "primary.main", bgcolor: "grey.50" },
      }}
    >
      <input {...getInputProps()} />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        <UploadFileIcon sx={{ fontSize: 48, color: "primary.main" }} />
        <Typography variant="h6">
          {isDragActive ? "Drop the passport image here" : "Drag & drop a passport image"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or click to browse — JPG, PNG, WEBP supported
        </Typography>
      </Box>
    </Paper>
  );
}
