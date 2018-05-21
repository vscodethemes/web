variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "region" {}
variable "github_client_id" {}
variable "github_client_secret" {}
variable "algolia_app_id" {}
variable "algolia_api_key" {}
variable "algolia_index" {}
variable "sentry_dsn" {}

terraform {
  backend "s3" {}
}

provider "aws" {
  region     = "${var.region}"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
}

module "backend" {
  source               = "../modules/backend"
  environment          = "development"
  storage_bucket       = "vscodethemes-dev-storage"
  init_job_rate        = "24 hours"
  github_client_id     = "${var.github_client_id}"
  github_client_secret = "${var.github_client_secret}"
  algolia_app_id       = "${var.algolia_app_id}"
  algolia_api_key      = "${var.algolia_api_key}"
  algolia_index        = "${var.algolia_index}"
  sentry_dsn           = "${var.sentry_dsn}"
}

output "storage_s3_bucket" {
  value = "${module.backend.storage_s3_bucket}"
}

output "storage_cf_domain_name" {
  value = "${module.backend.storage_cf_domain_name}"
}

output "scrape_extensions_sns_topic_arn" {
  value = "${module.backend.scrape_extensions_sns_topic_arn}"
}

output "scrape_extensions_sqs_queue_url" {
  value = "${module.backend.scrape_extensions_sqs_queue_url}"
}

output "scrape_extensions_sqs_deadletter_queue_url" {
  value = "${module.backend.scrape_extensions_sqs_deadletter_queue_url}"
}

output "extract_themes_sns_topic_arn" {
  value = "${module.backend.extract_themes_sns_topic_arn}"
}

output "extract_themes_sqs_queue_url" {
  value = "${module.backend.extract_themes_sqs_queue_url}"
}

output "extract_themes_sqs_deadletter_queue_url" {
  value = "${module.backend.extract_themes_sqs_deadletter_queue_url}"
}

output "extract_colors_sns_topic_arn" {
  value = "${module.backend.extract_colors_sns_topic_arn}"
}

output "extract_colors_sqs_queue_url" {
  value = "${module.backend.extract_colors_sqs_queue_url}"
}

output "extract_colors_sqs_deadletter_queue_url" {
  value = "${module.backend.extract_colors_sqs_deadletter_queue_url}"
}
