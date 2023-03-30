import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import HTTP from "../Api/index";
import { Translation } from "react-i18next";

const Comment = ({ comment, url, handleRerenderAfterDeletedComment }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await HTTP.delete(`/comments/${url}/${comment.id}`);
      handleRerenderAfterDeletedComment();

    } catch (error) {
      console.error(error);
      setIsDeleting(false);

    }
  };

  return (
    <Box sx={{ mb: 3, mt: 3 }}>
      <Typography variant="body1">{comment.content}</Typography>
      <Typography variant="body2" color="text.secondary">
        By: {comment.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Translation>{(t) => t('createdOn')}</Translation> {comment.createdOn}
      </Typography>
      <Button variant="outlined" disabled={isDeleting} onClick={handleDelete}>
        <Translation>{(t) => t('delete')}</Translation>
      </Button>
    </Box>
  );
};

export default Comment;