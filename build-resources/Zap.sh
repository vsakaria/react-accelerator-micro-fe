#!/usr/bin/env bash

echo "ZAP"
echo "==================================="

# Create a directory for reports
REPORT_DIR="$(pwd)/zap-reports"
if [ ! -d "$REPORT_DIR" ]; then
mkdir $REPORT_DIR && chmod 777 $REPORT_DIR
fi

function remove_zap_container() {
  docker stop "${CONTAINER_ID}"
  docker rm -f "${CONTAINER_ID}"
}


# Run ZAP container in daemon mode
CONTAINER_ID=$(docker run -u zap \
     -v "$(pwd)/zap-reports":/reports/:rw \
     -p 8080:8080 \
     -d combined-registry.sbx.zone/owasp/zap2docker-weekly zap-x.sh \
     -daemon \
     -port 8080 \
     -host 127.0.0.1 \
     -config api.disablekey=true \
     -config scanner.attackOnStart=true \
     -config view.mode=attack \
     -config connection.dnsTtlSuccessfulQueries=-1 \
     -config api.addrs.addr.name=.* \
     -config api.addrs.addr.regex=true)

# Check if ZAP is running
docker exec $CONTAINER_ID zap-cli status -t 120

# the target URL for ZAP to scan
TARGET_URL=$1

# Required to set following param,
# because ZAP commands will return non-zero value for any web app vulnerabilities discovered,
# and thereby Jenkins will mark the entire pipeline failed and exit the script
set +e

# Open the target URL using the ZAP proxy
docker exec $CONTAINER_ID zap-cli -p 8080 status -t 120 && docker exec $CONTAINER_ID zap-cli -p 8080 open-url $TARGET_URL

# Run the spider against the target URL
docker exec $CONTAINER_ID zap-cli -p 8080 spider $TARGET_URL

# Run an Active Scan against the target URL
docker exec $CONTAINER_ID zap-cli -p 8080 active-scan -r $TARGET_URL

# Show alerts in the Pipeline console and generate a html report in $REPORT_DIR
ALERT_NUM=$(docker exec $CONTAINER_ID zap-cli --verbose alerts --alert-level High -f json | jq length)
docker exec $CONTAINER_ID zap-cli report -f html -o zap-report.html
docker exec $CONTAINER_ID cat zap-report.html >${REPORT_DIR}/zap-report.html

set -e

echo "Zap complete removing docker container"
remove_zap_container || true

# Check alerts
if [[ "${ALERT_NUM}" -gt 0 ]]; then
  echo "${ALERT_NUM} High Alerts found! Please check the Zap Scanning Report"
  exit 1
fi

