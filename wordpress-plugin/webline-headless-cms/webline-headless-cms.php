<?php
/**
 * Plugin Name: Webline Headless CMS
 * Description: Headless WordPress configuration for the Webline Next.js frontend.
 * Version: 1.9.1
 * Author: Misha17-27
 */

if (!defined('ABSPATH')) {
    exit;
}

const WEBLINE_PAGE_SLUGS = ['home', 'services', 'process', 'about', 'portfolio', 'faq', 'contact'];
const WEBLINE_SERVICE_META_BADGE = '_webline_service_badge';
const WEBLINE_SERVICE_META_ORDER = '_webline_service_order';
const WEBLINE_SERVICE_META_ITEMS = '_webline_service_items';
const WEBLINE_FAQ_META_OPEN = '_webline_faq_open';
const WEBLINE_FAQ_META_ORDER = '_webline_faq_order';
const WEBLINE_PORTFOLIO_META_CATEGORY = '_webline_portfolio_category';
const WEBLINE_PORTFOLIO_META_CATEGORY_SLUG = '_webline_portfolio_category_slug';
const WEBLINE_PORTFOLIO_META_DATE = '_webline_portfolio_date';
const WEBLINE_PORTFOLIO_META_IMAGE = '_webline_portfolio_image';
const WEBLINE_PORTFOLIO_META_GALLERY = '_webline_portfolio_gallery';
const WEBLINE_PORTFOLIO_TAXONOMY = 'webline_portfolio_category';
const WEBLINE_PARTNER_META_ORDER = '_webline_partner_order';
const WEBLINE_OFFICE_META_ORDER = '_webline_office_order';
const WEBLINE_OFFICE_META_COUNTRY = '_webline_office_country';
const WEBLINE_OFFICE_META_ADDRESS = '_webline_office_address';
const WEBLINE_OFFICE_META_PHONE = '_webline_office_phone';
const WEBLINE_OFFICE_META_EMAIL = '_webline_office_email';
const WEBLINE_OFFICE_META_MAP_URL = '_webline_office_map_url';
const WEBLINE_OFFICE_META_EMBED_URL = '_webline_office_embed_url';
const WEBLINE_SEEDED_OPTION = 'webline_headless_seeded';
const WEBLINE_COLLECTION_SEEDED_OPTION = 'webline_headless_collection_seeded';
const WEBLINE_SERVICE_SYNC_OPTION = 'webline_headless_service_sync_v120';
const WEBLINE_OFFICE_SYNC_OPTION = 'webline_headless_office_sync_v150';
const WEBLINE_PORTFOLIO_SYNC_OPTION = 'webline_headless_portfolio_sync_v160';
const WEBLINE_PORTFOLIO_TAXONOMY_SYNC_OPTION = 'webline_headless_portfolio_taxonomy_sync_v170';
const WEBLINE_ABOUT_SYNC_OPTION = 'webline_headless_about_sync_v190';

function webline_normalize_lang(?string $lang): string
{
    $lang = is_string($lang) ? trim($lang) : '';
    return preg_match('/^[a-z_-]+$/i', $lang) ? strtolower($lang) : '';
}

function webline_with_lang(?string $lang, callable $callback)
{
    $lang = webline_normalize_lang($lang);

    if ($lang === '' || !has_action('wpml_switch_language')) {
        return $callback();
    }

    $currentLang = has_filter('wpml_current_language')
        ? apply_filters('wpml_current_language', null)
        : null;

    do_action('wpml_switch_language', $lang);

    try {
        return $callback();
    } finally {
        if (is_string($currentLang) && $currentLang !== '') {
            do_action('wpml_switch_language', $currentLang);
        }
    }
}

function webline_frontend_url(): string
{
    if (defined('WEBLINE_FRONTEND_URL') && WEBLINE_FRONTEND_URL) {
        return untrailingslashit((string) WEBLINE_FRONTEND_URL);
    }

    return 'https://webline.bento.az';
}

function webline_revalidate_endpoint(): string
{
    if (defined('WEBLINE_REVALIDATE_ENDPOINT') && WEBLINE_REVALIDATE_ENDPOINT) {
        return (string) WEBLINE_REVALIDATE_ENDPOINT;
    }

    return webline_frontend_url() . '/api/revalidate';
}

function webline_revalidate_secret(): string
{
    return defined('WEBLINE_REVALIDATE_SECRET') ? (string) WEBLINE_REVALIDATE_SECRET : '';
}

function webline_page_definitions(): array
{
    return [
        'home' => ['title' => 'Home'],
        'services' => ['title' => 'Services'],
        'process' => ['title' => 'Process'],
        'about' => ['title' => 'About'],
        'portfolio' => ['title' => 'Portfolio'],
        'faq' => ['title' => 'FAQ'],
        'contact' => ['title' => 'Contact'],
    ];
}

function webline_get_page(string $slug, ?string $lang = null): ?WP_Post
{
    $pages = get_posts([
        'name' => $slug,
        'post_type' => 'page',
        'post_status' => ['publish', 'draft', 'private'],
        'posts_per_page' => 1,
        'suppress_filters' => true,
    ]);

    $page = $pages[0] ?? null;

    if (!$page instanceof WP_Post) {
        return null;
    }

    $lang = webline_normalize_lang($lang);

    if ($lang === '' && has_filter('wpml_current_language')) {
        $currentLang = apply_filters('wpml_current_language', null);
        $lang = is_string($currentLang) ? webline_normalize_lang($currentLang) : '';
    }

    if ($lang !== '' && has_filter('wpml_object_id')) {
        $translatedId = apply_filters('wpml_object_id', $page->ID, 'page', true, $lang);

        if (is_numeric($translatedId)) {
            $translatedPage = get_post((int) $translatedId);

            if ($translatedPage instanceof WP_Post) {
                return $translatedPage;
            }
        }
    }

    return $page;
}

function webline_register_post_types(): void
{
    register_post_type('webline_service', [
        'labels' => ['name' => 'Services', 'singular_name' => 'Service'],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 26,
        'menu_icon' => 'dashicons-screenoptions',
        'supports' => ['title', 'editor'],
    ]);

    register_post_type('webline_faq', [
        'labels' => ['name' => 'FAQs', 'singular_name' => 'FAQ'],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 27,
        'menu_icon' => 'dashicons-editor-help',
        'supports' => ['title', 'editor'],
    ]);

    register_post_type('webline_portfolio', [
        'labels' => ['name' => 'Portfolio', 'singular_name' => 'Portfolio Item'],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 28,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
    ]);

    register_post_type('webline_partner', [
        'labels' => ['name' => 'Partners', 'singular_name' => 'Partner'],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 29,
        'menu_icon' => 'dashicons-groups',
        'supports' => ['title', 'thumbnail'],
    ]);

    register_post_type('webline_office', [
        'labels' => ['name' => 'Offices', 'singular_name' => 'Office'],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 30,
        'menu_icon' => 'dashicons-location-alt',
        'supports' => ['title'],
    ]);

    register_taxonomy(WEBLINE_PORTFOLIO_TAXONOMY, ['webline_portfolio'], [
        'labels' => [
            'name' => 'Portfolio Categories',
            'singular_name' => 'Portfolio Category',
        ],
        'public' => false,
        'show_ui' => true,
        'show_admin_column' => true,
        'hierarchical' => true,
        'rewrite' => false,
        'query_var' => false,
    ]);
}
add_action('init', 'webline_register_post_types');

function webline_disable_block_editor(bool $useBlockEditor, string $postType): bool
{
    return in_array($postType, ['page', 'webline_service', 'webline_faq', 'webline_portfolio', 'webline_partner', 'webline_office'], true)
        ? false
        : $useBlockEditor;
}
add_filter('use_block_editor_for_post_type', 'webline_disable_block_editor', 10, 2);

function webline_register_meta_boxes(): void
{
    add_meta_box('webline_service_meta', 'Service Settings', 'webline_render_service_meta', 'webline_service', 'side');
    add_meta_box('webline_faq_meta', 'FAQ Settings', 'webline_render_faq_meta', 'webline_faq', 'side');
    add_meta_box('webline_portfolio_meta', 'Portfolio Settings', 'webline_render_portfolio_meta', 'webline_portfolio', 'side');
    add_meta_box('webline_partner_meta', 'Partner Settings', 'webline_render_partner_meta', 'webline_partner', 'side');
    add_meta_box('webline_office_meta', 'Office Settings', 'webline_render_office_meta', 'webline_office', 'normal');
}
add_action('add_meta_boxes', 'webline_register_meta_boxes');

function webline_render_service_meta(WP_Post $post): void
{
    wp_nonce_field('webline_service_meta', 'webline_service_meta_nonce');
    ?>
    <p>
        <label for="webline_service_badge"><strong>Badge label</strong></label><br>
        <input type="text" class="widefat" id="webline_service_badge" name="webline_service_badge" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_SERVICE_META_BADGE, true)); ?>">
    </p>
    <p>
        <label for="webline_service_order"><strong>Display order</strong></label><br>
        <input type="number" class="widefat" id="webline_service_order" name="webline_service_order" value="<?php echo esc_attr((string) (get_post_meta($post->ID, WEBLINE_SERVICE_META_ORDER, true) ?: 0)); ?>">
    </p>
    <p>
        <label for="webline_service_items"><strong>List items</strong></label><br>
        <textarea class="widefat" rows="8" id="webline_service_items" name="webline_service_items" placeholder="One line per item"><?php echo esc_textarea((string) get_post_meta($post->ID, WEBLINE_SERVICE_META_ITEMS, true)); ?></textarea>
        <small>Enter one bullet point per line.</small>
    </p>
    <?php
}

function webline_render_faq_meta(WP_Post $post): void
{
    wp_nonce_field('webline_faq_meta', 'webline_faq_meta_nonce');
    ?>
    <p>
        <label for="webline_faq_order"><strong>Display order</strong></label><br>
        <input type="number" class="widefat" id="webline_faq_order" name="webline_faq_order" value="<?php echo esc_attr((string) (get_post_meta($post->ID, WEBLINE_FAQ_META_ORDER, true) ?: 0)); ?>">
    </p>
    <p>
        <label>
            <input type="checkbox" name="webline_faq_open" value="1" <?php checked(get_post_meta($post->ID, WEBLINE_FAQ_META_OPEN, true), '1'); ?>>
            Open by default
        </label>
    </p>
    <?php
}

function webline_render_portfolio_meta(WP_Post $post): void
{
    wp_nonce_field('webline_portfolio_meta', 'webline_portfolio_meta_nonce');
    ?>
    <p>
        <label for="webline_portfolio_category"><strong>Badge label</strong></label><br>
        <input type="text" class="widefat" id="webline_portfolio_category" name="webline_portfolio_category" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_CATEGORY, true)); ?>">
    </p>
    <p>
        <label for="webline_portfolio_date"><strong>Date label</strong></label><br>
        <input type="text" class="widefat" id="webline_portfolio_date" name="webline_portfolio_date" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_DATE, true)); ?>">
    </p>
    <p>
        <label for="webline_portfolio_image"><strong>External image URL</strong></label><br>
        <input type="url" class="widefat" id="webline_portfolio_image" name="webline_portfolio_image" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_IMAGE, true)); ?>">
    </p>
    <p>
        <label for="webline_portfolio_gallery"><strong>Gallery image URLs</strong></label><br>
        <textarea class="widefat" rows="6" id="webline_portfolio_gallery" name="webline_portfolio_gallery" placeholder="One image URL per line"><?php echo esc_textarea((string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_GALLERY, true)); ?></textarea>
        <small>The featured image is used as the main image. Add extra gallery images here, one URL per line.</small>
    </p>
    <?php
}

function webline_render_partner_meta(WP_Post $post): void
{
    wp_nonce_field('webline_partner_meta', 'webline_partner_meta_nonce');
    ?>
    <p>
        <label for="webline_partner_order"><strong>Display order</strong></label><br>
        <input type="number" class="widefat" id="webline_partner_order" name="webline_partner_order" value="<?php echo esc_attr((string) (get_post_meta($post->ID, WEBLINE_PARTNER_META_ORDER, true) ?: 0)); ?>">
    </p>
    <p>
        <strong>Logo image</strong><br>
        Use the Featured Image field for the partner logo card.
    </p>
    <?php
}

function webline_render_office_meta(WP_Post $post): void
{
    wp_nonce_field('webline_office_meta', 'webline_office_meta_nonce');
    ?>
    <div style="display:grid; gap:16px;">
        <p>
            <label for="webline_office_country"><strong>Country</strong></label><br>
            <input type="text" class="widefat" id="webline_office_country" name="webline_office_country" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_OFFICE_META_COUNTRY, true)); ?>">
        </p>
        <p>
            <label for="webline_office_address"><strong>Address</strong></label><br>
            <textarea class="widefat" rows="3" id="webline_office_address" name="webline_office_address"><?php echo esc_textarea((string) get_post_meta($post->ID, WEBLINE_OFFICE_META_ADDRESS, true)); ?></textarea>
        </p>
        <p>
            <label for="webline_office_phone"><strong>Phone</strong></label><br>
            <input type="text" class="widefat" id="webline_office_phone" name="webline_office_phone" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_OFFICE_META_PHONE, true)); ?>">
        </p>
        <p>
            <label for="webline_office_email"><strong>Email</strong></label><br>
            <input type="email" class="widefat" id="webline_office_email" name="webline_office_email" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_OFFICE_META_EMAIL, true)); ?>">
        </p>
        <p>
            <label for="webline_office_map_url"><strong>Map URL</strong></label><br>
            <input type="url" class="widefat" id="webline_office_map_url" name="webline_office_map_url" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_OFFICE_META_MAP_URL, true)); ?>">
        </p>
        <p>
            <label for="webline_office_embed_url"><strong>Map Embed URL</strong></label><br>
            <input type="url" class="widefat" id="webline_office_embed_url" name="webline_office_embed_url" value="<?php echo esc_attr((string) get_post_meta($post->ID, WEBLINE_OFFICE_META_EMBED_URL, true)); ?>">
        </p>
        <p>
            <label for="webline_office_order"><strong>Display order</strong></label><br>
            <input type="number" class="widefat" id="webline_office_order" name="webline_office_order" value="<?php echo esc_attr((string) (get_post_meta($post->ID, WEBLINE_OFFICE_META_ORDER, true) ?: 0)); ?>">
        </p>
    </div>
    <?php
}

function webline_save_meta_boxes(int $postId): void
{
    if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || !current_user_can('edit_post', $postId)) {
        return;
    }

    $postType = get_post_type($postId);

    if ($postType === 'webline_service' && isset($_POST['webline_service_meta_nonce']) && wp_verify_nonce($_POST['webline_service_meta_nonce'], 'webline_service_meta')) {
        update_post_meta($postId, WEBLINE_SERVICE_META_BADGE, sanitize_text_field($_POST['webline_service_badge'] ?? ''));
        update_post_meta($postId, WEBLINE_SERVICE_META_ORDER, (int) ($_POST['webline_service_order'] ?? 0));
        update_post_meta($postId, WEBLINE_SERVICE_META_ITEMS, sanitize_textarea_field($_POST['webline_service_items'] ?? ''));
    }

    if ($postType === 'webline_faq' && isset($_POST['webline_faq_meta_nonce']) && wp_verify_nonce($_POST['webline_faq_meta_nonce'], 'webline_faq_meta')) {
        update_post_meta($postId, WEBLINE_FAQ_META_ORDER, (int) ($_POST['webline_faq_order'] ?? 0));
        update_post_meta($postId, WEBLINE_FAQ_META_OPEN, isset($_POST['webline_faq_open']) ? '1' : '0');
    }

    if ($postType === 'webline_portfolio' && isset($_POST['webline_portfolio_meta_nonce']) && wp_verify_nonce($_POST['webline_portfolio_meta_nonce'], 'webline_portfolio_meta')) {
        update_post_meta($postId, WEBLINE_PORTFOLIO_META_CATEGORY, sanitize_text_field($_POST['webline_portfolio_category'] ?? ''));
        update_post_meta($postId, WEBLINE_PORTFOLIO_META_DATE, sanitize_text_field($_POST['webline_portfolio_date'] ?? ''));
        update_post_meta($postId, WEBLINE_PORTFOLIO_META_IMAGE, esc_url_raw($_POST['webline_portfolio_image'] ?? ''));
        update_post_meta($postId, WEBLINE_PORTFOLIO_META_GALLERY, sanitize_textarea_field($_POST['webline_portfolio_gallery'] ?? ''));
    }

    if ($postType === 'webline_partner' && isset($_POST['webline_partner_meta_nonce']) && wp_verify_nonce($_POST['webline_partner_meta_nonce'], 'webline_partner_meta')) {
        update_post_meta($postId, WEBLINE_PARTNER_META_ORDER, (int) ($_POST['webline_partner_order'] ?? 0));
    }

    if ($postType === 'webline_office' && isset($_POST['webline_office_meta_nonce']) && wp_verify_nonce($_POST['webline_office_meta_nonce'], 'webline_office_meta')) {
        update_post_meta($postId, WEBLINE_OFFICE_META_ORDER, (int) ($_POST['webline_office_order'] ?? 0));
        update_post_meta($postId, WEBLINE_OFFICE_META_COUNTRY, sanitize_text_field($_POST['webline_office_country'] ?? ''));
        update_post_meta($postId, WEBLINE_OFFICE_META_ADDRESS, sanitize_textarea_field($_POST['webline_office_address'] ?? ''));
        update_post_meta($postId, WEBLINE_OFFICE_META_PHONE, sanitize_text_field($_POST['webline_office_phone'] ?? ''));
        update_post_meta($postId, WEBLINE_OFFICE_META_EMAIL, sanitize_email($_POST['webline_office_email'] ?? ''));
        update_post_meta($postId, WEBLINE_OFFICE_META_MAP_URL, esc_url_raw($_POST['webline_office_map_url'] ?? ''));
        update_post_meta($postId, WEBLINE_OFFICE_META_EMBED_URL, esc_url_raw($_POST['webline_office_embed_url'] ?? ''));
    }
}
add_action('save_post', 'webline_save_meta_boxes');

function webline_ensure_pages(): void
{
    foreach (webline_page_definitions() as $slug => $config) {
        if (webline_get_page($slug) instanceof WP_Post) {
            continue;
        }

        wp_insert_post([
            'post_type' => 'page',
            'post_status' => 'publish',
            'post_name' => $slug,
            'post_title' => $config['title'],
        ]);
    }
}
add_action('init', 'webline_ensure_pages', 20);

function webline_register_headless_page(): void
{
    add_menu_page(
        'Webline Headless',
        'Webline Headless',
        'manage_options',
        'webline-headless',
        'webline_render_headless_page',
        'dashicons-admin-generic',
        25
    );
}
add_action('admin_menu', 'webline_register_headless_page');

function webline_render_headless_page(): void
{
    ?>
    <div class="wrap">
        <h1>Webline Headless</h1>
        <p>This plugin wires WordPress to the Next.js frontend at <code><?php echo esc_html(webline_frontend_url()); ?></code>.</p>
        <ul style="list-style:disc; padding-left:20px;">
            <li>Edit landing-page sections in <strong>Pages</strong>.</li>
            <li>Edit repeating content in <strong>Services</strong>, <strong>FAQs</strong>, <strong>Portfolio</strong>, <strong>Partners</strong>, and <strong>Offices</strong>.</li>
            <li>REST settings endpoint: <code><?php echo esc_html(get_rest_url(null, 'runok/v1/settings')); ?></code></li>
        </ul>
    </div>
    <?php
}

function webline_admin_notice_for_acf(): void
{
    if (function_exists('acf_add_local_field_group')) {
        return;
    }

    echo '<div class="notice notice-warning"><p><strong>Webline Headless CMS:</strong> install and activate Advanced Custom Fields to edit page fields.</p></div>';
}
add_action('admin_notices', 'webline_admin_notice_for_acf');

function webline_page_location(string $slug): array
{
    $page = webline_get_page($slug);

    if ($page instanceof WP_Post) {
        return [[['param' => 'post', 'operator' => '==', 'value' => (string) $page->ID]]];
    }

    return [[['param' => 'post_type', 'operator' => '==', 'value' => 'page']]];
}

function webline_intro_fields(string $prefix): array
{
    return [
        ['key' => 'field_' . $prefix . '_intro_eyebrow', 'label' => 'Intro Eyebrow', 'name' => 'intro_eyebrow', 'type' => 'text'],
        ['key' => 'field_' . $prefix . '_intro_title', 'label' => 'Intro Title', 'name' => 'intro_title', 'type' => 'text'],
        ['key' => 'field_' . $prefix . '_intro_description', 'label' => 'Intro Description', 'name' => 'intro_description', 'type' => 'textarea', 'rows' => 4],
    ];
}

function webline_about_layout_fields(): array
{
    return [
        ['key' => 'field_about_layout_eyebrow', 'label' => 'Page Eyebrow', 'name' => 'about_page_eyebrow', 'type' => 'text'],
        ['key' => 'field_about_layout_title', 'label' => 'Page Title', 'name' => 'about_page_title', 'type' => 'text'],
        ['key' => 'field_about_layout_subtitle', 'label' => 'Page Subtitle', 'name' => 'about_page_subtitle', 'type' => 'textarea', 'rows' => 3],
        ['key' => 'field_about_story_eyebrow', 'label' => 'Story Eyebrow', 'name' => 'about_story_eyebrow', 'type' => 'text'],
        ['key' => 'field_about_story_title', 'label' => 'Story Title', 'name' => 'about_story_title', 'type' => 'text'],
        ['key' => 'field_about_story_accent', 'label' => 'Story Accent', 'name' => 'about_story_accent', 'type' => 'text'],
        ['key' => 'field_about_story_paragraph_1', 'label' => 'Story Paragraph 1', 'name' => 'about_story_paragraph_1', 'type' => 'textarea', 'rows' => 4],
        ['key' => 'field_about_story_paragraph_2', 'label' => 'Story Paragraph 2', 'name' => 'about_story_paragraph_2', 'type' => 'textarea', 'rows' => 4],
        ['key' => 'field_about_stat_value', 'label' => 'Stat Value', 'name' => 'about_stat_value', 'type' => 'text'],
        ['key' => 'field_about_stat_label', 'label' => 'Stat Label', 'name' => 'about_stat_label', 'type' => 'text'],
        ['key' => 'field_about_metric_1_value', 'label' => 'Metric 1 Value', 'name' => 'about_metric_1_value', 'type' => 'text'],
        ['key' => 'field_about_metric_1_label', 'label' => 'Metric 1 Label', 'name' => 'about_metric_1_label', 'type' => 'text'],
        ['key' => 'field_about_metric_2_value', 'label' => 'Metric 2 Value', 'name' => 'about_metric_2_value', 'type' => 'text'],
        ['key' => 'field_about_metric_2_label', 'label' => 'Metric 2 Label', 'name' => 'about_metric_2_label', 'type' => 'text'],
        ['key' => 'field_about_metric_3_value', 'label' => 'Metric 3 Value', 'name' => 'about_metric_3_value', 'type' => 'text'],
        ['key' => 'field_about_metric_3_label', 'label' => 'Metric 3 Label', 'name' => 'about_metric_3_label', 'type' => 'text'],
        ['key' => 'field_about_metric_4_value', 'label' => 'Metric 4 Value', 'name' => 'about_metric_4_value', 'type' => 'text'],
        ['key' => 'field_about_metric_4_label', 'label' => 'Metric 4 Label', 'name' => 'about_metric_4_label', 'type' => 'text'],
        ['key' => 'field_about_beliefs_eyebrow', 'label' => 'Beliefs Eyebrow', 'name' => 'about_beliefs_eyebrow', 'type' => 'text'],
        ['key' => 'field_about_beliefs_title', 'label' => 'Beliefs Title', 'name' => 'about_beliefs_title', 'type' => 'text'],
        ['key' => 'field_about_belief_1_title', 'label' => 'Belief 1 Title', 'name' => 'about_belief_1_title', 'type' => 'text'],
        ['key' => 'field_about_belief_1_description', 'label' => 'Belief 1 Description', 'name' => 'about_belief_1_description', 'type' => 'textarea', 'rows' => 3],
        ['key' => 'field_about_belief_2_title', 'label' => 'Belief 2 Title', 'name' => 'about_belief_2_title', 'type' => 'text'],
        ['key' => 'field_about_belief_2_description', 'label' => 'Belief 2 Description', 'name' => 'about_belief_2_description', 'type' => 'textarea', 'rows' => 3],
        ['key' => 'field_about_belief_3_title', 'label' => 'Belief 3 Title', 'name' => 'about_belief_3_title', 'type' => 'text'],
        ['key' => 'field_about_belief_3_description', 'label' => 'Belief 3 Description', 'name' => 'about_belief_3_description', 'type' => 'textarea', 'rows' => 3],
        ['key' => 'field_about_belief_4_title', 'label' => 'Belief 4 Title', 'name' => 'about_belief_4_title', 'type' => 'text'],
        ['key' => 'field_about_belief_4_description', 'label' => 'Belief 4 Description', 'name' => 'about_belief_4_description', 'type' => 'textarea', 'rows' => 3],
        ['key' => 'field_about_offices_eyebrow', 'label' => 'Offices Eyebrow', 'name' => 'about_offices_eyebrow', 'type' => 'text'],
        ['key' => 'field_about_offices_title', 'label' => 'Offices Title', 'name' => 'about_offices_title', 'type' => 'text'],
        ['key' => 'field_about_offices_description', 'label' => 'Offices Description', 'name' => 'about_offices_description', 'type' => 'textarea', 'rows' => 4],
        ['key' => 'field_about_offices_button', 'label' => 'Offices Button Label', 'name' => 'about_offices_button', 'type' => 'text'],
        ['key' => 'field_about_cta_title', 'label' => 'CTA Title', 'name' => 'about_cta_title', 'type' => 'text'],
        ['key' => 'field_about_cta_description', 'label' => 'CTA Description', 'name' => 'about_cta_description', 'type' => 'textarea', 'rows' => 3],
        ['key' => 'field_about_cta_button', 'label' => 'CTA Button Label', 'name' => 'about_cta_button', 'type' => 'text'],
    ];
}

function webline_portfolio_category_definitions(): array
{
    return [
        'saytlar' => [
            'title' => 'Saytlar',
            'description' => 'website haqqında',
        ],
        'dizaynlar' => [
            'title' => 'Dizaynlar',
            'description' => 'Dizayn işlərimiz',
        ],
        'sosial-media' => [
            'title' => 'Sosial media',
            'description' => 'SMM kampaniyaları',
        ],
        'video-reels' => [
            'title' => 'Video reels',
            'description' => 'Qısa video işlərimiz',
        ],
    ];
}

function webline_get_portfolio_term(WP_Post $post): ?WP_Term
{
    $terms = wp_get_post_terms($post->ID, WEBLINE_PORTFOLIO_TAXONOMY, [
        'number' => 1,
        'orderby' => 'term_order',
        'order' => 'ASC',
    ]);

    if (is_wp_error($terms) || empty($terms) || !($terms[0] instanceof WP_Term)) {
        return null;
    }

    return $terms[0];
}

function webline_get_portfolio_category_data(?string $lang = null): array
{
    return webline_with_lang($lang, static function () {
        $terms = get_terms([
            'taxonomy' => WEBLINE_PORTFOLIO_TAXONOMY,
            'hide_empty' => false,
            'orderby' => 'term_order',
            'order' => 'ASC',
        ]);

        if (is_wp_error($terms) || empty($terms)) {
            $fallback = [];

            foreach (webline_portfolio_category_definitions() as $slug => $definition) {
                $fallback[] = [
                    'slug' => $slug,
                    'title' => $definition['title'],
                    'description' => $definition['description'],
                    'shortLabel' => $definition['title'],
                    'count' => 0,
                ];
            }

            return $fallback;
        }

        return array_values(array_map(static function ($term): array {
            return [
                'slug' => $term->slug,
                'title' => $term->name,
                'description' => (string) $term->description,
                'shortLabel' => $term->name,
                'count' => (int) $term->count,
            ];
        }, array_filter($terms, static fn($term) => $term instanceof WP_Term)));
    });
}

function webline_register_acf_groups(): void
{
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group([
        'key' => 'group_webline_home',
        'title' => 'Webline Home Content',
        'fields' => [
            ['key' => 'field_home_eyebrow', 'label' => 'Hero Eyebrow', 'name' => 'hero_eyebrow', 'type' => 'text'],
            ['key' => 'field_home_title', 'label' => 'Hero Title', 'name' => 'hero_title', 'type' => 'text'],
            ['key' => 'field_home_highlight', 'label' => 'Hero Highlight', 'name' => 'hero_highlight', 'type' => 'text'],
            ['key' => 'field_home_description', 'label' => 'Hero Description', 'name' => 'hero_description', 'type' => 'textarea', 'rows' => 4],
        ],
        'location' => webline_page_location('home'),
    ]);

    acf_add_local_field_group([
        'key' => 'group_webline_services',
        'title' => 'Webline Services Content',
        'fields' => array_merge(webline_intro_fields('services'), [
            ['key' => 'field_services_section_heading', 'label' => 'Section Heading', 'name' => 'section_heading', 'type' => 'text'],
            ['key' => 'field_services_section_intro', 'label' => 'Section Intro', 'name' => 'section_intro', 'type' => 'textarea', 'rows' => 4],
        ]),
        'location' => webline_page_location('services'),
    ]);

    acf_add_local_field_group([
        'key' => 'group_webline_process',
        'title' => 'Webline Process Content',
        'fields' => array_merge(webline_intro_fields('process'), [
            ['key' => 'field_process_section_heading', 'label' => 'Section Heading', 'name' => 'section_heading', 'type' => 'text'],
            ['key' => 'field_process_step_1_title', 'label' => 'Step 1 Title', 'name' => 'step_1_title', 'type' => 'text'],
            ['key' => 'field_process_step_1_description', 'label' => 'Step 1 Description', 'name' => 'step_1_description', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_process_step_2_title', 'label' => 'Step 2 Title', 'name' => 'step_2_title', 'type' => 'text'],
            ['key' => 'field_process_step_2_description', 'label' => 'Step 2 Description', 'name' => 'step_2_description', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_process_step_3_title', 'label' => 'Step 3 Title', 'name' => 'step_3_title', 'type' => 'text'],
            ['key' => 'field_process_step_3_description', 'label' => 'Step 3 Description', 'name' => 'step_3_description', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_process_step_4_title', 'label' => 'Step 4 Title', 'name' => 'step_4_title', 'type' => 'text'],
            ['key' => 'field_process_step_4_description', 'label' => 'Step 4 Description', 'name' => 'step_4_description', 'type' => 'textarea', 'rows' => 3],
        ]),
        'location' => webline_page_location('process'),
    ]);

    acf_add_local_field_group([
        'key' => 'group_webline_about',
        'title' => 'Webline About Content',
        'fields' => array_merge(webline_intro_fields('about'), [
            ['key' => 'field_about_section_title', 'label' => 'Section Title', 'name' => 'section_title', 'type' => 'text'],
            ['key' => 'field_about_section_description', 'label' => 'Section Description', 'name' => 'section_description', 'type' => 'textarea', 'rows' => 4],
            ['key' => 'field_about_bullet_1', 'label' => 'Bullet 1', 'name' => 'bullet_1', 'type' => 'text'],
            ['key' => 'field_about_bullet_2', 'label' => 'Bullet 2', 'name' => 'bullet_2', 'type' => 'text'],
            ['key' => 'field_about_bullet_3', 'label' => 'Bullet 3', 'name' => 'bullet_3', 'type' => 'text'],
        ], webline_about_layout_fields()),
        'location' => webline_page_location('about'),
    ]);

    acf_add_local_field_group([
        'key' => 'group_webline_portfolio',
        'title' => 'Webline Portfolio Content',
        'fields' => webline_intro_fields('portfolio'),
        'location' => webline_page_location('portfolio'),
    ]);

    acf_add_local_field_group([
        'key' => 'group_webline_faq',
        'title' => 'Webline FAQ Content',
        'fields' => array_merge(webline_intro_fields('faq'), [
            ['key' => 'field_faq_section_heading', 'label' => 'Section Heading', 'name' => 'section_heading', 'type' => 'text'],
        ]),
        'location' => webline_page_location('faq'),
    ]);

    acf_add_local_field_group([
        'key' => 'group_webline_contact',
        'title' => 'Webline Contact Content',
        'fields' => array_merge(webline_intro_fields('contact'), [
            ['key' => 'field_contact_email', 'label' => 'Email', 'name' => 'contact_email', 'type' => 'text'],
            ['key' => 'field_contact_phone', 'label' => 'Phone', 'name' => 'contact_phone', 'type' => 'text'],
            ['key' => 'field_contact_office', 'label' => 'Office', 'name' => 'contact_office', 'type' => 'text'],
            ['key' => 'field_contact_map_url', 'label' => 'Map URL', 'name' => 'contact_map_url', 'type' => 'url'],
            ['key' => 'field_contact_embed_url', 'label' => 'Map Embed URL', 'name' => 'contact_embed_url', 'type' => 'url'],
            ['key' => 'field_contact_panel_title', 'label' => 'Panel Title', 'name' => 'contact_panel_title', 'type' => 'text'],
            ['key' => 'field_contact_panel_description', 'label' => 'Panel Description', 'name' => 'contact_panel_description', 'type' => 'textarea', 'rows' => 4],
            ['key' => 'field_contact_response_title', 'label' => 'Response Title', 'name' => 'response_title', 'type' => 'text'],
            ['key' => 'field_contact_response_text', 'label' => 'Response Text', 'name' => 'response_text', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_contact_map_heading', 'label' => 'Map Heading', 'name' => 'map_heading', 'type' => 'text'],
        ]),
        'location' => webline_page_location('contact'),
    ]);
}
add_action('acf/init', 'webline_register_acf_groups');

function webline_get_field_value(string $pageSlug, string $field, string $fallback = '', ?string $lang = null): string
{
    $page = webline_get_page($pageSlug, $lang);

    if (!$page instanceof WP_Post || !function_exists('get_field')) {
        return $fallback;
    }

    $value = get_field($field, $page->ID);

    if (is_string($value)) {
        $value = trim($value);
    }

    return $value !== null && $value !== '' ? (string) $value : $fallback;
}

function webline_parse_lines(string $value): array
{
    $lines = preg_split('/\r\n|\r|\n/', $value);

    if (!is_array($lines)) {
        return [];
    }

    return array_values(array_filter(array_map(static function ($line) {
        return trim((string) $line);
    }, $lines)));
}

function webline_default_services(): array
{
    return [
        [
            'title' => 'Saytların hazırlanması',
            'content' => 'Biz internetdə biznesinizi düzgün təmsil edən və sizə qazanc gətirən vebsaytlar yaradırıq.',
            'badge' => '01',
            'order' => 1,
            'items' => "Online mağaza\nKorporativ saytlar\nXidmət saytları\nElan saytları\nTurizm saytları və s.",
        ],
        [
            'title' => 'Proqramların hazırlanması',
            'content' => 'Biznesinizin və müştərilərinizin rahatlığı üçün proqramlar və həllər təklif edirik.',
            'badge' => '02',
            'order' => 2,
            'items' => "Mobile app (iOS & Android)\nB2B proqramlar\nB2C proqramlar\nDesktop proqramlar\nSatış və anbar proqramları",
        ],
        [
            'title' => 'Rəqəmsal marketinq',
            'content' => 'Sosial şəbəkələrdə və axtarış sistemlərində ön sıralarda olmaq üçün strateji rəqəmsal marketinq həlləri təqdim edirik.',
            'badge' => '03',
            'order' => 3,
            'items' => "SEO & Google Ads\nFacebook & Instagram (SMM)\nTikTok\nKopiraytinq & kontent\nFoto & video çəkiliş",
        ],
        [
            'title' => 'Dizayn xidmətləri',
            'content' => 'Yaratdığımız dizaynların estetik və funksional baxımdan güclü görünməsi üçün işləyirik.',
            'badge' => '04',
            'order' => 4,
            'items' => "Logo dizaynı\nBrandbook dizaynı\nKataloq dizaynı\nQrafik videolar\n3D dizayn",
        ],
        [
            'title' => 'Texniki dəstək',
            'content' => 'Hazırladığımız saytların inkişafı və davamlı işləməsi üçün texniki dəstək göstəririk.',
            'badge' => '05',
            'order' => 5,
            'items' => "Saytlara texniki dəstək\nSaytların idarə olunması\nServer xidmətləri\nHostinq xidmətləri",
        ],
        [
            'title' => 'İşinizə faydalı',
            'content' => 'Biznesinizi düzgün təhlil edir, satışlarınızı və xidmət keyfiyyətini gücləndirməyə kömək edirik.',
            'badge' => '06',
            'order' => 6,
            'items' => "Data analizi\nKonsultasiya\nKorporativ email\nGoogle Business qeydiyyatı\nAvtobusda reklam",
        ],
    ];
}

function webline_seed_defaults(): void
{
    if (get_option(WEBLINE_SEEDED_OPTION) === '1' || !function_exists('update_field')) {
        return;
    }

    $defaults = [
        'home' => [
            'hero_eyebrow' => 'Digital Agency',
            'hero_title' => 'We create digital experiences',
            'hero_highlight' => 'that deliver results',
            'hero_description' => 'Custom websites, product systems, and focused digital strategy for companies that want a sharper online presence.',
        ],
        'services' => [
            'intro_eyebrow' => 'Services',
            'intro_title' => 'Full-spectrum capabilities',
            'intro_description' => 'From concept to launch and beyond, structured digital services around real business goals.',
            'section_heading' => 'Full-spectrum capabilities',
            'section_intro' => 'Design, engineering, and UX support aligned around one system.',
        ],
        'process' => [
            'intro_eyebrow' => 'Partners',
            'intro_title' => 'A clear process with reliable delivery',
            'intro_description' => 'Discovery, design, build, and launch handled as one flow.',
            'section_heading' => 'How We Work',
            'step_1_title' => 'Discovery',
            'step_1_description' => 'We map business goals, users, and positioning.',
            'step_2_title' => 'Design',
            'step_2_description' => 'We build a clear interface and visual system.',
            'step_3_title' => 'Build',
            'step_3_description' => 'We implement, test, and refine the product.',
            'step_4_title' => 'Launch',
            'step_4_description' => 'We ship, monitor, and iterate after release.',
        ],
        'about' => [
            'intro_eyebrow' => 'About',
            'intro_title' => 'Digital craft, business impact',
            'intro_description' => 'Webline is a full-service digital agency based in Baku.',
            'section_title' => 'Digital craft with business impact',
            'section_description' => 'We combine product design, brand thinking, and modern frontend delivery into one clear workflow.',
            'bullet_1' => 'Research-led UX and interface strategy',
            'bullet_2' => 'Scalable, maintainable frontend architecture',
            'bullet_3' => 'Performance-focused engineering',
            'about_page_eyebrow' => 'HAQQIMIZDA',
            'about_page_title' => 'Rəqəmsal sənətkarlıq, biznes təsiri',
            'about_page_subtitle' => '2017-ci ildən müasir veb həllər, proqram təminatı və rəqəmsal strategiyalar hazırlayırıq — Azərbaycandan dünyaya.',
            'about_story_eyebrow' => 'HEKAYƏMİZ',
            'about_story_title' => 'Kiçik bir komandadan',
            'about_story_accent' => 'beynəlxalq agentliyə',
            'about_story_paragraph_1' => 'Webline Bakıda kiçik bir veb dizayn studiyası kimi fəaliyyətə başlayıb. Bu gün Azərbaycan, Almaniya, Avstriya və Macarıstanda ofislərimiz olan tam xidmətli rəqəmsal agentliyik.',
            'about_story_paragraph_2' => 'Müxtəlif sənaye sahələrindən olan müştərilərimizə — startap-lardan böyük korporasiyalara qədər — rəqəmsal transformasiya yolunda etibarlı texnoloji tərəfdaş kimi xidmət göstəririk.',
            'about_stat_value' => '8+',
            'about_stat_label' => 'İlk rəqəmsal mükəmməllik töhfəmiz',
            'about_metric_1_value' => '8+',
            'about_metric_1_label' => 'İl təcrübə',
            'about_metric_2_value' => '200+',
            'about_metric_2_label' => 'Tamamlanmış layihə',
            'about_metric_3_value' => '4',
            'about_metric_3_label' => 'Ölkə ofisi',
            'about_metric_4_value' => '50+',
            'about_metric_4_label' => 'Aktiv müştəri',
            'about_beliefs_eyebrow' => 'YANAŞMAMIZ',
            'about_beliefs_title' => 'Nəyə inanırıq',
            'about_belief_1_title' => 'Performans odaqlı',
            'about_belief_1_description' => 'Hər layihədə sürət, keyfiyyət və ölçülənə bilən nəticələr əsas prioritetimizdir. Texnologiyanı biznes məqsədlərinə xidmət etdiririk.',
            'about_belief_2_title' => 'Dizayn mükəmməlliyi',
            'about_belief_2_description' => 'İstifadəçi araşdırmasına əsaslanan UX dizayn metodologiyamız brendinizi fərqləndirən rəqəmsal təcrübələr yaradır.',
            'about_belief_3_title' => 'Uzunmüddətli tərəfdaşlıq',
            'about_belief_3_description' => 'Bir dəfəlik layihə deyil, davamlı əməkdaşlıq qururuq. Müştərilərimizin böyüməsi bizim uğurumuzdur.',
            'about_belief_4_title' => 'Ölçülə bilən nəticə',
            'about_belief_4_description' => 'Hər qərar data ilə dəstəklənir. Strategiyalarımız konkret KPI-lara və biznes göstəricilərinə bağlıdır.',
            'about_offices_eyebrow' => 'QLOBAL MÖVCUDLUQ',
            'about_offices_title' => '4 ölkə, bir missiya',
            'about_offices_description' => 'Bakıda, Berlində, Vyanada və Budapeştdə işləyən komandamız fərqli bazarların ritmini anlayır və məhsulları lokal ehtiyaclara uyğunlaşdırır.',
            'about_offices_button' => 'Ofislərimizə keçid edin',
            'about_cta_title' => 'Əla bir şey qurmağa hazırsınız?',
            'about_cta_description' => 'Layihənizi müzakirə edək və rəqəmsal məqsədlərinizə necə çata biləcəyinizi birlikdə aydınlaşdıraq.',
            'about_cta_button' => 'Konsultasiya rezerv edin',
        ],
        'portfolio' => [
            'intro_eyebrow' => 'Portfolio',
            'intro_title' => 'Projects that speak for themselves',
            'intro_description' => 'Selected work and insight-led presentation blocks.',
        ],
        'faq' => [
            'intro_eyebrow' => 'FAQ',
            'intro_title' => 'Common questions and project expectations',
            'intro_description' => 'A simple knowledge base for new inquiries and project scope.',
            'section_heading' => 'Common Questions',
        ],
        'contact' => [
            'intro_eyebrow' => 'Contact',
            'intro_title' => 'Let us discuss the next digital system your brand actually needs.',
            'intro_description' => 'Use this page for project requests, partnerships, and strategic conversations.',
            'contact_email' => 'info@thewebline.com',
            'contact_phone' => '+994 55 728 48 48',
            'contact_office' => 'Baku, Azerbaijan',
            'contact_map_url' => 'https://maps.google.com/?q=Baku,Azerbaijan',
            'contact_embed_url' => 'https://www.google.com/maps?q=Baku,Azerbaijan&z=13&output=embed',
            'contact_panel_title' => 'Direct lines for project inquiries and planning.',
            'contact_panel_description' => 'Share the goal, timing, and expected outcome. We will shape the right engagement from there.',
            'response_title' => 'Response window',
            'response_text' => 'Most inquiries get a reply within one business day.',
            'map_heading' => 'Find the studio in Baku.',
        ],
    ];

    foreach ($defaults as $slug => $fields) {
        $page = webline_get_page($slug);

        if (!$page instanceof WP_Post) {
            continue;
        }

        foreach ($fields as $field => $value) {
            update_field($field, $value, $page->ID);
        }
    }

    update_option(WEBLINE_SEEDED_OPTION, '1');
}
add_action('admin_init', 'webline_seed_defaults');

function webline_seed_post(string $postType, string $title, array $args = []): int
{
    $existing = get_page_by_title($title, OBJECT, $postType);

    if ($existing instanceof WP_Post) {
        return (int) $existing->ID;
    }

    return (int) wp_insert_post(array_merge([
        'post_type' => $postType,
        'post_status' => 'publish',
        'post_title' => $title,
    ], $args));
}

function webline_default_offices(): array
{
    return [
        [
            'title' => 'Bakı',
            'country' => 'Azərbaycan',
            'address' => 'Heydər Əliyev prospekti 5',
            'phone' => '+994 55 7284848',
            'email' => 'info@thewebline.com',
            'map_url' => 'https://maps.google.com/?q=Heydar+Aliyev+prospekti+5,+Baku',
            'embed_url' => 'https://www.google.com/maps?q=Heydar+Aliyev+prospekti+5,+Baku&z=13&output=embed',
            'order' => 1,
        ],
        [
            'title' => 'Berlin',
            'country' => 'Almaniya',
            'address' => 'Naugarder Strasse 46, 10409',
            'phone' => '+49 176 75552813',
            'email' => 'info@thewebline.com',
            'map_url' => 'https://maps.google.com/?q=Naugarder+Strasse+46,+10409+Berlin',
            'embed_url' => 'https://www.google.com/maps?q=Naugarder+Strasse+46,+10409+Berlin&z=13&output=embed',
            'order' => 2,
        ],
        [
            'title' => 'Vyana',
            'country' => 'Avstriya',
            'address' => 'A-1110, Simmeringer Hauptstr.26IB',
            'phone' => '+43 660 8600035',
            'email' => 'info@thewebline.com',
            'map_url' => 'https://maps.google.com/?q=Simmeringer+Hauptstrasse+26,+1110+Vienna',
            'embed_url' => 'https://www.google.com/maps?q=Simmeringer+Hauptstrasse+26,+1110+Vienna&z=13&output=embed',
            'order' => 3,
        ],
        [
            'title' => 'Budapeşt',
            'country' => 'Macarıstan',
            'address' => '1051, Széchenyi István tér 7-8',
            'phone' => '+36 30 336 6884',
            'email' => 'info@thewebline.com',
            'map_url' => 'https://maps.google.com/?q=Szechenyi+Istvan+ter+7-8,+1051+Budapest',
            'embed_url' => 'https://www.google.com/maps?q=Szechenyi+Istvan+ter+7-8,+1051+Budapest&z=13&output=embed',
            'order' => 4,
        ],
    ];
}

function webline_seed_collections(): void
{
    if (get_option(WEBLINE_COLLECTION_SEEDED_OPTION) === '1') {
        return;
    }

    foreach (webline_default_services() as $serviceDefinition) {
        $service = webline_seed_post('webline_service', $serviceDefinition['title'], ['post_content' => $serviceDefinition['content']]);
        update_post_meta($service, WEBLINE_SERVICE_META_BADGE, $serviceDefinition['badge']);
        update_post_meta($service, WEBLINE_SERVICE_META_ORDER, $serviceDefinition['order']);
        update_post_meta($service, WEBLINE_SERVICE_META_ITEMS, $serviceDefinition['items']);
    }

    $faq = webline_seed_post('webline_faq', 'How fast can a project start?', ['post_content' => 'Most projects can move into discovery within a few business days after scope alignment.']);
    update_post_meta($faq, WEBLINE_FAQ_META_ORDER, 1);
    update_post_meta($faq, WEBLINE_FAQ_META_OPEN, '1');

    $faq = webline_seed_post('webline_faq', 'Do you support ongoing updates?', ['post_content' => 'Yes. We support roadmap, maintenance, and iteration work after launch.']);
    update_post_meta($faq, WEBLINE_FAQ_META_ORDER, 2);

    $portfolio = webline_seed_post('webline_portfolio', 'Digital Transformation for Luxury Brands', ['post_excerpt' => 'Case studies on how elite brands adapted their physical heritage to the screen.']);
    update_post_meta($portfolio, WEBLINE_PORTFOLIO_META_CATEGORY, 'Business');
    update_post_meta($portfolio, WEBLINE_PORTFOLIO_META_DATE, 'March 15, 2024');
    update_post_meta($portfolio, WEBLINE_PORTFOLIO_META_IMAGE, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_7JouxEcMwGTfnKw0B0ow5FtPod58NGv6H1jjQZJVEL8qVqtSEaEdkxdjhsThi4lBaDHrWRPLhBbovpWEs55FSdJTh8qG0oy-fhzEYDmZS4GucfycPzV6DLUqg1qhRXdzkg2WGBiGVPkDDRjSRjmnuxTMlJiFc844OhxMkYzDkosUHjHG07xvdvqxLquPnBv8720JZOEHSSNme2ijXaQOFUUz1ipbCZwsZcBsQOORYPGGOkY2Hsj5UyOyJ97pztK94ZBnFvBaWY0');

    $portfolio = webline_seed_post('webline_portfolio', 'Optimizing Performance for High-End Visuals', ['post_excerpt' => 'How to maintain ultra-fast load times while delivering high-resolution art assets.']);
    update_post_meta($portfolio, WEBLINE_PORTFOLIO_META_CATEGORY, 'Tech');
    update_post_meta($portfolio, WEBLINE_PORTFOLIO_META_DATE, 'April 28, 2024');
    update_post_meta($portfolio, WEBLINE_PORTFOLIO_META_IMAGE, 'https://lh3.googleusercontent.com/aida-public/AB6AXuANU7lN_fMjIOvWssDUmO_NuCruUxWhd5G309XEfQ2U544AVqHcCWEyj-1usVdVFCIvRXKoUdxIoMrBe56OQo2lY2Zmj5msTiWx1a7fC7-J9pwci_wcC6-t1bARym4-DpFq46uzm1AwB9DzdW8Adxicb3cBcUIoLxWkle34d99SWWnHcqE5lSwDMwGIVwTkcWrD03q0xfYW5C-TZh96Rz7yWV8xjyZUG1sNGKLzLlIPjmLjB7QP7QXWqKMG-7sf3EBQXycrH6gWw9Q');

    $partners = [
        ['Part 01', 'https://webline.az/wp-content/uploads/2024/02/Part-01.jpg'],
        ['Part 02', 'https://webline.az/wp-content/uploads/2024/02/Part-02.jpg'],
        ['Part 03', 'https://webline.az/wp-content/uploads/2024/02/Part-03.jpg'],
        ['Part 04', 'https://webline.az/wp-content/uploads/2024/02/Part-04.jpg'],
        ['Part 05', 'https://webline.az/wp-content/uploads/2024/02/Part-05.jpg'],
        ['Part 06', 'https://webline.az/wp-content/uploads/2024/02/Part-06.jpg'],
    ];

    foreach ($partners as $index => [$title, $image]) {
        $partner = webline_seed_post('webline_partner', $title);
        update_post_meta($partner, WEBLINE_PARTNER_META_ORDER, $index + 1);
        update_post_meta($partner, WEBLINE_PORTFOLIO_META_IMAGE, $image);
    }

    foreach (webline_default_offices() as $officeDefinition) {
        $office = webline_seed_post('webline_office', $officeDefinition['title']);
        update_post_meta($office, WEBLINE_OFFICE_META_ORDER, $officeDefinition['order']);
        update_post_meta($office, WEBLINE_OFFICE_META_COUNTRY, $officeDefinition['country']);
        update_post_meta($office, WEBLINE_OFFICE_META_ADDRESS, $officeDefinition['address']);
        update_post_meta($office, WEBLINE_OFFICE_META_PHONE, $officeDefinition['phone']);
        update_post_meta($office, WEBLINE_OFFICE_META_EMAIL, $officeDefinition['email']);
        update_post_meta($office, WEBLINE_OFFICE_META_MAP_URL, $officeDefinition['map_url']);
        update_post_meta($office, WEBLINE_OFFICE_META_EMBED_URL, $officeDefinition['embed_url']);
    }

    update_option(WEBLINE_COLLECTION_SEEDED_OPTION, '1');
}
add_action('admin_init', 'webline_seed_collections');

function webline_sync_services_v120(): void
{
    if (get_option(WEBLINE_SERVICE_SYNC_OPTION) === '1') {
        return;
    }

    $defaults = webline_default_services();
    $existingPosts = get_posts([
        'post_type' => 'webline_service',
        'post_status' => ['publish', 'draft', 'pending', 'private'],
        'posts_per_page' => -1,
        'meta_key' => WEBLINE_SERVICE_META_ORDER,
        'orderby' => ['meta_value_num' => 'ASC', 'date' => 'ASC'],
    ]);

    $usedIds = [];

    foreach ($defaults as $serviceDefinition) {
        $matchedPost = null;

        foreach ($existingPosts as $post) {
            if ((int) get_post_meta($post->ID, WEBLINE_SERVICE_META_ORDER, true) === (int) $serviceDefinition['order']) {
                $matchedPost = $post;
                break;
            }
        }

        if (!$matchedPost instanceof WP_Post) {
            $matchedPost = get_page_by_title($serviceDefinition['title'], OBJECT, 'webline_service');
        }

        if ($matchedPost instanceof WP_Post) {
            wp_update_post([
                'ID' => $matchedPost->ID,
                'post_title' => $serviceDefinition['title'],
                'post_content' => $serviceDefinition['content'],
                'post_status' => 'publish',
            ]);
            $serviceId = (int) $matchedPost->ID;
        } else {
            $serviceId = (int) wp_insert_post([
                'post_type' => 'webline_service',
                'post_status' => 'publish',
                'post_title' => $serviceDefinition['title'],
                'post_content' => $serviceDefinition['content'],
            ]);
        }

        if ($serviceId <= 0) {
            continue;
        }

        $usedIds[] = $serviceId;
        update_post_meta($serviceId, WEBLINE_SERVICE_META_BADGE, $serviceDefinition['badge']);
        update_post_meta($serviceId, WEBLINE_SERVICE_META_ORDER, $serviceDefinition['order']);
        update_post_meta($serviceId, WEBLINE_SERVICE_META_ITEMS, $serviceDefinition['items']);
    }

    foreach ($existingPosts as $post) {
        if (!in_array((int) $post->ID, $usedIds, true)) {
            wp_update_post([
                'ID' => $post->ID,
                'post_status' => 'draft',
            ]);
        }
    }

    update_option(WEBLINE_SERVICE_SYNC_OPTION, '1');
}
add_action('admin_init', 'webline_sync_services_v120');

function webline_sync_offices_v150(): void
{
    if (get_option(WEBLINE_OFFICE_SYNC_OPTION) === '1') {
        return;
    }

    $defaults = webline_default_offices();
    $existingPosts = get_posts([
        'post_type' => 'webline_office',
        'post_status' => ['publish', 'draft', 'pending', 'private'],
        'posts_per_page' => -1,
        'meta_key' => WEBLINE_OFFICE_META_ORDER,
        'orderby' => ['meta_value_num' => 'ASC', 'date' => 'ASC'],
    ]);

    $usedIds = [];

    foreach ($defaults as $officeDefinition) {
        $matchedPost = null;

        foreach ($existingPosts as $post) {
            if ((int) get_post_meta($post->ID, WEBLINE_OFFICE_META_ORDER, true) === (int) $officeDefinition['order']) {
                $matchedPost = $post;
                break;
            }
        }

        if (!$matchedPost instanceof WP_Post) {
            $matchedPost = get_page_by_title($officeDefinition['title'], OBJECT, 'webline_office');
        }

        if ($matchedPost instanceof WP_Post) {
            wp_update_post([
                'ID' => $matchedPost->ID,
                'post_title' => $officeDefinition['title'],
                'post_status' => 'publish',
            ]);
            $officeId = (int) $matchedPost->ID;
        } else {
            $officeId = (int) wp_insert_post([
                'post_type' => 'webline_office',
                'post_status' => 'publish',
                'post_title' => $officeDefinition['title'],
            ]);
        }

        if ($officeId <= 0) {
            continue;
        }

        $usedIds[] = $officeId;
        update_post_meta($officeId, WEBLINE_OFFICE_META_ORDER, $officeDefinition['order']);
        update_post_meta($officeId, WEBLINE_OFFICE_META_COUNTRY, $officeDefinition['country']);
        update_post_meta($officeId, WEBLINE_OFFICE_META_ADDRESS, $officeDefinition['address']);
        update_post_meta($officeId, WEBLINE_OFFICE_META_PHONE, $officeDefinition['phone']);
        update_post_meta($officeId, WEBLINE_OFFICE_META_EMAIL, $officeDefinition['email']);
        update_post_meta($officeId, WEBLINE_OFFICE_META_MAP_URL, $officeDefinition['map_url']);
        update_post_meta($officeId, WEBLINE_OFFICE_META_EMBED_URL, $officeDefinition['embed_url']);
    }

    foreach ($existingPosts as $post) {
        if (!in_array((int) $post->ID, $usedIds, true)) {
            wp_update_post([
                'ID' => $post->ID,
                'post_status' => 'draft',
            ]);
        }
    }

    update_option(WEBLINE_OFFICE_SYNC_OPTION, '1');
}
add_action('admin_init', 'webline_sync_offices_v150');

function webline_infer_portfolio_category_slug(string $title, string $badge, int $index = 0): string
{
    $haystack = strtolower($title . ' ' . $badge);

    if (str_contains($haystack, 'design') || str_contains($haystack, 'dizayn') || str_contains($haystack, 'brand')) {
        return 'dizaynlar';
    }

    if (str_contains($haystack, 'social') || str_contains($haystack, 'media') || str_contains($haystack, 'smm')) {
        return 'sosial-media';
    }

    if (str_contains($haystack, 'video') || str_contains($haystack, 'reel') || str_contains($haystack, 'motion')) {
        return 'video-reels';
    }

    $fallbackOrder = ['saytlar', 'dizaynlar', 'sosial-media', 'video-reels'];
    return $fallbackOrder[$index % count($fallbackOrder)];
}

function webline_sync_portfolio_v160(): void
{
    if (get_option(WEBLINE_PORTFOLIO_TAXONOMY_SYNC_OPTION) === '1') {
        return;
    }

    foreach (webline_portfolio_category_definitions() as $slug => $definition) {
        if (!term_exists($slug, WEBLINE_PORTFOLIO_TAXONOMY)) {
            wp_insert_term($definition['title'], WEBLINE_PORTFOLIO_TAXONOMY, [
                'slug' => $slug,
                'description' => $definition['description'],
            ]);
        }
    }

    $posts = get_posts([
        'post_type' => 'webline_portfolio',
        'post_status' => ['publish', 'draft', 'pending', 'private'],
        'posts_per_page' => -1,
        'orderby' => ['date' => 'ASC'],
    ]);

    foreach ($posts as $index => $post) {
        $existingSlug = (string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_CATEGORY_SLUG, true);
        $badge = (string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_CATEGORY, true);
        $resolvedSlug = $existingSlug !== ''
            ? $existingSlug
            : webline_infer_portfolio_category_slug($post->post_title, $badge, (int) $index);

        update_post_meta($post->ID, WEBLINE_PORTFOLIO_META_CATEGORY_SLUG, $resolvedSlug);

        $term = get_term_by('slug', $resolvedSlug, WEBLINE_PORTFOLIO_TAXONOMY);
        if ($term instanceof WP_Term) {
            wp_set_post_terms($post->ID, [(int) $term->term_id], WEBLINE_PORTFOLIO_TAXONOMY, false);
        }
    }

    update_option(WEBLINE_PORTFOLIO_SYNC_OPTION, '1');
    update_option(WEBLINE_PORTFOLIO_TAXONOMY_SYNC_OPTION, '1');
}
add_action('admin_init', 'webline_sync_portfolio_v160');

function webline_sync_about_v190(): void
{
    if (get_option(WEBLINE_ABOUT_SYNC_OPTION) === '1' || !function_exists('update_field') || !function_exists('get_field')) {
        return;
    }

    $page = webline_get_page('about');

    if (!$page instanceof WP_Post) {
        return;
    }

    $defaults = [
        'about_page_eyebrow' => 'HAQQIMIZDA',
        'about_page_title' => 'Rəqəmsal sənətkarlıq, biznes təsiri',
        'about_page_subtitle' => '2017-ci ildən müasir veb həllər, proqram təminatı və rəqəmsal strategiyalar hazırlayırıq — Azərbaycandan dünyaya.',
        'about_story_eyebrow' => 'HEKAYƏMİZ',
        'about_story_title' => 'Kiçik bir komandadan',
        'about_story_accent' => 'beynəlxalq agentliyə',
        'about_story_paragraph_1' => 'Webline Bakıda kiçik bir veb dizayn studiyası kimi fəaliyyətə başlayıb. Bu gün Azərbaycan, Almaniya, Avstriya və Macarıstanda ofislərimiz olan tam xidmətli rəqəmsal agentliyik.',
        'about_story_paragraph_2' => 'Müxtəlif sənaye sahələrindən olan müştərilərimizə — startap-lardan böyük korporasiyalara qədər — rəqəmsal transformasiya yolunda etibarlı texnoloji tərəfdaş kimi xidmət göstəririk.',
        'about_stat_value' => '8+',
        'about_stat_label' => 'İlk rəqəmsal mükəmməllik töhfəmiz',
        'about_metric_1_value' => '8+',
        'about_metric_1_label' => 'İl təcrübə',
        'about_metric_2_value' => '200+',
        'about_metric_2_label' => 'Tamamlanmış layihə',
        'about_metric_3_value' => '4',
        'about_metric_3_label' => 'Ölkə ofisi',
        'about_metric_4_value' => '50+',
        'about_metric_4_label' => 'Aktiv müştəri',
        'about_beliefs_eyebrow' => 'YANAŞMAMIZ',
        'about_beliefs_title' => 'Nəyə inanırıq',
        'about_belief_1_title' => 'Performans odaqlı',
        'about_belief_1_description' => 'Hər layihədə sürət, keyfiyyət və ölçülənə bilən nəticələr əsas prioritetimizdir. Texnologiyanı biznes məqsədlərinə xidmət etdiririk.',
        'about_belief_2_title' => 'Dizayn mükəmməlliyi',
        'about_belief_2_description' => 'İstifadəçi araşdırmasına əsaslanan UX dizayn metodologiyamız brendinizi fərqləndirən rəqəmsal təcrübələr yaradır.',
        'about_belief_3_title' => 'Uzunmüddətli tərəfdaşlıq',
        'about_belief_3_description' => 'Bir dəfəlik layihə deyil, davamlı əməkdaşlıq qururuq. Müştərilərimizin böyüməsi bizim uğurumuzdur.',
        'about_belief_4_title' => 'Ölçülə bilən nəticə',
        'about_belief_4_description' => 'Hər qərar data ilə dəstəklənir. Strategiyalarımız konkret KPI-lara və biznes göstəricilərinə bağlıdır.',
        'about_offices_eyebrow' => 'QLOBAL MÖVCUDLUQ',
        'about_offices_title' => '4 ölkə, bir missiya',
        'about_offices_description' => 'Bakıda, Berlində, Vyanada və Budapeştdə işləyən komandamız fərqli bazarların ritmini anlayır və məhsulları lokal ehtiyaclara uyğunlaşdırır.',
        'about_offices_button' => 'Ofislərimizə keçid edin',
        'about_cta_title' => 'Əla bir şey qurmağa hazırsınız?',
        'about_cta_description' => 'Layihənizi müzakirə edək və rəqəmsal məqsədlərinizə necə çata biləcəyinizi birlikdə aydınlaşdıraq.',
        'about_cta_button' => 'Konsultasiya rezerv edin',
    ];

    foreach ($defaults as $field => $value) {
        $currentValue = get_field($field, $page->ID);

        if ($currentValue === null || $currentValue === '') {
            update_field($field, $value, $page->ID);
        }
    }

    update_option(WEBLINE_ABOUT_SYNC_OPTION, '1');
}
add_action('admin_init', 'webline_sync_about_v190');

function webline_get_frontend_page_url(WP_Post $post): string
{
    $slug = $post->post_name ?: '';
    $base = webline_frontend_url();

    return ($slug === '' || $slug === 'home') ? $base . '/' : $base . '/' . ltrim($slug, '/') . '/';
}

function webline_filter_page_link(string $link, int $postId): string
{
    $post = get_post($postId);
    return ($post instanceof WP_Post && $post->post_type === 'page') ? webline_get_frontend_page_url($post) : $link;
}
add_filter('page_link', 'webline_filter_page_link', 10, 2);

function webline_filter_preview_link(string $previewLink, WP_Post $post): string
{
    return $post->post_type === 'page' ? webline_get_frontend_page_url($post) : $previewLink;
}
add_filter('preview_post_link', 'webline_filter_preview_link', 10, 2);

function webline_filter_permalink_html(?string $html, int $postId, ?string $newTitle, ?string $newSlug, WP_Post $post): string
{
    if ($post->post_type !== 'page') {
        return (string) $html;
    }

    $slug = ($newSlug !== null && $newSlug !== '') ? sanitize_title($newSlug) : $post->post_name;
    $url = ($slug === '' || $slug === 'home') ? webline_frontend_url() . '/' : webline_frontend_url() . '/' . $slug . '/';

    return '<strong>Frontend URL:</strong> <a href="' . esc_url($url) . '" target="_blank">' . esc_html($url) . '</a>';
}
add_filter('get_sample_permalink_html', 'webline_filter_permalink_html', 10, 5);

function webline_get_current_frontend_admin_url(): string
{
    if (!is_admin()) {
        return webline_frontend_url() . '/';
    }

    $postId = 0;

    if (isset($_GET['post'])) {
        $postId = absint(wp_unslash($_GET['post']));
    } elseif (isset($_POST['post_ID'])) {
        $postId = absint(wp_unslash($_POST['post_ID']));
    }

    if ($postId > 0) {
        $post = get_post($postId);

        if ($post instanceof WP_Post && $post->post_type === 'page') {
            return webline_get_frontend_page_url($post);
        }
    }

    return webline_frontend_url() . '/';
}

function webline_customize_admin_bar_links(WP_Admin_Bar $adminBar): void
{
    if (!is_admin_bar_showing()) {
        return;
    }

    $siteUrl = webline_frontend_url() . '/';
    $currentUrl = webline_get_current_frontend_admin_url();

    if ($adminBar->get_node('site-name')) {
        $adminBar->add_node([
            'id' => 'site-name',
            'href' => $siteUrl,
        ]);
    }

    if ($adminBar->get_node('view-site')) {
        $adminBar->add_node([
            'id' => 'view-site',
            'parent' => 'site-name',
            'href' => $currentUrl,
            'title' => is_admin() && $currentUrl !== $siteUrl ? 'Visit Page' : 'Visit Site',
        ]);
    }

    if ($adminBar->get_node('view')) {
        $adminBar->add_node([
            'id' => 'view',
            'href' => $currentUrl,
        ]);
    }
}
add_action('admin_bar_menu', 'webline_customize_admin_bar_links', 999);

function webline_get_services_data(): array
{
    $posts = get_posts([
        'post_type' => 'webline_service',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_key' => WEBLINE_SERVICE_META_ORDER,
        'orderby' => ['meta_value_num' => 'ASC', 'date' => 'ASC'],
    ]);

    return array_map(static function (WP_Post $post) {
        return [
            'icon' => get_post_meta($post->ID, WEBLINE_SERVICE_META_BADGE, true) ?: 'Item',
            'title' => $post->post_title,
            'description' => wp_strip_all_tags($post->post_content),
            'items' => webline_parse_lines((string) get_post_meta($post->ID, WEBLINE_SERVICE_META_ITEMS, true)),
        ];
    }, $posts);
}

function webline_get_gallery_items(int $postId, string $title = ''): array
{
    $gallery = (string) get_post_meta($postId, WEBLINE_PORTFOLIO_META_GALLERY, true);
    $urls = webline_parse_lines($gallery);

    return array_values(array_map(static function (string $url, int $index) use ($title): array {
        return [
            'src' => esc_url_raw($url),
            'alt' => trim($title) !== '' ? $title . ' gallery ' . ($index + 1) : 'Portfolio gallery ' . ($index + 1),
        ];
    }, $urls, array_keys($urls)));
}

function webline_get_faq_data(): array
{
    $posts = get_posts([
        'post_type' => 'webline_faq',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_key' => WEBLINE_FAQ_META_ORDER,
        'orderby' => ['meta_value_num' => 'ASC', 'date' => 'ASC'],
    ]);

    return array_map(static function (WP_Post $post) {
        return [
            'question' => $post->post_title,
            'answer' => wp_strip_all_tags($post->post_content),
            'open' => get_post_meta($post->ID, WEBLINE_FAQ_META_OPEN, true) === '1',
        ];
    }, $posts);
}

function webline_get_portfolio_data(?string $lang = null): array
{
    return webline_with_lang($lang, static function () {
        $posts = get_posts([
            'post_type' => 'webline_portfolio',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'orderby' => ['date' => 'DESC'],
        ]);

        return array_map(static function (WP_Post $post) {
            $image = get_the_post_thumbnail_url($post, 'large') ?: get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_IMAGE, true);
            $term = webline_get_portfolio_term($post);
            $categorySlug = $term instanceof WP_Term
                ? $term->slug
                : ((string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_CATEGORY_SLUG, true) ?: 'saytlar');
            $badge = (string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_CATEGORY, true);

            return [
                'slug' => $post->post_name ?: 'portfolio-' . $post->ID,
                'category' => $term instanceof WP_Term ? $term->name : ($badge ?: 'Portfolio'),
                'categorySlug' => $categorySlug,
                'badge' => $badge ?: ($term instanceof WP_Term ? $term->name : 'Portfolio'),
                'date' => get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_DATE, true) ?: mysql2date('F j, Y', $post->post_date),
                'title' => $post->post_title,
                'description' => $post->post_excerpt ?: wp_strip_all_tags($post->post_content),
                'image' => $image ?: '',
                'alt' => get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true) ?: $post->post_title,
                'gallery' => webline_get_gallery_items($post->ID, $post->post_title),
            ];
        }, $posts);
    });
}

function webline_get_partner_data(?string $lang = null): array
{
    return webline_with_lang($lang, static function () {
        $posts = get_posts([
            'post_type' => 'webline_partner',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'meta_key' => WEBLINE_PARTNER_META_ORDER,
            'orderby' => ['meta_value_num' => 'ASC', 'date' => 'ASC'],
        ]);

        return array_map(static function (WP_Post $post) {
            $image = get_the_post_thumbnail_url($post, 'large') ?: get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_IMAGE, true);

            return [
                'title' => $post->post_title,
                'image' => $image ?: '',
            ];
        }, $posts);
    });
}

function webline_get_office_data(?string $lang = null): array
{
    return webline_with_lang($lang, static function () {
        $posts = get_posts([
            'post_type' => 'webline_office',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'meta_key' => WEBLINE_OFFICE_META_ORDER,
            'orderby' => ['meta_value_num' => 'ASC', 'date' => 'ASC'],
        ]);

        return array_map(static function (WP_Post $post) {
            return [
                'city' => $post->post_title,
                'country' => (string) get_post_meta($post->ID, WEBLINE_OFFICE_META_COUNTRY, true),
                'address' => (string) get_post_meta($post->ID, WEBLINE_OFFICE_META_ADDRESS, true),
                'phone' => (string) get_post_meta($post->ID, WEBLINE_OFFICE_META_PHONE, true),
                'email' => (string) get_post_meta($post->ID, WEBLINE_OFFICE_META_EMAIL, true),
                'mapUrl' => (string) get_post_meta($post->ID, WEBLINE_OFFICE_META_MAP_URL, true),
                'embedUrl' => (string) get_post_meta($post->ID, WEBLINE_OFFICE_META_EMBED_URL, true),
            ];
        }, $posts);
    });
}

function webline_get_about_page_data(?string $lang = null): array
{
    return [
        'eyebrow' => webline_get_field_value('about', 'about_page_eyebrow', 'HAQQIMIZDA', $lang),
        'title' => webline_get_field_value('about', 'about_page_title', 'Rəqəmsal sənətkarlıq, biznes təsiri', $lang),
        'subtitle' => webline_get_field_value('about', 'about_page_subtitle', '', $lang),
        'featureEyebrow' => webline_get_field_value('about', 'about_story_eyebrow', 'HEKAYƏMİZ', $lang),
        'featureTitle' => webline_get_field_value('about', 'about_story_title', 'Kiçik bir komandadan', $lang),
        'featureAccent' => webline_get_field_value('about', 'about_story_accent', 'beynəlxalq agentliyə', $lang),
        'featureParagraphs' => array_values(array_filter([
            webline_get_field_value('about', 'about_story_paragraph_1', '', $lang),
            webline_get_field_value('about', 'about_story_paragraph_2', '', $lang),
        ])),
        'statValue' => webline_get_field_value('about', 'about_stat_value', '8+', $lang),
        'statLabel' => webline_get_field_value('about', 'about_stat_label', '', $lang),
        'metrics' => array_values(array_filter([
            [
                'value' => webline_get_field_value('about', 'about_metric_1_value', '', $lang),
                'label' => webline_get_field_value('about', 'about_metric_1_label', '', $lang),
            ],
            [
                'value' => webline_get_field_value('about', 'about_metric_2_value', '', $lang),
                'label' => webline_get_field_value('about', 'about_metric_2_label', '', $lang),
            ],
            [
                'value' => webline_get_field_value('about', 'about_metric_3_value', '', $lang),
                'label' => webline_get_field_value('about', 'about_metric_3_label', '', $lang),
            ],
            [
                'value' => webline_get_field_value('about', 'about_metric_4_value', '', $lang),
                'label' => webline_get_field_value('about', 'about_metric_4_label', '', $lang),
            ],
        ], static fn($item) => $item['value'] !== '' || $item['label'] !== '')),
        'beliefsEyebrow' => webline_get_field_value('about', 'about_beliefs_eyebrow', 'YANAŞMAMIZ', $lang),
        'beliefsTitle' => webline_get_field_value('about', 'about_beliefs_title', 'Nəyə inanırıq', $lang),
        'beliefs' => array_values(array_filter([
            [
                'title' => webline_get_field_value('about', 'about_belief_1_title', '', $lang),
                'description' => webline_get_field_value('about', 'about_belief_1_description', '', $lang),
            ],
            [
                'title' => webline_get_field_value('about', 'about_belief_2_title', '', $lang),
                'description' => webline_get_field_value('about', 'about_belief_2_description', '', $lang),
            ],
            [
                'title' => webline_get_field_value('about', 'about_belief_3_title', '', $lang),
                'description' => webline_get_field_value('about', 'about_belief_3_description', '', $lang),
            ],
            [
                'title' => webline_get_field_value('about', 'about_belief_4_title', '', $lang),
                'description' => webline_get_field_value('about', 'about_belief_4_description', '', $lang),
            ],
        ], static fn($item) => $item['title'] !== '' || $item['description'] !== '')),
        'officesEyebrow' => webline_get_field_value('about', 'about_offices_eyebrow', 'QLOBAL MÖVCUDLUQ', $lang),
        'officesTitle' => webline_get_field_value('about', 'about_offices_title', '4 ölkə, bir missiya', $lang),
        'officesDescription' => webline_get_field_value('about', 'about_offices_description', '', $lang),
        'officesButton' => webline_get_field_value('about', 'about_offices_button', '', $lang),
        'ctaTitle' => webline_get_field_value('about', 'about_cta_title', '', $lang),
        'ctaDescription' => webline_get_field_value('about', 'about_cta_description', '', $lang),
        'ctaButton' => webline_get_field_value('about', 'about_cta_button', '', $lang),
    ];
}

function webline_build_settings_payload(?string $lang = null): array
{
    return webline_with_lang($lang, static function () {
        return [
            'homeHero' => [
                'eyebrow' => webline_get_field_value('home', 'hero_eyebrow', 'Digital Agency'),
                'title' => webline_get_field_value('home', 'hero_title', 'We create digital experiences'),
                'highlight' => webline_get_field_value('home', 'hero_highlight', 'that deliver results'),
                'description' => webline_get_field_value('home', 'hero_description', ''),
            ],
            'services' => [
                'heading' => webline_get_field_value('services', 'section_heading', 'Full-spectrum capabilities'),
                'intro' => webline_get_field_value('services', 'section_intro', ''),
                'items' => webline_get_services_data(),
            ],
            'about' => [
                'title' => webline_get_field_value('about', 'section_title', 'Digital craft with business impact'),
                'description' => webline_get_field_value('about', 'section_description', ''),
                'bullets' => array_values(array_filter([
                    webline_get_field_value('about', 'bullet_1', ''),
                    webline_get_field_value('about', 'bullet_2', ''),
                    webline_get_field_value('about', 'bullet_3', ''),
                ])),
            ],
            'aboutPage' => webline_get_about_page_data($lang),
            'process' => [
                'heading' => webline_get_field_value('process', 'section_heading', 'How We Work'),
                'items' => [
                    ['number' => '01', 'title' => webline_get_field_value('process', 'step_1_title', 'Discovery'), 'description' => webline_get_field_value('process', 'step_1_description', '')],
                    ['number' => '02', 'title' => webline_get_field_value('process', 'step_2_title', 'Design'), 'description' => webline_get_field_value('process', 'step_2_description', '')],
                    ['number' => '03', 'title' => webline_get_field_value('process', 'step_3_title', 'Build'), 'description' => webline_get_field_value('process', 'step_3_description', '')],
                    ['number' => '04', 'title' => webline_get_field_value('process', 'step_4_title', 'Launch'), 'description' => webline_get_field_value('process', 'step_4_description', ''), 'highlighted' => true],
                ],
            ],
            'faq' => [
                'heading' => webline_get_field_value('faq', 'section_heading', 'Common Questions'),
                'items' => webline_get_faq_data(),
            ],
            'contact' => [
                'email' => webline_get_field_value('contact', 'contact_email', 'info@thewebline.com'),
                'phone' => webline_get_field_value('contact', 'contact_phone', '+994 55 728 48 48'),
                'office' => webline_get_field_value('contact', 'contact_office', 'Baku, Azerbaijan'),
                'mapUrl' => webline_get_field_value('contact', 'contact_map_url', 'https://maps.google.com/?q=Baku,Azerbaijan'),
                'embedUrl' => webline_get_field_value('contact', 'contact_embed_url', 'https://www.google.com/maps?q=Baku,Azerbaijan&z=13&output=embed'),
                'panelTitle' => webline_get_field_value('contact', 'contact_panel_title', 'Direct lines for project inquiries and planning.'),
                'panelDescription' => webline_get_field_value('contact', 'contact_panel_description', ''),
                'responseTitle' => webline_get_field_value('contact', 'response_title', 'Response window'),
                'responseText' => webline_get_field_value('contact', 'response_text', ''),
                'mapHeading' => webline_get_field_value('contact', 'map_heading', 'Find the studio in Baku.'),
            ],
            'portfolioCategories' => webline_get_portfolio_category_data($lang),
            'offices' => webline_get_office_data($lang),
            'pageIntros' => [
                'services' => ['eyebrow' => webline_get_field_value('services', 'intro_eyebrow', 'Services'), 'title' => webline_get_field_value('services', 'intro_title', ''), 'description' => webline_get_field_value('services', 'intro_description', '')],
                'process' => ['eyebrow' => webline_get_field_value('process', 'intro_eyebrow', 'Process'), 'title' => webline_get_field_value('process', 'intro_title', ''), 'description' => webline_get_field_value('process', 'intro_description', '')],
                'about' => ['eyebrow' => webline_get_field_value('about', 'intro_eyebrow', 'About'), 'title' => webline_get_field_value('about', 'intro_title', ''), 'description' => webline_get_field_value('about', 'intro_description', '')],
                'portfolio' => ['eyebrow' => webline_get_field_value('portfolio', 'intro_eyebrow', 'Portfolio'), 'title' => webline_get_field_value('portfolio', 'intro_title', ''), 'description' => webline_get_field_value('portfolio', 'intro_description', '')],
                'faq' => ['eyebrow' => webline_get_field_value('faq', 'intro_eyebrow', 'FAQ'), 'title' => webline_get_field_value('faq', 'intro_title', ''), 'description' => webline_get_field_value('faq', 'intro_description', '')],
                'contact' => ['eyebrow' => webline_get_field_value('contact', 'intro_eyebrow', 'Contact'), 'title' => webline_get_field_value('contact', 'intro_title', ''), 'description' => webline_get_field_value('contact', 'intro_description', '')],
            ],
        ];
    });
}

function webline_register_rest_routes(): void
{
    register_rest_route('runok/v1', '/settings', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => static fn(WP_REST_Request $request) => rest_ensure_response(
            webline_build_settings_payload($request->get_param('lang'))
        ),
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('runok/v1', '/portfolio', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => static fn(WP_REST_Request $request) => rest_ensure_response(
            webline_get_portfolio_data($request->get_param('lang'))
        ),
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('runok/v1', '/portfolio-categories', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => static fn(WP_REST_Request $request) => rest_ensure_response(
            webline_get_portfolio_category_data($request->get_param('lang'))
        ),
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('runok/v1', '/partners', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => static fn(WP_REST_Request $request) => rest_ensure_response(
            webline_get_partner_data($request->get_param('lang'))
        ),
        'permission_callback' => '__return_true',
    ]);
}
add_action('rest_api_init', 'webline_register_rest_routes');

function webline_revalidate_paths_for_post(WP_Post $post): array
{
    if ($post->post_type === 'page') {
        $slug = $post->post_name ?: 'home';
        return [$slug === 'home' ? '/' : '/' . $slug];
    }

    if ($post->post_type === 'webline_portfolio') {
        $term = webline_get_portfolio_term($post);
        $categorySlug = $term instanceof WP_Term
            ? $term->slug
            : (string) get_post_meta($post->ID, WEBLINE_PORTFOLIO_META_CATEGORY_SLUG, true);
        $paths = ['/', '/portfolio'];

        if ($categorySlug !== '') {
            $paths[] = '/portfolio/' . ltrim($categorySlug, '/');
        }

        return array_values(array_unique($paths));
    }

    return ['/', '/services', '/process', '/about', '/portfolio', '/faq', '/contact'];
}

function webline_send_revalidate(array $paths): void
{
    $secret = webline_revalidate_secret();
    $endpoint = webline_revalidate_endpoint();

    if ($secret === '' || $endpoint === '') {
        return;
    }

    $response = wp_remote_post($endpoint, [
        'timeout' => 10,
        'headers' => ['Content-Type' => 'application/json'],
        'body' => wp_json_encode([
            'secret' => $secret,
            'paths' => array_values(array_unique($paths)),
        ]),
    ]);

    if (is_wp_error($response)) {
        error_log('Webline revalidate failed: ' . $response->get_error_message());
    }
}

function webline_trigger_revalidate(int $postId, WP_Post $post): void
{
    if (wp_is_post_revision($postId) || $post->post_status !== 'publish') {
        return;
    }

    if (!in_array($post->post_type, ['page', 'webline_service', 'webline_faq', 'webline_portfolio', 'webline_partner', 'webline_office', 'post'], true)) {
        return;
    }

    webline_send_revalidate(webline_revalidate_paths_for_post($post));
}
add_action('save_post', 'webline_trigger_revalidate', 20, 2);

function webline_trigger_delete_revalidate(int $postId): void
{
    $post = get_post($postId);

    if ($post instanceof WP_Post && in_array($post->post_type, ['page', 'webline_service', 'webline_faq', 'webline_portfolio', 'webline_partner', 'webline_office', 'post'], true)) {
        webline_send_revalidate(webline_revalidate_paths_for_post($post));
    }
}
add_action('deleted_post', 'webline_trigger_delete_revalidate');

function webline_trigger_portfolio_term_revalidate(int $termId, int $ttId = 0, string $taxonomy = ''): void
{
    if ($taxonomy !== WEBLINE_PORTFOLIO_TAXONOMY) {
        return;
    }

    $term = get_term($termId, $taxonomy);
    $paths = ['/', '/portfolio'];

    if ($term instanceof WP_Term) {
        $paths[] = '/portfolio/' . ltrim($term->slug, '/');
    }

    webline_send_revalidate($paths);
}
add_action('created_' . WEBLINE_PORTFOLIO_TAXONOMY, 'webline_trigger_portfolio_term_revalidate', 10, 3);
add_action('edited_' . WEBLINE_PORTFOLIO_TAXONOMY, 'webline_trigger_portfolio_term_revalidate', 10, 3);

function webline_trigger_portfolio_term_delete_revalidate(int $termId, int $ttId = 0, string $taxonomy = '', $deletedTerm = null): void
{
    if ($taxonomy !== WEBLINE_PORTFOLIO_TAXONOMY) {
        return;
    }

    $paths = ['/', '/portfolio'];

    if ($deletedTerm instanceof WP_Term) {
        $paths[] = '/portfolio/' . ltrim($deletedTerm->slug, '/');
    }

    webline_send_revalidate($paths);
}
add_action('delete_' . WEBLINE_PORTFOLIO_TAXONOMY, 'webline_trigger_portfolio_term_delete_revalidate', 10, 4);

function webline_activate_plugin(): void
{
    webline_register_post_types();
    webline_ensure_pages();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'webline_activate_plugin');

function webline_deactivate_plugin(): void
{
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'webline_deactivate_plugin');
