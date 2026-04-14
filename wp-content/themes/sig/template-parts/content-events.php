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

$today = date( 'Ymd', current_time( 'timestamp', 0 ) );


$titleclass='';
$title = widowfix(get_the_title($id));
if(strlen($title) > 65) {
    $titleclass = '  has-long-title';
}
if(strlen($title) > 95) {
    $titleclass = '  has-longer-title';
}


$ctabtn = '';
if(get_field('cta_link')) {
    $ctalink = get_field('cta_link');
    $ctaurl = $ctalink['url'];
    $ctatitle = $ctalink['title'];
    $ctatarget = $ctalink['target'];

    $ctabtn = '
    <div class="wp-block-button mt-5">
        <a class="wp-block-button__link has-blue-medium-color green-hover" tabindex="-1" href="'.$ctaurl.'" target="'.$ctatarget.'">
            '.$ctatitle.'
        </a>
    </div>';
}

$date = '';
$enddatetime = $today;
if(get_field('end_date',$id, false)) {
    $enddate = get_field('end_date',$id, false);
} else {
    $enddate = get_field('start_date',$id, false);
}





///DATE PASSED
$alert = '';
$enddatetime = new DateTime($enddate);
$date = $enddatetime->format('Ymd');

if($today > $date) {
    $alert = '<p class="event-alert has-blue-medium-color sans-600">'.__('This event has passed.', 'sig').'</p>';
    $ctabtn = '';
}


$eventtime = get_event_time($id);
$details = '<p class="mt-2 mb-2 weight-600 has-green-color has-large-font-size">'.widowfix($eventtime).'</p>';




$parentlink = get_home_url().'/events/';
$parenttitle = 'Events';
$breadcrumb = '<p class="hero__content__pretitle mb-4 blue-medium-link"><a href="'.$parentlink.'">'.$parenttitle.'</a></p>';
$hero = '
<div class="hero alignfull secondary-hero events-hero">
    <div class="hero__content max-xl">
        '.$breadcrumb.'
        <h1 class="insights-single__header__title mb-4 '.$titleclass.'">'.$title.'</h1>
        <p class="mb-0 weight-500 letter-spacing-1 has-blue-light-color has-large-font-size">'.widowfix($eventtime).'</p>
        '.$ctabtn.'
    </div>
</div>';


$location = '';
if(get_field('event_location', $id)) {
    $location = '
    <li>
        <strong>Location</strong>
        '.get_field('event_location', $id).'
    </li>';
}
$eventdetailstime = '
<li>
    <strong>Date</strong>
    '.$eventtime.'
</li>';



$eventdetails = '
<div class="events-single__sidebar__details">
    <h3 class="sans-500 has-blue-color">Event Details</h3>
    <ul>
        '.$eventdetailstime.'
        '.$location.'
    </ul>
</div>';

?>


<article id="post-<?php the_ID(); ?>" <?php post_class('site-content'); ?>>
    <?php echo $hero; ?>

    <div class="events-single__content-wrap">

        <div class="events-single__content">
            
            <?php echo $alert; ?>
            <?php the_content(); ?>
            <?php echo $ctabtn; ?>
        </div>

        <div class="events-single__sidebar">
            <?php echo $eventdetails; ?>
        </div>

    </div>
    
</article>