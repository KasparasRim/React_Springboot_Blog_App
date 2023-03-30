import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Translation } from "react-i18next";

function MarkdownListItem(props) {
  return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />;
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h3',
        component: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h5', component: 'h2' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
  },
};

export default function Markdown({ title, description, createdOn, updatedOn, content, url, ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${url}`);
  };

  return (
    <Box {...props}>
      <Typography variant="h4" gutterBottom onClick={handleClick} sx={{ "&:hover": { color: "blue" } }} style={{ cursor: 'pointer' }}>
        {title}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {description}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary"> <Translation>{(t) => t('createdOn')}</Translation>
        {new Date(createdOn).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>  <Translation>{(t) => t('updatedOn')}</Translation>
        {new Date(updatedOn).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </Typography>
      <ReactMarkdown options={options}>{content}</ReactMarkdown>
    </Box>
  );
}
