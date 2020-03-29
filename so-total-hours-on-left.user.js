// ==UserScript==
// @name         SO: On calendar, show total hours on left (bug: refresh with calendar change)
// @namespace    https://github.com/oasislandscape/
// @version      0.2.1
// @run-at	 document-idle
// @description  This will sum up all of the combined hours for the visible crews and display them on the left side.
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com/visits/calendar/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-total-hours-on-left.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-total-hours-on-left.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

function injectHours (user,hours,jNode) {
    if (hours == 0.0) return;
    var user_name = jNode.find('span.fc-cell-text');
    var result = user_name.html().replace(/(.*)/, '$1 <strong>(' + hours.toFixed(2) + ' hrs)</strong>');
    user_name.html(result);
}

function getHourTotals(jNode) {
    console.log("getHourTotals:");

    var rows = jNode.find(".fc-rows").find("tr");

    console.log(rows);
    //var i = 0;

    var user_hours = [];


    rows.each( function (i) {
        var total = 0.0;
        //console.log("starting on row " + i + ": " + $(this).text()); i++;
        var entries = $(this).find('div.event-total');
        entries.each( function (j) {
            var hours = $(this).text().replace(/(\d*\.?\d*) hrs/, '$1');
            total += parseFloat(hours);
            //console.log("got hours: " + hours);
        });
        //console.log("total: " + total.toFixed(2));
        user_hours[i] = total;

    });

     var people = jNode.find('td.fc-resource-area.fc-widget-content').find('div.fc-cell-content');

    //people.each( function() { $(this).select('span.fc-cell-text').insertAfter(' - (x.xx hrs)')} );
    people.each( function(i) { injectHours(i, user_hours[i], $(this))} );

    //var hours_on_this_row = jNode.find('div.event-total');
    //console.log(hours_on_this_row);

    true;

}

waitForKeyElements("div.fc-view", getHourTotals, false);
