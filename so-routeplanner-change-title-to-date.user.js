// ==UserScript==
// @name         SO: On route planner, change <title> to view multiple days at once in tabs.
// @namespace    https://github.com/oasislandscape/
// @version      0.2.0
// @run-at	 document-idle
// @description  Changes the <title> field on Route Planner to be the date you're viewing (after refresh).
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com/visits/route_planner/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-routeplanner-change-title-to-date.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-routeplanner-change-title-to-date.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

function injectDateInTitle(jNode) {
    //var date = jNode.attr('data-date');
    var date = jNode.html();
    console.log(date);
    var title = jNode.closest('html').find('title');
    var result = "SingleOps - " + date;
    title.html(result);
}

waitForKeyElements("span.planner-date-display", injectDateInTitle);
