<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package SIG
 */

get_header();

$content = $hero = '';

$hero = get_hero_with_custom_text('404 Page Not Found');

?>
<section <?php post_class('site-content error-404'); ?>>
    <?php 
    echo $hero;
    if ( is_active_sidebar( 'page-not-found' ) ) :
        dynamic_sidebar('page-not-found');			
    endif;
    ?>
    <?php get_search_form(); ?>
    
    <div style="height:100px" aria-hidden="true" class="wp-block-spacer is-style-responsive-large"></div>
</section>

<?php
get_footer();
