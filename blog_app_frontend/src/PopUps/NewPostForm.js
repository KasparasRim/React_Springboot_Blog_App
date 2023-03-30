import { Formik, Form, Field } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { styled } from '@mui/system';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { useCreatePost } from '../Api/postApi'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


function getRandomNumber() {
  return Math.floor(Math.random() * 500);
}

const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(https://source.unsplash.com/random/600x600?${getRandomNumber()})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const NewPostSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  shortDescription: Yup.string().required('Short description is required'),
});

function NewPostForm() {
  const navigate = useNavigate();
  const createPost = useCreatePost();
  const { state } = useLocation();

  let initialValues = { title: '', content: '', shortDescription: '' };
  if (state && state.post) {
    const { post } = state;
    initialValues = { ...post };
  }

  const handleClose = () => {
    navigate('/');
  };

  const isEditMode = !!state;

  return (
    <>
      <Header />
      <CssBaseline />
      <Container maxWidth="lg">
        <Card sx={{ maxWidth: 'xl' }}>
          <BackgroundBox>
            <CardHeader
              title={
                <Typography variant="h4" align="center">
                  {isEditMode ? "Edit post" : "Create new post"}
                </Typography>
              }
            />
          </BackgroundBox>
          <CardContent>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                await createPost(values);
                handleClose();
              }}
              validationSchema={NewPostSchema}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  {isEditMode && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Field
                        as={TextField}
                        label="Id"
                        name="id"
                        type="text"
                        disabled
                      />
                    </Box>
                  )}
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Please enter the details of your post:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Field
                      as={TextField}
                      label="Title"
                      name="title"
                      type="text"
                      error={errors.title && touched.title}
                      helperText={touched.title && errors.title}
                    />
                    <Field
                      as={TextField}
                      label="Short Description"
                      name="shortDescription"
                      type="text"
                      error={errors.shortDescription && touched.shortDescription}
                      helperText={touched.shortDescription && errors.shortDescription}
                    />
                    <Field
                      as={TextField}
                      label="Content"
                      name="content"
                      type="text"
                      placeholder="Content"
                      multiline
                      minRows={5}
                      maxRows={50}
                      error={errors.content && touched.content}
                      helperText={touched.content && errors.content}
                    />
                  </Box>
                  <CardActions sx={{ justifyContent: 'auto' }}>
                    <Button type="submit" disabled={isSubmitting}>
                      {isEditMode ? 'Update' : 'Create'} Post
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default NewPostForm;
