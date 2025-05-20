import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MenuBookIcon from "@mui/icons-material/MenuBook";

// 数据：背景故事和任务（中/法双语）
const personaData = {
  fitness: {
    stories: {
      zh: "你是一位热爱健身的语言学习者，喜欢在茶会上与人分享你的训练心得。",
      fr: "Vous êtes un passionné de fitness apprenant la langue, et vous aimez partager vos expériences d’entraînement lors du salon du thé.",
    },
    tasks: {
      zh: [
        "描述你的健身活动。",
        "询问运动习惯。",
        "分享锻炼日常。",
        "询问健身装备。",
        "讨论健身好处。",
        "请求健身建议。",
        "谈论运动经历。",
        "询问锻炼动力。",
        "总结拉伸步骤。",
        "互相激励。",
      ],
      fr: [
        "Décrire votre activité de fitness préférée",
        "Demander quel sport l’autre pratique habituellement",
        "Partager votre routine d’entraînement",
        "Demander l’équipement préféré",
        "Discuter des bienfaits du sport",
        "Demander un conseil de fitness",
        "Raconter une expérience sportive mémorable",
        "Interroger sur la motivation",
        "Expliquer les étapes d’un étirement",
        "Encourager l’autre participant",
      ],
    },
  },
  reading: {
    stories: {
      zh: "你是一位爱好阅读的语言学习者，喜欢在茶会上与人讨论书籍。",
      fr: "Vous êtes un passionné de lecture apprenant la langue, et vous aimez discuter de livres lors du salon du thé.",
    },
    tasks: {
      zh: [
        "推荐一本你最喜欢的书并说明原因。",
        "询问对方最近读了什么书。",
        "分享一段你喜欢的书摘。",
        "讨论阅读习惯。",
        "谈论喜欢的作家。",
        "请对方推荐一本好书。",
        "比较两本书的风格。",
        "询问喜欢的书籍类型。",
        "描述一次难忘的读书经历。",
        "互相交换读书心得。",
      ],
      fr: [
        "Recommander votre livre préféré et expliquer pourquoi",
        "Demander quel livre l’autre a lu récemment",
        "Partager un extrait de livre",
        "Discuter des habitudes de lecture",
        "Parler d’un auteur que vous admirez",
        "Demander une recommandation de livre",
        "Comparer deux styles littéraires",
        "Demander quel genre de livres l’autre préfère",
        "Décrire une expérience de lecture mémorable",
        "échanger vos impressions de lecture",
      ],
    },
  },
  math: {
    stories: {
      zh: "你是一位喜欢数学的语言学习者，希望在茶会上与人讨论数学问题。",
      fr: "Vous êtes un amateur de mathématiques apprenant la langue, et vous aimez discuter de problèmes mathématiques lors du salon du thé.",
    },
    tasks: {
      zh: [
        "解释一个简单的数学公式。",
        "请对方解答一个算术题。",
        "讨论数学在生活中的应用。",
        "询问最喜欢的数学家。",
        "描述一个有趣的数学谜题。",
        "请求数学学习建议。",
        "分享解决难题的经历。",
        "询问复习方法。",
        "总结几何图形特点。",
        "一起做一个小算术游戏。",
      ],
      fr: [
        "Expliquer une formule mathématique simple",
        "Demander la résolution d’une opération de base",
        "Discuter des applications des mathématiques",
        "Demander votre mathématicien préféré",
        "Décrire une énigme mathématique amusante",
        "Demander un conseil pour apprendre les mathématiques",
        "Partager une expérience de résolution de problème",
        "Demander comment réviser les mathématiques",
        "Résumer les propriétés d’une figure géométrique",
        "Faire un petit jeu de calcul mental",
      ],
    },
  },
  puzzle: {
    stories: {
      zh: "你是一位喜欢解密挑战的语言学习者，希望在茶会上与人一起破译谜题。",
      fr: "Vous êtes un amateur d’énigmes apprenant la langue, et vous aimez résoudre des puzzles lors du salon du thé.",
    },
    tasks: {
      zh: [
        "描述你最喜欢的谜题类型。",
        "一起破解一个简单的文字谜题。",
        "分享成功解谜的体验。",
        "询问喜欢什么谜题。",
        "介绍一个有趣的解密游戏规则。",
        "请对方给出解谜建议。",
        "讨论解谜中的困难。",
        "一起设计一个小谜题。",
        "询问如何提高解谜能力。",
        "总结团队合作解谜感受。",
      ],
      fr: [
        "décrire votre type d’énigme préféré",
        "proposer de résoudre une énigme simple",
        "partager une expérience réussie",
        "demander quel type d’énigmes l’autre préfère",
        "présenter les règles d’un jeu d’énigme",
        "demander un conseil pour résoudre des énigmes",
        "discuter des difficultés rencontrées",
        "créer ensemble une petite énigme",
        "demander comment améliorer ses compétences",
        "résumer vos impressions de coopération",
      ],
    },
  },
};

// 动画变体
const containerVariants = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {},
};
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120 },
  },
  hover: { scale: 1.1 },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export default function IceBreaker() {
  const [language, setLanguage] = useState(null);
  const [persona, setPersona] = useState(null);

  const handleLanguageSelect = (lang) => setLanguage(lang);
  const handlePersonaSelect = (p) => setPersona(p);
  const handleReset = () => {
    setLanguage(null);
    setPersona(null);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      style={{
        height: "auto",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        elevation={10}
        sx={{ background: "rgba(255,255,255,0.8)" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center", color: "#006064" }}
          >
            {language
              ? language === "zh"
                ? "中法语茶会"
                : "Café franco-chinois"
              : "中法语茶会"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, position: "relative", overflow: "hidden" }}>
        <LanguageModal open={!language} onSelect={handleLanguageSelect} />
        {language && !persona && (
          <PersonaSelection
            onSelect={handlePersonaSelect}
            language={language}
          />
        )}
        {language && persona && (
          <TaskInterface
            persona={persona}
            language={language}
            onReset={handleReset}
          />
        )}
      </Box>
    </motion.div>
  );
}

// 语言选择对话框
function LanguageModal({ open, onSelect }) {
  return (
    <Dialog open={open} disableEscapeKeyDown>
      <DialogTitle>请选择您的母语</DialogTitle>
      <DialogContent>
        <DialogContentText>Quel est votre langue maternel?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onSelect("zh")}>
          中文
        </Button>
        <Button variant="contained" onClick={() => onSelect("fr")}>
          Français
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// 人格选择组件
function PersonaSelection({ onSelect, language }) {
  const options = [
    {
      key: "fitness",
      labelZh: "爱健身的人",
      labelFr: "Sportif/Sportive",
      icon: <FitnessCenterIcon fontSize="large" />,
    },
    {
      key: "reading",
      labelZh: "爱读书的人",
      labelFr: "Lecteur/Lectrice",
      icon: <MenuBookIcon fontSize="large" />,
    },
    {
      key: "math",
      labelZh: "爱数学的人",
      labelFr: "Mathématicien/ienne",
      icon: <Typography variant="h3">∑</Typography>,
    },
    {
      key: "puzzle",
      labelZh: "爱解密的人",
      labelFr: "Amateur d’énigmes",
      icon: <Typography variant="h3">🧩</Typography>,
    },
  ];
  const title = language === "zh" ? "你是？" : "êtes-vous ?";

  return (
    <AnimatePresence>
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // p: 2,
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {title}
          </Typography>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {options.map(({ key, labelZh, labelFr, icon }) => (
                // <Grid key={key} >
                <motion.div variants={itemVariants} whileHover="hover">
                  <Card elevation={9} sx={{ width: "100%", borderRadius: 4 }}>
                    <CardActionArea onClick={() => onSelect(key)}>
                      <CardContent sx={{ textAlign: "center", py: 3 }}>
                        {icon}
                        <Typography variant="h6" mt={2}>
                          {language === "zh" ? labelZh : labelFr}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
                // </Grid>
              ))}
            </Grid>
          </motion.div>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}

// 任务界面
function TaskInterface({ persona, language, onReset }) {
  const allTasks = personaData[persona].tasks[language];
  const simple = allTasks.slice(0, 3);
  const medium = allTasks.slice(3, 7);
  const hard = allTasks.slice(7);
  const flatTasks = [...simple, ...medium, ...hard];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [remaining, setRemaining] = useState(3600);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setRemaining((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600),
      m = Math.floor((sec % 3600) / 60),
      s = sec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentIndex < flatTasks.length - 1) setCurrentIndex((ci) => ci + 1);
    else setFinished(true);
  };

  return (
    <AnimatePresence>
      {!finished ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            elevation={8}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              p: 4,
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              {language === "zh" ? "剩余时间" : "Temps restant"}:{" "}
              {formatTime(remaining)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ p: 2, borderRadius: 2, background: "#e0f2f1", mb: 2 }}
            >
              {personaData[persona].stories[language]}
            </Typography>
            <Typography
              variant="body2"
              sx={{ p: 2, borderRadius: 2, background: "#f1f8e9", mb: 3 }}
            >
              {flatTasks[currentIndex]}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={handleNext}
              sx={{ py: 1.5 }}
            >
              {currentIndex < flatTasks.length - 1
                ? language === "zh"
                  ? "下一个"
                  : "Suivant"
                : language === "zh"
                ? "完成"
                : "Terminer"}
            </Button>
          </Paper>
        </motion.div>
      ) : (
        <motion.div
          key="finished"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            elevation={8}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {language === "zh" ? "完成了！" : "Terminé !"}
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {language === "zh"
                ? "该回去拿礼物了！"
                : "Il est temps de récupérer votre cadeau !"}
            </Typography>
            <Button variant="contained" onClick={onReset}>
              {language === "zh" ? "返回首页" : "Retour"}
            </Button>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
