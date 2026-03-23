<?php
/**
 * Collapsable
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
    'collapasble-wrap',
    $className
);

$title = get_field('title');
$slug = sanitize_title($title);
$collapse = 'collapse-'.$slug;
$heading = 'heading-'.$slug;

$class = 'show';
$expanded = 'true';

if(get_field('hide')) {
    $class = '';
    $expanded = 'false';
}

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <div class="collapsable">
        <div class="collapsable__header" id="<?php echo $heading; ?>">          
            <h3>
                <button class="collapsable__btn" type="button" data-toggle="collapse" data-target="#<?php echo $collapse; ?>" aria-expanded="<?php echo $expanded; ?>" aria-controls="<?php echo $collapse; ?>">
                    <?php echo $title; ?>
                    <div class="collapsable__btn__icon"></div>
                </button>
            </h3>
        </div>
        <div id="<?php echo $collapse; ?>" class="collapse <?php echo $class; ?>" aria-labelledby="<?php echo $heading; ?>">
            <div class="collapsable__content">
                <InnerBlocks />
            </div>
        </div>
    </div>
</div>