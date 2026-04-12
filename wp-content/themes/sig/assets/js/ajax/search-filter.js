jQuery.noConflict();
jQuery(function(){
	var $window = jQuery(window),
		timer,
        $wrapper =  jQuery('.post-grid-block'),
		$gridwrap = jQuery('.post-grid__posts'),
		//filters
		$form = jQuery('#search-filter'),
		$filterload = jQuery('.search-filter__loader'),
		$catfilter = jQuery('#search-filter__cat__select'),
		$tagfilter = jQuery('#search-filter__tag__select'),
		$search = jQuery('#search-filter__search__input'),
		$searchbtn = jQuery('.search-filter__search__btn'),
		max = $gridwrap.data('max'),
		defaulttags = $gridwrap.data('tags'),
		defaultcats = $gridwrap.data('cats'),
		search_term,
		cat_term,
		tag_term,
		page = 1,
		wto = 0;


	function filterResults() {
		max = $gridwrap.data('max');
		page = 1;
        $gridwrap.data('page', page);
        console.log(page);
                       
		$gridwrap.addClass('loading');
		$filterload.html( '<div class="post-grid__posts__loading active"></div>' );
		//console.log(cat_term);
		
		jQuery.ajax({
			url : searchfilter.ajax_url,
			type : 'post',
			data : {
				action : 'search_filter',
				nonce : searchfilter.ajax_nonce,
				search_term : search_term,
				cat_term : cat_term,
				tag_term : tag_term,
				page : page,
				max : max,
			},
			success : function( response ) {	
				$gridwrap.html(response.data);
				$gridwrap.removeClass('loading');
				$filterload.html( '' );				
			}
		});
	}
	
	
	
	function loadPosts() {
		max = $gridwrap.data('max');
        
        page = $gridwrap.data('page');
		page = page + 1;
        $gridwrap.data('page', page);
        console.log(page);
        
		cat_term = tag_term = '';
        
        if($gridwrap.data('cats')) {
           cat_term = $gridwrap.data('cats');
        }
        
        if($gridwrap.data('tags')) {
           tag_term = $gridwrap.data('tags');
        }
              
        $gridwrap.data('tagtax');
		
		if (jQuery("#search-filter__cat__select")[0]){				
			if($catfilter.val() !== 'CATEGORY') {
				cat_term = $catfilter.val();
			} 
		}
		if (jQuery("#search-filter__tag__select")[0]){							
			if($tagfilter.val() !== 'TAG') {					
				tag_term = $tagfilter.val();
			}
		}
		
		jQuery.ajax({
			url : searchfilter.ajax_url,
			type : 'post',
			data : {
				action : 'search_filter',
				nonce : searchfilter.ajax_nonce,
				search_term : search_term,
				cat_term : cat_term,
				tag_term : tag_term,
				page : page,
				max : max,
			},
			success : function( response ) {					
				//console.log(response.data)
				jQuery('.post-grid__posts__loading').remove();
				$gridwrap.removeClass('loading-posts');
				$gridwrap.append(response.data);
			}
		});
	}
	
	
	jQuery(document).ready(function() {
		//LOAD MORE
		jQuery('body').on('click', '.next-posts-link', function(event){
			event.preventDefault();			
			jQuery('.post-grid__posts__message').remove();
			$gridwrap.addClass('loading-posts');
			$gridwrap.append( '<div class="post-grid__posts__loading active"></div>' );
			loadPosts();
		});		
		
		$searchbtn.on('click', function (event) {
			search_term = $search.val();
            
            cat_term = tag_term = '';
			
            if($gridwrap.data('cats')) {
               cat_term = $gridwrap.data('cats');
            }

            if($gridwrap.data('tags')) {
               tag_term = $gridwrap.data('tags');
            }
            
			if (jQuery("#search-filter__cat__select")[0]){				
				if($catfilter.val() !== 'CATEGORY') {
					cat_term = $catfilter.val();
				} 
			}
			if (jQuery("#search-filter__tag__select")[0]){							
				if($tagfilter.val() !== 'TAG') {					
					tag_term = $tagfilter.val();
				}
			}
			
			filterResults();
		});
        
        $search.keyup(function(event) {
            if (event.keyCode === 13) {
                $searchbtn.click();
            }
        });

		$catfilter.on('change', function (event) {

			clearTimeout(wto);
			wto = setTimeout(function() {
				cat_term = defaultcats;
				cat_term = $catfilter.val();
				if(cat_term == 'CATEGORY') {
					cat_term = defaultcats;
				}
				
				if (jQuery("#search-filter__tag__select")[0]){
					tag_term = defaulttags;
					tag_term = $tagfilter.val();				
					if(tag_term == 'TAG') {					
						tag_term = defaulttags;
					} 
				}
			
				search_term = '';
				filterResults();

			}, 300);

		});
		
		
		$tagfilter.on('change', function (event) {
			clearTimeout(wto);
			wto = setTimeout(function() {
				tag_term = $tagfilter.val();
				
				if(tag_term == 'TAG') {					
					tag_term = defaulttags;
				}
				
				if (jQuery("#search-filter__cat__select")[0]){	
					cat_term = defaultcats;
					cat_term = $catfilter.val();
					if(cat_term == 'CATEGORY') {
						cat_term = defaultcats;
					} 
				}
			
				search_term = '';
				filterResults();

			}, 300);

		});


		$form.on('submit', function (event) {
			event.preventDefault();
			/*cat_term = $catfilter.val();
			if(cat_term == 'CATEGORY') {
				cat_term = '';
			}
			search_term = '';
			if($search.val != '') {
				search_term = $search.val();
			}
			max = '-1';
			page = 1;
			filterResults();*/
		});
		
		
		
	});
	
});