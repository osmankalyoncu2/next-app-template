import * as React from 'react';

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
