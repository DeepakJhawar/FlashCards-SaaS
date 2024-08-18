'use client'
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { collection, doc, getDoc, writeBatch, setDoc, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Ensure you use this import
import { useEffect, useState } from "react";
import { db } from "@/firebase";


const Generate = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState(0);
  const[topics, setTopics] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  
  const router = useRouter(); // Ensure router is initialized
  

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      console.log("User is not signed in");
    } else if (isLoaded && isSignedIn) {
      console.log("User is signed in with UID:", user.id);
      const userDocRef = doc(db, "users", user.id);
      const docSnap = getDoc(userDocRef);
      
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || !isSignedIn) {
    return null
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/generate", {subject, number, topics});
      const data = response.data;
      setFlashCards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
    }
  };

  const handleLogin = async () => {
    const userDocRef = doc(db, "users", user.id);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists())
    {
      setDoc(userDocRef, { access: true }, { merge: true });
    }
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashCards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
  
    try {
      console.log("Attempting to save flashcards for user:", user.id);
      const batch = writeBatch(db);
      const userDocRef = doc(db, "users", user.id);
      const docSnap = await getDoc(userDocRef);
  
      console.log("Fetched user document:", docSnap.exists());
  
      let collections = [];
  
      if (docSnap.exists()) {
        collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          alert("FlashCard collection with the same name already exists");
          return;
        }
      }
  
      collections.push({ name });
  
      batch.set(userDocRef, { flashcards: collections, access: false }, { merge: true });
  
      const colRef = collection(userDocRef, name);
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });
  
      console.log("Here I am 1");
      await batch.commit();
      console.log("Flashcards saved successfully");
      handleClose();
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
    }
  };

  const numbers = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 11,
      label: "11",
    },
    {
      value: 12,
      label: "12",
    },
    {
      value: 13,
      label: "13",
    },
    {
      value: 14,
      label: "14",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 16,
      label: "16",
    },
    {
      value: 17,
      label: "17",
    },
    {
      value: 18,
      label: "18",
    },
    {
      value: 19,
      label: "19",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 21,
      label: "21",
    },
    {
      value: 22,
      label: "22",
    },
    {
      value: 23,
      label: "23",
    },
    {
      value: 24,
      label: "24",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 26,
      label: "26",
    },
    {
      value: 27,
      label: "27",
    },
    {
      value: 28,
      label: "28",
    },
    {
      value: 29,
      label: "29",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 31,
      label: "31",
    },
  ];
  

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant={"h4"}>Generate Flashcards</Typography>
        <Paper sx={{ p: 4, width: "100%" }}>
        <Typography variant={"h5"}>Subject Name</Typography>
       
          <TextField
            value={subject}
            onChange={(e) => setSubject(e.target.value)} 
            label="E.g Math, Science, History"
            fullWidth
            multiline
            variant="filled"
            sx={{ mb: 2 }}
          />
           <Typography variant={"h5"}>Number of Flashcards</Typography> 
           <TextField
            id="outlined-numbers"
            select
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            label="E.g: 1,2,3"
            defaultValue = "1"
            helperText="Please select your currency">
            {numbers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
         
        </TextField>
        <Typography variant = {"h5"}>Topics to cover</Typography>
        <Typography variant = {"h6"}>Put it in commas</Typography>
        <TextField value = {topics} onChange = {(e) => setTopics(e.target.value)} label = "E.g Differentials, DNA, Roman Empire" fullWidth multiline variant = "filled" sx = {{mb: 2}}/>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              handleLogin();
              const userDocRef = doc(db, "users", user.id);
              const docSnap = await getDoc(userDocRef);

              if (docSnap.exists() && docSnap.data().access === false) {
                alert("You used up your free trial. Please pay to continue using the service.");
              }
              else
              {
                setDoc(userDocRef, { access: false}, { merge: true })
                handleSubmit();
              }
            }
          }
            fullWidth
          >
            Submit
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
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
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save FlashCards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter flashcards collection name...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashCards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Generate;
