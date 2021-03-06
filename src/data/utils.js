/* 
 *  
 *  File: utils.js 
 *  Author: Lucy
 *  Copyright (c) 2020 Lucy Tan
 */

export const getCrittersLeavingByMonth = (crittersWithDates, monthName) => crittersWithDates.reduce((acc, crit) => {
  const endMonths = crit.month.split(/[-,]/g)

  if (endMonths[1] === monthName || (endMonths[3] && endMonths[3] === monthName)) acc.push(crit)

  return acc;
}, []);

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export const getQueryParam = (params = document.location.search.split(/[&?]/g)) => {
  const obj = {};

  for (const param of params) {
    if (!param) continue;

    const [key = '', value = ''] = param.split('=');

    obj[key.toLowerCase()] = toTitleCase(value.trim());
  }

  return obj;
};

export const monthNameToNumMap = {
  "January": 0,
  "February": 1,
  "March": 2,
  "April": 3,
  "May": 4,
  "June": 5,
  "July": 6,
  "August": 7,
  "September": 8,
  "October": 9,
  "November": 10,
  "December": 11
}

export const getCrittersAvailableByMonth = (critterWithDates, monthNum) => {
  const thisMonth = monthNum || new Date().getMonth(); // int

  const crittersThisMonth = critterWithDates.filter(crit => {
    const monthRanges = crit.month.split(',');

    for (const range of monthRanges) {
      const [begin, end = ''] = range.split('-');
      const startRange = monthNameToNumMap[begin.trim()];
      const endRange = monthNameToNumMap[end.trim()];

      if (!endRange) {
        // some critters don't have an end range
        if (startRange === thisMonth) return true;

      } else if (startRange <= thisMonth && thisMonth <= endRange) {
        return true;
      } else if (startRange > endRange && startRange >= thisMonth && endRange >= thisMonth) {
        // use case for when the dates loop back around Ex: November-March
        return true;
      }
    }

    return false;
  });

  return crittersThisMonth;
};
