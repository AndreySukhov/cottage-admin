import React from 'react';
import InfoCard from "../../../components/InfoCard";

const OptionsPreview = ({
  constructiveInfo,
  onConstructiveClick
}) => {
  return (
    <>
      {constructiveInfo.map((infoItem) => {
        return (
        <InfoCard key={infoItem.id}
          onClick={() => onConstructiveClick(infoItem)}>
          {infoItem.name}
        </InfoCard>
        )
      })}
    </>
  )
}

export default OptionsPreview;
