<?php
/**
 * Resources Logos
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'resources-logos',
    'animation-chain',
    $className
);

$logos = '';
$logonum = 0;
if( have_rows('logos') ):

    while( have_rows('logos') ) : the_row();
        $img = $link1 = $link2 = '';

        $imgid = get_sub_field('img');
        $img = wp_get_attachment_image($imgid, 'full');
        
        

        if(get_sub_field('link')) {
            $linkarr = get_sub_field('link');
            $linkurl = $linkarr['url'];
            $linktarget = $linkarr['target'];
            
            $linktext = '<span class="sr-only">'.$linkarr['title'].'</span>';
            
            $link1 = '<a href="'.$linkurl.'" target="'.$linktarget.'" >'.$linktext;
            $link2 = '</a>';
        }

        $logos .= '
        <div class="resources-logo fade-in">'
            .$link1.$img.$link2.'            
        </div>';

        $logonum++;
        
    endwhile;
endif;


array_push($block_classes, 'logos-'.$logonum);
?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <?php echo $logos; ?>
</div>