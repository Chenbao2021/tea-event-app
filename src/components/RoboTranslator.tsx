import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import axios from "axios";

export default function RoboTranslator() {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://translateword-ifbhnzfy3q-uc.a.run.app",
        {
          word,
        }
      );
      console.log("res", res);

      setTranslation(res.data.response.output_text);
      console.log("res.output_text", res.data.response.output_text);
    } catch (e) {
      setTranslation("Erreur pendant la traduction.");
    }
    setLoading(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)} color="primary">
        <SmartToyIcon sx={{ scale: 1.5, color: "black" }} />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Traduction/ 翻译</DialogTitle>
        <DialogContent>
          <Typography>(输入单词的相关信息)</Typography>
          <TextField
            label="Mot à traduire"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            fullWidth
            margin="dense"
          />
          <DialogActions>
            <Button
              onClick={handleTranslate}
              disabled={!word || loading}
              variant="contained"
            >
              {loading ? <CircularProgress size={20} /> : "Traduire"}
            </Button>
          </DialogActions>
          {translation && (
            <Typography sx={{ mt: 2, whiteSpace: "pre-line" }}>
              <strong>Traduction :</strong> {translation}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
