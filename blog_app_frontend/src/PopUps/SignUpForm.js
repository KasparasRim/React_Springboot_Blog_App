import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useCreateUser } from '../Api/usersApi'
import { Translation } from "react-i18next";


const SignInSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

function SignUpForm() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <>
      <Dialog open onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" align="center" gutterBottom>
            <Translation>{(t) => t('signUp')}</Translation>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            onSubmit={async (user) => {
              await createUser(user)
              handleClose()
            }}

            validationSchema={SignInSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <DialogContentText>
                  <Translation>{(t) => t('plzEnterYourPassandEmailToLogin')}</Translation>
                </DialogContentText>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Field
                    as={TextField}
                    label="First Name"
                    name="firstName"
                    type="text"
                    error={errors.name && touched.name}
                    helperText={touched.firstName && errors.name}
                  />
                  <Field
                    as={TextField}
                    label="Last Name"
                    name="lastName"
                    type="text"
                    error={errors.name && touched.name}
                    helperText={touched.lastName && errors.name}
                  />
                  <Field
                    as={TextField}
                    label="Email Address"
                    name="email"
                    type="email"
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    error={errors.password && touched.password}
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleClose}><Translation>{(t) => t('cancel')}</Translation></Button>
                  <Button type="submit">
                    <Translation>{(t) => t('signUp')}</Translation>
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignUpForm;