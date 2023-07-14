<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'itimpact');
define('ALLOW_UNFILTERED_UPLOADS', true);
define('GRAPHQL_DEBUG', true);
/** Database username */
define('DB_USER', 'root');

/** Database password */
define('DB_PASSWORD', '');

/** Database hostname */
define('DB_HOST', 'localhost');

/** Database charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The database collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'm6YntBuBn,GNtWEB(eQP.#tGIce<)vs$#fn,GL}mZ=O->%,.*I{Y|h7I L?%)uBw');
define('SECURE_AUTH_KEY', 'U3XuiQPErR-(kJA6bUIHqLI?LES XQQoPinWjgqaB*-CVc V8J%@T)c&ZR>(!tBK');
define('LOGGED_IN_KEY', '~&3hB6Op736wRe<pWZy uxd{:i|N7z>*ZowiMT(Owbc7+?xB<Nka_5Mp<6n*#bbi');
define('NONCE_KEY', 'k6f3sn&@8J*LWLTzj8lyx0Eh[%(>XPp=1?#j]%i5>eLBy{)2KS$3;[wX;wLvse19');
define('AUTH_SALT', 'W/Tbh/c7ikb(!71TNyzdz.%*3{5+X{q}J=pA;ve%4tqD6~?+R[zo#RM1ms=03C#G');
define('SECURE_AUTH_SALT', 'jxuzKF|Vu1 YY>I%yVL!uPWR&0`a.wLy;Pc#oqi$haEMa0K;/c;f,B$dEU.}3lEf');
define('LOGGED_IN_SALT', 'gQ60o#8dDUCi&BXfn!^iIk~f:pU^_T]gP>c<+.dCif47>]&tI4W6b4m. 6iFyQP,');
define('NONCE_SALT', '#8j9%FU4>P&l6,i8 YNsOC.C-Al8/;K%pX vjR %Ir9^M~ LFpV!%jvG[q|cf*n=');
define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'ev-UAo7zFi?bXo>d|pT+WXR#MGs-HYh8?~l|GFE<vUt!?!G+2Zve/hp2mZUDvW{L');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define('WP_DEBUG', false);

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
  define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';