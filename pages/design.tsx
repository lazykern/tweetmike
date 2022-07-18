import React from 'react';
import {NextPage} from 'next';
import { useTheme } from 'next-themes';
import {Col, ColsWrapper, Row, RowsWrapper} from 'react-grid-resizable';

const Design: NextPage = () => {
    const {theme, systemTheme} = useTheme();

    const currentTheme = theme === 'system' ? systemTheme : theme;
    
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
