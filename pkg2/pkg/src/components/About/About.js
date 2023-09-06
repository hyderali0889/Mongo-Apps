import React from 'react';
import InfoSection from '../Home/Components/InfoSection/InfoSection';
import { homeObjOne, homeObjTwo , homeObjThree } from './Data';

function Products() {
  return (
    <>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />

    </>
  );
}

export default Products;