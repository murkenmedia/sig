<?php
/**
 * Social Menu
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'social-menu-block',
	$className
);
$styles = get_field('menu_style');
if($styles) {
    foreach( $styles as $style ):
        array_push($block_classes,$style);
    endforeach;    
}

$title = '';
if(get_field('title')) {
    $title = '
    <li class="social-title">
        <h3 class="mb-0">'.get_field('title').'</h3>
    </li>';
}

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <ul class="social-menu">
        <?php echo $title; ?>
        <?php wp_nav_menu( array( 'theme_location' => 'social', 'container' => '', 'items_wrap' => '%3$s', 'link_before' => '<span class="sr-only">','link_after' => '</span>' ) ); ?>
    </ul>
</div>
