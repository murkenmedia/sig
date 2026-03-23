<?php
/**
 * Stormwater Capture
 *
 * @package SIG
 * @since   1.0.0
 */

$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$block_classes = array(
	'stormwater-capture',
	$className
);

$bg = $title = '';

$graphic = '
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 912.73 819.67" class="stormwater-capture__bg">
<rect y="4" width="912.73" height="815.2" style="fill:#59bff0; opacity:0;"/><path id="bucket" d="M480.45,773.16c0,25.43-80.99,46.05-180.89,46.05s-180.89-20.61-180.89-46.05,80.99-46.05,180.89-46.05,180.89,20.61,180.89,46.05" style="fill:#2f2f31;"/><path id="bucket-2" d="M396.29,565.59c0-21.15-66.64-34.79-148.84-34.79s-152.41,12.72-152.41,33.87c0,5.96,3.11,12.05,10.11,17.69l13.53,198.07s5.44,36.23,119.3,36.23,134.67-36.23,134.67-36.23l13.48-197.46c7.04-5.4,10.15-11.32,10.15-17.38Z" style="fill:#fff;"/><path id="bucket-3" d="M383.68,566.71c0,15.04-61.8,27.23-138.02,27.23s-138.02-12.19-138.02-27.23,61.79-27.23,138.02-27.23,138.02,12.19,138.02,27.23" style="fill:#002e61;"/><path id="bucket-4" d="M399.27,566.67c.02-.36.04-.72.04-1.08,0-11.91-15.46-21.42-45.95-28.27-27.36-6.15-64.97-9.54-105.9-9.54s-79.71,3.22-107.65,9.07c-31.71,6.63-47.78,15.99-47.78,27.82,0,.89.06,1.78.18,2.66-1.06,4.98-.79,10.19-.6,13.89.06,1.25.12,2.34.12,3.2,0,6.13,2.71,11.91,8.04,17.2,1.18,1.17,2.49,2.31,3.91,3.41l11.99,175.61.03.24c.24,1.58,7.15,38.8,122.29,38.8s136.4-36.21,137.29-37.75l.35-.6,12.04-176.26c6.66-5.1,11.35-11.58,11.35-19.72,0-1.1.16-2.61.35-4.37.43-3.99,1.01-9.39-.09-14.3ZM141.04,542.76c27.55-5.77,65.34-8.94,106.41-8.94s77.64,3.33,104.58,9.39c26.21,5.89,41.24,14.05,41.24,22.38,0,10.11-10.63,18.94-30.74,25.55-25.17,8.27-63.9,12.72-115.11,13.23-2.77.03-5.48.04-8.14.04-93.6,0-124.72-16.69-134.97-26.83-4.15-4.11-6.25-8.45-6.25-12.91,0-8.21,15.67-16.19,42.98-21.91ZM369.7,779.41c-1.45,1.98-7.64,9.41-23.78,16.78-17.45,7.96-50.34,17.45-107.93,17.45-106.53,0-115.91-31.99-116.31-33.6l-2.42-35.5c8.1,11.3,34.35,31.29,118.73,31.29,93.54,0,125.33-24.25,134.28-33.9l-2.56,37.48ZM372.82,733.59c-1.09-.06-2.18.46-2.78,1.46-.05.09-5.37,8.73-24.14,17.29-31.61,14.42-76.14,17.45-107.93,17.45-108.81,0-116.27-33.38-116.32-33.66-.23-1.56-1.62-2.64-3.16-2.55l-8.49-124.35c23.49,13.62,68.39,20.96,129.36,20.96,2.57,0,5.18-.01,7.81-.04,51.83-.52,91.17-5.07,116.94-13.53,5.68-1.87,11.75-4.3,17.21-7.4l-8.49,124.37ZM392.96,585.34c0,10.11-10.63,18.94-30.74,25.55-25.17,8.27-63.9,12.72-115.11,13.23-2.77.03-5.47.04-8.14.04-93.6,0-124.72-16.69-134.97-26.83-4.15-4.11-6.25-8.45-6.25-12.91,0-1.02-.06-2.17-.13-3.5-.03-.61-.06-1.22-.08-1.83.76.94,1.6,1.87,2.52,2.78,18.68,18.49,68.11,28.58,139.61,28.58,2.57,0,5.18-.01,7.81-.04,51.83-.52,91.17-5.07,116.94-13.53,10.38-3.41,22.06-8.71,28.93-16.54-.21,1.93-.39,3.59-.39,5.01Z" style="fill:#2f2f31;"/><path id="collect" d="M163.97,392.38c-5.75,0-10.94,2.88-14.64,7.51h-18.52v36.27h20.25c3.52,3.49,8.01,5.58,12.91,5.58s9.4-2.09,12.91-5.58h20.25v-36.27h-18.52c-3.71-4.63-8.89-7.51-14.64-7.51Z" style="fill:#ebe7dc;"/><path id="collect-2" d="M157.2,385.7c1.25,2.72,3.47,4.54,6.02,4.54,2.76,0,5.15-2.13,6.32-5.24,4.31,2.03,10.66,3.31,13.75,3.31,4.92,0,8.91-3.56,8.91-7.94s-3.99-7.94-8.91-7.94c-3.11,0-9.51,1.54-13.81,3.78-1.19-3.02-3.54-5.07-6.26-5.07-2.48,0-4.65,1.72-5.92,4.31-4.17-1.82-9.48-3.02-12.22-3.02-4.92,0-8.91,3.55-8.91,7.94s3.99,7.94,8.91,7.94c2.72,0,7.96-.99,12.12-2.61Z" style="fill:#ebe7dc;"/><path id="collect-3" d="M217.97,404.56h-14v21.06h14c11.61,0,21.06,9.45,21.06,21.07l-3.06,9.15h27.14l-3.02-9.15c0-23.23-18.9-42.13-42.13-42.13Z" style="fill:#ebe7dc;"/><path id="collect-4" d="M909.44,187.36c-307.71,60.46-609.88,0-609.88,0v83.13H0v154.4h106.99v11.03c0,2.5,2.03,4.53,4.52,4.53h7.26c2.5,0,4.53-2.03,4.53-4.53v-35.8c0-2.5-2.03-4.53-4.53-4.53h-7.26c-2.5,0-4.52,2.03-4.52,4.53v1.02H19.3v-107.76h289.23s600.9,0,600.9,0v-106.03Z" style="fill:#ebe7dc;"/>
</svg>';

$rain = '
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 912.73 815.2" class="stormwater-capture__rain">
<rect width="912.73" height="815.2" style="fill:#59bff0; opacity:0;"/>
<line class="line-animate" id="l" x1="396.29" x2="324.33" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate-alt" id="l-2" x1="443.24" y1="0" x2="371.28" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate" id="l-3" x1="490.19" x2="418.23" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate-alt" id="l-4" x1="537.14" x2="465.18" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate" id="l-5" x1="584.08" x2="512.13" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate-alt" id="l-6" x1="631.03" x2="559.08" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate" id="l-7" x1="677.98" x2="606.03" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate-alt" id="l-8" x1="724.93" x2="652.98" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate" id="l-9" x1="771.88" x2="699.93" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate-alt" id="l-10" x1="818.83" x2="746.88" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate" id="l-11" x1="865.78" x2="793.82" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate-alt" id="l-12" x1="912.73" x2="840.77" y2="233.01" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
</svg>';

$water = '
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 912.73 819.67" class="stormwater-capture__water lines-animate">
<rect y="4" width="912.73" height="815.2" style="fill:#59bff0; opacity:0;"/>
<line class="line-animate" id="r" x1="233.4" y1="468.81" x2="233.4" y2="577.21" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate-alt" id="r-2" x1="250.94" y1="462.36" x2="250.94" y2="588.39" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
<line class="line-animate" id="r-3" x1="268.48" y1="467.76" x2="268.48" y2="577.21" style="fill:none; stroke:#59bff0; stroke-dasharray:11 20; stroke-linecap:round; stroke-linejoin:bevel; stroke-width:8px;"/>
</svg>';


$bg = '
<div class="stormwater-capture__graphic fade-in delay-2">
    '.$rain.$water.$graphic.'
</div>';

/*if(get_field('bg')) {
    $bgid = get_field('bg');
    $bg = '
    <div class="stormwater-capture__bg fade-in delay-2">'
        .wp_get_attachment_image($bgid, 'full', '').'
    </div>';
}*/

if(get_field('title')) {
    $title = '
    <div class="stormwater-capture__title fade-in delay-4">
        <h3 class="has-orange-color is-style-sans-bold has-medium-font-size ">'.get_field('title').'</h3>
    </div>';
}

?>

<div id="<?php echo esc_attr( $block['id'] ); ?>" class="<?php echo esc_attr( implode( ' ', $block_classes ) ); ?>">
    <?php echo $bg; ?>
    <?php echo $title; ?>
    <div class="stormwater-capture__content fade-in delay-5">
        <InnerBlocks />
    </div>
</div>
