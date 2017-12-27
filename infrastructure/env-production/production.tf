variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "region" {}

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
  source      = "../modules/backend"
  environment = "production"
}

# module "frontend" {
#   source      = "../modules/frontend"
#   project     = "${var.project}"
#   environment = "production"
# }

output "fetch_themes_sns_topic_arn" {
  value = "${module.backend.fetch_themes_sns_topic_arn}"
}

output "fetch_themes_sqs_queue_url" {
  value = "${module.backend.fetch_themes_sqs_queue_url}"
}

output "fetch_themes_sqs_deadletter_queue_url" {
  value = "${module.backend.fetch_themes_sqs_deadletter_queue_url}"
}

output "process_repo_sns_topic_arn" {
  value = "${module.backend.process_repo_sns_topic_arn}"
}

output "process_repo_sqs_queue_url" {
  value = "${module.backend.process_repo_sqs_queue_url}"
}

output "process_repo_sqs_deadletter_queue_url" {
  value = "${module.backend.process_repo_sqs_deadletter_queue_url}"
}
