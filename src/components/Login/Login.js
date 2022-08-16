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
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import ErrorAlert from '../common/ErrorAlert';

const theme = createTheme();

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    authService.login(data.get('email'), data.get('password'))
    .then(authData => {
          const userData = userLogin(authData);
          if (userData.accessToken) {
            navigate('/');
          } else {
            setError(true);
          }

        })
    .catch(() => {
          //TODO error handling
          console.log('catch');
        });
  };

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <ErrorAlert message={'Грешно потребителско име или парола'}
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
              Вход
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate
                 sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Имейл адрес"
                  name="email"
                  autoComplete="email"
                  autoFocus
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Парола"
                  type="password"
                  id="password"
                  autoComplete="current-password"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Вход
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Регистрация
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
};

export default Login;