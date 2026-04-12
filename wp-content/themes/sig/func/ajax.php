<?php
function ajax_searchfilter_enqueue_scripts() {
	if ( has_block( 'acf/post-grid' ) || is_home() || is_archive() ) :
		global $wp_query;
		$args = array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'ajax_nonce' => wp_create_nonce( 'searchnonce_' . admin_url( 'admin-ajax.php' ) ),
		);
		wp_enqueue_script( 'searchfilter', get_stylesheet_directory_uri() . '/assets/js/search-filter.min.js', array( 'jquery' ), '1.00', true );
		wp_localize_script( 'searchfilter', 'searchfilter', $args );
			
	endif;	
}
add_action( 'wp_enqueue_scripts', 'ajax_searchfilter_enqueue_scripts' );
add_action( 'wp_ajax_nopriv_search_filter', 'search_filter' );
add_action( 'wp_ajax_search_filter', 'search_filter' );
 
function search_filter() { 
	
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX && wp_verify_nonce( $_POST['nonce'], 'searchnonce_' . admin_url( 'admin-ajax.php' ) ) ) {
        
        $max = $_POST['max'];
        $page = $_POST['page'];
        
        $args = array();
        $args['posts_per_page'] = $max;
        $args['post_status'] = 'publish';
		$args['paged'] = $page;
		$args['order'] = 'DESC';
		$args['orderby'] = 'post_date';
        
		///POST TYPE
        if(isset($_POST['type_term'])) {
            $posttype = $_POST['type_term'];
            $args['post_type'] = $posttype;
        }
        
        ///SEARCH
        if(isset($_POST['search_term'])) {
            $search_term = $_POST['search_term'];
            $args['s'] = $search_term;
			//$args['order'] = 'ASC';
			//$args['orderby'] = 'title';
        }
        
        ///TAGS
        if(isset($_POST['tag_term'])) {
            $tag_term = $_POST['tag_term'];
            
            if( strpos($tag_term, ',') !== false ) {
                $tag_term = explode(',', $tag_term);
            }
            $args['tag__in'] = $tag_term;
        }
        
        ///CAT
        if(isset($_POST['cat_term'])) {
            $cat_term = $_POST['cat_term'];

            $args['cat'] = $cat_term;
        }

		
        
		$loadposts = true;		
		$blocks = get_post_blocks($args,$loadposts,$page);

		$data = $blocks;
        
		wp_send_json_success( $data );	
		wp_die();		
		
	} else {
		wp_die( 'Security check failed' );
	}

}

?>