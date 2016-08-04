<?php

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_script(
        'app',
        get_stylesheet_directory_uri() . '/build/scripts/index.js',
        [],
        null,
        true
    );
} );