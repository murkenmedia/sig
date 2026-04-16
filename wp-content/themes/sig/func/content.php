<?php
 


 
if ( ! function_exists( 'get_testimonial_slide' ) ) {
	/**
	 * GET TESTIMONIAL
	 *
	 * @since 1.0.0
	 */
	function get_testimonial_slide($id,$showlogo=false) {

        $content = get_post_gutenberg_blocks($id);
        /* $content = str_replace('<p>"', "<p>", $content);
        $content = str_replace('"</p>', "</p>", $content);
        $content = str_replace('”</p>', "</p>", $content); */
        $content = str_replace('<p></p>', "", $content);
        $content = widowfix($content);

        $img = '';
        if($showlogo) {
            if (has_post_thumbnail($id)) {
                $imgid = get_post_thumbnail_id($id);
                $img = wp_get_attachment_image($imgid, 'full', '', array('loading'=>'lazy' ));
                $img = '
                <figure class="testimonial-slider__slide__img">'.$img.'</figure>';
            }        
        }

        $cite = get_the_title($id);
        return '
            <blockquote class="wp-block-quote has-text-align-center is-style-quotation-marks">
                '.$img.$showimage.'
                '.$content.'
                <cite>'.$cite.'</cite>
            </blockquote>';
    }

}
if ( ! function_exists( 'get_footer_circles' ) ) {
	/**
	 * GET FOOTER CIRCLES
	 *
	 * @since 1.0.0
	 */
	function get_footer_circles() {
        return '
        <div class="footer-circles-wrap alignfull animate">
            <svg class="footer-circles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1681 650">
                <rect id="bg" x=".5" y=".5" width="1681" height="650" style="fill:#fff; opacity:0;"/>

                <g class="footer-circle footer-circle-right"><g id="r1"><path d="M1356.5,7.35c42.95,0,84.62,8.41,123.84,25,37.88,16.02,71.91,38.96,101.13,68.18s52.16,63.25,68.18,101.13c16.59,39.22,25,80.88,25,123.84s-8.41,84.62-25,123.84c-16.02,37.88-38.96,71.91-68.18,101.13-29.22,29.22-63.24,52.16-101.13,68.18-39.22,16.59-80.88,25-123.84,25s-84.62-8.41-123.84-25c-37.88-16.02-71.91-38.96-101.13-68.18-29.22-29.22-52.16-63.24-68.18-101.13-16.59-39.22-25-80.88-25-123.84s8.41-84.62,25-123.84c16.02-37.88,38.96-71.91,68.18-101.13s63.24-52.16,101.13-68.18c39.22-16.59,80.88-25,123.84-25M1356.5.5c-179.49,0-325,145.51-325,325s145.51,325,325,325,325-145.51,325-325S1535.99.5,1356.5.5h0Z" style="fill:#b7d3ff;"/></g><g id="r2"><path d="M1356.5,71.46c34.3,0,67.57,6.72,98.88,19.96,30.25,12.79,57.42,31.11,80.75,54.44,23.33,23.33,41.65,50.5,54.44,80.75,13.24,31.31,19.96,64.58,19.96,98.88s-6.72,67.57-19.96,98.88c-12.79,30.25-31.11,57.42-54.44,80.75-23.33,23.33-50.5,41.65-80.75,54.44-31.31,13.24-64.58,19.96-98.88,19.96s-67.57-6.72-98.88-19.96c-30.25-12.79-57.42-31.11-80.75-54.44-23.33-23.33-41.65-50.5-54.44-80.75-13.24-31.31-19.96-64.58-19.96-98.88s6.72-67.57,19.96-98.88c12.79-30.25,31.11-57.42,54.44-80.75,23.33-23.33,50.5-41.65,80.75-54.44,31.31-13.24,64.58-19.96,98.88-19.96M1356.5,64.61c-144.08,0-260.89,116.8-260.89,260.89s116.8,260.89,260.89,260.89,260.89-116.8,260.89-260.89-116.8-260.89-260.89-260.89h0Z" style="fill:#b7d3ff;"/></g><g id="r3"><path d="M1356.5,135.08c25.71,0,50.65,5.03,74.12,14.96,22.67,9.59,43.04,23.32,60.53,40.81,17.49,17.49,31.22,37.85,40.81,60.53,9.93,23.47,14.96,48.41,14.96,74.12s-5.03,50.65-14.96,74.12c-9.59,22.67-23.32,43.04-40.81,60.53-17.49,17.49-37.85,31.22-60.53,40.81-23.47,9.93-48.41,14.96-74.12,14.96s-50.65-5.03-74.12-14.96c-22.67-9.59-43.04-23.32-60.53-40.81-17.49-17.49-31.22-37.85-40.81-60.53-9.93-23.47-14.96-48.41-14.96-74.12s5.03-50.65,14.96-74.12c9.59-22.67,23.32-43.04,40.81-60.53,17.49-17.49,37.85-31.22,60.53-40.81,23.47-9.93,48.41-14.96,74.12-14.96M1356.5,128.23c-108.95,0-197.27,88.32-197.27,197.27s88.32,197.27,197.27,197.27,197.27-88.32,197.27-197.27-88.32-197.27-197.27-197.27h0Z" style="fill:#b7d3ff;"/></g><g id="r4"><path d="M1356.5,199.2c33.74,0,65.45,13.14,89.31,36.99,23.86,23.86,36.99,55.57,36.99,89.31s-13.14,65.45-36.99,89.31c-23.86,23.86-55.57,36.99-89.31,36.99s-65.45-13.14-89.31-36.99c-23.86-23.86-36.99-55.57-36.99-89.31s13.14-65.45,36.99-89.31c23.86-23.86,55.57-36.99,89.31-36.99M1356.5,192.34c-73.54,0-133.16,59.62-133.16,133.16s59.62,133.16,133.16,133.16,133.16-59.62,133.16-133.16-59.62-133.16-133.16-133.16h0Z" style="fill:#b7d3ff;"/></g><g id="r5"><path d="M1356.5,263.31c34.29,0,62.19,27.9,62.19,62.19s-27.9,62.19-62.19,62.19-62.19-27.9-62.19-62.19,27.9-62.19,62.19-62.19M1356.5,256.46c-38.13,0-69.04,30.91-69.04,69.04s30.91,69.04,69.04,69.04,69.04-30.91,69.04-69.04-30.91-69.04-69.04-69.04h0Z" style="fill:#b7d3ff;"/></g></g>
                
                <g class="footer-circle footer-circle-mid">
                <g id="m1"><path d="M840.5,7.35c42.95,0,84.62,8.41,123.84,25,37.88,16.02,71.91,38.96,101.13,68.18s52.16,63.25,68.18,101.13c16.59,39.22,25,80.88,25,123.84s-8.41,84.62-25,123.84c-16.02,37.88-38.96,71.91-68.18,101.13-29.22,29.22-63.25,52.16-101.13,68.18-39.22,16.59-80.88,25-123.84,25s-84.62-8.41-123.84-25c-37.88-16.02-71.91-38.96-101.13-68.18-29.22-29.22-52.16-63.24-68.18-101.13-16.59-39.22-25-80.88-25-123.84s8.41-84.62,25-123.84c16.02-37.88,38.96-71.91,68.18-101.13,29.22-29.22,63.24-52.16,101.13-68.18,39.22-16.59,80.88-25,123.84-25M840.5.5c-179.49,0-325,145.51-325,325s145.51,325,325,325,325-145.51,325-325S1019.99.5,840.5.5h0Z" style="fill:#1a75fb;"/></g><g id="m2"><path d="M840.5,71.46c34.3,0,67.57,6.72,98.88,19.96,30.25,12.79,57.42,31.11,80.75,54.44,23.33,23.33,41.65,50.5,54.44,80.75,13.24,31.31,19.96,64.58,19.96,98.88s-6.72,67.57-19.96,98.88c-12.79,30.25-31.11,57.42-54.44,80.75-23.33,23.33-50.5,41.65-80.75,54.44-31.31,13.24-64.58,19.96-98.88,19.96s-67.57-6.72-98.88-19.96c-30.25-12.79-57.42-31.11-80.75-54.44s-41.65-50.5-54.44-80.75c-13.24-31.31-19.96-64.58-19.96-98.88s6.72-67.57,19.96-98.88c12.79-30.25,31.11-57.42,54.44-80.75,23.33-23.33,50.5-41.65,80.75-54.44,31.31-13.24,64.58-19.96,98.88-19.96M840.5,64.61c-144.08,0-260.89,116.8-260.89,260.89s116.8,260.89,260.89,260.89,260.89-116.8,260.89-260.89-116.8-260.89-260.89-260.89h0Z" style="fill:#1a75fb;"/></g><g id="m3"><path d="M840.5,135.08c25.71,0,50.65,5.03,74.12,14.96,22.67,9.59,43.04,23.32,60.53,40.81s31.22,37.85,40.81,60.53c9.93,23.47,14.96,48.41,14.96,74.12s-5.03,50.65-14.96,74.12c-9.59,22.67-23.32,43.04-40.81,60.53s-37.85,31.22-60.53,40.81c-23.47,9.93-48.41,14.96-74.12,14.96s-50.65-5.03-74.12-14.96c-22.67-9.59-43.04-23.32-60.53-40.81s-31.22-37.85-40.81-60.53c-9.93-23.47-14.96-48.41-14.96-74.12s5.03-50.65,14.96-74.12c9.59-22.67,23.32-43.04,40.81-60.53s37.85-31.22,60.53-40.81c23.47-9.93,48.41-14.96,74.12-14.96M840.5,128.23c-108.95,0-197.27,88.32-197.27,197.27s88.32,197.27,197.27,197.27,197.27-88.32,197.27-197.27-88.32-197.27-197.27-197.27h0Z" style="fill:#1a75fb;"/></g></g>                    
                    
                <g class="footer-circle footer-circle-left"><g id="l1"><path d="M325.5,7.35c42.95,0,84.62,8.41,123.84,25,37.88,16.02,71.91,38.96,101.13,68.18,29.22,29.22,52.16,63.25,68.18,101.13,16.59,39.22,25,80.88,25,123.84s-8.41,84.62-25,123.84c-16.02,37.88-38.96,71.91-68.18,101.13-29.22,29.22-63.24,52.16-101.13,68.18-39.22,16.59-80.88,25-123.84,25s-84.62-8.41-123.84-25c-37.88-16.02-71.91-38.96-101.13-68.18-29.22-29.22-52.16-63.24-68.18-101.13-16.59-39.22-25-80.88-25-123.84s8.41-84.62,25-123.84c16.02-37.88,38.96-71.91,68.18-101.13s63.25-52.16,101.13-68.18c39.22-16.59,80.88-25,123.84-25M325.5.5C146.01.5.5,146.01.5,325.5s145.51,325,325,325,325-145.51,325-325S504.99.5,325.5.5h0Z" style="fill:#021bc3;"/></g></g>                
            </svg>        
        </div>';
    }

}



if ( ! function_exists( 'get_popup' ) ) {
	/**
	 * GET POPUP
	 *
	 * @since 1.0.0
	 */
	function get_popup() { 
        $popup_content = $link_url = $ctalink = $link_target = $class = $link1 = $link2 = $content = $img = '';           
        $type = get_field('popup_type', 'options');	        
        $displaytime = get_field('popup_time', 'options');     

        $cookie = 'home_popup';
        if(get_field('popup_cookie', 'options')) {
            $cookie = get_field('popup_cookie', 'options');
        }
        
        if($type == 'content-image' || $type == 'image') {
            $imgid = get_field('popup_image', 'options');

            if(wp_is_mobile()) {
                $img = wp_get_attachment_image($imgid,'medium_large', "", array( "loading" => "lazy" ));
            } else {
                $img = wp_get_attachment_image($imgid,'full', "", array( "loading" => "lazy" ));
            }
        }

        if($type == 'content-image' || $type == 'content') {
            $content = get_field('popup_content', 'options');
        }

        if( get_field( 'popup_link', 'options')) {
            $linkclass = '';
            $link = get_field( 'popup_link', 'options');
            $link_target = $link['target'] ? $link['target'] : '_self';
            $link_url = esc_url($link['url']);

            $btnclass = '';
            if($class == 'home-popup-white') {
                $btnclass = 'is-style-arrow-btn';
            }
            $class .= ' popup-has-btn';

            $ctalink = '
            <div class="wp-block-button '.$btnclass.' mt-md-4">
                <a href="'.$link_url.'" class="wp-block-button__link" target="'.esc_attr( $link_target ).'">'.esc_html($link['title']).'</a>
            </div>';

            $link1 = '<a href="'.$link_url.'" target="'.esc_attr( $link_target ).'"><span class="sr-only">'.esc_html($link['title']).'</span>';
            $link2 = '</a>';
        }

        if($type == 'content-image') {
            //content with image    

            $popup_content = '
            <figure class="home-popup__img">'.$link1.$img.$link2.'</figure>
            <div class="home-popup__content">
                '.$content.'
                '.$ctalink.'
            </div>';

            $class .= ' popup-img-content';

        } else if($type == 'content') {

            //content only
            $popup_content = '
            <div class="home-popup__content content-only-popup">
                '.$content.'
                '.$ctalink.'
            </div>';            
            $class .= ' popup-content-only';

        } else {
            //image only
            $class .= ' popup-img-only';            
            $popup_content = '
            <div class="home-popup__img img-only-popup">
                '.$link1.$img.$link2.'
            </div>'; 
        }
 
        
        return '    
        <div aria-hidden="true">
            <div id="home-popup" class="mfp-hide '.$class.'" data-time="'.$displaytime.'" data-class="'.$class.'" data-cookie="'.$cookie.'" >
                <div class="home-popup">
                    '.$popup_content.'
                </div>
            </div>
        </div>';
        
    }
}

if ( ! function_exists( 'get_hero_breadcrumb' ) ) {
	/**
	 * GET HERO BREADCRUMB
	 *
	 * @since 1.0.0
	 */
	function get_hero_breadcrumb($id,$parentid = '') {
        $breadcrumb = '';
        $posttype = get_post_type($id);
        switch ($posttype) {
            case "solutions":
                $breadcrumb .= '<a href="'.get_permalink(18).'" >'.__('Solutions', 'sig').'</a>';
                if($parentid != 0) {
                    $breadcrumb .= '<span class="hero__content__pretitle__divider"></span><a href="'.get_permalink($parentid).'" >'.get_the_title($parentid).'</a>';
                }
                break;
            case "platforms":
                $breadcrumb .= '<a href="'.get_permalink(20).'" >'.__('Platforms', 'sig').'</a>';
                if($parentid != 0) {
                    $breadcrumb .= '<span class="hero__content__pretitle__divider"></span><a href="'.get_permalink($parentid).'" >'.get_the_title($parentid).'</a>';
                }
                break;
            default:
                if($parentid != '' && $parentid != 0) {
                    $breadcrumb .= '<a href="'.get_permalink($parentid).'" >'.get_the_title($parentid).'</a>';
                }
        }

        if($breadcrumb != '') {
            return '<p class="hero__content__pretitle mb-4 blue-medium-link">'.$breadcrumb.'</p>';
        }

    }

}




if ( ! function_exists( 'get_hero_header' ) ) {
	/**
	 * GET HERO HEADER
	 *
	 * @since 1.0.0
	 */
	function get_hero_header($id,$pretitle='',$class='') {
        
        $img = '';
        if (has_post_thumbnail( $id ) ) {
            $imgid = get_post_thumbnail_id($id);
            
            $img = '
            <div class="hero__image alignfull fade-in">
                '.wp_get_attachment_image($imgid, 'full', '', array('class'=>'hero__image__img', 'onload'=> "this.className='in-view hero__image__img'")).'
            </div>
            <div class="hero__darken-upper"></div>
            <div class="hero__darken-lower"></div>
            <div class="hero__image__bluebg"></div>';

            $class .= ' medium-hero';
        } else {
            $class .= ' hero-no-bg';
        }
        
        $title = get_the_title($id);
        $title = '<h1 class="hero__content__title has-white-color d-block">'.widowfix($title).'</h1>';
        
        /* $pretitle = '';
        if($parentid) {
            $pretitle = '
            <p class="hero__content__pretitle mb-4 green-link"><a href="'.get_permalink($parentid).'" >'.get_the_title($parentid).'</a></p>';
        } */
                
        
        return '
        <div class="hero alignfull secondary-hero '.$class.'">
            <div class="hero__content max-xl fade-in delay">
                '.$pretitle.$title.'
            </div>
            '.$img.'
        </div>';
	}
}

if ( ! function_exists( 'get_hero_with_custom_text' ) ) {
	/**
	 * GET 404 HERO
	 *
	 * @since 1.0.0
	 */
	function get_hero_with_custom_text($title='',$class='') {

        if($title != '') {            
            $title = '<h1 class="hero__content__title has-white-color d-block">'.widowfix($title).'</h1>';
        } else {
            $title = widowfix($title);
        }
        
        return '
        <div class="hero alignfull secondary-hero hero-no-bg '.$class.'">
            <div class="hero__content max-xl">
                '.$title.'
            </div>
        </div>';
	}
}





if ( ! function_exists( 'get_social_share' ) ) {
	/**
	 * GET SOCIAL SHARE
	 *
	 * @since 1.0.0
	 */
	function get_social_share($id) {
		$url = get_the_permalink($id);
		$title = get_the_title($id);
		$urltitle = urlencode($title);
		$img = get_the_post_thumbnail_url($id, 'large' );      
        $emailsubject = str_replace(' ', '%20', $title);

		$content = '
		<div class="share-content">
			<ul class="social-share">		
                <li class="share">'.__("Share:", 'sig').'</li>
				<li><a href="https://x.com/share?text='.urlencode($title).'&url='.$url.'&hashtags=sig" target="_blank"><span class="sr-only">Share on X</span></a></li>
                <li><a href="https://www.linkedin.com/shareArticle?mini=true&amp;url='.$url.'" target="_blank"><span class="screen-reader-text">'.__('Share on LinkedIn', 'sig').'</span></a></li>
				<li><a href="https://www.facebook.com/sharer.php?u='.$url.'" target="_blank"><span class="sr-only">Share on Facebook</span></a></li>
                <li class="email"><a href="mailto:?subject='.$emailsubject.'&amp;body=%20'.$url.'" target="_blank"><span class="screen-reader-text">'.__('Share with email', 'sig').'</span></a></li>
			 </ul>
		</div>
		';

		return $content;	
	}
}




?>