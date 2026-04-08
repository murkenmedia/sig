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
	'tile',
	'fade-in ',	
	$className
);


$btn = $url = $imglink = $img = '';
if(get_field('tile_img')) {
    $imgid = get_field('tile_img'); 
    $img = wp_get_attachment_image($imgid, 'full');
}


if(get_field('tile_link')) {    
    $link = get_field('tile_link');
    $url = wp_kses_post($link['url']);
    $target = $link['target'];
    $linktext = $link['title'];    
    $adatext = $linktext;

    array_push($block_classes, 'tile-has-link');
    
    if(get_field('ada_link')) {
        $adatext = get_field('ada_link');
    }
    
    $btn = '<div class="wp-block-button"><a href="'.$url.'" target="'.$target.'" aria-label="'.$adatext.'"><span>'.$linktext.'</span></a></div>';    
    
    $imglink = '<a href="'.$url.'" class="img-link" tabindex="-1" target="'.$target.'"><span class="sr-only">'.$adatext.'</span></a>';
} else {    
    array_push($block_classes,'no-zoom-hover');
}

$template = array(
    array('core/heading', array(
		'level' => 3,
		'placeholder' => 'Headline Goes Here',
        'className' => 'has-large-font-size'
	)),
    array( 'core/paragraph', array(
        'placeholder' => 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        'className' => 'has-small-font-size'
    ) )
);

$tile = '
<div class="tile__img">
    '.$img.'
    '.$imglink.'
</div>
<div class="tile__content">
    <InnerBlocks template="' . esc_attr( wp_json_encode( $template ) ) . '" />
    '.$btn.'
</div>';

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <?php echo $tile; ?>
</div>
