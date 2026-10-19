import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const resizeMap = () => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    resizeMap();

    window.addEventListener("resize", resizeMap);

    return () => {
      window.removeEventListener("resize", resizeMap);
    };
  }, [map]);

  return null;
}

export default MapResizeHandler;