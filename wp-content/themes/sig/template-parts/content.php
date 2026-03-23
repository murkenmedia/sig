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

$title = widowfix(get_the_title($id));

$img = '';
if(get_field('disable_featured_img')) {
    
} else {
    if(has_post_thumbnail($id)) {
        $imgid = get_post_thumbnail_id($id);
        $img = '
        <div class="blog-featured-img mb-4 mb-sm-5">
            '.wp_get_attachment_image($imgid, 'full').'
        </div>';
    } 
}
$date = '<p class="sans-bold has-brown-color mb-1">'.get_the_date('F j, Y', $id).'</p>';

$parentid = $post->post_parent;
if ($hero == '') {
    $hero = get_default_hero($id,$parentid);
} else {
    $hero = '<div class="header-pad">'.$hero.'</div>';
}


///CATS & TAGS
$topiclinks = '';

$tagsarr = array();
$post_tags = get_the_tags($id);
if ( $post_tags ) {
	foreach( $post_tags as $tag ) {
        array_push($tagsarr, $tag->term_id);
        
        $topiclinks .= '
        <li>
            <a href="'.esc_attr( get_tag_link( $tag->term_id ) ).'">'.$tag->name.'</a>
        </li>
        ';
    }
}

$catsarr = array();
$post_cats = get_the_category($id);
if ( $post_cats ) {
	foreach( $post_cats as $cat ) {
        array_push($catsarr, $cat->term_id);        
        $topiclinks .= '
        <li>
            <a href="'.esc_attr( get_tag_link( $cat->term_id ) ).'">'.$cat->name.'</a>
        </li>
        ';
    }
}

$authors = '';
$authorsarr = get_the_terms( $id, 'authors' );
$authortitle = __('Author', 'sig');
if ( empty( $authorsarr ) ) {
    $author = get_term_by( 'slug', 'hope4cancer-treatment-centers', 'authors' );
    $authors = get_author_block($author);
} else {
    $authornum=0;
    foreach( $authorsarr as $author ) {
        $authors .= get_author_block($author);
        $authornum++;
	}
    
    if($authornum > 1) {
        $authortitle = __('Authors', 'sig');
    }
}
if($authors != '') {
    $authors = '
    <div class="blog-sidebar-topics blog-sidebar-module mb-5">
        <h4 class="mb-3 sans-bold has-small-font-size">'.$authortitle.'</h4>
        <div class="authors-wrap">
            '.$authors.'
        </div>
    </div>
    ';
}



/////SIDEBAR
$topics = '';
if($topiclinks !== '') {
    $topics = '
    <div class="blog-sidebar-topics blog-sidebar-module mb-5">
        <h4 class="mb-3 sans-bold has-small-font-size">'.__('Topics Covered', 'sig').'</h4>
        <ul class="blog-related-links list-unstyled has-small-font-size">
            '.$topiclinks.'
        </ul>
    </div>';
}

$relatedlinks = '
<div class="blog-sidebar-related blog-sidebar-module">
    <h4 class="mb-3 sans-bold has-small-font-size">'.__('Related Articles', 'sig').'</h4>
    <ul class="blog-related-links list-unstyled has-small-font-size">
        '.get_related_blog($id,$tagsarr,$catsarr,'link',4).'
    </ul>
</div>
';


?>

<article id="post-<?php the_ID(); ?>" <?php post_class('site-content'); ?>>
	<?php echo $hero; ?>
    
    <header class="blog-header mt-sm-5 mb-sm-5 mt-4 mb-4 has-text-align-center">
        <p class="sans-bold is-style-subtitle"><a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>"><?php echo get_blog_title(); ?></a></p>
        <h1 class="fade-in has-blue-dark-color mb-4"><?php echo $title; ?></h1>
        <div class="entry-meta">
            <?php echo $date; ?>
        </div>
        
        
    </header>
		
    <?php echo $img; ?>

    <div class="entry-content mx-auto pt-4 has-columns">
        <div class="entry-content__content">
            <?php the_content(); ?>
        </div>
        <div class="entry-content__sidebar">
            <div class="entry-content__sidebar__sticky mt-6 mt-md-0">
                <?php echo $authors; ?>
                <?php echo $topics; ?>
                <?php echo $relatedlinks; ?>
            </div>
        </div>
    </div>
    
    <footer class="blog-footer mt-5 mb-5 mx-auto ">
        <div class="blog-footer__cat text-center text-md-right">
        </div>
        <div class="blog-footer__social">
            <?php echo get_social_share($id); ?>
        </div>
    </footer>
    
    <div style="height:60px" aria-hidden="true" class="wp-block-spacer is-style-responsive-medium"></div>
    
    <div class="related-articles-block alignfull has-tan-light-background-color">
        <div class="related-articles-block__inner">
            <div style="height:100px" aria-hidden="true" class="wp-block-spacer is-style-responsive-large"></div>
            <h4 class="text-center mb-6 has-large-font-size has-brown-color">Related Articles</h4>
            <div class="max-xl mx-auto three-col-grid">
                <?php echo get_related_blog($id,$tagsarr,$catsarr,'',3); ?>
            </div>
            <div style="height:100px" aria-hidden="true" class="wp-block-spacer is-style-responsive-large"></div>
        </div>        
    </div>
</article>