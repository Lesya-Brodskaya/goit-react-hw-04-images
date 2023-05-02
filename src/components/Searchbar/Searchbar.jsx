import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { Header, Form, SearchFormButton, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchImage, setSearchImage] = useState('');

  const handleSearchChange = event => {
    setSearchImage(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchImage.trim() === '') {
      alert('Please, enter image name');
      return;
    }
    onSubmit(searchImage);
    setSearchImage('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size="30" />
        </SearchFormButton>
        <Input
          assName="input"
          type="text"
          autocomplete="off"
          toFocus
          placeholder="Search images and photos"
          value={searchImage}
          onChange={handleSearchChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
