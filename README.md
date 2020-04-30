# Streaming Metadata

[![Streaming Metadata CI](https://github.com/chances/streaming-metadata/workflows/Streaming%20Metadata%20CI/badge.svg)](https://github.com/chances/streaming-metadata/actions)
[![npm version](https://badge.fury.io/js/streaming-metadata.svg)](https://www.npmjs.com/package/streaming-metadata)
[![dependencies Status](https://david-dm.org/chances/streaming-metadata/status.svg)](https://david-dm.org/chances/streaming-metadata)
[![devDependencies Status](https://david-dm.org/chances/streaming-metadata/dev-status.svg)](https://david-dm.org/chances/streaming-metadata?type=dev)

Metadata widget for OBS' Browser Source.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chances/streaming-metadata)

![screenshot](https://github.com/chances/streaming-metadata/blob/master/media/example.png?raw=true)

## Usage

1. Deploy a clone or fork of this repo. Alternatively, you can [serve the repo locally](#Development).
2. Create a Browser source in OBS and set its URL to your deployed URL.
3. Customize the size of metadata by changing the Browser source's Custom CSS:

    ```css
    #title { font-size: 60px; }
    #description { font-size: 30px; }
    ```

## Development

Serve the widget locally, run `npm start`.

The URL of the widget will be copied to your clipboard.

## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright &copy; 2020 Chance Snow. All rights reserved.
