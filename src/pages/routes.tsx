import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './landing';
import TeacherList from './TeachersList';
import TeachersForm from './TeachersForm';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeachersForm} />
    </BrowserRouter>
  );
}

export default Routes;
