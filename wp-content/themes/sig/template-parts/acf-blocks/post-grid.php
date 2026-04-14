<?php
/**
 * Post Grid
 *
 * @package SIG
 * @since   1.0.0
 */

$block_classes = array(
	'post-grid-block',
	'fade-in ',
);

$filternum = 0;

$max = get_field('max');
$loadposts = '';
if(get_field('load_posts')) {
	$loadposts= true;
}

$args = $cptarr = array();
$args['posts_per_page'] = -1;

////////CPT
if(get_field('type')) {
	$types = get_field('type');
} else {
	$types = array('post');
}
foreach( $types as $type ):
	array_push($cptarr, $type['value']);
endforeach;
$cpts = implode(',', $cptarr);
$args['post_type'] = $cptarr;


$grid = get_filter_post_blocks($args,$max,$cptarr);


//search sort
$search_options = get_field('search_sort');

$filters = '';

//POST TYPE SELECTOR

if( $search_options && in_array('type', $search_options) ) {
	
	$selections = '';

	if(count($types) > 1) {
	
		foreach( $types as $type ):

			/* $args = array(
				'post_type' => $type['value'],
				'posts_per_page' => 1
			);
			$the_query = new WP_Query( $args ); */

			//$total = $the_query->found_posts;
			//'&nbsp;['.$total.']</span>

			$selections .=  '
			<div class="post-grid__filter__checkbox">
				<label for="'.$type['value'].'-filter">
					<input type="radio" class="post-grid__filter" name="type" value="'.$type['value'].'" id="'.$type['value'].'-filter"  />
					<span>'.$type['label'].'</span>
				</label>
			</div>';
			
		endforeach;
		
		$filters .= '
		<div class="post-grid__filter__fieldset">
			<fieldset>
				<legend class="post-grid__filter__legend">'.__('Filter by Category', 'sig').'</legend>
				'.$selections.'
			</fieldset>
		</div>';

    	$filternum++;		
	} 
	
}

if( $search_options && in_array('topics', $search_options) ) {

	$selections = $terms = '';

	$terms = get_terms( array( 
		'taxonomy' => 'insight_topic', 
		'orderby' => 'count',
		'order' => 'DESC',
		'hide_empty' => true,
	));
	if( $terms ) : 
		foreach ( $terms as $term ) :
			//&nbsp;['.$term->count.']</span>
			$selections .=  '
			<div class="post-grid__filter__checkbox">
				<label for="'.$term->slug.'-filter">
					<input type="checkbox" class="post-grid__filter" name="'.$term->slug.'" value="'.$term->slug.'" id="'.$term->slug.'-filter" />
					<span>'.$term->name.'</span>
				</label>
			</div>';
		endforeach;
	endif;


	$filters .= '
	<div class="post-grid__filter__fieldset">
		<fieldset>
			<legend class="post-grid__filter__legend">'.__('Filter by Topic', 'sig').'</legend>
			'.$selections.'
		</fieldset>
	</div>';

    $filternum++;
}

$sort = '';
if($filternum > 0) {
    
	$sort = '
	<div class="post-grid__filters">
        '.$filters.'
	</div>';					
}

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
	<div class="post-grid-block__column sort-column">
    	<?php echo $sort; ?>
	</div>
	<div class="post-grid-block__column posts-column">
		<div class="post-grid tiles-grid tiles-stacked-content">		
			<?php echo $grid; ?>
			<div class="post-grid__message">
				<button class="post-grid__load-btn">Load More</button>
			</div>		
		</div>
		
	</div>
</div>