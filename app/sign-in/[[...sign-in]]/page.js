import { SignIn, SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Typography, Toolbar } from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Flashcard SaaS
          </Typography>
          <Box>
            <Button color="inherit" component={Link} href="/sign-in" sx={{ mx: 1 }}>
              Sign In
            </Button>
            <Button color="inherit" component={Link} href="/sign-up" sx={{ mx: 1 }}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sign Up Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '80vh', mt: 4 }}
      >
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Sign In
        </Typography>
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <SignIn />
        </Box>
      </Box>
    </Container>
  );
}
