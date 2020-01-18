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
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TabComponent from '../TabComponent/TabComponent';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faCompressArrowsAlt,faFilePdf,faFileExcel,faFilePowerpoint,faDownload, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as types from '../../../../Actions/ActionTypes';
import Button from '@material-ui/core/Button';
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
        padding: "0"
    }
};
Modal.setAppElement('#root');
const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
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

class CardWithTabsComponent extends React.Component {
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
                pdf.save(this.props.identifier+".pdf");
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
                imgData = ( imgData.replace("data:", ""));
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
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const csvData = this.props.tabArray;
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
                <MenuItem onClick={this.handleMenuClose}><FontAwesomeIcon className="marginRight5" icon={faFileExcel} /> <CSVLink data={csvData}>Excel</CSVLink></MenuItem>
                {/* <MenuItem onClick={this.handleMenuClose}>Filter</MenuItem> */}
                <MenuItem onClick={this.downloadPDF}><FontAwesomeIcon className="marginRight5" icon={faFilePdf} /> PDF</MenuItem>
                <MenuItem onClick={this.downloadPPT}><FontAwesomeIcon className="marginRight5" icon={faFilePowerpoint} /> PPT</MenuItem>
                <MenuItem onClick={this.handleMenuClose}><FontAwesomeIcon className="marginRight5" icon={faTrash} />Delete</MenuItem>
            </Menu>
        );
        return (
            <div className="CardWithinTabWrapper" id={this.props.identifier}>
                <Card className={classes.card}>
                    <CardHeader
                        action={
                            <div className="iconsWrapper">
                                <div className="expandShrinkWrapper" onClick={this.openModal}> 
                                    <FontAwesomeIcon icon={faExpandArrowsAlt} />
                                </div>
                                <IconButton
                                    onClick={this.openModalSettings}
                                    color="inherit"
                                >
                                    <SettingsIcon />
                                </IconButton>
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
                            <div className="tabComponentWrapper">
                                <TabComponent tabArray={this.props.tabArray} />
                            </div>
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
                            <Card className="CardWithinTabWrapper">
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
                                        <div className="tabComponentWrapper">
                                            <TabComponent tabArray={this.props.tabArray} />
                                        </div>
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
                        <Card className={classes.card}>
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

CardWithTabsComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardWithTabsComponent);

