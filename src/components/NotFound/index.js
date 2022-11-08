import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const NotFound = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="not-found-container">
      <img
        className="not-found-image"
        src="https://res.cloudinary.com/diag5apbn/image/upload/v1667557544/samples/BookHub/361-3611849_product-not-found-no-result-png_f3sgge.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found
      </p>
      <Link to="/" className="back-to-home-link">
        <button className="go-back-home-btn" type="button">
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
