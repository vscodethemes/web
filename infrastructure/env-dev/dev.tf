variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "region" {}
variable "algolia_app_id" {}
variable "algolia_api_key" {}
variable "algolia_index" {}
variable "sentry_dsn" {}
variable "app_domain" {}
variable "logs_bucket" {}

terraform {
  backend "s3" {}
}

provider "aws" {
  region     = "${var.region}"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
}

module "logs" {
  source      = "../modules/logs"
  environment = "dev"
  bucket      = "${var.logs_bucket}"
}

module "backend" {
  source          = "../modules/backend"
  environment     = "dev"
  init_job_rate   = "24 hours"
  algolia_app_id  = "${var.algolia_app_id}"
  algolia_api_key = "${var.algolia_api_key}"
  algolia_index   = "${var.algolia_index}"
  sentry_dsn      = "${var.sentry_dsn}"
}

module "frontend" {
  source      = "../modules/frontend"
  environment = "dev"
  app_domain  = "${var.app_domain}"
  logs_bucket = "${module.logs.bucket_domain}"
}
