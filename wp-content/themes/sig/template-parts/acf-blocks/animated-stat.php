<?php
/**
 * Animated Stat
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
$block_classes = array(
	'stats-block',
	$block['align'],
	$className
);

$isadmin = false;
if (is_admin()) {
    $isadmin =  true;
}

$adminpre = $adminsuf = '';

$stat = $separator = '';
$stat = get_field('stat_animation');

$statnum = 0;
$stats = $class = $statclass = $wrapclass = '';


$animateclass = 'counter';

//OPTIONS
$options = get_field('options');
if( $options ): 
	foreach( $options as $option ):
		$class .= $option.' ';
	endforeach;
endif; 

$headtype = get_field('head_type');

if( $stat ):

	if ($stat['separator']) {
		$separator = ',';
	}

    if($isadmin) {
        $adminpre = $stat['prefix'];
        
        $adminsuf = $stat['suffix'];
    }

	$animated = 'data-start="'.$stat['start'].'" data-end="'.$stat['end'].'" data-speed="'.$stat['speed'].'" data-delay="'.$stat['delay'].'" data-decimal="'.$stat['decimal'].'" data-prefix="'.esc_html($stat['prefix']).'" data-suffix="'.$stat['suffix'].'" data-separator="'.$separator.'"';

	$startnum = $stat['end'];

	$statsize = $stat['prefix'].$stat['end'].$stat['suffix'].$separator;



endif;



$stats .= '
<div class="stat-wrap '.$wrapclass.'">
	<'.$headtype.' class="stat-number mb-0 '.$animateclass.' '.$statclass.' '.$class.'" id="stat'.$block['id'].'" '.$animated.'>'.$adminpre.$startnum.$adminsuf.'</'.$headtype.'>
</div>';




?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">	
	<?php echo $stats; ?>
</div>
