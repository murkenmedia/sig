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


$blog = get_filter_post_blocks($args,$max,$loadposts);

//search sort
$search_options = get_field('search_sort');

//THEMES
$themefilters = '';
if( $search_options && in_array('insight_theme', $search_options) ) {
	$selections = $terms = '';

	$terms = get_terms( array( 
		'taxonomy' => 'insight_theme', 
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


	$themefilters = '
	<div class="post-grid__filter__fieldset">
		<fieldset>
			<legend class="post-grid__filter__legend">'.__('Theme', 'sig').'</legend>
			'.$selections.'
		</fieldset>
	</div>';

    $filternum++;

}

$solutionfilters = '';
if( $search_options && in_array('insight_solution', $search_options) ) {
	$selections = $terms = '';

	$terms = get_terms( array( 
		'taxonomy' => 'insight_solution', 
		'orderby' => 'count',
		'order' => 'DESC',
		'hide_empty' => true,
	));
	if( $terms ) : 
		foreach ( $terms as $term ) :
			$selections .=  '
			<div class="post-grid__filter__checkbox">
				<label for="'.$term->slug.'-filter">
					<input type="checkbox" class="post-grid__filter" name="'.$term->slug.'" value="'.$term->slug.'" id="'.$term->slug.'-filter" />
					<span>'.$term->name.'</span>
				</label>
			</div>';
		endforeach;
	endif;


	$solutionfilters = '
	<div class="post-grid__filter__fieldset">
		<fieldset>
			<legend class="post-grid__filter__legend">'.__('Solution', 'sig').'</legend>
			'.$selections.'
		</fieldset>
	</div>';

    $filternum++;

}

//POST TYPE SELECTOR
$typefilters = '';
if( $search_options && in_array('type', $search_options) ) {
	
	$selections = '';

	if(count($types) > 1) {
	
		foreach( $types as $type ):

			$args = array(
				'post_type' => $type['value'],
				'posts_per_page' => 1
			);
			$the_query = new WP_Query( $args );

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
		
		$typefilters = '
		<div class="post-grid__filter__fieldset">
			<fieldset>
				<legend class="post-grid__filter__legend">'.__('Insight Type', 'sig').'</legend>
				'.$selections.'
			</fieldset>
		</div>';

    	$filternum++;
		
	}
	
}


//SEARCH
/* if( $search_options && in_array('search', $search_options) ) {
	$searchcontent = '
	<div class="search-filter__col search-filter__search">
		<div class="input-group search-group">
		  <label for="search-filter__search__input" class="sr-only search-filter__search__label">'.__( 'Search', 'h4c' ).'</label>
		  <input type="text" name="search-filter__search__input" placeholder="'.__( 'Search', 'h4c' ).'" id="search-filter__search__input" class="form-control search-filter__search__input" />
		  <div class="input-group-append">
			<button class="search-filter__search__btn" type="button">
                <span class="screen-reader-text" aria-label="Search button">'.__( 'Search', 'h4c' ).'</span>
            </button>
		  </div>
		</div>
	</div>';
    
    $filternum++;
} */

$sort = '';
if($filternum > 0) {
    
	$sort = '
	<div class="post-grid__filters">
        '.$solutionfilters.$themefilters.$typefilters.'
	</div>';					
}

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
	<div class="post-grid-block__column sort-column">
    	<?php echo $sort; ?>
	</div>
	<div class="post-grid-block__column posts-column">
		<div class="post-grid tiles-grid tiles-stacked-content" >		
			<?php echo $blog; ?>
			<div class="post-grid__message">
				<button class="post-grid__load-btn">Load More</button>
			</div>		
		</div>
		
	</div>
</div>