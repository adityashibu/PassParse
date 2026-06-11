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
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, p: 4 }}>
        <UploadFileIcon sx={{ fontSize: 64, color: isDragActive ? "primary.main" : "grey.400" }} />
        <Typography variant="h6" color={isDragActive ? "primary.main" : "text.primary"}>
          {isDragActive ? "Drop the passport image here" : "Drag & drop a passport image"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or click to browse — JPG, PNG, WEBP supported
        </Typography>
      </Box>
    </Paper>
  );
}
