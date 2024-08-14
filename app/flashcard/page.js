"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { useSearchParams } from "next/navigation";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashCards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    const getFlashcard = async () => {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);

      const cards = [];

      docs.forEach((doc) => {
        cards.push({ id: doc.id, ...doc.data() });
      });
      setFlashCards(cards);
    };
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container maxWidth="100vw">
      <Grid container maxWidth={"100%"} spacing={3} sx={{ mt: 4 }}>
        {flashcards.length > 0 && (
          <Box width={"100%"} sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }} textAlign={"center"}>
              Flashcards Preview
            </Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      perspective: "1000px",
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <Box
                        sx={{
                          transformStyle: "preserve-3d",
                          transition: "transform 0.6s",
                          transform: flipped[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                          position: "relative",
                          height: "200px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                            backgroundColor: "#fff",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            {flashcard.front}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                            backgroundColor: "#fff",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            {flashcard.back}
                          </Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Grid>
    </Container>
  );
}
