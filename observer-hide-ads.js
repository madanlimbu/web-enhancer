//https://www.flvto.biz/
//Use MutationObserver to hide iframe once it is added to dom. 

// Select the node that will be observed for mutations
const targetNode = document;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const iframes = document.querySelectorAll('iframe');
            for(let iframe of iframes) {
            	iframe.style.display = 'none';
            }
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
