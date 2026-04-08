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
			},
            {
				name: 'dark-blue-to-light-grey-bg-tall',
				label: 'Dark Blue to Light Grey BG - Tall Gradient'
			},
			{
				name: 'light-blue-to-light-grey-circles-bg',
				label: 'Light Blue to Light Grey BG with Circles'
			},
			{
				name: 'light-blue-to-yellow-to-light-grey-bg',
				label: 'Light Blue to to Yellow to Light Grey BG'
			},
			{
				name: 'blue-circles-bg',
				label: 'Blue BG with Circles'
			},
			{
				name: 'blue-circles-bot-bg',
				label: 'Blue BG with Bottom Circles'
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
			},
			{
				name: 'circle-icon-left',
				label: 'Circle Icon Left'
			},
			{
				name: 'check-icon-left',
				label: 'Check Icon Left'
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
				name: 'serif-bold',
				label: 'Serif Bold'
			},
			{
				name: 'sans',
				label: 'Sans'
			},
			{
				name: 'sans-500',
				label: 'Sans 500'
			},
			{
				name: 'sans-600',
				label: 'Sans 600'
			},
			{
				name: 'sans-700',
				label: 'Sans 700'
			},
			{
				name: 'outline',
				label: 'Outline'
			},
			{
				name: 'arrow-link',
				label: 'Arrow Link'
			},
			{
				name: 'intro-headline',
				label: 'Intro Headline'
			},
			{
				name: 'number-headline',
				label: 'Number Headline'
			},
			{
				name: 'underline-bold-headline',
				label: 'Underline Bold Headline'
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
				name: 'serif',
				label: 'Serif'
			},
			{
				name: 'serif-bold',
				label: 'Serif Bold'
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
			},
			{
				name: 'outline-number',
				label: 'Outline Number List'
			},
			{
				name: 'circle-icons-list',
				label: 'Circle Icons List'
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
				name: 'break-md',
				label: 'Stack Tablet (782px)'
			},
			{
				name: 'break-lg',
				label: 'Stack Large (1024px)'
			},
			{
				name: 'rounded-corners',
				label: 'Rounded Corners'
			},
			{
				name: 'content-padding',
				label: 'Content Padding'
			},
			{
				name: 'full-width-content-padding',
				label: 'Full Width + Content Padding'
			},
			{
				name: 'full-width-side-padding',
				label: 'Full Width + Side Padding'
			},
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
			},
			{
				name: 'serif-bold',
				label: 'Serif Bold'
			},
			{
				name: 'sans-500',
				label: 'Sans 500'
			},
			{
				name: 'sans-600',
				label: 'Sans 600'
			},
			{
				name: 'sans-700',
				label: 'Sans 700'
			},
			{
				name: 'outline',
				label: 'Outline'
			},
			{
				name: 'bold-highlight',
				label: 'Bold Highlight'
			},
			{
				name: 'intro-headline',
				label: 'Intro Headline'
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
				name: 'thick-line',
				label: 'Thick Line'
			},
			{
				name: 'thick-line',
				label: 'Thick Line'
			},
			{
				name: 'pad-top-bot',
				label: 'Padding Top + Bottom'
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
				name: 'responsive-large',
				label: 'Mobile Large (50px)'
			},
			{
				name: 'responsive-medium',
				label: 'Mobile Medium (30px)'
			},
			{
				name: 'responsive-small',
				label: 'Mobile Small (20px)'
			},
			{
				name: 'responsive-hide-lg',
				label: 'Hide Below 1024px (Desktop)'
			},
			{
				name: 'responsive-hide-md',
				label: 'Hide Below 768px (Tablet)'
			},
			{
				name: 'responsive-hide-sm',
				label: 'Hide Below 576px (Mobile)'
			}
		]
	);
});
