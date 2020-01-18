import React from 'react'
import styled from 'styled-components'
import Task from './task'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px 0px 8px;  
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`
const TaskList = styled.div`
  padding: 8px;
  margin: 0px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? '#ececec' : 'white'}
  flex-grow: 1;
  min-height: 100px;  
  border: 1px solid #ededed;
  border: 1px solid #b0b0b0;
  font-size:10px;
`

const TitleContainer = styled.div`
  border-radius:5px;
  background-color: #28254d;
  border: 1px solid #B0B0B0;  
  margin: 5px;
  height:38px;
  padding-top: 7px;
  font-size: 16px;
  text-align: center;
  font-weight:bold;
  color: #ffffff;
  -webkit-box-shadow: 0px 2px 7px -2px rgba(51,51,51,1);
  -moz-box-shadow: 0px 2px 7px -2px rgba(51,51,51,1);
  box-shadow: 0px 2px 7px -2px rgba(51,51,51,1);
`

export default class Column extends React.Component {

  render() {
    return (
      <Container>
        <Droppable key={this.props.column.id} droppableId={this.props.column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {
                this.props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))
              }
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        <div className="yearBoxWrapper">
          <TitleContainer>
            {this.props.column.title}
          </TitleContainer>
        </div>
      </Container>
    )
  }
}
