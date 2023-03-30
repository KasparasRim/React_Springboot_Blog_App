import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import AddCommentForm from '../PopUps/AddCommentForm';
import { Typography, Button } from '@mui/material';
import CustomAlert from '../PopUps/CustomAlert';
import { Translation } from "react-i18next";

const CommentList = ({ comments, url, refetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [showCommentCreatedAlert, setShowCommentCreatedAlert] = useState(false);
  const [showCommentDeletedAlert, setShowCommentDeletedAlert] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseCommentForm = () => {
    setShowForm(false);
    setShowCommentCreatedAlert(true);
    setTimeout(() => {
      setShowCommentCreatedAlert(false);
      refetch();
    }, 2000);
  };

  const handleRerenderAfterDeletedComment = () => {
    setRerender((current) => !current);
    setShowCommentDeletedAlert(true);
    setTimeout(() => {
      setShowCommentDeletedAlert(false);
      refetch();
    }, 2000);
  };

  useEffect(() => {
    console.log('CommentList rerendered!');
  }, [comments, rerender]);

  return (
    <>
      <Typography variant="h5" color="primary"><Translation>{(t) => t('comments')}</Translation></Typography>
      <Button variant="outlined"
        size="small" sx={{ mt: '5px', width: 100 }} onClick={handleShowForm}>
        <Translation>{(t) => t('addNew')}</Translation>
      </Button>
      {showCommentCreatedAlert && <CustomAlert severity="success" message="Comment created successfully!" />}
      {showCommentDeletedAlert && <CustomAlert severity="error" message="Comment deleted successfully!" />}
      {showForm && <AddCommentForm url={url} handleCloseCommentForm={handleCloseCommentForm} />}
      {comments.map((comment) => (
        <Comment key={comment.id} url={url} comment={comment} handleRerenderAfterDeletedComment={handleRerenderAfterDeletedComment} />
      ))}
    </>
  );
};

export default CommentList;