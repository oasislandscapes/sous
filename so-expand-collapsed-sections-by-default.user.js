// ==UserScript==
// @name         SO: Expand Custom Fields and Notes Sections By Default
// @version      0.2.1
// @namespace    https://github.com/oasislandscape/
// @license	 MIT
// @author       Drew <drew@oasislandscape.com>
// @description  Jobs and Visits have expandable sections now, and this expands the Custom Field section by default.
// @run-at	 document-idle
// @include      /^https?://app\.singleops\.com//
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL    https://raw.githubusercontent.com/oasislandscapes/sous/master/so-expand-collapsed-sections-by-default.user.js
// @downloadURL  https://raw.githubusercontent.com/oasislandscapes/sous/master/so-expand-collapsed-sections-by-default.user.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

function expandCustomInputsSection(jNode) {
    var button = jNode.find('i.job-section-toggle');
    button.click();
}
waitForKeyElements("div.toggle-section.section-custom-inputs:not([aria-expanded])", expandCustomInputsSection);
