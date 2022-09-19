import React, { useState } from 'react';
import styled from 'styled-components';
import ImageButton from '../../shared/components/ImageButton';
import { Title, Line } from '../../shared/components/SpecComponents';

import AddRuleDialog from './Components/AddRuleDialog';

const Page = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Navbar = styled.div`
  width: 80%;
`;

const NavbarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Splitter = styled.div`
  width: 50px;
`;

const TabsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
`;

const Tab = styled.div`
  margin: 0px;
  width: 25%;
  font-weight: bold;
  text-align: start;
`;

const Rules = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <AddRuleDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <Page>
        <Navbar>
          <NavbarContent>
            <Buttons>
              <Title>Rules</Title>
              <Splitter />
              <ImageButton
                Solid="Solid"
                Text="Add New"
                color="#2D3648"
                hoverColor="white"
                icon="add.png"
                hoverIcon="addGrey.png"
                hoverTextColor="#2D3648"
                onClicked={() => setOpenDialog(true)}
              />
            </Buttons>
          </NavbarContent>

          <TabsBar>
            <Tab>Rule Name</Tab>

            <Tab>SQL Query</Tab>

            <Tab>Queue Name</Tab>

            <Tab>Exchange Key</Tab>
          </TabsBar>
          <Line />
        </Navbar>
      </Page>
    </div>
  );
};

export default Rules;
