<?php


//CHANGE THE SUBMIT TO A BUTTON SO I CAN STYLE IT
add_filter( 'gform_submit_button_1', 'input_to_button', 10, 2 );
add_filter( 'gform_submit_button_3', 'input_to_button', 10, 2 );
if ( ! function_exists( 'input_to_button' ) ) {
    function input_to_button( $button, $form ) {
        $fragment = WP_HTML_Processor::create_fragment( $button );
        $fragment->next_token();

        $attributes      = array( 'id', 'type', 'class', 'onclick' );
        $data_attributes = $fragment->get_attribute_names_with_prefix( 'data-' );
        if ( ! empty( $data_attributes ) ) {
            $attributes = array_merge( $attributes, $data_attributes );
        }

        $new_attributes = array();
        foreach ( $attributes as $attribute ) {
            $value = $fragment->get_attribute( $attribute );
            if ( ! empty( $value ) ) {
                $new_attributes[] = sprintf( '%s="%s"', $attribute, esc_attr( $value ) );
            }
        }

        return sprintf( '<button %s><span class="text-wrap">%s</span><span class="submit-arrow-icon"></span></button>', implode( ' ', $new_attributes ), esc_html( $fragment->get_attribute( 'value' ) ) );
    }
}

/////////WEBINARS
add_filter( 'gform_confirmation_3', 'webinar_confirmation', 10, 4 );
function webinar_confirmation( $confirmation, $form, $entry, $ajax ) {    
    $id = rgar( $entry, '4' );
    $confirmation = get_webinar($id);

    return $confirmation;
}

add_action('gform_after_submission_3', 'set_webinar_cookie', 10, 2);
function set_webinar_cookie( $entry, $form ) { 
    setcookie('webinar_access_granted', '1', time() + 86400, "/");
}

?>