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

$titleclass = $content ='';
$titleclean = get_the_title($id);
$title = widowfix(get_the_title($id));
if(strlen($title) > 65) {
    $titleclass = '  has-long-title';
}
if(strlen($title) > 95) {
    $titleclass = '  has-longer-title';
}
$url = get_the_permalink($id);
$cpt = 'webinar';

////////////HERO
$parentlink = get_permalink( get_option( 'page_for_posts' ) );
$parenttitle = get_insight_cpt_title($cpt);

$breadcrumb = '<p class="hero__content__pretitle mb-4 blue-medium-link"><a href="'.$parentlink.'">'.$parenttitle.'</a></p>';
$hero = '
<div class="hero alignfull secondary-hero insights-hero no-featured-img">
    <div class="hero__content max-xl">
        '.$breadcrumb.'
        <h1 class="insights-single__header__title mb-0 '.$titleclass.'">'.$title.'</h1>
    </div>
</div>';

$gated = true;
if(get_field('gated')) {
    $gated = true;
}
////////////WEBINAR

//clear_webinar_cookie();

if($gated) {
    if(isset( $_COOKIE['webinar_access_granted'] )) {       
        $content =  get_webinar($id);
    } else {
        $content =  do_shortcode('[gravityform id="3" title="true" description="true" ajax="false" field_values="webinar-id='.$id.'&webinar-name='.$titleclean.'&webinar-url='.$url.'" theme="gravity" ]');        
    }

} else {
    $content =  get_webinar($id);
}


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
            <?php echo $content; ?>
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