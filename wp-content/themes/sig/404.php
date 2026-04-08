<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package SIG
 */

get_header();

$content = $hero = $notfoundid = '';

$args = array(
    'post_type' => 'page',
    'post_status' => 'private',
    'posts_per_page' => 1,
    'post_title' => '404 Page Not Found'
);


$query = new WP_Query($args);
if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();    
        $notfoundid = get_the_ID();
        $content = get_the_content($notfoundid);
    }
}
wp_reset_postdata();


$hero = get_default_hero('404 Page Not Found');

?>
<section <?php post_class('site-content error-404'); ?>>
    <?php 
    echo $hero;
    echo $content;    
    ?>
    <?php get_search_form(); ?>
    
    <div style="height:100px" aria-hidden="true" class="wp-block-spacer is-style-responsive-large"></div>
</section>

<?php
get_footer();
