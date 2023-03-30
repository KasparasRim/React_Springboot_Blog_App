import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Translation } from "react-i18next";

function FeaturedPost(props) {
  const { post } = props;

  function getRandomNumber() {
    return Math.floor(Math.random() * 500);
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={Link} to={`/posts/${post.url}`}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Translation>{(t) => t('createdOn')}</Translation>
            <Typography variant="subtitle1" color="text.secondary">
              {new Date(post.createdOn).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.shortDescription}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              <Translation>{(t) => t('continueReading')}</Translation>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={`https://source.unsplash.com/random/100x100?${getRandomNumber()}`}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;


