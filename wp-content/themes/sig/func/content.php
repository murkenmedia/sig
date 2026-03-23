<?php
 

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
     


if ( ! function_exists( 'get_hero_header' ) ) {
	/**
	 * GET HERO HEADER
	 *
	 * @since 1.0.0
	 */
	function get_hero_header($id,$parentid='',$class='') {
        
        $img = '';
        if (has_post_thumbnail( $id ) ) {
            $imgid = get_post_thumbnail_id($id);
            
            $img = '
            <div class="hero__image alignfull">
                '.wp_get_attachment_image($imgid, 'full', '', array('class'=>'hero__image__img', 'onload'=> "this.className='in-view hero__image__img'")).'
            </div>
            <div class="hero__textbg"></div>';
        } else {
            //$imgid = get_field('default_hero', 'options');
            $class .= ' hero-no-bg';
        }
        
        $title = get_the_title($id);
        $title = '<h1 class="hero__content__title has-white-color d-block">'.$title.'</h1>';
        
        $pretitle = '';
        if($parentid) {
            $pretitle = '
            <p class="hero__content__pretitle mb-4 green-link"><a href="'.get_permalink($parentid).'" >'.get_the_title($parentid).'</a></p>';
        }
                
        
        return '
        <div class="header-pad">
            <div class="hero alignfull secondary-hero '.$class.'">
                <div class="hero__content max-xl">
                    '.$pretitle.$title.'
                </div>
            </div>
        </div>';
	}
}

if ( ! function_exists( 'get_default_hero' ) ) {
	/**
	 * GET 404 HERO
	 *
	 * @since 1.0.0
	 */
	function get_default_hero($id='',$class='') {
        
        $imgid = get_field('default_hero', 'options');
        
        if($title != '') {
            
            if($class == 'has-title-box') {
                $title = '
                <div class="hero__content__titlebox">
                    <h1 class="hero__content__title has-white-color d-table text-center has-large-font-size">'.$title.'</h1>
                </div>';
            } else {
                $title = '<h1 class="hero__content__title has-white-color d-block text-center">'.$title.'</h1>';
            }
        }       
        
        return '
        <div class="header-pad">
            <div class="hero alignfull secondary-hero '.$class.'">
                <div class="hero__content">
                    '.$title.'
                </div>
                <div class="hero__image alignfull">
                    '.wp_get_attachment_image($imgid, 'full', '', array('class'=>'hero__image__img', 'onload'=> "this.className='in-view hero__image__img'")).'
                </div>
                <div class="hero__textbg"></div>
            </div>
        </div>';
	}
}


if ( ! function_exists( 'get_post_block' ) ) {
	/**
	 * GET POST BLOCK
	 *
	 * @since 1.0.0
	 */
	
	function get_post_block($id) {
		$blockclass = '';
		$title = get_the_title($id);	
		$excerpt = get_the_excerpt($id);
        $excerpt = wp_trim_words( $excerpt, 50 , '...' );
		$url = get_the_permalink($id);
        
		$img = get_default_image($id);
        
        //$date = get_the_date('F j, Y', $id);	
        //<p class="post-grid__content__date mb-2 has-brown-color weight-600">'.$date.'</p>
		
		$content = '
		<article class="post-grid three-col-grid__item">
			<figure class="post-grid__img">
				<a href="'.$url.'" tabindex="-1">
                    <span class="sr-only">'.$title.'</span>
					'.$img.'
				</a>
			</figure>
            <div class="post-grid__content">
                <h3 class="post-grid__content__title mb-2 sans-bold has-small-font-size"><a href="'.$url.'" tabindex="-1">'.$title.'</a></h3>
                <p class="line-clamp">'.$excerpt.'</p>
                <div class="wp-block-button is-style-border-btn post-grid__content__btn">
                    <a class="wp-block-button__link" href="'.$url.'">
                    '.__('Read More', 'sig').'<span class="sr-only">: '.$title.'</span></a>
                </div>
            </div>
		</article>';
		

		return $content;
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

		$content = '
		<div class="share-content">
			<ul class="social-share">		
                <li class="share">'.__("Share:", 'sig').'</li>
				<li><a href="https://x.com/share?text='.urlencode($title).'&url='.$url.'&hashtags=water4la" target="_blank"><span class="sr-only">Share on X</span></a></li>

				<li><a href="https://www.facebook.com/sharer.php?u='.$url.'" target="_blank"><span class="sr-only">Share on Facebook</span></a></li>
			 </ul>
		</div>
		';

		return $content;	
	}
}



?>