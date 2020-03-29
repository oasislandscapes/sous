// ==UserScript==
// @name         SO: Press [ESC] to close popup windows
// @namespace    https://github.com/oasislandscape/
// @version      0.2.0
// @run-at	 document-idle
// @description  This script closes modal popup windows of many kinds.
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com//
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-esc-closes-popups.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-esc-closes-popups.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */


/*
 * This keyboard handler makes the ESCAPE key on the keyboard close the topmost modal or popup window.
 *
 * In the route planner, it closes the most recently opened address card.
 * In the calendar, it closes the most recently opened visit card.
 * It also closes the timesheet modal popup.
 * It also closes stacked popups (a popup of one kind above a popup of another kind).
 * It closes basically anything with an X on the top right.
*/

document.addEventListener('keydown', closeModalWindow);

function closeModalWindow(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        var topmost_popup_window = $('button.bootbox-close-button.close:last');
        if (topmost_popup_window.length != 0) topmost_popup_window.trigger('click');
        var topmost_route_popup = $('button.gm-ui-hover-effect').filter( function(){ return $(this).css('height') == '30px'; } ).filter (':last');
        if (topmost_route_popup.length != 0) topmost_route_popup.trigger('click');
    }
}

// (function() {
//     'use strict';

// document.onkeydown = function(evt) {
//     evt = evt || window.event;
//     var isEscape = false;
//     if ("key" in evt) {
//         isEscape = (evt.key === "Escape" || evt.key === "Esc");
//     } else {
//         isEscape = (evt.keyCode === 27);
//     }
//     if (isEscape) {
//         var topmost_popup_window = $('button.bootbox-close-button.close:last');
//         if (topmost_popup_window.length != 0) topmost_popup_window.trigger('click');
//         var topmost_route_popup = $('button.gm-ui-hover-effect').filter( function(){ return $(this).css('height') == '30px'; } ).filter (':last');
//         if (topmost_route_popup.length != 0) topmost_route_popup.trigger('click');
//     }
// };
// })();