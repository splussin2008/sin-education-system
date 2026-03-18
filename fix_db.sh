#!/bin/bash
mysql -e "CREATE DATABASE IF NOT EXISTS wordpress DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;"
mysql -e "GRANT ALL ON wordpress.* TO 'wordpress'@'localhost' IDENTIFIED BY 'Wp_Strong_Pass_2026!';"
mysql -e "FLUSH PRIVILEGES;"
sed -i "s/define( 'DB_USER', 'root' );/define( 'DB_USER', 'wordpress' );/" /var/www/wordpress/wp-config.php
sed -i "s/define( 'DB_PASSWORD', '' );/define( 'DB_PASSWORD', 'Wp_Strong_Pass_2026!' );/" /var/www/wordpress/wp-config.php
