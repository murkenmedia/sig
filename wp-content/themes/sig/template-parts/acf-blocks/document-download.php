<?php
/**
 * Document Download
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'document-download',
    'fade-in',
    $className
);


$location = get_field('file_location');
if($location == 'media-library') {
    $filearr = get_field('file');
    $fileurl = $filearr['url'];
} else {
    $fileurl = get_field('external_url');
}

$imgid = get_field('img');
$img = wp_get_attachment_image($imgid, 'full', '');
$img = '<div class="document-download__img"><a href="'.$fileurl.'" tabindex="-1" target="_blank">'.$img.'</a></div>';

$title = get_field('title');
$title = '<h3 class="document-download__title has-small-font-size mb-3 link-hover-underline"><a href="'.$fileurl.'" target="_blank">'.$title.'</a></h3>';

$layout = get_field('layout');
array_push($block_classes,$layout);

$languages = '';
if( have_rows('languages') ):

    while( have_rows('languages') ) : the_row();
    
        $langtitle = get_sub_field('language');

        if($location == 'media-library') {
            $langfileurl = get_sub_field('file');
        } else {
           $langfileurl = get_sub_field('external_url');
        }

        $languages .= '
        <li>
            <a href="'.$langfileurl.'" target="_blank">'.$langtitle.'</a>         
        </li>';
        
    endwhile;

    $languages = '
    <ul class="document-download__languages has-small-font-size is-style-border-list">'.$languages.'</ul>';
endif;

$content = '
<div class="document-download__content">
    '.$title.'
    '.$languages.'
</div>';

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <?php echo $img.$content; ?>
</div>