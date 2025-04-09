export function generateCariesTable(data, country) {
    const table = document.createElement("table");
    table.classList.add("caries-table");
  
    // Get full country name from ISO code
    const select = document.querySelector(".select-country");
    const option = select.querySelector(`option[value="${country}"]`);
    const countryName = option.textContent;
  
    //Create table header
    const header = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.textContent = `Indicator for ${countryName}`;
    const th2 = document.createElement("th");
    th2.textContent = "Value";
    header.appendChild(th1);
    header.appendChild(th2);
    table.appendChild(header);
  
    // Helper to create a row
    function addRow(label, value) {
      const row = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = label;
      const td2 = document.createElement("td");
      td2.textContent = value;
      row.appendChild(td1);
      row.appendChild(td2);
      table.appendChild(row);
    }
  
    // Handle permanent caries
    if (data.permanent.length > 0) {
      const item = data.permanent[0];
      addRow(`Untreated caries (permanent) as at ${item.TimeDim}`, `${item.Value}%`);
    } else {
      addRow("Untreated caries (permanent)", "no data available for this location");
    }
  
    // Handle deciduous caries
    if (data.deciduous.length > 0) {
      const item = data.deciduous[0];
      addRow(`Untreated caries (deciduous) as at ${item.TimeDim}`, `${item.Value}%`);
    } else {
      addRow("Untreated caries (deciduous)", "no data available for this location");
    }
  
    // Handle sugar availability
    if (data.sugar.length > 0) {
      const item = data.sugar[0];
      addRow(`Sugar availability (kg/year) as at ${item.TimeDim}`, item.Value);
    } else {
      addRow("Sugar availability", "no data available for this location");
    }
  
    // Handle fluoride toothpaste affordability
    if (data.fluoride.length > 0) {
      const item = data.fluoride[0];
      addRow(`Fluoride toothpaste affordability as at ${item.TimeDim}`, item.Value);
    } else {
      addRow("Fluoride toothpaste affordability", "no data available for this location");
    }
  
    // Handle dentist density (all available data with years)
    if (data.dentists.length > 0) {
      data.dentists.forEach((dentist) => {
        addRow(`Dentist density (per 10,000 population) as at ${dentist.TimeDim}`, dentist.Value);
      });
    } else {
      addRow("Dentist density", "no data available for this location");
    }
  
    return table;
  }