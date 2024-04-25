import * as React from 'react';

// Prop Types
import PropTypes from 'prop-types'

EmailTemplate.propTypes = {
    firstName: PropTypes.string.isRequired,
};

export const EmailTemplate = ({
    firstName,
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);
