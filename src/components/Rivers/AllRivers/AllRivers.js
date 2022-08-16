import { getAll } from '../../../services/riverService';
import { useEffect, useState } from 'react';
import Loading from '../../common/Loading';
import Container from '@mui/material/Container';
import Catalog from '../../Catalog/Catalog';

const AllRivers = () => {
  const [rivers, setRivers] = useState();

  useEffect(() => {
    getAll().then(result => {
      setRivers(result);
    });
  }, []);

  return (
      <Container fixed>
        {!rivers && <Loading/>}
        {rivers && <Catalog title={'Водоеми'} items={rivers} itemsType={"rivers"}/>}
      </Container>

  );
};

export default AllRivers;