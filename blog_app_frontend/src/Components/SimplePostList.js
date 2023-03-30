import * as React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Typography, Button } from "@mui/material";
import Container from '@mui/material/Container';
import Markdown from './Markdown';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import HTTP from "../Api/index"
import Header from './Header';
import Footer from './Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Translation } from "react-i18next";
import { useSelector } from "react-redux";

function SimplePostList({ posts, refetch, isFetching }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const theme = createTheme();
    const user = useSelector(state => state.user);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await HTTP.delete(`/posts/${id}/delete`);
            refetch();
            setIsDeleting(false);
        } catch (error) {
            console.error(error);
            setIsDeleting(false);
        }
    };

    const handleEdit = (post) => {
        navigate('/posts/newpost', { state: { post: post } });
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Header />
                    {isFetching && <Typography variant="h5"><Translation>{(t) => t('loadingPosts')}</Translation></Typography>}
                    {posts.length > 0 ? (<Grid
                        item
                        xs={12}
                        sx={{
                            '& .markdown': {
                                py: 3,
                            },
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            <Translation>{(t) => t('allPosts')}</Translation>
                        </Typography>
                        <Divider variant="fullWidth"></Divider>

                        {posts.map((post) => (
                            <React.Fragment key={post.id}>
                                <Markdown className="markdown" title={post.title} description={post.shortDescription} createdOn={post.createdOn} updatedOn={post.updatedOn} content={post.content.substring(0, 500) + "..."} url={post.url} />
                                {user && (
                                    <>
                                        <Button key={`edit-${post.id}`} variant="outlined" color="primary" size="small" sx={{ mt: '5px', width: 100 }} disabled={isDeleting} onClick={() => handleEdit(post)}> <Translation>{(t) => t('edit')}</Translation> </Button>
                                        <Button key={`delete-${post.id}`} variant="outlined" color="error" size="small" sx={{ mt: '5px', ml: "1px", width: 100 }} disabled={isDeleting} onClick={() => handleDelete(post.id)}> <Translation>{(t) => t('delete')}</Translation> </Button>
                                    </>
                                )}
                            </React.Fragment>
                        ))}


                    </Grid>
                    ) : (
                        <Typography variant="h5">No posts found.</Typography>
                    )}
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    );
}

export default SimplePostList;