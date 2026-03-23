<?php
/**
 * Tile
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'video-bg-with-content',
	'fade-in ',
    $block['align'],
	$className
);


$video = $videoimg = $videodescription = '';
$videoid = 'video-bg-'. $block['id'];
if(get_field('video_description')) {
    $videodescription = get_field('video_description');    
}


if(get_field('desktop_mp4')) {
    $desktopvid = $mobilevid = $videoclass = '';
        
    $desktopvid = get_field('desktop_mp4');
    $mobilevid = get_field('mobile_mp4');
    
    $loadvideo = $desktopvid;
    if ( wp_is_mobile() ) {
        $videoclass = ' mobile-video';
        $loadvideo = $mobilevid;
    }
    
    $video = '
    <video id="'.$videoid.'" class="video-bg-with-content__video" playsinline muted preload="none" tabindex="-1" aria-label="'.$videodescription.'" >
        <source id="'.$videoid.'__src" class="video-bg-with-content__src" type="video/mp4" data-mobile="'.$mobilevid.'" data-src="'.$desktopvid.'" data-loop="3" src="'.$loadvideo.'" />
        Your browser does not support the video tag.
    </video>';
}

if(get_field('video_placeholder')) {
    $posterid = get_field('video_placeholder');
    $videoimg = '<div id="'.$videoid.'__image" class="video-bg-with-content__placeholder active">'.wp_get_attachment_image($posterid, 'full').'</div>';
}
?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <div class="video-bg-with-content__content">
        <InnerBlocks />
    </div>
    <?php echo $video.$videoimg; ?>
</div>
