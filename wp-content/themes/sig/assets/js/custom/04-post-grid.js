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
                
                //console.log(values);

                if (values.includes(hashValue)) {
                    //window.scrollTo(0,0);

                    jQuery('#'+hashValue+'-filter').prop("checked", true);

                    updateFilter();
                }
            }

            jQuery('.post-grid__load-btn').on('click', function() {
                let tiles = jQuery('.post-grid__tile:not(.filter-active)'),
                    max = jQuery(this).data('max');

                if (tiles.length >=max) {
                    jQuery('.post-grid__tile:not(.filter-active)').slice(0, max).addClass('filter-active');
                } else {
                    jQuery('.post-grid__tile:not(.filter-active)').addClass('filter-active');
                    jQuery('.post-grid__load-btn').hide();
                }
                
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
        
    });
    
})();