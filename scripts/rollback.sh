#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <previous-image-tag>"
  exit 1
fi

PREVIOUS_TAG="$1"

if [[ ! "$PREVIOUS_TAG" =~ ^[A-Za-z0-9_.-]+$ ]]; then
  echo "Invalid image tag."
  exit 1
fi

ansible-playbook \
  -i ansible/inventory.ini \
  ansible/deploy.yml \
  --limit development \
  -e "deploy_tag=${PREVIOUS_TAG}"
