"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Slider,
  Typography,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";
import getCroppedImg from "./cropUtils";

export default function ImageEditor({ image, onCropDone, onReset, loading }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const imageUrl = URL.createObjectURL(image);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    const blob = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
    onCropDone(blob);
  };

  return (
    <Paper
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      {/* Crop canvas — fills available space */}
      <Box sx={{ flex: 1, position: "relative", bgcolor: "#111", minHeight: 0 }}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={3 / 2}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </Box>

      {/* Controls */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Zoom
            </Typography>
            <Slider min={1} max={3} step={0.05} value={zoom} onChange={(_, v) => setZoom(v)} size="small" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Rotation
            </Typography>
            <Slider min={0} max={360} step={1} value={rotation} onChange={(_, v) => setRotation(v)} size="small" />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ReplayIcon />}
            onClick={onReset}
            disabled={loading}
          >
            New Image
          </Button>
          <Button
            variant="outlined"
            startIcon={<RotateRightIcon />}
            onClick={() => setRotation((r) => (r + 90) % 360)}
            disabled={loading}
          >
            Rotate 90°
          </Button>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CheckIcon />}
            onClick={handleConfirm}
            disabled={loading}
            sx={{ ml: "auto" }}
          >
            {loading ? "Extracting…" : "Extract Data"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
