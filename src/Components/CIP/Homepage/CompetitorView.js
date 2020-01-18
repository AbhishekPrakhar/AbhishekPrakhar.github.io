import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardWithTabsComponent from '../GenericComponents/CardComponent/CardWithTabsComponent';
import CardWithinCardComponent from '../GenericComponents/CardComponent/CardWithinCardComponent';
import CardWithChartComponent from '../GenericComponents/CardComponent/CardWithChartComponent';
import SimpleSelect from '../GenericComponents/Select/SimpleSelect';
import * as types from '../../../Actions/ActionTypes';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { SavesearchKeyword, SearchContent, setCurrentView, RibonTabSelected } from '../../../Actions/ActionSearchFunction';
import { store } from "../../../Store/Store";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Products from '../../../json/products.json';
import IntergrationAutoSuggest from '../GenericComponents/IntegrationAutosuggest/IntergrationAutoSuggest';
let Parser = require('rss-parser');
let parser = new Parser();
const styles = theme => ({
    root: {
        width: '100%'
    },
    grow: {
        flexGrow: 1,
    },
    Menu: {
        top: '13%',
        right: '7%'

    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        margin: '0px',
        marginTop: theme.spacing.unit * 3,
        padding: '0px',
        border: 'none',
        fontSize: '12px',
        fontWeight: '200',

        // border: '1px solid #484668',
        textTransform: 'none'
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'white',
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
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    advance: {
        position: 'absolute',
        top: '11%',
        left: '74%',
        color: '#fff',
        padding: '5px'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     width: 120,
        //     '&:focus': {
        //         width: 200,
        //     },
        // },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    messageNotification: {
        height: "auto",
        display: "flex",
        alignItems: "center",
        "&:hover, &:focus": {
            backgroundColor: theme.palette.background.light
        }
    },
    messageNotificationSide: {
        display: "flex",
        flexDirection: "column",

        // alignItems: "center",
        marginRight: theme.spacing.unit * 2
    },
    messageNotificationBodySide: {
        // alignItems: "flex-start",
        marginRight: 0,
        flexBasis: '100%',
    },
    headerMenuItem: {
        paddingLeft: '6px',
    },
    nested: {
        paddingLeft: theme.spacing.unit * 8,
    },
});
var productInformation = [], licensing = [], Sales_Contribution = [];
class CompetitorView extends Component {

    constructor() {
        super();
        this.state = {
            competitorNews: [{ "Positive": [] }, { "Negative": [] }],
            competitorProfiles: [{ title: "Pfizer", link: "https://www.reuters.com/finance/stocks/company-profile/PFE" },
            { title: "GSK", link: "https://www.gsk.com/en-gb/about-us/" }, { "title": "Merck", "link": "https://www.merck.com/about/home.html" },
            { title: "Bayer", link: "https://www.bayer.com/en/profile-and-organization.aspx" },
            { title: "Eli Lilly", link: "https://www.reuters.com/finance/stocks/company-profile/LLY" }],
            upcomingEvents: ["ISTH Advanced Training Course in Thrombosis and Hemostas", "Competition Social Mentions - Monthly", "Brand coverage Index - Europe", "Brand coverage Index – Other Geo", "Xarelto Competition Trial Progress"],
            competitorPublication: [{ "title": "Bayer Annual Reports", "link": "https://www.bayer.com/en/integrated-annual-reports.aspx" },
            { "title": "Bayer Quarterly Reports", "link": "https://www.bayer.com/en/Quarterly-Reports.aspx" }, { "title": "GSK announces NEJM publication of positive phase III study investigating mepolizumab in patients with Eosinophilic Granulomatosis with Polyangiitis (EGPA)", "link": "https://www.gsk.com/en-gb/media/press-releases/gsk-announces-nejm-publication-of-positive-phase-iii-study-investigating-mepolizumab-in-patients-with-eosinophilic-granulomatosis-with-polyangiitis-egpa/" },
            { "title": "Bayer Magazine", "link": "https://www.bayer.com/en/bayer-magazine.aspx" }, { "title": "Exploring the future", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/environment.html" }, { "title": "Fostering talent", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/culture-education.html" }, { "title": "Enriching lives", "link": "http://reports.merckgroup.com/2016/cr-report/magazine/health.html" }, { "title": "An invisible enemy", "link": "http://reports.merckgroup.com/2017/cr-report/magazine/health.html" }, { "title": "Learning brought to life", "link": "http://reports.merckgroup.com/2017/cr-report/magazine/education-and-culture.html" }],
            reportAndResearch: [{ title: "Small Molecules to Treat Cancer", link: "https://www.research.bayer.com/en/cancer-causes-cancer-research-new-drug-products-chemotherapy.aspx" }, { "title": "Corporate Responsibility Report 2017", "link": "http://reports.merckgroup.com/2017/cr-report/?_ga=2.161484924.1132866060.1558024260-1909838963.1558024260" }, { title: "Studying a cell's Messages in a bottle to un;pck clues to disease", link: "https://www.pfizer.com/news/featured_stories/featured_stories_detail/studying_a_cell_s_messages_in_a_bottle_to_unlock_clues_to_disease" }, { title: "Food for the Mind", link: "https://www.research.bayer.com/en/berocca-bayer-vitamin-supplement-memory.aspx" }, { title: "New Uses for Ancient Active Substances", link: "https://www.research.bayer.com/en/phytotherapy-medicinal-plants-new-applications.aspx" }, { title: "Customized Solutions for Tumors", link: "https://www.research.bayer.com/en/new-cancer-drugs-chemotherapy.aspx" }, { "title": "Viral Knowledge", "link": "https://www.merckgroup.com/en/cr-report/2018/magazine/broad-minds.html" }, { "title": "Tiny Enemies", "link": "https://www.merckgroup.com/en/cr-report/2018/magazine/global-health.html" }, { "title": "Remarkable Growth", "link": "https://www.merckgroup.com/en/cr-report/2018/magazine/sustainable-solutions.html" }, { "title": "Non Financial Report", "link": "https://www.merckgroup.com/en/cr-report/2018/facts-figures/non-financial-report.html" }],
            competitors: ["Select", "Pfizer", "Bayer", "Merck", "GSK", "Amgen"],
            journals: [{ "title": "Enhanced Thrombolysis by Ultrasound-Assisted Catheter-Directed Thrombolysis and Microbubbles in an In Vitro Model of Iliofemoral Deep Vein Thrombosis.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31167251", "brandName": "Bayer" }, { "title": "Community-based management of epistaxis: Who bloody knows?", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31156729", "brandName": "Bayer" }, { "title": "Canada's new Healthy Eating Strategy: Implications for health care professionals and a call to action.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31156726", "brandName": "Bayer" }, { "title": "Effects of Dapagliflozin on Volume Status When Added to Renin-Angiotensin System Inhibitors.", "link": "https://www.ncbi.nlm.nih.gov/pubmed/31159350", "brandName": "Bayer" }],
            patentList: [{ title: "Reconfigurable surgical microscope", applicationNumber: "US 20180275386 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Lingfeng Yu,Craig Bender", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180275386.php" },
            { title: "Salts and solid forms of a monobactam antibiotic", applicationNumber: "US 20180273522 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Eric Aubin,Anthony Casarez,Andreas Fisch,Zaixing Li,Mika Lindvall,Heinz Ernst Moser,Michael Mutz,Folkert Reck,Bernd Ulrich Riebesehl,Marc Schoenhentz,Vijay Sethuraman,Robert Lowell Simmons", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273522.php" },
            { title: "Pet imaging agents", applicationNumber: "US 20180273509 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: ["Yves Auberson,Emmanuelle Briard,Darren Le Grand,Berndt Oberhauser"], brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180273509.php" },
            { title: "3d printing of an intraocular lens having smooth, curved surfaces", applicationNumber: "US 20180272598 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Brian Craig Cox,Fernando Enrique Ortiz,Austin Xavier Rodeheaver", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180272598.php" },
            { title: "Vitrectomy probe with rotational helical cutter", applicationNumber: "US 20180271705 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Salomon Valencia", brandName: "Novartis", link: "https://www.freshpatents.com/-dt20180927ptan20180271705.php" },
            { title: "Laser-markable and laser-weldable polymeric materials", applicationNumber: "US 20180273730 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Reinhold Rueger, Ulrich Quittmann", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273730.php" },
            { title: "Amine derivatives as potassium channel blockers", applicationNumber: "US 20180273476 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Andrew Harvey, Agnes Bombrun, Rachel Cooke, Isabelle Jeanclaude-etter, Nathan Kuchel, Jerome Molette, Jorgen Mould, Dharam Paul, Rajinder Singh, Cristina Donini, Veronique Colovray, Thomas Avery, Julia Crossman, Justin Ripper", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180273476.php" },
            { title: "Perfluoroalkyl group-containing bismuth compounds as lewis acid catalysts", applicationNumber: "US 20180272325 A1", publishDate: "09/27/2018", upstoClass: "N/A", inventors: "Berthold Theo Hoge, Sven Joerg-ruediger August Solyntjes, Anne Julia Bader, Nikolai Ignatiev", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180927ptan20180272325.php" },
            { title: "Triphenylene-based materials for organic electroluminescent devices", applicationNumber: "US 20180269411 A1", publishDate: "09/20/2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Dominik Joosten, Arne Buesing", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269411.php" },
            { title: "Electronic device", applicationNumber: "US 20180269406 A1", publishDate: "09/20/2018", upstoClass: "N/A", inventors: "Philipp Stoessel, Amir Hossain Parham, Christof Pflumm, Anja Jatsch, Joachim Kaiser, Herwig Buchholz", brandName: "Merck", link: "https://www.freshpatents.com/-dt20180920ptan20180269406.php" }
                // {title:"",applicationNumber:"",publishDate:"",upstoClass:"",inventors:"",brandName:"",link:""}]
            ],
            searchKeyword: ''
        }
    }
    async componentWillMount() {
        let feed = await parser.parseURL('https://feed.rssunify.com/5cdc1dcf8275f/rss.xml');

        // feed.items.forEach(item => {
        if (this.props.TAChanged !== undefined) {
            var filteredProducts;
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
                if (item.title.includes(this.props.TAChanged.toLowerCase())) {
                    this.state.competitorNews[0].Positive.push({ "title": item.title, "link": item.link, "source": link, "pubDate": item.pubDate.substring(0, item.pubDate.length - 15) });
                }
            });
            filteredProducts = Products.filter(item => {
                const molecule = item.Molecule_Name.toLowerCase();
                const product = item.title.toLowerCase();
                const TA = item.Therapeutic_Area.toLowerCase();
                if (molecule.includes(this.props.TAChanged.toLowerCase()) || product.includes(this.props.TAChanged.toLowerCase()) || TA.includes(this.props.TAChanged.toLowerCase())) {
                    return item;
                } else { return null }

            })

            productInformation = [{ "title": filteredProducts[0].title, "TA": filteredProducts[0].Therapeutic_Area, "molecule": filteredProducts[0].Molecule_Name, "ATC3": filteredProducts[0].ATC3_Code, "indication": filteredProducts[0].Indication }];
            licensing = filteredProducts[0].licensing;
            Sales_Contribution = filteredProducts[0].Sales_Contribution;
        }
        if (this.props.obj !== undefined) {
            if (this.props.obj.obj !== undefined) {
                var filteredProducts;
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
                if (item.title.includes(this.props.obj.obj.title.toLowerCase())) {
                    this.state.competitorNews[0].Positive.push({ "title": item.title, "link": item.link, "source": link, "pubDate": item.pubDate.substring(0, item.pubDate.length - 15) });
                }
            });
                productInformation = [{ "title": this.props.obj.obj.title, "TA": this.props.obj.obj.Therapeutic_Area, "molecule": this.props.obj.obj.Molecule_Name, "ATC3": this.props.obj.obj.ATC3_Code, "indication": this.props.obj.obj.Indication }];
                licensing = this.props.obj.obj.licensing;
                Sales_Contribution = this.props.obj.obj.Sales_Contribution;

            }
        }
        this.setState({ renderFlag: true });
    }
    defaultNews(item) {
        var link = "";
        if (item.link.split("//")[1].split("/")[0].includes("www.")) {
            link = item.link.split("//")[1].split("/")[0].replace("www.", "");
        }
        else {
            link = item.link.split("//")[1].split("/")[0];
        }
        if (link.includes(".com")) {
            link = link.replace(".com", "");
        }
        // included JSON with "Result" word to increase list elements
        if (item.title.includes("Bayer") || item.title.includes("Amgen") || item.title.includes("Competitors") || item.title.includes("GTBIF") || item.title.includes("Illumina") || item.title.includes("Eylea") || item.title.includes("Gilead") || item.title.includes("lilly") || item.title.includes("disease") || item.title.includes("deal") || item.title.includes("Merck") || item.title.includes("cardiovascular") || item.title.includes("biosciences") || item.title.includes("Pharmaceuticals") || item.title.includes("cancer") || item.title.includes("lens") || item.title.includes("eyes") || item.title.includes("Results")) {
            this.state.competitorNews[0].Positive.push({ "title": item.title, "link": item.link, "source": link, "pubDate": item.pubDate.substring(0, item.pubDate.length - 15) });
        }
        if (item.title.includes("Therapeutics") || item.title.includes("Merck") || item.title.includes("cardiovascular") || item.title.includes("biosciences") || item.title.includes("Pharmaceuticals") || item.title.includes("cancer") || item.title.includes("lens") || item.title.includes("eyes") || item.title.includes("Disease")) {
            this.state.competitorNews[1].Negative.push({ "title": item.title, "link": item.link, "source": link, "pubDate": item.pubDate.substring(0, item.pubDate.length - 15) });
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
            this.state.competitorNews[0].Positive.push({ "title": item.title, "link": item.link, "source": link, "pubDate": item.pubDate.substring(0, item.pubDate.length - 15) });
        }
        if (item.title.includes(keyword) || item.title.includes("Disease")) {
            this.state.competitorNews[1].Negative.push({ "title": item.title, "link": item.link, "source": link, "pubDate": item.pubDate.substring(0, item.pubDate.length - 15) });
        }
        this.setState({ competitorNews: this.state.competitorNews });
    }
    searchPatentbyKeyword(keyword) {
        let updatedPatent = [];
        for (var i = 0; i < this.state.patentList.length; i++) {
            if (this.state.patentList[i].brandName === keyword) {
                updatedPatent.push(this.state.patentList[i]);
            }
        }
        this.setState({ patentList: updatedPatent })
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.TAChanged !== this.props.TAChanged) {
            this.state.competitorNews[0].Positive = [];
            this.state.competitorNews[1].Negative = [];
            let feed = await parser.parseURL('https://feed.rssunify.com/5cdc1dcf8275f/rss.xml');
            feed.items.forEach(item => {
                // if (nextProps.TAChanged === undefined || nextProps.TAChanged === "Select") {
                //     this.defaultNews(item);
                // }
                this.searchNewsbyKeyword(item, nextProps.TAChanged);
                this.searchPatentbyKeyword(nextProps.TAChanged);
            });

        }
        this.setState({ renderFlag: true });
    }

    handleChange = (event, value) => {
        this.setState({ searchKeyword: event.target.value });
    };
    render() {
        var objToProcess;
        if (this.props.TAChanged !== undefined) {
            objToProcess = this.props.TAChanged;
        }
        if (this.props.obj !== undefined) {
            if (this.props.obj.obj != undefined) {
                objToProcess = this.props.obj.obj;
            }

        }
        var socialMediaData = [
            { "date": "2019-05-01", "value": 0 },
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
            { "date": "2019-05-14", "value": 15326 }
        ]
        var clinicalTrialData = [{ "name": "Phase 1", "count": "2365", "percentage": "27.8" }, { "name": "Phase 2", "count": "4706", "percentage": "55.0" }, { "name": "Phase 3", "count": "807", "percentage": "10.0" }, { "name": "Phase 4", "count": "375", "percentage": "4.4" }, { "name": "Others", "count": "238", "percentage": "2.8" }];
        const { filteredProducts } = this.state;
        const { classes } = this.props;
        return (
            <div className="TAViewWrapper container-fluid ComperitorViewWrapper">
                <div className="container-fluid">
                    <div className="autoSuggestSearchBox">
                        <label className="seagreenText">Brand : </label>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <IntergrationAutoSuggest type="competitorView" />
                        </div>
                    </div>
                </div>
                {(this.props.TAChanged !== undefined || this.props.obj.obj !== undefined || this.props.obj.TAChanged !== undefined) &&
                    <div>
                        <div className="ProductDashboardWrapper">
                            <div className="row researchWorklistWrapper margin0">
                                <div className="col-xs-12 col-sm-8 padding0">
                                <div className="row margin0">
                                    <div className="col-xs-12 col-sm-6 cardContainer  margin0 padding0">
                                        <CardWithinCardComponent identifier="ProductInformation" cardArray={productInformation} title="Product Information" />
                                    </div>
                                    <div className="col-xs-12 col-sm-6 cardContainer  margin0 padding0">
                                        <CardWithinCardComponent identifier="Licensing" cardArray={licensing} title="Licensing" />
                                    </div>
                                </div>
                                <div className="row margin0 padding0">
                                <div className="col-xs-12 col-sm-12 cardContainer productSizeWrapper padding0">
                                    <CardWithChartComponent identifier="Sales&Contribution" title="Sales & Contribution" type="Sales & Contribution" chartArray={Sales_Contribution} />
                                    <CardWithChartComponent identifier="Sales&Contribution" title="Market Size" type="Market Size" />
                                </div>
                                </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 cardContainer tabCardContainer middleCard margin0 padding0">
                                    <CardWithTabsComponent identifier="BrandNews" tabArray={this.state.competitorNews} title="Brand News" />
                                    <div className="whatsOn">
                                    <CardWithChartComponent identifier="whatsOn" title="What's On" type="competitor" /></div>
                                </div>
                            </div>
                        <div className="row researchWorklistWrapper padding0">
                            <div className="col-xs-12 col-sm-6 cardContainer paddingRight0">
                                <CardWithChartComponent chartArray={socialMediaData} identifier="SocialMediaMetrics" title="Social Media Metrics" type="Brand" />
                            </div>
                            <div className="col-xs-12 col-sm-6 cardContainer paddingLeft0 ">
                            <CardWithChartComponent identifier="ClinicalTrial" title="Clinical Trial" chartArray={clinicalTrialData} type="Competitor" />
                            </div>
                        </div>
                        </div>
                    </div>
                }
                {/* {(this.props.TAChanged !== undefined || this.props.obj.obj !== undefined || this.props.obj.TAChanged !== undefined) &&
                    <div>
                        <div className="ProductDashboardWrapper">
                            <div className="row researchWorklistWrapper margin0">
                                <div className="col-xs-12 col-sm-8 padding0">
                                <div className="row margin0">
                                    <div className="col-xs-12 col-sm-6 cardContainer  margin0 padding0">
                                        <CardWithinCardComponent identifier="ProductInformation" cardArray={productInformation} title="Product Information" />
                                    </div>
                                    <div className="col-xs-12 col-sm-6 cardContainer  margin0 padding0">
                                        <CardWithinCardComponent identifier="Licensing" cardArray={licensing} title="Licensing" />
                                    </div>
                                </div>
                                <div className="row margin0 padding0">
                                <div className="col-xs-12 col-sm-12 cardContainer productSizeWrapper padding0">
                                    <CardWithChartComponent identifier="Sales&Contribution" title="Sales & Contribution" type="Sales & Contribution" chartArray={Sales_Contribution} />
                                    <CardWithChartComponent identifier="Sales&Contribution" title="Market Size" type="Market Size" />
                                </div>
                                </div>
                                </div>
                                <div className="col-xs-12 col-sm-4 cardContainer tabCardContainer middleCard margin0 padding0 siblingDivWrapper">
                                    <CardWithTabsComponent identifier="BrandNews" tabArray={this.state.competitorNews} title="Brand News" />
                                    <CardWithChartComponent identifier="whatsOn" title="What's On" type="competitor" />
                                </div>
                            </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 cardContainer paddingRight0">
                                <CardWithChartComponent chartArray={socialMediaData} identifier="SocialMediaMetrics" title="Social Media Metrics" type="Brand" />
                            </div>
                            <div className="col-xs-12 col-sm-6 cardContainer paddingLeft0 ">
                            <CardWithChartComponent identifier="ClinicalTrial" title="Clinical Trial" chartArray={clinicalTrialData} type="Competitor" />
                            </div>
                        </div>
                        </div>
                    </div>
                } */}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userName: state.CIPReducer.userName,
        tabSelected: state.CIPReducer.tabSelected,
        TAChanged: state.CIPReducer.TAChanged,
        obj: state.CIPReducer.obj,
        searchKeyword: state.SavedSearchesModalReducer.searchKeyword
    };
}
export default connect(mapStateToProps)(withStyles(styles)(CompetitorView));
