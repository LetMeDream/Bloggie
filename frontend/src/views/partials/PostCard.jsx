import { Link } from 'react-router-dom'
import Moment from '../../plugin/Moment'
import PropTypes from 'prop-types'

const PostCard = ({ post }) => {
  return (
    <div className='col-sm-6 col-lg-3'>
      <div className='card mb-4' style={{ height: '50vh', overflow: 'hidden' }}>
        <div className='card-fold position-relative'>
          <img
            className='card-img'
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover'
            }}
            src={post?.image}
            alt='Card image'
          />
        </div>
        <div className='card-body px-3 pt-3'>
          <h4 className='card-title'>
            <Link
              to='/7-common-mistakes-everyone-makes-while-travelling/'
              className='btn-link text-reset stretched-link fw-bold text-decoration-none'
            >
              {post?.title}
            </Link>
          </h4>
          <button style={{ border: 'none', background: 'none' }}>
            <i className='fas fa-bookmark text-danger' />
          </button>
          <button style={{ border: 'none', background: 'none' }}>
            <i className='fas fa-thumbs-up text-primary' />
          </button>

          <ul className='mt-3 list-style-none' style={{ listStyle: 'none' }}>
            <li>
              <a href='#' className='text-dark text-decoration-none'>
                <i className='fas fa-user' /> {post?.user}
              </a>
            </li>
            <li className='mt-2'>
              <i className='fas fa-calendar' />
              {Moment(post?.date)}
            </li>
            <li className='mt-2'>
              <i className='fas fa-eye' /> {post?.view}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostCard
