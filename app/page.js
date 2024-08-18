'use client';
import getStripe from '@/utils/getStripe';
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Flashcards from "./generate/page.js";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default function Home() {
  const handleSubmit = async () => {
    try {
     

      const checkoutSession = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      if(!checkoutSession.ok)
      {
        console.error(`Error: ${response.statusText}`);
        return;
      }

      const checkoutSessionJson = await checkoutSession.json()

      if (checkoutSession.data.statusCode === 500) {
        console.error(checkoutSession.data.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("Error during checkout session creation:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Get Started and Introduction */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "text.secondary", mb: 4 }}
          >
            The easiest way to make flashcards from text
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large" component={Link} href="/generate"
            sx={{ px: 4, py: 1.5, fontSize: "1.25rem" }}
          >
            Get Started
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large" component={Link} href="/flashcards"
            sx={{px: 4, py: 1.5, fontSize: "1.25rem" }}
          >
            View your Flashcards
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography
            variant="h4"
            my={2}
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ px: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Easy Text Input
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Simply input your text and let our software do the rest.
                  Creating flashcards has never been easier.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ px: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Smart Flashcards
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Our AI intelligently breaks down your text into concise
                  flashcards, perfect for studying.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ px: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Accessible Anywhere
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Access your flashcards from any device, any time. Study on the
                  go with ease.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography variant="h4" my={2} sx={{ fontWeight: "bold" }}>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6} lg={3}>
              <Box
                sx={{
                  p: 4,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Free
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  ₹0 / month
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                  Basic flashcards with limited access to features.
                </Typography>
                <Button variant="contained" color="primary" fullWidth component={Link} href="/generate"> 
                  Choose Free
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box
                sx={{
                  p: 4,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Basic
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  ₹199 / month
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                  Create and store up to 100 flashcards with standard features.
                </Typography>
                <Button variant="contained" color="primary" fullWidth onClick= {handleSubmit}>
                  Choose Basic
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Box
                sx={{
                  p: 4,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Pro
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  ₹299 / month
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                  Unlimited flashcards, priority support, and advanced features.
                </Typography>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                  Choose Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
