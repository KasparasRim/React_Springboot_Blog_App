import * as React from 'react';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import HTTP from "../Api/index";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedPosts } from '../store/slices/searchSlice';

function SearchPosts() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams({ query: searchQuery });
    try {
      const response = await HTTP.get(`/posts/search?${queryParams}`);
      const searchedPosts = response.data;
      dispatch(setSearchedPosts(searchedPosts));
      setTimeout(() => {
        navigate('/posts/all', { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);
    }
    setAnchorEl(null);
  };


  return (
    <>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            label={t('search')}
            size="small"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button type="submit" variant="outlined" size="small">
            {t('search')}
          </Button>
        </form>
      </Popper>
      <IconButton onClick={handleClick}>
        <SearchIcon />
      </IconButton>
    </>
  );
}

export default SearchPosts;