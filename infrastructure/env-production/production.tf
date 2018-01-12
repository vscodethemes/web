variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "region" {}
variable "github_client_id" {}
variable "github_client_secret" {}
variable "algolia_app_id" {}
variable "algolia_api_key" {}

terraform {
  backend "s3" {
    # Manually created bucket with versioning enabled.
    bucket = "vscodethemes-tfstate"
    key    = "production.tfstate"
  }
}

provider "aws" {
  region     = "${var.region}"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
}

module "backend" {
  source               = "../modules/backend"
  environment          = "production"
  github_client_id     = "${var.github_client_id}"
  github_client_secret = "${var.github_client_secret}"
  algolia_app_id       = "${var.algolia_app_id}"
  algolia_api_key      = "${var.algolia_api_key}"
}

module "frontend" {
  source      = "../modules/frontend"
  environment = "production"
  domain      = "vscodethemes.com"
}

output "scrape_themes_sns_topic_arn" {
  value = "${module.backend.scrape_themes_sns_topic_arn}"
}

output "scrape_themes_sqs_queue_url" {
  value = "${module.backend.scrape_themes_sqs_queue_url}"
}

output "scrape_themes_sqs_deadletter_queue_url" {
  value = "${module.backend.scrape_themes_sqs_deadletter_queue_url}"
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

output "s3_bucket" {
  value = "${module.frontend.s3_bucket}"
}

output "cf_distribution_id" {
  value = "${module.frontend.cf_distribution_id}"
}

output "cf_domain_name" {
  value = "${module.frontend.cf_domain_name}"
}
