import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChartWrapper from '../Chart/ChartWrapper';
import Assignment from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper';
import '../Chart/Chart.css';
import PieChart from '../Chart/PieChart';
import ApexDonutChart from '../../GenericComponents/ApexCharts/ApexDonutChart';
import StackedBarChart from '../Chart/StackedBarChart';
import WordCloud from '../WordCloud/Cloud';
import MultiAxisChart from '../Chart/MultiAxisChart';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrowsAlt, faCompressArrowsAlt,faFilePdf,faFileExcel,faFilePowerpoint,faDownload, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import DoughnutChart from '../Chart/DoughnutChart';
import BarChart from '../Chart/BarChart';
import StackedColumnChart from '../Chart/StackedColumnChart';
import RangeBarChart from '../Chart/RangeBarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import * as types from '../../../../Actions/ActionTypes';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { setCurrentView } from '../../../../Actions/ActionSearchFunction';
import { store } from "../../../../Store/Store";
import LaunchEstimate from '../../LaunchEstimates/LaunchEstimate'
import { CSVLink, CSVDownload } from "react-csv";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.setBrowser(true);
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '0'
    }
};
Modal.setAppElement('#root');


const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class CardWithChartComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            expanded: true, anchorEl: null,
            modalIsOpenSettings: false,
            checked: []
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalSettings = this.openModalSettings.bind(this);
        this.afterOpenModalSettings = this.afterOpenModalSettings.bind(this);
        this.closeModalSettings = this.closeModalSettings.bind(this);
        this.downloadPDF = this.downloadPDF.bind(this);
        this.downloadPPT = this.downloadPPT.bind(this);
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handleVerticalIcon = () => {
    }
    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleMenuClose = (event) => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };
    downloadPDF() {
        const input = document.getElementById(this.props.identifier);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.save(this.props.identifier + ".pdf");
            });
        ;
    }
    downloadPPT() {
        this.handleMenuClose();
        const input = document.getElementById(this.props.identifier);
        var imgData;
        html2canvas(input)
            .then((canvas) => {
                imgData = canvas.toDataURL('image/png');
                // document.getElementById('img')
                //     .setAttribute(
                //         'src', imgData
                //     );
                imgData = (imgData.replace("data:", ""));
                const slide = pptx.addNewSlide();
                slide.addImage({ data: imgData, x: 0, y: 0, w: 6.0, h: 3.0 });
                pptx.save(this.props.identifier + ".ppt");
            });
    }
    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    openModalSettings() {
        this.setState({ modalIsOpenSettings: true });
    }

    afterOpenModalSettings() {
        // references are now sync'd and can be accessed.
        //        this.subtitle.style.color = '#f00';
    }

    closeModalSettings() {
        this.setState({ modalIsOpenSettings: false });
    }
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handleVerticalIcon = () => {
    }
    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleMenuClose = (event) => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };
    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };


    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    handleVerticalIcon = () => {
    }
    landToClinicalTrialDashboard() {
        store.dispatch(setCurrentView(types.HOME, { "tabSelected": 5 }));
    }
    landToPipelineDashboard() {
        store.dispatch(setCurrentView(types.HOME, { "tabSelected": 4 }));
    }
    landToDiseaseAreaPipelineView() {
        store.dispatch(setCurrentView(types.DISEASEAREAPIPELINEVIEW));
    }
    landToBrandViewClinicalTrial() {
        store.dispatch(setCurrentView(types.BRANDVIEWCLINICALTRIAL));
    }

    landToLaunchEstimateDashboard() {
        store.dispatch(setCurrentView(types.LAUNCHESTIMATE));
    }
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const csvData = this.props.chartArray;
        const sources = ["Fiercepharma", "Seekingalpha"];
        let therapeuticAreas = [types.ONCOLOGY, types.IMMUNOLOGY, types.CARDIOVASCULAR, types.METABOLIC];
        let brands = [types.PFIZER, types.BAYER, types.MERCK, types.GSK, types.AMGEN];
        const renderMenu = (
            <Menu className="homePageCardMenu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                {/* <MenuItem onClick={this.handleMenuClose}><FontAwesomeIcon className="marginRight5" icon={faDownload} /> <CSVLink data={csvData}>Excel</CSVLink></MenuItem> */}
                <MenuItem onClick={this.handleMenuClose} disabled={csvData!=undefined ? false :true}><FontAwesomeIcon className="marginRight5" icon={faFileExcel} />{csvData!=undefined ?<CSVLink data={csvData}>Excel</CSVLink>: "Excel"} </MenuItem>
                {/* <MenuItem onClick={this.handleMenuClose}>Filter</MenuItem> */}
                <MenuItem onClick={this.downloadPDF}><FontAwesomeIcon className="marginRight5" icon={faFilePdf} /> PDF</MenuItem>
                <MenuItem onClick={this.downloadPPT}><FontAwesomeIcon className="marginRight5" icon={faFilePowerpoint} /> PPT</MenuItem>
                <MenuItem onClick={this.handleMenuClose}><FontAwesomeIcon className="marginRight5" icon={faTrash} />Delete</MenuItem>
            </Menu>
        );
        return (
            <div className="CardWithinChartWrapper" id={this.props.identifier}>
                <Card className={classes.card}>
                    <CardHeader   className="CardHeaderWrapper"
                        action={
                            <div className="iconsWrapper">
                            {(this.props.title === "Pipeline" || this.props.title === "Clinical Trial" || this.props.title === "Launch Estimates" || this.props.title === "What's On"   || this.props.title === "Market Size")? null
                             /*changes for CI-94 by 1442613*/
                             : <div className="expandShrinkWrapper" onClick={this.openModal}>
                                    <FontAwesomeIcon icon={faExpandArrowsAlt} />
                                </div>}
                                {/* <div className="expandShrinkWrapper" onClick={this.openModal}>
                                    <FontAwesomeIcon icon={faExpandArrowsAlt} />
                                </div> */}
                                {/* changes for CI-123 by 1340730 */}
                                {(this.props.title === "What's On" || this.props.title ==="Pipeline")? null :<IconButton
                                    onClick={this.openModalSettings}
                                    color="inherit"
                                >
                                    <SettingsIcon />
                                </IconButton>}
								{/* changes for CI-123 by 1340730 */}
                                {/* <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton> */}
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                {renderMenu}
                            </div>
                        }
                        title={this.props.title}
                    />
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {(this.props.title === "Social Media Metrics") &&
                                <ChartWrapper identifier={this.props.identifier} chartArray={this.props.chartArray} />
                            }
                            {(this.props.title === "Clinical Trial" && this.props.type === "Competitor") &&
                                <div className="StackedBarChartWrapper" id={this.props.identifier}>
                                    <button className="viewDahboardBtn" onClick={this.landToBrandViewClinicalTrial}>View Dashboard</button>
                                    <div className="paperWrapper">
                                        <Paper >
                                            <div className="row margin0">
                                                <div className="col-sm-3 col-xs-12">
                                                    <div >
                                                        <p className="margin0"> COMPLETED</p>
                                                        <p className="margin0">5187</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 col-xs-12">
                                                    <div >
                                                        <p className="margin0"> ONGOING</p>
                                                        <p className="margin0">1896</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 col-xs-12">
                                                    <div >
                                                        <p className="margin0"> PLANNED</p>
                                                        <p className="margin0">340</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 col-xs-12">
                                                    <div >
                                                        <p className="margin0"> TERMINATED</p>
                                                        <p className="margin0">1143</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Paper >
                                    </div>
                                    <div className="row marginTop10">
                                        <div className="col-sm-5 col-xs-12">
                                            <DoughnutChart type={this.props.type} chartArray={this.props.chartArray} />
                                        </div>
                                        <div className="col-sm-7 col-xs-12 phasePercentageWrapper">
                                            {this.props.chartArray.map(phase => (
                                                <div>
                                                    <div className="row margin0">
                                                        <div className="col-xs-12 col-sm-8">
                                                            <span>{phase.name}</span>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-2">
                                                            <span>{phase.count}</span>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-2">
                                                            <span>{phase.percentage}%</span>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {(this.props.title === "Pipeline") &&
                                <div className="StackedBarChartWrapper">
                                    <button className="viewDahboardBtn" onClick={this.landToDiseaseAreaPipelineView}>View Dashboard</button>
                                    <div className="paperWrapper">
                                        <Paper >
                                            <div className="row margin0">
                                                <div className="col-sm-3 col-xs-12">
                                                    <div >
                                                        <p className="margin0"> COMPLETED</p>
                                                        <p className="margin0">5187</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 col-xs-12">
                                                    <div >
                                                        <p className="margin0"> ONGOING</p>
                                                        <p className="margin0">1896</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 col-xs-12">
                                                    <div >
                                                        <p className="margin0"> PLANNED</p>
                                                        <p className="margin0">340</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 col-xs-12">
                                                    <div >
                                                        <p className="margin0"> TERMINATED</p>
                                                        <p className="margin0">1143</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Paper >
                                    </div>
                                    <div className="row marginTop10">
                                        <div className="col-sm-6 col-xs-12">
                                            <DoughnutChart type={this.props.title} chartArray={this.props.chartArray} />
                                        </div>
                                        <div className="col-sm-6 col-xs-12 phasePercentageWrapper">
                                            {this.props.chartArray.map(phase => (
                                                <div>
                                                    <div className="row margin0">
                                                        <div className="col-xs-12 col-sm-8">
                                                            <span>{phase.phaseName}</span>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-2">
                                                            <span>{phase.count}</span>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-2">
                                                            <span>{phase.value}%</span>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {this.props.title === "Activities" &&
                                <div className="row">
                                    <div className="col-xs-12 col-sm-4">
                                        <div className="paperWrapper ExpertActivity">
                                            <Paper >
                                                <div className="iconWrapper">
                                                    <Assignment />
                                                </div>
                                                <p> Expert Reports</p>
                                                <p>40</p>
                                            </Paper>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-4">
                                        <div className="paperWrapper PressActivity">
                                            <Paper >
                                                <div className="iconWrapper ">
                                                    <Assignment />
                                                </div>
                                                <p> Press News</p>
                                                <p>89</p>
                                            </Paper>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-4">
                                        <div className="paperWrapper PublicationActivity">
                                            <Paper >
                                                <div className="iconWrapper">
                                                    <Assignment />
                                                </div>
                                                <p> Publication </p>
                                                <p>23</p>
                                            </Paper>
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.props.title === "Experts Observation" &&
                                <div>
                                    <PieChart />
                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {this.props.title === "What's On" &&
                                <div>
                                    <WordCloud type={this.props.type} />
                                </div>
                            }
                            {this.props.title === "Stock Chart" &&
                                <div className="StackedBarChartWrapper">
                                    <MultiAxisChart viewSource={this.props.viewSource} chartArray={this.props.chartArray} />
                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {(this.props.type === "Development Status" || this.props.type === "Clinical Trial Development Phase") &&
                                <div className={this.props.type === "Development Status" ? "DoughnutChartWrapper" : "clinicalTrialDevelopmentPhase"} style={{ display:"flex",justifyContent : "center"}}>
                                    {/* <DoughnutChart chartArray={this.props.chartArray} type={this.props.type} /> */}
                                    <ApexDonutChart chartArray={this.props.chartArray} type={this.props.type} width={this.props.width} /> 
                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {(this.props.title === "Development Phase" && this.props.type === "Phase") &&
                                <div className="BarChartWrapper">
                                    <BarChart chartArray={this.props.chartArray} type={this.props.type} />
                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {(this.props.title === "Top 10 Companies" && this.props.type === "Companies") &&
                                <div className="BarChartWrapper">
                                    <BarChart chartArray={this.props.chartArray} type={this.props.type} />
                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {(this.props.title === "Trials by Year") && //*changes for CI-104 by 1442613*//
                                <div className="StackedColumnChartWrapper">
                                    <StackedColumnChart chartArray={this.props.chartArray} />
                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {(this.props.title === "Trial Timeline") &&
                                <div className="RangeBarChartWrapper">
                                    <RangeBarChart chartArray={this.props.chartArray}/>
                                    <div className="hideChart1" >
                                    </div>
                                    <div className="hideChart2" >
                                    </div>
                                </div>
                            }
                            {(this.props.title === "Launch Estimates") && //*changes for CI-102 by 1442613*//
                                <div className="LaunchEstimateWrapper" id={this.props.identifier}>
                                    <button className="viewDahboardBtn" onClick={this.landToLaunchEstimateDashboard}>View Launch Estimates</button>
                                    <LaunchEstimate />
                                </div>
                            }
                            {(this.props.title === "Sales & Contribution" && this.props.type === "Sales & Contribution") &&
                                <div className="SalesContributionWrapper row" id={this.props.identifier}>
                                    <div className="col-xs-12 col-sm-6 marketSizeWrapper posRelative">
                                        <h1>2018 Market Size</h1>
                                        <BarChart type={this.props.type} chartArray={this.props.chartArray} />
                                        <div className="hideChart1" >
                                        </div>
                                        <div className="hideChart2" >
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 contributionWrapper posRelative">
                                        <h1>2018 Contribution</h1>
                                        <DoughnutChart type={this.props.type} chartArray={this.props.chartArray} />
                                        <table class="table-striped">
                                            <thead>
                                                <tr>
                                                    {this.props.chartArray.map((value, index) => (
                                                        <th>{value.country}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {this.props.chartArray.map((value, index) => (
                                                        <td>{value.value}</td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="hideChart1" >
                                        </div>
                                        <div className="hideChart2" >
                                        </div>
                                    </div>
                                </div>
                            }
                            {(this.props.title === "Market Size" && this.props.type === "Market Size") &&
                                <div className="marketSizeWrapper posRelative">
                                    <div className="paperWrapper">
                                        <Paper >
                                            <div className="row margin0">
                                                <div className="col-sm-4 col-xs-12">
                                                    <div >
                                                        <p> $998M</p>
                                                        <p>2018 Market Size</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-xs-12">
                                                    <div >
                                                        <p> 6%</p>
                                                        <p>2014-2018 CAGR</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-xs-12">
                                                    <div >
                                                        <p> -42%</p>
                                                        <p>2018-2024 Forecast</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Paper >
                                    </div>
                                </div>
                            }



                        </CardContent>
                    </Collapse>
                </Card>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className="cardContainer">
                        <div>
                            <Card className={classes.card}>
                                <CardHeader
                                    action={
                                        <div className="iconsWrapper">
                                            <div className="expandShrinkWrapper" onClick={this.closeModal}>
                                                <FontAwesomeIcon icon={faCompressArrowsAlt} />
                                            </div>
                                            {/* <IconButton
                                                className={classnames(classes.expand, {
                                                    [classes.expandOpen]: this.state.expanded,
                                                })}
                                                onClick={this.handleExpandClick}
                                                aria-expanded={this.state.expanded}
                                                aria-label="Show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton> */}
                                            <IconButton
                                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.handleProfileMenuOpen}
                                                color="inherit"
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            {renderMenu}
                                        </div>
                                    }
                                    title={this.props.title}
                                />
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        {(this.props.title === "Social Media Metrics") &&
                                            <ChartWrapper identifier={this.props.identifier} chartArray={this.props.chartArray} />
                                        }
                                        {(this.props.title === "Clinical Trial" && this.props.type === "Competitor") &&
                                            <div className="StackedBarChartWrapper">
                                                <button className="viewDahboardBtn" onClick={this.landToClinicalTrialDashboard}>View Dashboard</button>
                                                <div className="paperWrapper">
                                                    <Paper >
                                                        <div className="row margin0">
                                                            <div className="col-sm-3 col-xs-12">
                                                                <div >
                                                                    <p className="margin0"> COMPLETED</p>
                                                                    <p className="margin0">5187</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3 col-xs-12">
                                                                <div >
                                                                    <p className="margin0"> ONGOING</p>
                                                                    <p className="margin0">1896</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3 col-xs-12">
                                                                <div >
                                                                    <p className="margin0"> PLANNED</p>
                                                                    <p className="margin0">340</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3 col-xs-12">
                                                                <div >
                                                                    <p className="margin0"> TERMINATED</p>
                                                                    <p className="margin0">1143</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Paper >
                                                </div>
                                                <div className="row marginTop10">
                                                    <div className="col-sm-5 col-xs-12">
                                                        <DoughnutChart type={this.props.type} chartArray={this.props.chartArray} />
                                                    </div>
                                                    <div className="col-sm-7 col-xs-12 phasePercentageWrapper">
                                                        {this.props.chartArray.map(phase => (
                                                            <div>
                                                                <div className="row margin0">
                                                                    <div className="col-xs-12 col-sm-8">
                                                                        <span>{phase.name}</span>
                                                                    </div>
                                                                    <div className="col-xs-12 col-sm-2">
                                                                        <span>{phase.count}</span>
                                                                    </div>
                                                                    <div className="col-xs-12 col-sm-2">
                                                                        <span>{phase.percentage}%</span>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {(this.props.title === "Pipeline") &&
                                            <div className="StackedBarChartWrapper">
                                                <button className="viewDahboardBtn" onClick={this.landToPipelineDashboard}>View Dashboard</button>
                                                <div className="paperWrapper">
                                                    <Paper >
                                                        <div className="row margin0">
                                                            <div className="col-sm-3 col-xs-12">
                                                                <div >
                                                                    <p className="margin0"> COMPLETED</p>
                                                                    <p className="margin0">5187</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3 col-xs-12">
                                                                <div >
                                                                    <p className="margin0"> ONGOING</p>
                                                                    <p className="margin0">1896</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3 col-xs-12">
                                                                <div >
                                                                    <p className="margin0"> PLANNED</p>
                                                                    <p className="margin0">340</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3 col-xs-12">
                                                                <div >
                                                                    <p className="margin0"> TERMINATED</p>
                                                                    <p className="margin0">1143</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Paper >
                                                </div>
                                                <div className="row marginTop10">
                                                    <div className="col-sm-6 col-xs-12">
                                                        <DoughnutChart type={this.props.title} chartArray={this.props.chartArray}/>
                                                    </div>
                                                    <div className="col-sm-6 col-xs-12 phasePercentageWrapper">
                                                        {this.props.chartArray.map(phase => (
                                                            <div>
                                                                <div className="row margin0">
                                                                    <div className="col-xs-12 col-sm-8">
                                                                        <span>{phase.phaseName}</span>
                                                                    </div>
                                                                    <div className="col-xs-12 col-sm-2">
                                                                        <span>{phase.count}</span>
                                                                    </div>
                                                                    <div className="col-xs-12 col-sm-2">
                                                                        <span>{phase.value}%</span>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {this.props.title === "Activities" &&
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-4">
                                                    <div className="paperWrapper ExpertActivity">
                                                        <Paper >
                                                            <div className="iconWrapper">
                                                                <Assignment />
                                                            </div>
                                                            <p> Expert Reports</p>
                                                            <p>40</p>
                                                        </Paper>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-4">
                                                    <div className="paperWrapper PressActivity">
                                                        <Paper >
                                                            <div className="iconWrapper ">
                                                                <Assignment />
                                                            </div>
                                                            <p> Press News</p>
                                                            <p>89</p>
                                                        </Paper>
                                                    </div>
                                                </div>
                                                <div className="col-xs-12 col-sm-4">
                                                    <div className="paperWrapper PublicationActivity">
                                                        <Paper >
                                                            <div className="iconWrapper">
                                                                <Assignment />
                                                            </div>
                                                            <p> Publication </p>
                                                            <p>23</p>
                                                        </Paper>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {this.props.title === "Experts Observation" &&
                                            <div className="pieChartWrapper">
                                                <PieChart />
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {this.props.title === "What's On" &&
                                            <div>
                                                <WordCloud type={this.props.type} />
                                            </div>
                                        }

                                        {(this.props.title === "Stock Chart") &&
                                            <div className="StackedBarChartWrapper">
                                                <MultiAxisChart viewSource={this.props.viewSource} chartArray={this.props.chartArray} />
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {(this.props.type === "Development Status" || this.props.type === "Clinical Trial Development Phase") &&
                                            <div className={this.props.type === "Development Status" ? "DoughnutChartWrapper" : "clinicalTrialDevelopmentPhase"}>
                                                <DoughnutChart chartArray={this.props.chartArray} type={this.props.type} />
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {(this.props.title === "Development Phase" && this.props.type === "Phase") &&
                                            <div className="BarChartWrapper">
                                                <BarChart chartArray={this.props.chartArray} type={this.props.type} />
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {(this.props.title === "Top 10 Companies" && this.props.type === "Companies") &&
                                            <div className="BarChartWrapper">
                                                <BarChart chartArray={this.props.chartArray} type={this.props.type} />
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {(this.props.title === "Trials by Year") &&
                                            <div className="BarChartWrapper">
                                                <StackedColumnChart chartArray={this.props.chartArray} />
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {(this.props.title === "Trial Timeline") &&
                                            <div className="BarChartWrapper">
                                                <RangeBarChart chartArray={this.props.chartArray}/>
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        }
                                        {(this.props.title === "Launch Estimates") &&  //*changes for CI-102 by 1442613*//
                                            <div className="LaunchEstimateWrapper" id={this.props.identifier}>
                                                <button className="viewDahboardBtn" onClick={this.landToLaunchEstimateDashboard}>View Launch Estimates</button>
                                                <LaunchEstimate />
                                            </div>
                                        }
                                        {(this.props.title === "Sales & Contribution" && this.props.type === "Sales & Contribution") &&
                                        <div className="SalesContributionWrapper row" id={this.props.identifier}>
                                            <div className="col-xs-12 col-sm-6 marketSizeWrapper posRelative">
                                                <h4>2018 Market Size</h4>
                                                <BarChart type={this.props.type} chartArray={this.props.chartArray} />
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 contributionWrapper posRelative">
                                                <h4>2018 Contribution</h4>
                                                <DoughnutChart type={this.props.type} chartArray={this.props.chartArray} />
                                                <table class="table-striped">
                                                    <thead>
                                                        <tr>
                                                            {this.props.chartArray.map((value, index) => (
                                                                <th>{value.country}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            {this.props.chartArray.map((value, index) => (
                                                                <td>{value.value}</td>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="hideChart1" >
                                                </div>
                                                <div className="hideChart2" >
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    
                            {(this.props.title === "Market Size" && this.props.type === "Market Size") &&
                                <div className="marketSizeWrapper posRelative">
                                    <div className="paperWrapper">
                                        <Paper >
                                            <div className="row margin0">
                                                <div className="col-sm-4 col-xs-12">
                                                    <div >
                                                        <p> $998M</p>
                                                        <p>2018 Market Size</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-xs-12">
                                                    <div >
                                                        <p> 6%</p>
                                                        <p>2014-2018 CAGR</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-xs-12">
                                                    <div >
                                                        <p> -42%</p>
                                                        <p>2018-2024 Forecast</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Paper >
                                    </div>
                                </div>
                            }
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.modalIsOpenSettings}
                    onAfterOpen={this.afterOpenModalSettings}
                    onRequestClose={this.closeModalSettings}
                    style={customStyles}>
                    <div className="cardContainer settingsWrapper">
                        <Card className={classes.card} >
                            <CardHeader 
                                action={
                                    <div className="iconsWrapper">
                                        <div className="expandShrinkWrapper" onClick={this.closeModalSettings}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </div>
                                    </div>
                                }
                                title="Settings"
                            />
                            <CardContent>
                                <div className="SettingsSourceWrapper">
                                    <label>Sources:</label>

                                    {sources.map((source, index) => (
                                        <ListItem className={classes.item} role={undefined} dense button >
                                            <Checkbox color="primary" key={source} value={source} tabIndex={-1} disableRipple />
                                            <span>{source}</span>
                                            {/* <ListItemText primary={source} /> */}
                                        </ListItem>
                                    ))}

                                </div>
                                <div className="SettingsSourceWrapper">
                                    <label>Therapeutic Area:</label>
                                    {therapeuticAreas.map((therapeuticArea, index) => (
                                        <ListItem className={classes.item} role={undefined} dense button >
                                            <Checkbox color="primary" key={therapeuticArea} value={therapeuticArea} tabIndex={-1} disableRipple />
                                            <span>{therapeuticArea}</span>
                                            {/* <ListItemText primary={source} /> */}
                                        </ListItem>
                                    ))}

                                </div>
                                <div className="SettingsSourceWrapper">
                                    <label>Company:</label> 
                                    {brands.map((brand, index) => (
                                        <ListItem className={classes.item} role={undefined} dense button >
                                            <Checkbox color="primary" key={brand} value={brand} tabIndex={-1} disableRipple />
                                            <span>{brand}</span>
                                            {/* <ListItemText primary={source} /> */}
                                        </ListItem>
                                    ))}
                                </div>
                                <div className="row ModalActionButtonWrapper">
                                    <div className="col-xs-12 col-md-2 col-md-offset-10">
                                        <Button variant="contained" color="primary" className="orangeButton">
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* <div className="expandShrinkWrapper pull-right" onClick={this.closeModalSettings}>

                        </div> */}


                    </div>
                </Modal>
            </div>
        );
    }
}

CardWithChartComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardWithChartComponent);