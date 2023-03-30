import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import { Translation } from "react-i18next";

function Main(props) {
  const { posts } = props;

  return (
    <Grid
      item
      xs={12}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h5" gutterBottom>
        <Translation>{(t) => t('otherPosts')}</Translation>
      </Typography>
      <Divider variant="fullWidth"></Divider>
      {posts.map((post) => (
        <Markdown className="markdown" key={post.id} title={post.title} description={post.shortDescription} createdOn={post.createdOn} updatedOn={post.updatedOn} content={post.content.substring(0, 500) + "..."} url={post.url} />
      ))}
    </Grid>
  );
}


export default Main;