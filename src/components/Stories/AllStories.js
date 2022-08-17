import { getAll } from '../../services/storiesService';
import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Container from '@mui/material/Container';
import Catalog from '../Catalog/Catalog';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuthContext } from '../../contexts/AuthContext';

const AllStories = () => {
  const [stories, setRivers] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    getAll().then(result => {
      setRivers(result);
    });
  }, []);

  return (
      <Container fixed>
        {!stories && <Loading/>}
        {
          user.email &&
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }} mt={2}>
            <Button variant="outlined"
                    component={Link}
                    to="/stories/create">Добави история</Button>
          </Box>
        }
        {stories && <Catalog title={'Рибарски истории'} items={stories}
                             itemsType={'stories'}/>}
      </Container>

  );
}
;

export default AllStories;