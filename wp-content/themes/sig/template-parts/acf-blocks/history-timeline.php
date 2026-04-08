<?php
/**
 * History Timeline
 *
 * @package HDC
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'history-timeline-wrap',
	'fade-in ',
	$block['align'],	
	$className
);

$timeline = '';
$histnum = 0;

$colorarr = array('blue-light-medium', 'blue-light-medium', 'blue-medium', 'blue', 'blue-dark-medium', 'blue-dark');

if( have_rows('timeline') ):
    while( have_rows('timeline') ) : the_row();
		
        $year = get_sub_field('year');
		$content = get_sub_field('content');

        $timeline .= '
        <div class="history-timeline__item">
            <div class="history-timeline__date move-left delay outline has-'.$colorarr[$histnum].'-color">'.$year.'</div>            
            <div class="history-timeline__content move-right delay">
                '.$content.'
            </div>
        </div>';

        if($histnum < 5) {
			$histnum++;
		}
        

    endwhile;
endif;


?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <div class="history-timeline__timeline animate">
        <div class="history-timeline__timeline__top"></div>
        <div class="history-timeline__timeline__line"></div>
        <div class="history-timeline__timeline__bot"></div>
    </div>
    <div class="history-timeline">
        <?php echo $timeline; ?>
        <div class="history-timeline__end move-up delay">
            <InnerBlocks />
        </div>
    </div>
</div>
