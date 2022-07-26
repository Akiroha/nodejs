import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);

  function renderContent() {
    if (showFormReview) {
      return <SurveyFormReview onCancel={() => setShowFormReview(false)} />;
    }

    return <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />;
  }

  return <div>{renderContent()}</div>;
};

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
