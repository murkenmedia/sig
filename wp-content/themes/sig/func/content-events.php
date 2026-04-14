<?php

if ( ! function_exists( 'date_sort' ) ) {
	/**
	 * SORT EVENTS BY DATE
	 *
	 * @since 1.0.0
	 */
	function date_sort($a, $b) {
		return strtotime($a['date']) - strtotime($b['date']);
	}
}

if ( ! function_exists( 'datetime_sort' ) ) {
	/**
	 * SORT EVENTS BY DATE
	 *
	 * @since 1.0.0
	 */
	function datetime_sort($a, $b) {
		return strtotime($a['datetime']) - strtotime($b['datetime']);
	}
}
        

	
if ( ! function_exists( 'get_event_time' ) ) {
	/**
	 * GET EVENT TIME
	 *
	 * @since 1.0.0
	 */
	function get_event_time($id) {
        
        $type = $startdate = $time = '';
        
       
		if(get_field('start_date',$id, false) && get_field('end_date',$id, false)) {
			$start = get_field('start_date',$id, false);
			$start = new DateTime($start);
			$end = get_field('end_date',$id, false);
			$end = new DateTime($end); 
			if($start == $end) {
				$startdate = $start->format('M j Y');
			} else {
				$startdate = $start->format('M j').'-'.$end->format('M j, Y');
			}
		} else {
			if(get_field('start_date',$id, false)) {
				$start = get_field('start_date',$id, false);
				$start = new DateTime($start);
				$startdate = $start->format('M j, Y');
			}
		}
    
        
		//add time
        if(get_field('start_time',$id)) {
            $time = get_field('start_time',$id);
			$endtime = '';
			if(get_field('end_time',$id)) {
				$endtime = ' - '.get_field('end_time',$id);
			}
            $startdate = $startdate.' @ '.$time.$endtime;
        }
		
		//overwrite
       if(get_field('datetime_desc',$id)) {
            $startdate = get_field('datetime_desc',$id);
        }
 
        
        return $startdate;
                
    }    
}




if ( ! function_exists( 'get_event_block' ) ) {
	/**
	 * GET EVENT BLOCK
	 *
	 * @since 1.0.0
	 */
	function get_event_block($id) {           

        $img = $imgid = $ctalink = $detailslink = $imglinkclass = $location = $blockclass = '';

		$lineclamp = 'line-clamp-6';
        $titleclass = ' has-regular-font-size';
		$title = widowfix(get_the_title($id));
        if(strlen($title) > 65) {
            $titleclass = ' has-small-font-size';
            $lineclamp = 'line-clamp-3';
        }


        $url = get_permalink($id);

        //TYPE
        $eventtime = get_event_time($id);
        $details = '<p class="mt-2 mb-2 sans-600 has-blue-color has-medium-font-size letter-spacing-1">'.widowfix($eventtime).'</p>';
             
        $detailslink = '
		<div class="wp-block-button">
			<a class="wp-block-button__link" tabindex="-1" href="'.$url.'">
			<span>'.__('Read More', 'sig').'<span><span class="sr-only">: '.$title.'</span></a>
		</div>';
		
        
        $imglink = wp_kses_post( $url );    
        $img = get_default_image($id);
        $imglinkdiv = '<a href="'.$imglink.'" class="img-link '.$imglinkclass.'" tabindex="-1"><span class="sr-only">'.$title.'</span></a>';
        
        
        if(get_field('event_location', $id)) {
            $details .= '<p class="tile__content__subtitle mb-2 has-blue-medium-color has-small-font-size sans-600">'.get_field('event_location', $id).'</p>';
        }
        
        $excerpt = trim(get_the_excerpt($id));
        
        return '
        <article class="tile event-tile event-'.$id.'">
			<figure class="tile__img">
				<a href="'.$url.'" tabindex="-1">
                    <span class="sr-only">'.$title.'</span>
					'.$img.'
				</a>
			</figure>
            <div class="tile__content pt-1">
                <h3 class="tile__content__title mb-1 has-blue-dark-color'.$titleclass.'"><a href="'.$url.'">'.$title.'</a></h3> 
				'.$details.'               
                <p class="tile__content__excerpt '.$lineclamp.' has-small-font-size">'.$excerpt.'</p>
                '.$detailslink.'
            </div>
		</article>';
        
    }
}



if ( ! function_exists( 'get_upcoming_events' ) ) {
	/**
	 * GET LATEST EVENTS
	 *
	 * @since 1.0.0
	 */
	function get_upcoming_events($args='',$today='',$sortbydatetime=true) {
        $events = '';
        
        if($today == '') {
			$today = date( 'Ymd', current_time( 'timestamp', 0 ) );
        }		
		$eventarr = array();
        
        if($args == '') {            
            $args = array(
				'post_type' => 'events',
				'posts_per_page' => -1,
				'meta_key'  => 'start_date',
				'orderby'   => 'meta_value_num',
				'order'   => 'ASC',
				'post_status' => 'publish',
			);
        }
        
        $the_query = new WP_Query( $args );

        if ( $the_query->have_posts() ) {
            while ( $the_query->have_posts() ) {
                $the_query->the_post();                
                $id = get_the_ID();
                $end_date = get_field('end_date',$id, false);
				$start_date = get_field('start_date',$id, false);

				if($today <= $end_date) {
					
					$time = '8:00:00';				

                    if(get_field('start_time',$id)) {
                        $time = get_field('start_time',$id, false);
                    }
                    $datetime = strtotime($start_date.' '.$time);

                    $arr = array(
                        'datetime' => $datetime,
                        'id' => $id
                    );
                    array_push($eventarr, $arr);
					
				}   
            }   
            wp_reset_postdata();

			if($sortbydatetime) {                
                usort($eventarr, function($a, $b) {
                    $timeStamp1 = $a['datetime'];
                    $timeStamp2 = $b['datetime'];
                    return $timeStamp1 - $timeStamp2;
                });
            }
			

            $keys = array_keys($eventarr);
            for($i = 0; $i < count($eventarr); $i++) {
                //echo $keys[$i] . "{<br>";
                foreach($eventarr[$keys[$i]] as $key => $eventid) {
                    //echo $key . " : " . $value . "<br>";					
                    if($key == 'id') {
                        $events .= get_event_block($eventid);
                    }
                }
                //echo "}<br>";
            }
        }
		
        return $events;
    }
    
}



?>