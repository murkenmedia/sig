<?php
/**
 * Team Grid
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'team-grid-wrap',
	'animation-chain',
	$block['align'],	
	$className
);

$colorarr = array('blue-light', 'blue-light-medium', 'blue-medium', 'blue');
$teamnum = 0;
$team = '';

if( have_rows('team') ):
    while( have_rows('team') ) : the_row();
		$popup = $imglink = $link1 = $link2 = '';
        $name = get_sub_field('name');
		$linebreakname = str_replace(" ", "<br />", $name); 
		$title = get_sub_field('title');

		$imgid = get_sub_field('img');
		$img = wp_get_attachment_image($imgid,'full');

		if(get_sub_field('bio')) {
			$bio = get_sub_field('bio');
			$bio = wpautop($bio);
			$slug = sanitize_title($name);		
		
			$popup = '
			<div id="'.$slug.'" class="white-popup mfp-hide team-popup">
				<div class="team-popup__img '.$colorarr[$teamnum].'-border">
					'.$img.'
				</div>
				<div class="team-popup__title">
					<h3 class="has-bluedark-color mb-2 has-large-font-size">'.$linebreakname.'</h3>
					<p class="has-blue-color mb-0">'.$title.'</p>
				</div>
				<div class="team-popup__content">
					'.$bio.'
				</div>
			</div>';
			
			$imglink = '<a class="open-popup-link" href="#'.$slug.'" tabindex="-1"><span class="sr-only">'.__('Read '.$name.' bio', 'sig').'</span>';

			$link1 = '<a class="open-popup-link" href="#'.$slug.'">';
			$link2 = '</a>';

		}


		$team .= '
		<div class="team-grid fade-in">
			<div class="team-grid__img '.$colorarr[$teamnum].'-border">
				'.$imglink.'
				'.$img.'
				'.$link2.'
			</div>
			<div class="team-grid__content">
				<h3 class="has-bluedark-color mb-2 ignore-br-md">'.$link1.$linebreakname.$link2.'</h3>
				<p class="has-blue-color">'.$title.'</p>
			</div>			
			'.$popup.'
		</div>';

		$teamnum++;
		
		if($teamnum == 4) {
			$teamnum = 0;
		}

    endwhile;
endif;

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
	<?php echo $team; ?>
</div>
