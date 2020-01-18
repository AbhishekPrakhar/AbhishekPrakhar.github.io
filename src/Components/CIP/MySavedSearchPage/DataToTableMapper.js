import React from 'react';
import SavedSearchTable from './SavedSearchTable';

const search = (props) => props.savedSearchData.map((value, index) => {
  return <SavedSearchTable id={value.id} text={value.title} privatePublicField={value.privatePublicField} day={value.day} key={index} />
});

export default search;