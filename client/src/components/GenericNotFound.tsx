import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const GenericNotFound: React.FC = () => {
  return (
    <Fragment>
      <h1>Page Not found</h1>
      <Link to='/' style={{textDecoration: "none"}}>Please return back to <strong><i>Divine Collections</i></strong></Link>
    </Fragment>
  )
}
export default GenericNotFound;