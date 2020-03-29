// ==UserScript==
// @name         SO: Timesheets - Auto click OK on delete event.
// @namespace    https://github.com/oasislandscape/
// @version      0.2.1
// @run-at	 document-idle
// @description  Click the OK button when deleting an event to speed things up.
// @author       Drew <drew@oasislandscape.com>
// @include      /^https?://app\.singleops\.com/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM.getValue
// @grant        GM.setValue
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-timesheets-autodelete-event.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-timesheets-autodelete-event.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

/* This has known bugs, and should probably be disabled for now. */

function setStatus(warned, enabled) {
    GM.setValue("clickDeleteStatus", '{ "warned": ' + warned + ', "enabled": ' + enabled + ' }');
    console.log("clickDelete(): setStatus -> (" + warned + "," + enabled + ")");
}

async function disableClickDeleteIn___Seconds(seconds = 55) {
    console.log("clickDelete(): turning off ClickDelete in " + seconds + " seconds.");
    setTimeout(function() { setStatus(false,false); console.log("clickDelete(): click delete turned off.")}, seconds*1000);
}

async function stopAskingAboutClickDeleteFor___Seconds(warned, enabled, seconds = 60) {
    setStatus(warned, enabled);
    console.log("clickDelete(): supressing clickDelete popup for  " + seconds + " seconds.");
    setTimeout(function() { setStatus(false, false); console.log("clickDelete(): clickDelete popup enabled again.")}, seconds*1000);
}


async function resetClickDelete(seconds = 10) {
    var already_reset = await GM.getValue("clickDeleteReset", "false");
    if (already_reset) { return };
    console.log("clickDelete: resetting in " + seconds + " seconds.");
    setTimeout(function() { setStatus(false, false); console.log("clickDelete(): reset complete."); GM.deleteValue("clickDeleteReset")}, seconds * 1000);
}

async function clickDelete(jNode) {
    var status = JSON.parse(await GM.getValue("clickDeleteStatus", '{"warned": false, "enabled": false}'));

    console.log("clickDelete(): called with status: {warned,enabled} is {" + status.warned + "," + status.enabled + "} .");

    if (status.warned && !status.enabled) {
        // sometimes we get stuck in (true, false) for unknown reasons; so reset back out of this
        console.log("clickDelete(): automatic deletion mode was declined, still supressing...");
        //setStatus(false, false);
        //resetClickDelete();
        stopAskingAboutClickDeleteFor___Seconds(status.warned, status.enabled);
        return false;
    }


    console.log("clickDelete(): called with: (" + status.warned + ", " + status.enabled + ")");

    /* warning stage */

    if (!status.warned) {
        var r = confirm("Do you want to turn on delete mode for 2 minutes?");
        if (r) {
            status.enabled = true;
            status.warned = true;
            stopAskingAboutClickDeleteFor___Seconds(status.warned, status.enabled);
            console.log("clickDelete(): automatic deletion mode activated");
            disableClickDeleteIn___Seconds();
            return false;
        } else {
            status.warned = true;
            status.enabled = false;
            stopAskingAboutClickDeleteFor___Seconds(status.warned, status.enabled);
            console.log("clickDelete(): automatic deletion mode declined");
            return false;
        }
    }

    if (status.enabled) {
        console.log("clickDelete(): clicking...");
        jNode.find('button.btn.btn-primary').click();
     }

    // if something goes wrong (e.g. browser close before the reset timers can fire), then we may get stuck in (true, true).
    // so a current hack is to simply wait longer than the standard reset (2 minutes nominally) and hard reset to false,false
    // so I'll wait 4 minutes here; the problem with this is it will fire multiple times; but we'll have to fix this later
    if (status.enabled && status.warned) {
        console.log("clickDelete(): resetting to (false,false) in  " + 70 + " seconds.");
        setTimeout(function() { console.log("clickDelete(): (true,true) reset -> (false,false)."); setStatus(false, false);}, 70 * 1000);
    }

}

waitForKeyElements("div.modal-dialog:contains('Are you sure you would like to delete this event?')", clickDelete, false);
//waitForKeyElements("div.modal-dialog", clickDelete);
