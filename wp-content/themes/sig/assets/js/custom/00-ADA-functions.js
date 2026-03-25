// ADA functions

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

function getNextSibling(elem, selector) {
    let sibling = elem.nextElementSibling;
    if (!selector) return sibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling
    }
}

function getPreviousSibling(elem, selector) {
    let sibling = elem.previousElementSibling;
    if (!selector) return sibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling;
    }
}

function isDescendant(parent, child) {
     let node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}
///RETURNS AN ISO DATE YYYY-MM-DD
function isoDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

/*function get_next_day(date) {
    let $nextday = new Date(date+'T00:00');
    return $nextday.setDate($nextday.getDate() + 1);
}*/