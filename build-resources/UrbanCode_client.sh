#!/bin/bash

urbancode_url="https://ucd.intranet.group/"
component=$1   # e.g. "Digital - CBO - CCMI - CWA - ClientSummary"
releasename=$2 # e.g. "TBT"
application=$3 # e.g. "ClientSummaryCWA"
build_label=$4 # e.g. "<BUILD_TYPE>_<BUILD_TAG>"
root_dir=$5    # e.g. "uc_deploy_basedir"
urbancode_authtoken=$6

JAVA_HOME="/var/jenkins_home/tools/hudson.model.JDK/jdk-1.8.0_171/jdk1.8.0_171/jre/"
export JAVA_HOME

echo "UrbanCode publisher"
echo "==================================="
wget -N http://galaxy-build.service.test.group/devops-repo/apps/urbancode/udclient
wget -N http://galaxy-build.service.test.group/devops-repo/apps/urbancode/udclient.jar
chmod 755 udclient

echo "java home for running script $JAVA_HOME"
echo
echo "Input Parameters"
echo "==================================="
echo "urbancode_url       - ${urbancode_url}"
echo "component           - ${component}"
echo "releasename         - ${releasename}"
echo "application         - ${application}"
echo "build_label         - ${build_label}"
echo "root_dir            - ${root_dir}"
echo
echo "Creating a new version in UrbanCode"
echo "==================================="
echo
./udclient -weburl ${urbancode_url} -authtoken ${urbancode_authtoken} createVersion -component "${component}" -name "${releasename}_${application}_${build_label}" -description "Deploy ${application}" --verbose
echo
echo "Uploading the artifacts to UrbanCode"
echo "===================================="
echo
./udclient -weburl ${urbancode_url} -authtoken ${urbancode_authtoken} addVersionFiles -component "${component}" -version "${releasename}_${application}_${build_label}" -base "${root_dir}" -verbose

