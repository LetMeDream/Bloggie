import { Link } from 'react-router-dom';
import Moment from '../../plugin/Moment';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'; // Import useEffect
import { Post } from '../../types/posts';
const PostCard = ({ post }: { post: Post }) => {  const PLACEHOLDER_URL = 'https://placehold.co/600x400?text=Image+Not+Found&font=roboto';

  // Use state to manage the image source, initializing with post image or placeholder
  const [currentSrc, setCurrentSrc] = useState(post?.image || PLACEHOLDER_URL);
  const [imgLoading, setImgLoading] = useState(true);

  // Effect to reset currentSrc if the post image prop changes
  useEffect(() => {
      setCurrentSrc(post?.image || PLACEHOLDER_URL);
  }, [post?.image]); // Re-run effect if post.image changes

  const handlePlaceholderOnError = () => {
    // Only set placeholder if the current src is NOT the placeholder already
    // and if the error didn't already occur for this source
    // (We might need an additional state for error tracking if imageSrc itself changes,
    // but for a static placeholder, checking currentSrc is usually sufficient)
    if (currentSrc !== PLACEHOLDER_URL) {
      setCurrentSrc(PLACEHOLDER_URL);
    }
  };

  return (
    <div className='col-12 col-md-6 col-lg-3 mb-4'>
      {/* Card height: Removed fixed 50vh from here.
         The image container aspect ratio will help control card height partially. */}
      <div className='card-moderna'> 
        <div className='card-fold !rounded-t-[0.5rem] ratio ratio-16x9 skeleton'> 
          <img
            onLoad={() => setImgLoading(false)}
            style={{
              // These styles are good for making the image cover the ratio container
              objectFit: 'cover',
            }}
            src={currentSrc}
            onError={handlePlaceholderOnError} // Set placeholder on error
            alt='Card image'
          />
        </div>
        <div className='card-body px-3 pt-3 d-flex flex-column flex-grow-1'> 
          <h4 className='card-title mb-2'> 
            <Link
              to={`/${post.slug}`} // TODO: Make this dynamic based on post, use a fallback
              className='btn-link text-reset   fw-bold text-decoration-none text-truncate d-block' // Added text-truncate d-block
              style={{
                maxWidth: '100%' // Ensure text-truncate works within container
              }}
            >
              {post?.title || 'Título no disponible'}
            </Link>
          </h4>
          {/* Action buttons (Bookmark, Like): Wrap in a div for better layout control */}
          <div className="mb-2">
             <button style={{ border: 'none', background: 'none' }} aria-label="Bookmark">
              <i className='fas fa-bookmark text-danger' />
             </button>
             <button style={{ border: 'none', background: 'none', marginLeft: '8px' }} aria-label="Like"> 
              <i className='fas fa-thumbs-up text-primary' />
             </button>
          </div>


          {/* Details List: Use Flexbox for list items for better alignment */}
          {/* Added mt-auto to push this list to the bottom if card-body is flex column */}
          <ul className='list-style-none p-0 mt-auto' style={{ listStyle: 'none' }}> {/* p-0 removes default ul padding, mt-auto pushes it down */}
            {/* Each list item uses flexbox for icon/text alignment */}
            <li className='d-flex align-items-center mt-2'> {/* Added d-flex align-items-center */}
              <i className='fas fa-user me-2' /> {/* Added me-2 margin-right */}
              {/* TODO: The URL for the user link */}
              <a href='#' className='text-dark text-decoration-none'>
                 {post?.user || 'Usuario Desconocido'}
              </a>
            </li>
            <li className='d-flex align-items-center mt-yh2'>
              <i className='fas fa-calendar me-2' /> 
              <span>{post?.date ? Moment(post?.date) : 'Fecha no disponible'}</span> 
            </li>
            <li className='d-flex align-items-center mt-2'>
              <i className='fas fa-eye me-2' /> 
              <span>{post?.view || 0} Vistas</span> 
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostCard;