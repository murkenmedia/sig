<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package SIG
 */

get_header();

$term_id = get_queried_object_id();
$hero = get_blog_hero($term_id);

$title = get_the_archive_title();
?>

<section class="site-content top-content-pad max-xl" id="archive-<?php echo $term_id; ?>">
    
    <?php echo $hero; ?>

    <?php if ( have_posts() ) : ?>

        <header class="mt-sm-5 mb-sm-5 mt-4 mb-4 max-lg has-text-align-center">
            <p class="sans-bold is-style-subtitle"><a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>"><?php echo get_blog_title(); ?></a></p>
            <h1 class="has-text-align-center mb-4 archive-title"><?php echo widowfix($title); ?></h1>
            <?php echo $bio; ?>
        </header>
        <div style="height:30px" aria-hidden="true" class="wp-block-spacer is-style-responsive-medium"></div>
        <div class="three-col-grid">
            <?php
            /* Start the Loop */
            while ( have_posts() ) :
                the_post();
					$id = get_the_ID();        
                    echo get_post_block($id);
            endwhile;

            //the_posts_navigation();

        else :

            get_template_part( 'template-parts/content', 'none' );

        endif;
        ?>
    </div>
    
    <?php 
    $prev_link = get_previous_posts_link(__('&laquo; Previous', 'sig'));
    $next_link = get_next_posts_link(__('Next &raquo;', 'sig'));
    if ($prev_link || $next_link) {
        echo '
         <div class="post-grid-nav">
            <div class="post-grid-nav__prev">'.$prev_link.'</div>
            <div class="post-grid-nav__next">'.$next_link.'</div>
        </div>';
    } ?>


    <div style="height:150px" aria-hidden="true" class="wp-block-spacer is-style-responsive-large"></div>
</section>

<?php
get_footer();
