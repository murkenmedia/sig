<?php

if ( ! function_exists( 'get_webinar' ) ) {
	/**
	 * GET WEBINAR
	 *
	 * @since 1.0.0
	 */
    function get_webinar($id) {

        $webinar = '';

        if(get_field('webinar_link', $id)) {
            $vimeourl = $img = '';

            $vimeourl = get_field('webinar_link', $id);

            if(has_post_thumbnail($id)) {
                $imgid = get_post_thumbnail_id($id);        
            } else {
                $imgid = get_field('default_grid_img', 'option' );
            }

            $url = wp_get_attachment_image_url($imgid, 'full');
            $img = '<img src="'.$url.'" alt="" width="1280" height="720" loading="lazy" class="lazy-video__img" />';

            $webinar = '
            <div id="webinar-'.$id.'" class="lazy-video-wrap mb-5 simple-video">
                <div id="video-'.$vimeourl.'" class="lazy-video lazy-vimeo" data-embed="'.$vimeourl.'">
                    <button type="button" class="lazy-video__play">
                        <div class="lazy-video__play__btn"></div>
                        <span class="sr-only">'.__('Play Video', 'sig').'</span>
                    </button>
                    '.$img.'
                </div>
            </div>';
        }

        return $webinar;

    }
}

function clear_webinar_cookie() {
    setcookie("webinar_access_granted", "", time() - 3600, "/");
    unset($_COOKIE['webinar_access_granted']);
}


?>