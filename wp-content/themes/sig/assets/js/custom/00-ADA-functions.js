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

function clearAria($ele,checkInArray) {
    let calendar = document.getElementById($ele+'-calendar');
    //console.log(calendar);
    checkInArray.forEach(function (item, index) {
        //console.log(item);
        let selectbtn = calendar.querySelector('[data-btndate="'+item+'"]');
        if(selectbtn) {
            let formatdate = selectbtn.dataset.formatted;
            selectbtn.ariaLabel = "Choose "+formatdate;
        }
    });
}

function moveto(newrow, newcol,calendar) {
  let tgt = calendar.querySelector('[data-row="' + newrow + '"][data-col="' + newcol + '"]');    
  if (tgt && (tgt.getAttribute('role')==='gridcell') ) {
    /*Array.prototype.forEach.call(document.querySelectorAll('[role=gridcell]'), function(el, i){
      el.setAttribute('tabindex', '-1');
    });*/
    tgt.setAttribute('tabindex', '0');
    tgt.focus();
    return true;
  } else {
    return false;
  }
}

function calendarNavigate(calendar) {
    
    let daycells = calendar.querySelectorAll('td.fc-day-today, td.fc-day-future').forEach(function(item, index) {     
        item.setAttribute('role', 'gridcell');
        if(index == 0) {
            item.setAttribute('tabindex', 0);
        }                
    });
    
    
    let trs = calendar.querySelectorAll('table tbody tr'),
        row = 0,
        col = 0,
        maxrow = trs.length - 1,
        maxcol = 0;

    Array.prototype.forEach.call(trs, function(gridrow, i){
      Array.prototype.forEach.call(gridrow.querySelectorAll('td'), function(el, i){
        el.dataset.row = row;
        el.dataset.col = col;
        col = col + 1;
      });
      if (col>maxcol) { maxcol = col - 1; }
      col = 0;
      row = row + 1;
    });
    
    function nextPrevButtons(event) {
        let focuselement = calendar.getElementsByClassName('fc-day-today');
          if (focuselement.length == 0) {                  
              focuselement = calendar.getElementsByClassName("fc-daygrid-day");
          }
          switch (event.key) {
            case "ArrowDown":;
                 focuselement[0].focus();
                  event.preventDefault();
                  break;
        }
    }
    
    //NEXT MONTH
    calendar.querySelector('.fc-next-button').addEventListener("keydown", function(event) {
        nextPrevButtons(event);      
    });
    calendar.querySelector('.fc-prev-button').addEventListener("keydown", function(event) {
      nextPrevButtons(event);  
    });
    
    /*let buttons = calendar.querySelectorAll('.dayButton');
            for (let button of buttons) {
                button.addEventListener('click', function(event) {
                    let date = button.dataset.btndate;                    
                    checkCalendarState(date, $ele);                    
                })
            }*/
    
}