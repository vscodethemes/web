variable "environment" {}
variable "github_client_id" {}
variable "github_client_secret" {}
variable "algolia_app_id" {}
variable "algolia_api_key" {}
variable "algolia_index" {}
variable "sentry_dsn" {}

variable "sqs_visibility_timeout" {
  default = 10
}

variable "sqs_receive_timeout" {
  # Set this larger than the visibility timeout so that retries remain in the queue.
  default = 15
}
