import NextVideo from 'next-video';

// Prop Types
import PropTypes from 'prop-types'

Video.propTypes = {
    src: PropTypes.string,
};

export default function Video({
    src = null,
    ...props
}) {
    if (!src) {
        return null;
    }

    return (
        <NextVideo
            src={src}
            {...props}
        />
    );
}