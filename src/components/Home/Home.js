import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Box from '@mui/material/Box';
import ErrorAlert from '../common/ErrorAlert';

const Home = () => {
  const [error, setError] = React.useState(true);


  return (
      <Container component="main" maxWidth="xs">
        <ErrorAlert message={'Сайтът е в процес на разработка и някой функционалности може да не работят.Извиняваме се за неудобството.'}
                    error={error}
                    setError={setError}/>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }} mt={2}>
          <Typography component="h1" variant="h5">
            Добре дошли
          </Typography>
        </Box>
        <Typography component="p" variant="p">
          Fishing-adventures е сайт за споделяне на рибарските ни излети. Както и за информация за водоемите около нас.
        </Typography>

      </Container>
      );
};

export default Home;