import React from 'react';
import {NextPage} from 'next';
// import {Responsive, WidthProvider, Layouts} from 'react-grid-layout';
import GridLayout from "react-grid-layout";
import { List, ListSubheader, ListItem, ListItemText } from '@mui/material';
const Design: NextPage = () => {
  const layout: GridLayout.Layout[] = [
    {i: 'a', x: 0, y: 0, w: 8, h: 5,},
    {i: 'b', x: 0, y: 5, w: 8, h: 5},
    {i: 'c', x: 8, y: 0, w: 4, h: 10},
  ]
  
  return (
    <div>
      <GridLayout
        autoSize={true}
        className="flex"
        layout={layout}
        cols={12}
        maxRows={10}
        width={1200}
        rowHeight={60}
      >
        <div className="border-2 " key="a">
        <List
      sx={{
        width: '100%',
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>


        </div>
        <div key="b">b</div>
        <div key="c">c</div>
      </GridLayout>
    </div>
  );
};

export default Design;
