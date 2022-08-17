import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ErrorAlert from '../common/ErrorAlert';
import * as storiesService from '../../services/storiesService';
import { useNavigate } from 'react-router-dom';


const AddStory = () => {
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const storyData = validateFormData(data);

    if (storyData !== false) {
      storiesService.create(storyData).then(storyData => {
        navigate('/stories');
      });
    }
  };

  const validateFormData = (formData) => {
    const name = formData.get('name');
    const type = formData.get('type');
    const lures = formData.get('lures');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');

    if (name.length < 3 || type.length < 3 || description.length < 50 ||
        imageUrl.length < 3) {
      setError(true);
      setErrorMessage('Моля попълнете всички полета');
      return false;
    }

    return {
      'name': name,
      'type': type,
      'lures': lures,
      'description': description,
      'imageUrl': imageUrl,
    };
  };

  return (
        <Container component="main">
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
            <Typography component="h1" variant="h5">
              Добави история
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      id="name"
                      label="Заглавие"
                      name="name"
                      autoComplete="Заглавие"
                  />

                </Grid>
                <Grid item xs={12}>
                  <TextField
                      fullWidth
                      id="lures"
                      label="Успешни примамки"
                      name="lures"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      fullWidth
                      id="type"
                      label="Тип"
                      name="type"
                      defaultValue="Спининг"
                      autoComplete="Спининг"
                      InputProps={{
                        readOnly: true,
                      }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      name="imageUrl"
                      label="Линк към снимка"
                      id="imageUrl"
                      autoComplete="Спининг"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      name="description"
                      id="description"
                      label="Описание"
                      multiline
                      rows={15}
                      placeholder="Описание"
                  />

                </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Добави история
              </Button>
            </Box>
          </Box>
        </Container>
  );
};

export default AddStory;