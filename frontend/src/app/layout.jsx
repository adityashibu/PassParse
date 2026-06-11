import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata = {
  title: "PassParse",
  description: "Passport data extraction powered by Llama 3.2 Vision",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
