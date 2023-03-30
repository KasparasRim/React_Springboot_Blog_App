import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Footer from './Footer';
import { usePosts } from '../Api/postsApi';
import Typography from '@mui/material/Typography';
import { Translation } from "react-i18next";

const theme = createTheme();

export default function Blog() {
  const { isFetching, posts = [] } = usePosts();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          {isFetching && <Typography variant="h5"><Translation>{(t) => t('loadingPosts')}</Translation></Typography>}
          {posts.length > 0 ? (
            <>
              <MainFeaturedPost post={posts[0]} />
              <Grid container spacing={4}>
                {posts.slice(1, 3).map((post) => (
                  <FeaturedPost key={post.title} post={post} />
                ))}
              </Grid>
              <Grid container spacing={5} sx={{ mt: 3 }}>
                <Main posts={posts.slice(3)} />
              </Grid>
            </>
          ) : (
            <Typography variant="h5">No posts found.</Typography>
          )}
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}