import React from 'react';
import { usePost } from '../Api/postApi';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Header from "./Header";
import Footer from "./Footer";
import Grid from '@mui/material/Grid';
import Markdown from './Markdown';
import CommentsList from './ComentsList';

function getRandomNumber() {
  return Math.floor(Math.random() * 500);
}

const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(https://source.unsplash.com/random/600x600?${getRandomNumber()})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const SinglePost = ({ postUrl }) => {
  const { data: post, isLoading, isError, refetch, error } = usePost(postUrl);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const { id, title, url, content, shortDescription, createdOn, updatedOn, comments } = post;



  return (
    <>
      <Header />
      <Box>
        <BackgroundBox>
          <Typography variant="h1" sx={{ mb: 2 }}>
            {title}
          </Typography>
        </BackgroundBox>
        <Container maxWidth="lg">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">{shortDescription}
            </Typography>
            <Grid container spacing={5} sx={{ mt: 3 }}>
              <Markdown className="markdown" key={id} content={content} url={url} createdOn={createdOn} updatedOn={updatedOn} />
            </Grid>
          </Box>
          <Box sx={{ mb: 3 }}>
            <CommentsList comments={comments} url={url} refetch= {refetch}> </CommentsList>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default SinglePost;
