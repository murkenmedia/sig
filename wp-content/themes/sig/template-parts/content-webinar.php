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

$titleclass='';
$title = widowfix(get_the_title($id));
if(strlen($title) > 65) {
    $titleclass = '  has-long-title';
}
if(strlen($title) > 95) {
    $titleclass = '  has-longer-title';
}


////////////FEATURED IMG
$img = $heroclass = '';
$heroclass = ' no-featured-img';

$webinar = '';
if(get_field('webinar_link', $id)) {

    $vimeourl = get_field('webinar_link', $id);


    if(has_post_thumbnail($id)) {
        $imgid = get_post_thumbnail_id($id);        
    } else {
        $imgid = get_field('default_grid_img', 'option' );
    }

    $url = wp_get_attachment_image_url($imgid, 'full');
    $img = '<img src="'.$url.'" alt="" width="1280" height="720" loading="lazy" class="lazy-video__img" />';

    $webinar = '
    <div id="webinar-'.$id.'" class="lazy-video-wrap fade-in mb-5 simple-video">
        <div id="video-'.$vimeourl.'" class="lazy-video lazy-vimeo" data-embed="'.$vimeourl.'">
            <button type="button" class="lazy-video__play">
                <div class="lazy-video__play__btn"></div>
                <span class="sr-only">'.__('Play Video', 'sig').'</span>
            </button>
            '.$img.'
        </div>
    </div>';
}

////////////HERO
$cpt = get_post_type($id);

switch ($cpt) {
    case "case-study":
        $parentlink = get_permalink( 921 );
        $parenttitle = get_insight_cpt_title($cpt);        
        break;
    default:
        $parentlink = get_permalink( get_option( 'page_for_posts' ) );
        $parenttitle = get_insight_cpt_title($cpt);
}

$breadcrumb = '<p class="hero__content__pretitle mb-4 blue-medium-link"><a href="'.$parentlink.'">'.$parenttitle.'</a></p>';
$hero = '
<div class="hero alignfull secondary-hero insights-hero'.$heroclass.'">
    <div class="hero__content max-xl">
        '.$breadcrumb.'
        <h1 class="insights-single__header__title mb-0 '.$titleclass.'">'.$title.'</h1>
    </div>
</div>';




////////////RELATED SIDEBAR
$topiclinks = '';

$topicsarr = array();
$terms = get_the_terms($id, 'insight_topic');
if( $terms ) : 
    $links = '';
    foreach ( $terms as $term ) :
        array_push($topicsarr, $term->term_id);        
        $links .= '
        <li>
            <a href="'.$parentlink.'#'.$term->slug.'">'.$term->name.'</a>
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

////////////RELATED FOOTER
$relatedlinks = '
<div class="insights-single__sidebar__module insights-sidebar-related">

    <h4 class="mb-3 sans-bold has-small-font-size has-blue-color">'.__('Related', 'sig').'</h4>

    <ul class="insights-single__sidebar__links list-unstyled has-small-font-size">
        '.get_related_insights($id,$topicsarr,$cpt,'link',4).'
    </ul>

</div>';

?>

<article id="post-<?php the_ID(); ?>" <?php post_class('site-content'); ?>>
    <?php echo $hero; ?>

    <div class="insights-single__content-wrap mx-auto">

        <div class="insights-single__content">
            <?php echo $webinar; ?>
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
            <h4 class="text-center mb-6 has-large-font-size sans-500 has-blue-dark-color">Related Webinars</h4>

            <div class="max-xl mx-auto tiles-grid tiles-three-col tiles-stacked-content">
                <?php echo get_related_insights($id,$topicsarr,$cpt,'',3); ?>
            </div>

        </div>        
    </div>
</article>