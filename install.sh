printf "\e[33m[~] Downloading script...\e[0m\n"

curl -L#o /var/tmp/gg https://raw.githubusercontent.com/qw3rtman/gg/master/bin/gg

printf "\n\e[33m[~] Setting permissions...\e[0m\n"

chmod -v +x /var/tmp/gg

echo

printf "\e[33m[~] Moving to \$PATH...\e[0m\n"

sudo mv -fv /var/tmp/gg /usr/local/bin/gg

echo

printf "\e[32m[✔] Successfully installed \e[1;32mGit Goodies\e[0m\e[32m.\e[0m\n"
