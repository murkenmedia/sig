<?php
/**
 * Sitemap
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'sitemap-grid-block',
    $className
);


$sitemap = $stay = $experience = $dine = $gather = $general = $other = '';

if ( has_nav_menu( 'sitemap-stay' ) ) {  
$stay = '
<div class="sitemap-grid__item">
    <h2 class="mb-4 has-medium-font-size">'.__('Stay', 'sig').'</h2>
    <ul>
        '.wp_nav_menu( array( 'theme_location' => 'sitemap-stay', 'container' => '', 'items_wrap' => '%3$s', 'echo' => false ) ).'
    </ul>
</div>';
}

if ( has_nav_menu( 'sitemap-experience' ) ) {  
$experience = '
<div class="sitemap-grid__item">
    <h2 class="mb-4 has-medium-font-size">'.__('Experience', 'sig').'</h2>
    <ul>
        '.wp_nav_menu( array( 'theme_location' => 'sitemap-experience', 'container' => '', 'items_wrap' => '%3$s', 'echo' => false ) ).'
    </ul>
</div>';
}

if ( has_nav_menu( 'sitemap-dine' ) ) {  
$dine = '
<div class="sitemap-grid__item">
    <h2 class="mb-4 has-medium-font-size">'.__('Dine', 'sig').'</h2>
    <ul>
        '.wp_nav_menu( array( 'theme_location' => 'sitemap-dine', 'container' => '', 'items_wrap' => '%3$s', 'echo' => false ) ).'
    </ul>
</div>';
}

if ( has_nav_menu( 'sitemap-gather' ) ) {  
$gather = '
<div class="sitemap-grid__item">
    <h2 class="mb-4 has-medium-font-size">'.__('Gather', 'sig').'</h2>
    <ul>
        '.wp_nav_menu( array( 'theme_location' => 'sitemap-gather', 'container' => '', 'items_wrap' => '%3$s', 'echo' => false ) ).'
    </ul>
</div>';
}

if ( has_nav_menu( 'sitemap-general' ) ) {  
$general = '
<div class="sitemap-grid__item">
    <h2 class="mb-4 has-medium-font-size">'.__('General Information', 'sig').'</h2>
    <ul>
        '.wp_nav_menu( array( 'theme_location' => 'sitemap-general', 'container' => '', 'items_wrap' => '%3$s', 'echo' => false ) ).'
    </ul>
</div>';
}

if ( has_nav_menu( 'sitemap-other' ) ) {   
    $other = '
    <div class="sitemap-grid__item">
        <h2 class="mb-4 has-medium-font-size">'.__('Other', 'sig').'</h2>
        <ul>
            '.wp_nav_menu( array( 'theme_location' => 'sitemap-other', 'container' => '', 'items_wrap' => '%3$s', 'echo' => false ) ).'
        </ul>
    </div>';    
}


$sitemap = '
<div class="sitemap-grid">
    '.$stay.$experience.$dine.$gather.$general.$other.'
</div>';



?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <?php echo $sitemap; ?>
</div>
