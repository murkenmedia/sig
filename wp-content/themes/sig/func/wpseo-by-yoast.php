<?php
/**
 * WPSEO by Yoast custom functionality
 *
 * @package H4C
 * @since   1.0.0
 */

if ( ! function_exists( 'yoast_to_bottom' ) ) {
	/**
	 * Move the Metabox to the bottom on post edit screens.
	 *
	 * @since 1.0.0
	 */
	function yoast_to_bottom() {
		return 'low';
	}
}
add_filter( 'wpseo_metabox_prio', 'yoast_to_bottom' );

add_filter( 'wpseo_primary_term_taxonomies', '__return_empty_array' );

?>