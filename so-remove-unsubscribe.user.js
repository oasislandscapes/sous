// ==UserScript==
// @name         SO: Remove [UNSCHEDULE] from Visits
// @namespace    https://github.com/oasislandscape/
// @version      0.1.1
// @run-at       document-idle
// @description  This script deletes the UNSCHEDULE button which should not be used.
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com//
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-remove-unsubscribe.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-remove-unsubscribe.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

function inside_button_group(buttons) {
    return '<div class="btn-group mobile-btn-larger">' + buttons + '</div>';
}
function hideUnscheduleButton(jNode) {
    jNode.hide();

}
waitForKeyElements("button#visit-unschedule.btn.btn-danger.col-xs-6", hideUnscheduleButton);
