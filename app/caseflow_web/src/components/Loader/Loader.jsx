import React from "react";
import { useSelector } from "react-redux";
import "./Loader.scss";
import SVG from "../../assets/loading.svg";
export default function Loader() {
  const isLoading = useSelector((state) => state.app.isShowLoader);
  return (
    <>
      {isLoading ? (
        <div className="internal-loader" data-testid="loading-component">
          <img src={SVG}></img>
        </div>
      ) : null}
    </>
  );
}
