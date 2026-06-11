"use client";

import { useState } from "react";
import { Box, Grid } from "@mui/material";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import DetailsPanel from "@/components/DetailsPanel/DetailsPanel";
import { extractPassport, saveToExcel } from "@/services/api";

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleImageAccepted = (file) => {
    setImage(file);
    setResult(null);
    setError(null);
    setSaved(false);
  };

  const handleCropDone = async (croppedBlob) => {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const data = await extractPassport(croppedBlob);
      setResult(data);
    } catch (err) {
      setError(err.message ?? "Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (key, value) => {
    setResult((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSaveToExcel = async () => {
    setSaving(true);
    try {
      await saveToExcel(result);
      setSaved(true);
    } catch (err) {
      setError(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setSaved(false);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
      {/* Header */}
      <Box sx={{ px: 4, pt: 3, pb: 2, bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}>
        <Box component="span" sx={{ fontSize: 24, fontWeight: 700 }}>PassParse</Box>
        <Box component="p" sx={{ m: 0, fontSize: 13, color: "text.secondary" }}>
          Passport data extraction powered by Llama 3.2 Vision
        </Box>
      </Box>

      {/* Two-column layout */}
      <Box sx={{ flex: 1, overflow: "hidden", p: 3 }}>
        <Grid container spacing={3} sx={{ height: "100%" }}>
          <Grid item xs={12} md={6} sx={{ height: "100%" }}>
            <DetailsPanel
              data={result}
              error={error}
              loading={loading}
              saving={saving}
              saved={saved}
              onFieldChange={handleFieldChange}
              onSaveToExcel={handleSaveToExcel}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ height: "100%" }}>
            {!image ? (
              <ImageUploader onImageAccepted={handleImageAccepted} />
            ) : (
              <ImageEditor
                image={image}
                onCropDone={handleCropDone}
                onReset={handleReset}
                loading={loading}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
