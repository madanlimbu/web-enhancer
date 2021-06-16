# Image Video Downloader

Useful snippet to help easily navigate and download image/video assets. 

## Getting started

Copy the script from `index.js` file and get the element name that is used in side to navigate.

Replace following with appropriate selectors:
- `IMAGE_ELEMENT_SELECTOR`, 
- `VIDEO_ELEMENT_SELECTOR`,
- `LEFT_BTN_SELECTOR`,
- `RIGHT_BTN_SELECTOR`

If you are hosting your own PROXY server to bypass cors error. Then replace `PROXY` variable with your URL.

You can clone https://github.com/Rob--W/cors-anywhere and run it locally to create PROXY server.


## Example use-cases

### https://scrolller.com/

- `IMAGE_ELEMENT_SELECTOR: img.fullscreen-view__media`,
- `VIDEO_ELEMENT_SELECTOR: video.vertical-view__media, video.fullscreen-view__media`