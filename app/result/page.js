"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

const resultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;

      try {
        const res = await axios.get(
          `/api/checkout-session?session_id=${session_id}`
        );
        const sessionData = res.data;
        setSession(sessionData);
      } catch (err) {
        console.log(err);
        setError("An error occurred while fetching the session.");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
        <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6">{error}</Typography>
        </Container>
      );
  } 
  
  return (
    <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
      {session.payment_status === 'paid' ? (
        <>
            <Typography variant="h4">Thank You for Purchasing!</Typography>
            <Box sx={{mt: 22}}>
                <Typography variant="h6">Session ID: {session_id} </Typography>
                <Typography variant="body1">We have received your payment. You will receive the email with the details shortly.</Typography>
            </Box>
        </>
      ) : (<>
        <Typography variant="h4">Payment Failed.</Typography>
            <Box sx={{mt: 22}}>
                <Typography variant="body1">Payment was unsuccessful. Please try again.</Typography>
            </Box>
      </>)}
    </Container>
  );
};

export default resultPage;