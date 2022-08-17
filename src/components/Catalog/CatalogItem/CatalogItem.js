import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import ImageBox from '@mui/joy/Box';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

const CatalogItem = (props) => {
  const collectionItem = props.collectionItem;

  return (
      <Container sx={{ mt: 5 }}>
        <Card variant="outlined">
          <Box
              sx={{
                display: 'flex',
                justifyContent: { lg: 'space-between', md: 'center' },
                flexDirection: {
                  lg: 'row',
                  md: 'row',
                  sm: 'column',
                  xs: 'column',
                },
                width: 1,
                pb: 2
              }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: 1 / 3,
            }}>
              <ImageBox
                  sx={{ width: 1, resize: 'none', overflow: 'auto', p: 1 }}>
                <AspectRatio objectFit="contain">
                  <img src={collectionItem.imageUrl}
                       srcSet={collectionItem.imageUrl}
                       alt={""}
                       layout="fill"/>
                </AspectRatio>
              </ImageBox>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 2 / 3,
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 1,
                height: 200,
                overflow: 'hidden',
              }}>
                <Typography variant="h6"
                            component="div">
                  {collectionItem.name}
                </Typography>
                <Typography variant="p"
                            component="div">
                  {collectionItem.description}
                </Typography>
              </Box>
              <Link to={`/${props.itemType}/${collectionItem._id}`}
                    className="details-button">
                Детайли
              </Link>
            </Box>
          </Box>
        </Card>
      </Container>
  );
};

export default CatalogItem;
