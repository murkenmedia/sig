wp.domReady( () => {
        
    const disallowedBlocks = [
		'core/verse',
		'core/details',
		'core/preformatted',
		//'core/pullquote',
		'core/audio',
		'core/gallery',
		'core/page-break',
		'core/calendar',
		'core/terms-list',
		'core/latest-comments',
		'core/rss',
		'core/social-links',
		'core/tag-cloud',
		'core/navigation',
		'core/site-logo',
		'core/site-title',
		'core/site-tagline',
		'core/avatar',
		'core/archives',
		'core/page-list',
		'core/post-author',
		'core/post-author-name',
		'core/post-author-biography',
		'core/post-date',
		'core/comments',
		'core/post-comments-form',
		'core/loginout',
		'core/latest-posts',
		'core/query-loop',
		'core/post-title',
		'core/post-excerpt',
		'core/search-results-title',
		'core/post-terms',
		'core/terms',
		'core/categories',
	];

	disallowedBlocks.forEach( function( item ) {
		wp.blocks.unregisterBlockType( item );
	});

	wp.blocks.unregisterBlockVariation( 'core/group', 'group-row' );
	wp.blocks.unregisterBlockVariation( 'core/group', 'group-stack' );
	wp.blocks.unregisterBlockVariation( 'core/group', 'group-grid' );
	wp.blocks.unregisterBlockVariation( 'core/post-terms', 'category' );
	wp.blocks.unregisterBlockVariation( 'core/post-terms', 'post_tag' );

	const disallowedEmbeds = [
		'twitter',
		'youtube',
		'wordpress',
		'soundcloud',
		'spotify',
		'flickr',
		'vimeo',
		'animoto',
		'cloudup',
		'crowdsignal',
		'dailymotion',
		'imgur',
		'issuu',
		'kickstarter',
		'mixcloud',
		'pocket-casts',
		'reddit',
		'reverbnation',
		'scribd',
		'smugmug',
		'speaker-deck',
		'tiktok',
		'ted',
		'tumblr',
		'videopress',
		'wordpress-tv',
		'amazon-kindle',
		'pinterest',
		'wolfram-cloud',
		'bluesky'
	];
	disallowedEmbeds.forEach( function( item ) {
		wp.blocks.unregisterBlockVariation( 'core/embed', item );
	});

    wp.blocks.unregisterBlockStyle(
		'core/button',
		[ 'default', 'outline', 'squared', 'fill' ]
	);
	wp.blocks.registerBlockStyle(
		'core/button',	[
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'border-btn',
				label: 'Border Button'
			},
			{
				name: 'full-width-btn',
				label: 'Full-Width Button'
			},
            {
				name: 'arrow-btn',
				label: 'Arrow Button'
			},
			{
				name: 'popup-vimeo-btn',
				label: 'Vimeo Popup Button'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/columns', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'reverse-mobile',
				label: 'Reverse Mobile Order'
			},
			{
				name: 'break-lg',
				label: 'Stack Lg (1024px)'
			},
			{
				name: 'wide-gap',
				label: 'Wide Gap'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/cover', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'vertically-aligned-top',
				label: 'Vertically Aligned Top'
			},
			{
				name: 'vertically-aligned-bottom',
				label: 'Vertically Aligned Bottom'
			},
            {
				name: 'dark-blue-to-light-grey-bg',
				label: 'Dark Blue to Light Grey BG'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/group', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'max-sm',
				label: 'Small Width'
			},
			{
				name: 'max-md',
				label: 'Medium Width'
			},
			{
				name: 'max-lg',
				label: 'Large Width'
			},
			{
				name: 'max-xl',
				label: 'Extra Large Width'
			},
			{
				name: 'border-box',
				label: 'Border Box'
			},
			{
				name: 'padded-box',
				label: 'Padded Box'
			},
			{
				name: 'extra-padded-box',
				label: 'Extra Padded Box'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/heading', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'sans',
				label: 'Sans'
			},
			{
				name: 'serif',
				label: 'Serif'
			},
			{
				name: 'arrow-link',
				label: 'Arrow Link'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/image', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'image-popup',
				label: 'Popup Image (Also Link to Media File)'
			},
			{
				name: 'half-img-float-right',
				label: 'Half Image, Float Right'
			},
			{
				name: 'half-img-float-left',
				label: 'Half Image, Float Left'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/list', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'no-bullets',
				label: 'No Bullets'
			},
			{
				name: 'center-list',
				label: 'Centered List'
			},
			{
				name: 'no-bullets-centered-text',
				label: 'No Bullets Centered Text'
			},
			{
				name: 'checklist',
				label: 'Checklist'
			},
			{
				name: 'list-space',
				label: 'List with Space'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/media-text', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'media-text-break-md',
				label: 'Stack Mobile Md'
			},
			{
				name: 'media-text-break-lg',
				label: 'Stack Mobile Lg'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/paragraph', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'serif',
				label: 'Serif'
			}
		]
	);
    wp.blocks.registerBlockStyle(
		'core/quote', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'quotation-marks',
				label: 'Quotation Marks'
			}
		]
	);
	wp.blocks.unregisterBlockStyle(
		'core/separator',
		[ 'default', 'wide', 'dots' ]
	);
	wp.blocks.registerBlockStyle(
		'core/separator', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
			{
				name: 'short',
				label: 'Short'
			},
			{
				name: 'dots',
				label: 'Dots'
			}
		]
	);
	wp.blocks.registerBlockStyle(
		'core/spacer', [
			{
				name: 'default',
				label: 'Default',
				isDefault: true
			},
            {
				name: 'responsive-small',
				label: 'Responsive Small'
			},
			{
				name: 'responsive-medium',
				label: 'Responsive Medium'
			},
            {
				name: 'responsive-large',
				label: 'Responsive Large'
			}
		]
	);
});
