import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createComment } from "../services/commentService";
import CustomAlert from "./CustomAlert";

function CommentForm() {
  const { postUrl } = useParams();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createComment(postUrl, comment);
      setSuccess(true);
      setError("");
      setComment("");
    } catch (error) {
      setError("Something went wrong!");
      setSuccess(false);
    }
  };

  return (
    <>
      {success && (
        <CustomAlert
          severity="success"
          title="Success"
          message="Comment created successfully!"
          onClose={() => setSuccess(false)}
          autoHideDuration={2000}
        />
      )}
      {error && (
        <CustomAlert
          severity="error"
          title="Error"
          message={error}
          onClose={() => setError("")}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CommentForm;