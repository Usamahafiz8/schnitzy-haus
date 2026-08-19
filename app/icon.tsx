import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Generated app icon so there's a branded favicon without needing a design
// asset. Colors are hand-matched to the theme tokens in globals.css (kept in
// sync manually since this file runs outside the CSS pipeline).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#cc2027",
          borderRadius: 14,
          color: "#fbf1e1",
          fontSize: 30,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        SH
      </div>
    ),
    size,
  );
}
