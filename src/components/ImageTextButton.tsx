import React from "react";
import { Box, Typography, ButtonBase, Paper } from "@mui/material";

interface ImageTextButtonProps {
  imageSrc: string;
  text: string;
  onClick: () => void;
}

const ImageTextButton: React.FC<ImageTextButtonProps> = ({
  imageSrc,
  text,
  onClick,
}) => {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "95%",
        height: "95%",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        boxShadow: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
          backgroundColor: "#e0f7fa",
        },
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={text}
        sx={{ width: "100%", flexGrow: "1", objectFit: "cover" }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "60px",
        }}
      >
        <Typography align="center" fontWeight="bold" sx={{ color: "#00796b" }}>
          {text}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export default ImageTextButton;
