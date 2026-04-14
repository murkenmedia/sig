<?php
/**
 * Events Grid
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'events-grid-block',	
	$className
);


$today = date( 'Ymd', current_time( 'timestamp', 0 ) );
$grid = $featured = '';

$taxarr = '';
$hastax = false;
if(get_field('event_category')) {
    $taxarr = get_field('event_category');
    
    $hastax = true;
}

$args = array(
    'post_type' => 'events',
    'posts_per_page' => -1,
    'meta_key'  => 'start_date',
    'orderby'   => 'meta_value_num',
    'order'   => 'ASC',
    'post_status' => 'publish'
);

$grid = get_upcoming_events($args,$today);


if ($grid == '') {
	$grid = '
	<div class="events-grid__message">
		<p class="events-grid__message__alert">'.__('There are no upcoming events at this time. Please check back later.', 'sig').'</p>
	</div>';
}

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
	<div class="events-grid tiles-grid tiles-stacked-content tiles-stacked-content-arrow-btn">
        <?php echo $grid; ?>
    </div>
</div>
