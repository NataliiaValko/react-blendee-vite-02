import { getPhotos } from 'apiService/photos';
import { Button, Loader, PhotosGallery, Text, Form } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isMorePhotos, setIsMorePhotos] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    getPhotos(query, page)
      .then(({ photos, total_results, per_page }) => {
        if (!photos.length) {
          setIsEmpty(true);
          return;
        }

        setPhotos(prevPhotos => [...prevPhotos, ...photos]);
        setIsMorePhotos(page < Math.ceil(total_results / per_page));
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
    setIsMorePhotos(false);
    setIsEmpty(false);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      {photos.length > 0 && <PhotosGallery photos={photos} />}
      {!photos.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}

      {isMorePhotos && (
        <Button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}

      {isLoading && <Loader />}

      {error && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
};
