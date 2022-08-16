import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorAlert from '../common/ErrorAlert';

import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { withAuth } from '../../contexts/AuthContext';

const theme = createTheme();

const Register = ({ auth }) => {
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = validateFormData(data);

    if (userData !== false) {
      authService.register(userData).then(authData => {
        auth.userLogin(authData);
        navigate('/');
      });
    }

  };

  const validateFormData = (formData) => {
    const name = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (name.length < 3 || lastName.length < 3 || password.length < 3 ||
        email.length < 3) {
      setError(true);
      setErrorMessage("Моля попълнете всички полета")
      return false;
    }

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Паролата и потвърди паролата са различни");
      return false;
    }

    return {
      'email': email,
      'password': password,
      'name': name,
      'lastName': lastName,
    };
  };

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <ErrorAlert message={errorMessage}
                      error={error}
                      setError={setError}/>
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Регистрация
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Име"
                      autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Фамилия"
                      name="lastName"
                      autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      id="email"
                      label="Имейл адрес"
                      name="email"
                      autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      name="password"
                      label="Парола"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      name="confirm-password"
                      label="Потвърди парола"
                      type="password"
                      id="confirm-password"
                      autoComplete="repeat-password"
                  />
                </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Регистрация
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Вход
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
};

const RegisterWithAuth = withAuth(Register);

export default RegisterWithAuth;