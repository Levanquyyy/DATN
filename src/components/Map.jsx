import React from "react";

const MapIframe = React.memo(({ address }) => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d57306.96431423534!2d106.608462!3d10.855251!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1728969086333!5m2!1svi!2s=${encodeURIComponent(
    address
  )}`;

  return (
    <iframe
      src={mapUrl}
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
});

export default MapIframe;
