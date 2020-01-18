import React from 'react'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import initialData from './initial-data'
import Column from './column'
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import { setCurrentView } from '../../../Actions/ActionSearchFunction';
import * as types from '../../../Actions/ActionTypes';
import { store } from "../../../Store/Store";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './LaunchEstimates.css'
import BreadCrumbs from '../GenericComponents/BreadCrumbs/breadCrumbs';
const Container = styled.div`
  display: flex;
  min-height: 480px;
`

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing.unit / 2,
    width: 20,
    height: 20
  },
});

class LaunchEstimate extends React.Component {
  state = initialData

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

  handleClick = (event) => {
    event.preventDefault();
    store.dispatch(setCurrentView(types.HOME, { "userName": null, "tabSelected": 0 }));
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className="breadCrumbWrapper">
        <BreadCrumbs ComponentName='Launch Estimates'  TabName='Disease Area' TabValue ='1' PageName = 'View Launch Estimate'/>
        </div>
        <div className="launchEstimatesContainer">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Container>
              {this.state.columnOrder.map(columnId => {
                const column = this.state.columns[columnId]
                const tasks = column.taskIds.map(
                  taskId => this.state.tasks[taskId]
                )

                return (
                  <Column key={column.id} column={column} tasks={tasks} />
                )
              })}
            </Container>
          </DragDropContext>
        </div>
      </div>
    )
  }
}

LaunchEstimate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(LaunchEstimate));