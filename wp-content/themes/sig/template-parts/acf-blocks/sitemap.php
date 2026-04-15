<?php
/**
 * Sitemap
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'sitemap-grid-block',
    $className
);
$excludearr = array();
$exclude = '';
if(get_field('exclude') ) {
    $excludearr = get_field('exclude');

    $exclude = implode(",", $excludearr); 

}

$sitemap = $links = '';

//PAGES
$args = array(
    'post_type' => 'page',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'exclude' => $exclude,
    'title_li' => '',
    'echo' => false
);
$links = wp_list_pages($args);

$sitemap .= '
<div class="sitemap-grid__item">
    <h2 class="mb-4 has-medium-font-size">'.__('Pages', 'sig').'</h2>
    <ul>
        '.$links.'
    </ul>
</div>';

///SOLUTIONS
$args = array(
    'post_type' => 'solutions',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'title_li' => '',
    'exclude' => $exclude,
    'echo' => false
);
$links = wp_list_pages($args);

$sitemap .= '
<div class="sitemap-grid__item">
    <h2 class="mb-4 has-medium-font-size">'.__('Solutions', 'sig').'</h2>
    <ul>
        '.$links.'
    </ul>
</div>';

////PLATFORMS
$args = array(
    'post_type' => 'platforms',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'title_li' => '',
    'exclude' => $exclude,
    'echo' => false
);
$links = wp_list_pages($args);

$sitemap .= '
<div class="sitemap-grid__item ">
    <h2 class="mb-4 has-medium-font-size">'.__('Platforms', 'sig').'</h2>
    <ul>
        '.$links.'
    </ul>
</div>';


////CASE STUDIES
$args = array(
    'post_type' => 'case-study',
    'post_status' => 'publish',
    'post__not_in'   => $excludearr,
    'posts_per_page' => -1,
);
$links = wp_list_pages($args);


$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) {
        $the_query->the_post();				
        $postid = get_the_id();
        $links .= '
        <li><a href="'.get_the_permalink().'">'.get_the_title().'</a></li>';
    }
    wp_reset_postdata();
}

$sitemap .= '
<div class="sitemap-grid__item three-column-list">
    <h2 class="mb-4 has-medium-font-size">'.__('Case Studies', 'sig').'</h2>
    <ul>
        '.$links.'
    </ul>
</div>';

////WEBINARS
$args = array(
    'post_type' => 'webinar',
    'post_status' => 'publish',
    'post__not_in'   => $excludearr,
    'posts_per_page' => -1,
);
$links = wp_list_pages($args);


$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) {
        $the_query->the_post();				
        $postid = get_the_id();
        $links .= '
        <li><a href="'.get_the_permalink().'">'.get_the_title().'</a></li>';
    }
    wp_reset_postdata();
}

$sitemap .= '
<div class="sitemap-grid__item three-column-list">
    <h2 class="mb-4 has-medium-font-size">'.__('Webinars', 'sig').'</h2>
    <ul>
        '.$links.'
    </ul>
</div>';


////INSIGHTS
$args = array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'post__not_in'   => $excludearr,
    'posts_per_page' => -1,
);
$links = wp_list_pages($args);


$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) {
        $the_query->the_post();				
        $postid = get_the_id();
        $links .= '
        <li><a href="'.get_the_permalink().'">'.get_the_title().'</a></li>';
    }
    wp_reset_postdata();
}

$sitemap .= '
<div class="sitemap-grid__item three-column-list">
    <h2 class="mb-4 has-medium-font-size">'.__('Insights', 'sig').'</h2>
    <ul>
        '.$links.'
    </ul>
</div>';

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <div class="sitemap-grid">
        <?php echo $sitemap; ?>
    </div>
</div>
