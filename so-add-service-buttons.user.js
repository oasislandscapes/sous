// ==UserScript==
// @name         SO: Add [BUTTONS] to Visits
// @namespace    https://github.com/oasislandscape/
// @version      0.1.5
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
    var client_id = $("html").find('a[href!="/clients/new"][href*="/clients/"]').attr('href').replace(/\/clients\/(\d+)/,'$1');

//    var twoymp = '';
    var twoymp = '<a class="btn-primary btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=1800990&amp;visit_stage_id=4">+ 2YMP</a>';

    var ao = '';
//    var ao = '<a class="btn-success btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=559422&amp;visit_stage_id=6">+ A&O</a>';

//    var flowers = '';
    var flowers = '<a class="btn-danger btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=377663&amp;visit_stage_id=6">+ FLOWERS</a>';

    var chems = '';
//    var chems = '<a class="btn-danger btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=1548434&amp;visit_stage_id=4">+ CHEM</a>';

//    var pinestraw = '';

    var pinestraw = '<a class="btn-success btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=306131&amp;visit_stage_id=6">+ PS</a>';
//    var mulch_brown = '';

    var mulch_brown = '<a class="btn-primary btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=387863&amp;visit_stage_id=6">+ BROWN</a>';
//    var mulch_black = '';

    var mulch_black = '<a class="btn-danger btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=387950&amp;visit_stage_id=6">+ BLACK</a>';

    var service = '<a class="btn-primary btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=306094&amp;visit_stage_id=4">+ SVC</a>';

//    var sto_pp_html = '';
    var sto_pp_html = '<a class="btn-success btn btn-sm col-xs-6 col-sm-4 col-sm-0" target="_new" href="/jobs/new?client_id=' + client_id + '&amp;template_id=1801036&amp;visit_stage_id=4">+ STO: PP</a>';

    var spacer = '&nbsp;&nbsp;';

    var insertion = jNode.find('div').first().prepend(inside_button_group(flowers + pinestraw + mulch_brown + mulch_black + twoymp + ao + chems + sto_pp_html + service + spacer));

}
waitForKeyElements("div.xs-no-float.col-xs-12.col-sm-0.pull-right.job-show-buttons", addIrrigationButton);
