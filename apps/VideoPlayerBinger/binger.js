(function(root, factory){
    if(typeof define === 'function' && define.amd){
        // AMD
        define([], factory(root));
    }else if (typeof exports === 'object'){
        // Node, CommonjS
        module.exports = factory(root);
    }else{
        // Browser globals
        root.binger = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {
    // Plugin/Module Code

    'use strict';

    //Object for public APIs
    var binger = {};

    //Global Variables Used across the plugin
    var settings;

    //Default settings
    var defaults = {
        videoPlayer : '#player-container',
        videoWrapper : '.cinematic-wrapper-col',
        hiderId : 'madan_hider',
        hiderHide : 'madan_hider_hide',
        hiderShow : 'madan_hider_show',
        madanVideoWrapper : 'madan_video_wrapper',
        madanVideoPlayer : 'madan_main_video'
    };

    /**
     * Initialize Plugin
     * @public
     * @param options
     */
    binger.init = function (options) {
        //Code to run on Initialization of Plugin

        //    utilReady(function () {
        //Merge default and passed argument to set settings
        if(arguments[0] && typeof arguments[0] === 'object'){
            settings = utilExtendSettings(defaults, arguments[0]);
        }else{
            settings = defaults;
        }

        //Hider Element Created
        startBinging();

        //Listen for mouseover and mouseleave event to hide and show other contents
        ['mouseover', 'mouseleave'].forEach((e) => {
            document.addEventListener(e, eventHandler);
        });

        //  });
    };

    /**
     * Util function to Merge defaults and passed property from argument
     * @param defaults
     * @param extra
     * @returns {*}
     */
    var utilExtendSettings = function (source, properties) {
        var property;
        for(property in properties){
            if(properties.hasOwnProperty(property)){
                source[property] = properties[property];
            }
        }
        return source;
    };


    /**
     * Util function to wait till DOM is ready to run the passed function
     * @param fn
     * @returns {*}
     */
    var utilReady = function(fn){
        //Check to make sure function is passed
        if(typeof fn !== 'function') return;

        //if document is already loaded, run function
        if(document.readyState === 'complete'){
            return fn();
        }

        //Else, wait till document is loaded
        document.addEventListener('DOMContentLoaded', fn, false);
    };

    /**
     * Event Handler
     * @private
     * @param event
     */
    var eventHandler = function(event) {
        var hider = document.getElementById(settings.hiderId);

        //Check Type of Event and Element to handle event
        if(event.type === 'mouseover' ){
            //Show Hidden Content
            hider.style.display = 'none';
            removeClasses();
        }
        if(event.type === 'mouseleave'){
            //Hide Content Other Content
            hider.style.display = 'block';
            addClasses();
        }
    };

    var startBinging = function () {
        var hider = document.createElement('div');
        var body = document.querySelector('body');
        hider.id = settings.hiderId;
        body.appendChild(hider);
        addClasses();
    }

    var addClasses = function () {
        var videoPlayer = document.querySelector(settings.videoPlayer);
        var videoWrapper = document.querySelector(settings.videoWrapper);

        if(!!videoPlayer){
            videoPlayer.className += ' ' + settings.madanVideoPlayer;
        }
        if(!!videoWrapper){
            videoWrapper.className += ' ' + settings.madanVideoWrapper;
        }
    }

    var removeClasses = function () {
        var videoPlayer = document.querySelector(settings.videoPlayer);
        var videoWrapper = document.querySelector(settings.videoWrapper);
        if(!!videoPlayer) {
            videoPlayer.classList.remove(settings.madanVideoPlayer);
        }
        if(!!videoWrapper) {
            videoWrapper.classList.remove(settings.madanVideoWrapper);
        }
    }


    //Return Object to be accessed from outside
    return binger;
});