import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ErrorAlert from '../common/ErrorAlert';
import * as storiesService from '../../services/storiesService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as storyService from '../../services/storiesService';
import { useAuthContext } from '../../contexts/AuthContext';
import ImageBox from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Loading from '../common/Loading';

const AddStory = () => {
  const [error, setError] = React.useState(false);
  const [story, setStory] = useState({});
  const [storyImageUrl, setStoryImageUrl] = useState('missing-story');
  const [errorMessage, setErrorMessage] = React.useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();

  const { storyId } = useParams();

  useEffect(() => {
    storyService.getOne(storyId).then(result => {
      if (result.code === 404) {
        navigate('/stories');
      }
      if (!isAuthenticated || user._id !== result._ownerId) {
        navigate('/login');
      }
      setStory(result);
      setStoryImageUrl(result.imageUrl);
    });
  }, [navigate, storyId, user, isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const storyData = validateFormData(data);

    if (storyData !== false) {
      storiesService.edit(storyId, storyData).then(storyData => {
        navigate(`/stories/${storyId}`);
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
      setErrorMessage('???????? ?????????????????? ???????????? ????????????');
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

  const handleImageUrlChange = (event) => {
    setStoryImageUrl(event.target.value);
  };

  if (storyImageUrl === "missing-story"){
    return <Loading/>
  }

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
            ????????????????
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}
               sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="name"
                    label="????????????????"
                    name="name"
                    autoComplete="????????????????"
                    defaultValue={story.name}
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="lures"
                    label="?????????????? ????????????????"
                    name="lures"
                    defaultValue={story.lures}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="type"
                    label="??????"
                    name="type"
                    defaultValue="??????????????"
                    autoComplete="??????????????"
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
                    label="???????? ?????? ????????????"
                    id="imageUrl"
                    defaultValue={story.imageUrl}
                    onChange={handleImageUrlChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ width: 2 / 3 }}>
                  <ImageBox
                      sx={{ width: 1, resize: 'none', overflow: 'auto', p: 1 }}>
                    <AspectRatio objectFit="contain">
                      <img src={storyImageUrl}
                           srcSet={storyImageUrl}
                           alt={''}
                           layout="fill"/>
                    </AspectRatio>
                  </ImageBox>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="description"
                    id="description"
                    label="????????????????"
                    multiline
                    rows={15}
                    defaultValue={story.description}
                />

              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              ????????????????????
            </Button>
          </Box>
        </Box>

      </Container>
  )
      ;
};

export default AddStory;