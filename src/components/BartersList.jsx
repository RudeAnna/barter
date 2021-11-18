import { useSelector } from "react-redux";
import React from "react";
import BarterCard from "./BarterCard";

const BartersList = () => {
  const barters = useSelector((state) => state.barters.barters);

  return (
    <div className="userpage-box box">
      <h3>Available barters</h3>
      <div className="barters-list">
        {barters &&
          barters.map((barter) => {
            return (
                <BarterCard barter={barter} key={barter.id} />
            );
          })}
      </div>
    </div>
  );
};

export default BartersList;