import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { faLockOpen, faLock, faUser, faTags, faTag, faBookmark, faUserTag, faShareAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoRecordFoundMessage from '../NoRecordFoundMessage/NoRecordFoundMessage';
function TabComponent({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabComponent.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

class FullWidthTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
            {/* heght of positive/negative card */}
                {/* <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        {this.props.tabArray.map((tab, index) => (
                            <Tab label={Object.keys(tab)} />
                        ))}

                    </Tabs>
                </AppBar> */}
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}>
                    {this.props.tabArray.map((tab, index) => (
                        <TabComponent dir={theme.direction}>
                            <div>
                                {(tab[Object.keys(tab)].length > 0) &&
                                    <div className="contentList">
                                        {tab[Object.keys(tab)].map((value, index1) => (
                                            <div>
                                                {/* {
                                                    value.title !== undefined &&
                                                    <div><span title={value.title}>{value.title}</span> <a target="_blank" href={value.link}>See More</a>
                                                    <Divider/>
                                                    </div>
                                                } */}
                                                {
                                                    value.title !== undefined &&
                                                    <div className="linkContainer">
                                                        < FontAwesomeIcon icon={faLock} />
                                                        <a title={value.title} target="_blank" href={value.link}>{value.title}</a>
                                                        <p className="datePublicationSourceWrapper margin0"><span>Source: {value.source}</span><span class="pull-right">{value.pubDate}</span></p>
                                                        <Divider />
                                                    </div>
                                                }
                                            </div>
                                        )
                                        )
                                        }
                                    </div>
                                }
                                {tab[Object.keys(tab)].length === 0 &&
                                    <NoRecordFoundMessage/>
                                }
                            </div>
                        </TabComponent>
                    ))}
                </SwipeableViews>
            </div>
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
