import * as storyService from '../../services/storiesService';
import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ImageBox from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/material/Button';
import { ButtonGroup, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const StoryDetails = () => {
  const [story, setStory] = useState({});
  const { user } = useAuthContext();
  const { storyId } = useParams();

  const navigate = useNavigate();

  const isOwner = user._id === story._ownerId;

  useEffect(() => {
    storyService.getOne(storyId).then(result => {
      if (result.code === 404) {
        navigate('/stories');
      }
      setStory(result);
    });
  }, [navigate, storyId]);

  const storyDeleteHandler = () => {
    const confirmation = window.confirm('Are you sure you want to delete this game?');

    if (confirmation) {
      storyService.remove(storyId)
      .then(() => {
        navigate('/stories');
      })
    }
  }

  return (
      <Paper variant="outlined" elevation={3}>
      <Container component="main">
        {!story && <Loading/>}
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
          <Typography component="h1" variant="h5">
            {story.name}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="p"
                        component="div">
              {story.description}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: { lg: 'space-between', md: 'center' },
            flexDirection: {
              lg: 'row',
              md: 'row',
              sm: 'column',
              xs: 'column',
            },
            width: 1,
            mt: 2,
          }}>
            <Box sx={{ width: 2 / 3 }}>
              <ImageBox
                  sx={{ width: 1, resize: 'none', overflow: 'auto', p: 1 }}>
                <AspectRatio objectFit="contain">
                  <img src={story.imageUrl}
                       srcSet={story.imageUrl}
                       alt={''}
                       layout="fill"/>
                </AspectRatio>
              </ImageBox>
            </Box>
            <Box sx={{
              width: 1 / 3,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Box sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography component="h6" variant="h6">
                  Използвани успешни примамки
                </Typography>
              </Box>
              <Box sx={{
                width: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                ml: 2,
              }}>
                <Typography component="p" variant="body2">
                  {story.lures}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {
          isOwner &&
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }} mt={2}>
            <ButtonGroup color="secondary"
                         aria-label="medium secondary button group"
                          sx={{mb:2}}>
              <Button variant="outlined"
                      component={Link}
                      to={`/stories/${storyId}/edit`}
                      startIcon={<EditIcon />}>
                Редактирай
              </Button>
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={storyDeleteHandler}>
                Изтрий
              </Button>
            </ButtonGroup>
          </Box>
        }
      </Container>
      </Paper>

  );
};
;

export default StoryDetails;