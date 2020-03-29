// ==UserScript==
// @name         SO: Promote 'Arrive Before' and 'Arrive After' custom fields to the top of visits and jobs (and add edit link).
// @namespace    https://github.com/oasislandscape/
// @version      0.2.0
// @run-at	 document-idle
// @description  This changes JOB and VISIT titles to add a link to edit the visit, and add time window information.
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com//
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-jobs-modify-header.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-jobs-modify-header.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

function injectEditVisit (jNode) {
    var visit_id = jNode.attr('data-visit-id');
    var ticket = jNode.text().match(/\#(\d+-?\d*)/gi);
    var after = jNode.find('td:contains("Arrive After")').next().text().trim();
    var before = jNode.find('td:contains("Arrive Before")').next().text().trim();

    if (after == "No value") { after = null };
    if (before == "No value") { before = null };


    console.log("after " + after);
    console.log("before " + before);
    console.log("SO" + ticket + " -> " + visit_id);

    /* CHANGE THE EDIT BUTTON ON JOBS TO OPEN IN A NEW TAB */
    var inject_job_edit_target = jNode.find("a.btn-warning.btn.btn-sm.col-xs-6.col-sm-4.col-sm-0");
    inject_job_edit_target.attr('target','_blank');

    /* CHANGE THE VISIT ID (#nnnn-nn) to link to EDIT VISIT -- originally this was to workaround a bug, but now I'm just leaving this here in case it's convenient */
    var inject_visit_edit = jNode.find("div.col-md-12.xs-no-float.col-xs-12.col-sm-0.job-name.text-center.pull-left");
    var result = inject_visit_edit.html().replace(/\#(\d+-?\d*)/gi, '<a href="https://app.singleops.com/visits/' + visit_id + '/edit" target="_blank">#$1</a>');
    inject_visit_edit.html(result);

    /* ADD THE TIME WINDOW INFORMATION (normally at the bottom of the tickets) to the top by the job name) */
    if (after && before) $('<div class="col-md-12 xs-no-float col-xs-12 col-sm-0 job-name text-center pull-left injected"><strong>' + after + ' to ' + before + '</strong></div>').insertAfter(inject_visit_edit);
    else if (after && !before) $('<div class="col-md-12 xs-no-float col-xs-12 col-sm-0 job-name text-center pull-left injected"><strong>after ' + after +'</strong></div>').insertAfter(inject_visit_edit);
    else if (!after && before) $('<div class="col-md-12 xs-no-float col-xs-12 col-sm-0 job-name text-center pull-left injected"><strong>before ' + before +'</strong></div>').insertAfter(inject_visit_edit);
}

waitForKeyElements ("div.visit-details", injectEditVisit);