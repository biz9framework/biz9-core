# Copyright 2023 Certified CoderZ
# Author: certifiedcoderz@gmail.com (Certified CoderZ)
# License GNU General Public License v3.0
# Description: BiZ9 Framework ScriptZ : Framework App Push
echo "#################"
echo "BiZ9 Framework  ScriptZ Update"
echo "#################"
echo 'Enter Branch'

#read _branch
_branch="unstable"

G_BIZ_SCRIPT_FOLDER="${BIZ9_HOME}/biz9-scriptz/src/${_branch}"
G_BIZ_CHANGE_REQUEST_FOLDER="${BIZ9_HOME}/biz9-change-request/src/${_branch}"
G_BIZ_CMS_FOLDER="${BIZ9_HOME}/biz9-cms/src/${_branch}"
G_BIZ_CORE_FOLDER="${BIZ9_HOME}/biz9-core/src/${_branch}"
G_BIZ_DOCZ_FOLDER="${BIZ9_HOME}/biz9-docz/src/${_branch}"
G_BIZ_HELP_FOLDER="${BIZ9_HOME}/biz9-help/src/${_branch}"
G_BIZ_KEYBOARD_COMMANDZ_FOLDER="${BIZ9_HOME}/biz9-keyboard-commandz/src/${_branch}"
G_BIZ_MOBILE_FOLDER="${BIZ9_HOME}/biz9-mobile/src/${_branch}"
G_BIZ_SERVER_FOLDER="${BIZ9_HOME}/biz9-server/src/${_branch}"
G_BIZ_SERVICE_FOLDER="${BIZ9_HOME}/biz9-service/src/${_branch}"
G_BIZ_TEST_FOLDER="${BIZ9_HOME}/biz9-test/src/${_branch}"
G_BIZ_WEBSITE_FOLDER="${BIZ9_HOME}/biz9-website/src/${_branch}"


rm -rf ${BIZ9_HOME}/biz9-scriptz/src/${_branch}/scriptz

#change-request
echo 'start'
rm -rf ${G_BIZ_CHANGE_REQUEST_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/*  ${G_BIZ_CHANGE_REQUEST_FOLDER}/scriptz
echo 'end'


#cms
: '
rm -rf ${G_BIZ_CMS_FOLDER}/scriptz
mkdir ${G_BIZ_CMS_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/*  ${G_BIZ_CMS_FOLDER}/scriptz/
cp -rf ${G_BIZ_SERVICE_FOLDER}/routes/cloud  ${G_BIZ_CMS_FOLDER}/routes/

#core
rm -rf ${G_BIZ_CORE_FOLDER}/scriptz
mkdir ${G_BIZ_CORE_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/*  ${G_BIZ_CORE_FOLDER}/scriptz/
#docz
rm -rf ${G_BIZ_DOCZ_FOLDER}/scriptz
mkdir ${G_BIZ_DOCZ_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/  ${G_BIZ_DOCZ_FOLDER}/scriptz/
#mobile
rm -rf ${G_BIZ_MOBILE_FOLDER}/scriptz
mkdir ${G_BIZ_MOBILE_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/*  ${G_BIZ_MOBILE_FOLDER}/scriptz/
#service
rm -rf ${G_BIZ_SERVICE_FOLDER}/scriptz
mkdir ${G_BIZ_SERVICE_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/*  ${G_BIZ_SERVICE_FOLDER}/scriptz/
#web
rm -rf ${G_BIZ_WEB_FOLDER}/scriptz
mkdir ${G_BIZ_WEB_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/*  ${G_BIZ_WEB_FOLDER}/scriptz/
cp -rf ${G_BIZ_SERVICE_FOLDER}/routes/cloud  ${G_BIZ_WEB_FOLDER}/routes/
#test
rm -rf ${G_BIZ_TEST_FOLDER}/scriptz
mkdir ${G_BIZ_TEST_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/* ${G_BIZ_TEST_FOLDER}/scriptz/
#vendor
rm -rf ${G_BIZ_VENDOR_FOLDER}/scriptz
mkdir ${G_BIZ_VENDOR_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/*  ${G_BIZ_VENDOR_FOLDER}/scriptz/
#vendor-payment
rm -rf ${G_BIZ_VENDOR_PAYMENT_FOLDER}/scriptz
mkdir ${G_BIZ_VENDOR_PAYMENT_FOLDER}/scriptz
cp -rf ${G_BIZ_SCRIPT_FOLDER}/*  ${G_BIZ_VENDOR_PAYMENT_FOLDER}/scriptz/
bash ./scriptz/dq_footer.sh
exit
'
