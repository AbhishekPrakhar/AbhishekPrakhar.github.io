import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { SavesearchKeyword, setCurrentView } from '../../../../Actions/ActionSearchFunction';
import * as types from '../../../../Actions/ActionTypes';
import { connect } from 'react-redux';
import HeaderAutosuggest from '../../../../json/autosuggest.json';
import Products from '../../../../json/products.json';
import { store } from "../../../../Store/Store";
let therapeuticAreas = [
    {
        "title":types.SELECT
     },
     {
        "title":types.ONCOLOGY
     },
     {
        "title":types.IMMUNOLOGY
     },
     {
        "title":types.CARDIOVASCULAR
     },
     {
        "title":types.METABOLIC
     }]

var suggestions;

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField className="autoSuggestSearchBox"
            InputProps={{
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.title) > -1;
    return (
        <MenuItem
            {...itemProps}
            key={suggestion.title}
            selected={isHighlighted}
            component="div"
            style={{
                fontSize: '12px',
                fontWeight: isSelected ? 500 : 400,
                padding: '2px 0px 2px 2px'
            }}

        >
            {suggestion.title}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {

            const keep =
                count < 5 && suggestion.title.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }
            return keep;
        });
}


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        flexGrow: 1,
        position: 'relative',
        fontSize:'12px',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

let popperNode;

class IntegrationAutosuggestHeader extends React.Component {
    assignSearchTerm(selectedItem) {
        if (this.props.type === "header") {
            this.props.dispatch(SavesearchKeyword(selectedItem));
            this.props.dispatch(setCurrentView(types.SEARCH));
        }
        if (this.props.type === "competitorView") {
            store.dispatch(setCurrentView(types.COMPETITORVIEW, { "userName": "", "tabSelected": 2, "TAChanged": selectedItem }));
        }
        if(this.props.type==="diseaseArea"){
            //this.props.dispatch(SavesearchKeyword(selectedItem));
            //store.dispatch(setCurrentView(types.HOME, {"userName":"","tabSelected":2,"TAChanged": selectedItem}));
            store.dispatch(setCurrentView(types.THERAPEUTICAREAVIEW, { "TAChanged": selectedItem }));
        //TAChanged = event.target.value;
          //  this.props.dispatch(setCurrentView(types.SEARCH));
        }
    }
    render() {
        const { classes } = this.props;
        if (this.props.type === "header") {
            suggestions = HeaderAutosuggest;
        }
        return (
        <div className={classes.root}>
            <Downshift id="downshift-simple">
                    {({
                        getInputProps,
                        getItemProps,
                        getMenuProps,
                        highlightedIndex,
                        inputValue,
                        isOpen,
                        selectedItem
                    }) => (
                            <div className={classes.container}>
                                {renderInput({
                                    fullWidth: true,
                                    classes,
                                    InputProps: getInputProps({
                                        placeholder: 'Search...',
                                    }),
                                })}
                                <div {...getMenuProps()}>
                                    {isOpen ? (
                                        <Paper className={classes.paper} square>
                                        <div>{getSuggestions(inputValue).length>0 ?
                                             getSuggestions(inputValue).map((suggestion, index) =>
                                                renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({ item: suggestion.title }),
                                                    highlightedIndex,
                                                    selectedItem
                                                }),
                                            ) : 
                                            <MenuItem>
                                            {"No Suggestions Found"}
                                        </MenuItem>
                                             } 
                                            
                                            </div> 
                                        </Paper>
                                    ) : null}
                                </div>
                                {(selectedItem !== null) ? this.assignSearchTerm(selectedItem) : null}

                            </div>
                        )}

                </Downshift>
            </div>
        );


    }
}

IntegrationAutosuggestHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        searchKeyword: state.SavedSearchesModalReducer.searchKeyword,
    };
}
export default connect(mapStateToProps)(withStyles(styles)(IntegrationAutosuggestHeader));
