import NextVideo from 'next-video';

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