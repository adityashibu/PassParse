"use client";

import { useState } from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import ResultTable from "@/components/ResultTable/ResultTable";
import { extractPassport } from "@/services/api";

export default function Home() {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageAccepted = (file) => {
    setImage(file);
    setResult(null);
    setError(null);
    setCroppedImage(null);
  };

  const handleCropDone = async (croppedBlob) => {
    setCroppedImage(croppedBlob);
    setLoading(true);
    setError(null);
    try {
      const data = await extractPassport(croppedBlob);
      setResult(data);
    } catch (err) {
      setError(err.message ?? "Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        PassParse
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Upload a passport image to extract and save its data automatically.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <ImageUploader onImageAccepted={handleImageAccepted} />

        {image && (
          <ImageEditor image={image} onCropDone={handleCropDone} loading={loading} />
        )}

        {(result || error) && (
          <ResultTable data={result} error={error} />
        )}
      </Box>
    </Container>
  );
}
