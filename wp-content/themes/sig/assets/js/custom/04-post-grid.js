/*!
 * SIG Post Grid
 * Version  : 1.0.00
 */

jQuery.noConflict();

(function () {	

    document.addEventListener("DOMContentLoaded", function(){

        

        
        
        if (jQuery(".post-grid__filter")[0]){

            const filters = document.querySelectorAll('.post-grid__filter');
            const items = document.querySelectorAll('.post-grid__tile');

            function updateFilter() {
                jQuery('.post-grid__load-btn').hide();
                // Get all checked values
                const activeFilters = Array.from(filters)
                    .filter(i => i.checked)
                    .map(i => i.value);

                    //console.log(activeFilters);

                items.forEach(item => {
                    const classes = item.classList;
                    
                    // Show item if its category is checked, or if NO filters are checked (show all)
                    if (activeFilters.length === 0 || activeFilters.every(cls => item.classList.contains(cls))) {
                        item.classList.add('filter-active');
                    } else {
                        item.classList.remove('filter-active');
                    }
                });
            }

            filters.forEach(f => f.addEventListener('change', updateFilter));


            if(document.location.hash) {
                let hashValue = window.location.hash.slice(1);

                //console.log(hashValue);

                var values = jQuery('.post-grid__filter').map(function() {
                    return jQuery(this).val();
                }).get();
                
                console.log(values);

                if (values.includes(hashValue)) {
                    window.scrollTo(0,0);

                    jQuery('#'+hashValue+'-filter').prop("checked", true);

                    updateFilter();
                }

            }




            jQuery('.post-grid__load-btn').on('click', function() {
                jQuery('.post-grid__tile:not(.filter-active)').slice(0, 9).addClass('filter-active');
            });

            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('click', (e) => {
                    if (radio.dataset.wasChecked === 'true') {
                        radio.checked = false;
                        radio.dataset.wasChecked = 'false';
                    } else {
                        // Mark the clicked one as checked and clear others in the same group
                        document.querySelectorAll(`input[name="${radio.name}"]`)
                            .forEach(r => r.dataset.wasChecked = 'false');
                        radio.dataset.wasChecked = 'true';
                    }

                    updateFilter();
                });
            });
            

            
            

		}

        
        /* ///POST GRID FILTERS GRID
        if(jQuery('.post-grid__filters')[0]){            
            //https://codepen.io/desandro/pen/GFbAs
            let $container = jQuery('.post-grid__posts').isotope({
                itemSelector: '.post-grid__item',
                layoutMode: 'fitRows', 
                fitRows: {
                    equalheight: true
                }
            });

            
            let  $checkboxes = jQuery('.post-grid__filters input');
            //$selects = jQuery('.meeting-filters-wrap select'),
               

               $checkboxes.change( function() {
                    let exclusives = [];
                    let inclusives = [];
                    
                    console.log('change');
                    
                    $checkboxes.each( function( i, elem ) {
                        if ( elem.checked ) {
                            inclusives.push( elem.value );
                            jQuery(elem).parent().addClass('active');
                        } else {
                            jQuery(elem).parent().removeClass('active');
                        }
                    });
                    
                    exclusives = exclusives.join('');
                    
                    let filterValue;
                    
                    if ( inclusives.length ) {
                        filterValue = jQuery.map( inclusives, function( value ) {
                            return value + exclusives;
                        });                        
                        filterValue = filterValue.join('');
                    } else {
                        filterValue = exclusives;
                    }
                    
                    //$output.text( filterValue );
                    $container.isotope({ filter: filterValue });
                    //$spaces.isotope({ filter: filterValue });
                    //$floorplans.isotope({ filter: filterValue });
                    
                    if ( !$container.data('isotope').filteredItems.length ) {
                        jQuery('#empty-results').addClass('active');
                        jQuery('#reset-filters').addClass('active');
                    } else {
                        jQuery('#empty-results').removeClass('active');
                        jQuery('#reset-filters').addClass('active');
                    }

                    //jQuery('.lazy').trigger('scroll');
                
            });
            
            
            jQuery("#reset-filters").click(function(e){
                e.preventDefault();
                jQuery('input[type=checkbox]').prop('checked',false);
                jQuery('input[type=checkbox]').parent().removeClass('active');
                jQuery(this).removeClass('active');
                $container.isotope({ filter: '*' });
            });
            
        } */
        
    });
    
})();