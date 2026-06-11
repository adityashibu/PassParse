"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Box, Button, Slider, Typography, Paper, CircularProgress } from "@mui/material";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CheckIcon from "@mui/icons-material/Check";
import getCroppedImg from "./cropUtils";

export default function ImageEditor({ image, onCropDone, loading }) {
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
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Crop &amp; Rotate
      </Typography>

      <Box sx={{ position: "relative", width: "100%", height: 400, bgcolor: "#000", borderRadius: 1, overflow: "hidden" }}>
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

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body2">Zoom</Typography>
        <Slider min={1} max={3} step={0.05} value={zoom} onChange={(_, v) => setZoom(v)} />

        <Typography variant="body2">Rotation</Typography>
        <Slider min={0} max={360} step={1} value={rotation} onChange={(_, v) => setRotation(v)} />
      </Box>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<RotateRightIcon />}
          onClick={() => setRotation((r) => (r + 90) % 360)}
        >
          Rotate 90°
        </Button>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CheckIcon />}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Extracting…" : "Extract Data"}
        </Button>
      </Box>
    </Paper>
  );
}
