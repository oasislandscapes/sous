// ==UserScript==
// @name         SO: Press [ENTER] to submit timesheet changes.
// @namespace    https://github.com/oasislandscape/
// @version      0.2.0
// @run-at	 document-idle
// @description  This script saves and closes timesheets event edits when you press enter.
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com//
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-enter-submits-timesheet-event.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-enter-submits-timesheet-event.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

document.addEventListener('keydown', enterKeyOnTimesheets);

function enterKeyOnTimesheets(evt) {
    evt = evt || window.event;
    var isEnter = false;
    if ("key" in evt) {
        isEnter = (evt.key === "Enter");
    } else {
        isEnter = (evt.keyCode === 13);
    }
    if (isEnter) {
        var topmost_timesheet_window = $('button.btn-primary.submit-timesheet-event');
        if (topmost_timesheet_window.length != 0) topmost_timesheet_window.trigger('click');
    }
}

// (function() {
//     'use strict';

// document.onkeydown = function(evt) {
//     evt = evt || window.event;
//     var isEnter = false;
//     if ("key" in evt) {
//         isEnter = (evt.key === "Enter");
//     } else {
//         isEnter = (evt.keyCode === 13);
//     }
//     if (isEnter) {
//         var topmost_timesheet_window = $('button.btn-primary.submit-timesheet-event');
//         if (topmost_timesheet_window.length != 0) topmost_timesheet_window.trigger('click');
//     }
// };
// })();