import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../store/slices/userSlice";
import { useLogin } from '../Api/usersApi'
import { Translation } from "react-i18next";

const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const LogInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useLogin();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <>
      <Dialog open onClose={handleClose}>
        <DialogTitle><Typography variant="h4" align="center" gutterBottom>
        <Translation>{(t) => t('logIn')}</Translation>
        </Typography></DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LogInSchema}
            
            onSubmit={async (values, { setSubmitting }) => {
              console.log("login data", values)

              const user = await login(values)
              console.log("user", user)
              dispatch(userLoggedIn(user))

              setSubmitting(false)

              handleClose()
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <DialogContentText>
                <Translation>{(t) => t('plzEnterYourPassandEmailToLogin')}</Translation>
                </DialogContentText>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Field
                    as={TextField}
                    label="Email Address"
                    name="email"
                    type="email"
                    error={!!errors.email && touched.email}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    error={!!errors.password && touched.password}
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleClose}><Translation>{(t) => t('cancel')}</Translation></Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Translation>{(t) => t('logIn')}</Translation>
                    )}
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

export default LogInForm;
