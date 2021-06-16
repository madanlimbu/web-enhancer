# Video Player Binger
JS Module to Help binging 

### Purpose
- Hides all unwanted elements from browser.
- Usually used when watching video to hide unwanted elements.
- On hover brings back normal webapge.

### Usage
Usually used with chrome extensions or mozila addons.

- Import the module and add css.
- Module Public Object/API is "binger".
- call binger.init(); function. 


Default options set for youtube videos.

If we want to use it on other webpages.
Find the video element and (optional video-wrapepr).
Set the element names by passing as argument in binger.init() function.

Example :

binger.init({ videoPlayer : '#player-container' });

### Extra

Some famous video sites - video elements :

viki.com : #video_player

youtube.com : #player-container

gogoanimes.tv : #load_anime


####Todos:
- Support for extending functions 
- More sanity checks 
- More Automation of checking video player in any Web-page 
- Create Implement with Chrome Extension with easy UI to set player element