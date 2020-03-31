import React, { useState } from "react";
import { makeStyles, AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faBug } from "@fortawesome/free-solid-svg-icons";
import { CritterTable } from "../CritterTable/CritterTable";
import { CritterTableHead } from "../CritterTableHeader/CritterTableHead";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    background: "transparent",
    boxShadow: "none",
    flexDirection: "row"
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));

const style = {
  tabPanel: {
    maxWidth: "1278px",
    margin: "auto"
  }
};

const fishTableHeaders = [
  "Fish #",
  "Fish",
  "Location",
  "Shadow Size",
  "Value (Bells)",
  "Time",
  "Month (Northern Hemisphere)"
];
const insectTableHeaders = [
  "Insect #",
  "Insect",
  "Location",
  "Value",
  "Time",
  "Month (Northern Hemisphere)"
];

const TabPanel = ({
  importantFish,
  fishTable,
  value,
  index,
  isSearchingForCritter
}) => {
  return (
    <Typography
      style={style.tabPanel}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
    >
      {importantFish && !isSearchingForCritter && importantFish}
      {value === index && fishTable}
    </Typography>
  );
};

export const HeaderTabs = ({
  importantFish,
  modifiedFishData,
  handleRequestSort,
  isCritterSearched,
  isSearchingForCritter
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Fish" icon={<FontAwesomeIcon icon={faFish} />} />
          <Tab label="Insect" icon={<FontAwesomeIcon icon={faBug} />} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        importantFish={importantFish}
        fishTable={
          <CritterTable
            title="All Fish"
            fishData={modifiedFishData}
            isSearchingForCritter={isSearchingForCritter}
            critterTableHead={
              <CritterTableHead
                onRequestSort={handleRequestSort}
                isCritterSearched={isCritterSearched}
                tableHeaders={fishTableHeaders}
              />
            }
          />
        }
        isSearchingForCritter={isSearchingForCritter}
      />
      <TabPanel value={value} index={1} />
    </div>
  );
};
