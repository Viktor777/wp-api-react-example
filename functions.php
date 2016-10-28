<?php

add_action( 'wp_enqueue_scripts', function () {
    $handle = 'app';
    $path = '';

    if ( is_multisite() && !is_subdomain_install() ) {
        $path = trim( get_blog_details( get_current_blog_id() )->path, '/' );
    }

    wp_enqueue_script(
        $handle,
        get_stylesheet_directory_uri() . '/build/scripts/index.js',
        [],
        null,
        true
    );
    wp_localize_script( $handle, 'appSettings', [
        'rest' => [
            'url'   => esc_url_raw( get_rest_url() ),
            'nonce' => wp_create_nonce( 'wp_rest' ),
        ],
        'path' => $path,
    ] );
} );