export default function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxSize = Math.max(image.width, image.height);
      canvas.width = maxSize;
      canvas.height = maxSize;

      ctx.translate(maxSize / 2, maxSize / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-image.width / 2, -image.height / 2);
      ctx.drawImage(image, 0, 0);

      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = pixelCrop.width;
      croppedCanvas.height = pixelCrop.height;
      croppedCanvas.getContext("2d").drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      croppedCanvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
    };
  });
}
