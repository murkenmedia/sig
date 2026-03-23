<?php
/**
 * Projects Grid
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'projects-grid',
    'full',	
	$className
);

$grid = $popups = $safecleanwater = $orglogo = '';

$projectnum = 0;

$colorarr = array(
    '27, 106, 54',
    '54, 109, 124',
    '90, 40, 109',
    '164, 150, 140',
    '159, 45, 68',
    '29, 45, 85',
    '26, 151, 213',
    '244, 125, 39',
    '0, 46, 97',
);
$colorcount = count($colorarr);


if(get_field('scw_logo', 'options')) {
    $scwid = get_field('scw_logo', 'options');
    $scwlogo = wp_get_attachment_image($scwid, 'full');

    $scwlink = get_field('scw_link', 'options');
    
    $safecleanwater = $scwlogo.'
    <p class="is-external-link icon-opacity-full"><a href="'.$scwlink['url'].'" target="'.$scwlink['target'].'">'.$scwlink['title'].'</a></p>';
}

$pageid = get_the_ID();

$type = get_field('type');
if($type == 'manual') {
    
    $projects = get_field('projects');
    if( $projects ):
        foreach( $projects as $projectid ):
            $color = $colorarr[$projectnum];

            $project = get_project_grid($projectid,$safecleanwater,$color);
            $grid .= $project;

            if (str_contains($project, 'project-has-excerpt')) {
                $projectnum++;
                if($projectnum >= $colorcount) {
                    $projectnum = 0;
                }        
            }
    
        endforeach;
    endif;
    
    
    
} else {
    
    $args = array( 
        'order' => 'ASC',
        'posts_per_page' => '-1', 
        'post_type' => 'projects',
        'orderby' => 'menu_order',
        'post_status' => 'publish'	
    );

    $loop = new WP_Query( $args );
    while ( $loop->have_posts() ) : $loop->the_post();
        $id = get_the_ID();
        $color = $colorarr[$projectnum];

        $project = get_project_grid($id,$safecleanwater,$color);
        $grid .= $project;

        if (str_contains($project, 'project-has-excerpt')) {
            $projectnum++;
            if($projectnum >= $colorcount) {
                $projectnum = 0;
            }        
        }

    endwhile;

    wp_reset_postdata();    
    
}



?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">	
	<?php echo $grid; ?>
</div>
