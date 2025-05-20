import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, TypographyVariant } from "@mui/material";
import React from "react";

interface ITypewriterText {
  text: string;
  speed: number;
  sx: object;
  variant: TypographyVariant;
}
export default function TypewriterText({
  text,
  speed = 50,
  sx,
  variant,
}: ITypewriterText) {
  const [displayed, setDisplayed] = useState("");
  // const indexRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    setDisplayed("");

    (async () => {
      for (let i = 0; i < text.length; i++) {
        if (cancelled) break;
        setDisplayed((prev) => prev + text.charAt(i));
        // 等待 speed 毫秒
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [text, speed]);

  return (
    <Typography variant={variant} sx={{ ...sx, textAlign: "left" }}>
      {displayed}
    </Typography>
  );
}

TypewriterText.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  variant: PropTypes.string,
  sx: PropTypes.object,
};
