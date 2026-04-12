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

$blog = $cat = $tag = $content = $terms = $catcontent = $searchcontent = $sort = $showevents = $loadposts = $tagcontent = '';
		
$filternum = 0;

$cat = get_field('category');
$tag = get_field('tag');
$max = get_field('max');

if(get_field('load_posts')) {
	$loadposts= true;
}

$args = array();
$args['posts_per_page'] = $max;

$args['post_type'] = array('post');

//CATS
$defaultcats = ' data-cats="" ';
if($cat != '') {
	$args['cat'] = $cat;

	$dcats = implode(', ', $cat);
	$defaultcats = ' data-cats="'.$dcats.'" ';
}

//TAGS
$defaulttags = ' data-tags="" ';
if($tag != '') {
	$args['tag__in'] = $tag;

	$dtags = implode(', ', $tag);
	$defaulttags = ' data-tags="'.$dtags.'" ';
}	
$page = 1;

//CAT TAX
$cattax = 'category';

//TAG TAX
$tagtax = 'post_tag';


//get articles

$blog = get_post_blocks($args,$loadposts,$page);

//search sort
$search_options = get_field('search_sort');

//CAT



//IF THE CATEGORIES ARE SET, THEN THE DROPDOWN WILL LIST THOSE OPTIONS. OTHERWISE SHOW ALL:

if( $search_options && in_array('cat', $search_options) ) {

	$catcontent .= '
		<div class="search-filter__col search-filter__cat">
			<label for="search-filter__cat__select" class="sr-only">'.__('Filter by Category', 'h4c').'</label>
			<select name="search-filter__cat__select" class="custom-select" id="search-filter__cat__select">
				<option value="CATEGORY">'.__( 'Filter by Category', 'h4c' ).'</option>';

	if($cat != '') {
		$cats = $cat;						
		foreach ( $cat as $c ) {							
			$cat_id = get_term_by('id', $c, $cattax);							
			$catcontent .=  '<option value="' . $c . '">' . $cat_id->name . '</option>';
		}						
	} else {
		
		$terms = get_terms( array( 
			'taxonomy' => $cattax, 
			'orderby' => 'count',
            'order' => 'DESC',
			'hide_empty' => true,
			'exclude' => array(1)
		));
		if( $terms ) : 
			foreach ( $terms as $term ) :
				$catcontent .=  '<option value="' . $term->term_id . '">' . $term->name . ' ('.$term->count.')</option>'; 
			endforeach;
		endif;
		
	}


	$catcontent .=  '</select></div>';
    $filternum++;
}

//TAG
if( $search_options && in_array('tag', $search_options) ) {

	$tagcontent .= '
		<div class="search-filter__col search-filter__tag">
			<label for="search-filter__tag__select" class="sr-only">'.__('Filter by Tag', 'h4c').'</label>
			<select name="search-filter__tag__select" class="custom-select" id="search-filter__tag__select">
				<option value="TAG">'.__( 'Filter by Tag', 'h4c' ).'</option>';

	//IF THE TAGS ARE SET, THEN THE DROPDOWN WILL LIST THOSE OPTIONS. OTHERWISE SHOW ALL:

	if($tag != '') {
		$tags = $tag;						
		foreach ( $tags as $t ) {							
			$tag_id = get_term_by('id', $t, 'post_tag');							
			$tagcontent .=  '<option value="' . $t . '">' . $tag_id->name . '</option>';
		}						
	} else {
		
		$tags = get_tags();
        foreach ( $tags as $t ) {
            $tagcontent .=  '<option value="' . $t->term_id . '">' . $t->name . '</option>';
        }
							
	}					

	$tagcontent .=  '</select></div>';
    $filternum++;

}


//SEARCH
if( $search_options && in_array('search', $search_options) ) {
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
}

if($filternum > 0) {
    
	$sort = '
	<div class="search-filter">
        <form method="post" id="search-filter" class="form-inline search-filter__form filters-'.$filternum.'">
            '.$catcontent.$tagcontent.$searchcontent.'
        </form>
        <div class="search-filter__loader"></div>
	</div>';					
}

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">	
    <?php echo $sort; ?>
    <div class="tiles-grid tiles-three-col tiles-stacked-content" data-page="1" data-max="<?php echo $max; ?>" <?php echo $defaulttags; ?> <?php echo $defaultcats; ?>">		
        <?php echo $blog; ?>			
    </div>
</div>