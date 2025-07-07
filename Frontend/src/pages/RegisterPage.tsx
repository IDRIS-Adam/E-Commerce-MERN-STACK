import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../Constants/baseURL";
import { useAuth } from "../context/ContextAuth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // use error
  const [error, setError] = useState("");

  // The referances of INPUTS
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const naviget = useNavigate();
  // The function of sending data to the server

  const { login } = useAuth();

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validate the form Data
    if (!firstName || !lastName || !email || !password) {
      setError("Check submitted data");
      return;
    }
    // test the inputs in log
    console.log(firstName, lastName, email, password);

    /// Make the call to API to create the user
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to register user, Please try again !");
      return;
    }

    const token = await response.json();

    if (!token) {
      setError("Incorrect Token");
      return;
    }

    login(email, token);
    // Navigate to the HomePage
    naviget("/");
  };

  /////////////////////// The Page
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">Register New Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            p: 2,
            borderColor: "#f5f5",
          }}
        >
          <TextField
            inputRef={firstNameRef}
            label="Full Name"
            name="fullName"
          />
          <TextField inputRef={lastNameRef} label="Full Name" name="fullName" />
          <TextField
            inputRef={emailRef}
            label="Email"
            type="email"
            name="email"
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
