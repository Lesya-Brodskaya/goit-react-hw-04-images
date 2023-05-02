import React, { useState, useEffect } from 'react';

import fetchImages from '../API/PixabayImages-API';
import Searchbar from '../Searchbar';
import Button from '../Button';
import Loader from '../Loader';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';
import { Container, Text } from './App.styled';

const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = newImageName => {
    setImageName(newImageName);
    setImages([]);
    setPage(1);

    if (imageName === newImageName) {
      return;
    }
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  // const onGetLargeImage = newLargeImageUrl => {
  //   setShowModal(newLargeImageUrl);
  // };

  const onGetLargeImage = event => {
    setShowModal({ modalImage: event });
  };

  const toggleLoading = () => {
    setIsLoading(isLoading => !isLoading);
  };

  const toggleModal = () => {
    setShowModal(null);
  };

  useEffect(() => {
    if (imageName === '') {
      return;
    }
    toggleLoading();

    fetchImages(imageName, page)
      .then(({ hits, total }) => {
        setImages(prevImages => [...prevImages, ...hits]);

        setTotalImages(total);
      })
      .catch(error => {
        console.log(error);
      });
  }, [imageName, page]);

  const isNotLastPage = images.length !== totalImages;
  const showButton = images.length > 0 && !isLoading && isNotLastPage;

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length === 0 && <Text>Search something!</Text>}

      {isLoading && <Loader />}

      {images.length > 0 && (
        <ImageGallery
          showModal={toggleModal}
          images={images}
          onGetLargeImage={onGetLargeImage}
        />
      )}

      {showButton && <Button onClick={loadMoreImages} />}

      {showModal && <Modal onClose={toggleModal} largeImage={showModal} />}
    </Container>
  );
};

export default App;
