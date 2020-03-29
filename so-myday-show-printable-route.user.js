// ==UserScript==
// @name         SO: Adjust 'My Day' page to support printable maintenence and enhancements route sheets.
// @namespace    https://github.com/oasislandscape/
// @version      0.2.0
// @run-at	 document-idle
// @description  Change the My Day page into a format which can be printed with customization.
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com/visits/my_day/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      http://momentjs.com/downloads/moment.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-myday-show-printable-route.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-myday-show-printable-route.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements, moment */

function timeConvert(n) {
var num = n;
var hours = (num / 60);
var rhours = Math.floor(hours);
var minutes = (hours - rhours) * 60;
var rminutes = Math.round(minutes);
    if (rhours == 0) return "  " + rminutes + "m";
    else return rhours + "h " + rminutes + "m";
}

function showSummary(jNode, stop, message, expected, note_add_hour) {
    jNode.append("<tr> <td class=\"hidden-sm hidden-xs\">" + stop + "</td><td data-th=\"Name\" class=\"table-responsive-one-column--single-item\" colspan=2>" + message + "</td><td>" + expected + "</td><td colspan=1>" + note_add_hour + "</td><td colspan=2>   <table><tr><td> <big><big><strong>SIGN, DATE<br> & TURN IN:</big></big></strong> </td><td></td></tr></table> </td></tr>")
}

function isEnhancementCrew() {
    const people = ['Mike Goodall', 'Drew Day', 'Darlene'];

    var any_person_is_enhancement_crew = false;

    people.forEach(user => {
        var person = $("h2:contains('" + user + "')");
        var is_enh_crew = (person.length == 1);
        var new_person = person.text().replace(user,"Enhancements Crew");
        if (is_enh_crew) {
            person.text(new_person);
            any_person_is_enhancement_crew = true;
        }
    });

    return any_person_is_enhancement_crew;
}

function processEstimatedTimes(jNode) {
    console.log("processEstimatedTimes()");
    var stops = jNode.find("td.collapse.in.estimated-time");

    console.log(stops);

    var total_minutes_for_today = 0;

    // replace Actions with Notes from Office
    $("th:contains('Actions')").replaceWith("<th>Notes From Office</th>");
    // replace Documents with Notes from Crew
    $("th:contains('Documents')").replaceWith("<th>Notes From Crew</th>");

    // move the map to the bottom of the page
    var map = $("div.col-md-9.col-sm-12");
    map.insertAfter("div#pad-wrapper");

    // hide the item list at the top
    $("div.col-md-3.route-item-list.col-sm-12").hide();

    // constrain the table to be the size of the paper we're printing it on, if it's big enough
    $("div#pad-wrapper").attr("style","width: 66.95vw !important");

    // align this table in the center so it lines up with the Visits and Tasks line
    $("table.table.responsive.table-striped.route-table").attr("align","center");

    // hide the row containing the word "Day"
    $("h4.text-center").hide();

    // hide the clock in button
    $("span#clock_in_button").hide();

    // hide the clock out button
    $("span#clock_out_button").hide();



//     // if this is Mike Goodall's schedule, this is for the Enhancements crew, so rename the schedule.
//     var person = $("h2:contains('Mike Goodall')");
//     var is_enh_crew = (person.length == 1);
//     var new_person = person.text().replace(/Mike Goodall/,"Enhancements Crew");
//     person.text(new_person);


    var is_enh_crew = isEnhancementCrew();


    // this is inelegant, but we need to know the totals before we decide what to do on each stop


    var total_minutes_for_day_pass1 = 0;

    stops.each( function (i) {

        // locate the entry which tells us the amount of time for this stop
        var time = $(this).find("span.time");

        // get the hours and minutes value from the text (it's availalable as a float too)
        var minutes = parseInt( time.text().replace(/(\d*)h\s*(\d*)m/, '$2') );
        var hours = parseInt( time.text().replace(/(\d*)h\s*(\d*)m/, '$1') );

        // convert into total minutes; and offer 2 man and 3 man crew options
        var visit_minutes = (hours * 60) + minutes;
        var visit_minutes_2man = visit_minutes / 2;
        var visit_minutes_3man = visit_minutes / 3;

        if (!isNaN(visit_minutes)) total_minutes_for_day_pass1 += visit_minutes;
    });

    console.log(total_minutes_for_day_pass1);

    var crew_size = 2;
    var crew_phrase = "MEN";
    var approx_num_of_hours = Math.round(total_minutes_for_day_pass1/60);

    var cutoff_1_man = 4; // in hours
    var cutoff_2_man = 24; // in hours
    var cutoff_3_man = 33; // in hours

    if (approx_num_of_hours <= cutoff_1_man) { crew_size = 1; crew_phrase = "MAN"; }
    else if (approx_num_of_hours > cutoff_1_man && approx_num_of_hours <= cutoff_2_man) { crew_size = 2; }
    else if (approx_num_of_hours > cutoff_2_man && approx_num_of_hours <= cutoff_3_man) { crew_size = 3; }
    else { crew_size = 4; };


    stops.each( function (i) {

        // locate the entry which tells us the amount of time for this stop
        var time = $(this).find("span.time");

        // get the hours and minutes value from the text (it's availalable as a float too)
        var minutes = parseInt( time.text().replace(/(\d*)h\s*(\d*)m/, '$2') );
        var hours = parseInt( time.text().replace(/(\d*)h\s*(\d*)m/, '$1') );

        // convert into total minutes; and offer 2 man and 3 man crew options
        var visit_minutes = (hours * 60) + minutes;

        // inflate the numbers a little bit
        visit_minutes = Math.round(visit_minutes * 1.1);

        console.log(visit_minutes);

        // hide the total expect time thing
        $(this).find("span.total-estimated").hide();

        // reduce the width of the Stop column
        $(this).parent().find("td.hidden-sm.hidden-xs:contains('Stop')").attr("style","width: 2% !important");


        // insert an extra table for chemical spray usage, or for materials used (depending on the type of crew)
        var extra_table = "";
        if (is_enh_crew) {
            extra_table = "<table id=\"extra-table\" align=\"right\" style=\"border: 1px black solid\"><tr><td colspan=3><strong>&nbsp;MATERIALS LOADED OR UNLOADED&nbsp;</strong></td></tr><tr><td>PINE</td><td>BLACK</td><td>BROWN</td></tr><tr><td>STRAW</td><td>MULCH</td><td>MULCH</td><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;<span style=\"text-decoration:overline\">&nbsp;(bales)&nbsp;</span>&nbsp;</td><td>&nbsp;<span style=\"text-decoration:overline\">&nbsp;(bags)&nbsp;</span>&nbsp;</td><td>&nbsp;<span style=\"text-decoration:overline\">&nbsp;(bags)&nbsp;</span>&nbsp;</td></tr></table>";
        } else {
            extra_table = "<table id=\"extra-table\" align=\"right\" style=\"border: 1px black solid\"><tr><td colspan=2><strong>&nbsp;ROUND-UP</strong></td><td><strong>USED</strong></td></tr><tr><td>IN BEDS</td><td><input type=\"checkbox\"></input></td><td></td></tr><tr><td>&nbsp;CRACKS&nbsp;</td><td><input type=\"checkbox\"></input></td><td>&nbsp;<span style=\"text-decoration:overline\">&nbsp;(gal.)&nbsp;</span>&nbsp;</td></tr></table>";
        }


        // set the width of the replaced empty Documents column to 25% in each row
        $(this).parent().find("td.collapse.in.td-no-before[data-th=\"Documents\"]").replaceWith("<td width=25% class=\"collapse in td-no-before replaced2\" data-th=\"Documents\" style=\"padding-top: 0px !important; padding-bottom: 0px !important\">" + extra_table + "</td>");

        // replace the contents of the "Actions" column in each row and set width to 15%
        $(this).parent().find("td.collapse.in.td-no-before.actions[data-th=\"Actions\"]").replaceWith("<td width=10% class=\"collapse in td-no-before actions replaced\" data-th=\"Actions\" style=\"border-right-width:2px;border-right-style: solid\"></td>");

        // **** 2 MAN ***
        // add this into the total
        if (!isNaN(visit_minutes)) {
            total_minutes_for_today += visit_minutes / crew_size;

            $(this).append("<span class=\"total-assigned\"><big>WITH <strong>" + crew_size + "</strong> " + crew_phrase + " <big><strong>" + timeConvert(visit_minutes / crew_size) + "</strong></big></big><br>(including drive time)</span>");
        }


    });

    // start at 6:45am
    var start = moment("7:00", "h:m");
    // no time for load up, foreman should do this between 6:30am and 6:45am

    // add in all of the visits
    var end = start.add(total_minutes_for_today, "minutes");

    // add in 15 minutes for unload
    end = end.add(15, "minutes");

//     // add 1 hour for lunch
//     var end_with_lunch = end.add(1, "hour");


    var table = $(document).find("table.responsive.table-striped.route-table");


    if (end.isAfter(moment('8:00am','h:mma'))) {
        showSummary(table, "<strong><big><big>END DAY</big></big></strong>", "<strong><big><big>EXPECTED CLOCK OUT TIME</big></big></strong>", "<strong><big><big><big>" + end.format('h:mm A') + "</strong></big></big></big>", "<strong>(add 1 hour if you take lunch)</strong>");
}

    //console.log(end_with_lunch);

}

waitForKeyElements("table.route-table", processEstimatedTimes);