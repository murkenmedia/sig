<?php

///UPDATE EVENT DATE ON SAVE
//SAVE END TIME ON SINGLE DAY EVENT
//FIND START AND END DATE ON SELECT DATES EVENT
add_action( 'admin_footer', 'eventsave_ajax_javascript' );
function eventsave_ajax_javascript() { 
	global $my_admin_page;
    $screen = get_current_screen();	
	$id = get_the_ID();
    if ( is_admin() && $screen->id == 'events') {
?>
<script type="text/javascript" >
    jQuery(document).ready(function($) {
						
		let intervalCheckPostIsSaved;

		wp.data.subscribe(function () {
			let editor = wp.data.select('core/editor');

			if (editor.isSavingPost()
				 && !editor.isAutosavingPost()
				 && editor.didPostSaveRequestSucceed()) {

				if (!intervalCheckPostIsSaved) {
					intervalCheckPostIsSaved = setInterval(function () {
						if (!wp.data.select('core/editor').isSavingPost()) {						

							update_block_field();

							clearInterval(intervalCheckPostIsSaved);
							intervalCheckPostIsSaved = null;
						}
					}, 800);
				}
			}
		});

    });
				
	function update_block_field() {
		
		let intervalMetaIsSaved;
		let ajaxRequest;
		intervalMetaIsSaved = setInterval(function () {			
			ajaxRequest = jQuery.ajax({
				url: ajaxurl,
				type: 'POST',
				data: {
					'action': 'eventsave_ajax',
					'eventid': <?php echo $id; ?>
				}, 
				success: function (response) {
					//console.log(response);
					if(response == 'repeat' || response == '') {
						
					} else {
						//jQuery('.acf-field_60579176c33c8 .acf-input').html(response);
						clearInterval(intervalMetaIsSaved);
						intervalMetaIsSaved = null;
					}
				}
			});
		}, 1500);
		
	}
</script> 
    <?php
	}
}


add_action("wp_ajax_eventsave_ajax" , "eventsave_ajax");
function eventsave_ajax(){
    $id = $_POST['eventid'];
	$data = 'repeat';
	$eventtype = get_field('event_type',$id);
	
	if ($eventtype == 'Single Day') {
		$start = get_field('start_date',$id);
		update_field('end_date', $start, $id);
		
		$data = 'End Date: '.$start;
		
	} elseif ($eventtype == 'Select Dates') {
		
		$dates = array();
		if( have_rows('select_dates', $id) ):
			while( have_rows('select_dates', $id) ) : the_row();		
				$start = get_sub_field('select_start',$id, false);				
				$end = get_sub_field('select_end',$id, false);
	
				array_push($dates, $start, $end);
			endwhile;
		endif;
		
		array_multisort(array_map('strtotime', $dates), $dates);
		
		$start = $dates[0];
		$end = $dates[array_key_last($dates)];
		
		update_field('start_date', $start, $id);
		update_field('end_date', $end, $id);
		
		$data = 'Start Date: '.$start.' End Date: '.$end;
		//$data = 'complete';
		
	} elseif ($eventtype == 'Weekly Select' || $eventtype == 'Daily') {
		
		$start = '20250101';
		$end = '20400101';
		update_field('start_date', $start, $id);
		update_field('end_date', $end, $id);
		
		$data = 'Start Date: '.$start.' End Date: '.$end;
		
	} else {
		$data = 'complete';
	}
	
	echo $data;
	
    wp_die();
}


?>