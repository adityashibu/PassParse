import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  timeout: 300000,
});

export async function extractPassport(imageBlob) {
  const form = new FormData();
  form.append("file", imageBlob, "passport.jpg");
  const { data } = await client.post("/extract-passport", form);
  return data;
}

export async function saveToExcel(passportData) {
  const { data } = await client.post("/save-to-excel", passportData);
  return data;
}
