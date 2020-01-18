import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomizedTable from '../Table/table';
import MUIDataTable from "mui-datatables";
class TableWithFeatures extends Component {
  render() {

    // const columns = ["Drug", "Originator Company", "Development Status", "MoA", "Analysis"];

    // const data = [
    //   ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
    //   ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
    //   ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
    //   ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
    //   ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
    //   [
    //     "Blake Duncan",
    //     "Business Management Analyst",
    //     "San Diego",
    //     65,
    //     "$94,000"
    //   ],
    //   ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
    //   ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
    //   ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
    //   ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
    //   ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
    //   ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
    //   ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
    //   ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
    //   ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"]
    // ];

    const columns = ["Drug Name", "Originator Company","Loe"];

    const data = [
     
      ["ECONAZOLE NITRATE", "GLENMARK","12.06 years"],
      ["CLINDAMYCIN PHOSPHATE", "LEO PHARMA AS","11.9 years"],
      ["KETOCONAZOLE", "MYLAN","4.52 years"],
      ["TAZAROTENE", "MAYNE PHARMA","N/A"],
      ["AZELAIC ACID", "LEO PHARMA AS","10.61 years"],
      ["HALOBETASOL PROPIONATE", "MAYNE PHARMA","4.62 years"],
      ["KETOCONAZOLE", "PERRIGO ISRAEL","1.85 years"],
      ["BETAMETHASONE VALERATE", "MYLAN", "N/A"],
      ["MINOXIDIL", "JOHNSON AND JOHNSON", "0.25 years"],
      ["CLOBETASOL PROPIONATE", "MYLAN","N/A"],
      ["MINOXIDIL","JOHNSON AND JOHNSON","0.25 years"],
      ["CLOBETASOL PROPIONATE","MYLAN","N/A"],
      ["CALCIPOTRIENE","MAYNE PHARMA","9.2 years"],
      ["CALCIPOTRIENE","MAYNE PHARMA","6.85 years"],
      ["DESONIDE","ALMIRALL","6.12 years"],
      ["DESONIDE","ALMIRALL","8.07 years"],
      ["DESONIDE","ALMIRALL","0.14 years"],
      ["FLUTICASONE PROPIONATE","GLAXO GRP LTD","1.23 years"],
      ["BUDESONIDE", "VALEANT PHARMS INTL", "N/A"],
      ["BETAMETHASONE VALERATE", "PERRIGO UK FINCO","1.23 years"],
      ["CLINDAMYCIN PHOSPHATE", "PERRIGO UK FINCO", "N/A"],
      ["CLOBETASOL PROPIONATE", "GLENMARK PHARMS LTD", "1.23 years"],
      ["FLUTICASONE PROPIONATE","GLAXO GRP LTD","3.92 years"],
      ["FLUTICASONE PROPIONATE","GLAXO GRP LTD","6.61 years"],
      ["FLUTICASONE PROPIONATE","GLAXO GRP LTD","0.4 years"],
      ["FLUTICASONE PROPIONATE","GLAXO GRP LTD","7.11 years"],
      ["FLUTICASONE PROPIONATE","GLAXO GRP LTD","4.42 years"],
      ["FLUTICASONE PROPIONATE","GLAXO GRP LTD","6.61 years"]
      
    ];

    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };
    return (
      <div id="drugTable">
      <div className="drugTableWrapper">
         <MUIDataTable
         //changes for heading,heading were outside
        // title={"Drug List"}
        title={<div className="headingBlue">Drug List</div>}
        data={data}
        columns={columns}
        options={options}
      />
      </div>
      </div>
    )
  }
}

export default connect(null, null)(TableWithFeatures);