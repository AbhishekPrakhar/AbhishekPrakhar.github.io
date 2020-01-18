import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import CardWithinCardComponent from '../CardComponent/CardWithinCardComponent';
import CardWithChartComponent from '../CardComponent/CardWithChartComponent';
import { Responsive, WidthProvider } from "react-grid-layout";
import Settings from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import './styles.css';
import Setting from './settings';
import { connect } from 'react-redux';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip'; 
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const cards = []
var selectedViews=[]
const Maincards=[
  {title:"My Saved Searches",values: [{ "title": " HarvardUni, last one year", "days": "1", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "PharmaNews", "days": "2", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "Phase 2-3 BASF pharma", "days": "12", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "FDA citations PSK9,all competitors", "days": "15", 'description': "title", 'value': "FDA", 'open': "1" }, { "title": "Contraception patents for Pfizer", "days": "20", 'description': "title", 'value': "Contraception", 'open': "1" }, { "title": "anticoagulants", "days": "25", 'description': "title", 'value': "anticoagulants", 'open': "1" }, { "title": "FDA citations PSK9,all competitors", "days": "28", 'description': "title", 'value': "FDA", 'open': "0" }]},
  {title:"Bookmarks",renderFlag: false, values: ["BI Publications, advanced PAH, Harvard Uni, last one year", "Contraception patents for Pfizer", "PharmaNews", "Phase 2-3 BASF pharma, anticoagulants", "FDA citations PSK9,all competitors"]},
  {title:'Alerts',values: ["New Report published for Elixir", "You have a new message in Inbox", "New Report published for Pradaxa", "CI Portal Update – New features!", "You have a new message in Inbox"]},
  {title:'Regulatory Watch',values: [{ "title": "Macleods Pharmaceutical Limited Issues Voluntary Nationwide Consumer Level Recall of Losartan Potassium 50mg and Losartan Potassium/Hydrochlorothiazide	combination Tablets 50mg/12.5mg, 100mg/12.5mg and 100mg/25mg due to detection of NMBA (N-Nitroso-N­ Methyl-4-aminobutyric acid) Impurity.", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/macleods-pharmaceutical-limited-issues-voluntary-nationwide-consumer-level-recall-losartan-potassium", "source": "U.S. FDA", "pubDate": "06/26/2019" },
  { "title": "Infusion Options Inc. Issues Voluntary Nationwide Recall of All Lots of All Sterile Products Due to Lack of Assurance of Sterility", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/infusion-options-inc-issues-voluntary-nationwide-recall-all-lots-all-sterile-products-due-lack", "source": "U.S. FDA", "pubDate": "06/18/2019" },
  { "title": "RXQ Compounding, LLC Issues Voluntary Nationwide Recall of All Sterile Products within Expiry and Voluntarily Cessation of Production Due to the Lack of Sterility Process Assurance", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/rxq-compounding-llc-issues-voluntary-nationwide-recall-all-sterile-products-within-expiry-and", "source": "U.S. FDA", "pubDate": "06/18/2019" },
  { "title": "Premier Pharmacy Labs Issues Voluntary Nationwide Recall of all Unexpired Sterile Drug Product Lots Due to Lack of Sterility Assurance", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/premier-pharmacy-labs-issues-voluntary-nationwide-recall-all-unexpired-sterile-drug-product-lots-due", "source": "U.S. FDA", "pubDate": "06/18/2019" },
  { "title": "Teva Pharmaceuticals USA, Inc. Expands Voluntary Nationwide Recall of Losartan Potassium to 50 mg and 100 mg Tablets USP, Sold Exclusively to Golden State Medical Supply, Inc.", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/teva-pharmaceuticals-usa-inc-expands-voluntary-nationwide-recall-losartan-potassium-50-mg-and-100-mg", "source": "U.S. FDA", "pubDate": "06/11/2019" },
  { "title": "NOVIS PR LLC Issues Voluntary Nationwide Recall of PECGEN DMX Due to a Labeling Error", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/novis-pr-llc-issues-voluntary-nationwide-recall-pecgen-dmx-due-labeling-error", "source": "U.S. FDA", "pubDate": "05/29/2019" },
  { "title": "NOVIS PR LLC Emite Recogido Voluntario a Nivel Nacional de PECGEN DMX Debido a Error en Etiqueta", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/novis-pr-llc-emite-recogido-voluntario-nivel-nacional-de-pecgen-dmx-debido-error-en-etiqueta", "source": "U.S. FDA", "pubDate": "05/29/2019" },
  { "title": "Heritage Pharmaceuticals Inc. Issues Voluntary Nationwide Recall of Amikacin Sulfate Injection, USP 1gm/4 mL (250mg/mL) and Prochlorperazine Edisylate Injection, USP 10mg/2mL (5mg/mL) as a Result of a Sterility Test Failure", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/heritage-pharmaceuticals-inc-issues-voluntary-nationwide-recall-amikacin-sulfate-injection-usp-1gm4", "source": "U.S. FDA", "pubDate": "05/28/2019" },
  { "title": "Norbrook Laboratories Limited Recalls Veterinary Products to Provide Sterility Assurance", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/norbrook-laboratories-limited-recalls-veterinary-products-provide-sterility-assurance", "source": "U.S. FDA", "pubDate": "05/24/2019" },
  { "title": "Novartis Issues Voluntary Nationwide Recall of Promacta® 12.5 mg for Oral Suspension Due to Potential Peanut Contamination", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/novartis-issues-voluntary-nationwide-recall-promactar-125-mg-oral-suspension-due-potential-peanut", "source": "U.S. FDA", "pubDate": "05/12/2019" }],
},
{title:'Press Release',values: [{ "title": "FDA approves new treatment for hypoactive sexual desire disorder in premenopausal women", "link": "https://www.fda.gov/news-events/press-announcements/fda-approves-new-treatment-hypoactive-sexual-desire-disorder-premenopausal-women", "source": "U.S. FDA", "pubDate": "06/21/2019" },
{ "title": "FDA expands approval of treatment for cystic fibrosis to include patients ages 6 and older", "link": "https://www.fda.gov/news-events/press-announcements/fda-expands-approval-treatment-cystic-fibrosis-include-patients-ages-6-and-older", "source": "U.S. FDA", "pubDate": "06/21/2019" },
{ "title": "Statement on agency’s efforts to increase transparency in medical device reporting", "link": "https://www.fda.gov/news-events/press-announcements/statement-agencys-efforts-increase-transparency-medical-device-reporting", "source": "U.S. FDA", "pubDate": "06/21/2019" },
{ "title": "Statement on the FDA’s benefit-risk framework for evaluating opioid analgesics", "link": "https://www.fda.gov/news-events/press-announcements/statement-fdas-benefit-risk-framework-evaluating-opioid-analgesics", "source": "U.S. FDA", "pubDate": "06/20/2019" },
{ "title": "Statement on a new effort to improve transparency and predictability for generic drug applicants to help increase timely access to high-quality, lower cost generic drugs", "link": "https://www.fda.gov/news-events/press-announcements/statement-new-effort-improve-transparency-and-predictability-generic-drug-applicants-help-increase", "source": "U.S. FDA", "pubDate": "06/18/2019" },
{ "title": "Statement on new guidance for the declaration of added sugars on food labels for single-ingredient sugars and syrups and certain cranberry products", "link": "https://www.fda.gov/news-events/press-announcements/statement-new-guidance-declaration-added-sugars-food-labels-single-ingredient-sugars-and-syrups-and", "source": "U.S. FDA", "pubDate": "06/18/2019" },
{ "title": "FDA approves new treatment for pediatric patients with type 2 diabetes", "link": "https://www.fda.gov/news-events/press-announcements/fda-approves-new-treatment-pediatric-patients-type-2-diabetes", "source": "U.S. FDA", "pubDate": "06/17/2019" },
{ "title": "Federal officials seize adulterated dietary supplements from Life Rising Corporation due to poor manufacturing practices", "link": "https://www.fda.gov/news-events/press-announcements/federal-officials-seize-adulterated-dietary-supplements-life-rising-corporation-due-poor", "source": "U.S. FDA", "pubDate": "06/14/2019" },
{ "title": "Statement on FDA’s scientific work to understand per- and polyfluoroalkyl substances (PFAS) in food, and findings from recent FDA surveys", "link": "https://www.fda.gov/news-events/press-announcements/statement-fdas-scientific-work-understand-and-polyfluoroalkyl-substances-pfas-food-and-findings", "source": "U.S. FDA", "pubDate": "06/11/2019" },
{ "title": "FDA finalizes guidance for premarket tobacco product applications for electronic nicotine delivery systems as part of commitment to continuing a strong oversight of e-cigarettes", "link": "https://www.fda.gov/news-events/press-announcements/fda-finalizes-guidance-premarket-tobacco-product-applications-electronic-nicotine-delivery-systems", "source": "U.S. FDA", "pubDate": "06/11/2019" }],
},
{title:'Person Watch',values: [],},
{title:'Industry News',values: [],},
{title:"Therapeutic Area Watch",identifier:"TherapeuticAreaWatch" ,values:[]}, 
{type:"chart",title:"Launch Estimates",identifier:"LaunchEstimate" ,values:[]},
{title:"Congress Planner",identifier:"CongressPlanner",values:[{
  "title": "18th Asia Pacific Ophthalmologists Annual Meeting", 
  "link": "https://ophthalmology.conferenceseries.com/asiapacific/", 
  "date": "July 29-30, 2019", "location": "Melbourne, Australia" 
},
{
  "title":"Oncology and Cancer Conferences","link":"https://www.conferenceseries.com/oncology-cancer-meetings",
  "date": "July 29-30, 2019", "location": "Melbourne, Australia"
},
{
  "title":"11th International Conference On Clinical And Cellular Immunology",
  "link":"https://immunology.immunologyconferences.org/",
  "date": "August 22-23, 2019", "location": "Vienna, Austria"
},
{
  "title":"5th World Congress On Cardiology And Cardiovascular Therapeutics",
  "link":"https://cardio.cardiologymeeting.com/",
  "date": "August 12-13, 2019", "location": "Tokyo, Japan"
},
{
  "title":"25th International Conference On Human Metabolic Health- Diabetes, Obesity & Metabolism",
  "link":"https://humanmetabolism.healthconferences.org/2019",
  "date":"March 21-22, 2019", "location":"Dubai,UAE"
},
{ 
  "title": "Euro Optometry and Vision Science",
  "link": "https://eurooptometry.ophthalmologyconferences.com/",
  "date": "August 22-23, 2019", "location": "Vienna, Austria" 
},
{ 
  "title": "VisionScience and Eye", 
  "link": "https://visionscience.ophthalmologyconferences.com/", 
  "date": "August 22-23, 2019", "location": "Vienna | Austria"
},
{ 
  "title": "Ophthalmology",
   "link": "https://worldophthalmology.conferenceseries.com",
   "date": "September 19-20, 2019", "location": "Osaka,Japan" 
}]},
{title:"Journal Watch",identifier:"JournalWatch",values:[{ "title": "Overall Survival with Ribociclib plus Endocrine Therapy in Breast Cancer.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31166679", "brandName": "Novartis" }, { "title": "BioPATH: A Biomarker Study in Asian Patients with HER2+ Advanced Breast Cancer Treated with Lapatinib and Other Anti-HER2 Therapy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31163957", "brandName": "Novartis" }, { "title": "Evaluating Patient Experiences in Dry Eye Disease Through Social Media Listening Research.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31161531", "brandName": "Novartis" }, { "title": "Deceased organ and tissue donation after medical assistance in dying and other conscious and competent donors: guidance for policy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31160497", "brandName": "Novartis" }, { "title": "Effects of Dapagliflozin on Volume Status When Added to Renin-Angiotensin System Inhibitors.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31159350", "brandName": "Novartis" }]},
{type:'chart',title:'Stock Chart',identifier:"StockChart",values: [{
  "company": "Novartis",
  "stocks": [
      { "date": "2018,5,18", "stock": 68.07 },
      { "date": "2018,6,18", "stock": 65.17 },
      { "date": "2018,7,18", "stock": 71.30 },
      { "date": "2018,8,18", "stock": 73.27 },
      { "date": "2018,9,18", "stock": 72.26 },
      { "date": "2018,10,18", "stock": 75.92 },
      { "date": "2018,11,18", "stock": 77.17 },
      { "date": "2018,12,18", "stock": 74.79 },
      { "date": "2019,1,18", "stock": 78.50 },
      { "date": "2019,2,18", "stock": 79.59 },
      { "date": "2019,3,18", "stock": 82.32 },
      { "date": "2019,4,18", "stock": 77.03 },
  ]
},
{
  "company": "Bayer",
  "stocks": [
      { "date":"2018,5,18","stock":102.70 },
      { "date":"2018,6,18","stock":98.46 },
      { "date":"2018,7,18","stock":92.96 },
      { "date":"2018,8,18","stock":80.78 },
      { "date":"2018,9,18","stock":73.30 },
      { "date":"2018,10,18","stock":78.42 },
      { "date":"2018,11,18","stock":62.30 },
      { "date":"2018,12,18","stock":63.41 },
      { "date":"2019,1,18","stock":66.50 },
      { "date":"2019,2,18","stock":67.80 },
      { "date":"2019,3,18","stock":69.70 },
      { "date":"2019,4,18","stock":61.16 },
  ]
},
{
  "company": "Pfizer",
  "stocks": [
      { "date": "2018,5,18", "stock": 30.27 },
      { "date": "2018,6,18", "stock": 31.00 },
      { "date": "2018,7,18", "stock": 32.28 },
      { "date": "2018,8,18", "stock": 37.04 },
      { "date": "2018,9,18", "stock": 37.25 },
      { "date": "2018,10,18", "stock": 38.58 },
      { "date": "2018,11,18", "stock": 38.03 },
      { "date": "2018,12,18", "stock": 37.37 },
      { "date": "2019,1,18", "stock": 37.41 },
      { "date": "2019,2,18", "stock": 37.58 },
      { "date": "2019,3,18", "stock": 36.71 },
      { "date": "2019,4,18", "stock": 34.90 },
  ]
},
{
  "company": "Merck",
  "stocks": [
      { "date": "2018,5,18", "stock": 85.00 },
      { "date": "2018,6,18", "stock": 82.76 },
      { "date": "2018,7,18", "stock": 85.50 },
      { "date": "2018,8,18", "stock": 90.02 },
      { "date": "2018,9,18", "stock": 87.44 },
      { "date": "2018,10,18", "stock": 92.64 },
      { "date": "2018,11,18", "stock": 96.92 },
      { "date": "2018,12,18", "stock": 94.26 },
      { "date": "2019,1,18", "stock": 90.50 },
      { "date": "2019,2,18", "stock": 97.06 },
      { "date": "2019,3,18", "stock": 100.30 },
      { "date": "2019,4,18", "stock": 93.78 },
  ]
}],},
{title:"Market Size",identifier:"Sales&Contribution",  type:"Market Size" },
{type:'Brand',title:"Social Media Metrics",identifier:"SocialMediaMetrics",values: [{ "date": "2019-05-01", "value": 0 },
{ "date": "2019-05-02", "value": 0 },
{ "date": "2019-05-03", "value": 61805 },
{ "date": "2019-05-04", "value": 84016 },
{ "date": "2019-05-05", "value": 59769 },
{ "date": "2019-05-06", "value": 44186 },
{ "date": "2019-05-07", "value": 39087 },
{ "date": "2019-05-08", "value": 32176 },
{ "date": "2019-05-09", "value": 23200 },
{ "date": "2019-05-10", "value": 23656 },
{ "date": "2019-05-11", "value": 18851 },
{ "date": "2019-05-12", "value": 18026 },
{ "date": "2019-05-13", "value": 15431 },
{ "date": "2019-05-14", "value": 15326 }],},
{title:'Competitor Publications',values:[{ "title": "Bayer Annual Reports", "link": "https://www.bayer.com/en/integrated-annual-reports.aspx" },
            { "title": "Bayer Quarterly Reports", "link": "https://www.bayer.com/en/Quarterly-Reports.aspx" }, { "title": "GSK announces NEJM publication of positive phase III study investigating mepolizumab in patients with Eosinophilic Granulomatosis with Polyangiitis (EGPA)", "link": "https://www.gsk.com/en-gb/media/press-releases/gsk-announces-nejm-publication-of-positive-phase-iii-study-investigating-mepolizumab-in-patients-with-eosinophilic-granulomatosis-with-polyangiitis-egpa/" },
            { "title": "Bayer Magazine", "link": "https://www.bayer.com/en/bayer-magazine.aspx" }, { "title": "Exploring the future", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/environment.html" }, { "title": "Fostering talent", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/culture-education.html" }, { "title": "Enriching lives", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/health.html" }, { "title": "An invisible enemy", "link": "http://reports.merckgroup.com/2017/cr-report/magazine/health.html" }, { "title": "Learning brought to life", "link": "http://reports.merckgroup.com/2017/cr-report/magazine/education-and-culture.html" }]},


{title:'License',values:[{
              "country": "US", "License": "License US", "LOE": "LOE US",
              "registration": "Registration US"
          },
          {
              "country": "CN", "License": "License CN", "LOE": "LOE CN",
              "registration": "Registration CN"
          },
          {
              "country": "JP", "License": "License JP", "LOE": "LOE JP",
              "registration": "Registration JP"
          }]
        },
{title:'Brand News', values:[{ "Positive": [] }, { "Negative": [] }]},
{type:"chart",title:"Pipeline",identifier:"Pipeline",values:[{ phaseName: "Pre-clinical", value: 20.5,"count": "140" },
{ phaseName: "Phase I", value: 29.7,"count": "145" },
{ phaseName: "Phase II", value: 33.5,"count": "105" },
{ phaseName: "Phase III", value: 7.9,"count": "39" },
{ phaseName: "Pre-registration", value: 4,"count": "2" }]},
{type:'Sales & Contribution"',title:'Sales & Contribution',identifier:"Sales&Contribution",values:[{
  "country": "US",
  "value": "70%"
},
{
  "country": "China",
  "value": "40%"
},
{
  "country": "JAPAN",
  "value": "30%"
}]},
{type:'chart',title:'Product Size',values:[]},

{title:"Patent Watch",identifier:"PatentWatch",values:[{ title: "Reconfigurable surgical microscope", applicationNumber: "US 20180275386 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Lingfeng Yu,Craig Bender", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180275386.php" },
{ title: "Salts and solid forms of a monobactam antibiotic", applicationNumber: "US 20180273522 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Eric Aubin,Anthony Casarez,Andreas Fisch,Zaixing Li,Mika Lindvall,Heinz Ernst Moser,Michael Mutz,Folkert Reck,Bernd Ulrich Riebesehl,Marc Schoenhentz,Vijay Sethuraman,Robert Lowell Simmons", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273522.php" },
{ title: "Pet imaging agents", applicationNumber: "US 20180273509 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: ["Yves Auberson,Emmanuelle Briard,Darren Le Grand,Berndt Oberhauser"], brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273509.php" },
{ title: "3d printing of an intraocular lens having smooth, curved surfaces", applicationNumber: "US 20180272598 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Brian Craig Cox,Fernando Enrique Ortiz,Austin Xavier Rodeheaver", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180272598.php" },
{ title: "Vitrectomy probe with rotational helical cutter", applicationNumber: "US 20180271705 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Salomon Valencia", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180271705.php" },
{ title: "Laser-markable and laser-weldable polymeric materials", applicationNumber: "US 20180273730 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Reinhold Rueger, Ulrich Quittmann", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273730.php" },
{ title: "Amine derivatives as potassium channel blockers", applicationNumber: "US 20180273476 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Andrew Harvey, Agnes Bombrun, Rachel Cooke, Isabelle Jeanclaude-etter, Nathan Kuchel, Jerome Molette, Jorgen Mould, Dharam Paul, Rajinder Singh, Cristina Donini, Veronique Colovray, Thomas Avery, Julia Crossman, Justin Ripper", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273476.php" },
{ title: "Perfluoroalkyl group-containing bismuth compounds as lewis acid catalysts", applicationNumber: "US 20180272325 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Berthold Theo Hoge, Sven Joerg-ruediger August Solyntjes, Anne Julia Bader, Nikolai Ignatiev", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180272325.php" },
{ title: "Triphenylene-based materials for organic electroluminescent devices", applicationNumber: "US 20180269411 A1", publishDate: "20-Sep-2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Dominik Joosten, Arne Buesing", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269411.php" },
{ title: "Electronic device", applicationNumber: "US 20180269406 A1", publishDate: "20-Sep-2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Amir Hossain Parham, Christof Pflumm, Anja Jatsch, Joachim Kaiser, Herwig Buchholz", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269406.php" }]  },
{title:"Product Information",identifier:"ProductInformation" ,values:[{ "title": "Product A", "TA": "Dummy TA", "molecule": "Molecule A", "ATC3": "Dummy ATC3", "indication": "Dummy indications" }] },
{title:'Clinical Trial',values:[]},
{title:"My Alerts",identifier:"alerts",values:[{ "title": ["New Report published for Elixir", "You have a new message in Inbox", "New Report published for Pradaxa", "CI Portal Update – New features!", "You have a new message in Inbox"] }]}

]
const styles = theme => ({
  marked: {
    color: '#34888C'
    
  },
  unmarked: {
    color: '#34888C'
    //color: 'gray',
  }

})
class ShowcaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      bookmark :false,
      bookmarkList : localStorage.getItem("bookmarkList")!=null ?JSON.parse(localStorage.getItem("bookmarkList")):[],
      currentBreakpoint: "lg",
      compactType: "horizontal",
      mounted: false,
      layouts: { },
      viewName:"",
      cards:[
        {title:"My Saved Searches",values: [{ "title": "Harvard Uni, last one year", "days": "1", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "PharmaNews", "days": "2", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "Phase 2-3 BASF pharma", "days": "12", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "FDA citations PSK9,all competitors", "days": "15", 'description': "title", 'value': "FDA", 'open': "1" }, { "title": "Contraception patents for Pfizer", "days": "20", 'description': "title", 'value': "Contraception", 'open': "1" }, { "title": "anticoagulants", "days": "25", 'description': "title", 'value': "anticoagulants", 'open': "1" }, { "title": "FDA citations PSK9,all competitors", "days": "28", 'description': "title", 'value': "FDA", 'open': "0" }]},
        {title:"Bookmarks",renderFlag: false, values: ["BI Publications, advanced PAH, Harvard Uni, last one year", "Contraception patents for Pfizer", "PharmaNews", "Phase 2-3 BASF pharma, anticoagulants", "FDA citations PSK9,all competitors"]},
        {title:'Alerts',values: ["New Report published for Elixir", "You have a new message in Inbox", "New Report published for Pradaxa", "CI Portal Update – New features!", "You have a new message in Inbox"]},
        {title:"Congress Planner",identifier:"CongressPlanner",values:[{
          "title": "18th Asia Pacific Ophthalmologists Annual Meeting", 
          "link": "https://ophthalmology.conferenceseries.com/asiapacific/", 
          "date": "July 29-30, 2019", "location": "Melbourne, Australia" 
        },
        {
          "title":"Oncology and Cancer Conferences","link":"https://www.conferenceseries.com/oncology-cancer-meetings",
          "date": "July 29-30, 2019", "location": "Melbourne, Australia"
        },
        {
          "title":"11th International Conference On Clinical And Cellular Immunology",
          "link":"https://immunology.immunologyconferences.org/",
          "date": "August 22-23, 2019", "location": "Vienna, Austria"
        },
        {
          "title":"5th World Congress On Cardiology And Cardiovascular Therapeutics",
          "link":"https://cardio.cardiologymeeting.com/",
          "date": "August 12-13, 2019", "location": "Tokyo, Japan"
        },
        {
          "title":"25th International Conference On Human Metabolic Health- Diabetes, Obesity & Metabolism",
          "link":"https://humanmetabolism.healthconferences.org/2019",
          "date":"March 21-22, 2019", "location":"Dubai,UAE"
        },
        { 
          "title": "Euro Optometry and Vision Science",
          "link": "https://eurooptometry.ophthalmologyconferences.com/",
          "date": "August 22-23, 2019", "location": "Vienna, Austria" 
        },
        { 
          "title": "VisionScience and Eye", 
          "link": "https://visionscience.ophthalmologyconferences.com/", 
          "date": "August 22-23, 2019", "location": "Vienna | Austria"
        },
        { 
          "title": "Ophthalmology",
           "link": "https://worldophthalmology.conferenceseries.com",
           "date": "September 19-20, 2019", "location": "Osaka,Japan" 
        }]},
        // {title:worklist: ["New Report published for Elixir", "You have a new message in Inbox", "New Report published for Pradaxa", "You have a new message in Inbox", "CI Portal Update – New features!"],
        // standardReports: ["Brand Activity Report - Monthly", "Competition Social Mentions - Monthly", "Brand coverage Index - Europe", "Brand coverage Index – Other Geo", "Xarelto Competition Trial Progress"],
        // sharedReports: ["Pradaxa France IC – ThomasMueller", "Lucentis Price drop in APAC ", "Avastin Global Sales"],
        // journals: [{ "title": "Overall Survival with Ribociclib plus Endocrine Therapy in Breast Cancer.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31166679", "brandName": "Novartis" }, { "title": "BioPATH: A Biomarker Study in Asian Patients with HER2+ Advanced Breast Cancer Treated with Lapatinib and Other Anti-HER2 Therapy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31163957", "brandName": "Novartis" }, { "title": "Evaluating Patient Experiences in Dry Eye Disease Through Social Media Listening Research.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31161531", "brandName": "Novartis" }, { "title": "Deceased organ and tissue donation after medical assistance in dying and other conscious and competent donors: guidance for policy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31160497", "brandName": "Novartis" }, { "title": "Effects of Dapagliflozin on Volume Status When Added to Renin-Angiotensin System Inhibitors.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31159350", "brandName": "Novartis" }],
        {title:'Regulatory Watch',values: [{ "title": "Macleods Pharmaceutical Limited Issues Voluntary Nationwide Consumer Level Recall of Losartan Potassium 50mg and Losartan Potassium/Hydrochlorothiazide	combination Tablets 50mg/12.5mg, 100mg/12.5mg and 100mg/25mg due to detection of NMBA (N-Nitroso-N­ Methyl-4-aminobutyric acid) Impurity.", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/macleods-pharmaceutical-limited-issues-voluntary-nationwide-consumer-level-recall-losartan-potassium", "source": "U.S. FDA", "pubDate": "06/26/2019" },
        { "title": "Infusion Options Inc. Issues Voluntary Nationwide Recall of All Lots of All Sterile Products Due to Lack of Assurance of Sterility", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/infusion-options-inc-issues-voluntary-nationwide-recall-all-lots-all-sterile-products-due-lack", "source": "U.S. FDA", "pubDate": "06/18/2019" },
        { "title": "RXQ Compounding, LLC Issues Voluntary Nationwide Recall of All Sterile Products within Expiry and Voluntarily Cessation of Production Due to the Lack of Sterility Process Assurance", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/rxq-compounding-llc-issues-voluntary-nationwide-recall-all-sterile-products-within-expiry-and", "source": "U.S. FDA", "pubDate": "06/18/2019" },
        { "title": "Premier Pharmacy Labs Issues Voluntary Nationwide Recall of all Unexpired Sterile Drug Product Lots Due to Lack of Sterility Assurance", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/premier-pharmacy-labs-issues-voluntary-nationwide-recall-all-unexpired-sterile-drug-product-lots-due", "source": "U.S. FDA", "pubDate": "06/18/2019" },
        { "title": "Teva Pharmaceuticals USA, Inc. Expands Voluntary Nationwide Recall of Losartan Potassium to 50 mg and 100 mg Tablets USP, Sold Exclusively to Golden State Medical Supply, Inc.", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/teva-pharmaceuticals-usa-inc-expands-voluntary-nationwide-recall-losartan-potassium-50-mg-and-100-mg", "source": "U.S. FDA", "pubDate": "06/11/2019" },
        { "title": "NOVIS PR LLC Issues Voluntary Nationwide Recall of PECGEN DMX Due to a Labeling Error", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/novis-pr-llc-issues-voluntary-nationwide-recall-pecgen-dmx-due-labeling-error", "source": "U.S. FDA", "pubDate": "05/29/2019" },
        { "title": "NOVIS PR LLC Emite Recogido Voluntario a Nivel Nacional de PECGEN DMX Debido a Error en Etiqueta", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/novis-pr-llc-emite-recogido-voluntario-nivel-nacional-de-pecgen-dmx-debido-error-en-etiqueta", "source": "U.S. FDA", "pubDate": "05/29/2019" },
        { "title": "Heritage Pharmaceuticals Inc. Issues Voluntary Nationwide Recall of Amikacin Sulfate Injection, USP 1gm/4 mL (250mg/mL) and Prochlorperazine Edisylate Injection, USP 10mg/2mL (5mg/mL) as a Result of a Sterility Test Failure", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/heritage-pharmaceuticals-inc-issues-voluntary-nationwide-recall-amikacin-sulfate-injection-usp-1gm4", "source": "U.S. FDA", "pubDate": "05/28/2019" },
        { "title": "Norbrook Laboratories Limited Recalls Veterinary Products to Provide Sterility Assurance", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/norbrook-laboratories-limited-recalls-veterinary-products-provide-sterility-assurance", "source": "U.S. FDA", "pubDate": "05/24/2019" },
        { "title": "Novartis Issues Voluntary Nationwide Recall of Promacta® 12.5 mg for Oral Suspension Due to Potential Peanut Contamination", "link": "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/novartis-issues-voluntary-nationwide-recall-promactar-125-mg-oral-suspension-due-potential-peanut", "source": "U.S. FDA", "pubDate": "05/12/2019" }],
      },
      {title:"My Alerts",identifier:"alerts",values:[{ "title": ["New Report published for Elixir", "You have a new message in Inbox", "New Report published for Pradaxa", "CI Portal Update – New features!", "You have a new message in Inbox"] }]},
        {title:'Press Release',values: [{ "title": "FDA approves new treatment for hypoactive sexual desire disorder in premenopausal women", "link": "https://www.fda.gov/news-events/press-announcements/fda-approves-new-treatment-hypoactive-sexual-desire-disorder-premenopausal-women", "source": "U.S. FDA", "pubDate": "06/21/2019" },
        { "title": "FDA expands approval of treatment for cystic fibrosis to include patients ages 6 and older", "link": "https://www.fda.gov/news-events/press-announcements/fda-expands-approval-treatment-cystic-fibrosis-include-patients-ages-6-and-older", "source": "U.S. FDA", "pubDate": "06/21/2019" },
        { "title": "Statement on agency’s efforts to increase transparency in medical device reporting", "link": "https://www.fda.gov/news-events/press-announcements/statement-agencys-efforts-increase-transparency-medical-device-reporting", "source": "U.S. FDA", "pubDate": "06/21/2019" },
        { "title": "Statement on the FDA’s benefit-risk framework for evaluating opioid analgesics", "link": "https://www.fda.gov/news-events/press-announcements/statement-fdas-benefit-risk-framework-evaluating-opioid-analgesics", "source": "U.S. FDA", "pubDate": "06/20/2019" },
        { "title": "Statement on a new effort to improve transparency and predictability for generic drug applicants to help increase timely access to high-quality, lower cost generic drugs", "link": "https://www.fda.gov/news-events/press-announcements/statement-new-effort-improve-transparency-and-predictability-generic-drug-applicants-help-increase", "source": "U.S. FDA", "pubDate": "06/18/2019" },
        { "title": "Statement on new guidance for the declaration of added sugars on food labels for single-ingredient sugars and syrups and certain cranberry products", "link": "https://www.fda.gov/news-events/press-announcements/statement-new-guidance-declaration-added-sugars-food-labels-single-ingredient-sugars-and-syrups-and", "source": "U.S. FDA", "pubDate": "06/18/2019" },
        { "title": "FDA approves new treatment for pediatric patients with type 2 diabetes", "link": "https://www.fda.gov/news-events/press-announcements/fda-approves-new-treatment-pediatric-patients-type-2-diabetes", "source": "U.S. FDA", "pubDate": "06/17/2019" },
        { "title": "Federal officials seize adulterated dietary supplements from Life Rising Corporation due to poor manufacturing practices", "link": "https://www.fda.gov/news-events/press-announcements/federal-officials-seize-adulterated-dietary-supplements-life-rising-corporation-due-poor", "source": "U.S. FDA", "pubDate": "06/14/2019" },
        { "title": "Statement on FDA’s scientific work to understand per- and polyfluoroalkyl substances (PFAS) in food, and findings from recent FDA surveys", "link": "https://www.fda.gov/news-events/press-announcements/statement-fdas-scientific-work-understand-and-polyfluoroalkyl-substances-pfas-food-and-findings", "source": "U.S. FDA", "pubDate": "06/11/2019" },
        { "title": "FDA finalizes guidance for premarket tobacco product applications for electronic nicotine delivery systems as part of commitment to continuing a strong oversight of e-cigarettes", "link": "https://www.fda.gov/news-events/press-announcements/fda-finalizes-guidance-premarket-tobacco-product-applications-electronic-nicotine-delivery-systems", "source": "U.S. FDA", "pubDate": "06/11/2019" }],
    },
       {title:'Person Watch',values: [],},
       {title:'Industry News',values: [],},
       {title:'Brand News', values:[{ "Positive": [] }, { "Negative": [] }]},
       {title:"Patent Watch",identifier:"PatentWatch",values:[{ title: "Reconfigurable surgical microscope", applicationNumber: "US 20180275386 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Lingfeng Yu,Craig Bender", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180275386.php" },
            { title: "Salts and solid forms of a monobactam antibiotic", applicationNumber: "US 20180273522 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Eric Aubin,Anthony Casarez,Andreas Fisch,Zaixing Li,Mika Lindvall,Heinz Ernst Moser,Michael Mutz,Folkert Reck,Bernd Ulrich Riebesehl,Marc Schoenhentz,Vijay Sethuraman,Robert Lowell Simmons", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273522.php" },
            { title: "Pet imaging agents", applicationNumber: "US 20180273509 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: ["Yves Auberson,Emmanuelle Briard,Darren Le Grand,Berndt Oberhauser"], brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273509.php" },
            { title: "3d printing of an intraocular lens having smooth, curved surfaces", applicationNumber: "US 20180272598 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Brian Craig Cox,Fernando Enrique Ortiz,Austin Xavier Rodeheaver", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180272598.php" },
            { title: "Vitrectomy probe with rotational helical cutter", applicationNumber: "US 20180271705 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Salomon Valencia", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180271705.php" },
            { title: "Laser-markable and laser-weldable polymeric materials", applicationNumber: "US 20180273730 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Reinhold Rueger, Ulrich Quittmann", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273730.php" },
            { title: "Amine derivatives as potassium channel blockers", applicationNumber: "US 20180273476 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Andrew Harvey, Agnes Bombrun, Rachel Cooke, Isabelle Jeanclaude-etter, Nathan Kuchel, Jerome Molette, Jorgen Mould, Dharam Paul, Rajinder Singh, Cristina Donini, Veronique Colovray, Thomas Avery, Julia Crossman, Justin Ripper", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273476.php" },
            { title: "Perfluoroalkyl group-containing bismuth compounds as lewis acid catalysts", applicationNumber: "US 20180272325 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Berthold Theo Hoge, Sven Joerg-ruediger August Solyntjes, Anne Julia Bader, Nikolai Ignatiev", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180272325.php" },
            { title: "Triphenylene-based materials for organic electroluminescent devices", applicationNumber: "US 20180269411 A1", publishDate: "20-Sep-2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Dominik Joosten, Arne Buesing", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269411.php" },
            { title: "Electronic device", applicationNumber: "US 20180269406 A1", publishDate: "20-Sep-2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Amir Hossain Parham, Christof Pflumm, Anja Jatsch, Joachim Kaiser, Herwig Buchholz", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269406.php" }]  },
            {title:"Product Information",identifier:"ProductInformation" ,values:[{ "title": "Product A", "TA": "Dummy TA", "molecule": "Molecule A", "ATC3": "Dummy ATC3", "indication": "Dummy indications" }] },
       {type:"chart",title:"Pipeline",identifier:"Pipeline",values:[{ phaseName: "Pre-clinical", value: 20.5,"count": "140" },
       { phaseName: "Phase I", value: 29.7,"count": "145" },
       { phaseName: "Phase II", value: 33.5,"count": "105" },
       { phaseName: "Phase III", value: 7.9,"count": "39" },
       { phaseName: "Pre-registration", value: 4,"count": "2" }]},
       {type:"chart",title:"Launch Estimates",identifier:"LaunchEstimate" ,values:[]},
       {title:"Journal Watch",identifier:"JournalWatch",values:[{ "title": "Overall Survival with Ribociclib plus Endocrine Therapy in Breast Cancer.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31166679", "brandName": "Novartis" }, { "title": "BioPATH: A Biomarker Study in Asian Patients with HER2+ Advanced Breast Cancer Treated with Lapatinib and Other Anti-HER2 Therapy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31163957", "brandName": "Novartis" }, { "title": "Evaluating Patient Experiences in Dry Eye Disease Through Social Media Listening Research.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31161531", "brandName": "Novartis" }, { "title": "Deceased organ and tissue donation after medical assistance in dying and other conscious and competent donors: guidance for policy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31160497", "brandName": "Novartis" }, { "title": "Effects of Dapagliflozin on Volume Status When Added to Renin-Angiotensin System Inhibitors.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31159350", "brandName": "Novartis" }]},
       {type:'chart',title:'Stock Chart',identifier:"StockChart",values: [{
        "company": "Novartis",
        "stocks": [
            { "date": "2018,5,18", "stock": 68.07 },
            { "date": "2018,6,18", "stock": 65.17 },
            { "date": "2018,7,18", "stock": 71.30 },
            { "date": "2018,8,18", "stock": 73.27 },
            { "date": "2018,9,18", "stock": 72.26 },
            { "date": "2018,10,18", "stock": 75.92 },
            { "date": "2018,11,18", "stock": 77.17 },
            { "date": "2018,12,18", "stock": 74.79 },
            { "date": "2019,1,18", "stock": 78.50 },
            { "date": "2019,2,18", "stock": 79.59 },
            { "date": "2019,3,18", "stock": 82.32 },
            { "date": "2019,4,18", "stock": 77.03 },
        ]
      },
      {
        "company": "Bayer",
        "stocks": [
            { "date":"2018,5,18","stock":102.70 },
            { "date":"2018,6,18","stock":98.46 },
            { "date":"2018,7,18","stock":92.96 },
            { "date":"2018,8,18","stock":80.78 },
            { "date":"2018,9,18","stock":73.30 },
            { "date":"2018,10,18","stock":78.42 },
            { "date":"2018,11,18","stock":62.30 },
            { "date":"2018,12,18","stock":63.41 },
            { "date":"2019,1,18","stock":66.50 },
            { "date":"2019,2,18","stock":67.80 },
            { "date":"2019,3,18","stock":69.70 },
            { "date":"2019,4,18","stock":61.16 },
        ]
      },
      {
        "company": "Pfizer",
        "stocks": [
            { "date": "2018,5,18", "stock": 30.27 },
            { "date": "2018,6,18", "stock": 31.00 },
            { "date": "2018,7,18", "stock": 32.28 },
            { "date": "2018,8,18", "stock": 37.04 },
            { "date": "2018,9,18", "stock": 37.25 },
            { "date": "2018,10,18", "stock": 38.58 },
            { "date": "2018,11,18", "stock": 38.03 },
            { "date": "2018,12,18", "stock": 37.37 },
            { "date": "2019,1,18", "stock": 37.41 },
            { "date": "2019,2,18", "stock": 37.58 },
            { "date": "2019,3,18", "stock": 36.71 },
            { "date": "2019,4,18", "stock": 34.90 },
        ]
      },
      {
        "company": "Merck",
        "stocks": [
            { "date": "2018,5,18", "stock": 85.00 },
            { "date": "2018,6,18", "stock": 82.76 },
            { "date": "2018,7,18", "stock": 85.50 },
            { "date": "2018,8,18", "stock": 90.02 },
            { "date": "2018,9,18", "stock": 87.44 },
            { "date": "2018,10,18", "stock": 92.64 },
            { "date": "2018,11,18", "stock": 96.92 },
            { "date": "2018,12,18", "stock": 94.26 },
            { "date": "2019,1,18", "stock": 90.50 },
            { "date": "2019,2,18", "stock": 97.06 },
            { "date": "2019,3,18", "stock": 100.30 },
            { "date": "2019,4,18", "stock": 93.78 },
        ]
      }],},
      {title:"Therapeutic Area Watch",identifier:"TherapeuticAreaWatch" ,values:[]},
      {title:"Market Size",identifier:"Sales&Contribution",  type:"Market Size" },
      {type:'Brand',title:"Social Media Metrics",identifier:"SocialMediaMetrics",values: [{ "date": "2019-05-01", "value": 0 },
      { "date": "2019-05-02", "value": 0 },
      { "date": "2019-05-03", "value": 61805 },
      { "date": "2019-05-04", "value": 84016 },
      { "date": "2019-05-05", "value": 59769 },
      { "date": "2019-05-06", "value": 44186 },
      { "date": "2019-05-07", "value": 39087 },
      { "date": "2019-05-08", "value": 32176 },
      { "date": "2019-05-09", "value": 23200 },
      { "date": "2019-05-10", "value": 23656 },
      { "date": "2019-05-11", "value": 18851 },
      { "date": "2019-05-12", "value": 18026 },
      { "date": "2019-05-13", "value": 15431 },
      { "date": "2019-05-14", "value": 15326 }],},
      {title:'Competitor Publications',values:[{ "title": "Bayer Annual Reports", "link": "https://www.bayer.com/en/integrated-annual-reports.aspx" },
                  { "title": "Bayer Quarterly Reports", "link": "https://www.bayer.com/en/Quarterly-Reports.aspx" }, { "title": "GSK announces NEJM publication of positive phase III study investigating mepolizumab in patients with Eosinophilic Granulomatosis with Polyangiitis (EGPA)", "link": "https://www.gsk.com/en-gb/media/press-releases/gsk-announces-nejm-publication-of-positive-phase-iii-study-investigating-mepolizumab-in-patients-with-eosinophilic-granulomatosis-with-polyangiitis-egpa/" },
                  { "title": "Bayer Magazine", "link": "https://www.bayer.com/en/bayer-magazine.aspx" }, { "title": "Exploring the future", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/environment.html" }, { "title": "Fostering talent", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/culture-education.html" }, { "title": "Enriching lives", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/health.html" }, { "title": "An invisible enemy", "link": "http://reports.merckgroup.com/2017/cr-report/magazine/health.html" }, { "title": "Learning brought to life", "link": "http://reports.merckgroup.com/2017/cr-report/magazine/education-and-culture.html" }]},
      
        // // newsFeed: [],
        // patentList: [{ title: "Reconfigurable surgical microscope", applicationNumber: "US 20180275386 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Lingfeng Yu,Craig Bender", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180275386.php" },
        // { title: "Salts and solid forms of a monobactam antibiotic", applicationNumber: "US 20180273522 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Eric Aubin,Anthony Casarez,Andreas Fisch,Zaixing Li,Mika Lindvall,Heinz Ernst Moser,Michael Mutz,Folkert Reck,Bernd Ulrich Riebesehl,Marc Schoenhentz,Vijay Sethuraman,Robert Lowell Simmons", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273522.php" },
        // { title: "Pet imaging agents", applicationNumber: "US 20180273509 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: ["Yves Auberson,Emmanuelle Briard,Darren Le Grand,Berndt Oberhauser"], brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273509.php" },
        // { title: "3d printing of an intraocular lens having smooth, curved surfaces", applicationNumber: "US 20180272598 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Brian Craig Cox,Fernando Enrique Ortiz,Austin Xavier Rodeheaver", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180272598.php" },
        // { title: "Vitrectomy probe with rotational helical cutter", applicationNumber: "US 20180271705 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Salomon Valencia", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180271705.php" },
        // { title: "Laser-markable and laser-weldable polymeric materials", applicationNumber: "US 20180273730 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Reinhold Rueger, Ulrich Quittmann", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273730.php" },
        // { title: "Amine derivatives as potassium channel blockers", applicationNumber: "US 20180273476 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Andrew Harvey, Agnes Bombrun, Rachel Cooke, Isabelle Jeanclaude-etter, Nathan Kuchel, Jerome Molette, Jorgen Mould, Dharam Paul, Rajinder Singh, Cristina Donini, Veronique Colovray, Thomas Avery, Julia Crossman, Justin Ripper", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273476.php" },
        // { title: "Perfluoroalkyl group-containing bismuth compounds as lewis acid catalysts", applicationNumber: "US 20180272325 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Berthold Theo Hoge, Sven Joerg-ruediger August Solyntjes, Anne Julia Bader, Nikolai Ignatiev", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180272325.php" },
        // { title: "Triphenylene-based materials for organic electroluminescent devices", applicationNumber: "US 20180269411 A1", publishDate: "09/20/2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Dominik Joosten, Arne Buesing", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269411.php" },
        // { title: "Electronic device", applicationNumber: "US 20180269406 A1", publishDate: "09/20/2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Amir Hossain Parham, Christof Pflumm, Anja Jatsch, Joachim Kaiser, Herwig Buchholz", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269406.php" }
        //     // {title:"",applicationNumber:"",publishDate:"",upstoClass:"",inventors:"",brandName:"",link:""}]
        // ]
      ]
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.toggleBookmark= this.toggleBookmark.bind(this);
    //this.onNewLayout = this.onNewLayout.bind(this);
    //this.handleView=this.handleView.bind(this);
      }

  componentDidMount() {
    this.setState({ mounted: true});
  }
  

  static getDerivedStateFromProps(nexProps,prevState){
   // console.log("In componentWillReceiveProps of Grid.js");
    cards.length = 0;
    var newList=[];
    var layout=null;
    var layoutTemp=[];
    if(nexProps.viewName!=undefined && localStorage.getItem(nexProps.viewName.trim())!=null){
      var t=localStorage.getItem(nexProps.viewName.trim())
      if(localStorage.getItem(nexProps.viewName.trim()+"_layout") != null){
        layoutTemp=JSON.parse(localStorage.getItem(nexProps.viewName.trim()+"_layout"))
        if(layoutTemp.length!=0){
          layout=JSON.parse(localStorage.getItem(nexProps.viewName.trim()+"_layout"))
                 // alert(JSON.stringify(layout))
        }
      }
    //  console.log("localstorage layout",layout)
      newList=t.split(",")
    }
    const resultedarray = newList.map(item=>{
      const ResultList = [];
      if(item.length>0){
         ResultList.push(item)
      }
      return ResultList;
    })
    resultedarray.map(item=>{
     // console.log(item,'checking master list')
      item.map((item,i)=>{
        Maincards.map(value=>{
          if (value.title===item){
            cards.push(value)
            selectedViews.push(value.title)
        //    console.log("value--",value)
          }
        })
      
        
      })
      
    })
    if(layout != null){
     // console.log("ly--",i,layout)
      cards.map( function(item, i) {
       // alert(JSON.stringify(layout[i]))
      cards[i].layout=layout[i]
      })
      }
  console.log("cards",cards)
      var bk=prevState.bookmark;
      var bookmarkGet=localStorage.getItem("bookmarkList")!=null ?JSON.parse(localStorage.getItem("bookmarkList")) :[];
      bookmarkGet.map((item,index) =>{
       // console.log()
          bk=item==nexProps.viewName ? true :false;
      })
      console.log("bk",bk)
 
  return{
    bookmarkList : localStorage.getItem("bookmarkList")!=null ?JSON.parse(localStorage.getItem("bookmarkList")) :prevState.bookmarkList,
    bookmark :bk
  }
}
  

  generateDOM() {
    console.log('is dom available', cards)
    var viewName=this.props.viewName;
     return cards.map(function(l, i) {
       console.log(i,cards[i].layout)
               return (
        
        <div key={viewName+i+l.title} data-grid={cards[i].layout}>
       {l.type?
        <CardWithChartComponent title={l.title} viewSource="home" chartArray={l.values} identifier={l.identifier} />:
        <CardWithinCardComponent cardArray={l.values} title={l.title} panelHeading={l.title} identifier={l.identifier}/>
       }
        {/* test */}
        </div>



        // <div key={i} className={""}>
          
        //     <span className="text">{l}</span>
        // </div>
      );
    });
  }

  
  handleSave = (props)=>{
    // const ResultList =[]
    cards.length = 0;
   console.log(props, 'checking whats coming')
    var List = [...Object.values(props)]
    localStorage.setItem(this.props.viewName,List);
      
   // console.log( 'handlesavelist',List)
   const resultedarray = List.map(item=>{
      const ResultList = [];
      if(item.length>0){
         ResultList.push(...item)
      }
      return ResultList;
    })
    resultedarray.map(item=>{
      //console.log(item,'checking master list')
      item.map(item=>
        Maincards.map(value=>{
          console.log("title",value.title,"||",item)
          if (value.title===item){
            cards.push(value)
            console.log("value--",value)
          }
        })
      )
      
    })
    // console.log("after handle save layout",generateLayout())
    // this.setState({layouts: { lg: generateLayout() }},()=> localStorage.setItem(this.props.viewName+"_layout",JSON.stringify(this.state.layouts)))
   
    // console.log("after handle save layout",generateLayout())
    var w=4;
    var h=7;
    var getLayout=localStorage.getItem(this.props.viewName+"_layout");
    var setLayout=[];
    cards.map( function(item, i) {
      var y = Math.ceil(Math.random() * 4) + 1;
      var ly={}
      //check if the array from ls in not emoty
      if( getLayout != null){
        var layoutJSON=JSON.parse(getLayout);
        // check if layout coming from localstorage is not emoty
        if(layoutJSON.length !=0){
          // check if length of ls array and cards array match else render 4*7 card in else
        if(layoutJSON.length < List.length){
          ly=layoutJSON[i]
          console.log("in if",ly)
        }else{
          ly= {
            x: Math.floor((Math.random(0, 5) * 2) % 12),
            // x: i+2,
            y: Math.floor(i / 6) * y,
            // y: 0,
            w: 4,
            h: 7,
            i: i.toString()
            // static: Math.random() < 0.05
          }
      }
        }else{
          ly= {
            x: Math.floor((Math.random(0, 5) * 2) % 12),
            // x: i+2,
            y: Math.floor(i / 6) * y,
            // y: 0,
            w: 4,
            h: 7,
            i: i.toString()
            // static: Math.random() < 0.05
          }
      }
     } else{
      ly= {
          x: Math.floor((Math.random(0, 5) * 2) % 12),
          // x: i+2,
          y: Math.floor(i / 6) * y,
          // y: 0,
          w: 4,
          h: 7,
          i: i.toString()
          // static: Math.random() < 0.05
        };
    }
  
      cards[i].layout=ly;
      setLayout.push(ly)
      
    });
    localStorage.setItem(this.props.viewName+"_layout",JSON.stringify(setLayout))
    console.log("cards post map",cards)
    this.handleClose();

      }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onCompactTypeChange() {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
          ? null
          : "horizontal";
    this.setState({ compactType });
  }

  onLayoutChange(layout) {
    console.log("layout",layout)
    localStorage.setItem(this.props.viewName+"_layout",JSON.stringify(layout))
    this.setState({ layouts :layout})
    // if(localStorage.getItem(this.props.viewName+"_layout")!=null){
    //   localStorage.setItem(this.props.viewName+"_layout",JSON.stringify(layout))
    // }
  }

  // onNewLayout() {
  //   this.setState({
  //     layouts: { lg: generateLayout() }
  //   });
  // }
      toggleBookmark(val){
        console.log("val",val)
      var tempBookmarkList=this.state.bookmarkList;
      tempBookmarkList=!val?tempBookmarkList.push(this.props.viewName):tempBookmarkList.indexOf(this.props.viewName) > -1 ?tempBookmarkList.splice(tempBookmarkList.indexOf(this.props.viewName) ,1)
      :this.state.bookmarkList;

      console.log("bookmarkList",this.state.bookmarkList)
      this.setState({bookmarkList:tempBookmarkList})
      console.log("bookmarkList",JSON.stringify(this.state.bookmarkList))
      localStorage.setItem("bookmarkList",JSON.stringify(this.state.bookmarkList))
  }


  render() {
    const { classes } = this.props;
    console.log("in render layout",this.state.bookmarkList)
    console.log("state of bookmark in render",this.state.bookmark)
    return (
      <div>
        
        
        <div className='seetingsIcon' >
          <IconButton title = 'Customize' onClick = {this.handleOpen}>
              < Settings />
          </IconButton>
        </div>
        <div className="myViewHeading">
            <h1>{this.props.viewName}
            {this.state.bookmarkList.length>0 && this.state.bookmarkList.indexOf(this.props.viewName)> -1 ?
            <IconButton key={this.props.viewName} className={classes.marked} onClick={this.toggleBookmark.bind(this,true)}>
            <Bookmark />
          </IconButton>
          :
          <Tooltip title="Bookmark">
          <IconButton key={this.props.viewName} className={classes.unmarked} onClick={this.toggleBookmark.bind(this,false)}>
          <BookmarkBorder />
        </IconButton>
        </Tooltip>
            }
          </h1>
            
          </div>
        <ResponsiveReactGridLayout
          {...this.props}
        //  layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
        < Setting open={this.state.open} handleClose={this.handleClose} handleSave={this.handleSave} selectedViews={selectedViews}/>
      {selectedViews=[]}
      </div>
    );
  }
}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};



ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function() {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
 // initialLayout: generateLayout()
};

// function generateLayout() {
//   console.log(cards ,"when cards are available")
//   return cards.map( function(item, i) {
//     var y = Math.ceil(Math.random() * 4) + 1;
//     return {
//       x: Math.floor((Math.random(0, 5) * 2) % 12),
//       // x: i+2,
//       y: Math.floor(i / 6) * y,
//       // y: 0,
//       w: 4,
//       h: 7,
//       i: i.toString(),
//       minW:4,
//       minH:7
//       // static: Math.random() < 0.05
//     };
//   });
// }

ShowcaseLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log("In mapStateToProps ", state.CIPReducer.myViewName);
  return {
      myViewName :state.CIPReducer.myViewName
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(ShowcaseLayout));
