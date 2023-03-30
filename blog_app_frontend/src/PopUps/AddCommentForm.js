import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@mui/material';
import HTTP from '../Api/index';
import * as Yup from 'yup';



const commentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  content: Yup.string().required('Required'),
});

const AddCommentForm = ({ url, handleCloseCommentForm }) => {

  
  const initialValues = {
    name: '',
    email: '',
    content: '',
  };

  const createComment = (url, comment) =>
  HTTP.post(`/comments/${url}/create`, comment);

  const onSubmit = async (values, props) => {
    await createComment(url, values);
    props.setSubmitting(false);
    handleCloseCommentForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={commentValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name="name"
            as={TextField}
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Field
            name="email"
            as={TextField}
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type="email"
          />
          <Field
            name="content"
            as={TextField}
            label="Comment"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCommentForm;
