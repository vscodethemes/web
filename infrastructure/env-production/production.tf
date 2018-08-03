variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "region" {}
variable "algolia_app_id" {}
variable "algolia_api_key" {}
variable "algolia_index" {}
variable "sentry_dsn" {}
variable "app_domain" {}
variable "logs_bucket" {}

variable "acm_certificate_arn" {
  default = ""
}

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
  environment = "production"
  bucket      = "${var.logs_bucket}"
}

module "backend" {
  source          = "../modules/backend"
  environment     = "production"
  init_job_rate   = "8 hours"
  algolia_app_id  = "${var.algolia_app_id}"
  algolia_api_key = "${var.algolia_api_key}"
  algolia_index   = "${var.algolia_index}"
  sentry_dsn      = "${var.sentry_dsn}"
}

module "frontend" {
  source              = "../modules/frontend"
  environment         = "proudction"
  aliases             = ["vscodethemes.com", "www.vscodethemes.com"]
  app_domain          = "${var.app_domain}"
  acm_certificate_arn = "${var.acm_certificate_arn}"
  logs_bucket         = "${module.logs.bucket_domain}"
}
