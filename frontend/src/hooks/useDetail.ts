import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function useSlug() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    console.log('Parámetro capturado:', slug);
  }, [slug]);

}

export default useSlug;