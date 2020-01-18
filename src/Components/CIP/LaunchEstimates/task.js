import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid #B0B0B0;
  padding: 8px;
  margin-bottom: 8px;
  color: ${props =>
    props.isDragging
      ? '#b7b2b2'
      : '#ffffff'};
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDragging
      ? '#F5E356'
      : '#484668'};
`

export default class Task extends React.Component {
  render() {
    const isDragDisabled = this.props.task.id === 'task-10'
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={false}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    )
  }
}
