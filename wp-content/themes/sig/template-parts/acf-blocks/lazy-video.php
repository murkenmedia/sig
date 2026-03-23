<?php
/**
 * Lazy Video
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'lazy-video-wrap',
	'fade-in ',
	$block['align'],	
	$className
);

$class = $embed = $url = $img = $imgurl = $mobile = '';


if(get_field('img')) {
    $imgid = get_field('img');
    $imgurl = wp_get_attachment_image_url($imgid, 'full' );
    $img = wp_get_attachment_image($imgid, 'full', '', array('class' => 'lazy-video__img') );
}

//YOUTUBE
if (get_field('youtube_id')) {
	$embed = get_field('youtube_id');
	$class = ' lazy-youtube';
	
	if($img == '') {
        $imglink = 'https://img.youtube.com/vi/'.$embed.'/maxresdefault.jpg';
        if (url_exists($imglink)) {
		  $img = '<img src="https://img.youtube.com/vi/'.$embed.'/maxresdefault.jpg" alt="" width="1280" height="720" loading="lazy" class="lazy-video__img" />';
        } else {
            $img = '<img src="https://img.youtube.com/vi/'.$embed.'/hqdefault.jpg" alt="" width="1280" height="720" loading="lazy" class="lazy-video__img" />';
        }
	}
}
	
//VIMEO
if (get_field('vimeo_id')) {
	$embed = get_field('vimeo_id');
	$class = ' lazy-vimeo';
	
	if($img == '') {
		$url = get_vimeo_thumb($embed);
		$img = '<img src="'.$url.'" alt="" width="1280" height="720" loading="lazy" class="lazy-video__img" />';
	}
}
//CUSTOM
if (get_field('video_desktop')) {
	$embed = wp_generate_password(7, false);
	$class = ' lazy-custom-video';
    
    $desktop = get_field('video_desktop');
    
    if (get_field('video_mobile')) {
        $mobile = get_field('video_mobile');
    }
    
    $loadvideo = $desktop;
    if ( wp_is_mobile() && $mobile != '' ) {
        $loadvideo = $mobile;
    }
    
    $img = $img.'
    <video id="lazy-video-'.$embed.'" data-mobile="'.$mobile.'" data-desktop="'.$desktop.'" class="lazy-video-custom" playsinline preload="none" tabindex="-1" controls controlsList="nodownload noremoteplayback noplaybackrate" disablepictureinpicture>
        <source type="video/mp4" src="'.$loadvideo.'" />
        Your browser does not support the video tag.
    </video>';
}


$style = get_field('video_style');
array_push($block_classes,$style);
?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">	
	<div id="video-<?php echo $embed; ?>" class="lazy-video <?php echo $class; ?>" data-embed="<?php echo $embed; ?>">
    	<button type="button" class="lazy-video__play">
            <div class="lazy-video__play__btn"></div>
            <span class="sr-only"><?php _e('Play Video', 'sig'); ?></span>
        </button>
		<?php echo $img; ?>
	</div>
</div>
