import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFormat from "../../../_helpers/dateFormat";
import CardWithTabsComponent from '../GenericComponents/CardComponent/CardWithTabsComponent';
import CardWithinCardComponent from '../GenericComponents/CardComponent/CardWithinCardComponent';
import CardWithChartComponent from '../GenericComponents/CardComponent/CardWithChartComponent';
import { SavesearchKeyword, setCurrentView } from '../../../Actions/ActionSearchFunction';
import * as types from '../../../Actions/ActionTypes';

let Parser = require('rss-parser');
let parser = new Parser();
class MyCIHomeGeneric extends Component {
    constructor() {
        super();
        this.state = {

            searches: [{ "title": "Harvard Uni, last one year", "days": "1", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "PharmaNews", "days": "2", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "Phase 2-3 BASF pharma", "days": "12", 'description': "title", 'value': "Harvard", 'open': "1" }, { "title": "FDA citations PSK9,all competitors", "days": "15", 'description': "title", 'value': "FDA", 'open': "1" }, { "title": "Contraception patents for Pfizer", "days": "20", 'description': "title", 'value': "Contraception", 'open': "1" }, { "title": "anticoagulants", "days": "25", 'description': "title", 'value': "anticoagulants", 'open': "1" }, { "title": "FDA citations PSK9,all competitors", "days": "28", 'description': "title", 'value': "FDA", 'open': "0" }],
            renderFlag: false, bookmarks: ["BI Publications, advanced PAH, Harvard Uni, last one year", "Contraception patents for Pfizer", "PharmaNews", "Phase 2-3 BASF pharma, anticoagulants", "FDA citations PSK9,all competitors"],
            alerts: [{ "title": ["New Report published for Elixir", "You have a new message in Inbox", "New Report published for Pradaxa", "CI Portal Update – New features!", "You have a new message in Inbox"] }],
            worklist: ["New Report published for Elixir", "You have a new message in Inbox", "New Report published for Pradaxa", "You have a new message in Inbox", "CI Portal Update – New features!"],
            standardReports: [{ "title": ["Brand Activity Report - Monthly", "Competition Social Mentions - Monthly", "Brand coverage Index - Europe", "Brand coverage Index – Other Geo", "Xarelto Competition Trial Progress"] }],
            sharedReports: ["Pradaxa France IC – ThomasMueller", "Lucentis Price drop in APAC ", "Avastin Global Sales"],
            journals: [{ "title": "Overall Survival with Ribociclib plus Endocrine Therapy in Breast Cancer.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31166679", "brandName": "Novartis" }, { "title": "BioPATH: A Biomarker Study in Asian Patients with HER2+ Advanced Breast Cancer Treated with Lapatinib and Other Anti-HER2 Therapy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31163957", "brandName": "Novartis" }, { "title": "Evaluating Patient Experiences in Dry Eye Disease Through Social Media Listening Research.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31161531", "brandName": "Novartis" }, { "title": "Deceased organ and tissue donation after medical assistance in dying and other conscious and competent donors: guidance for policy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31160497", "brandName": "Novartis" }, { "title": "Effects of Dapagliflozin on Volume Status When Added to Renin-Angiotensin System Inhibitors.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31159350", "brandName": "Novartis" }],
            regulatoryWatch: [{ "title": "Statement calling on all sectors of the papaya industry to improve practices to better protect consumers", "link": "https://www.fda.gov/news-events/press-announcements/statement-calling-all-sectors-papaya-industry-improve-practices-better-protect-consumers", "source": "U.S. FDA", "pubDate": "26-Aug-2019" },
            { "title": "FDA warns company for putting consumers at risk with drug manufacturing data integrity violations", "link": "https://www.fda.gov/news-events/press-announcements/fda-warns-company-putting-consumers-risk-drug-manufacturing-data-integrity-violations", "source": "U.S. FDA", "pubDate": "20-Aug-2019" },
            { "title": "Statement on new results demonstrating continued success of the agency’s youth smoking prevention efforts and significant public health cost savings", "link": "https://www.fda.gov/news-events/press-announcements/statement-new-results-demonstrating-continued-success-agencys-youth-smoking-prevention-efforts-and", "source": "U.S. FDA", "pubDate": "20-Aug-2019" },
            { "title": "FDA approves new antibiotic to treat community-acquired bacterial pneumonia", "link": "https://www.fda.gov/news-events/press-announcements/fda-approves-new-antibiotic-treat-community-acquired-bacterial-pneumonia", "source": "U.S. FDA", "pubDate": "19-Aug-2019" },
            { "title": "FDA approves new device to improve symptoms in patients with advanced heart failure", "link": "https://www.fda.gov/news-events/press-announcements/fda-approves-new-device-improve-symptoms-patients-advanced-heart-failure", "source": "U.S. FDA", "pubDate": "16-Aug-2019" },
            { "title": "FDA expands indication for several transcatheter heart valves to patients at low risk for death or major complications associated with open-heart surgery", "link": "https://www.fda.gov/news-events/press-announcements/fda-expands-indication-several-transcatheter-heart-valves-patients-low-risk-death-or-major", "source": "U.S. FDA", "pubDate": "16-Aug-2019" },
            { "title": "FDA approves first of its kind device to treat pediatric patients with progressive idiopathic scoliosis", "link": "https://www.fda.gov/news-events/press-announcements/fda-approves-first-its-kind-device-treat-pediatric-patients-progressive-idiopathic-scoliosis", "source": "U.S. FDA", "pubDate": "16-Aug-2019" }],
            pressRelease: [{ "title": "'Voices from TB’, a compilation of Patient stories on MDR-TB launched", "link": "https://www.lillyindia.co.in/_Assets/pdf/Voices-from-TB-Final-Press-Release.pdf", "source": "Lilly", "pubDate": "20-Aug-2019" },
            { "title": "GSK announces positive headline results from the pivotal DREAMM-2 study for multiple myeloma", "link": "https://www.gsk.com/en-gb/media/press-releases/gsk-announces-positive-headline-results-from-the-pivotal-dreamm-2-study-for-multiple-myeloma/", "source": "GSK", "pubDate": "23-Aug-2019" },
            { "title": "GSK submits first regulatory application for daprodustat in Japan for patients with renal anaemia due to chronic kidney disease", "link": "https://www.gsk.com/en-gb/media/press-releases/gsk-submits-first-regulatory-application-for-daprodustat-in-japan-for-patients-with-renal-anaemia-due-to-chronic-kidney-disease/", "source": "GSK", "pubDate": "21-Aug-2019" },
            { "title": "ViiV Healthcare reports positive phase III study results of investigational, long-acting, injectable HIV-treatment regimen administered every two months", "link": "https://www.gsk.com/en-gb/media/press-releases/viiv-healthcare-reports-positive-phase-iii-study-results-of-investigational-long-acting-injectable-hiv-treatment-regimen-administered-every-two-months/", "source": "GSK", "pubDate": "22-Aug-2019" },
            { "title": "Lilly and Disney publishing releases a collection of custom made books for children with type 1 diabetes", "link": "https://www.lillyindia.co.in/_Assets/pdf/Press-Release_-Disney-Book.pdf", "source": "Lilly", "pubDate": "21-Aug-2019" },
            { "title": "4th National Summit organized by CII and Lilly releases white paper on Best practices in Diabetes Management	", "link": "https://www.lillyindia.co.in/_Assets/pdf/2016-NCD-Summit-Press-Release_October-7_Final.pdf", "source": "Lilly", "pubDate": "21-Aug-2019" }],
            personWatch: [],
            newsFeed: [],
            patentList: [{ title: "Reconfigurable surgical microscope", applicationNumber: "US 20180275386 A1", publishDate: "27-Aug-2018", upstoClass: "N/A", inventors: "Lingfeng Yu,Craig Bender", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180275386.php" },
            { title: "Salts and solid forms of a monobactam antibiotic", applicationNumber: "US 20180273522 A1", publishDate: "27-Aug-2018", upstoClass: "N/A", inventors: "Eric Aubin,Anthony Casarez,Andreas Fisch,Zaixing Li,Mika Lindvall,Heinz Ernst Moser,Michael Mutz,Folkert Reck,Bernd Ulrich Riebesehl,Marc Schoenhentz,Vijay Sethuraman,Robert Lowell Simmons", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273522.php" },
            { title: "Pet imaging agents", applicationNumber: "US 20180273509 A1", publishDate: "27-Aug-2018", upstoClass: "N/A", inventors: ["Yves Auberson,Emmanuelle Briard,Darren Le Grand,Berndt Oberhauser"], brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273509.php" },
            { title: "3d printing of an intraocular lens having smooth, curved surfaces", applicationNumber: "US 20180272598 A1", publishDate: "27-Aug-2018", upstoClass: "N/A", inventors: "Brian Craig Cox,Fernando Enrique Ortiz,Austin Xavier Rodeheaver", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180272598.php" },
            { title: "Vitrectomy probe with rotational helical cutter", applicationNumber: "US 20180271705 A1", publishDate: "27-Aug-2018", upstoClass: "N/A", inventors: "Salomon Valencia", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180271705.php" },
            { title: "Laser-markable and laser-weldable polymeric materials", applicationNumber: "US 20180273730 A1", publishDate: "27-Aug-2018", upstoClass: "N/A", inventors: "Reinhold Rueger, Ulrich Quittmann", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273730.php" },
            { title: "Amine derivatives as potassium channel blockers", applicationNumber: "US 20180273476 A1", publishDate: "27-Aug-2018", upstoClass: "N/A", inventors: "Andrew Harvey, Agnes Bombrun, Rachel Cooke, Isabelle Jeanclaude-etter, Nathan Kuchel, Jerome Molette, Jorgen Mould, Dharam Paul, Rajinder Singh, Cristina Donini, Veronique Colovray, Thomas Avery, Julia Crossman, Justin Ripper", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273476.php" },
            { title: "Perfluoroalkyl group-containing bismuth compounds as lewis acid catalysts", applicationNumber: "US 20180272325 A1", publishDate: "27-Aug-2018", upstoClass: "N/A", inventors: "Berthold Theo Hoge, Sven Joerg-ruediger August Solyntjes, Anne Julia Bader, Nikolai Ignatiev", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180272325.php" },
            { title: "Triphenylene-based materials for organic electroluminescent devices", applicationNumber: "US 20180269411 A1", publishDate: "20-Sep-2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Dominik Joosten, Arne Buesing", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269411.php" },
            { title: "Electronic device", applicationNumber: "US 20180269406 A1", publishDate: "20-Sep-2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Amir Hossain Parham, Christof Pflumm, Anja Jatsch, Joachim Kaiser, Herwig Buchholz", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269406.php" }
                // {title:"",applicationNumber:"",publishDate:"",upstoClass:"",inventors:"",brandName:"",link:""}]
            ]
            // pipelineWatch: [{ "title": "Affimed Announces Clinical Data Update on Lead Product Candidate AFM13 in CD30+ lymphoma at ICML 2019", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062471609/Antibodies/Affimed-Announces-Clinical-Data-Update-on-Lead-Product-Candidate-AFM13-in-CD30-lymphoma-at-ICML-2019.html", "pubDate": "06/24/2019" },
            // { "title": "Correvio Resubmits Brinavess (Vernakalant) New Drug Application to U.S. FDA for the Treatment of Patients with Recent Onset Atrial Fibrillation", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062471608/Small-Molecules/Correvio-Resubmits-Brinavess-Vernakalant-New-Drug-Application-to-U.S.-FDA-for-the-Treatment-of-Patients-with-Recent-Onset-Atrial-Fibrillation.html", "pubDate": "06/24/2019" },
            // { "title": "Prestige BioPharma Reports Positive Top-Line Phase III Results for Tuznue® (Trastuzumab Biosimilar)", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062471606/Antibodies/Prestige-BioPharma-Reports-Positive-Top-Line-Phase-III-Results-for-Tuznue-Trastuzumab-Biosimilar.html", "pubDate": "06/24/2019" },
            // { "title": "ADC Therapeutics Presents Clinical Data on ADCT-402 and ADCT-301 in Subtypes of Relapsed or Refractory Lymphoma at the 15th International Conference on Malignant Lymphoma", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271605/Antibodies/ADC-Therapeutics-Presents-Clinical-Data-on-ADCT-402-and-ADCT-301-in-Subtypes-of-Relapsed-or-Refractory-Lymphoma-at-the-15th-International-Conference-on-Malignant-Lymphoma.html", "pubDate": "03/22/2019" },
            // { "title": "FDA Approves BOTOX® (onabotulinumtoxinA) for Pediatric Patients with Upper Limb Spasticity", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271604/Proteins-and-Peptides/FDA-Approves-BOTOX-onabotulinumtoxinA-for-Pediatric-Patients-with-Upper-Limb-Spasticity.html", "pubDate": "06/22/2019" },
            // { "title": "Daiichi Sankyo Provides Update on FDA Review of Quizartinib for the Treatment of Patients with Relapsed/Refractory FLT3-ITD AML", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271603/Small-Molecules/Daiichi-Sankyo-Provides-Update-on-FDA-Review-of-Quizartinib-for-the-Treatment-of-Patients-with-Relapsed/Refractory-FLT3-ITD-AML.html", "pubDate": "06/22/2019" },
            // { "title": "European Medicines Agency Accepted First 'China-Developed' Biosimilar - Henlius HLX02 Marketing Authorization Application for Review", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271602/Antibodies/European-Medicines-Agency-Accepted-First-China-Developed-Biosimilar-Henlius-HLX02-Marketing-Authorization-Application-for-Review.html", "pubDate": "06/22/2019" },
            // { "title": "FDA Approves New Drug Application for Vyleesi™ (bremelanotide injection)", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271601/Proteins-and-Peptides/FDA-Approves-New-Drug-Application-for-Vyleesi-bremelanotide-injection.html", "pubDate": "06/22/2019" },
            // { "title": "European Commission Approves TALZENNA® (talazoparib) for Patients with Inherited (Germline) BRCA-Mutated Locally Advanced or Metastatic Breast Cancer", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271599/Small-Molecules/European-Commission-Approves-TALZENNA-talazoparib-for-Patients-with-Inherited-Germline-BRCA-Mutated-Locally-Advanced-or-Metastatic-Breast-Cancer.html", "pubDate": "06/22/2019" }]
        }
    }
    componentDidMount() {
        console.log(this.props.searchKeyword, "keyword")
        const keyword = {}

        keyword.title = this.props.searchKeyword.name;
        keyword.days = 'O';
        keyword.description = this.props.searchKeyword.description;
        keyword.value = this.props.searchKeyword.value;
        keyword.open = this.props.searchKeyword.open;
        const { searches } = this.state;
        // console.log('inside',keyword.length,keyword)
        if (keyword.title !== null && keyword.title !== '' && keyword.title !== undefined) {
            // console.log('inside')
            if (searches.indexOf(keyword) === -1) {
                console.log('inside')
                searches.unshift(keyword)
                this.setState({ searches })

            }

        }
        // // this.setState({searches:this.props.searchKeyword})
        // console.log(this.props.searchKeyword,"keyword")
        // console.log(this.state.searches,"searches list")
    }
    async componentWillMount() {

        let feed = await parser.parseURL('https://feed.rssunify.com/5d2326122a494/rss.xml');
        let newsFeed = await parser.parseURL('https://feed.rssunify.com/5cdc1dcf8275f/rss.xml');
        feed.items.forEach(item => {
            var link = ""
            if (item.link.split("//")[1].split("/")[0].includes("www.")) {
                link = item.link.split("//")[1].split("/")[0].replace("www.", "");
            }
            else {
                link = item.link.split("//")[1].split("/")[0];
            }
            if (link.includes(".com")) {
                link = link.replace(".com", "");
            }
            console.log("split" + item.link.split("//")[1].split("/"));
            this.state.personWatch.push({ "title": item.title, "link": item.link, "source": link, "pubDate": 
            // item.pubDate.substring(0, item.pubDate.length - 15)
            dateFormat(item.pubDate.substring(0, item.pubDate.length - 15))
              });
        });
        newsFeed.items.forEach(item => {
            var link = ""
            if (item.link.split("//")[1].split("/")[0].includes("www.")) {
                link = item.link.split("//")[1].split("/")[0].replace("www.", "");
            }
            else {
                link = item.link.split("//")[1].split("/")[0];
            }
            if (link.includes(".com")) {
                link = link.replace(".com", "");
            }
            console.log("split" + item.link.split("//")[1].split("/"));
            this.state.newsFeed.push({ "title": item.title, "link": item.link, "source": link, "pubDate": 
            dateFormat(item.pubDate.substring(0, item.pubDate.length - 15))
            // item.pubDate.substring(0, item.pubDate.length - 15)
          });
        });
        this.setState({ renderFlag: true });
    }
    componentWillReceiveProps(nextProps) {

        console.log(nextProps.searchKeyword, "checking seacrh props")
    }

    HandleSavedSearch = (e) => {
        console.log(e.target.innerHTML, "title check")
        const Value = e.target.innerHTML;
        const { searches } = this.state;

        searches.map(item => {
            if (item.title === Value) {
                console.log(item)
                this.props.dispatch(SavesearchKeyword(item.value));
                this.props.dispatch(setCurrentView(types.SEARCH))
            }
        })
    }
    render() {
        const chartArray = [{
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
        }
        ]
        return (
            <div className="myCIHomeWrapper myCIHomeGenericWrapper">
                <div className="row researchWorklistWrapper margin0">
                    <div className="col-xs-12 col-sm-4 cardContainer siblingDivWrapper margin0">
                        <CardWithinCardComponent identifier="searches" cardArray={this.state.searches} HandleSavedSearch={this.HandleSavedSearch} title="My Saved Searches" />
                        <CardWithinCardComponent identifier="alerts" cardArray={this.state.alerts} title="My Alerts" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer middleCard margin0 padding0">
                        <CardWithinCardComponent identifier="IndustryNews" cardArray={this.state.newsFeed} title="Industry News" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer chartCardContainer siblingDivWrapper margin0">
                        {/* <CardWithinCardComponent cardArray={this.state.alerts} title="Alerts" /> */}
                        {/* </div>
                    <div className="col-xs-12 col-sm-6 cardContainer chartCardContainer"> */}
                        <CardWithChartComponent chartArray={chartArray} identifier="StockChart" title="Stock Chart" viewSource="home" />
                        <CardWithinCardComponent identifier="PressRelease" cardArray={this.state.pressRelease} title="Press Release" />
                    </div>
                </div>
                <div className="row researchWorklistWrapper margin0">
                    <div className="col-xs-12 col-sm-4 cardContainer margin0">
                        <CardWithinCardComponent identifier="personWatch" cardArray={this.state.personWatch} title="Person Watch" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer margin0 padding0">
                        <CardWithinCardComponent identifier="JournalWatch" cardArray={this.state.journals} title="Journal Watch" panelHeading="Journal Watch" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer margin0">
                        <CardWithinCardComponent identifier="RegulatoryWatch" cardArray={this.state.regulatoryWatch} title="Regulatory Watch" />
                    </div>
                    {/* <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.standardReports} title="Standard Reports" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.sharedReports} title="Shared Reports" />
                    </div> */}
                </div>
                {/* <div className="row researchWorklistWrapper">
                    <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.journals} title="Journal Watch" panelHeading="Journal Watch" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.regulatoryWatch} title="Regulatory Watch" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.pressRelease} title="Press Release" />
                    </div>
                </div> */}
                {/* <div className="row researchWorklistWrapper">
                    <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.pipelineWatch} title="Pipeline Watch" panelHeading="Pipeline Watch" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.alerts} title="My Alerts" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.personWatch} title="Person Watch" />
                    </div>
                    <div className="col-xs-12 col-sm-4 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.newsFeed} title="My Newsfeed" />
                    </div>
                </div> */}
                {/* <div className="row researchWorklistWrapper">
                    <div className="col-xs-12 col-sm-6 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.patentList} title="Patent Watch" panelHeading="Patent Watch" />
                    </div>
                </div> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchKeyword: state.SavedSearchesModalReducer.values,

    }
}
export default connect(mapStateToProps, null)(MyCIHomeGeneric);
