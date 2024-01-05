import NextVideo from 'next-video';

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