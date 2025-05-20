import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Stack, Grid } from "@mui/material";
import ImageTextButton from "../components/ImageTextButton";
import iceBreaker from "../assets/iceBreaker.png";
import escapeGame from "../assets/escapeGame.png";
import vocabularyReview from "../assets/vocabularyReview.png";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
        <Grid size={6}>
          <ImageTextButton
            imageSrc={vocabularyReview}
            text="Vocabulary review"
            onClick={() => navigate("/iceBreaker")}
          />
        </Grid>
        <Grid size={6}>
          <ImageTextButton
            imageSrc={iceBreaker}
            text="Ice breaker"
            onClick={() => navigate("/iceBreaker")}
          />
        </Grid>
        <Grid size={6}>
          <ImageTextButton
            imageSrc={escapeGame}
            text="Escape Game"
            onClick={() => navigate(escapeGame)}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
