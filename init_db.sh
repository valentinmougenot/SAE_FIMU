if [ $# -lt 1 ]; then
  echo "Usage: $0 <login>"
  exit 1
fi
login=$1

server=localhost
if [ $# -gt 1 ]; then
  server=$2
fi

$(psql -h $server -U $login -d fimu -f dropTable.sql)
$(psql -h $server -U $login -d fimu -f common.sql)
$(psql -h $server -U $login -d fimu -f currentSeason.sql)
$(psql -h $server -U $login -d fimu -f nextSeason.sql)
$(psql -h $server -U $login -d fimu -f previousSeason.sql)