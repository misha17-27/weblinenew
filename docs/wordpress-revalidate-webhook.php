<?php
/**
 * WordPress -> Vercel revalidate webhook
 *
 * Add this to:
 * - your theme's functions.php
 * or
 * - a small custom plugin / mu-plugin
 */

if (!defined('WEBLINE_REVALIDATE_SECRET')) {
    define('WEBLINE_REVALIDATE_SECRET', 'SAHIL_ANAR_PASS');
}

if (!defined('WEBLINE_REVALIDATE_ENDPOINT')) {
    define('WEBLINE_REVALIDATE_ENDPOINT', 'https://webline.bento.az/api/revalidate');
}

function webline_collect_revalidate_paths($post) {
    $paths = array('/', '/about', '/services', '/process', '/portfolio', '/faq', '/contact');

    if (!$post instanceof WP_Post) {
        return array_values(array_unique($paths));
    }

    if ($post->post_type === 'page') {
        $slug = $post->post_name ?: '';

        if ($slug === '' || $slug === 'home') {
            $paths[] = '/';
        } else {
            $paths[] = '/' . ltrim($slug, '/');
        }
    }

    if ($post->post_type === 'post') {
        $paths[] = '/';
        $paths[] = '/portfolio';
    }

    return array_values(array_unique($paths));
}

function webline_trigger_vercel_revalidate($post_id, $post = null) {
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return;
    }

    if ($post instanceof WP_Post && $post->post_status === 'auto-draft') {
        return;
    }

    $payload = array(
        'secret' => WEBLINE_REVALIDATE_SECRET,
        'paths' => webline_collect_revalidate_paths($post),
    );

    wp_remote_post(
        WEBLINE_REVALIDATE_ENDPOINT,
        array(
            'timeout' => 15,
            'headers' => array(
                'Content-Type' => 'application/json',
                'x-revalidate-secret' => WEBLINE_REVALIDATE_SECRET,
            ),
            'body' => wp_json_encode($payload),
        )
    );
}

add_action(
    'save_post',
    function ($post_id, $post, $update) {
        if (!$update) {
            return;
        }

        webline_trigger_vercel_revalidate($post_id, $post);
    },
    20,
    3
);

add_action(
    'deleted_post',
    function ($post_id) {
        webline_trigger_vercel_revalidate($post_id, null);
    },
    20
);
