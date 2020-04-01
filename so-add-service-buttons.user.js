// ==UserScript==
// @name         SO: Add [Service Visit] and [Spring Turn On] to Visits
// @namespace    https://github.com/oasislandscape/
// @version      0.1.0
// @run-at       document-idle
// @description  This script adds buttons to add service visits and spring turn ons to Visits.
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com//
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-add-service-buttons.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-add-service-buttons.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

function inside_button_group(buttons) {
    return '<div class="btn-group mobile-btn-larger">' + buttons + '</div>';
}
function addIrrigationButton(jNode) {
    var client_id = $("div.row.col-md-3.col-xs-0--no-padding").find('a[href*="/clients/"]').attr('href').replace(/\/clients\/(\d+)/,'$1');

    var service_visit_html = '<a class="btn-primary btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=306094&amp;visit_stage_id=4">+ Service Visit</a>';
    var spring_turn_on_html = '<a class="btn-success btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=360631&amp;visit_stage_id=4">+ Spring Turn-On</a>';
    var spacer = '&nbsp;&nbsp;';

    var insertion = jNode.find('div').first().prepend(inside_button_group(service_visit_html + spring_turn_on_html + spacer));

}
waitForKeyElements("div.xs-no-float.col-xs-12.col-sm-0.pull-right.job-show-buttons", addIrrigationButton);
