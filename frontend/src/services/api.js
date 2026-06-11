import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

export async function extractPassport(imageBlob) {
  const form = new FormData();
  form.append("file", imageBlob, "passport.jpg");

  const { data } = await client.post("/extract-passport", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
