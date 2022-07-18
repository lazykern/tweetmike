import React from 'react';
import {NextPage} from 'next';
import {Col, ColsWrapper, Row, RowsWrapper} from 'react-grid-resizable';

const Design: NextPage = () => {

    
  return (
    <div>
      <RowsWrapper  separatorProps={{className:'bg-black dark:bg-white', style: {height:2}}}>
        <Row initialHeight={450}  />
        <Row />
      </RowsWrapper>
    </div>
  );
};

export default Design;
