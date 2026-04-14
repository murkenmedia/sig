<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SIG
 */

global $post;
$id = $post->ID;

$titleclass=$headerclass='';
$title = widowfix(get_the_title($id));
if(strlen($title) > 65) {
    $titleclass = '  has-long-title';
}
if(strlen($title) > 95) {
    $titleclass = '  has-longer-title';
}



$insightslink = get_permalink( get_option( 'page_for_posts' ) );
$insightstitle = get_blog_title();
$breadcrumb = '<p class="hero__content__pretitle mb-4 blue-medium-link"><a href="'.$insightslink.'">'.$insightstitle.'</a></p>';
//$hero = get_post_hero($id,$insightslink,$insightstitle);

//$date = '<p class="has-green-color mb-1">'.get_the_date('F j, Y', $id).'</p>';
/* $hero = '
<div class="hero alignfull secondary-hero insights-hero ">
    <div class="hero__content max-xl text-center">
        '.$breadcrumb.'
            <h1 class="hero__content__title has-white-color d-block'.$titleclass.' mb-5">'.$title.'</h1>
            '.$date.'
    </div> 
</div>'; */

$hero = '
<div class="hero alignfull insights-hero">
    
</div>';


$img = '';
if(get_field('disable_featured_img')) {
    $headerclass = ' no-featured-img';
} else {
    
    if(has_post_thumbnail($id)) {
        $imgid = get_post_thumbnail_id($id);
        $headerclass = ' has-featured-img';
        $img = '
        <div class="insights-single__featured-img">
            '.wp_get_attachment_image($imgid, 'full').'
        </div>';
    } 
}

/////SIDEBAR
$topiclinks = '';

$topicsarr = array();
$terms = get_the_terms($id, 'insight_topic');
if( $terms ) : 
    foreach ( $terms as $term ) :
        array_push($topicsarr, $term->term_id);        
        $links .= '
        <li>
            <a href="'.$insightslink.'#'.$term->slug.'">'.$term->name.'</a>
        </li>
        ';
    endforeach;

    $topiclinks .= '
    <div class="insights-single__sidebar__module insights-sidebar-topics mb-5">
        <h4 class="mb-3 sans-bold has-small-font-size has-blue-color">'.__('Topics', 'sig').'</h4>
        <ul class="insights-single__sidebar__links list-unstyled has-small-font-size">
            '.$links.'
        </ul>
    </div>';
endif;

$authors = '';




$relatedlinks = '
<div class="insights-single__sidebar__module insights-sidebar-related">

    <h4 class="mb-3 sans-bold has-small-font-size has-blue-color">'.__('Related', 'sig').'</h4>

    <ul class="insights-single__sidebar__links list-unstyled has-small-font-size">
        '.get_related_insights($id,$topicsarr,'link',4).'
    </ul>

</div>
';


$header = '
<header class="insights-single__header '.$headerclass.'">
    '.$breadcrumb.'
    <h1 class="insights-single__header__title mb-0 '.$titleclass.'">'.$title.'</h1>
</header>';

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('site-content'.$headerclass); ?>>
    <?php echo $hero; ?>

    <div class="insights-single__header-wrap alignfull">
        <?php echo $header; ?>
        
    </div>

    <?php echo $img; ?>

    <div class="insights-single__content-wrap mx-auto">

        <div class="insights-single__content">
            <?php the_content(); ?>
        </div>

        <div class="insights-single__sidebar">
            <div class="insights-single__sidebar__sticky mt-6 mt-md-0">
                <?php echo $topiclinks; ?>
                <?php echo $relatedlinks; ?>
            </div>
        </div>

    </div>
    
    <footer class="insights-single__footer mx-auto">

        <div class="insights-single__footer__cat text-center text-md-right">
            <ul class="insights-single__footer__cat-list sans-500">
                <?php //echo $themelinks; ?>
            </ul>
        </div>

        <div class="insights-single__footer__social">
            <?php echo get_social_share($id); ?>
        </div>

    </footer>
    
    
    <div class="insights-single__related-articles related-articles alignfull">

        <div class="related-articles__inner">
            <h4 class="text-center mb-6 has-large-font-size sans-500 has-blue-dark-color">Related Insights</h4>

            <div class="max-xl mx-auto tiles-grid tiles-three-col tiles-stacked-content">
                <?php echo get_related_insights($id,$topicsarr,'',3); ?>
            </div>

        </div>        
    </div>
</article>