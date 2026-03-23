<?php
/**
 * Tiles Grid
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'tiles-block',
    'tiles-grid-block',	
	$className
);
$template = array(
    array('acf/tile')
);

if(get_field('tile_style')) {
    array_push($block_classes, get_field('tile_style'));
    
    if(get_field('tile_style') == 'no-tile-img-crop') {
        array_push($block_classes, 'tiles-stacked-content');
    }
}

if(get_field('btn_style')) {
    array_push($block_classes, get_field('btn_style'));
}

if(get_field('col_style')) {
    array_push($block_classes, get_field('col_style'));
}

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <InnerBlocks template="<?php echo esc_attr( wp_json_encode( $template ) ); ?>" />
</div>
