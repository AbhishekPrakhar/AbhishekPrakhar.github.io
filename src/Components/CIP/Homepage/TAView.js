import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWithTabsComponent from '../GenericComponents/CardComponent/CardWithTabsComponent';
import CardWithinCardComponent from '../GenericComponents/CardComponent/CardWithinCardComponent';
import CardWithChartComponent from '../GenericComponents/CardComponent/CardWithChartComponent';
import SimpleSelect from '../GenericComponents/Select/SimpleSelect';
import * as types from '../../../Actions/ActionTypes';
import dateFormat from "../../../_helpers/dateFormat";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import LaunchEstimate from '../LaunchEstimates/LaunchEstimate'
import IntergrationAutoSuggest from '../GenericComponents/IntegrationAutosuggest/IntergrationAutoSuggest'
let Parser = require('rss-parser');
let parser = new Parser();
let therapeuticAreas = [types.SELECT, types.ONCOLOGY, types.IMMUNOLOGY, types.CARDIOVASCULAR, types.METABOLIC];
let productInformation= [
    {
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
    }
    // {"title":"","link":"","date":"","location":""},
    // {"title":"","link":"","date":"","location":""},
    // {"title":"","link":"","date":"","location":""}
]
let patentListData = [{ title: "Reconfigurable surgical microscope", applicationNumber: "US 20180275386 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Lingfeng Yu,Craig Bender", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180275386.php" },
{ title: "Salts and solid forms of a monobactam antibiotic", applicationNumber: "US 20180273522 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Eric Aubin,Anthony Casarez,Andreas Fisch,Zaixing Li,Mika Lindvall,Heinz Ernst Moser,Michael Mutz,Folkert Reck,Bernd Ulrich Riebesehl,Marc Schoenhentz,Vijay Sethuraman,Robert Lowell Simmons", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273522.php" },
{ title: "Pet imaging agents", applicationNumber: "US 20180273509 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: ["Yves Auberson,Emmanuelle Briard,Darren Le Grand,Berndt Oberhauser"], brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273509.php" },
{ title: "3d printing of an intraocular lens having smooth, curved surfaces", applicationNumber: "US 20180272598 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Brian Craig Cox,Fernando Enrique Ortiz,Austin Xavier Rodeheaver", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180272598.php" },
{ title: "Vitrectomy probe with rotational helical cutter", applicationNumber: "US 20180271705 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Salomon Valencia", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180271705.php" },
{ title: "Laser-markable and laser-weldable polymeric materials", applicationNumber: "US 20180273730 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Reinhold Rueger, Ulrich Quittmann", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273730.php" },
{ title: "Amine derivatives as potassium channel blockers", applicationNumber: "US 20180273476 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Andrew Harvey, Agnes Bombrun, Rachel Cooke, Isabelle Jeanclaude-etter, Nathan Kuchel, Jerome Molette, Jorgen Mould, Dharam Paul, Rajinder Singh, Cristina Donini, Veronique Colovray, Thomas Avery, Julia Crossman, Justin Ripper", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273476.php" },
{ title: "Perfluoroalkyl group-containing bismuth compounds as lewis acid catalysts", applicationNumber: "US 20180272325 A1", publishDate: "27-Sep-2018", upstoClass: "N/A", inventors: "Berthold Theo Hoge, Sven Joerg-ruediger August Solyntjes, Anne Julia Bader, Nikolai Ignatiev", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180272325.php" },
{ title: "Triphenylene-based materials for organic electroluminescent devices", applicationNumber: "US 20180269411 A1", publishDate: "20-Sep-2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Dominik Joosten, Arne Buesing", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269411.php" },
{ title: "Electronic device", applicationNumber: "US 20180269406 A1", publishDate: "20-Sep-2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Amir Hossain Parham, Christof Pflumm, Anja Jatsch, Joachim Kaiser, Herwig Buchholz", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269406.php" }
    // {title:"",applicationNumber:"",publishDate:"",upstoClass:"",inventors:"",brandName:"",link:""}]
]
const styles = theme => ({

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "white",
        // fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        marginRight: theme.spacing.unit,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 5,
        height: '100%',
        position: 'absolute',
        // pointerEvents: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
class TAView extends Component {
    constructor() {
        super();
        this.state = {
            renderFlag: false,
            therapeuticNews: [{ "Positive": [] }, { "Negative": [] }],
            brandNews: [],
            upcomingEvents: [{ "title": "18th Asia Pacific Ophthalmologists Annual Meeting", "link": "https://ophthalmology.conferenceseries.com/asiapacific/" }, { "title": "18th Global Ophthalmology, Optometry and Glaucoma Conference", "link": "https://glaucoma.conferenceseries.com/" }, { "title": "Euro Optometry and Vision Science", "link": "https://eurooptometry.ophthalmologyconferences.com/" }, { "title": "VisionScience and Eye", "link": "https://visionscience.ophthalmologyconferences.com/" }],
            competitorNewsTA: [],
            journals: [{ "title": "Overall Survival with Ribociclib plus Endocrine Therapy in Breast Cancer.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31166679", "brandName": "Novartis" }, { "title": "BioPATH: A Biomarker Study in Asian Patients with HER2+ Advanced Breast Cancer Treated with Lapatinib and Other Anti-HER2 Therapy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31163957", "brandName": "Novartis" }, { "title": "Evaluating Patient Experiences in Dry Eye Disease Through Social Media Listening Research.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31161531", "brandName": "Novartis" }, { "title": "Deceased organ and tissue donation after medical assistance in dying and other conscious and competent donors: guidance for policy.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31160497", "brandName": "Novartis" }, { "title": "Effects of Dapagliflozin on Volume Status When Added to Renin-Angiotensin System Inhibitors.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31159350", "brandName": "Novartis" }],
            pipelineWatch: [{ "title": "Affimed Announces Clinical Data Update on Lead Product Candidate AFM13 in CD30+ lymphoma at ICML 2019", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062471609/Antibodies/Affimed-Announces-Clinical-Data-Update-on-Lead-Product-Candidate-AFM13-in-CD30-lymphoma-at-ICML-2019.html", "pubDate": "06/24/2019" },
            { "title": "Correvio Resubmits Brinavess (Vernakalant) New Drug Application to U.S. FDA for the Treatment of Patients with Recent Onset Atrial Fibrillation", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062471608/Small-Molecules/Correvio-Resubmits-Brinavess-Vernakalant-New-Drug-Application-to-U.S.-FDA-for-the-Treatment-of-Patients-with-Recent-Onset-Atrial-Fibrillation.html", "pubDate": "06/24/2019" },
            { "title": "Prestige BioPharma Reports Positive Top-Line Phase III Results for Tuznue® (Trastuzumab Biosimilar)", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062471606/Antibodies/Prestige-BioPharma-Reports-Positive-Top-Line-Phase-III-Results-for-Tuznue-Trastuzumab-Biosimilar.html", "pubDate": "06/24/2019" },
            { "title": "ADC Therapeutics Presents Clinical Data on ADCT-402 and ADCT-301 in Subtypes of Relapsed or Refractory Lymphoma at the 15th International Conference on Malignant Lymphoma", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271605/Antibodies/ADC-Therapeutics-Presents-Clinical-Data-on-ADCT-402-and-ADCT-301-in-Subtypes-of-Relapsed-or-Refractory-Lymphoma-at-the-15th-International-Conference-on-Malignant-Lymphoma.html", "pubDate": "03/22/2019" },
            { "title": "FDA Approves BOTOX® (onabotulinumtoxinA) for Pediatric Patients with Upper Limb Spasticity", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271604/Proteins-and-Peptides/FDA-Approves-BOTOX-onabotulinumtoxinA-for-Pediatric-Patients-with-Upper-Limb-Spasticity.html", "pubDate": "06/22/2019" },
            { "title": "Daiichi Sankyo Provides Update on FDA Review of Quizartinib for the Treatment of Patients with Relapsed/Refractory FLT3-ITD AML", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271603/Small-Molecules/Daiichi-Sankyo-Provides-Update-on-FDA-Review-of-Quizartinib-for-the-Treatment-of-Patients-with-Relapsed/Refractory-FLT3-ITD-AML.html", "pubDate": "06/22/2019" },
            { "title": "European Medicines Agency Accepted First 'China-Developed' Biosimilar - Henlius HLX02 Marketing Authorization Application for Review", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271602/Antibodies/European-Medicines-Agency-Accepted-First-China-Developed-Biosimilar-Henlius-HLX02-Marketing-Authorization-Application-for-Review.html", "pubDate": "06/22/2019" },
            { "title": "FDA Approves New Drug Application for Vyleesi™ (bremelanotide injection)", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271601/Proteins-and-Peptides/FDA-Approves-New-Drug-Application-for-Vyleesi-bremelanotide-injection.html", "pubDate": "06/22/2019" },
            { "title": "European Commission Approves TALZENNA® (talazoparib) for Patients with Inherited (Germline) BRCA-Mutated Locally Advanced or Metastatic Breast Cancer", "source": "U.S. FDA", "link": "https://pipelinereview.com/index.php/2019062271599/Small-Molecules/European-Commission-Approves-TALZENNA-talazoparib-for-Patients-with-Inherited-Germline-BRCA-Mutated-Locally-Advanced-or-Metastatic-Breast-Cancer.html", "pubDate": "06/22/2019" }],
            table:productInformation,
            patentList: patentListData,
        }
    }
    async componentWillMount() {
        let piData=[],pListData=[];
        if (this.props.TAChanged === undefined || this.props.TAChanged === "Select") {

            piData = productInformation
            pListData = patentListData

        } else
        {
            productInformation.forEach(item => {
                item.title.includes((this.props.TAChanged))
                {
                    piData.push(item)
                }
            })
            patentListData.forEach(item => {
                item.title.includes((this.props.TAChanged))
                {
                    pListData.push(item)
                }
            })
        }
        let feed = await parser.parseURL('https://feed.rssunify.com/5cdc1dcf8275f/rss.xml');
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
            if (item.title.includes("Bayer") || item.title.includes("Eylea") || item.title.includes("Gilead") || item.title.includes("lilly") || item.title.includes("deal") || item.title.includes("Revenue") || item.title.includes("Competitors") || item.title.includes("competitors") || item.title.includes("Amgen") || item.title.includes("Merck")) {
                this.state.competitorNewsTA.push({ "title": item.title, "link": item.link, "source": link, "pubDate": dateFormat(item.pubDate.substring(0, item.pubDate.length - 15)) });
            }
            if (item.title.includes("Novartis") || item.title.includes("cancer") || item.title.includes("lens") || item.title.includes("eyes") || item.title.includes("Disease ")) {
                this.state.brandNews.push({ "title": item.title, "link": item.link, "source": link, "pubDate": dateFormat(item.pubDate.substring(0, item.pubDate.length - 15)) });
            }
            if (this.props.TAChanged === undefined || this.props.TAChanged === "Select") {
                this.defaultNews(item);
            }
            else {
                
                switch (this.props.TAChanged) {
                    case types.SELECT:
                        this.defaultNews(item)
                        break;
                    case types.ONCOLOGY:
                        this.searchNewsbyKeyword(item, types.ONCOLOGY);
                        break;
                    case types.IMMUNOLOGY:
                        this.searchNewsbyKeyword(item, types.IMMUNOLOGY);
                        break;
                    case types.CARDIOVASCULAR:
                        this.searchNewsbyKeyword(item, types.CARDIOVASCULAR);
                        break;
                    case types.METABOLIC:
                        this.searchNewsbyKeyword(item, types.METABOLIC);
                        break;
                }
            }

        });
 
        this.setState({ renderFlag: true,
            table:[...piData] ,
            patentList:[...pListData]});
    }
    defaultNews(item) {
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
        if (item.title.includes("Therapeutics") || item.title.includes("Merck") || item.title.includes("cardiovascular") || item.title.includes("biosciences") || item.title.includes("Pharmaceuticals") || item.title.includes("cancer") || item.title.includes("lens") || item.title.includes("eyes") || item.title.includes("Disease")) {
            if (item.link.split("//")[1].split("/").includes("www.")) {

            }
            if (item.link.split("//")[1].split("/").includes(".com")) {
                item.link.split("//")[1].split("/").replace(".com", "");
            }
            this.state.therapeuticNews[0].Positive.push({ "title": item.title, "link": item.link, "source": link, "pubDate": dateFormat(item.pubDate.substring(0, item.pubDate.length - 15)) });
        }
        if (item.title.includes("Novartis") || item.title.includes("Disease") || item.title.includes("Pharmaceuticals") || item.title.includes("Merck") || item.title.includes("cardiovascular") || item.title.includes("fluid")) {
            this.state.therapeuticNews[1].Negative.push({ "title": item.title, "link": item.link, "source": link, "pubDate": dateFormat(item.pubDate.substring(0, item.pubDate.length - 15)) });
        }
    }
    searchNewsbyKeyword(item, keyword) {
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
        if (item.title.includes(keyword)) {
            this.state.therapeuticNews[0].Positive.push({ "title": item.title, "link": item.link, "source": link, "pubDate": dateFormat(item.pubDate.substring(0, item.pubDate.length - 15)) });
        }
        if (item.title.includes(keyword) || item.title.includes("Disease")) {
            this.state.therapeuticNews[1].Negative.push({ "title": item.title, "link": item.link, "source": link, "pubDate": dateFormat(item.pubDate.substring(0, item.pubDate.length - 15)) });
        }
        
        this.setState({ therapeuticNews: this.state.therapeuticNews });
    }


    async componentWillReceiveProps(nextProps) {
        
        let piData=[],pListData=[];
        productInformation.forEach(item => {
            if(item.title.includes(this.props.TAChanged))
            {
                piData.push(item)
            }
        })
        patentListData.forEach(item => {
            item.title.includes((this.props.TAChanged))
            {
                pListData.push(item)
            }
        })    
        if (nextProps.TAChanged !== this.props.TAChanged) {
            this.state.therapeuticNews[0].Positive = [];
            this.state.therapeuticNews[1].Negative = [];
            let feed = await parser.parseURL('https://feed.rssunify.com/5cdc1dcf8275f/rss.xml');
            feed.items.forEach(item => {
                if (nextProps.TAChanged === undefined || nextProps.TAChanged === "Select") {
                    this.defaultNews(item);
                }
                else {
                    switch (nextProps.TAChanged) {
                        case types.ONCOLOGY:
                           
                            this.searchNewsbyKeyword(item, types.ONCOLOGY);
                            break;
                        case types.IMMUNOLOGY:
                            this.searchNewsbyKeyword(item, types.IMMUNOLOGY);
                            break;
                        case types.CARDIOVASCULAR:
                            this.searchNewsbyKeyword(item, types.CARDIOVASCULAR);
                            break;
                        case types.METABOLIC:
                            this.searchNewsbyKeyword(item, types.METABOLIC);
                            break;
                    }
                }
            });
              
        }

        this.setState({ renderFlag: true,
                            table:[...piData] ,
                            patentList:[...pListData]});
    }
    render() {
        var pipeline=[{ phaseName: "Pre-clinical", value: 20.5,"count": "140" },
        { phaseName: "Phase I", value: 29.7,"count": "145" },
        { phaseName: "Phase II", value: 33.5,"count": "105" },
        { phaseName: "Phase III", value: 7.9,"count": "39" },
        { phaseName: "Pre-registration", value: 4,"count": "2" }];
        var LaunchEstimate=[];
        const { classes } = this.props;
        return (
            <div className="TAViewWrapper container-fluid ">

                {/* AutoSearch integration as per requirement */}
                <div className="autoSuggestSearchBox">
                    <label  className="seagreenText">Therapeutic Area : </label>
                    <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <IntergrationAutoSuggest type="diseaseArea" />
                    </div>
                 </div>
                {/* AutoSearch integration as per requirement */}

                    {/* {this.props.TAChanged !== undefined ? <SimpleSelect valueSelected={this.props.TAChanged} viewToSet={types.THERAPEUTICAREAVIEW} arrPassed={therapeuticAreas} /> : <SimpleSelect valueSelected={types.SELECT} viewToSet={types.THERAPEUTICAREAVIEW} arrPassed={therapeuticAreas} />} */}
                
               
                <div className="row researchWorklistWrappe margin0">
                    <div className="col-xs-12 col-sm-3 cardContainer siblingDivWrapper margin0 padding0">
                        <CardWithinCardComponent identifier="CongressPlanner" cardArray={this.state.table} title="Congress Planner" />
                        <CardWithChartComponent identifier="whatsOn" title="What's On" type="taview" />
                        {/* <CardWithinCardComponent cardArray={this.state.patentList} title="Patent Watch" panelHeading="Patent Watch" /> */}
                    </div>
                    <div className="col-xs-12 col-sm-3 cardContainer tabCardContainer middleCard padding0 margin0">
                        <CardWithTabsComponent identifier="TherapeuticAreaWatch"  tabArray={this.state.therapeuticNews} title="Therapeutic Area Watch" />
                    </div>
                    <div className="col-xs-12 col-sm-6 cardContainer chartCardContainer siblingDivWrapper margin0 padding0">
                        <CardWithChartComponent chartArray={pipeline} title="Pipeline" identifier="Pipeline"  />
                        <CardWithChartComponent chartArray={LaunchEstimate} identifier="LaunchEstimate" title="Launch Estimates" />
                    </div>
                    {/* <div className="col-xs-12 col-sm-6 cardContainer chartCardContainer metricsWrapper">
                        <CardWithChartComponent title="Social Media Metrics" type="Brand" />
                    </div> */}
                    {/* <div className="col-xs-12 col-sm-3 cardContainer competitorProductWrapper">
                        <CardWithinCardComponent cardArray={this.state.brandNews} title="Brand News" />
                        <CardWithinCardComponent cardArray={this.state.upcomingEvents} title="Upcoming Events" />
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 cardContainer patentWatchContainer paddingRight0">
                        <CardWithinCardComponent identifier="PatentWatch" cardArray={this.state.patentList} title="Patent Watch" panelHeading="Patent Watch" />
                    </div>
                </div> 
                {/* <div className="row researchWorklistWrapper">
                    <div className="col-xs-12 col-sm-3 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.competitorNewsTA} title="Competitors News" panelHeading="Competitors News" />
                    </div>
                    <div className="col-xs-12 col-sm-6 cardContainer chartCardContainer activitiesWrapper">
                        <CardWithChartComponent title="Activities" />
                    </div>
                    <div className="col-xs-12 col-sm-3 cardContainer ExpertsObservation">
                        <CardWithChartComponent title="Experts Observation" />
                    </div>
                </div> */}
                {/* <div className="row researchWorklistWrapper">
                    <div className="col-xs-12 col-sm-3 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.journals} title="Journal Watch" panelHeading="Journal Watch" />
                    </div>
                    <div className="col-xs-12 col-sm-6 cardContainer chartCardContainer">
                        <CardWithChartComponent title="Pipeline" />
                    </div>
                    <div className="col-xs-12 col-sm-3 cardContainer">
                        <CardWithinCardComponent cardArray={this.state.table} title="Congress Planner" />
                    </div>
                </div> */}
                {/* <div className="row researchWorklistWrapper">
                    <div className="col-xs-12 col-sm-6 cardContainer chartCardContainer">
                        <CardWithChartComponent title="LaunchEstimate" />

                    </div>
                </div> */}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userName: state.CIPReducer.userName,
        tabSelected: state.CIPReducer.tabSelected,
        TAChanged: state.CIPReducer.TAChanged
    };
}
export default connect(mapStateToProps)(withStyles(styles)(TAView));