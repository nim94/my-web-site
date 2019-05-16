<?php

namespace App;

/**
 * Add <body> classes
 */
add_filter('body_class', function (array $classes) {
    /** Add page slug if it doesn't exist */
    if (is_single() || is_page() && !is_front_page()) {
        if (!in_array(basename(get_permalink()), $classes)) {
            $classes[] = basename(get_permalink());
        }
    }

    /** Add class if sidebar is active */
    if (display_sidebar()) {
        $classes[] = 'sidebar-primary';
    }

    /** Clean up class names for custom templates */
    $classes = array_map(function ($class) {
        return preg_replace(['/-blade(-php)?$/', '/^page-template-views/'], '', $class);
    }, $classes);

    return array_filter($classes);
});

/**
 * Template Hierarchy should search for .blade.php files
 */
collect([
    'index', '404', 'archive', 'author', 'category', 'tag', 'taxonomy', 'date', 'home',
    'frontpage', 'page', 'paged', 'search', 'single', 'singular', 'attachment', 'embed'
])->map(function ($type) {
    add_filter("{$type}_template_hierarchy", __NAMESPACE__.'\\filter_templates');
});

/**
 * Render page using Blade
 */
add_filter('template_include', function ($template) {
    collect(['get_header', 'wp_head'])->each(function ($tag) {
        ob_start();
        do_action($tag);
        $output = ob_get_clean();
        remove_all_actions($tag);
        add_action($tag, function () use ($output) {
            echo $output;
        });
    });
    $data = collect(get_body_class())->reduce(function ($data, $class) use ($template) {
        return apply_filters("sage/template/{$class}/data", $data, $template);
    }, []);
    if ($template) {
        echo template($template, $data);
        return get_stylesheet_directory().'/index.php';
    }
    return $template;
}, PHP_INT_MAX);

/**
 * Render comments.blade.php
 */
add_filter('comments_template', function ($comments_template) {
    $comments_template = str_replace(
        [get_stylesheet_directory(), get_template_directory()],
        '',
        $comments_template
    );

    $data = collect(get_body_class())->reduce(function ($data, $class) use ($comments_template) {
        return apply_filters("sage/template/{$class}/data", $data, $comments_template);
    }, []);

    $theme_template = locate_template(["views/{$comments_template}", $comments_template]);

    if ($theme_template) {
        echo template($theme_template, $data);
        return get_stylesheet_directory().'/index.php';
    }

    return $comments_template;
}, 100);

//sidebar display in blog posts
add_filter('sage/display_sidebar', function ($display) {
    static $display;

    isset($display) || $display = in_array(true, [
      // The sidebar will be displayed if any of the following return true
      is_singular('post')
    ]);

    return $display;
});

//navbar-primary add items
add_filter( 'wp_nav_menu_items', function ( $items, $args ) {
    if ($args->theme_location == 'primary_navigation') {
        ob_start();
        get_search_form();
        $searchform = ob_get_contents();
        ob_end_clean();

        $items .= 
        '<li><a href="https://www.facebook.com/nicola.morelli.94" class="social_nav_link facebook">
        <img src="'. get_stylesheet_directory_uri() .'/../dist/images/facebook_icon_hover.png" alt="facebook icon" class="social_nav_img_hover">
        <img src="'. get_stylesheet_directory_uri() .'/../dist/images/facebook_icon.png" alt="facebook icon" class="social_nav_img">
        </a></li>
        <li><a href="https://www.instagram.com/nicomorelli94/" class="social_nav_link instagram">
        <img src="'. get_stylesheet_directory_uri() .'/../dist/images/instagram_icon_hover.png" alt="facebook icon" class="social_nav_img_hover">
        <img src="'. get_stylesheet_directory_uri() .'/../dist/images/instagram_icon.png" alt="facebook icon" class="social_nav_img">
        </a></li>
        <li class="search-form"><img src="'. get_stylesheet_directory_uri() .'/../dist/images/search-icon.png" class="search-icon" alt="ricerca">'. $searchform .'</li>';
    }
    return $items;
}, 10, 2 );

//customize read more link
add_filter( 'excerpt_more', function() {
    return '<a class="more-link" href="' . get_permalink() . '">'. __('...Continua a leggere', 'sage') .'</a>';
});

//comment form cookie mail and name unchecked
add_filter( 'comment_form_default_fields', function( $fields ) {
    unset( $fields['url'] );
    $fields['cookies'] = '<p class="comment-form-cookies-consent"><input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />' .
					 '<label for="wp-comment-cookies-consent">' . __( 'Salva il mio nome e la mia email in un cookie per il prossimo commento', 'sage' ) . '</label></p>';
	return $fields;
});