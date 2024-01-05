import Video from 'next-video';

export default function Video({
    src = null,
    ...props
}) {
    if (!src) {
        return null;
    }

    return (
        <Video
            src={src}
            {...props}
        />
    );
}