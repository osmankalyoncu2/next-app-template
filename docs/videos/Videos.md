# Videos with Make Next App

You may choose to use videos for your project for the purpose of helping users, showcasing features, or for marketing purposes.

This template uses the [next-video](https://next-video.dev/) component to make it easy to add videos to your project.

Note: `next-video` uses [Mux](https://mux.com/) to host videos. You will need to create a free account with Mux to use this component.

## Getting Started

To get started, you’ll need to create a free account with Mux. You can do so by visiting [https://mux.com/](https://mux.com/).

Then, you’ll need to create an access token. You can do so by visiting [https://dashboard.mux.com/settings/access-tokens](https://dashboard.mux.com/settings/access-tokens).

Once you’ve created an access token, you’ll need to add it to your `.env.local` file. You can do so by adding the following line to your `.env.local` file:

```bash
MUX_TOKEN_ID=[your token id]
MUX_TOKEN_SECRET=[your token secret]
```

To use the component, you’ll need to import the component from `@/components/Video` and provide the `src` prop.

The `src` prop should either be imported from `/videos` or a website URL.

```jsx
import Video from '@/components/Video';
import videoSrc from '/videos/video.mp4';

export default function Page() {
    return (
        <Video
            src={videoSrc}
        />
    );
}
```

## Syncing Videos

You can sync videos in your `/videos` directory with Mux by running the following command:

```bash
npm run sync-videos
```

Alternatively, you can run the following command to sync videos and start the development server:

```bash
npm run dev:sync
```

## Alternative Providers

Follow [this](https://next-video.dev/docs#hosting--processing-providers) guide to learn how to use alternative providers.