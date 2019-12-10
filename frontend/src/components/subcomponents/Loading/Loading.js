import React from 'react';

const Loading = () => {
  const loadingImage = 'https://cdn.dribbble.com/users/1283749/screenshots/4050901/honey-coin-walk.gif';
  const loadingString = require('./loading.gif');
  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <img src={loadingImage} align="center" className="center"/>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <img src={loadingString} align="center" className="center"/>
      </div>
    </>
  )
};

export default Loading;
