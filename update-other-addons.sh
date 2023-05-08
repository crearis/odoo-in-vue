#!/usr/bin/env bash
cd "$(dirname "$0")"
mkdir -p ./addons  # for 1st run

rm_tmp_unzip () {
  rm -rf ./tmp_unzip > /dev/null 2>&1
  rm ./tmp.zip > /dev/null 2>&1
}

get_repo_code () {
  echo "Getting $1/archive/$2.zip"
  CMD="curl -L $1/archive/$2.zip --output tmp.zip"
  echo $CMD
  $CMD
  if [[ $? != 0 ]]; then
		echo "Failed to download $1/archive/$2.zip - stopping"
		exit 1
	fi
	unzip ./tmp.zip -d tmp_unzip
	if [[ $? != 0 ]]; then
		exit 1
	fi
}

cp_repo_dir () {

  rm -rf ./addons/$2
  mv ./tmp_unzip/$1 ./addons/$2
}

cp_repo_sub_dir () {
  rm -rf ./addons/$1
  mv ./tmp_unzip/$2/$1 ./addons/$1
}

rm_tmp_unzip


SD="project-14.0"
get_repo_code "https://github.com/OCA/project" "14.0"
cp_repo_sub_dir project_category $SD
cp_repo_sub_dir project_key $SD
cp_repo_sub_dir project_status $SD
cp_repo_sub_dir project_tag $SD
cp_repo_sub_dir project_task_dependency $SD
cp_repo_sub_dir project_task_material $SD
cp_repo_sub_dir project_task_add_very_high $SD
rm_tmp_unzip


rm_tmp_unzip