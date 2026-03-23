<?php

if ( ! function_exists( 'get_vimeo_thumb' ) ) {
	/**
	 * GET VIMEO THUMBNAIL
	 *
	 * @since 1.0.0
	 */
	function get_vimeo_thumb($videoid) {
		if ( false === ( $content = get_transient( 'vimeothumb-'.$videoid ))) {
			$args = array('timeout' => 120);				
			$url = 'https://vimeo.com/api/v2/video/'.$videoid.'.json';		
			$request = wp_remote_get($url,$args);
			if ( is_wp_error( $request ) ) {
				//return get_field('default_wide', 'option');
			} else {
				$body = wp_remote_retrieve_body( $request );	
				$video = json_decode($body, true);
                if(isset($video[0]['thumbnail_large'])) {
                    $content = $video[0]['thumbnail_large'];
                    $content = str_replace("_640", "", $content);
                } else {
                    if(isset($video[0]['thumbnail_medium'])) {
                        $content = $video[0]['thumbnail_medium'];
                    }
                }
				
			}		
			if ( ! empty( $content ) ) {
				//$content = base64_encode( serialize( $content ) );
				set_transient( 'vimeothumb-'.$videoid, $content, 30 * DAY_IN_SECONDS );
			}		
		} 
		if ( ! empty( $content ) ) {
			return $content;
			//return unserialize( base64_decode( $content ) );			
		}
	}
	
}



?>