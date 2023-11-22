import React from "react";
import { useNavigateBack } from "../utils/hooks";

export default function NotFoundPage() {
  const navigateBack = useNavigateBack();
  return (
    <div className="not-found-cont">
      <div className="not-found-title-cont">
        <h3 className="header">Oops!</h3>
        <h1 className="primary-color feature-text-1">404</h1>
      </div>
      <div>
        <p className="info-font">The page you are looking for can't be found.</p>
          <button className='btn' onClick={navigateBack} >Let's go back</button>
      </div>
    </div>
  );
}
